import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import kLogo from "../assets/logo/KARMDUDE NEW.webp";

interface PageLoaderProps {
  visible: boolean;
}

/**
 * Full-screen preloader controller.
 * Hands off seamlessly from the pre-hydration `#kd-boot-loader` rendered in
 * `index.html` (so refresh shows the split-merge K immediately with 0 white
 * screen delay), fading it out smoothly once React & initial layout are ready.
 */
const PageLoader = ({ visible }: PageLoaderProps) => {
  const shouldReduceMotion = !!useReducedMotion();
  const [hasBootLoader, setHasBootLoader] = useState<boolean>(() =>
    typeof document !== "undefined"
      ? Boolean(document.getElementById("kd-boot-loader"))
      : false,
  );

  useEffect(() => {
    const bootEl = document.getElementById("kd-boot-loader");
    if (!bootEl) {
      setHasBootLoader(false);
      return;
    }

    if (visible) return;

    bootEl.classList.add("is-fading");
    const removeTimer = window.setTimeout(
      () => {
        bootEl.remove();
        setHasBootLoader(false);
      },
      shouldReduceMotion ? 80 : 170,
    );

    return () => window.clearTimeout(removeTimer);
  }, [shouldReduceMotion, visible]);

  // While pre-hydration boot loader is handling the initial reveal, render nothing duplicate
  if (hasBootLoader) {
    return null;
  }

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
