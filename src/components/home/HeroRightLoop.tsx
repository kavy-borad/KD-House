import { RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import HeroTechNodes from "./HeroTechNodes";

gsap.registerPlugin(ScrollTrigger);

const LOOP_PATH =
  "M 134.5 198 H 74 A 48 48 0 0 1 26 150 V 72 A 48 48 0 0 1 74 24 H 286 A 48 48 0 0 1 334 72 V 150 A 48 48 0 0 1 286 198 H 224 A 12 12 0 0 0 212 210 V 222";

interface TechItem {
  id: string;
  step: string;
  name: string;
  headline: string;
  description: string;
  icon: string;
  color: string;
  bgTint: string;
  borderTint: string;
  badgeBg: string;
  tags: string[];
}

const TECH_ITEMS: TechItem[] = [
  {
    id: "react",
    step: "01",
    name: "React & Next.js",
    headline: "Fluid, High-Speed Interfaces",
    description:
      "Component-driven UIs engineered for instant interactions, responsive layouts, and peak Core Web Vitals.",
    icon: "fab fa-react",
    color: "#2563EB",
    bgTint: "rgba(239, 246, 255, 0.96)",
    borderTint: "rgba(147, 197, 253, 0.95)",
    badgeBg: "rgba(37, 99, 235, 0.09)",
    tags: ["Design Systems", "Core Web Vitals", "Real-Time UI"],
  },
  {
    id: "python",
    step: "02",
    name: "Python & AI / ML",
    headline: "Intelligent Automation",
    description:
      "Custom LLM agents, RAG workflows, and predictive ML models built directly into your core product.",
    icon: "fab fa-python",
    color: "#1D4ED8",
    bgTint: "rgba(238, 242, 255, 0.96)",
    borderTint: "rgba(165, 180, 252, 0.95)",
    badgeBg: "rgba(29, 78, 216, 0.09)",
    tags: ["LLM & RAG", "Predictive AI", "FastAPI"],
  },
  {
    id: "js",
    step: "03",
    name: "JavaScript & TS",
    headline: "Type-Safe App Architecture",
    description:
      "Strict end-to-end TypeScript contracts and modular architecture keeping complex products reliable at scale.",
    icon: "fab fa-js",
    color: "#B45309",
    bgTint: "rgba(255, 251, 235, 0.96)",
    borderTint: "rgba(252, 211, 77, 0.95)",
    badgeBg: "rgba(180, 83, 9, 0.09)",
    tags: ["Type Safety", "Modular Core", "Event Streams"],
  },
  {
    id: "node",
    step: "04",
    name: "Node.js & APIs",
    headline: "Low-Latency Backends",
    description:
      "Resilient microservices, REST/GraphQL gateways, and real-time WebSocket engines built for heavy load.",
    icon: "fab fa-node-js",
    color: "#15803D",
    bgTint: "rgba(240, 253, 244, 0.96)",
    borderTint: "rgba(134, 239, 172, 0.95)",
    badgeBg: "rgba(21, 128, 61, 0.09)",
    tags: ["Microservices", "Real-Time APIs", "Auth"],
  },
  {
    id: "docker",
    step: "05",
    name: "Docker & DevOps",
    headline: "Containerized Delivery",
    description:
      "Automated CI/CD pipelines and reproducible Docker deployments guaranteeing seamless zero-downtime releases.",
    icon: "fab fa-docker",
    color: "#0284C7",
    bgTint: "rgba(240, 249, 255, 0.96)",
    borderTint: "rgba(125, 211, 252, 0.95)",
    badgeBg: "rgba(2, 132, 199, 0.09)",
    tags: ["CI/CD", "Containers", "Zero-Downtime"],
  },
  {
    id: "aws",
    step: "06",
    name: "AWS Cloud Scale",
    headline: "Enterprise Cloud Infra",
    description:
      "Auto-scaling cloud clusters, edge CDN caching, and IAM-hardened security built for 99.99% uptime.",
    icon: "fab fa-aws",
    color: "#C2410C",
    bgTint: "rgba(255, 247, 237, 0.96)",
    borderTint: "rgba(253, 186, 116, 0.95)",
    badgeBg: "rgba(194, 65, 12, 0.09)",
    tags: ["Auto-Scaling", "Zero-Trust Cloud", "Global CDN"],
  },
];

interface HeroRightLoopProps {
  heroRef: RefObject<HTMLDivElement | null>;
}

/**
 * Right-side architectural rounded loop container housing the physics tokens at rest,
 * paired with a pinned GSAP ScrollTrigger sequence: each big technology icon appears
 * inside the rounded rectangle while its detailed content animates directly below it.
 */
const HeroRightLoop = ({ heroRef }: HeroRightLoopProps) => {
  const shouldReduceMotion = !!useReducedMotion();
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const physicsLayerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const progressWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const heroEl = heroRef.current;
    const stageEl = stageContainerRef.current;
    if (!heroEl || !stageEl || shouldReduceMotion) return;

    const mm = gsap.matchMedia();

    // All viewports: animate while CSS sticky keeps hero pinned (no GSAP pin-spacer DOM mutation)
    mm.add("(min-width: 0px)", () => {
      const icons = iconRefs.current.filter(Boolean) as HTMLDivElement[];
      const contents = contentRefs.current.filter(
        Boolean,
      ) as HTMLDivElement[];
      if (icons.length === 0 || contents.length === 0) return;

      icons.forEach((el) => {
        gsap.set(el, { opacity: 0, scale: 0.55, rotation: -16 });
      });
      contents.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 26, pointerEvents: "none" });
      });
      if (physicsLayerRef.current) {
        gsap.set(physicsLayerRef.current, {
          opacity: 1,
          scale: 1,
          pointerEvents: "auto",
        });
      }
      if (hintRef.current) {
        gsap.set(hintRef.current, { opacity: 1, y: 0 });
      }
      if (progressWrapperRef.current) {
        gsap.set(progressWrapperRef.current, {
          opacity: 0,
          y: 8,
          pointerEvents: "none",
        });
      }
      if (progressBarRef.current) {
        gsap.set(progressBarRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.025) {
              setActiveIndex((prev) => (prev === -1 ? prev : -1));
              return;
            }
            const normalized = (p - 0.025) / 0.975;
            const nextIdx = Math.min(
              TECH_ITEMS.length - 1,
              Math.floor(normalized * TECH_ITEMS.length),
            );
            setActiveIndex((prev) => (prev === nextIdx ? prev : nextIdx));
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // 1. Fade out physics tokens & scroll hint, bring big Icon 0 into the rectangle + Content 0 below
      if (physicsLayerRef.current) {
        tl.to(
          physicsLayerRef.current,
          {
            opacity: 0,
            scale: 0.92,
            pointerEvents: "none",
            duration: 0.25,
            ease: "power2.out",
          },
          0,
        );
      }
      if (hintRef.current) {
        tl.to(
          hintRef.current,
          { opacity: 0, y: -10, duration: 0.22, ease: "power2.out" },
          0,
        );
      }
      if (progressWrapperRef.current) {
        tl.to(
          progressWrapperRef.current,
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.28,
            ease: "power2.out",
          },
          0.08,
        );
      }

      tl.to(
        icons[0],
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.44,
          ease: "back.out(1.4)",
        },
        0.1,
      );
      tl.to(
        contents[0],
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.4,
          ease: "power3.out",
        },
        0.14,
      );

      tl.to({}, { duration: 0.35 });

      // 2. Scrub cleanly through items 0 -> 1 -> 2 -> 3 -> 4 -> 5
      for (let i = 0; i < TECH_ITEMS.length - 1; i++) {
        const label = `step-${i}`;
        tl.addLabel(label);

        tl.to(
          icons[i],
          {
            opacity: 0,
            scale: 1.15,
            rotation: 12,
            duration: 0.35,
            ease: "power2.in",
          },
          label,
        );
        tl.to(
          contents[i],
          {
            opacity: 0,
            y: -22,
            pointerEvents: "none",
            duration: 0.34,
            ease: "power2.in",
          },
          label,
        );

        tl.fromTo(
          icons[i + 1],
          { opacity: 0, scale: 0.56, rotation: -16 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.46,
            ease: "back.out(1.35)",
          },
          `${label}+=0.14`,
        );
        tl.fromTo(
          contents[i + 1],
          { opacity: 0, y: 24, pointerEvents: "none" },
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.42,
            ease: "power3.out",
          },
          `${label}+=0.18`,
        );

        tl.to({}, { duration: 0.36 });
      }

      const totalDuration = tl.duration();
      if (progressBarRef.current) {
        tl.to(
          progressBarRef.current,
          { scaleX: 1, ease: "none", duration: totalDuration },
          0,
        );
      }

      return () => {
        scrollTriggerRef.current = null;
      };
    });

    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      scrollTriggerRef.current = null;
      mm.revert();
    };
  }, [heroRef, shouldReduceMotion]);

  const jumpToTech = (idx: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const targetProgress =
      0.04 + (idx / Math.max(1, TECH_ITEMS.length - 1)) * 0.9;
    window.scrollTo({
      top: st.start + (st.end - st.start) * targetProgress,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full lg:w-[420px] xl:w-[490px] 2xl:w-[530px] shrink-0 flex flex-col items-center">
      {/* Top Loop Rectangle: houses physics icons at rest AND big active scroll icon in center */}
      <div className="relative flex items-center justify-center select-none w-full max-w-[260px] sm:max-w-[330px] lg:max-w-[380px] xl:max-w-[440px] 2xl:max-w-[480px]">
        {/* Bounded Interior Arena */}
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: "8.05%",
            top: "11.07%",
            width: "83.89%",
            height: "68.85%",
          }}
        >
          {/* Physics tokens layer (active at scrollY = 0) */}
          <div ref={physicsLayerRef} className="w-full h-full">
            <HeroTechNodes />
          </div>

          {/* Big ScrollTrigger Icons rendered INSIDE the rounded rectangle */}
          {!shouldReduceMotion && (
            <div className="flex absolute inset-0 items-center justify-center pointer-events-none">
              {TECH_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    iconRefs.current[idx] = el;
                  }}
                  style={{
                    backgroundColor: item.bgTint,
                    borderColor: item.borderTint,
                    boxShadow:
                      "0 24px 48px -12px rgba(15, 23, 42, 0.14), inset 0 2px 0 rgba(255,255,255,0.95)",
                  }}
                  className="opacity-0 pointer-events-none absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border-2 flex items-center justify-center will-change-transform"
                >
                  <i
                    className={`${item.icon} text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] leading-none`}
                    style={{ color: item.color }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 360 244"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible relative z-20 pointer-events-none"
        >
          <motion.path
            d={LOOP_PATH}
            stroke="#0F172A"
            strokeOpacity={0.86}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          {!shouldReduceMotion && (
            <motion.path
              d={LOOP_PATH}
              stroke="#2563EB"
              strokeOpacity={0.45}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeDasharray="36 900"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -936 }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "linear",
                delay: 1.1,
              }}
            />
          )}

          <motion.circle
            cx={142}
            cy={198}
            r={7.5}
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeOpacity={0.86}
            strokeWidth={2.2}
            initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
          />

          <motion.path
            d="M 207.2 220 L 212 229.5 L 216.8 220 Z"
            fill="#0F172A"
            fillOpacity={0.86}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 1.05 }}
          />
        </svg>
      </div>

      {/* Content Directly Below the Rectangle (under the downward arrow) */}
      {!shouldReduceMotion && (
        <div
          ref={stageContainerRef}
          className="block w-full mt-0.5 lg:mt-1 relative"
        >
          <div className="relative min-h-[118px] sm:min-h-[132px] lg:min-h-[144px] xl:min-h-[156px] flex items-center">
            {/* Initial quiet scroll cue tucked right below the downward arrow */}
            <div
              ref={hintRef}
              className="absolute inset-x-0 top-1 lg:top-2 flex flex-col items-center justify-start text-center pointer-events-none pl-6 lg:pl-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 lg:px-3.5 lg:py-1.5 rounded-full bg-white/85 border border-slate-200/80 text-slate-600 text-[11px] lg:text-xs font-semibold shadow-xs backdrop-blur-xs">
                <i className="fas fa-arrow-down text-blue-600 animate-bounce text-[10px]" />
                <span>Scroll to explore each technology</span>
              </div>
            </div>

            {/* Synchronized Content Below the Rectangle */}
            {TECH_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  contentRefs.current[idx] = el;
                }}
                className="opacity-0 pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-2 lg:px-3 will-change-transform"
              >
                <span
                  className="px-2.5 lg:px-3 py-0.5 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-wider mb-1 lg:mb-2"
                  style={{
                    backgroundColor: item.badgeBg,
                    color: item.color,
                  }}
                >
                  {item.step} — {item.name}
                </span>

                <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-slate-900 leading-tight mb-1 lg:mb-1.5">
                  {item.headline}
                </h3>

                <p className="text-[11px] sm:text-xs xl:text-sm text-slate-600 leading-snug lg:leading-relaxed mb-2 lg:mb-3 max-w-md">
                  {item.description}
                </p>

                <div className="flex flex-wrap justify-center gap-1 lg:gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 lg:px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200/90 text-[10px] lg:text-[11px] font-semibold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Slim step progress indicator (reveals on scroll) */}
          <div
            ref={progressWrapperRef}
            className="opacity-0 pointer-events-none mt-1.5 px-4 flex items-center gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 h-1 bg-slate-200/75 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full w-full [transform:scaleX(0)] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full origin-left"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {TECH_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => jumpToTech(idx)}
                  aria-label={`Show ${item.name}`}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    activeIndex === idx
                      ? "w-5 bg-slate-900"
                      : "w-1.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroRightLoop;
