import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Removed as it is imported globally
// import * as echarts from "echarts"; // Removed for performance

import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import heroBgVideo from "../assets/hero_bg.mp4";
import noiseBg from "../assets/noise.svg";
import MessageTicker from "./home/MessageTicker";

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

const Home = () => {
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

      {/* Hero Section - Bento Grid Layout */}
      <div className="relative min-h-[100dvh] w-full bg-gray-900 flex flex-col pt-28 sm:pt-32 md:pt-24 md:overflow-hidden">
        {/* Global Cinematic Video Background */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="hidden md:block w-full h-full object-cover opacity-60 pointer-events-none"
            style={{ willChange: "auto" }}
          >
            <source src={heroBgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Mobile Fallback Background */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-950/40 to-black"></div>

          {/* Detailed Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/90 via-indigo-950/50 to-black/80"></div>
          <div
            className="absolute inset-0 opacity-20 brightness-100 contrast-150"
            style={{ backgroundImage: `url(${noiseBg})` }}
          ></div>
        </div>
        {/* Main Content Area (Bento Grid) - Fills Available Space */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 md:p-6 flex items-start md:items-center justify-center relative z-10 pb-24 md:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-auto md:grid-rows-2 gap-4 md:gap-6 w-full h-auto md:h-full md:max-h-[75vh]">
            {/* Box 1: Main Hero Content (Spans 8 cols, 2 rows) - Slides in from LEFT */}
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm md:backdrop-blur-2xl shadow-2xl flex flex-col justify-center p-6 md:p-14 hover:border-blue-400/50 transition-colors"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none"></div>

              {/* Background Floating Elements - Hidden on Mobile for Performance */}
              <div className="absolute inset-0 pointer-events-none hidden md:block">
                {[
                  {
                    icon: "fab fa-python",
                    color: "#3776AB",
                    top: "10%",
                    right: "10%",
                    delay: 0,
                  },
                  {
                    icon: "fab fa-react",
                    color: "#61DAFB",
                    bottom: "15%",
                    right: "12%",
                    delay: 2,
                  },
                  {
                    icon: "fab fa-js",
                    color: "#F7DF1E",
                    top: "40%",
                    right: "20%",
                    delay: 4,
                  },
                  {
                    icon: "fab fa-docker",
                    color: "#2496ED",
                    top: "15%",
                    left: "8%",
                    delay: 1,
                  },
                  {
                    icon: "fab fa-aws",
                    color: "#FF9900",
                    bottom: "10%",
                    left: "15%",
                    delay: 3,
                  },
                ].map((item, idx) => (
                  <motion.i
                    key={idx}
                    className={`absolute text-5xl md:text-7xl opacity-20 ${item.icon}`}
                    style={{
                      color: item.color,
                      top: item.top,
                      left: item.left,
                      right: item.right,
                      bottom: item.bottom,
                      filter: "blur(2px)",
                    }}
                  ></motion.i>
                ))}
              </div>

              <div className="relative z-20 max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 font-semibold text-xs md:text-sm mb-4 md:mb-6 backdrop-blur-md"
                >
                  <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-blue-500"></span>
                  </span>
                  Ready to Scale Your Business?
                </motion.div>

                <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.1] md:leading-[0.9] tracking-tight">
                  <span className="block mb-2 md:mb-3">Building The</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    Digital Future.
                  </span>
                </h1>

                <p className="text-base md:text-xl text-gray-300 mb-8 md:mb-10 font-normal leading-relaxed max-w-2xl">
                  We are{" "}
                  <span className="text-white font-semibold">Karma Dude</span>.
                  We engineer high-performance websites, AI-driven applications,
                  and scalable software solutions that drive real growth.
                </p>

                <div className="flex flex-wrap gap-3 md:gap-4">
                  <Link
                    to="/our-works"
                    onClick={scrollToServices}
                    className="relative px-6 py-3 md:px-8 md:py-4 rounded-full bg-[#001F3F] text-white font-bold text-base md:text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(0,31,63,0.3)]"
                  >
                    Start Your Project
                  </Link>
                  <Link
                    to="/contact"
                    className="px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 font-normal text-base md:text-lg text-white backdrop-blur-sm transition-all hover:border-white/40 hover:scale-105 active:scale-95"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Box 2: AI Focus - Slides in from TOP */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="md:col-span-4 relative group overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm md:backdrop-blur-2xl p-6 md:p-8 flex flex-col justify-between hover:border-indigo-400/50 transition-colors shadow-xl min-h-[200px] md:min-h-0"
            >
              <div className="absolute top-0 right-0 p-32 bg-indigo-500/20 blur-[100px] rounded-full group-hover:bg-indigo-500/30 transition-all"></div>

              <div className="flex justify-between items-start z-10">
                <div className="p-3 md:p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                  <i className="fas fa-brain text-3xl md:text-4xl text-indigo-300"></i>
                </div>
                <span className="px-2 py-1 md:px-3 rounded-full bg-indigo-500/20 text-indigo-200 text-[10px] md:text-xs font-bold border border-indigo-500/30 uppercase tracking-wider">
                  AI Powered
                </span>
              </div>

              <div className="z-10 mt-4 md:mt-0">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  AI & ML
                </h3>
                <p className="text-indigo-200/80 text-sm leading-relaxed">
                  Next-gen automation, predictive models, and intelligent
                  workflows.
                </p>
              </div>

              <i className="fas fa-robot absolute -bottom-4 -right-4 text-8xl md:text-9xl text-indigo-500/10 group-hover:text-indigo-500/20 transition-all transform"></i>
            </motion.div>

            {/* Box 3: Services Tease - Slides in from BOTTOM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              onClick={scrollToServices}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  scrollToServices(e as any);
                }
              }}
              role="button"
              tabIndex={0}
              className="md:col-span-4 relative group overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-gray-800/40 backdrop-blur-sm md:backdrop-blur-2xl p-6 md:p-8 flex flex-col justify-between hover:border-blue-400/50 transition-colors cursor-pointer shadow-xl min-h-[200px] md:min-h-0"
            >
              <div className="absolute bottom-0 left-0 p-32 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all"></div>

              <div className="flex justify-between items-start z-10">
                <div className="p-3 md:p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                  <i className="fas fa-layer-group text-3xl md:text-4xl text-blue-300"></i>
                </div>
                <div className="flex -space-x-3 hover:space-x-1 transition-all pl-2">
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-800 bg-gray-900 flex items-center justify-center text-blue-400 text-sm md:text-lg relative z-30"
                    title="React"
                  >
                    <i className="fab fa-react"></i>
                  </div>
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-800 bg-gray-900 flex items-center justify-center text-green-500 text-sm md:text-lg relative z-20"
                    title="Node.js"
                  >
                    <i className="fab fa-node"></i>
                  </div>
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-800 bg-gray-900 flex items-center justify-center text-yellow-500 text-sm md:text-lg relative z-10"
                    title="Python"
                  >
                    <i className="fab fa-python"></i>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-800 bg-white text-gray-900 flex items-center justify-center font-bold text-[10px] md:text-xs relative z-0">
                    +12
                  </div>
                </div>
              </div>

              <div className="z-10 mt-4 md:mt-0">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Modern Tech Stack
                </h3>
                <p className="text-blue-200/80 text-sm leading-relaxed">
                  Full-stack mastery: React, Node, Python, AWS, and Cloud
                  Architecture.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Animated Text Strip Section - Fixed at Bottom on Mobile, Regular on Desktop */}
        {/* Animated Text Strip Section - Fixed at Bottom, Hides on Scroll Down */}
        <ScrollHideTicker />
      </div>

      {/* Why Karma Dude? Section - 3D Modern Design */}
      {/* Why Karma Dude? Section - 3D Modern Design */}
      <section className="py-12 md:py-16 relative bg-white overflow-hidden perspective-1000">
        {/* Background Decorative Elements - Reduced on Mobile */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="hidden md:block absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-white blur-[80px]"></div>
          <div className="hidden md:block absolute -bottom-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-white blur-[80px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="py-1.5 px-4 md:py-2 md:px-6 rounded-full bg-white shadow-sm border border-slate-100 text-slate-600 font-bold text-xs md:text-sm tracking-widest uppercase mb-4 inline-block">
                Why Choose Us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight"
            >
              Elevate Your{" "}
              <span className="text-[#2f8ecd]">Digital Presence</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              We bring together deep technical expertise and creative innovation
              to build software that defines the future of your business.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 md:gap-8">
            {[
              {
                icon: "fas fa-rocket",
                title: "Accelerated Growth",
                desc: "Propel your business with cutting-edge tech stacks designed for speed and scalability.",
                iconColor: "text-orange-500",
                longDesc:
                  "We don't just build websites; we build growth engines. By utilizing the latest frameworks like Next.js, React, and serverless architectures, we ensure your digital assets load instantly and scale effortlessly as your user base grows. Our focus on performance optimization directly translates to better SEO rankings, higher conversion rates, and a superior user experience.",
              },
              {
                icon: "fas fa-code-branch",
                title: "Elite Engineering",
                desc: "Our rigorous coding standards ensure robust, maintainable, and efficient software.",
                iconColor: "text-[#2f8ecd]",
                longDesc:
                  "Quality code is the backbone of any successful software product. Our team follows strict coding guidelines, comprehensive code reviews, and automated testing pipelines. This ensures that your application is not only bug-free but also easy to maintain and extend in the future, saving you significant technical debt costs down the line.",
              },
              {
                icon: "fas fa-brain",
                title: "AI-Driven Strategy",
                desc: "We integrate intelligent algorithms to automate processes and provide deep insights.",
                iconColor: "text-purple-500",
                longDesc:
                  "Stay ahead of the competition by leveraging the power of Artificial Intelligence. From predictive analytics to personalized user experiences and automated chatbots, we integrate smart solutions that streamline operations and provide valuable insights into your business performance.",
              },
              {
                icon: "fas fa-shield-alt",
                title: "Fortified Security",
                desc: "Enterprise-grade security protocols to protect your data and your users' trust.",
                iconColor: "text-emerald-500",
                longDesc:
                  "Security is non-negotiable. We implement industry-leading security practices including end-to-end encryption, secure authentication (OAuth, JWT), and regular vulnerability assessments. Your data and your customers' trust are our top priority.",
              },
              {
                icon: "fas fa-bolt",
                title: "High Performance",
                desc: "Optimized for lightning-fast load times and seamless user interactions.",
                iconColor: "text-amber-500",
                longDesc:
                  "Speed kills... the competition. We obsess over performance metrics like Core Web Vitals. By optimizing assets, code-splitting, and leveraging CDNs, we ensure your application feels instantaneous, keeping users engaged and reducing bounce rates.",
              },
              {
                icon: "fas fa-infinity",
                title: "Seamless Scaling",
                desc: "Infrastructure designed to grow effortlessly with your user base without friction.",
                iconColor: "text-cyan-500",
                longDesc:
                  "Whether you have 100 users or 1 million, your application needs to perform flawlessly. We design cloud-native architectures (AWS, Google Cloud, Azure) that auto-scale based on demand, ensuring reliability and cost-efficiency at every stage of your growth.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px -12px rgba(47, 142, 205, 0.12)",
                }}
                className="group relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-300"
              >
                {/* Clean Icon Without Color Container Box */}
                <div className={`text-xl sm:text-2xl md:text-3xl ${item.iconColor} mb-2.5 md:mb-4 inline-block transition-transform duration-300 group-hover:scale-110`}>
                  <i className={item.icon}></i>
                </div>

                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-slate-800 mb-1.5 md:mb-3 group-hover:text-[#2f8ecd] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-slate-500 leading-snug font-normal text-[11px] sm:text-xs md:text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section - Professional Modern Design */}
      <section
        id="our-services"
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

        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden md:block absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="hidden md:block absolute bottom-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

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

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Our <span className="text-[#2f8ecd]">Services</span>
            </h2>

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
                <div className="relative h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col">
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

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 md:mt-20 text-center"
          >
            <div className="bg-[#001F3F] rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Have a Custom Project in Mind?
                </h3>
                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can bring your vision to life with our
                  expertise and innovative solutions
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="px-8 py-4 bg-white text-[#001F3F] rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                  >
                    <span>Get Started Today</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                  <Link
                    to="/our-works"
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span>View Our Work</span>
                    <i className="fas fa-briefcase"></i>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
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
                Why Choose <span className="text-[#2f8ecd]">Karma Dude?</span>
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
                    className="py-5 px-3.5 sm:p-6 bg-white border border-blue-100 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center group"
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
          <div className="grid grid-cols-2 gap-3.5 sm:gap-8">
            {[
              {
                icon: "fas fa-robot",
                color: "text-blue-600",
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
                className={`relative overflow-hidden p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 ${benefit.borderColor} transition-all duration-300 hover:shadow-xl group`}
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
                    <p className="text-xs sm:text-base text-gray-500 leading-snug sm:leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section - Clean Modern Design */}
      <section className="py-12 md:py-16 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mb-4">
              INDUSTRIES WE SERVE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tailored Solutions for Every{" "}
              <span className="text-[#2f8ecd]">Industry</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                <div className="flex flex-col w-full bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-slate-200/80 hover:border-[#2f8ecd]/50 relative">
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 text-center bg-[#001F3F] rounded-2xl p-10 md:p-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don't See Your Industry?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              We specialize in creating custom solutions for any industry. Let's
              discuss your unique needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#001F3F] rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Get in Touch</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
