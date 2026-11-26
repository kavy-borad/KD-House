import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Removed as it is imported globally
// import * as echarts from "echarts"; // Removed for performance

import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";
import MessageTicker from "./home/MessageTicker";
import HeroArchitectureBg from "./home/HeroArchitectureBg";
import HeroRightLoop from "./home/HeroRightLoop";
import WhyChooseUsSection from "./home/WhyChooseUsSection";
import CustomProjectBanner from "./home/CustomProjectBanner";
import ServicesCircuitBg from "./home/ServicesCircuitBg";
import GlitchSectionTitle, { GlitchWord } from "./home/GlitchSectionTitle";
import RewriteParagraph from "./home/RewriteParagraph";

const CounterNumber = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  const target = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const unsubscribe = motionVal.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
    return unsubscribe;
  }, [motionVal]);

  useEffect(() => {
    if (!isInView || target === 0) return;

    const controls = animate(motionVal, target, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1], // expo ease-out — very fast start, glides to a stop
    });

    return () => controls.stop();
  }, [isInView, target, motionVal]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const TechStack = lazy(() => import("./home/TechStack"));

const ScrollHideTicker = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 z-40 w-full bg-gradient-to-r from-blue-950/95 via-indigo-900/95 to-blue-950/95 backdrop-blur-xl border-t border-blue-500/30 h-16 md:h-20 flex items-center shadow-[0_-5px_30px_rgba(59,130,246,0.2)]"
    >
      <div className="max-w-7xl mx-auto px-4 w-full relative h-full flex items-center justify-center overflow-hidden">
        <MessageTicker />
      </div>
    </motion.div>
  );
};

const HERO_SLIDES = [
  {
    id: "digital-future",
    line1: "Building The",
    line2: "Digital Future.",
    description: (
      <>
        We are <span className="text-slate-900 font-semibold">Karma Dude</span>.
        We engineer high-performance websites, AI-driven applications, and
        scalable software solutions that drive real growth.
      </>
    ),
  },
  {
    id: "ai-ml",
    line1: "Building With",
    line2: "AI & ML.",
    description: (
      <>
        Next-gen automation, predictive models, and{" "}
        <span className="text-slate-900 font-semibold">
          intelligent workflows
        </span>{" "}
        engineered to transform operations and accelerate your business growth.
      </>
    ),
  },
  {
    id: "tech-stack",
    line1: "Modern",
    line2: "Tech Stack.",
    description: (
      <>
        Full-stack mastery across{" "}
        <span className="text-slate-900 font-semibold">
          React, Node, Python, AWS
        </span>
        , and resilient Cloud Architecture built to scale effortlessly.
      </>
    ),
  },
];

const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLElement>(null);
  const benefitsGridRef = useRef<HTMLDivElement>(null);
  const isBenefitsInView = useInView(benefitsGridRef, { once: true, amount: 0.2 });
  const [benefitRewriteStep, setBenefitRewriteStep] = useState<number>(-1);

  useEffect(() => {
    if (isBenefitsInView && benefitRewriteStep < 0) {
      setBenefitRewriteStep(0);
    }
  }, [isBenefitsInView, benefitRewriteStep]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = window.setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  const currentHeroSlide = HERO_SLIDES[heroSlideIndex];

  const scrollToServices = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
  ) => {
    e.preventDefault();
    const servicesSection = document.querySelector("#our-services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Karmadude - AI & Software Development Solutions</title>
        <meta
          name="description"
          content="Karmadude offers AI-powered software, web and mobile apps, UI/UX design, and QA to elevate your business."
        />
        <meta
          name="keywords"
          content="AI development, software development, web applications, mobile apps, UI/UX design, QA testing, Karmadude"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Karmadude - AI & Software Development Solutions"
        />
        <meta
          property="og:description"
          content="Discover Karmadude's innovative AI and software solutions, including web/mobile apps and UI/UX design."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karmadude.in/" />
        <meta
          property="og:image"
          content="https://karmadude.in/og-image-home.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Karmadude - AI & Software Development Solutions"
        />
        <meta
          name="twitter:description"
          content="Explore Karmadude's expertise in AI, web/mobile apps, and UI/UX design for your business."
        />
        <meta
          name="twitter:image"
          content="https://karmadude.in/og-image-home.jpg"
        />
        <link rel="canonical" href="https://karmadude.in/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Karmadude",
            url: "https://karmadude.in",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://karmadude.in/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          html {
            scroll-behavior: smooth;
          }
          @media (max-width: 640px) {
            .animate-float {
              font-size: 1.5rem;
              animation: float 3s ease-in-out infinite;
            }
            .hero-text h1 {
              font-size: 2.5rem;
            }
            .hero-text p {
              font-size: 1rem;
            }
            .tech-icon-container {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
              gap: 10px;
              padding: 1rem;
            }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>

      {/* Hero Section - Light Architectural Bento Grid Layout (sticky scroll track avoids GSAP pin-spacer DOM reparenting) */}
      <div ref={heroTrackRef} className="relative min-h-[300dvh] lg:min-h-[320vh]">
        <div
          ref={heroSectionRef}
          data-hero-section="true"
          className="relative sticky top-0 min-h-[100dvh] w-full bg-white flex flex-col pt-20 sm:pt-24 lg:pt-24 overflow-x-clip"
        >
        {/* Static Light Blueprint Grid & Crosshair Background */}
        <HeroArchitectureBg />

        {/* Main Content Area - Shifted Left on Desktop with Right Architectural Loop */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-2 sm:py-4 md:px-8 md:py-6 flex items-center justify-center relative z-10 pb-20 sm:pb-24 lg:pb-0">
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-5 lg:gap-8 xl:gap-14">
            {/* Main Hero Content */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex-1 min-w-0 flex flex-col justify-center py-2 sm:py-4 lg:py-10 px-1 sm:px-2 md:px-2"
            >
              <div className="relative z-20 max-w-3xl">
                <motion.div
                  data-physics-obstacle="true"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full bg-blue-50/75 border border-blue-200/70 text-slate-700 font-semibold text-xs md:text-sm mb-2.5 sm:mb-4 md:mb-6 backdrop-blur-[2px]"
                >
                  <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-blue-600"></span>
                  </span>
                  Ready to Scale Your Business?
                </motion.div>

                <div data-physics-obstacle="true">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentHeroSlide.id}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 12 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        shouldReduceMotion ? undefined : { opacity: 0, y: -12 }
                      }
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h1 className="text-[32px] sm:text-5xl md:text-7xl font-bold text-slate-900 mb-2.5 sm:mb-4 md:mb-6 leading-[1.08] md:leading-[0.9] tracking-tight">
                        <span className="block mb-1 sm:mb-2 md:mb-3">
                          {currentHeroSlide.line1}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600">
                          {currentHeroSlide.line2}
                        </span>
                      </h1>

                      <p className="text-sm sm:text-base md:text-xl text-slate-700 mb-4 sm:mb-6 md:mb-10 font-normal leading-relaxed max-w-2xl">
                        {currentHeroSlide.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div
                  data-physics-obstacle="true"
                  className="inline-flex flex-wrap gap-2.5 sm:gap-3 md:gap-4"
                >
                  <Link
                    to="/our-works"
                    onClick={scrollToServices}
                    className="relative px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full bg-[#001F3F] text-white font-bold text-sm sm:text-base md:text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_10px_28px_rgba(0,31,63,0.2)]"
                  >
                    Start Your Project
                  </Link>
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full border border-slate-300/90 bg-white/65 hover:bg-white/90 font-normal text-sm sm:text-base md:text-lg text-slate-800 backdrop-blur-[2px] transition-all hover:border-slate-400 hover:scale-105 active:scale-95"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right-Side Architectural Flow Loop */}
            <HeroRightLoop heroRef={heroTrackRef} />
          </div>
        </div>
        </div>
      </div>

      {/* Animated Text Strip Section - Fixed at Bottom, Hides on Scroll Down */}
      <ScrollHideTicker />

      {/* Why Karma Dude? Section - Concentric Half-Circle Arch with GSAP ScrollTrigger */}
      <WhyChooseUsSection />

      {/* Our Services Section - Professional Modern Design */}
      <section
        id="our-services"
        ref={servicesSectionRef}
        className="py-12 md:py-16 px-4 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50"
      >
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Concentric Circular Circuit SVG Rotating Slowly on Scroll */}
        <ServicesCircuitBg sectionRef={servicesSectionRef} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-700 font-semibold text-sm tracking-wide">
                WHAT WE OFFER
              </span>
            </div>

            <GlitchSectionTitle leadText="Our" accentText="Services" />

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed to accelerate your
              business growth and digital transformation
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "fas fa-laptop-code",
                title: "Web Applications",
                desc: "Custom web applications built with cutting-edge technologies to meet your specific business requirements and drive efficiency.",
                button: "Explore Web Solutions",
                link: "/web-applications",
                color: "from-orange-500 to-red-500",
                textColor: "text-orange-500",
                bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
              },
              {
                icon: "fas fa-cogs",
                title: "Product Engineering",
                desc: "End-to-end product development services from ideation to deployment, ensuring scalable and robust solutions.",
                button: "Build Your Product",
                link: "/product-engineering",
                color: "from-blue-500 to-cyan-500",
                textColor: "text-[#2f8ecd]",
                bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
              },
              {
                icon: "fas fa-tools",
                title: "Custom Software Development",
                desc: "Tailored software solutions designed to solve your unique business challenges and optimize operations.",
                button: "Start Your Project",
                link: "/custom-software",
                color: "from-amber-500 to-yellow-500",
                textColor: "text-amber-500",
                bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
              },
              {
                icon: "fas fa-mobile-alt",
                title: "Mobile Application",
                desc: "Native and cross-platform mobile apps that deliver exceptional user experiences across all devices.",
                button: "Create Mobile App",
                link: "/mobile-application",
                color: "from-emerald-500 to-teal-500",
                textColor: "text-emerald-500",
                bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
              },
              {
                icon: "fas fa-paint-brush",
                title: "UI/UX Research & Design",
                desc: "User-centered design solutions that combine aesthetics with functionality to create memorable digital experiences.",
                button: "Design Excellence",
                link: "/ui-ux",
                color: "from-purple-500 to-pink-500",
                textColor: "text-purple-500",
                bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
              },
              {
                icon: "fas fa-bullhorn",
                title: "Digital Marketing",
                desc: "Data-driven marketing strategies that amplify your brand presence and drive measurable business results.",
                button: "Grow Your Reach",
                link: "/digital-marketing",
                color: "from-rose-500 to-pink-500",
                textColor: "text-rose-500",
                bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="relative h-full bg-white/86 backdrop-blur-[2px] rounded-2xl shadow-none transition-all duration-500 overflow-hidden border border-slate-200/80 hover:border-blue-200 flex flex-col">
                  {/* Hover Gradient Overlay */}
                  <div
                    className={`absolute inset-0 ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  {/* Card Content */}
                  <div className="relative p-6 md:p-8 flex flex-col h-full z-10">
                    {/* Clean Minimal Icon Without Container Box */}
                    <motion.div
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mb-3 md:mb-5"
                    >
                      <div className={`text-2xl md:text-3xl ${service.textColor} inline-block transition-transform duration-300 group-hover:scale-110`}>
                        <i className={service.icon}></i>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-sm">
                      {service.desc}
                    </p>

                    {/* CTA Link */}
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:gap-3 transition-all duration-300 mt-auto w-fit"
                    >
                      <span
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${service.color}`}
                      >
                        {service.button}
                      </span>
                      <i
                        className={`fas fa-arrow-right text-xs text-transparent bg-clip-text bg-gradient-to-r ${service.color} group-hover:translate-x-1 transition-transform duration-300`}
                      ></i>
                    </Link>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                      <i
                        className={`${service.icon} text-8xl text-gray-900`}
                        style={{ transform: "rotate(15deg)" }}
                      ></i>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className={`h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${service.color}`}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA Section - Smooth Left-to-Right ScrollTrigger Unveil */}
          <CustomProjectBanner />
        </div>
      </section>

      {/* Technologies We Work With Section - Modern Minimal Design */}

      <section
        className="py-24 bg-slate-50 relative overflow-hidden"
        id="tech-section"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
          >
            <TechStack />
          </Suspense>
        </div>
      </section>

      {/* Take Charge of Your Career Section */}
      {/* <section
        className="py-10 md:py-20 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-white text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto">
            Discover the best web and mobile technology services with Karma
            Dude. We offer cutting-edge solutions, expert development, and
            seamless integration to elevate your business.
          </p>
          <a
            href="#our-services"
            onClick={scrollToServices}
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-full hover:bg-blue-700 transition duration-300 text-sm md:text-base"
          >
            Explore Our Services
          </a>
        </div>
      </section> */}

      {/* Why Choose Karma Dude? Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-stretch">
            {/* Left Content - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-full min-h-[400px] lg:min-h-full"
            >
              <div className="relative h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="IT Solutions Team at Work"
                  loading="lazy"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/60 via-transparent to-transparent"></div>

                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 max-w-xs hidden sm:block">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#001F3F]">
                      <i className="fas fa-code"></i>
                    </div>
                    <span className="font-bold text-[#001F3F]">
                      Advanced Solutions
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Empowering businesses with next-gen technology.
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-12 -right-12 w-32 h-32 bg-purple-50/50 rounded-full blur-3xl -z-10"></div>
            </motion.div>

            {/* Right Content - Stats & Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Why <GlitchWord word="Choose" />{" "}
                <span className="text-[#2f8ecd]">Karma Dude?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                We provide unparalleled expertise and support for your project
                and are recognized as the leading AI development company. Our
                commitment to excellence ensures your success.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    icon: "fas fa-history",
                    value: "15+",
                    label: "Years of Experience",
                  },
                  {
                    icon: "fas fa-users",
                    value: "30+",
                    label: "Team Strength",
                  },
                  {
                    icon: "fas fa-microchip",
                    value: "20+",
                    label: "Technology Expertise",
                  },
                  {
                    icon: "fas fa-globe",
                    value: "100+",
                    label: "Global Clients",
                  },
                  {
                    icon: "fas fa-check-circle",
                    value: "250+",
                    label: "Projects Delivered",
                  },
                  {
                    icon: "fas fa-box-open",
                    value: "10+",
                    label: "Products",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="py-5 px-3.5 sm:p-6 bg-white border border-blue-100 rounded-xl sm:rounded-2xl shadow-none hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="mb-2 sm:mb-3 text-2xl md:text-3xl text-[#2f8ecd] transition-transform duration-300 group-hover:scale-110">
                      <i className={item.icon}></i>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-[#001F3F] transition-colors">
                      <CounterNumber value={item.value} />
                    </h3>
                    <p className="text-sm font-normal text-gray-500 group-hover:text-gray-700 transition-colors leading-snug">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Benefits Section - Aesthetic Color Blocks */}
      <section className="pb-24 pt-10 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={benefitsGridRef} className="grid grid-cols-2 gap-3.5 sm:gap-8">
            {[
              {
                icon: "fas fa-robot",
                color: "text-blue-600",
                caretBg: "bg-blue-600",
                iconBg: "bg-blue-100",
                borderColor: "border-blue-100",
                // splash: "bg-blue-400",
                // shadow: "hover:shadow-blue-100",
                title: "AI Expertise",
                desc: "We combine human ingenuity with AI prowess to deliver tailored solutions that fit your unique needs perfectly.",
              },
              {
                icon: "fas fa-trophy",
                color: "text-emerald-600",
                caretBg: "bg-emerald-600",
                iconBg: "bg-emerald-100",
                borderColor: "border-emerald-100",
                // splash: "bg-emerald-400",
                // shadow: "hover:shadow-emerald-100",
                title: "Proven Reputation",
                desc: "Our proven track record of successful AI development projects speaks for itself. We deliver excellence, every time.",
              },
              {
                icon: "fas fa-sync-alt",
                color: "text-orange-500",
                caretBg: "bg-orange-500",
                iconBg: "bg-orange-100",
                borderColor: "border-orange-100",
                // splash: "bg-orange-400",
                // shadow: "hover:shadow-orange-100",
                title: "Completely Adaptable",
                desc: "Your vision is unique, and so is our approach. We adapt our strategies to align perfectly with your business goals.",
              },
              {
                icon: "fas fa-users",
                color: "text-purple-600",
                caretBg: "bg-purple-600",
                iconBg: "bg-purple-100",
                borderColor: "border-purple-100",
                // splash: "bg-purple-400",
                // shadow: "hover:shadow-purple-100",
                title: "Collaborative Approach",
                desc: "Our collaborative approach ensures that your custom AI solutions are built with your direct input at every stage.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 ${benefit.borderColor} shadow-none transition-all duration-300 group`}
              >
                {/* Decorative Gradient Splash */}
                <div
                  className={`absolute -top-10 -right-10 w-20 h-20 sm:w-40 sm:h-40 rounded-full blur-[40px] sm:blur-[80px] opacity-20 transition-all duration-500 group-hover:opacity-30`}
                ></div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-3 sm:gap-5">
                  <div
                    className={`text-2xl sm:text-3xl md:text-4xl ${benefit.color} shrink-0 pt-1 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <i className={benefit.icon}></i>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3 group-hover:text-gray-800">
                      {benefit.title}
                    </h4>
                    <RewriteParagraph
                      text={benefit.desc}
                      active={benefitRewriteStep === index}
                      completed={benefitRewriteStep > index}
                      onComplete={() =>
                        setBenefitRewriteStep((prev) =>
                          prev === index ? index + 1 : prev,
                        )
                      }
                      caretClassName={benefit.caretBg}
                      className="text-xs sm:text-base text-gray-500 leading-snug sm:leading-relaxed"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section - Clean Modern Design */}
      <section
        className="py-12 md:py-16 px-4 relative overflow-hidden bg-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(47, 142, 205, 0.16) 0%, rgba(47, 142, 205, 0.08) 50%, rgba(47, 142, 205, 0.22) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-white/95 text-[#2f8ecd] rounded-full font-bold text-sm mb-4">
              INDUSTRIES WE SERVE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Tailored <GlitchWord word="Solutions" /> for{" "}
              <GlitchWord word="Every" />{" "}
              <span className="text-[#2f8ecd]">Industry</span>
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              From real estate to AI development, we deliver cutting-edge
              technology solutions
            </p>
          </motion.div>

          {/* Industries Grid - 8 Ultra-Premium Enterprise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[
              {
                img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Food & Beverage",
                category: "Hospitality & Food",
                desc: "Digital products, platforms, POS systems, and solutions built for restaurants, cafés, food brands, cloud kitchens, and the wider food & beverage industry.",
                accentGradient: "from-orange-500 to-amber-400",
                badgeBg: "bg-orange-50 text-orange-600 border-orange-200/80",
                btnColor: "text-orange-600 hover:text-orange-700",
              },
              {
                img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Health & Wellness",
                category: "Healthcare & Fitness",
                desc: "Digital solutions for dietitians, nutritionists, wellness businesses, fitness platforms, and products focused on improving health and lifestyle management.",
                accentGradient: "from-emerald-500 to-teal-400",
                badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
                btnColor: "text-emerald-600 hover:text-emerald-700",
              },
              {
                img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Rental & Marketplace",
                category: "E-Commerce & Booking",
                desc: "Rental platforms and marketplace solutions that help businesses list, discover, book, rent, buy, sell, and manage products or services online.",
                accentGradient: "from-[#2f8ecd] to-sky-400",
                badgeBg: "bg-blue-50 text-[#2f8ecd] border-blue-200/80",
                btnColor: "text-[#2f8ecd] hover:text-blue-700",
              },
              {
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "CRM & ERP",
                category: "Enterprise Systems",
                desc: "Custom CRM and ERP solutions designed to streamline customer management, sales, operations, inventory, employee workflows, and overall business processes.",
                accentGradient: "from-purple-500 to-indigo-400",
                badgeBg: "bg-purple-50 text-purple-600 border-purple-200/80",
                btnColor: "text-purple-600 hover:text-purple-700",
              },
              {
                img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "POS & Inventory",
                category: "Retail & Commerce",
                desc: "Smart point-of-sale and inventory management solutions that help businesses manage billing, stock, products, orders, purchases, and real-time inventory efficiently.",
                accentGradient: "from-teal-500 to-cyan-400",
                badgeBg: "bg-teal-50 text-teal-600 border-teal-200/80",
                btnColor: "text-teal-600 hover:text-teal-700",
              },
              {
                img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "AI & Automation",
                category: "Next-Gen Tech",
                desc: "AI-powered products and intelligent automation solutions that reduce manual work, automate repetitive processes, improve productivity, and enable smarter business operations.",
                accentGradient: "from-rose-500 to-pink-400",
                badgeBg: "bg-rose-50 text-rose-600 border-rose-200/80",
                btnColor: "text-rose-600 hover:text-rose-700",
              },
              {
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "SaaS Products",
                category: "Cloud Software",
                desc: "Scalable subscription-based software products built for businesses and professionals, including multi-tenant platforms, dashboards, and specialised industry solutions.",
                accentGradient: "from-indigo-500 to-blue-400",
                badgeBg: "bg-indigo-50 text-indigo-600 border-indigo-200/80",
                btnColor: "text-indigo-600 hover:text-indigo-700",
              },
              {
                img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Finance & Professional Solutions",
                category: "Fintech & Services",
                desc: "Digital platforms and SaaS solutions for CA firms, accountants, financial professionals, and other service-based businesses to simplify workflows, compliance, reporting, and client management.",
                accentGradient: "from-sky-500 to-blue-400",
                badgeBg: "bg-sky-50 text-sky-600 border-sky-200/80",
                btnColor: "text-sky-600 hover:text-sky-700",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group flex"
              >
                <div className="flex flex-col w-full bg-white rounded-2xl shadow-none hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-slate-200/80 hover:border-[#2f8ecd]/50 relative">
                  {/* Top Accent Color Bar */}
                  <div
                    className={`h-[3px] w-full bg-gradient-to-r ${item.accentGradient}`}
                  ></div>

                  {/* Image Showcase */}
                  <div className="relative h-48 overflow-hidden bg-slate-50">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle Overlay Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col flex-grow p-6 gap-3">
                    {/* Category Tag */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border ${item.badgeBg}`}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-tight group-hover:text-[#2f8ecd] transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed text-sm font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001833] via-[#001F3F] to-[#0a2f5c] border border-sky-300/20 px-6 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-12"
          >
            {/* Subtle Architectural Grid & Ambient Accent Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.45) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full opacity-25 blur-3xl"
              style={{ backgroundColor: "#2f8ecd" }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 text-center lg:text-left">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-sky-300/25 text-sky-200 text-xs font-bold tracking-widest uppercase mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                  Custom Industry Solutions
                </span>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
                  Don&apos;t See Your{" "}
                  <span className="text-[#56b4f0]">Industry?</span>
                </h3>

                <p className="text-slate-200/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-5 max-w-xl mx-auto lg:mx-0">
                  We build tailored software, AI automation, and scalable digital
                  platforms engineered specifically for your domain workflows.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-sky-100/85 font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-check-circle text-[#56b4f0]" />
                    Bespoke Architecture
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-check-circle text-[#56b4f0]" />
                    Dedicated Engineering
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-check-circle text-[#56b4f0]" />
                    End-to-End Launch
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  to="/contact"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white text-[#001F3F] rounded-xl font-bold text-sm sm:text-base hover:bg-sky-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>Get in Touch</span>
                  <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
