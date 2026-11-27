import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { GlitchWord } from "./GlitchSectionTitle";

gsap.registerPlugin(ScrollTrigger);

interface WhyFeature {
  icon: string;
  title: string;
  desc: string;
  iconColor: string;
}

const WHY_FEATURES: WhyFeature[] = [
  {
    icon: "fas fa-rocket",
    title: "Accelerated Growth",
    desc: "Propel your business with cutting-edge tech stacks designed for speed and scalability.",
    iconColor: "text-orange-500",
  },
  {
    icon: "fas fa-code-branch",
    title: "Elite Engineering",
    desc: "Our rigorous coding standards ensure robust, maintainable, and efficient software.",
    iconColor: "text-[#2f8ecd]",
  },
  {
    icon: "fas fa-brain",
    title: "AI-Driven Strategy",
    desc: "We integrate intelligent algorithms to automate processes and provide deep insights.",
    iconColor: "text-purple-500",
  },
  {
    icon: "fas fa-shield-alt",
    title: "Fortified Security",
    desc: "Enterprise-grade security protocols to protect your data and your users' trust.",
    iconColor: "text-emerald-500",
  },
  {
    icon: "fas fa-bolt",
    title: "High Performance",
    desc: "Optimized for lightning-fast load times and seamless user interactions.",
    iconColor: "text-amber-500",
  },
  {
    icon: "fas fa-infinity",
    title: "Seamless Scaling",
    desc: "Infrastructure designed to grow effortlessly with your user base without friction.",
    iconColor: "text-cyan-500",
  },
];

/**
 * Why Choose Us section featuring soft-toned concentric half-circle domes
 * and clean feature cards animated smoothly via GSAP ScrollTrigger.
 */
const WhyChooseUsSection = () => {
  const shouldReduceMotion = !!useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const outerArchRef = useRef<HTMLDivElement>(null);
  const innerArchRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section || shouldReduceMotion) return;

    const mm = gsap.matchMedia();
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    // Desktop: reveal header on entry, then animate inside CSS sticky track (avoids GSAP pin-spacer DOM mutation)
    mm.add("(min-width: 1024px)", () => {
      if (outerArchRef.current) {
        gsap.set(outerArchRef.current, {
          scale: 0.08,
          yPercent: 35,
          opacity: 0,
        });
      }
      if (innerArchRef.current) {
        gsap.set(innerArchRef.current, {
          scale: 0.05,
          yPercent: 40,
          opacity: 0,
        });
      }
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 28 });
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: track,
            start: "top 82%",
            end: "top 20%",
            scrub: 0.6,
            invalidateOnRefresh: true,
            refreshPriority: 0,
          },
        });
      }
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 44, scale: 0.93 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          refreshPriority: 0,
        },
      });

      if (outerArchRef.current) {
        tl.to(
          outerArchRef.current,
          {
            scale: 1,
            yPercent: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
          },
          0,
        );
      }

      if (innerArchRef.current) {
        tl.to(
          innerArchRef.current,
          {
            scale: 1,
            yPercent: 0,
            opacity: 1,
            duration: 0.58,
            ease: "power2.out",
          },
          0.12,
        );
      }

      if (cards.length > 0) {
        tl.to(
          cards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.42,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.26,
        );
      }

      // Brief hold at end before sticky track completes to next section
      tl.to({}, { duration: 0.15 });
    });

    // Mobile / Tablet: non-pinned scroll-scrubbed reveal
    mm.add("(max-width: 1023px)", () => {
      if (outerArchRef.current) {
        gsap.set(outerArchRef.current, { scale: 0.25, yPercent: 25, opacity: 0 });
      }
      if (innerArchRef.current) {
        gsap.set(innerArchRef.current, { scale: 0.18, yPercent: 30, opacity: 0 });
      }
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 24 });
      }
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 32, scale: 0.95 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 84%",
          end: "top 14%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      if (outerArchRef.current) {
        tl.to(outerArchRef.current, { scale: 1, yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
      }
      if (innerArchRef.current) {
        tl.to(innerArchRef.current, { scale: 1, yPercent: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 0.1);
      }
      if (headerRef.current) {
        tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.18);
      }
      if (cards.length > 0) {
        tl.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }, 0.3);
      }
    });

    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      mm.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <div ref={trackRef} className="relative lg:min-h-[200vh]">
      <section
        ref={sectionRef}
        className="relative lg:sticky lg:top-0 bg-white lg:min-h-screen flex items-center pt-16 sm:pt-20 lg:pt-24 pb-14 md:pb-16 overflow-hidden"
      >
      {/* Soft-Tone Concentric Half-Circle Dome Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-end justify-center overflow-hidden"
      >
        {/* Outer soft mist-blue half-circle halo (centered by flex parent so GSAP transforms stay true) */}
        <div
          ref={outerArchRef}
          className="absolute bottom-0 w-[198%] sm:w-[158%] md:w-[140%] lg:w-[134%] max-w-[1920px] h-[97%] rounded-t-[9999px] border-t border-blue-100/70 will-change-transform origin-bottom"
          style={{
            background:
              "linear-gradient(180deg, rgba(239, 246, 255, 0.75) 0%, rgba(241, 245, 249, 0.55) 100%)",
          }}
        />

        {/* Inner soft powder-blue half-circle arch */}
        <div
          ref={innerArchRef}
          className="absolute bottom-0 w-[180%] sm:w-[142%] md:w-[125%] lg:w-[118%] max-w-[1720px] h-[88%] rounded-t-[9999px] border-t border-blue-200/55 will-change-transform origin-bottom"
          style={{
            background:
              "linear-gradient(180deg, rgba(219, 234, 254, 0.72) 0%, rgba(224, 231, 255, 0.58) 58%, rgba(248, 250, 252, 0.9) 100%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 pt-8 sm:pt-10 md:pt-12">
        {/* Clean Editorial Header Inside Dome */}
        <div ref={headerRef} className="text-center mb-10 md:mb-12">
          <div className="inline-block mb-4">
            <span className="text-slate-600 font-bold text-xs md:text-sm tracking-widest uppercase inline-block">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-5 tracking-tight leading-tight">
            Elevate <GlitchWord word="Your" />{" "}
            <span className="text-[#2f8ecd]">Digital Presence</span>
          </h2>

          <p className="text-sm sm:text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We bring together deep technical expertise and creative innovation
            to build software that defines the future of your business.
          </p>
        </div>

        {/* Clean Light Cards Inside Soft Dome */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-7">
          {WHY_FEATURES.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group relative bg-white/75 hover:bg-white/95 backdrop-blur-xs rounded-2xl p-4 sm:p-6 md:p-7 border border-blue-100/90 hover:border-blue-200 shadow-none transition-all duration-300 hover:-translate-y-1 will-change-transform"
            >
              <div
                className={`text-xl sm:text-2xl md:text-3xl ${item.iconColor} mb-2.5 md:mb-4 inline-block transition-transform duration-300 group-hover:scale-110`}
              >
                <i className={item.icon} />
              </div>

              <h3 className="text-sm sm:text-lg md:text-xl font-bold text-slate-800 mb-1.5 md:mb-2.5 group-hover:text-[#2f8ecd] transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-slate-500 leading-snug font-normal text-[11px] sm:text-xs md:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default WhyChooseUsSection;
