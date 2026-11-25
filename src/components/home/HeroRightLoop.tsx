import { motion, useReducedMotion } from "framer-motion";
import HeroTechNodes from "./HeroTechNodes";

const LOOP_PATH =
  "M 134.5 198 H 74 A 48 48 0 0 1 26 150 V 72 A 48 48 0 0 1 74 24 H 286 A 48 48 0 0 1 334 72 V 150 A 48 48 0 0 1 286 198 H 224 A 12 12 0 0 0 212 210 V 222";

/**
 * Minimal architectural flow-loop container on the right side of the hero
 * housing the physics-based technology icons inside its rounded bounds.
 */
const HeroRightLoop = () => {
  const shouldReduceMotion = !!useReducedMotion();

  return (
    <div className="relative flex items-center justify-center select-none shrink-0 w-full max-w-[330px] sm:max-w-[380px] mx-auto lg:mx-0 lg:w-[350px] xl:w-[450px] 2xl:w-[500px]">
      {/* Bounded physics arena strictly inside the rounded rectangle stroke */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          left: "8.05%",
          top: "11.07%",
          width: "83.89%",
          height: "68.85%",
        }}
      >
        <HeroTechNodes />
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 360 244"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible relative z-20 pointer-events-none"
      >
        {/* Main rounded architectural loop with downward exit arrow */}
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

        {/* Subtle traveling pulse along the loop */}
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

        {/* Origin hollow circle node on bottom-left */}
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

        {/* Downward arrowhead at bottom-right exit */}
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
  );
};

export default HeroRightLoop;
