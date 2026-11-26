import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import kLogo from "../assets/logo/KARMDUDE NEW.webp";

interface PageLoaderProps {
  visible: boolean;
}

/**
 * Full-screen preloader using the original K logo split cleanly into its navy
 * stem and electric-blue wing, GPU-animated via global CSS keyframes in index.css.
 */
const PageLoader = ({ visible }: PageLoaderProps) => {
  const shouldReduceMotion = !!useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="k-page-loader"
          aria-label="Loading page"
          role="status"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: shouldReduceMotion ? 0.1 : 0.2,
              ease: "easeOut",
            },
          }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center select-none pointer-events-auto"
        >
          <div className="kd-k-mark-stage">
            <img
              src={kLogo}
              alt=""
              aria-hidden="true"
              draggable={false}
              data-k-piece="navy-stem"
              className="kd-k-piece kd-k-piece-navy"
            />
            <img
              src={kLogo}
              alt="Karmadude"
              draggable={false}
              data-k-piece="blue-wing"
              className="kd-k-piece kd-k-piece-blue"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
