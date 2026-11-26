import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = (): Lenis | null => useContext(LenisContext);

interface SmoothScrollProviderProps {
  locked?: boolean;
  children: ReactNode;
}

/**
 * Global Lenis smooth-scrolling provider synchronized to GSAP's shared ticker
 * (`autoRaf: false`) so ScrollTrigger pins/scrubs and Lenis interpolation share
 * a single rAF loop with zero frame lag.
 */
export function SmoothScrollProvider({
  locked = false,
  children,
}: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      autoRaf: false,
      respectReducedMotion: true,
    });

    setLenisInstance(lenis);

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const tick = (timeSec: number) => {
      lenis.raf(timeSec * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  useEffect(() => {
    if (!lenisInstance) return;
    if (locked) {
      lenisInstance.stop();
    } else {
      lenisInstance.start();
    }
  }, [lenisInstance, locked]);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
