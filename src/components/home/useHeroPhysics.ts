import { useEffect, useRef, useState, useCallback, RefObject } from "react";

export interface PhysicsBodyConfig {
  id: string;
  radius: number;
  mass: number;
  restitution: number;
  initialNx: number;
  initialNy: number;
  initialVx?: number;
}

interface InternalBody {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  omega: number;
  radius: number;
  mass: number;
  restitution: number;
  sleeping: boolean;
  sleepFrames: number;
  isDragging: boolean;
  dragTargetX: number;
  dragTargetY: number;
}

interface ObstacleRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export type TiltStatus =
  | "unsupported"
  | "needs-permission"
  | "active"
  | "denied";

interface UseHeroPhysicsOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  heroRef: RefObject<HTMLElement | null>;
  bodyRefs: RefObject<Array<HTMLDivElement | null>>;
  configs: PhysicsBodyConfig[];
  obstacleSelectors?: string[];
  reducedMotion: boolean;
  isMobile: boolean;
  isBoundedBox?: boolean;
}

const BASE_GRAVITY = 760; // px/s^2
const AIR_DRAG = 0.995;
const ANGULAR_DRAG = 0.988;
const SURFACE_FRICTION_PER_SEC = 0.56; // smooth framerate-independent rolling friction
const SLEEP_SPEED_SQ = 20; // (px/s)^2
const SLEEP_OMEGA = 0.08; // rad/s
const SLEEP_FRAMES_REQUIRED = 32;
const SUBSTEPS = 3;

export function useHeroPhysics({
  containerRef,
  heroRef,
  bodyRefs,
  configs,
  obstacleSelectors = [],
  reducedMotion,
  isMobile,
  isBoundedBox = false,
}: UseHeroPhysicsOptions) {
  const bodiesRef = useRef<InternalBody[]>([]);
  const obstaclesRef = useRef<ObstacleRect[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const gravityRef = useRef({ gx: 0, gy: 1, targetGx: 0, targetGy: 1 });
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    active: false,
  });
  const dragRef = useRef<{
    index: number | null;
    offsetX: number;
    offsetY: number;
  }>({ index: null, offsetX: 0, offsetY: 0 });

  const [tiltStatus, setTiltStatus] = useState<TiltStatus>("unsupported");
  const orientationActiveRef = useRef(false);
  const hasReceivedTiltRef = useRef(false);

  const wakeAllBodies = useCallback(() => {
    const bodies = bodiesRef.current;
    for (let i = 0; i < bodies.length; i++) {
      bodies[i].sleeping = false;
      bodies[i].sleepFrames = 0;
    }
  }, []);

  // Detect whether device orientation is available or requires iOS permission
  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) {
      setTiltStatus("unsupported");
      return;
    }

    const hasOrientation = "DeviceOrientationEvent" in window;
    const isTouchCapable =
      "ontouchstart" in window || (navigator.maxTouchPoints ?? 0) > 0;

    if (!hasOrientation || !isTouchCapable) {
      setTiltStatus("unsupported");
      return;
    }

    const DeviceOrientationCtor = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DeviceOrientationCtor?.requestPermission === "function") {
      setTiltStatus("needs-permission");
    } else {
      setTiltStatus("active");
      orientationActiveRef.current = true;
    }
  }, [reducedMotion]);

  const requestTiltPermission = useCallback(async () => {
    if (typeof window === "undefined") return;
    const DeviceOrientationCtor = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DeviceOrientationCtor?.requestPermission !== "function") {
      orientationActiveRef.current = true;
      setTiltStatus("active");
      return;
    }

    try {
      const response = await DeviceOrientationCtor.requestPermission();
      if (response === "granted") {
        orientationActiveRef.current = true;
        setTiltStatus("active");
        wakeAllBodies();
      } else {
        orientationActiveRef.current = false;
        setTiltStatus("denied");
      }
    } catch {
      orientationActiveRef.current = false;
      setTiltStatus("denied");
    }
  }, [wakeAllBodies]);

  // Main physics simulation, bounds/obstacles measurement, and input listeners
  useEffect(() => {
    const container = containerRef.current;
    const heroEl = heroRef.current || container;
    if (!container || !heroEl) return;

    const finePointerQuery = window.matchMedia("(pointer: fine)");

    let rafId = 0;
    let isRunning = false;
    let isVisible = true;
    let lastTs = 0;

    const getBounds = (w: number, h: number) => {
      if (isBoundedBox) {
        return {
          left: 2,
          right: Math.max(40, w - 2),
          top: 2,
          bottom: Math.max(40, h - 2),
          cornerRadius: Math.min(w * 0.149, h * 0.268),
        };
      }
      return {
        left: isMobile ? 4 : 6,
        right: Math.max(60, w - (isMobile ? 4 : 6)),
        top: isMobile ? 84 : 104,
        bottom: Math.max(150, h - (isMobile ? 65 : 81)),
        cornerRadius: 0,
      };
    };

    const clampToRoundedCorners = (
      b: InternalBody,
      bounds: ReturnType<typeof getBounds>,
      subDt: number,
      applyBounce: boolean,
    ) => {
      const cornerR = bounds.cornerRadius;
      if (cornerR <= b.radius) return;

      const innerLeft = bounds.left + cornerR;
      const innerRight = bounds.right - cornerR;
      const innerTop = bounds.top + cornerR;
      const innerBottom = bounds.bottom - cornerR;

      let cx: number | null = null;
      let cy: number | null = null;
      if (b.x < innerLeft && b.y < innerTop) {
        cx = innerLeft;
        cy = innerTop;
      } else if (b.x > innerRight && b.y < innerTop) {
        cx = innerRight;
        cy = innerTop;
      } else if (b.x < innerLeft && b.y > innerBottom) {
        cx = innerLeft;
        cy = innerBottom;
      } else if (b.x > innerRight && b.y > innerBottom) {
        cx = innerRight;
        cy = innerBottom;
      }

      if (cx === null || cy === null) return;

      const dx = b.x - cx;
      const dy = b.y - cy;
      const dist = Math.hypot(dx, dy);
      const maxDist = Math.max(1, cornerR - b.radius);
      if (dist <= maxDist || dist < 0.0001) return;

      const nx = -dx / dist;
      const ny = -dy / dist;
      b.x = cx + (dx / dist) * maxDist;
      b.y = cy + (dy / dist) * maxDist;

      if (!applyBounce) return;

      const vn = b.vx * nx + b.vy * ny;
      if (vn < 0) {
        const tx = -ny;
        const ty = nx;
        const vt = b.vx * tx + b.vy * ty;
        const bounce = Math.abs(vn) > 32 ? b.restitution : 0;
        const newVn = -vn * bounce;
        const newVt = vt * Math.pow(SURFACE_FRICTION_PER_SEC, subDt);
        b.vx = nx * newVn + tx * newVt;
        b.vy = ny * newVn + ty * newVt;
        b.omega = (newVt / b.radius) * 0.68 + b.omega * 0.32;
      }
    };

    const measureObstacles = () => {
      if (obstacleSelectors.length === 0) {
        obstaclesRef.current = [];
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const rects: ObstacleRect[] = [];
      for (let s = 0; s < obstacleSelectors.length; s++) {
        const nodes = heroEl.querySelectorAll(obstacleSelectors[s]);
        nodes.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) {
            rects.push({
              left: r.left - containerRect.left - 4,
              top: r.top - containerRect.top - 4,
              right: r.right - containerRect.left + 4,
              bottom: r.bottom - containerRect.top + 4,
            });
          }
        });
      }
      obstaclesRef.current = rects;
    };

    const syncDom = () => {
      const els = bodyRefs.current;
      const bodies = bodiesRef.current;
      if (!els) return;
      for (let i = 0; i < bodies.length; i++) {
        const el = els[i];
        if (!el) continue;
        const b = bodies[i];
        el.style.transform = `translate3d(${(b.x - b.radius).toFixed(2)}px, ${(b.y - b.radius).toFixed(2)}px, 0) rotate(${b.angle.toFixed(3)}rad)`;
      }
    };

    const pushOutOfObstacles = (b: InternalBody) => {
      const obstacles = obstaclesRef.current;
      for (let o = 0; o < obstacles.length; o++) {
        const obs = obstacles[o];
        const closestX = Math.max(obs.left, Math.min(b.x, obs.right));
        const closestY = Math.max(obs.top, Math.min(b.y, obs.bottom));
        const dx = b.x - closestX;
        const dy = b.y - closestY;
        const distSq = dx * dx + dy * dy;

        if (distSq < b.radius * b.radius) {
          let nx = 0;
          let ny = 0;
          let penetration = 0;

          if (distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            nx = dx / dist;
            ny = dy / dist;
            penetration = b.radius - dist;
          } else {
            // Center is inside AABB: push out via nearest edge
            const dLeft = Math.abs(b.x - obs.left);
            const dRight = Math.abs(obs.right - b.x);
            const dTop = Math.abs(b.y - obs.top);
            const dBottom = Math.abs(obs.bottom - b.y);
            const minEdge = Math.min(dLeft, dRight, dTop, dBottom);
            if (minEdge === dTop) {
              nx = 0;
              ny = -1;
              penetration = dTop + b.radius;
            } else if (minEdge === dBottom) {
              nx = 0;
              ny = 1;
              penetration = dBottom + b.radius;
            } else if (minEdge === dLeft) {
              nx = -1;
              ny = 0;
              penetration = dLeft + b.radius;
            } else {
              nx = 1;
              ny = 0;
              penetration = dRight + b.radius;
            }
          }

          b.x += nx * penetration;
          b.y += ny * penetration;

          const vn = b.vx * nx + b.vy * ny;
          if (vn < 0) {
            const tx = -ny;
            const ty = nx;
            const vt = b.vx * tx + b.vy * ty;
            const bounce = Math.abs(vn) > 35 ? b.restitution : 0;
            const newVn = -vn * bounce;
            const newVt = vt * Math.pow(SURFACE_FRICTION_PER_SEC, subDt);

            b.vx = nx * newVn + tx * newVt;
            b.vy = ny * newVn + ty * newVt;
            b.omega = (newVt / b.radius) * 0.65 + b.omega * 0.35;
          }

          // Gently roll off the top face of protected content obstacles instead of resting mid-air above text
          if (ny < -0.7 && Math.abs(b.vx) < 28) {
            const obsCenterX = (obs.left + obs.right) * 0.5;
            const slideDir = b.x >= obsCenterX ? 1 : -1;
            b.vx += slideDir * 14;
          }
        }
      }
    };

    const initializeBodies = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      sizeRef.current = { width, height };
      measureObstacles();
      const bounds = getBounds(width, height);

      bodiesRef.current = configs.map((cfg, idx) => {
        const spawnX =
          bounds.left +
          cfg.radius +
          cfg.initialNx * Math.max(20, bounds.right - bounds.left - cfg.radius * 2);
        const spawnY =
          bounds.top +
          cfg.radius +
          cfg.initialNy * Math.max(20, bounds.bottom - bounds.top - cfg.radius * 2);

        const body: InternalBody = {
          id: cfg.id,
          x: spawnX,
          y: spawnY,
          vx: reducedMotion
            ? 0
            : (cfg.initialVx ?? (idx % 2 === 0 ? 1 : -1) * (65 + idx * 18)),
          vy: 0,
          angle: reducedMotion ? 0 : (idx - 2.5) * 0.08,
          omega: 0,
          radius: cfg.radius,
          mass: cfg.mass,
          restitution: cfg.restitution,
          sleeping: reducedMotion,
          sleepFrames: 0,
          isDragging: false,
          dragTargetX: spawnX,
          dragTargetY: spawnY,
        };
        pushOutOfObstacles(body);
        return body;
      });

      syncDom();
    };

    const stepPhysics = (dt: number) => {
      const { width, height } = sizeRef.current;
      if (width <= 0 || height <= 0) return;

      const bounds = getBounds(width, height);
      const bodies = bodiesRef.current;
      const g = gravityRef.current;

      // Smooth gravity vector (prevents orientation or mouse jitter)
      g.gx += (g.targetGx - g.gx) * 0.14;
      g.gy += (g.targetGy - g.gy) * 0.14;

      const subDt = dt / SUBSTEPS;

      for (let step = 0; step < SUBSTEPS; step++) {
        // 1. Integrate forces & velocities
        for (let i = 0; i < bodies.length; i++) {
          const b = bodies[i];

          if (b.isDragging) {
            const clampedX = Math.max(
              bounds.left + b.radius,
              Math.min(bounds.right - b.radius, b.dragTargetX),
            );
            const clampedY = Math.max(
              bounds.top + b.radius,
              Math.min(bounds.bottom - b.radius, b.dragTargetY),
            );
            b.vx = (clampedX - b.x) / Math.max(subDt, 0.008);
            b.vy = (clampedY - b.y) / Math.max(subDt, 0.008);
            b.x = clampedX;
            b.y = clampedY;
            clampToRoundedCorners(b, bounds, subDt, false);
            b.omega = (b.vx / b.radius) * 0.25;
            b.sleeping = false;
            b.sleepFrames = 0;
            continue;
          }

          if (b.sleeping) continue;

          // Progressive gravitational acceleration (scaled slightly by mass feel)
          b.vx += g.gx * BASE_GRAVITY * subDt;
          b.vy += g.gy * BASE_GRAVITY * subDt;

          // Subtle desktop pointer proximity nudge (optional, calm)
          if (pointerRef.current.active && !hasReceivedTiltRef.current) {
            const dx = b.x - pointerRef.current.x;
            const dy = b.y - pointerRef.current.y;
            const distSq = dx * dx + dy * dy;
            const influenceRadius = b.radius + (isBoundedBox ? 52 : 78);
            if (distSq < influenceRadius * influenceRadius && distSq > 1) {
              const dist = Math.sqrt(distSq);
              const factor = 1 - dist / influenceRadius;
              const push = factor * 240 * subDt;
              b.vx += (dx / dist) * push + pointerRef.current.vx * factor * 0.04;
              b.vy += (dy / dist) * push + pointerRef.current.vy * factor * 0.04;
            }
          }

          // Air drag
          const dragPow = Math.pow(AIR_DRAG, subDt * 60);
          b.vx *= dragPow;
          b.vy *= dragPow;
          b.omega *= Math.pow(ANGULAR_DRAG, subDt * 60);

          b.x += b.vx * subDt;
          b.y += b.vy * subDt;
          b.angle += b.omega * subDt;

          // 2. Boundary collisions (left, right, top, bottom)
          if (b.x - b.radius < bounds.left) {
            b.x = bounds.left + b.radius;
            if (b.vx < 0) {
              b.vx = -b.vx * (Math.abs(b.vx) > 30 ? b.restitution : 0);
              b.vy *= Math.pow(SURFACE_FRICTION_PER_SEC, subDt);
              b.omega = -(b.vy / b.radius) * 0.6;
            }
          } else if (b.x + b.radius > bounds.right) {
            b.x = bounds.right - b.radius;
            if (b.vx > 0) {
              b.vx = -b.vx * (Math.abs(b.vx) > 30 ? b.restitution : 0);
              b.vy *= Math.pow(SURFACE_FRICTION_PER_SEC, subDt);
              b.omega = (b.vy / b.radius) * 0.6;
            }
          }

          if (b.y - b.radius < bounds.top) {
            b.y = bounds.top + b.radius;
            if (b.vy < 0) {
              b.vy = -b.vy * (Math.abs(b.vy) > 30 ? b.restitution : 0);
              b.vx *= Math.pow(SURFACE_FRICTION_PER_SEC, subDt);
              b.omega = -(b.vx / b.radius) * 0.6;
            }
          } else if (b.y + b.radius > bounds.bottom) {
            b.y = bounds.bottom - b.radius;
            if (b.vy > 0) {
              b.vy = -b.vy * (Math.abs(b.vy) > 32 ? b.restitution : 0);
              b.vx *= Math.pow(SURFACE_FRICTION_PER_SEC, subDt);
              b.omega = (b.vx / b.radius) * 0.72;
            }
          }

          clampToRoundedCorners(b, bounds, subDt, true);

          // 3. Protected content obstacle collisions
          pushOutOfObstacles(b);
        }

        // 4. Pairwise disc-to-disc elastic/inelastic collisions
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i];
            const b = bodies[j];

            if (a.sleeping && b.sleeping) continue;

            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const minDist = a.radius + b.radius;
            const distSq = dx * dx + dy * dy;

            if (distSq < minDist * minDist) {
              const dist = distSq > 0.0001 ? Math.sqrt(distSq) : 0.01;
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = minDist - dist;

              const invMassA = a.isDragging ? 0 : 1 / a.mass;
              const invMassB = b.isDragging ? 0 : 1 / b.mass;
              const totalInvMass = invMassA + invMassB;
              if (totalInvMass === 0) continue;

              // Positional correction
              const corr = (overlap / totalInvMass) * 0.85;
              a.x -= nx * corr * invMassA;
              a.y -= ny * corr * invMassA;
              b.x += nx * corr * invMassB;
              b.y += ny * corr * invMassB;

              // Relative velocity along collision normal
              const rvx = b.vx - a.vx;
              const rvy = b.vy - a.vy;
              const velAlongNormal = rvx * nx + rvy * ny;

              if (velAlongNormal < 0) {
                const e =
                  Math.abs(velAlongNormal) > 35
                    ? Math.min(a.restitution, b.restitution)
                    : 0.08;
                const jImpulse = (-(1 + e) * velAlongNormal) / totalInvMass;

                const impulseX = jImpulse * nx;
                const impulseY = jImpulse * ny;

                a.vx -= impulseX * invMassA;
                a.vy -= impulseY * invMassA;
                b.vx += impulseX * invMassB;
                b.vy += impulseY * invMassB;

                // Tangential spin exchange on oblique impacts
                const tx = -ny;
                const ty = nx;
                const velTangent = rvx * tx + rvy * ty;
                const spinTransfer = velTangent * 0.018;
                a.omega += spinTransfer * invMassA;
                b.omega -= spinTransfer * invMassB;

                if (Math.abs(velAlongNormal) > 20) {
                  a.sleeping = false;
                  b.sleeping = false;
                  a.sleepFrames = 0;
                  b.sleepFrames = 0;
                }
              }
            }
          }
        }
      }

      // 5. Sleep check to prevent micro-jitter at rest
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (b.isDragging) continue;
        const speedSq = b.vx * b.vx + b.vy * b.vy;
        if (speedSq < SLEEP_SPEED_SQ && Math.abs(b.omega) < SLEEP_OMEGA) {
          b.sleepFrames++;
          if (b.sleepFrames >= SLEEP_FRAMES_REQUIRED) {
            b.vx = 0;
            b.vy = 0;
            b.omega = 0;
            b.sleeping = true;
          }
        } else {
          b.sleepFrames = 0;
        }
      }

      syncDom();
    };

    const tick = (ts: number) => {
      if (!isRunning) return;
      if (lastTs === 0) lastTs = ts;
      const dt = Math.min(0.032, (ts - lastTs) / 1000);
      lastTs = ts;
      stepPhysics(dt);
      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (reducedMotion || !isVisible || document.hidden) return;
      if (!isRunning) {
        isRunning = true;
        lastTs = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    // DeviceOrientation handler (mobile tilt controls gravity direction)
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!orientationActiveRef.current || reducedMotion) return;
      if (e.beta === null || e.gamma === null) return;
      hasReceivedTiltRef.current = true;

      // Normalize screen rotation (portrait vs landscape)
      const screenAngle =
        window.screen?.orientation?.angle ??
        ((window as unknown as { orientation?: number }).orientation || 0);

      let rawGx = Math.max(-1, Math.min(1, e.gamma / 42));
      // Offset upright comfortable viewing angle (~32 deg) slightly while keeping flat/tilted natural
      let rawGy = Math.max(-1, Math.min(1, Math.sin((e.beta * Math.PI) / 180) * 1.15));

      // Handle landscape orientations cleanly
      if (screenAngle === 90) {
        const tmp = rawGx;
        rawGx = rawGy;
        rawGy = -tmp;
      } else if (screenAngle === -90 || screenAngle === 270) {
        const tmp = rawGx;
        rawGx = -rawGy;
        rawGy = tmp;
      } else if (screenAngle === 180) {
        rawGx = -rawGx;
        rawGy = -rawGy;
      }

      // Clamp magnitude so gravity feels steady and physical
      const mag = Math.hypot(rawGx, rawGy);
      if (mag > 1.15) {
        rawGx /= mag / 1.15;
        rawGy /= mag / 1.15;
      }

      const prevTarget = gravityRef.current;
      const delta =
        Math.abs(rawGx - prevTarget.targetGx) +
        Math.abs(rawGy - prevTarget.targetGy);

      prevTarget.targetGx = rawGx;
      prevTarget.targetGy = rawGy;

      if (delta > 0.045 || Math.abs(rawGx) > 0.14) {
        wakeAllBodies();
      }
    };

    let lastWakeGx = 0;

    // Desktop subtle mouse interaction + pointer drag
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      if (dragRef.current.index !== null) {
        const idx = dragRef.current.index;
        const b = bodiesRef.current[idx];
        if (b) {
          b.dragTargetX = localX + dragRef.current.offsetX;
          b.dragTargetY = localY + dragRef.current.offsetY;
        }
      }

      if (reducedMotion || !finePointerQuery.matches || hasReceivedTiltRef.current) {
        return;
      }

      if (
        localX < 0 ||
        localX > rect.width ||
        localY < 0 ||
        localY > rect.height
      ) {
        pointerRef.current.active = false;
        gravityRef.current.targetGx = 0;
        gravityRef.current.targetGy = 1;
        if (Math.abs(lastWakeGx) > 0.04) {
          lastWakeGx = 0;
          wakeAllBodies();
        }
        return;
      }

      pointerRef.current.vx = localX - pointerRef.current.x;
      pointerRef.current.vy = localY - pointerRef.current.y;
      pointerRef.current.x = localX;
      pointerRef.current.y = localY;
      pointerRef.current.active = true;

      // Subtle desktop gravity tilt bias from horizontal pointer position
      const normX = (localX / Math.max(1, rect.width)) * 2 - 1;
      const nextGx = normX * 0.14;
      gravityRef.current.targetGx = nextGx;
      gravityRef.current.targetGy = 1;

      if (Math.abs(nextGx - lastWakeGx) > 0.06) {
        lastWakeGx = nextGx;
        wakeAllBodies();
      }

      // Wake bodies near the cursor so pointer sweeps gently nudge settled icons
      const bodies = bodiesRef.current;
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (!b.sleeping) continue;
        const d = Math.hypot(b.x - localX, b.y - localY);
        if (d < b.radius + 78) {
          b.sleeping = false;
          b.sleepFrames = 0;
        }
      }
    };

    const handlePointerUp = () => {
      const idx = dragRef.current.index;
      if (idx !== null && bodiesRef.current[idx]) {
        bodiesRef.current[idx].isDragging = false;
      }
      dragRef.current.index = null;
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
      if (!hasReceivedTiltRef.current) {
        gravityRef.current.targetGx = 0;
        gravityRef.current.targetGy = 1;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    initializeBodies();
    const obstacleRefreshTimer = window.setTimeout(measureObstacles, 950);

    const resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      sizeRef.current = {
        width: Math.max(1, Math.floor(rect.width)),
        height: Math.max(1, Math.floor(rect.height)),
      };
      measureObstacles();
      const bounds = getBounds(sizeRef.current.width, sizeRef.current.height);
      bodiesRef.current.forEach((b) => {
        b.x = Math.max(bounds.left + b.radius, Math.min(bounds.right - b.radius, b.x));
        b.y = Math.max(bounds.top + b.radius, Math.min(bounds.bottom - b.radius, b.y));
        clampToRoundedCorners(b, bounds, 0, false);
        pushOutOfObstacles(b);
      });
      wakeAllBodies();
      syncDom();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) startLoop();
        else stopLoop();
      },
      { threshold: 0.02 },
    );
    intersectionObserver.observe(heroEl);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("deviceorientation", handleDeviceOrientation, true);
    heroEl.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    startLoop();

    return () => {
      stopLoop();
      window.clearTimeout(obstacleRefreshTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("deviceorientation", handleDeviceOrientation, true);
      heroEl.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      bodiesRef.current = [];
      obstaclesRef.current = [];
    };
  }, [
    bodyRefs,
    configs,
    containerRef,
    heroRef,
    isBoundedBox,
    isMobile,
    obstacleSelectors,
    reducedMotion,
    wakeAllBodies,
  ]);

  const startDrag = useCallback(
    (index: number, clientX: number, clientY: number) => {
      if (reducedMotion || !containerRef.current || !bodiesRef.current[index]) {
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;
      const b = bodiesRef.current[index];
      b.isDragging = true;
      b.dragTargetX = b.x;
      b.dragTargetY = b.y;
      b.sleeping = false;
      b.sleepFrames = 0;
      dragRef.current = {
        index,
        offsetX: b.x - localX,
        offsetY: b.y - localY,
      };
      wakeAllBodies();
    },
    [containerRef, reducedMotion, wakeAllBodies],
  );

  const nudgeBody = useCallback(
    (index: number) => {
      if (reducedMotion || !bodiesRef.current[index]) return;
      const b = bodiesRef.current[index];
      b.vy -= 260;
      b.vx += (index % 2 === 0 ? 1 : -1) * 90;
      b.omega += (index % 2 === 0 ? 1 : -1) * 3.2;
      b.sleeping = false;
      b.sleepFrames = 0;
      wakeAllBodies();
    },
    [reducedMotion, wakeAllBodies],
  );

  return {
    tiltStatus,
    requestTiltPermission,
    startDrag,
    nudgeBody,
  };
}
