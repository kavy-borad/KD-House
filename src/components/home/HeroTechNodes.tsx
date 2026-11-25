import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TechNode {
  id: string;
  label: string;
  icon: string;
  color: string;
  glow: string;
  bgTint: string;
  positionClass: string;
  delay: number;
  duration: number;
}

const TECH_NODES: TechNode[] = [
  {
    id: "docker",
    label: "Docker",
    icon: "fab fa-docker",
    color: "#2496ED",
    glow: "rgba(36, 150, 237, 0.32)",
    bgTint: "rgba(36, 150, 237, 0.12)",
    positionClass: "top-[10%] right-[24%]",
    delay: 0.2,
    duration: 5.2,
  },
  {
    id: "python",
    label: "Python",
    icon: "fab fa-python",
    color: "#3776AB",
    glow: "rgba(55, 118, 171, 0.32)",
    bgTint: "rgba(55, 118, 171, 0.12)",
    positionClass: "top-[11%] right-[7%]",
    delay: 0.8,
    duration: 4.8,
  },
  {
    id: "js",
    label: "JavaScript",
    icon: "fab fa-js",
    color: "#D97706",
    glow: "rgba(234, 179, 8, 0.34)",
    bgTint: "rgba(250, 204, 21, 0.16)",
    positionClass: "top-[37%] right-[7%]",
    delay: 1.4,
    duration: 5.6,
  },
  {
    id: "node",
    label: "Node.js",
    icon: "fab fa-node-js",
    color: "#16A34A",
    glow: "rgba(22, 163, 74, 0.32)",
    bgTint: "rgba(34, 197, 94, 0.12)",
    positionClass: "bottom-[27%] right-[17%]",
    delay: 0.5,
    duration: 5.0,
  },
  {
    id: "react",
    label: "React",
    icon: "fab fa-react",
    color: "#0284C7",
    glow: "rgba(14, 165, 233, 0.34)",
    bgTint: "rgba(56, 189, 248, 0.14)",
    positionClass: "bottom-[10%] right-[7%]",
    delay: 1.1,
    duration: 4.6,
  },
  {
    id: "aws",
    label: "AWS",
    icon: "fab fa-aws",
    color: "#EA580C",
    glow: "rgba(234, 88, 12, 0.32)",
    bgTint: "rgba(249, 115, 22, 0.12)",
    positionClass: "bottom-[11%] right-[30%]",
    delay: 1.7,
    duration: 5.4,
  },
];

const HeroTechNodes = () => {
  const shouldReduceMotion = useReducedMotion();
  const [pulseCounts, setPulseCounts] = useState<Record<string, number>>({});

  const handleNodeClick = (id: string) => {
    setPulseCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <div className="hidden md:block absolute inset-0 z-30 pointer-events-none">
      {TECH_NODES.map((node) => {
        const pulseCount = pulseCounts[node.id] || 0;

        return (
          <motion.div
            key={node.id}
            className={`absolute ${node.positionClass} pointer-events-auto`}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -7, 0],
                  }
            }
            transition={{
              duration: node.duration,
              delay: node.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.button
              type="button"
              onClick={() => handleNodeClick(node.id)}
              aria-label={`${node.label} technology`}
              whileHover={
                shouldReduceMotion
                  ? { scale: 1.08 }
                  : { scale: 1.2, y: -3 }
              }
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 360, damping: 20 }}
              className="group/tech relative w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer border border-white/75 bg-white/35 backdrop-blur-[2px] opacity-60 hover:opacity-100 transition-opacity duration-300 shadow-[0_6px_20px_rgba(15,23,42,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              style={{
                color: node.color,
              }}
            >
              {/* Subtle hover surface tint */}
              <span
                className="absolute inset-0 rounded-2xl opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundColor: node.bgTint,
                  boxShadow: `0 10px 26px ${node.glow}`,
                }}
              />

              {/* Click expanding ripple ring */}
              {pulseCount > 0 && !shouldReduceMotion && (
                <motion.span
                  key={`ring-${pulseCount}`}
                  initial={{ scale: 0.85, opacity: 0.75 }}
                  animate={{ scale: 1.85, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                  style={{ borderColor: node.color }}
                />
              )}

              <motion.i
                key={`icon-${pulseCount}`}
                initial={false}
                animate={
                  pulseCount > 0 && !shouldReduceMotion
                    ? {
                        rotate: [0, -16, 16, -6, 0],
                        scale: [1, 1.28, 0.95, 1.08, 1],
                      }
                    : undefined
                }
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`${node.icon} relative z-10 text-3xl transition-transform duration-300 group-hover/tech:scale-110`}
              />

              {/* Clean hover tooltip */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-white text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 translate-y-1 group-hover/tech:opacity-100 group-hover/tech:translate-y-0 transition-all duration-200 shadow-md">
                {node.label}
              </span>
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeroTechNodes;
