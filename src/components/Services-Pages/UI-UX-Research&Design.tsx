import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Memoize the component to prevent unnecessary re-renders
const UIUX = React.memo(() => {
  const navigate = useNavigate();

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById("UIUX");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-purple-100 selection:text-purple-900">
      {/* Subtle Background Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Swiss Editorial Hero */}
        <header className="pt-20 pb-6 md:pt-40 md:pb-24 relative overflow-hidden">
          <div className="w-full">
            {/* Top Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex justify-between items-center mb-4 md:mb-20 text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-4 md:pb-6"
            >
              <span className="text-[#9333ea]">KarmaDude</span>
              <span className="hidden md:inline">Product Design</span>
              <span>©2021</span>
            </motion.div>

            {/* Massive Typography */}
            <div className="relative">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[13vw] sm:text-[14vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw] leading-[0.85] font-bold text-gray-900 tracking-tighter"
              >
                UI/UX
              </motion.h1>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 lg:gap-8 md:pl-[12vw]"
              >
                <h1 className="text-[13vw] sm:text-[14vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw] leading-[0.85] font-serif italic font-light text-[#9333ea] tracking-tighter z-10">
                  DESIGN
                </h1>

                <div className="mt-2 md:mt-0 md:ml-8 lg:ml-12 max-w-xs md:max-w-sm">
                  <p className="text-gray-500 text-sm sm:text-lg leading-relaxed">
                    Crafting intuitive, human-centered
                    <span className="text-[#9333ea] font-bold">
                      {" "}
                      digital experiences
                    </span>
                    . Where aesthetics meet functionality.
                  </p>
                  <div className="mt-3 md:mt-6">
                    <a
                      href="#UIUX"
                      onClick={scrollToServices}
                      className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gray-900 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-[#9333ea] transition-all duration-300 group shadow-lg hover:-translate-y-1"
                    >
                      Explore Services
                      <i className="fas fa-arrow-down transform group-hover:translate-y-2 transition-all duration-300"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Tech Stack Marquee */}
        <div className="py-4 md:py-8 border-t border-b border-gray-100 my-6 md:mb-16 overflow-hidden">
          <div className="flex items-center gap-6 sm:gap-12 animate-marquee whitespace-nowrap opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              "Figma",
              "Adobe XD",
              "Sketch",
              "Principle",
              "Miro",
              "Framer",
              "Lottie",
              "Zeplin",
              "InVision",
              "Spline",
            ].map((tech, idx) => (
              <span
                key={idx}
                className="text-base sm:text-xl font-bold text-gray-400 uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
            {[
              "Figma",
              "Adobe XD",
              "Sketch",
              "Principle",
              "Miro",
              "Framer",
              "Lottie",
              "Zeplin",
              "InVision",
              "Spline",
            ].map((tech, idx) => (
              <span
                key={`dup-${idx}`}
                className="text-base sm:text-xl font-bold text-gray-400 uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Philosophy Section */}
      <section className="py-8 md:py-16 px-4 md:px-12 max-w-[1600px] mx-auto border-b border-gray-100 relative">
        <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden md:block"></div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-24">
          <div className="md:w-1/3 relative">
            {/* Decorative dot */}
            <div className="absolute -left-[3.25rem] top-12 w-3 h-3 bg-[#9333ea] rounded-full hidden md:block ring-4 ring-white"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#9333ea] uppercase mb-4 block">
              The Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Designing <br /> with{" "}
              <span className="font-serif italic text-gray-400">empathy.</span>
            </h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-8">
              Great design is invisible. We focus on removing friction and
              creating delightful moments that guide users effortlessly toward
              their goals.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100 mt-6">
              {[
                { label: "Usability", value: "A+" },
                { label: "User Delight", value: "98%" },
                { label: "Conversion", value: "+35%" },
                { label: "Accessibility", value: "100%" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="relative pl-4 border-l-2 border-[#9333ea]/20"
                >
                  <span className="block text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ticker Divider */}
      <div className="w-full bg-[#9333ea] overflow-hidden py-2">
        <div className="animate-marquee whitespace-nowrap flex gap-8 text-white text-xs font-bold uppercase tracking-widest">
          {Array(10)
            .fill("Design That Inspires • User First • ")
            .map((text, i) => (
              <span key={i}>{text}</span>
            ))}
        </div>
      </div>

      {/* 3. Services Grid (Bento Style) */}
      <section id="UIUX" className="py-10 md:py-20 px-4 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <span className="text-xs font-bold tracking-[0.2em] text-[#9333ea] uppercase mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
              Crafting <br />
              <span className="text-[#9333ea] font-serif italic">
                Digital Experiences.
              </span>
            </h2>
          </motion.div>
          <div className="md:w-1/3">
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              We blend research, strategy, and aesthetics to build products that
              people love to use. From complex enterprise tools to consumer
              apps.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(300px,auto)]">
          {/* Main Card - Large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-gray-900 rounded-[2.5rem] p-10 relative overflow-hidden group text-white flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9333ea]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#9333ea]/30 transition-all duration-700"></div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-2xl">
                <i className="fas fa-layer-group text-[#9333ea]"></i>
              </div>
              <h3 className="text-3xl font-bold mb-4">Human-Centered Design</h3>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-lg">
                We start with the user. Through rigorous research and iterative
                prototyping, we ensure that every interaction is intuitive,
                efficient, and satisfying.
              </p>

              {/* Visual Mock: UX Metrics */}
              <div className="mb-8 p-4 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm w-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    User Impact
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-400">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>{" "}
                    Positive
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-gray-300">
                    <span>Task Success</span>
                    <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#9333ea] w-[92%] rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-300">
                    <span>Time on Task</span>
                    <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[40%] rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-300">
                    <span>Satisfaction</span>
                    <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 w-[95%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Capabilities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "User Research",
                    "Wireframing",
                    "Prototyping",
                    "UI Design",
                    "Design Systems",
                    "Interaction Design",
                    "Accessibility",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-wide hover:bg-white/20 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                onClick={() => navigate("/our-works")}
                className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between group-hover:text-[#9333ea] transition-colors cursor-pointer"
              >
                <span className="text-sm font-bold uppercase tracking-widest">
                  Explore Process
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#9333ea] transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Card - Tall */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-1 md:row-span-2 bg-white border border-gray-100 rounded-[2.5rem] p-8 flex flex-col group hover:bg-[#9333ea] hover:border-[#9333ea] transition-all duration-500 relative overflow-hidden"
          >
            {/* Watermark Icon */}
            <div className="absolute -bottom-12 -right-12 text-[10rem] text-gray-50/80 group-hover:text-white/10 transition-colors pointer-events-none rotate-12">
              <i className="fas fa-swatchbook"></i>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/20 transition-all text-xl">
                <i className="fas fa-palette text-[#9333ea] group-hover:text-white transition-colors"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors">
                Design Systems
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 group-hover:text-white/80 transition-colors">
                We build scalable design languages that ensure consistency
                across all your products. Atomic design principles for reusable,
                robust components.
              </p>

              <div className="mb-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 group-hover:text-white/60 transition-colors">
                  Components
                </h4>
                <ul className="space-y-3">
                  {[
                    "Typography & Color",
                    "Iconography",
                    "Grid Systems",
                    "Component Library",
                    "Usage Guidelines",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-white/90 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-[#9333ea] group-hover:bg-white transition-colors rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 group-hover:text-white/60 transition-colors">
                  Tools
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <span className="px-2 py-1 bg-gray-100 group-hover:bg-white/20 rounded text-[12px] font-bold text-gray-600 group-hover:text-white transition-colors">
                    Figma
                  </span>
                  <span className="px-2 py-1 bg-gray-100 group-hover:bg-white/20 rounded text-[12px] font-bold text-gray-600 group-hover:text-white transition-colors">
                    Storybook
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-[2.5rem] p-8 group hover:bg-[#9333ea] transition-colors duration-500 relative"
          >
            <div className="absolute top-8 right-8 bg-black text-white px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider group-hover:bg-white/20 transition-colors">
              Data Driven
            </div>
            <i className="fas fa-search text-3xl text-gray-400 mb-4 group-hover:text-white transition-colors"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors">
              UX Research
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed group-hover:text-white/80 transition-colors mb-4">
              Uncovering user needs through interviews, surveys, and competitive
              analysis.
            </p>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-[2.5rem] p-8 group hover:bg-[#9333ea] transition-colors duration-500 relative"
          >
            <div className="absolute top-8 right-8 bg-blue-500 text-white px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider group-hover:bg-white/20 transition-colors">
              Interactive
            </div>
            <i className="fas fa-mouse-pointer text-3xl text-gray-400 mb-4 group-hover:text-white transition-colors"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors">
              Prototyping
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed group-hover:text-white/80 transition-colors mb-4">
              High-fidelity interactive mockups that look and feel like the
              final product.
            </p>
          </motion.div>

          {/* Wide Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-[#9333ea]/5 border border-[#9333ea]/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 group hover:bg-[#9333ea] transition-colors duration-500"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors">
                Micro-Interactions
              </h3>
              <p className="text-gray-500 text-md group-hover:text-white/80 transition-colors mt-4">
                Adding joy and feedback to every click. Small animations that
                make a big difference in the user experience.
              </p>
              <div className="flex gap-3 text-[14px] font-mono text-gray-400 group-hover:text-white/60 mt-4">
                <span>Lottie</span> <span>•</span> <span>Framer Motion</span>{" "}
                <span>•</span> <span>GSAP</span>
              </div>
            </div>
            <div className="flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <i className="fas fa-magic text-2xl group-hover:text-white"></i>
              <i className="fas fa-star text-2xl group-hover:text-white"></i>
            </div>
          </motion.div>

          {/* Last Small Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-gray-900 text-white rounded-[2.5rem] p-8 flex justify-between items-center group cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            <div>
              <h3 className="text-xl font-bold mb-1">Have a vision?</h3>
              <p className="text-gray-400 text-md">
                Let's bring it to life through design.
              </p>
            </div>
            <div className="w-10 h-10 bg-[#9333ea] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Process Timeline Information */}
      <section className="py-10 md:py-24 px-4 md:px-12 max-w-[1600px] mx-auto bg-white rounded-[2.5rem] relative">
        <div className="flex flex-col md:flex-row gap-8 md:gap-32 relative z-10">
          {/* Left Column: Sticky Title */}
          <div className="md:w-1/3 md:sticky md:top-32 h-fit">
            <span className="text-xs font-bold tracking-[0.2em] text-[#9333ea] uppercase mb-3 md:mb-6 block">
              The Process
            </span>
            <h2 className="text-3xl md:text-6xl font-semibold leading-tight text-gray-900 mb-4 md:mb-8">
              Designed for <br />
              <span className="text-[#9333ea] font-serif italic">People.</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed mb-4 md:mb-6">
              Our design process is iterative, collaborative, and deeply rooted
              in understanding the people who will use your product.
            </p>
            <div className="w-20 h-1 bg-[#9333ea]"></div>
          </div>

          {/* Right Column: Steps */}
          <div className="md:w-2/3 relative pl-4">
            {/* Main Vertical Line */}
            <div className="absolute left-[39px] top-4 bottom-0 w-[2px] bg-gray-100"></div>

            <div className="space-y-6 md:space-y-12">
              {[
                {
                  step: "01",
                  title: "Discovery & Empathy",
                  desc: "We immerse ourselves in your world. Stakeholder interviews, user personas, and empathy mapping to understand the 'why'.",
                  icon: "fa-search",
                  bg: "bg-white border-2 border-[#9333ea] text-[#9333ea]",
                  tags: ["Workshops", "User Interviews", "Empathy Maps"],
                },
                {
                  step: "02",
                  title: "Structure (UX)",
                  desc: "Defining the skeleton. Information architecture, user flows, and low-fidelity wireframes to solve logic problems first.",
                  icon: "fa-sitemap",
                  bg: "bg-white border-2 border-blue-500 text-blue-500",
                  tags: ["Sitemaps", "User Flows", "Wireframes"],
                },
                {
                  step: "03",
                  title: "Visual Design (UI)",
                  desc: "Bringing it to life. Applying brand identity, typography, color, and texture to create stunning high-fidelity screens.",
                  icon: "fa-paint-brush",
                  bg: "bg-white border-2 border-pink-500 text-pink-500",
                  tags: ["High-Fidelity", "Interactive Prototype", "UI Kit"],
                },
                {
                  step: "04",
                  title: "Validation & Handoff",
                  desc: "Testing with real users and preparing pixel-perfect assets for developers to ensure the vision matches reality.",
                  icon: "fa-check-circle",
                  bg: "bg-white border-2 border-orange-500 text-orange-500",
                  tags: ["Usability Testing", "Dev Handoff", "QA"],
                },
              ].map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  key={idx}
                  className="relative pl-24 group"
                >
                  {/* Timeline Node (Centered on Line) */}
                  <div
                    className={`absolute left-0 top-0 w-20 h-20 rounded-full bg-white flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(0,0,0,0.05)]`}
                  >
                    <div
                      className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center text-xl`}
                    >
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2 block flex items-center gap-2">
                      Phase {item.step}
                      <span className="h-[1px] w-8 bg-gray-200 inline-block"></span>
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#9333ea] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed max-w-xl mb-6 text-sm">
                      {item.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, t) => (
                        <span
                          key={t}
                          className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-gray-100 group-hover:border-[#9333ea]/30 group-hover:text-[#9333ea] transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (Minimal List) */}
      <section
        className="py-8 md:py-16 bg-gray-900 text-white relative overflow-hidden rounded-[2rem] mx-2 md:mx-12 my-4 md:my-8"
        style={{
          background: `radial-gradient(circle at center, #111827 0%, #000000 100%)`,
        }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#9333ea]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="px-6 md:px-16 max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#9333ea] uppercase mb-4 block">
                Why KarmaDude?
              </span>
              <h2 className="text-3xl md:text-6xl font-semibold mb-4 md:mb-8 leading-tight">
                Design that <br />{" "}
                <span className="text-[#9333ea]">Converts.</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8 max-w-md font-light">
                We believe good design is good business. Our interfaces are
                built to drive results.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#9333ea] hover:text-white transition-all shadow-lg shadow-white/10 cursor-pointer"
              >
                Start a Project
              </button>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "Research-Backed",
                  desc: "We don't guess. We test.",
                },
                {
                  title: "Pixel Perfect",
                  desc: "Attention to detail in every corner.",
                },
                {
                  title: "Developer Friendly",
                  desc: "Clean handoffs that make coding easy.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 border-b border-gray-800 pb-8 last:border-0 hover:pl-4 transition-all duration-300"
                >
                  <span className="text-[#9333ea] text-sm font-mono">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Minimal CTA */}
      <section className="py-12 md:py-32 px-4 md:px-12 max-w-[1600px] mx-auto text-center relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-50/50 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-bold text-gray-900 mb-4 md:mb-8 tracking-tighter leading-[0.9]">
            READY TO <br className="hidden md:block" />
            <span className="text-[#9333ea]">DESIGN?</span>
          </h2>

          <p className="text-lg md:text-2xl text-gray-500 mb-6 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Let's create something beautiful together.
          </p>

          <button
            onClick={() => navigate("/quotation")}
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#0a0a0a] text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#9333ea] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 cursor-pointer"
          >
            <span className="text-sm">Let's Collaborate</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#9333ea] transition-all duration-500 rotate-[-45deg] group-hover:rotate-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
});

export default UIUX;
