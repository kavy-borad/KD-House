import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useHeroPhysics, PhysicsBodyConfig } from "./useHeroPhysics";

interface TechTokenMeta {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgTint: string;
  borderTint: string;
  mass: number;
  restitution: number;
  initialNx: number;
  initialNy: number;
  initialVx: number;
}

const ALL_TECH_TOKENS: TechTokenMeta[] = [
  {
    id: "react",
    label: "React",
    icon: "fab fa-react",
    color: "#2563EB",
    bgTint: "rgba(239, 246, 255, 0.94)",
    borderTint: "rgba(147, 197, 253, 0.9)",
    mass: 0.95,
    restitution: 0.54,
    initialNx: 0.16,
    initialNy: 0.12,
    initialVx: 45,
  },
  {
    id: "python",
    label: "Python",
    icon: "fab fa-python",
    color: "#1D4ED8",
    bgTint: "rgba(239, 246, 255, 0.94)",
    borderTint: "rgba(147, 197, 253, 0.9)",
    mass: 1.05,
    restitution: 0.5,
    initialNx: 0.84,
    initialNy: 0.1,
    initialVx: -45,
  },
  {
    id: "js",
    label: "JavaScript",
    icon: "fab fa-js",
    color: "#B45309",
    bgTint: "rgba(255, 251, 235, 0.94)",
    borderTint: "rgba(252, 211, 77, 0.9)",
    mass: 0.9,
    restitution: 0.56,
    initialNx: 0.38,
    initialNy: 0.08,
    initialVx: 28,
  },
  {
    id: "node",
    label: "Node.js",
    icon: "fab fa-node-js",
    color: "#15803D",
    bgTint: "rgba(240, 253, 244, 0.94)",
    borderTint: "rgba(134, 239, 172, 0.9)",
    mass: 1.1,
    restitution: 0.48,
    initialNx: 0.62,
    initialNy: 0.14,
    initialVx: -28,
  },
  {
    id: "docker",
    label: "Docker",
    icon: "fab fa-docker",
    color: "#0284C7",
    bgTint: "rgba(240, 249, 255, 0.94)",
    borderTint: "rgba(125, 211, 252, 0.9)",
    mass: 1.18,
    restitution: 0.46,
    initialNx: 0.24,
    initialNy: 0.28,
    initialVx: 65,
  },
  {
    id: "aws",
    label: "AWS",
    icon: "fab fa-aws",
    color: "#C2410C",
    bgTint: "rgba(255, 247, 237, 0.94)",
    borderTint: "rgba(253, 186, 116, 0.9)",
    mass: 1.22,
    restitution: 0.45,
    initialNx: 0.76,
    initialNy: 0.26,
    initialVx: -65,
  },
];

const EMPTY_OBSTACLE_SELECTORS: string[] = [];

const HeroTechNodes = () => {
  const shouldReduceMotion = !!useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroElRef = useRef<HTMLElement | null>(null);
  const bodyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pointerDownPosRef = useRef<{ x: number; y: number } | null>(null);

  const [viewportMode, setViewportMode] = useState<
    "mobile" | "tablet" | "lg" | "desktop"
  >(() => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth < 768) return "mobile";
    if (window.innerWidth < 1024) return "tablet";
    if (window.innerWidth < 1280) return "lg";
    return "desktop";
  });

  useEffect(() => {
    heroElRef.current = containerRef.current;

    const updateMode = () => {
      const w = window.innerWidth;
      const next =
        w < 768
          ? "mobile"
          : w < 1024
            ? "tablet"
            : w < 1280
              ? "lg"
              : "desktop";
      setViewportMode((prev) => (prev === next ? prev : next));
    };

    window.addEventListener("resize", updateMode, { passive: true });
    return () => window.removeEventListener("resize", updateMode);
  }, []);

  const activeTokens = useMemo(() => {
    if (viewportMode === "mobile") return ALL_TECH_TOKENS.slice(0, 4);
    if (viewportMode === "tablet") return ALL_TECH_TOKENS.slice(0, 4);
    return ALL_TECH_TOKENS;
  }, [viewportMode]);

  const radius =
    viewportMode === "mobile"
      ? 16
      : viewportMode === "tablet" || viewportMode === "lg"
        ? 17
        : 21;

  const physicsConfigs = useMemo<PhysicsBodyConfig[]>(
    () =>
      activeTokens.map((t) => ({
        id: t.id,
        radius,
        mass: t.mass,
        restitution: t.restitution,
        initialNx: t.initialNx,
        initialNy: t.initialNy,
        initialVx: t.initialVx,
      })),
    [activeTokens, radius],
  );

  const isMobile = viewportMode === "mobile";

  const { tiltStatus, requestTiltPermission, startDrag, nudgeBody } =
    useHeroPhysics({
      containerRef,
      heroRef: heroElRef,
      bodyRefs,
      configs: physicsConfigs,
      obstacleSelectors: EMPTY_OBSTACLE_SELECTORS,
      reducedMotion: shouldReduceMotion,
      isMobile,
      isBoundedBox: true,
    });

  const handleTokenPointerDown = (
    idx: number,
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (shouldReduceMotion || isMobile) return;
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
    startDrag(idx, e.clientX, e.clientY);
  };

  const handleTokenClick = (
    idx: number,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (shouldReduceMotion || isMobile) return;
    const down = pointerDownPosRef.current;
    pointerDownPosRef.current = null;
    if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) {
      return;
    }
    nudgeBody(idx);
  };

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="relative w-full h-full pointer-events-none"
      >
        {activeTokens.map((token, idx) => {
          const diameter = radius * 2;
          return (
            <div
              key={token.id}
              ref={(el) => {
                bodyRefs.current[idx] = el;
              }}
              onPointerDown={(e) => handleTokenPointerDown(idx, e)}
              onClick={(e) => handleTokenClick(idx, e)}
              title={isMobile ? undefined : `${token.label} — drag or click`}
              style={{
                width: `${diameter}px`,
                height: `${diameter}px`,
                backgroundColor: token.bgTint,
                borderColor: token.borderTint,
                boxShadow:
                  "0 6px 16px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
              }}
              className={`absolute top-0 left-0 rounded-full border flex items-center justify-center will-change-transform select-none backdrop-blur-[2px] ${
                isMobile
                  ? "pointer-events-none"
                  : "pointer-events-auto cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
              }`}
            >
              <i
                className={`${token.icon} ${
                  radius <= 17 ? "text-[16px]" : "text-[19px]"
                }`}
                style={{ color: token.color }}
              />
            </div>
          );
        })}
      </div>

      {/* Unobtrusive iOS / permission-gated tilt opt-in control */}
      {tiltStatus === "needs-permission" && !shouldReduceMotion && (
        <div className="md:hidden fixed bottom-20 right-4 z-30">
          <button
            type="button"
            onClick={requestTiltPermission}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm active:scale-95 transition-transform"
          >
            <i className="fas fa-compass text-blue-600 text-[11px]" />
            <span>Enable Tilt</span>
          </button>
        </div>
      )}
    </>
  );
};

export default HeroTechNodes;
