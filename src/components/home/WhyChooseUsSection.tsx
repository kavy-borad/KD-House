import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

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
  const sectionRef = useRef<HTMLElement>(null);
  const outerArchRef = useRef<HTMLDivElement>(null);
  const innerArchRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      // Start completely hidden until the user scrolls into this section
      if (outerArchRef.current) {
        gsap.set(outerArchRef.current, {
          scale: 0.3,
          yPercent: 22,
          opacity: 0,
        });
      }
      if (innerArchRef.current) {
        gsap.set(innerArchRef.current, {
          scale: 0.22,
          yPercent: 26,
          opacity: 0,
        });
      }
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 26 });
      }
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 34, scale: 0.94 });
      }

      // Unified scroll-scrubbed ScrollTrigger timeline:
      // concentric half-circles expand first, followed smoothly by header & staggered cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 86%",
          end: "top 14%",
          scrub: 0.65,
          invalidateOnRefresh: true,
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

      if (headerRef.current) {
        tl.to(
          headerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          0.22,
        );
      }

      if (cards.length > 0) {
        tl.to(
          cards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.38,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.34,
        );
      }
    }, section);

    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white pt-16 sm:pt-20 md:pt-24 pb-14 md:pb-20 overflow-hidden"
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
            <span className="py-1.5 px-4 md:py-2 md:px-6 rounded-full bg-white/95 border border-slate-200/80 text-slate-600 font-bold text-xs md:text-sm tracking-widest uppercase inline-block shadow-xs">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-5 tracking-tight leading-tight">
            Elevate Your{" "}
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
              className="group relative bg-white/92 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-7 border border-slate-200/80 hover:border-blue-200 shadow-[0_6px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_30px_rgba(47,142,205,0.09)] transition-all duration-300 hover:-translate-y-1 will-change-transform"
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
  );
};

export default WhyChooseUsSection;
