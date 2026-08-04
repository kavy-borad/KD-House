import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Layers,
  Briefcase,
  FileText,
  Smartphone,
  GraduationCap,
  Info,
  Send,
  ChevronDown,
  ChevronRight,
  X
} from "lucide-react";
import { FaEnvelope, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/logo/logo.png";
import logoWhite from "../../assets/logo/logo-white.png";

// Framer Motion animation variants
const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

// Flat navigation structure as in screenshot
const menuItems = [
  { to: "/", label: "Home", icon: Home },
  { isDropdown: true, label: "Services", icon: Layers },
  { to: "/our-works", label: "Our Works", icon: Briefcase },
  { to: "/quotation", label: "Quotation", icon: FileText },
  { to: "/testers", label: "Testers", icon: Smartphone },
  // { to: "/internships", label: "Internships", icon: GraduationCap },
  { to: "/about", label: "About Us", icon: Info },
  { to: "/contact", label: "Contact", icon: Send },
];

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
}

const Navbar = ({ isMenuOpen, setIsMenuOpen }: NavbarProps) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const mobileServicesDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isTransparentNav = location.pathname === "/";

  /* Mega Menu Categories */
  const serviceCategories = [
    {
      title: "Frontend Development",
      href: "/web-applications",
      items: [
        { name: "HTML Development", href: "/web-applications" },
        { name: "VueJS Development", href: "/web-applications" },
        { name: "ReactJS Development", href: "/web-applications" },
        { name: "AngularJS Development", href: "/web-applications" },
      ],
    },
    {
      title: "Back-End Development",
      href: "/custom-software",
      items: [
        { name: "Laravel Development", href: "/custom-software" },
        { name: "NodeJS Development", href: "/custom-software" },
        { name: "WordPress Development", href: "/custom-software" },
        { name: "CodeIgneter Development", href: "/custom-software" },
      ],
    },
    {
      title: "Mobile App Development",
      href: "/mobile-application",
      items: [
        { name: "iOS App Development", href: "/mobile-application" },
        { name: "Android App Development", href: "/mobile-application" },
        { name: "React Native Development", href: "/mobile-application" },
        { name: "PWA Development", href: "/mobile-application" },
        { name: "Flutter App Development", href: "/mobile-application" },
      ],
    },
    {
      title: "UI/UX Designing",
      href: "/ui-ux",
      items: [
        { name: "Mobile App Design", href: "/ui-ux" },
        { name: "Responsive Web Design", href: "/ui-ux" },
        { name: "Design Prototyping", href: "/ui-ux" },
      ],
    },

    {
      title: "QA Testing & Support",
      href: "/product-engineering",
      items: [
        { name: "Software Testing", href: "/product-engineering" },
        { name: "Support & Maintenance", href: "/product-engineering" },
        { name: "Mobile Testing", href: "/product-engineering" },
      ],
    },
    {
      title: "Digital Marketing",
      href: "/digital-marketing",
      items: [
        { name: "SEO", href: "/digital-marketing" },
        { name: "SMO", href: "/digital-marketing" },
        { name: "Content Marketing", href: "/digital-marketing" },
      ],
    },
  ];

  const services = [
    { name: "Web Applications", href: "/web-applications" },
    { name: "Product Engineering", href: "/product-engineering" },
    { name: "Custom Software Development", href: "/custom-software" },
    { name: "Mobile Application", href: "/mobile-application" },
    { name: "UI/UX Research & Design", href: "/ui-ux" },
    { name: "Digital Marketing", href: "/digital-marketing" },
  ];

  // Scroll event listener with throttling for better performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > window.innerHeight - 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideDesktop =
        !servicesDropdownRef.current ||
        !servicesDropdownRef.current.contains(target);
      const isOutsideMobile =
        !mobileServicesDropdownRef.current ||
        !mobileServicesDropdownRef.current.contains(target);

      if (isOutsideDesktop && isOutsideMobile) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesOpen]);

  // Scroll to close dropdown
  useEffect(() => {
    const handleScroll = () => {
      if (isServicesOpen) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isServicesOpen]);

  // Click outside to close mobile drawer
  useEffect(() => {
    const handleClickOutsideDrawer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        mobileDrawerRef.current &&
        !mobileDrawerRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    if (isMenuOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutsideDrawer);
      }, 100);
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutsideDrawer);
      };
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDrawer);
    };
  }, [isMenuOpen]);

  // Close menu and dropdown on route change
  useEffect(() => {
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isServicesOpen) setIsServicesOpen(false);
  };

  const toggleServices = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsServicesOpen((prev) => !prev);
  };

  const handleServiceClick = () => {
    setIsServicesOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = services.some(
    (service) => location.pathname === service.href,
  );

  return (
    <>
      <nav
        className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ease-in-out ${isTransparentNav && !isScrolled
            ? "py-2.5 md:py-4 bg-gradient-to-b from-gray-950/90 via-gray-900/50 to-transparent backdrop-blur-[4px]"
            : "py-2 bg-white/95 backdrop-blur-md shadow-none border-none"
          }`}
        style={{
          willChange: isScrolled ? "auto" : "padding",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex-shrink-0 z-50">
            <Link to="/" className="block">
              <img
                src={isTransparentNav && !isScrolled ? logoWhite : logo}
                alt="Karma Dude Logo"
                className="w-auto object-contain transition-all duration-300 h-10 sm:h-12 md:h-14"
              />
            </Link>
          </div>

          <div
            className={`hidden lg:flex items-center gap-1 bg-[#2d3748] backdrop-blur-xl rounded-full px-6 py-3 shadow-none border-none transition-all duration-500 ${isScrolled
              ? "scale-95 translate-y-0"
              : "scale-100 translate-y-2 opacity-90 hover:opacity-100"
              }`}
          >
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold ${isActive("/")
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/15 hover:text-white"
                }`}
            >
              <i className="fas fa-home text-blue-400"></i> Home
            </Link>

            <div className="relative group" ref={servicesDropdownRef}>
              <button
                onClick={toggleServices}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold ${isServicesOpen || isServicesActive
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/15 hover:text-white"
                  }`}
              >
                <i className="fas fa-layer-group text-purple-500"></i> Services
                <i
                  className={`fas fa-chevron-down text-xs transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                ></i>
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[95vw] max-w-6xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn origin-top">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8 p-10">
                    {serviceCategories.map((category, idx) => {
                      const icons = [
                        "fas fa-shopping-bag text-pink-500",
                        "fas fa-code text-blue-500",
                        "fas fa-server text-green-500",
                        "fas fa-mobile-alt text-purple-500",
                        "fas fa-palette text-orange-500",
                        "fab fa-windows text-blue-400",
                        "fas fa-tasks text-red-500",
                        "fas fa-bullhorn text-yellow-500",
                      ];

                      return (
                        <div key={category.title} className="group/category">
                          <Link
                            to={category.href}
                            onClick={handleServiceClick}
                            className="flex items-center gap-3 text-gray-900 font-bold text-sm uppercase tracking-wider mb-5 pb-2 border-b border-gray-100 group-hover/category:border-blue-500 transition-colors duration-300 hover:text-blue-600"
                          >
                            <i
                              className={`${icons[idx % icons.length]} text-lg`}
                            ></i>
                            {category.title}
                          </Link>
                          <ul className="space-y-3">
                            {category.items.map((item, i) => (
                              <li key={i}>
                                <Link
                                  to={item.href}
                                  onClick={handleServiceClick}
                                  className="text-[14px] text-gray-500 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 opacity-100 group-hover:opacity-100 transition-opacity"></span>
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-600">
                      Not sure which technology is right for you?
                      <Link
                        to="/contact"
                        className="ml-2 text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
                      >
                        Schedule a Free Consultation{" "}
                        <i className="fas fa-arrow-right ml-1 text-xs"></i>
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/our-works"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold ${isActive("/our-works")
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/15 hover:text-white"
                }`}
            >
              <i className="fas fa-briefcase text-orange-400"></i> Work
            </Link>

            <Link
              to="/quotation"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold ${isActive("/quotation")
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/15 hover:text-white"
                }`}
            >
              <i className="fas fa-file-invoice-dollar text-green-400"></i>{" "}
              Quotation
            </Link>

            <Link
              to="/testers"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold ${isActive("/testers")
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/15 hover:text-white"
                }`}
            >
              <i className="fas fa-mobile-alt text-blue-400"></i>{" "}
              Testers
            </Link>

            {/* <Link
              to="/internships"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold ${isActive("/internships")
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/15 hover:text-white"
                }`}
            >
              <i className="fas fa-graduation-cap text-purple-400"></i>{" "}
              Internship
            </Link> */}

            <Link
              to="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold ${isActive("/about")
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/15 hover:text-white"
                }`}
            >
              <i className="fas fa-info-circle text-teal-400"></i> About
            </Link>

            <Link
              to="/contact"
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all text-sm font-bold ml-2 ${isActive("/contact")
                ? "bg-[#1f5f8b] text-white hover:shadow-lg"
                : "bg-[#2f8ecd] text-white hover:bg-[#1f5f8b] hover:shadow-lg"
                }`}
            >
              <i className="fas fa-paper-plane"></i> Contact
            </Link>
          </div>

          <div className="lg:hidden z-50">
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className={`w-10 h-10 rounded-xl flex items-center justify-center focus:outline-none transition-all duration-300 ${isScrolled || !isTransparentNav
                ? "bg-slate-100/80 border border-slate-200/80 text-slate-900 hover:bg-slate-200/80 active:scale-95 shadow-xs"
                : "text-white bg-black/30 backdrop-blur-md border border-white/20 hover:bg-black/40 active:scale-95"
                }`}
            >
              {isMenuOpen ? (
                <i className="fas fa-times text-lg"></i>
              ) : (
                <i className="fas fa-bars text-lg"></i>
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 lg:hidden z-[55] backdrop-blur-sm"
              onClick={toggleMenu}
            />

            {/* Mobile Drawer */}
            <motion.div
              ref={mobileDrawerRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed top-0 left-0 h-full w-full max-w-[340px] bg-gradient-to-b from-white to-[#FCFCFD] text-gray-900 z-[60] shadow-2xl border-r border-gray-100 rounded-r-[24px] overflow-hidden flex flex-col will-change-transform lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header Section */}
                <div className="flex flex-col px-6 pt-6 pb-4 border-b border-slate-900/[0.08] bg-white">
                  <div className="flex items-center justify-between">
                    <Link to="/" onClick={toggleMenu} className="flex-shrink-0 flex items-center">
                      <img src={logo} alt="Karma Dude Logo" className="h-11 w-auto" />
                    </Link>
                    <button
                      onClick={toggleMenu}
                      aria-label="Close menu"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 text-gray-500 hover:text-gray-900 hover:rotate-90 active:scale-95 transition-all duration-200"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#2f8ecd] uppercase mt-2.5 pl-0.5">
                    DIGITAL EXCELLENCE
                  </span>
                </div>

                {/* Navigation Links */}
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  className="flex-1 overflow-y-auto px-4 py-4 space-y-2 no-scrollbar"
                >
                  {menuItems.map((item) => {
                    if (item.isDropdown) {
                      const activeServices = isServicesOpen || isServicesActive;
                      return (
                        <div key="services-dropdown" ref={mobileServicesDropdownRef} className="flex flex-col">
                          <button
                            onClick={toggleServices}
                            className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group min-h-[52px] text-left w-full ${activeServices
                              ? "bg-blue-50/50 text-[#2f8ecd] font-semibold"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                          >
                            <div className="flex items-center gap-4">
                              <Layers
                                size={18}
                                strokeWidth={2}
                                className={`transition-colors duration-200 ${isServicesActive ? "text-[#2f8ecd]" : "text-gray-400 group-hover:text-gray-600"
                                  }`}
                              />
                              <span className={`text-[15px] font-medium tracking-tight ${isServicesActive ? "text-[#2f8ecd] font-semibold" : ""}`}>
                                Services
                              </span>
                            </div>
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180 text-gray-600" : "text-gray-300"
                                } ${isServicesActive ? "text-[#2f8ecd]" : ""}`}
                            />
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isServicesOpen
                              ? "max-h-[500px] opacity-100 mt-1 pl-4"
                              : "max-h-0 opacity-0 pointer-events-none"
                              }`}
                          >
                            <div className="pl-6 border-l border-gray-100 py-1 space-y-1">
                              {services.map((service, index) => {
                                const subActive = isActive(service.href);
                                return (
                                  <Link
                                    key={index}
                                    to={service.href}
                                    onClick={() => {
                                      handleServiceClick();
                                      toggleMenu();
                                    }}
                                    className={`flex items-center gap-2 py-2 px-3 rounded-lg text-[14px] transition-colors duration-200 ${subActive
                                      ? "text-[#2f8ecd] bg-blue-50/30 font-medium"
                                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                      }`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${subActive ? "bg-[#2f8ecd]" : "bg-gray-300"}`} />
                                    {service.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    const Icon = item.icon!;
                    const active = isActive(item.to!);
                    return (
                      <motion.div variants={itemVariants} key={item.to}>
                        <Link
                          to={item.to!}
                          onClick={toggleMenu}
                          className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group min-h-[52px] ${active
                            ? "bg-blue-50/50 text-[#2f8ecd] font-semibold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                          <div className="flex items-center gap-4">
                            <Icon
                              size={18}
                              strokeWidth={2}
                              className={`transition-colors duration-200 ${active ? "text-[#2f8ecd]" : "text-gray-400 group-hover:text-gray-600"
                                }`}
                            />
                            <span className="text-[15px] font-medium tracking-tight">
                              {item.label}
                            </span>
                          </div>
                          <ChevronRight
                            size={16}
                            className={`transition-colors duration-200 ${active ? "text-[#2f8ecd]" : "text-gray-300 group-hover:text-gray-400"
                              }`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Footer Call to Action */}
                <div className="p-4 border-t border-slate-900/[0.08] bg-white mt-auto">
                  <div className="p-4 rounded-2xl bg-slate-50/40 border border-slate-100 text-center shadow-sm">
                    <h4 className="text-[13px] font-bold text-gray-800 mb-1 leading-snug">
                      Ready to build your next project?
                    </h4>
                    <p className="text-[11px] text-gray-500 mb-3 leading-relaxed px-2">
                      Let's discuss how we can bring your vision to life.
                    </p>
                    <Link
                      to="/quotation"
                      onClick={toggleMenu}
                      className="flex items-center justify-center w-full h-10 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#2f8ecd] transition-all active:scale-98 duration-200 text-center"
                    >
                      Get a Quote
                    </Link>
                  </div>

                  {/* Social icons with original brand colors */}
                  <div className="flex items-center justify-center gap-6 mt-3.5 pt-0.5">
                    <a
                      href="mailto:karmadudeitsolutions@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Email"
                      className="text-[#ea4335] hover:opacity-85 transition-opacity active:scale-95 duration-200 flex items-center justify-center"
                    >
                      <FaEnvelope size={20} />
                    </a>
                    <a
                      href="https://wa.me/7435822022"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="text-[#25D366] hover:opacity-85 transition-opacity active:scale-95 duration-200 flex items-center justify-center"
                    >
                      <FaWhatsapp size={22} />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/karmadude/posts/?feedView=all"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="text-[#0A66C2] hover:opacity-85 transition-opacity active:scale-95 duration-200 flex items-center justify-center"
                    >
                      <FaLinkedin size={22} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
