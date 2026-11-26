import Lenis from "lenis";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  LiveScrollTelemetry,
  MascotConfig,
  ScrollBehaviorSnapshot,
  ScrollDirection,
  ScrollSpeedBand,
} from "./mascot.types";
import { classifyScrollSpeed } from "./mascot.utils";

interface UseScrollBehaviorOptions {
  config: MascotConfig;
  lenis?: Lenis | null;
  disabled?: boolean;
  onScrollStart?: () => void;
  onSpike?: (velocity: number, direction: ScrollDirection) => void;
}

const INITIAL_SNAPSHOT: ScrollBehaviorSnapshot = {
  scrollY: 0,
  prevScrollY: 0,
  direction: "none",
  velocity: 0,
  speedBand: "idle",
  isScrolling: false,
  timeSinceStopMs: 0,
};

/**
 * Scroll telemetry engine wired directly to Lenis when available (avoiding
 * duplicate scroll listeners / rAF loops), with a passive native window scroll
 * fallback. Updates `liveTelemetryRef` synchronously for 0-lag run cycles and
 * only triggers React renders when discrete state changes.
 */
export function useScrollBehavior({
  config,
  lenis = null,
  disabled = false,
  onScrollStart,
  onSpike,
}: UseScrollBehaviorOptions): {
  snapshot: ScrollBehaviorSnapshot;
  liveTelemetryRef: MutableRefObject<LiveScrollTelemetry>;
} {
  const [snapshot, setSnapshot] = useState<ScrollBehaviorSnapshot>(() => ({
    ...INITIAL_SNAPSHOT,
    scrollY: typeof window !== "undefined" ? window.scrollY : 0,
    prevScrollY: typeof window !== "undefined" ? window.scrollY : 0,
  }));

  const liveTelemetryRef = useRef<LiveScrollTelemetry>({
    velocity: 0,
    direction: "none",
    isScrolling: false,
    lastScrollTimestamp: 0,
  });

  const onSpikeRef = useRef(onSpike);
  onSpikeRef.current = onSpike;
  const onScrollStartRef = useRef(onScrollStart);
  onScrollStartRef.current = onScrollStart;

  useEffect(() => {
    if (typeof window === "undefined" || disabled) {
      liveTelemetryRef.current = {
        velocity: 0,
        direction: "none",
        isScrolling: false,
        lastScrollTimestamp: 0,
      };
      setSnapshot((prev) =>
        prev.isScrolling || prev.speedBand !== "idle"
          ? { ...prev, isScrolling: false, speedBand: "idle", velocity: 0 }
          : prev,
      );
      return;
    }

    let lastY = lenis ? lenis.scroll : window.scrollY;
    let lastTime = performance.now();
    let smoothedVelocity = 0;
    let currentDirection: ScrollDirection = "none";
    let currentBand: ScrollSpeedBand = "idle";
    let activeScrolling = false;
    let stoppedAtTime = lastTime;

    let stopTimer = 0;
    let lastSpikeTime = 0;

    const commitDiscreteChange = (nextTime: number, force = false) => {
      const nextStopElapsed = activeScrolling
        ? 0
        : Math.max(0, nextTime - stoppedAtTime);
      setSnapshot((prev) => {
        if (
          !force &&
          prev.isScrolling === activeScrolling &&
          prev.direction === currentDirection &&
          prev.speedBand === currentBand
        ) {
          return prev;
        }
        return {
          scrollY: lastY,
          prevScrollY: prev.scrollY,
          direction: currentDirection,
          velocity: Math.round(smoothedVelocity),
          speedBand: currentBand,
          isScrolling: activeScrolling,
          timeSinceStopMs: nextStopElapsed,
        };
      });
    };

    const stopNow = (now = performance.now()) => {
      if (stopTimer) {
        window.clearTimeout(stopTimer);
        stopTimer = 0;
      }
      if (!activeScrolling && smoothedVelocity === 0) return;
      activeScrolling = false;
      smoothedVelocity = 0;
      currentBand = "idle";
      stoppedAtTime = now;
      liveTelemetryRef.current = {
        ...liveTelemetryRef.current,
        velocity: 0,
        isScrolling: false,
      };
      commitDiscreteChange(stoppedAtTime, true);
    };

    const scheduleStop = () => {
      if (stopTimer) window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => {
        stopNow(performance.now());
      }, config.scrollStopDelayMs);
    };

    const processScrollSample = (
      nextY: number,
      explicitVelocityPxPerSec?: number,
      explicitDirection?: ScrollDirection,
    ) => {
      if (document.hidden) return;

      const now = performance.now();
      const dy = nextY - lastY;
      const dtMs = Math.max(6, now - lastTime);
      const computedVel = (Math.abs(dy) / dtMs) * 1000;
      const instantVelocity =
        explicitVelocityPxPerSec !== undefined
          ? Math.max(computedVel, explicitVelocityPxPerSec)
          : computedVel;

      // Cut off micro Lenis exponential inertia tail cleanly when visually stationary
      if (Math.abs(dy) < 0.45 && instantVelocity < 38) {
        lastY = nextY;
        lastTime = now;
        if (activeScrolling && instantVelocity < 22) {
          stopNow(now);
        }
        return;
      }

      if (instantVelocity < 28 && !activeScrolling) {
        lastY = nextY;
        lastTime = now;
        return;
      }

      smoothedVelocity = activeScrolling
        ? smoothedVelocity * 0.45 + instantVelocity * 0.55
        : Math.max(instantVelocity, 160);

      const nextDirection: ScrollDirection =
        explicitDirection && explicitDirection !== "none"
          ? explicitDirection
          : dy > 0
            ? "down"
            : dy < 0
              ? "up"
              : currentDirection;

      const nextBand = classifyScrollSpeed(
        Math.max(smoothedVelocity, instantVelocity * 0.72),
        config,
      );

      const justStarted = !activeScrolling;
      activeScrolling = true;
      currentDirection = nextDirection;
      currentBand = nextBand === "idle" ? "slow" : nextBand;
      lastY = nextY;
      lastTime = now;

      liveTelemetryRef.current = {
        velocity: smoothedVelocity,
        direction: nextDirection,
        isScrolling: true,
        lastScrollTimestamp: now,
      };

      if (justStarted) {
        onScrollStartRef.current?.();
      }

      if (
        instantVelocity >= config.surprisedVelocityThreshold &&
        now - lastSpikeTime > config.surprisedDurationMs * 1.5
      ) {
        lastSpikeTime = now;
        onSpikeRef.current?.(instantVelocity, nextDirection);
      }

      commitDiscreteChange(now);
      scheduleStop();
    };

    const handleLenisScroll = (instance: Lenis) => {
      // Lenis `velocity` is displacement per frame; normalize to ~px/s for threshold stability
      const velPxSec = Math.abs(instance.velocity) * 60;
      const dir: ScrollDirection =
        instance.direction > 0 ? "down" : instance.direction < 0 ? "up" : "none";
      processScrollSample(instance.scroll, velPxSec, dir);
    };

    const handleWindowScroll = () => {
      processScrollSample(window.scrollY);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopNow(performance.now());
      } else {
        lastY = lenis ? lenis.scroll : window.scrollY;
        lastTime = performance.now();
      }
    };

    if (lenis) {
      lenis.on("scroll", handleLenisScroll);
    } else {
      window.addEventListener("scroll", handleWindowScroll, { passive: true });
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (lenis) {
        lenis.off("scroll", handleLenisScroll);
      } else {
        window.removeEventListener("scroll", handleWindowScroll);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (stopTimer) window.clearTimeout(stopTimer);
    };
  }, [
    config,
    config.fastScrollThreshold,
    config.normalScrollThreshold,
    config.scrollStopDelayMs,
    config.surprisedDurationMs,
    config.surprisedVelocityThreshold,
    disabled,
    lenis,
  ]);

  return { snapshot, liveTelemetryRef };
}
