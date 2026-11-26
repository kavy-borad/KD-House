import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import usePageViewTracking from "./lib/usePageViewTracking";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/header-footer/Navbar";
import { Footer } from "./components/header-footer/Footer";
import FloatingContactIcons from "./components/FloatingContactIcons";
import PageLoader from "./components/PageLoader";
import "./styles.css";

import Home from "./components/Home";
import About from "./components/About";
// const About = lazy(() => import("./components/About"));
import Contact from "./components/Contact";
import WebApplications from "./components/Services-Pages/Web-Applications";
import ProductEngineering from "./components/Services-Pages/Product-Engineering";
import CustomSoftwareDevelopment from "./components/Services-Pages/Custom Software-Development";
import MobileApplication from "./components/Services-Pages/Mobile-Application";
import UIUX from "./components/Services-Pages/UI-UX-Research&Design";
import DigitalMarketing from "./components/Services-Pages/DigitalMarketing";
import PrivacyPolicy from "./components/Services-Pages/Privacy";
import BMIPrivacyPolicy from "./components/Services-Pages/BMI-Privacy-Policy";
import BuddyBankPrivacyPolicy from "./components/Services-Pages/BuddyBank-Privacy-Policy";
import Quotation from "./components/Quotation";
// import Internship from "./components/Internship";
import Slidesportfolio from "./components/Slidesportfolio";
import Ourworks from "./components/Ourworks";
import Studentform from "./components/StudentForm";
import Onboarding from "./components/Services-Pages/Onboarding";
import GooglePlayTesting from "./components/GooglePlayTesting";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_STORAGE_KEY = "kd_reload_scroll";

let pendingReloadRestore: { path: string; y: number } | null = null;
if (typeof window !== "undefined") {
  try {
    const nav = performance.getEntriesByType?.("navigation")?.[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReloadOrHistory =
      nav?.type === "reload" || nav?.type === "back_forward";
    if (isReloadOrHistory) {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      const raw = sessionStorage.getItem(SCROLL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          typeof parsed.path === "string" &&
          typeof parsed.y === "number" &&
          parsed.y > 0
        ) {
          pendingReloadRestore = parsed;
        }
      }
    }
  } catch {
    pendingReloadRestore = null;
  }
}

interface ScrollManagerProps {
  onInitialReady: () => void;
}

function ScrollManager({ onInitialReady }: ScrollManagerProps) {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef(pathname);
  const initialHandledRef = useRef(false);

  useEffect(() => {
    // Route change inside SPA: scroll cleanly to top
    if (prevPathnameRef.current !== pathname) {
      pendingReloadRestore = null;
      prevPathnameRef.current = pathname;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    if (initialHandledRef.current) return;

    let cancelled = false;
    let rafId = 0;
    let safetyTimer = 0;
    let loadHandler: (() => void) | null = null;
    const target =
      pendingReloadRestore && pendingReloadRestore.path === pathname
        ? pendingReloadRestore.y
        : null;

    const finishRestore = () => {
      if (cancelled) return;
      initialHandledRef.current = true;

      if (target !== null && target > 0) {
        // Refresh GSAP ScrollTrigger pin-spacers first, then jump instantaneously (bypassing CSS smooth scroll)
        ScrollTrigger.refresh();
        window.scrollTo({
          top: target,
          left: 0,
          behavior: "instant" as ScrollBehavior,
        });

        // Second-frame verification after pin/layout settle
        rafId = window.requestAnimationFrame(() => {
          if (cancelled) return;
          ScrollTrigger.refresh();
          window.scrollTo({
            top: target,
            left: 0,
            behavior: "instant" as ScrollBehavior,
          });
          pendingReloadRestore = null;
          onInitialReady();
        });
      } else {
        pendingReloadRestore = null;
        onInitialReady();
      }
    };

    const minDelay = target !== null ? 380 : 340;
    const timer = window.setTimeout(() => {
      if (document.readyState === "complete") {
        finishRestore();
      } else {
        loadHandler = () => finishRestore();
        window.addEventListener("load", loadHandler, { once: true });
        safetyTimer = window.setTimeout(finishRestore, 450);
      }
    }, minDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (safetyTimer) window.clearTimeout(safetyTimer);
      if (rafId) window.cancelAnimationFrame(rafId);
      if (loadHandler) window.removeEventListener("load", loadHandler);
    };
  }, [pathname, onInitialReady]);

  useEffect(() => {
    const saveScroll = () => {
      if (pendingReloadRestore) return;
      try {
        sessionStorage.setItem(
          SCROLL_STORAGE_KEY,
          JSON.stringify({ path: pathname, y: window.scrollY }),
        );
      } catch {
        // ignore storage quota errors
      }
    };

    window.addEventListener("scroll", saveScroll, { passive: true });
    window.addEventListener("pagehide", saveScroll);
    window.addEventListener("beforeunload", saveScroll);
    return () => {
      window.removeEventListener("scroll", saveScroll);
      window.removeEventListener("pagehide", saveScroll);
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, [pathname]);

  return null;
}

function Layout() {
  const { pathname } = useLocation();

  // Track page views on route changes
  usePageViewTracking();

  // Hide Navbar and Footer for specific pages
  const normalizedPathname = pathname.replace(/\/+$/, "").toLowerCase();
  const hideNavAndFooter =
    normalizedPathname === "/portfolio" ||
    normalizedPathname === "portfolio" ||
    normalizedPathname === "/onboarding" ||
    normalizedPathname === "onboarding" ||
    normalizedPathname === "/studentform" ||
    normalizedPathname === "studentform" ||
    normalizedPathname === "/bmi-privacy-policy" ||
    normalizedPathname === "bmi-privacy-policy" ||
    normalizedPathname === "/buddybank-privacy-policy" ||
    normalizedPathname === "buddybank-privacy-policy";

  // Lifted state for Menu (Sidebar)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const handleInitialReady = useCallback(() => {
    setShowLoader(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <PageLoader visible={showLoader} />
      <ScrollManager onInitialReady={handleInitialReady} />
      {!hideNavAndFooter && (
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:tabId" element={<About />} />
          <Route path="/our-works" element={<Ourworks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/web-applications" element={<WebApplications />} />
          <Route path="/product-engineering" element={<ProductEngineering />} />
          <Route
            path="/custom-software"
            element={<CustomSoftwareDevelopment />}
          />
          <Route path="/mobile-application" element={<MobileApplication />} />
          <Route path="/ui-ux" element={<UIUX />} />
          <Route path="/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/bmi-privacy-policy" element={<BMIPrivacyPolicy />} />
          <Route
            path="/buddybank-privacy-policy"
            element={<BuddyBankPrivacyPolicy />}
          />
          <Route path="/quotation" element={<Quotation />} />
          {/* <Route path="/internships" element={<Internship />} /> */}
          <Route path="/portfolio" element={<Slidesportfolio />} />
          <Route path="/studentform" element={<Studentform />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/google-play-testing" element={<GooglePlayTesting />} />
          <Route path="/testers" element={<Navigate to="/google-play-testing" replace />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </main>
      <FloatingContactIcons hide={isMenuOpen || normalizedPathname === "/contact" || normalizedPathname === "contact"} />
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

const App: React.FC = () => {
  useEffect(() => {
    const floatingStyle = document.createElement("style");
    floatingStyle.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(floatingStyle);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Layout />
      </Router>
    </HelmetProvider>
  );
};

export default App;
