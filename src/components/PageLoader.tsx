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
          <div className="relative flex items-center justify-center w-24 h-24">
            {/* Soft outer ambient halo */}
            <div className="absolute inset-1 rounded-full bg-blue-50/90" />

            {/* Smooth spinning architectural ring */}
            <div
              className={`absolute inset-0 rounded-full border-[2.5px] border-slate-100 border-t-[#2187CF] border-r-[#1A214D]/70 ${
                shouldReduceMotion ? "" : "animate-spin"
              }`}
              style={{ animationDuration: "0.95s" }}
            />

            {/* Brand "K" logo mark */}
            <motion.img
              src={kLogo}
              alt="Karmadude"
              draggable={false}
              initial={shouldReduceMotion ? false : { scale: 0.88, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 w-11 h-11 object-contain"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
