import { useState } from "react";
import { motion } from "framer-motion";

const TechStack = () => {
  const categories: {
    [key: string]: { name: string; icon: string; color: string }[];
  } = {
    Frontend: [
      { name: "React JS", icon: "fab fa-react", color: "#61DAFB" },
      { name: "Angular", icon: "fab fa-angular", color: "#DD0031" },
      { name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E" },
      { name: "HTML", icon: "fab fa-html5", color: "#E34F26" },
      { name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952B3" },
      { name: "MaterialUI", icon: "fab fa-css3-alt", color: "#007FFF" },
      { name: "Tailwind CSS", icon: "fa-solid fa-wind", color: "#007FFF" },
    ],
    Backend: [
      { name: "Node.js", icon: "fab fa-node-js", color: "#68A063" },
      { name: "Python", icon: "fab fa-python", color: "#3776AB" },
      { name: "Express.js", icon: "fas fa-server", color: "#000000" },
      { name: "PHP", icon: "fab fa-php", color: "#777BB4" },
      { name: "MongoDB", icon: "fas fa-database", color: "#47A248" },
      { name: "Supabase", icon: "fas fa-cloud", color: "#3ECF8E" },
    ],
    "Mobile App": [
      { name: "Android", icon: "fab fa-android", color: "#3DDC84" },
      { name: "Flutter", icon: "fab fa-flutter", color: "#02569B" },
      { name: "iOS", icon: "fab fa-apple", color: "#A3A3A3" },
    ],
    Database: [
      { name: "MySQL", icon: "fas fa-database", color: "#00758F" },
      { name: "PostgreSQL", icon: "fas fa-database", color: "#336791" },
      { name: "MongoDb", icon: "fas fa-leaf", color: "#47A248" },
      { name: "Supabase", icon: "fas fa-cloud", color: "#3ECF8E" },
    ],
  };

  const [activeCategory, setActiveCategory] = useState("Frontend");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start">
      {/* Left Column: Title & Vertical Navigation */}
      <div className="lg:col-span-4 space-y-4 lg:space-y-8 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 top-40 bottom-10 w-0.5 bg-gradient-to-b from-blue-100 via-gray-100 to-transparent hidden lg:block"></div>

        <div className="relative lg:pl-2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border border-blue-100 shadow-sm text-blue-600 text-[10px] font-extrabold uppercase tracking-widest mb-2 md:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Our Tech Stack
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 leading-[1.1] md:leading-[1.1]"
          >
            Built with <br className="block md:hidden" />
            <span className="text-[#2f8ecd] inline md:block lg:inline ml-1 md:ml-0">
              Modern Power.
            </span>
          </motion.h2>
        </div>

        {/* Tabs - 2x2 Grid on Mobile, 4-col on Tablet, Vertical Stack on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-2.5 lg:gap-4">
          {Object.keys(categories).map((category) => {
            const icons: { [key: string]: string } = {
              Frontend: "fas fa-laptop-code",
              Backend: "fas fa-server",
              "Mobile App": "fas fa-mobile-alt",
              Database: "fas fa-database",
            };

            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-5 rounded-xl lg:rounded-2xl transition-all duration-300 flex items-center justify-start gap-2.5 lg:justify-between group relative overflow-hidden border ${isActive
                  ? "bg-white shadow-md lg:shadow-2xl shadow-blue-900/10 border-blue-500/30 z-10 scale-[1.02] ring-2 ring-blue-500/20"
                  : "bg-white/80 lg:bg-transparent border-slate-200/70 lg:border-transparent hover:bg-white lg:hover:bg-white/50 text-gray-500 lg:text-gray-400 hover:text-gray-700"
                  }`}
              >
                <div className="flex items-center gap-2 lg:gap-5 relative z-10 w-full min-w-0">
                  {/* Circle Icon Container */}
                  <div
                    className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-xs lg:text-xl transition-all duration-500 shadow-sm flex-shrink-0 ${isActive
                      ? "bg-gradient-to-tr from-blue-500 to-[#2f8ecd] text-white shadow-blue-500/30"
                      : "bg-gray-100 lg:bg-white text-gray-400 lg:text-gray-300 group-hover:text-blue-500"
                      }`}
                  >
                    <i className={icons[category] || "fas fa-code"}></i>
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span
                      className={`text-xs sm:text-sm lg:text-lg font-bold tracking-tight truncate transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-600"
                        }`}
                    >
                      {category}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-100 pointer-events-none hidden lg:block"
                    transition={{ duration: 0.3 }}
                  />
                )}

                {isActive && (
                  <motion.div
                    layoutId="activeCaret"
                    className="w-1.5 h-full absolute left-0 top-0 bottom-0 bg-[#2f8ecd] hidden lg:block"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Tech Grid in a White Canvas Container */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/30 p-5 sm:p-7 lg:p-8 relative">
          {/* Header of Right Panel */}
          <div className="relative z-10 mb-5 lg:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 pb-4 lg:pb-5 gap-3">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 to-[#2f8ecd] text-white flex items-center justify-center shadow-md shadow-blue-600/20 flex-shrink-0">
                <i className="fas fa-layer-group text-base lg:text-xl"></i>
              </div>
              <div>
                <motion.h3
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg lg:text-2xl font-bold text-gray-900"
                >
                  {activeCategory}
                </motion.h3>
                <p className="text-[10px] lg:text-xs text-gray-500 font-normal mt-0.5">
                  Enterprise Grade Frameworks
                </p>
              </div>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-600 text-[10px] lg:text-xs font-bold uppercase tracking-wider shadow-xs self-start md:self-auto">
              {categories[activeCategory].length} Technologies Used
            </div>
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-4"
          >
            {categories[activeCategory].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.04,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-3 sm:gap-3.5 lg:gap-4 p-3 sm:p-3.5 lg:p-4 rounded-xl lg:rounded-2xl bg-slate-50/70 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-200/60 transition-all duration-200 cursor-default"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-white flex items-center justify-center group-hover:shadow-md group-hover:shadow-blue-500/10 transition-all duration-300 border border-slate-200/80 relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-lg lg:rounded-xl"></div>
                  <i
                    className={`${tech.icon} text-lg lg:text-2xl transition-transform duration-300 group-hover:scale-110 relative z-10`}
                    style={{ color: tech.color }}
                  ></i>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base group-hover:text-blue-600 transition-colors leading-tight truncate">
                    {tech.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
