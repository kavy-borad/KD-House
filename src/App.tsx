import { useEffect, useState } from "react";
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const [debugInfo] = useState("");

  // Track page views on route changes
  usePageViewTracking();

  useEffect(() => {
    // setDebugInfo(`Pathname: ${pathname}, FloatingContactIcons mounted: ${Date.now()}`);
  }, [pathname]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <ScrollToTop />
      <div className="fixed top-0 bg-black/50 text-white text-xs z-50">
        <pre>{debugInfo}</pre>
      </div>
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
