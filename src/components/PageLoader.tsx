import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import kLogo from "../assets/logo/KARMDUDE NEW.webp";

interface PageLoaderProps {
  visible: boolean;
}

/**
 * Clean full-screen refresh preloader centered around the Karmadude "K" mark.
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
            transition: { duration: shouldReduceMotion ? 0.1 : 0.28, ease: "easeOut" },
          }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center select-none pointer-events-auto"
        >
          {/* Brand "K" logo mark only (no surrounding circle/ring) */}
          <motion.img
            src={kLogo}
            alt="Karmadude"
            draggable={false}
            initial={shouldReduceMotion ? false : { scale: 0.9, opacity: 0.6 }}
            animate={
              shouldReduceMotion
                ? { scale: 1, opacity: 1 }
                : { scale: [0.94, 1.04, 1], opacity: 1 }
            }
            transition={{
              duration: 0.55,
              ease: "easeOut",
            }}
            className="w-16 h-16 object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
