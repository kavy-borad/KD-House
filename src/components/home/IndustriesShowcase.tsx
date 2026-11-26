import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface IndustryItem {
  img: string;
  title: string;
  category: string;
  icon: string;
  desc: string;
  tags: string[];
  badgeBg: string;
  iconColor: string;
  iconBg: string;
}

const INDUSTRIES_DATA: IndustryItem[] = [
  {
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85",
    title: "Food & Beverage",
    category: "Hospitality & Food",
    icon: "fas fa-utensils",
    desc: "Digital products, ordering platforms, POS systems, and custom software built for restaurants, cafés, food brands, cloud kitchens, and hospitality groups.",
    tags: ["Cloud Kitchens", "Smart POS", "Online Ordering"],
    badgeBg: "bg-orange-50 text-orange-600 border-orange-200/80",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  {
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85",
    title: "Health & Wellness",
    category: "Healthcare & Fitness",
    icon: "fas fa-heartbeat",
    desc: "Digital solutions for dietitians, nutritionists, wellness businesses, fitness platforms, and products focused on improving health and lifestyle management.",
    tags: ["Telehealth", "Client Tracking", "Wellness Portals"],
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85",
    title: "Rental & Marketplace",
    category: "E-Commerce & Booking",
    icon: "fas fa-store",
    desc: "Rental platforms and multi-vendor marketplace solutions that help businesses list, discover, book, rent, buy, sell, and manage products or services online.",
    tags: ["Multi-Vendor", "Booking Engine", "Payments"],
    badgeBg: "bg-blue-50 text-[#2f8ecd] border-blue-200/80",
    iconColor: "text-[#2f8ecd]",
    iconBg: "bg-blue-50",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85",
    title: "CRM & ERP",
    category: "Enterprise Systems",
    icon: "fas fa-project-diagram",
    desc: "Custom CRM and ERP platforms designed to streamline customer pipelines, sales tracking, operations, inventory control, employee workflows, and reporting.",
    tags: ["Workflow Ops", "Analytics", "Team Portals"],
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200/80",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
  },
  {
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85",
    title: "POS & Inventory",
    category: "Retail & Commerce",
    icon: "fas fa-cash-register",
    desc: "Smart point-of-sale and inventory management software helping retail businesses manage billing, stock levels, orders, suppliers, and real-time analytics.",
    tags: ["Live Stock", "Fast Billing", "Multi-Store"],
    badgeBg: "bg-teal-50 text-teal-600 border-teal-200/80",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
  },
  {
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85",
    title: "AI & Automation",
    category: "Next-Gen Tech",
    icon: "fas fa-microchip",
    desc: "AI-powered products and intelligent automation solutions that eliminate manual bottlenecks, automate workflows, and unlock smarter operational decisions.",
    tags: ["LLM Agents", "Workflow AI", "Smart Ops"],
    badgeBg: "bg-rose-50 text-rose-600 border-rose-200/80",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
  },
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85",
    title: "SaaS Products",
    category: "Cloud Software",
    icon: "fas fa-cloud",
    desc: "Scalable subscription software built for modern businesses and teams, including multi-tenant architecture, billing, role access, and analytics dashboards.",
    tags: ["Multi-Tenant", "Subscriptions", "Scale Ready"],
    badgeBg: "bg-indigo-50 text-indigo-600 border-indigo-200/80",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
  },
  {
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85",
    title: "Finance & Professional Solutions",
    category: "Fintech & Services",
    icon: "fas fa-chart-line",
    desc: "Digital platforms and SaaS suites for CA firms, accountants, financial advisors, and service practices to simplify compliance, reporting, and client portals.",
    tags: ["Client Portals", "Compliance", "Reporting"],
    badgeBg: "bg-sky-50 text-sky-600 border-sky-200/80",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
  },
];

/**
 * Executive asymmetric showcase for Industries: pairs an interactive left
 * spotlight panel (featured visual, full description, scope tags, CTA) with a
 * clean numbered 2x4 selector matrix on the right.
 */
const IndustriesShowcase = () => {
  const shouldReduceMotion = !!useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = INDUSTRIES_DATA[activeIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Left: Featured Active Industry Spotlight Card */}
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <div className="rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Spotlight Visual */}
              <div className="relative h-56 sm:h-64 lg:h-60 xl:h-68 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={activeItem.img}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/15 to-transparent" />

                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border backdrop-blur-xs bg-white/95 ${activeItem.badgeBg}`}
                  >
                    {activeItem.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/65 text-white text-[11px] font-bold tracking-wider tabular-nums backdrop-blur-xs">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(INDUSTRIES_DATA.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-4 right-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/95 text-[#001F3F] flex items-center justify-center shrink-0">
                    <i className={`${activeItem.icon} ${activeItem.iconColor}`} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {activeItem.title}
                  </h3>
                </div>
              </div>

              {/* Editorial Summary & Scope Chips */}
              <div className="pt-5 px-1.5 pb-1">
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-4">
                  {activeItem.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Custom Domain Solution
                  </span>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-[#001F3F] hover:text-[#2f8ecd] transition-colors"
                  >
                    <span>Discuss Project</span>
                    <i className="fas fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Clean 2x4 Interactive Industry Directory Grid */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {INDUSTRIES_DATA.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`group text-left rounded-xl p-3 sm:p-3.5 border transition-all duration-250 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "bg-white border-[#2f8ecd] ring-2 ring-[#2f8ecd]/15"
                  : "bg-white/80 hover:bg-white border-slate-200/85 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center text-xs shrink-0 transition-transform duration-200 ${
                        isActive ? "scale-105" : "group-hover:scale-105"
                      }`}
                    >
                      <i className={item.icon} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 truncate">
                      {item.category}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-bold tabular-nums shrink-0 transition-colors ${
                      isActive ? "text-[#2f8ecd]" : "text-slate-300"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h4
                  className={`text-sm sm:text-[15px] font-bold tracking-tight leading-snug mb-1 transition-colors ${
                    isActive
                      ? "text-[#001F3F]"
                      : "text-slate-900 group-hover:text-[#2f8ecd]"
                  }`}
                >
                  {item.title}
                </h4>

                <p className="text-[11px] sm:text-xs text-slate-500 leading-snug line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default IndustriesShowcase;
