import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { api, ASSETS_BASE } from "../lib/apiClient";
import karmaLogo from "../assets/logo/KARMDUDE NEW.webp";

const WorkShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<any[]>([]);
  const [apiCategories, setApiCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // States & ref for mouse-drag to scroll and horizontal wheel scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setHasDragged(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // multiplier for scrolling speed
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [worksRes, categoriesRes] = await Promise.all([
          api.works.getAll(),
          api.workCategories.getAll(),
        ]);

        if (worksRes.success && worksRes.data) {
          setProducts(worksRes.data as any[]);
        }

        if (categoriesRes.success && categoriesRes.data) {
          setApiCategories(
            ((categoriesRes.data as any[]) || []).map((c: any) => c.name),
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ["All", ...apiCategories];

  const activeProducts = products.filter((p: any) => {
    if (p.sections && Array.isArray(p.sections) && p.sections.length > 0) {
      return p.sections.some((s: any) => s.active === 1);
    }
    return p.active === 1 || p.active === undefined;
  });

  const filteredProducts =
    activeCategory === "All"
      ? activeProducts
      : activeProducts.filter((p: any) => {
        if (p.sections && Array.isArray(p.sections) && p.sections.length > 0) {
          return p.sections.some((s: any) => s.category === activeCategory && s.active === 1);
        }
        return p.category === activeCategory;
      });

  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    return `${ASSETS_BASE}${url}`;
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 font-bold">
        Loading works...
      </div>
    );
  }

  return (
    <>
      {/* Minimal Float Filter */}
      <div className="top-24 z-40 mb-12 md:mb-20 pointer-events-none">
        <div className="pointer-events-auto flex justify-start">
          <motion.div
            layout
            className="w-full lg:w-fit lg:inline-flex bg-white/80 backdrop-blur-xl border border-gray-200 rounded-full shadow-lg shadow-gray-200/50 p-1.5 md:p-2 overflow-hidden"
          >
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onWheel={handleWheel}
              className="overflow-x-auto scrollbar-hide flex flex-nowrap md:flex-wrap gap-2 px-1 cursor-grab active:cursor-grabbing select-none"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={(e) => {
                    if (hasDragged) {
                      e.preventDefault();
                      return;
                    }
                    setActiveCategory(category);
                  }}
                  className={`relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-colors duration-300 whitespace-nowrap shrink-0 ${activeCategory === category
                    ? "text-white"
                    : "text-gray-500 hover:text-[#2f8ecd]"
                    }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-[#2f8ecd] rounded-full shadow-md"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3x3 Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 md:pb-40">
        <AnimatePresence>
          {filteredProducts.map((product, index) => {
            const displaySection = activeCategory === "All"
              ? (product.sections?.[0] || product)
              : (product.sections?.find((s: any) => s.category === activeCategory && s.active === 1) || product);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 col-span-1"
              >
                <div className="flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative overflow-hidden aspect-[16/10] bg-gray-50 border-b border-gray-100 flex items-center justify-center">
                    {displaySection.image_url ? (
                      <img
                        src={getFullImageUrl(displaySection.image_url)}
                        alt={product.title}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = karmaLogo;
                          target.classList.add("opacity-50");
                        }}
                        className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={karmaLogo}
                        alt="KarmaDude Logo"
                        className="w-1/2 h-1/2 object-contain opacity-50"
                      />
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#2f8ecd]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-multiply"></div>
                  </div>

                  {/* Card Details (Ultra-Subtle Soft Blue Bottom Section) */}
                  <div className="flex flex-col flex-grow p-6 sm:p-7 gap-4 bg-[#f4f8fd] border-t border-blue-100/60">
                    {/* Category Badge */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] md:text-xs font-extrabold tracking-widest text-[#2f8ecd] uppercase bg-blue-50/80 px-3.5 py-1 rounded-full border border-blue-100/80">
                        {displaySection.category || "Multiple"}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight group-hover:text-[#2f8ecd] transition-colors duration-300">
                      {product.title}
                    </h3>

                    {/* Short description */}
                    <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-2">
                      {product.description}
                    </p>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(product.tags || []).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 md:px-3 border border-gray-200/80 rounded-full text-[10px] md:text-xs text-gray-500 uppercase tracking-wide bg-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* "View Site" CTA */}
                    <a
                      href={displaySection.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100 text-xs md:text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-[#2f8ecd] transition-colors duration-300 w-full"
                    >
                      <span>View Site</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};

const Ourworks: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Subtle Background Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Swiss Editorial Hero */}
        <header className="pt-24 pb-12 md:pt-40 md:pb-24 relative overflow-hidden">
          <div className="w-full">
            {/* Top Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex justify-between items-center mb-8 md:mb-20 text-[10px] md:text-sm font-bold text-gray-500 uppercase tracking-[0.2em] border-b border-gray-100 pb-4 md:pb-6"
            >
              <span className="text-[#2f8ecd]">KarmaDude</span>
              <span className="hidden md:inline">Digital Excellence</span>
              <span>©2021</span>
            </motion.div>

            {/* Massive Typography */}
            <div className="relative">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[15vw] md:text-[13vw] leading-[0.8] font-bold text-gray-900 tracking-tighter"
              >
                our
              </motion.h1>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 md:pl-[12vw]"
              >
                <h1 className="text-[15vw] md:text-[13vw] leading-[0.8] font-serif italic font-light text-[#2f8ecd] tracking-tighter z-10">
                  WORKS
                </h1>

                <div className="mt-2 md:mt-0 md:ml-12 max-w-sm">
                  <p className="text-gray-500 text-sm md:text-lg leading-relaxed">
                    Transforming bold ideas into
                    <span className="text-[#2f8ecd] font-bold">
                      {" "}
                      functional reality
                    </span>
                    . Explore our handcrafted digital solutions.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        <WorkShowcase />

        {/* Footer CTA */}
        <section className="py-12 md:py-32 border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-light text-gray-900 mb-6 md:mb-8 tracking-tight">
              Ready to build something{" "}
              <span className="font-serif italic text-[#2f8ecd]">
                extraordinary?
              </span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-full font-bold hover:bg-blue-600 transition-colors duration-300 shadow-xl shadow-gray-200"
            >
              Start a Project
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ourworks;
