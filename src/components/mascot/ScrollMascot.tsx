import {
  animate,
  AnimationPlaybackControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLenis } from "../SmoothScrollProvider";
import MascotCharacter from "./MascotCharacter";
import {
  applyRigPose,
  computeRunCyclePose,
  MascotRigMotionValues,
  velocityToCyclesPerSec,
} from "./mascot.animations";
import { DEFAULT_MASCOT_CONFIG } from "./mascot.config";
import { MascotConfig, MascotState, ScrollDirection } from "./mascot.types";
import {
  computePupilCursorOffset,
  getDirectionalPupilOffset,
  getNextBlinkDelay,
  resolveMascotExpression,
} from "./mascot.utils";
import { useScrollBehavior } from "./useScrollBehavior";
import "./mascot.css";

export interface ScrollMascotProps {
  /** Optional partial overrides for thresholds, timing, placement, or colors */
  config?: Partial<Omit<MascotConfig, "colors" | "position">> & {
    colors?: Partial<MascotConfig["colors"]>;
    position?: Partial<MascotConfig["position"]>;
  };
  /** Hide mascot cleanly on full-screen forms, policies, or open mobile drawers */
  hide?: boolean;
}

/**
 * Isolated scroll-reactive blue mascot controller.
 * - Continuous 4-phase run oscillator driven via MotionValues + SVG transforms
 *   for instant onset, velocity-responsive stride cadence, and zero lag.
 * - Clean settle to standing + relieved expression on scroll stop, plus idle
 *   breathing, blinking, hover/click reactions, and cursor gaze tracking.
 */
const ScrollMascot = ({ config: overrides, hide = false }: ScrollMascotProps) => {
  const shouldReduceMotion = !!useReducedMotion();

  const config = useMemo<MascotConfig>(
    () => ({
      ...DEFAULT_MASCOT_CONFIG,
      ...overrides,
      colors: {
        ...DEFAULT_MASCOT_CONFIG.colors,
        ...overrides?.colors,
      },
      position: {
        ...DEFAULT_MASCOT_CONFIG.position,
        ...overrides?.position,
      },
    }),
    [overrides],
  );

  const [state, setState] = useState<MascotState>("idle");
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isRunnerBusy, setIsRunnerBusy] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(() =>
    typeof document !== "undefined" ? !document.hidden : true,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<MascotState>(state);
  stateRef.current = state;

  const stopTransitionTimerRef = useRef<number>(0);
  const surpriseTimerRef = useRef<number>(0);
  const happyTimerRef = useRef<number>(0);
  const happyHoldTimerRef = useRef<number>(0);
  const sleepyTimerRef = useRef<number>(0);
  const sleepyWakeTimerRef = useRef<number>(0);
  const winkTimerRef = useRef<number>(0);
  const lastPointerMoveRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const speedBandRef = useRef<"idle" | "slow" | "normal" | "fast">("idle");

  // Shared rig MotionValues (written at 60fps by either the run loop or idle ambient controls)
  const bodyY = useMotionValue(0);
  const bodyRotate = useMotionValue(0);
  const bodyScaleX = useMotionValue(1);
  const bodyScaleY = useMotionValue(1);
  const hatY = useMotionValue(0);
  const hatRotate = useMotionValue(0);
  const shadowScaleX = useMotionValue(1);
  const shadowOpacity = useMotionValue(0.14);
  const leftHip = useMotionValue(0);
  const leftKnee = useMotionValue(0);
  const leftAnkle = useMotionValue(0);
  const rightHip = useMotionValue(0);
  const rightKnee = useMotionValue(0);
  const rightAnkle = useMotionValue(0);
  const leftShoulder = useMotionValue(0);
  const leftElbow = useMotionValue(0);
  const rightShoulder = useMotionValue(0);
  const rightElbow = useMotionValue(0);

  const rig = useMemo<MascotRigMotionValues>(
    () => ({
      bodyY,
      bodyRotate,
      bodyScaleX,
      bodyScaleY,
      hatY,
      hatRotate,
      shadowScaleX,
      shadowOpacity,
      leftHip,
      leftKnee,
      leftAnkle,
      rightHip,
      rightKnee,
      rightAnkle,
      leftShoulder,
      leftElbow,
      rightShoulder,
      rightElbow,
    }),
    [
      bodyRotate,
      bodyScaleX,
      bodyScaleY,
      bodyY,
      hatRotate,
      hatY,
      leftAnkle,
      leftElbow,
      leftHip,
      leftKnee,
      leftShoulder,
      rightAnkle,
      rightElbow,
      rightHip,
      rightKnee,
      rightShoulder,
      shadowOpacity,
      shadowScaleX,
    ],
  );

  // High-frequency pupil coordinates kept outside React state
  const rawPupilX = useMotionValue(0);
  const rawPupilY = useMotionValue(0);
  const pupilX = useSpring(rawPupilX, { stiffness: 260, damping: 24 });
  const pupilY = useSpring(rawPupilY, { stiffness: 260, damping: 24 });

  // Continuous runner phase oscillator state
  const runnerRafRef = useRef<number>(0);
  const runPhaseRef = useRef<number>(0);
  const runBlendRef = useRef<number>(0);
  const lastDirRef = useRef<ScrollDirection>("down");
  const idleControlsRef = useRef<AnimationPlaybackControls[]>([]);

  const stopIdleControls = useCallback(() => {
    idleControlsRef.current.forEach((c) => c.stop());
    idleControlsRef.current = [];
  }, []);

  const clearMoodTimers = useCallback(() => {
    window.clearTimeout(happyTimerRef.current);
    window.clearTimeout(happyHoldTimerRef.current);
    window.clearTimeout(sleepyTimerRef.current);
    window.clearTimeout(sleepyWakeTimerRef.current);
  }, []);

  const handleScrollSpike = useCallback(
    (_velocity: number, _direction: ScrollDirection) => {
      if (shouldReduceMotion || hide || !isPageVisible) return;
      window.clearTimeout(surpriseTimerRef.current);
      window.clearTimeout(stopTransitionTimerRef.current);
      clearMoodTimers();
      setState("surprised");

      surpriseTimerRef.current = window.setTimeout(() => {
        if (isScrollingRef.current) {
          setState(
            speedBandRef.current === "fast" ? "fastRunning" : "running",
          );
        } else {
          setState("stopping");
          stopTransitionTimerRef.current = window.setTimeout(() => {
            setState("idle");
          }, config.stoppingDurationMs);
        }
      }, config.surprisedDurationMs);
    },
    [
      clearMoodTimers,
      config.stoppingDurationMs,
      config.surprisedDurationMs,
      hide,
      isPageVisible,
      shouldReduceMotion,
    ],
  );

  const wakeRunnerLoopRef = useRef<() => void>(() => {});
  const lenis = useLenis();

  const { snapshot: telemetry, liveTelemetryRef } = useScrollBehavior({
    config,
    lenis,
    disabled: hide || shouldReduceMotion,
    onScrollStart: () => wakeRunnerLoopRef.current(),
    onSpike: handleScrollSpike,
  });

  isScrollingRef.current = telemetry.isScrolling;
  speedBandRef.current = telemetry.speedBand;

  // Single rAF 4-phase running oscillator + smooth stop settle
  useEffect(() => {
    if (shouldReduceMotion || hide || !isPageVisible) {
      if (runnerRafRef.current) {
        window.cancelAnimationFrame(runnerRafRef.current);
        runnerRafRef.current = 0;
      }
      runBlendRef.current = 0;
      setIsRunnerBusy(false);
      applyRigPose(rig, computeRunCyclePose(0, 0, "down", 1, 0));
      return;
    }

    let lastTimestamp = performance.now();

    const stepRunner = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTimestamp) / 1000));
      lastTimestamp = now;

      const live = liveTelemetryRef.current;
      if (live.direction !== "none") {
        lastDirRef.current = live.direction;
      }

      // Inactivity watchdog prevents runner loop from ever locking if scroll timer was cleared
      const staleMs = now - live.lastScrollTimestamp;
      if (live.isScrolling && staleMs > config.scrollStopDelayMs + 75) {
        live.isScrolling = false;
        live.velocity = 0;
        if (
          stateRef.current === "running" ||
          stateRef.current === "fastRunning"
        ) {
          setState("stopping");
          window.clearTimeout(stopTransitionTimerRef.current);
          stopTransitionTimerRef.current = window.setTimeout(() => {
            setState("idle");
          }, config.stoppingDurationMs);
        }
      }

      if (live.isScrolling) {
        stopIdleControls();
        const { cyclesPerSec, speedScalar } = velocityToCyclesPerSec(
          live.velocity,
          config.runCycleDurationSec,
          config.fastRunCycleDurationSec,
          config.fastScrollThreshold,
        );
        runPhaseRef.current = (runPhaseRef.current + dt * cyclesPerSec) % 1;
        // Fast attack so limbs reach full stride immediately when scrolling starts
        runBlendRef.current = Math.min(1, runBlendRef.current + dt / 0.065);

        const pose = computeRunCyclePose(
          runPhaseRef.current,
          speedScalar,
          lastDirRef.current,
          config.bounceIntensity,
          runBlendRef.current,
        );
        applyRigPose(rig, pose);
        runnerRafRef.current = window.requestAnimationFrame(stepRunner);
        return;
      }

      // Smooth deceleration & settle back to neutral standing pose when scroll stops
      if (runBlendRef.current > 0.004) {
        runPhaseRef.current = (runPhaseRef.current + dt * 1.1) % 1;
        runBlendRef.current = Math.max(0, runBlendRef.current - dt / 0.15);

        const pose = computeRunCyclePose(
          runPhaseRef.current,
          0.45,
          lastDirRef.current,
          config.bounceIntensity,
          runBlendRef.current,
        );
        applyRigPose(rig, pose);
        runnerRafRef.current = window.requestAnimationFrame(stepRunner);
        return;
      }

      // Fully settled cleanly at zero angles
      runBlendRef.current = 0;
      runnerRafRef.current = 0;
      applyRigPose(rig, computeRunCyclePose(0, 0, "down", 1, 0));
      setIsRunnerBusy(false);
    };

    const wake = () => {
      stopIdleControls();
      setIsRunnerBusy(true);
      if (!runnerRafRef.current) {
        lastTimestamp = performance.now();
        // Advance immediately by one initial tick so frame 0 shows active stride
        stepRunner(lastTimestamp + 16);
      }
    };

    wakeRunnerLoopRef.current = wake;

    if (liveTelemetryRef.current.isScrolling && !runnerRafRef.current) {
      wake();
    }

    return () => {
      if (runnerRafRef.current) {
        window.cancelAnimationFrame(runnerRafRef.current);
        runnerRafRef.current = 0;
      }
    };
  }, [
    config.bounceIntensity,
    config.fastRunCycleDurationSec,
    config.fastScrollThreshold,
    config.runCycleDurationSec,
    hide,
    isPageVisible,
    liveTelemetryRef,
    rig,
    shouldReduceMotion,
    stopIdleControls,
  ]);

  // Ambient idle / happy / sleepy / surprised / stopping / hover animations
  // when the rAF runner loop is NOT actively driving limbs.
  useEffect(() => {
    stopIdleControls();

    if (isRunnerBusy || shouldReduceMotion || hide || !isPageVisible) {
      return;
    }

    const push = (ctrl: AnimationPlaybackControls) => {
      idleControlsRef.current.push(ctrl);
    };
    const intensity = config.bounceIntensity;

    const resetLimbs = (dur = 0.18) => {
      push(animate(leftHip, 0, { duration: dur, ease: "easeOut" }));
      push(animate(leftKnee, 0, { duration: dur, ease: "easeOut" }));
      push(animate(leftAnkle, 0, { duration: dur, ease: "easeOut" }));
      push(animate(rightHip, 0, { duration: dur, ease: "easeOut" }));
      push(animate(rightKnee, 0, { duration: dur, ease: "easeOut" }));
      push(animate(rightAnkle, 0, { duration: dur, ease: "easeOut" }));
      push(animate(leftElbow, 0, { duration: dur, ease: "easeOut" }));
      push(animate(rightElbow, 0, { duration: dur, ease: "easeOut" }));
      push(animate(hatY, 0, { duration: dur, ease: "easeOut" }));
      push(animate(hatRotate, 0, { duration: dur, ease: "easeOut" }));
      push(animate(shadowScaleX, 1, { duration: dur, ease: "easeOut" }));
      push(animate(shadowOpacity, 0.14, { duration: dur, ease: "easeOut" }));
    };

    if (state === "stopping") {
      resetLimbs(0.16);
      push(animate(leftShoulder, 0, { duration: 0.16, ease: "easeOut" }));
      push(animate(rightShoulder, 0, { duration: 0.16, ease: "easeOut" }));
      push(animate(bodyY, [2 * intensity, 0], { duration: 0.22, ease: "easeOut" }));
      push(animate(bodyRotate, 0, { duration: 0.2, ease: "easeOut" }));
      push(animate(bodyScaleY, [0.95, 1], { duration: 0.22, ease: "easeOut" }));
      push(animate(bodyScaleX, [1.04, 1], { duration: 0.22, ease: "easeOut" }));
      return () => stopIdleControls();
    }

    if (state === "surprised") {
      push(animate(leftHip, 12, { duration: 0.16, ease: "easeOut" }));
      push(animate(rightHip, -12, { duration: 0.16, ease: "easeOut" }));
      push(animate(leftShoulder, 34, { duration: 0.16, ease: "easeOut" }));
      push(animate(rightShoulder, -34, { duration: 0.16, ease: "easeOut" }));
      push(
        animate(bodyY, [0, -9 * intensity, 0], {
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }),
      );
      push(animate(hatY, [0, -5, 0], { duration: 0.4, ease: "easeOut" }));
      push(animate(hatRotate, [0, -6, 4, 0], { duration: 0.4, ease: "easeOut" }));
      return () => stopIdleControls();
    }

    if (state === "happy" || isHovered) {
      resetLimbs(0.2);
      push(animate(leftShoulder, 16, { type: "spring", stiffness: 260, damping: 18 }));
      push(
        animate(rightShoulder, [-24, -46, -22, -40, -24], {
          duration: 0.85,
          ease: "easeInOut",
        }),
      );
      push(animate(rightElbow, -36, { duration: 0.2, ease: "easeOut" }));
      push(
        animate(bodyY, isHovered && state !== "happy" ? -3.5 * intensity : [0, -6 * intensity, 0], {
          duration: 0.65,
          ease: "easeInOut",
        }),
      );
      push(animate(bodyRotate, isHovered ? 2 : 0, { duration: 0.25 }));
      push(animate(bodyScaleX, 0.985, { duration: 0.25 }));
      push(animate(bodyScaleY, 1.025, { duration: 0.25 }));
      return () => stopIdleControls();
    }

    if (state === "sleepy") {
      resetLimbs(0.4);
      push(animate(leftShoulder, -10, { duration: 0.5 }));
      push(animate(rightShoulder, 10, { duration: 0.5 }));
      push(
        animate(bodyY, [1.5, 3, 1.5], {
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }),
      );
      push(
        animate(bodyScaleY, [0.98, 0.955, 0.98], {
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }),
      );
      push(
        animate(bodyScaleX, [1.01, 1.03, 1.01], {
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }),
      );
      push(animate(bodyRotate, -3, { duration: 0.5 }));
      push(animate(hatRotate, -5, { duration: 0.5 }));
      return () => stopIdleControls();
    }

    // Default idle: soft relaxed breathing & subtle arm sway
    resetLimbs(0.22);
    push(
      animate(bodyY, [0, -2.5 * intensity, 0], {
        duration: 3.1,
        repeat: Infinity,
        ease: "easeInOut",
      }),
    );
    push(
      animate(bodyScaleY, [1, 1.022, 1], {
        duration: 3.1,
        repeat: Infinity,
        ease: "easeInOut",
      }),
    );
    push(
      animate(bodyScaleX, [1, 0.986, 1], {
        duration: 3.1,
        repeat: Infinity,
        ease: "easeInOut",
      }),
    );
    push(
      animate(bodyRotate, [0, 1.1, 0, -1.1, 0], {
        duration: 6.2,
        repeat: Infinity,
        ease: "easeInOut",
      }),
    );
    push(
      animate(leftShoulder, [-4, 5, -4], {
        duration: 3.1,
        repeat: Infinity,
        ease: "easeInOut",
      }),
    );
    push(
      animate(rightShoulder, [4, -5, 4], {
        duration: 3.1,
        repeat: Infinity,
        ease: "easeInOut",
      }),
    );

    return () => stopIdleControls();
  }, [
    bodyRotate,
    bodyScaleX,
    bodyScaleY,
    bodyY,
    config.bounceIntensity,
    hatRotate,
    hatY,
    hide,
    isHovered,
    isPageVisible,
    isRunnerBusy,
    leftAnkle,
    leftElbow,
    leftHip,
    leftKnee,
    leftShoulder,
    rightAnkle,
    rightElbow,
    rightHip,
    rightKnee,
    rightShoulder,
    shadowOpacity,
    shadowScaleX,
    shouldReduceMotion,
    state,
    stopIdleControls,
  ]);

  // Track browser tab visibility
  useEffect(() => {
    const onVisibility = () => setIsPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Deterministic state machine (idle / running / fastRunning / stopping)
  useEffect(() => {
    if (shouldReduceMotion || hide || !isPageVisible) {
      window.clearTimeout(stopTransitionTimerRef.current);
      window.clearTimeout(surpriseTimerRef.current);
      clearMoodTimers();
      setState("idle");
      return;
    }

    if (telemetry.isScrolling) {
      window.clearTimeout(stopTransitionTimerRef.current);
      clearMoodTimers();
      if (stateRef.current !== "surprised") {
        setState(telemetry.speedBand === "fast" ? "fastRunning" : "running");
      }
      return;
    }

    if (
      stateRef.current === "running" ||
      stateRef.current === "fastRunning"
    ) {
      setState("stopping");
      window.clearTimeout(stopTransitionTimerRef.current);
      stopTransitionTimerRef.current = window.setTimeout(() => {
        setState("idle");
      }, config.stoppingDurationMs);
    }
  }, [
    clearMoodTimers,
    config.stoppingDurationMs,
    hide,
    isPageVisible,
    shouldReduceMotion,
    telemetry.isScrolling,
    telemetry.speedBand,
  ]);

  // Directional pupil gaze sync
  useEffect(() => {
    const recentlyMovedPointer =
      performance.now() - lastPointerMoveRef.current < 1600;
    if (telemetry.isScrolling || !recentlyMovedPointer) {
      const target = getDirectionalPupilOffset(state, telemetry.direction);
      rawPupilX.set(target.x);
      rawPupilY.set(target.y);
    }
  }, [rawPupilX, rawPupilY, state, telemetry.direction, telemetry.isScrolling]);

  // Idle mood scheduler
  useEffect(() => {
    clearMoodTimers();
    if (
      !config.enableIdleMoods ||
      shouldReduceMotion ||
      hide ||
      !isPageVisible ||
      state !== "idle" ||
      isHovered
    ) {
      return;
    }

    happyTimerRef.current = window.setTimeout(() => {
      if (stateRef.current !== "idle" || isScrollingRef.current) return;
      setState("happy");
      happyHoldTimerRef.current = window.setTimeout(() => {
        if (stateRef.current === "happy") setState("idle");
      }, config.happyDurationMs);
    }, config.idleHappyDelayMs);

    const sleepyAfterHappy = Math.max(
      config.idleSleepyDelayMs - config.idleHappyDelayMs - config.happyDurationMs,
      3000,
    );

    sleepyTimerRef.current = window.setTimeout(() => {
      if (stateRef.current === "idle" && !isScrollingRef.current) {
        setState("sleepy");
        sleepyWakeTimerRef.current = window.setTimeout(() => {
          if (stateRef.current === "sleepy") setState("idle");
        }, 6000);
      }
    }, config.idleHappyDelayMs + config.happyDurationMs + sleepyAfterHappy);

    return () => clearMoodTimers();
  }, [
    clearMoodTimers,
    config.enableIdleMoods,
    config.happyDurationMs,
    config.idleHappyDelayMs,
    config.idleSleepyDelayMs,
    hide,
    isHovered,
    isPageVisible,
    shouldReduceMotion,
    state,
  ]);

  // Natural blinking loop
  useEffect(() => {
    if (shouldReduceMotion || hide || !isPageVisible) {
      setIsBlinking(false);
      return;
    }

    let nextTimer = 0;
    let closeTimer = 0;
    let active = true;

    const scheduleNextBlink = () => {
      if (!active) return;
      nextTimer = window.setTimeout(() => {
        if (!active) return;
        if (stateRef.current !== "sleepy" && stateRef.current !== "surprised") {
          setIsBlinking(true);
          closeTimer = window.setTimeout(() => {
            if (active) {
              setIsBlinking(false);
              scheduleNextBlink();
            }
          }, config.blinkDurationMs);
        } else {
          scheduleNextBlink();
        }
      }, getNextBlinkDelay(config));
    };

    scheduleNextBlink();

    return () => {
      active = false;
      window.clearTimeout(nextTimer);
      window.clearTimeout(closeTimer);
    };
  }, [config, hide, isPageVisible, shouldReduceMotion]);

  // Cursor pupil tracking (rAF throttled)
  useEffect(() => {
    if (
      !config.enableHoverReactions ||
      shouldReduceMotion ||
      hide ||
      !isPageVisible
    ) {
      rawPupilX.set(0);
      rawPupilY.set(0);
      return;
    }

    let rafId = 0;
    let latestX = 0;
    let latestY = 0;

    const updateGaze = () => {
      rafId = 0;
      const el = containerRef.current;
      if (!el || isScrollingRef.current) return;
      const rect = el.getBoundingClientRect();
      const offset = computePupilCursorOffset(latestX, latestY, rect);
      rawPupilX.set(offset.x);
      rawPupilY.set(offset.y);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      lastPointerMoveRef.current = performance.now();
      latestX = event.clientX;
      latestY = event.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateGaze);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [
    config.enableHoverReactions,
    hide,
    isPageVisible,
    rawPupilX,
    rawPupilY,
    shouldReduceMotion,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.clearTimeout(stopTransitionTimerRef.current);
      window.clearTimeout(surpriseTimerRef.current);
      window.clearTimeout(winkTimerRef.current);
      clearMoodTimers();
      stopIdleControls();
    };
  }, [clearMoodTimers, stopIdleControls]);

  const handleMouseEnter = () => {
    if (!config.enableHoverReactions || shouldReduceMotion) return;
    setIsHovered(true);
    if (stateRef.current === "sleepy") setState("idle");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (!config.enableHoverReactions || shouldReduceMotion) return;
    clearMoodTimers();
    window.clearTimeout(winkTimerRef.current);

    if (
      stateRef.current === "idle" ||
      stateRef.current === "sleepy" ||
      stateRef.current === "stopping"
    ) {
      window.clearTimeout(stopTransitionTimerRef.current);
      setState("happy");
      happyHoldTimerRef.current = window.setTimeout(() => {
        if (stateRef.current === "happy") setState("idle");
      }, 900);
    }

    setIsWinking(true);
    winkTimerRef.current = window.setTimeout(() => {
      setIsWinking(false);
    }, 650);
  };

  const cssVars = useMemo<CSSProperties | undefined>(() => {
    if (!overrides?.position) return undefined;
    const style: Record<string, string> = {};
    if (overrides.position.desktopSize) {
      style["--mascot-size"] = `${overrides.position.desktopSize}px`;
    }
    if (overrides.position.desktopLeft !== undefined) {
      style["--mascot-left"] = `${overrides.position.desktopLeft}px`;
    }
    if (overrides.position.desktopBottom !== undefined) {
      style["--mascot-bottom"] = `${overrides.position.desktopBottom}px`;
    }
    return style as CSSProperties;
  }, [overrides?.position]);

  if (hide) return null;

  const expression = resolveMascotExpression({
    state,
    isBlinking,
    isWinking,
    isHovered,
  });

  const effectiveDirection: ScrollDirection =
    state === "idle" || state === "happy" || state === "sleepy"
      ? "none"
      : telemetry.direction;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="kd-scroll-mascot-layer"
      style={cssVars}
      data-mascot-state={state}
      data-mascot-expression={expression}
      data-mascot-direction={effectiveDirection}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="kd-scroll-mascot-hitbox"
        style={
          config.enableHoverReactions
            ? undefined
            : { pointerEvents: "none", cursor: "default" }
        }
      >
        <MascotCharacter
          state={state}
          direction={effectiveDirection}
          expression={expression}
          reducedMotion={shouldReduceMotion || !isPageVisible}
          isHovered={isHovered}
          pupilX={pupilX}
          pupilY={pupilY}
          rig={rig}
          colors={config.colors}
        />
      </button>
    </div>
  );
};

export default ScrollMascot;
