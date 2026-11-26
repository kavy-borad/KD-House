import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-width dark navy CTA banner in Our Services with a smooth GSAP ScrollTrigger
 * left-to-right unveil animation when scrolling down.
 */
const CustomProjectBanner = () => {
  const shouldReduceMotion = !!useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const innerEls = [
        titleRef.current,
        descRef.current,
        actionsRef.current,
      ].filter(Boolean) as HTMLElement[];

      gsap.set(card, {
        clipPath: "inset(0% 100% 0% 0% round 24px)",
        x: -36,
        opacity: 0,
      });

      if (innerEls.length > 0) {
        gsap.set(innerEls, { opacity: 0, x: -28 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 82%",
          end: "top 26%",
          scrub: 0.9,
          invalidateOnRefresh: true,
          refreshPriority: 0,
        },
      });

      tl.to(
        card,
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          x: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
        },
        0,
      );

      if (innerEls.length > 0) {
        tl.to(
          innerEls,
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.1,
            ease: "power2.out",
          },
          0.25,
        );
      }
    }, wrapper);

    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <div ref={wrapperRef} className="mt-16 md:mt-20 text-center">
      <div
        ref={cardRef}
        className="bg-[#001F3F] rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden will-change-transform"
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative z-10">
          <h3
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Have a Custom Project in Mind?
          </h3>
          <p
            ref={descRef}
            className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto"
          >
            Let's discuss how we can bring your vision to life with our
            expertise and innovative solutions
          </p>
          <div
            ref={actionsRef}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-[#001F3F] rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>Get Started Today</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
            <Link
              to="/our-works"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>View Our Work</span>
              <i className="fas fa-briefcase"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomProjectBanner;
