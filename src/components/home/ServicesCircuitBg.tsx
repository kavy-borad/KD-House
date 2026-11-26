import { RefObject, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const CX = 400;
const CY = 400;

type TraceStep =
  | { kind: "arc"; r: number; from: number; to: number }
  | { kind: "radial"; deg: number; toR: number };

interface TraceDef {
  steps: TraceStep[];
  startDot?: boolean;
  endDot?: boolean;
  accent?: boolean;
}

const polar = (r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: +(CX + r * Math.cos(rad)).toFixed(2),
    y: +(CY + r * Math.sin(rad)).toFixed(2),
  };
};

const buildTracePath = (steps: TraceStep[]) => {
  if (steps.length === 0) return { d: "", start: null, end: null };
  const first = steps[0];
  const startPt =
    first.kind === "arc"
      ? polar(first.r, first.from)
      : polar(first.toR, first.deg);

  let d = `M ${startPt.x} ${startPt.y}`;
  let endPt = startPt;

  for (const step of steps) {
    if (step.kind === "arc") {
      const p = polar(step.r, step.to);
      const sweep = step.to > step.from ? 1 : 0;
      const largeArc = Math.abs(step.to - step.from) > 180 ? 1 : 0;
      d += ` A ${step.r} ${step.r} 0 ${largeArc} ${sweep} ${p.x} ${p.y}`;
      endPt = p;
    } else {
      const p = polar(step.toR, step.deg);
      d += ` L ${p.x} ${p.y}`;
      endPt = p;
    }
  }

  return { d, start: startPt, end: endPt };
};

const OUTER_TRACES: TraceDef[] = [
  {
    startDot: true,
    endDot: true,
    steps: [
      { kind: "arc", r: 312, from: -142, to: -98 },
      { kind: "radial", deg: -98, toR: 288 },
      { kind: "arc", r: 288, from: -98, to: -52 },
    ],
  },
  {
    startDot: true,
    steps: [
      { kind: "arc", r: 312, from: -68, to: -18 },
      { kind: "radial", deg: -18, toR: 288 },
      { kind: "arc", r: 288, from: -18, to: -42 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    accent: true,
    steps: [
      { kind: "arc", r: 288, from: -136, to: -108 },
      { kind: "radial", deg: -108, toR: 312 },
      { kind: "arc", r: 312, from: -108, to: -82 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    steps: [
      { kind: "arc", r: 312, from: -6, to: 52 },
      { kind: "radial", deg: 52, toR: 288 },
      { kind: "arc", r: 288, from: 52, to: 18 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    steps: [
      { kind: "arc", r: 288, from: 66, to: 112 },
      { kind: "radial", deg: 112, toR: 312 },
      { kind: "arc", r: 312, from: 112, to: 146 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    accent: true,
    steps: [
      { kind: "arc", r: 312, from: 64, to: 102 },
    ],
  },
];

const MID_TRACES: TraceDef[] = [
  {
    startDot: true,
    endDot: true,
    steps: [
      { kind: "arc", r: 262, from: -132, to: -74 },
      { kind: "radial", deg: -74, toR: 238 },
      { kind: "arc", r: 238, from: -74, to: -24 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    accent: true,
    steps: [
      { kind: "arc", r: 238, from: -124, to: -88 },
      { kind: "radial", deg: -88, toR: 262 },
      { kind: "arc", r: 262, from: -88, to: -56 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    steps: [
      { kind: "arc", r: 262, from: -10, to: 38 },
      { kind: "radial", deg: 38, toR: 238 },
      { kind: "arc", r: 238, from: 38, to: 84 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    steps: [
      { kind: "arc", r: 238, from: -2, to: 26 },
      { kind: "radial", deg: 26, toR: 262 },
      { kind: "arc", r: 262, from: 26, to: 60 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    accent: true,
    steps: [
      { kind: "arc", r: 262, from: 94, to: 138 },
      { kind: "radial", deg: 138, toR: 238 },
      { kind: "arc", r: 238, from: 138, to: 112 },
    ],
  },
];

const INNER_TRACES: TraceDef[] = [
  {
    startDot: true,
    endDot: true,
    steps: [
      { kind: "arc", r: 212, from: -122, to: -62 },
      { kind: "radial", deg: -62, toR: 188 },
      { kind: "arc", r: 188, from: -62, to: -14 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    accent: true,
    steps: [
      { kind: "arc", r: 188, from: -116, to: -78 },
      { kind: "radial", deg: -78, toR: 212 },
      { kind: "arc", r: 212, from: -78, to: -40 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    steps: [
      { kind: "arc", r: 212, from: 4, to: 58 },
      { kind: "radial", deg: 58, toR: 188 },
      { kind: "arc", r: 188, from: 58, to: 122 },
    ],
  },
  {
    startDot: true,
    endDot: true,
    steps: [
      { kind: "arc", r: 188, from: 16, to: 46 },
      { kind: "radial", deg: 46, toR: 212 },
      { kind: "arc", r: 212, from: 46, to: 96 },
    ],
  },
];

const compileTraces = (defs: TraceDef[]) =>
  defs.map((def) => ({
    ...def,
    ...buildTracePath(def.steps),
  }));

interface ServicesCircuitBgProps {
  sectionRef: RefObject<HTMLElement | null>;
}

/**
 * Concentric circular PCB-style circuit background for Our Services
 * rotating smoothly 360° around its fixed center purely in sync with scroll (GSAP ScrollTrigger scrub).
 */
const ServicesCircuitBg = ({ sectionRef }: ServicesCircuitBgProps) => {
  const shouldReduceMotion = !!useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  const allCompiled = useMemo(
    () => compileTraces([...OUTER_TRACES, ...MID_TRACES, ...INNER_TRACES]),
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(svg, { transformOrigin: "50% 50%", rotation: 0 });

      gsap.to(svg, {
        rotation: 360,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.75,
          invalidateOnRefresh: true,
          refreshPriority: 0,
        },
      });
    }, section);

    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [sectionRef, shouldReduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none flex items-start md:items-center justify-end overflow-hidden z-0 pr-0 sm:pr-2 md:pr-4 lg:pr-6 pt-6 md:pt-0"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 800 800"
        className="w-[320px] sm:w-[440px] md:w-[560px] lg:w-[680px] xl:w-[760px] max-w-[92vw] h-auto opacity-[0.18] select-none will-change-transform"
      >
        <g>
          {allCompiled.map((t, idx) => {
            const stroke = t.accent ? "#2f8ecd" : "#0F172A";
            return (
              <g key={idx}>
                <path
                  d={t.d}
                  stroke={stroke}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {t.startDot && t.start && (
                  <circle cx={t.start.x} cy={t.start.y} r={4.2} fill={stroke} />
                )}
                {t.endDot && t.end && (
                  <circle cx={t.end.x} cy={t.end.y} r={4.2} fill={stroke} />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default ServicesCircuitBg;
