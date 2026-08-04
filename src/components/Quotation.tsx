import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/apiClient";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";

const Counter = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

const Quotation: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    clientName: "",
    companyName: "",
    email: "",
    phone: "",
    location: "",
    serviceType: "",
    projectScope: "",
    features: "",
    materials: "",
    references: "",
    budget: "",
    additionalNotes: "",
    files: [] as File[],
  });

  const chartRef = useRef<HTMLDivElement>(null);
  const satisfactionChartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Data preserved from original file
  const caseStudies = [
    {
      title: "E-commerce Platform Overhaul",
      client: "FashionForward",
      image:
        "https://public.readdy.ai/ai/img_res/f486a5daecdd7c522b4f2ac0243a6ded.jpg",
      description:
        "Redesigned and optimized the entire e-commerce platform, resulting in a 67% increase in conversion rate and 42% reduction in cart abandonment.",
      results: [
        "67% increase in conversion rate",
        "42% reduction in cart abandonment",
        "89% improvement in page load speed",
      ],
    },
    {
      title: "Integrated Marketing Campaign",
      client: "GreenTech Solutions",
      image:
        "https://public.readdy.ai/ai/img_res/448c08bb3c74917d1c60f34026bff07a.jpg",
      description:
        "Developed and executed a comprehensive digital marketing strategy across multiple channels.",
      results: [
        "156% increase in qualified leads",
        "43% growth in social media engagement",
        "28% improvement in SEO rankings",
      ],
    },
    {
      title: "Custom CRM Development",
      client: "HealthPlus Network",
      image:
        "https://public.readdy.ai/ai/img_res/3ff9e76964454685d8cec361360792e2.jpg",
      description:
        "Built a tailored CRM solution for a healthcare provider network.",
      results: [
        "35% reduction in administrative tasks",
        "62% improvement in patient communication",
        "41% increase in appointment scheduling efficiency",
      ],
    },
  ];

  const serviceImages = {
    webDev:
      "https://public.readdy.ai/ai/img_res/80ca5b11735db9d7b74da2430e6566a8.jpg",
    digitalMarketing:
      "https://public.readdy.ai/ai/img_res/6b2b0936cb748987fa78424b7e0fd48d.jpg",
    mobileApp:
      "https://public.readdy.ai/ai/img_res/c15d249c27408cd607984cd71f428988.jpg",
    consulting:
      "https://public.readdy.ai/ai/img_res/3b2f57068798860acc0fd27e26bc6339.jpg",
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };
    if (showModal) {
      document.body.classList.add("overflow-hidden");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("overflow-hidden");
      if (!isSubmitted) {
        setFormData({
          clientName: "",
          companyName: "",
          email: "",
          phone: "",
          location: "",
          serviceType: "",
          projectScope: "",
          features: "",
          materials: "",
          references: "",
          budget: "",
          additionalNotes: "",
          files: [],
        });
        setIsSubmitted(false);
      }
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const processedValue = name === "phone" ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      clientName,
      companyName,
      email,
      phone,
      location,
      serviceType,
      projectScope,
      features,
      materials,
      budget,
      additionalNotes,
    } = formData;

    try {
      const result = await api.quotations.create({
        clientName,
        companyName: companyName || null,
        email,
        phone: phone || null,
        location: location || null,
        serviceType,
        projectScope,
        features: features || null,
        materials: materials || null,
        budget: budget || null,
        additionalNotes: additionalNotes || null,
      });

      if (!result.success)
        throw new Error(result.message || "Failed to save to database");

      const messageWithDetails = `
        Basic Information:
        Client Name: ${clientName}
        Company Name: ${companyName || "N/A"}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Location: ${location || "N/A"}
  
        Project Details:
        Type of Service/Product: ${serviceType}
        Project Scope & Objectives: ${projectScope}
        Required Features/Specifications: ${features || "N/A"}
        Preferred Materials/Software: ${materials || "N/A"}
        
        Budget:
        Estimated Budget: ${budget || "N/A"}
  
        Additional Notes:
        ${additionalNotes || "N/A"}
      `;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "1c8bf4a3-2ca7-4a7d-9f4c-8da075781434",
          name: clientName,
          email: email,
          message: messageWithDetails,
          subject: "New Quotation Request with Detailed Information",
          to_email: "vatsalmodi2003@gmail.com",
        }),
      });

      const web3formsResult = await response.json();
      if (web3formsResult.success) setIsSubmitted(true);
      else throw new Error(`Web3Forms error: ${web3formsResult.message}`);
    } catch (error: any) {
      console.error("Failed to submit form:", error);
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const initChart = (
      ref: React.RefObject<HTMLDivElement | null>,
      option: any,
    ) => {
      if (ref.current) {
        const chart = echarts.init(ref.current);
        chart.setOption(option);
        const resize = () => chart.resize();
        window.addEventListener("resize", resize);
        return () => {
          chart.dispose();
          window.removeEventListener("resize", resize);
        };
      }
    };

    const cleanup1 = initChart(chartRef, {
      animation: true,
      animationDuration: 1500,
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "none" },
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderWidth: 0,
        padding: [12, 16],
        textStyle: { fontFamily: "Outfit, Inter", color: "#1e293b" },
        shadowBlur: 30,
        shadowColor: "rgba(0,0,0,0.1)",
        formatter: (params: any) => {
          let html = `<div style="font-weight:700;margin-bottom:8px;font-size:14px;color:#0f172a">${params[0].name}</div>`;
          params.forEach((p: any) => {
            const val = p.value;
            html += `<div style="display:flex;align-items:center;gap:12px;margin-top:4px">
              <div style="width:10px;height:10px;border-radius:3px;background:${p.color}"></div>
              <span style="color:#64748b;font-size:12px">${p.seriesName}:</span>
              <span style="font-weight:700;margin-left:auto;color:#0f172a">${val}%${p.seriesName === "After" ? `<span style="color:#10b981;font-size:10px;margin-left:4px">↑</span>` : ""}</span>
            </div>`;
          });
          return html;
        },
      },
      legend: {
        top: "0%",
        right: "5%",
        icon: "circle",
        itemGap: 25,
        textStyle: { color: "#64748b", fontWeight: 600, fontSize: 12 },
      },
      grid: {
        left: "3%",
        right: "10%",
        bottom: "5%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        max: 100,
        splitLine: {
          lineStyle: { color: "#f8fafc", type: "solid" },
        },
        axisLine: { show: false },
        axisLabel: { color: "#94a3b8", fontSize: 11, fontWeight: 500 },
      },
      yAxis: {
        type: "category",
        data: [
          "Website Traffic",
          "Conversion Rate",
          "Customer Retention",
          "Revenue Growth",
        ],
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#475569",
          fontSize: 13,
          fontWeight: 600,
          margin: 20,
        },
      },
      series: [
        {
          name: "Before",
          type: "bar",
          data: [25, 8, 35, 12],
          itemStyle: {
            color: "#e2e8f0",
            borderRadius: [0, 20, 20, 0],
          },
          barWidth: 14,
          emphasis: { itemStyle: { color: "#cbd5e1" } },
        },
        {
          name: "After",
          type: "bar",
          data: [89, 32, 78, 45],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#0f172a" },
              { offset: 1, color: "#2f8ecd" },
            ]),
            borderRadius: [0, 20, 20, 0],
            shadowBlur: 10,
            shadowColor: "rgba(47, 142, 205, 0.2)",
          },
          barWidth: 14,
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#1e293b" },
                { offset: 1, color: "#3ba8ee" },
              ]),
            },
          },
        },
      ],
    });

    const cleanup2 = initChart(satisfactionChartRef, {
      animation: true,
      tooltip: { trigger: "item", backgroundColor: "#fff", padding: [10, 15] },
      legend: {
        bottom: "0%",
        left: "center",
        icon: "circle",
        textStyle: { color: "#64748b" },
      },
      series: [
        {
          name: "Satisfaction",
          type: "pie",
          radius: ["50%", "70%"],
          center: ["50%", "45%"],
          itemStyle: { borderRadius: 8, borderColor: "#fff", borderWidth: 4 },
          label: { show: false },
          data: [
            {
              value: 75,
              name: "Very Satisfied",
              itemStyle: { color: "#2563eb" },
            },
            { value: 20, name: "Satisfied", itemStyle: { color: "#93c5fd" } },
            { value: 5, name: "Neutral", itemStyle: { color: "#e2e8f0" } },
          ],
        },
      ],
    });

    return () => {
      cleanup1 && cleanup1();
      cleanup2 && cleanup2();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[-10%] w-[40vw] h-[40vw] bg-slate-50/80 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-24 pb-12">
        {/* --- Hero Section --- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-center gap-12 mb-12 lg:mb-28 min-h-0 lg:min-h-[calc(100vh-8rem)]"
        >
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-blue-50 text-[#2f8ecd] font-bold text-xs uppercase tracking-widest"
            >
              <i className="fas fa-star text-[10px]" />
              <span>Premium Development Agency</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-slate-900">
              The Art of <span className="text-[#2f8ecd]">Digital</span>{" "}
              <span className="text-[#2f8ecd]">Scaling.</span>
            </h1>

            <p className="text-lg text-slate-500 max-w-xl leading-relaxed font-light border-l-4 border-blue-100 pl-6">
              Navigate the complex landscape of digital transformation with a
              partner that understands the intersection of design, technology,
              and business growth.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="cursor-pointer group flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-2xl shadow-slate-900/20 hover:shadow-slate-900/40 hover:bg-slate-800"
              >
                Get Your Estimate
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <i className="fas fa-arrow-right text-xs" />
                </span>
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center justify-between md:justify-start gap-6 md:gap-8 pt-6 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-slate-900">
                  48h
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Turnaround
                </span>
              </div>
              <div className="hidden md:block w-[1px] h-10 bg-slate-100" />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-slate-900">
                  100%
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Transparent
                </span>
              </div>
              <div className="hidden md:block w-[1px] h-10 bg-slate-100" />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-slate-900">
                  5.0
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Star Rating
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative h-[550px] hidden lg:block">
            <motion.div
              style={{ y: y1 }}
              className="absolute right-0 top-0 w-[90%] h-full rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/20 z-10 border-[6px] border-white bg-slate-100"
            >
              <img
                src="https://public.readdy.ai/ai/img_res/e40c26609e589a5e5bbf1b024815bc69.jpg"
                alt="Hero"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent mix-blend-multiply" />
            </motion.div>

            {/* Floating Elements for "Tech" vibe */}
            <motion.div
              style={{ y: y2 }}
              className="absolute left-0 bottom-32 w-2/3 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 z-20 border border-white/50"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-mono text-slate-400">
                  estimation.ts
                </span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>const vision</span>
                  <span className="text-blue-600">= "Unlimited";</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>const execution</span>
                  <span className="text-purple-600">= "Flawless";</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
                  <motion.div
                    animate={{ width: ["0%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <div className="text-right text-slate-400 pt-1">
                  Compiling success...
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-10 top-20 bg-slate-900 text-white p-4 rounded-2xl shadow-xl z-30"
            >
              <i className="fas fa-code text-2xl mb-2" />
              <div className="text-xs font-bold text-slate-400">
                Lines of Code
              </div>
              <div className="text-xl font-bold">1.2M+</div>
            </motion.div>
          </div>
        </motion.section>

        {/* --- Services Section --- */}
        <section className="mb-28">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight lg:mt-12 text-[#2f8ecd] mb-4">
              Capabilities
            </h2>
            <p className="text-xl text-slate-500 font-normal max-w-2xl">
              Comprehensive solutions tailored to accelerate your digital
              transformation.
            </p>
          </div>

          {/* Masonry-style grid with varied layouts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large Featured Card - Web Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2 lg:row-span-2 group relative h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer"
              onClick={() => navigate("/web-applications")}
            >
              <img
                src={serviceImages.webDev}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Web Development"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent group-hover:from-slate-900/90 transition-all duration-500" />

              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2f8ecd] to-blue-500 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl shadow-xl group-hover:scale-110 transition-transform">
                  <i className="fas fa-code" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 group-hover:text-[#2f8ecd] transition-colors">
                  Web Development
                </h3>
                <p className="text-white/80 text-lg mb-6 max-w-xl">
                  Scalable web applications built with modern frameworks and
                  best practices.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "TypeScript", "Next.js"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <i className="fas fa-arrow-right" />
              </div>
            </motion.div>

            {/* Compact Card - Custom Software */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[240px] rounded-[2.5rem] overflow-hidden cursor-pointer bg-gradient-to-br from-slate-900 to-slate-800 hover:from-[#2f8ecd] hover:to-blue-600 transition-all duration-500"
              onClick={() => navigate("/custom-software")}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white text-xl group-hover:bg-white group-hover:text-[#2f8ecd] transition-all">
                    <i className="fas fa-rocket" />
                  </div>
                  <span className="text-6xl font-normal text-white/10 group-hover:text-white/20 transition-colors">
                    01
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Custom Software
                  </h3>
                  <div className="flex gap-2">
                    {["SaaS", "Enterprise"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Compact Card - Mobile Apps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative h-[240px] rounded-[2.5rem] overflow-hidden cursor-pointer"
              onClick={() => navigate("/mobile-application")}
            >
              <img
                src={serviceImages.mobileApp}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Mobile Apps"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white text-lg group-hover:bg-[#2f8ecd] transition-all">
                  <i className="fas fa-mobile-alt" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Mobile Apps
                </h3>
                <p className="text-white/70 text-sm">iOS & Android</p>
              </div>
            </motion.div>

            {/* Wide Card - Consulting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-3 group relative h-auto min-h-[200px] lg:h-[200px] rounded-[2.5rem] overflow-hidden cursor-pointer bg-white border-2 border-slate-100 hover:border-[#2f8ecd]/30 transition-all duration-500"
              onClick={() => navigate("/product-engineering")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:px-10 py-6 md:py-0 gap-6 md:gap-0">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#2f8ecd] to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl md:text-3xl shadow-lg group-hover:scale-110 transition-transform shrink-0">
                    <i className="fas fa-lightbulb" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-slate-900 mb-1 md:mb-2 group-hover:text-[#2f8ecd] transition-colors">
                      Strategic Consulting
                    </h3>
                    <p className="text-slate-600 text-sm md:text-lg">
                      Technology audits, architecture design, and digital
                      transformation roadmaps
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex gap-3">
                  {["Strategy", "Audit", "Scale"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-bold group-hover:bg-[#2f8ecd] group-hover:text-white transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center group-hover:border-[#2f8ecd] group-hover:text-[#2f8ecd] group-hover:bg-[#2f8ecd]/10 transition-all shrink-0 self-end md:self-auto">
                  <i className="fas fa-arrow-right" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Process Section (Timeline Flow) --- */}
        <section className="mb-28 relative">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Our <span className="text-[#2f8ecd]">Process</span>
            </h2>
            <p className="text-xl text-slate-500 font-normal max-w-2xl">
              A methodical approach to transforming ideas into exceptional
              digital products.
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Animated Vertical connecting line with glow */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#2f8ecd] via-blue-300 to-slate-200 shadow-lg shadow-[#2f8ecd]/20" />

            {/* Subtle background glow */}
            <div className="absolute left-1/2 top-0 bottom-0 w-32 bg-gradient-to-b from-[#2f8ecd]/5 to-transparent blur-3xl -translate-x-1/2 pointer-events-none" />

            <div className="space-y-20">
              {[
                {
                  id: "01",
                  title: "Discovery & Research",
                  desc: "We immerse ourselves in your business context, conducting stakeholder interviews, competitive analysis, and user research to uncover opportunities and constraints.",
                  icon: "fa-lightbulb",
                  align: "left",
                },
                {
                  id: "02",
                  title: "Strategic Planning",
                  desc: "Crafting a comprehensive roadmap with technology selection, architecture design, sprint planning, and clear success metrics aligned with your business goals.",
                  icon: "fa-chess",
                  align: "right",
                },
                {
                  id: "03",
                  title: "Design & Development",
                  desc: "Iterative creation cycles combining UX/UI design with agile development, ensuring continuous feedback loops and quality assurance at every stage.",
                  icon: "fa-laptop-code",
                  align: "left",
                },
                {
                  id: "04",
                  title: "Launch & Optimize",
                  desc: "Seamless deployment with performance monitoring, user feedback integration, and continuous optimization to ensure long-term success and scalability.",
                  icon: "fa-rocket",
                  align: "right",
                },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: step.align === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.2,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  className={`relative flex ${step.align === "right" ? "justify-end" : ""}`}
                >
                  {/* Animated Timeline dot with pulse */}
                  <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10">
                    <div className="w-7 h-7 rounded-full bg-[#2f8ecd] border-4 border-white shadow-xl" />
                    <div className="absolute inset-0 w-7 h-7 rounded-full bg-[#2f8ecd] animate-ping opacity-20" />
                  </div>

                  {/* Content card with glassmorphism */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`w-[45%] bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-slate-200/60 hover:shadow-[#2f8ecd]/20 hover:border-[#2f8ecd]/40 transition-all duration-500 group relative overflow-hidden ${
                      step.align === "right" ? "ml-auto" : ""
                    }`}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2f8ecd]/0 to-blue-50/0 group-hover:from-[#2f8ecd]/5 group-hover:to-blue-50/10 transition-all duration-500 pointer-events-none rounded-3xl" />

                    <div className="relative z-10">
                      <div className="flex items-start gap-6 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2f8ecd] to-blue-500 flex items-center justify-center text-white text-2xl shadow-xl group-hover:shadow-2xl group-hover:shadow-[#2f8ecd]/40 group-hover:scale-110 transition-all duration-300">
                          <i className={`fas ${step.icon}`} />
                        </div>
                        <span className="text-7xl font-normal text-slate-100 group-hover:text-[#2f8ecd]/20 transition-colors duration-500">
                          {step.id}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#2f8ecd] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <div className="h-[2px] w-16 bg-gradient-to-r from-[#2f8ecd] to-blue-400 mb-4 group-hover:w-24 transition-all duration-300" />
                      <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Stack */}
          <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-6">
            {[
              {
                id: "01",
                title: "Discovery & Research",
                desc: "We immerse ourselves in your business context, conducting stakeholder interviews and competitive analysis.",
                icon: "fa-lightbulb",
              },
              {
                id: "02",
                title: "Strategic Planning",
                desc: "Crafting a comprehensive roadmap with technology selection and clear success metrics.",
                icon: "fa-chess",
              },
              {
                id: "03",
                title: "Design & Development",
                desc: "Iterative creation cycles combining UX/UI design with agile development practices.",
                icon: "fa-laptop-code",
              },
              {
                id: "04",
                title: "Launch & Optimize",
                desc: "Seamless deployment with performance monitoring and continuous optimization.",
                icon: "fa-rocket",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100 flex flex-col h-full"
              >
                <div className="flex items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2f8ecd] to-blue-400 flex items-center justify-center text-white text-base sm:text-xl shadow-lg shrink-0">
                    <i className={`fas ${step.icon}`} />
                  </div>
                  <span className="text-3xl sm:text-5xl font-normal text-slate-100 leading-none">
                    {step.id}
                  </span>
                </div>
                <h3 className="text-sm sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-[11px] sm:text-base flex-grow">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Impact by Numbers Section --- */}
        <section className="mb-32 relative">
          {/* Enhanced Background Elements */}
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#2f8ecd]/10 rounded-full blur-[120px] -z-10 animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />

          {/* Geometric Accents */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#2f8ecd] rounded-full opacity-20" />
          <div className="absolute top-40 left-20 w-1 h-1 bg-[#2f8ecd] rounded-full opacity-40" />
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-[#2f8ecd] rounded-full opacity-10" />

          <div className="mb-16 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-[#2f8ecd] text-xs font-bold uppercase tracking-[0.2em]"
            >
              <span className="w-2 h-2 bg-[#2f8ecd] rounded-full animate-ping" />
              Proven Results
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              Impact by{" "}
              <span className="text-[#2f8ecd] font-serif italic font-normal">
                Numbers
              </span>
            </h2>
            <p className="text-xl text-slate-500 font-normal max-w-2xl leading-relaxed">
              We don't just build software; we drive business growth. Our
              data-backed results prove the value we deliver to every partner.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Side - Key Metrics */}
            <div className="lg:col-span-5 space-y-8">
              {/* Main Metric Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-10 overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-2"
              >
                {/* Mesh Gradient Background */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#2f8ecd]/40 via-transparent to-transparent opacity-50" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#2f8ecd]/20 rounded-full blur-3xl group-hover:bg-[#2f8ecd]/40 transition-colors duration-700" />

                <div className="relative z-10">
                  <i className="fas fa-rocket text-2xl sm:text-4xl text-white mb-4 sm:mb-8 block group-hover:rotate-[10deg] transition-all duration-500" />
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl sm:text-7xl font-bold text-white tracking-tighter uppercase group-hover:text-[#2f8ecd] transition-colors">
                      <Counter value={150} suffix="+" />
                    </span>
                  </div>
                  <div className="text-white/80 text-xl font-bold mb-3 sm:mb-6">
                    Successful Projects
                  </div>
                  <div className="h-[1px] w-full bg-white/10 mb-4 sm:mb-6" />
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-check-circle text-[#2f8ecd]" /> Web
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-check-circle text-[#2f8ecd]" />{" "}
                      Mobile
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-check-circle text-[#2f8ecd]" /> AI
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Smaller Metrics Grid */}
              <div className="grid grid-cols-2 gap-3.5 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#2f8ecd]/20 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="text-3xl sm:text-5xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-[#2f8ecd] transition-colors">
                      <Counter value={98} suffix="%" />
                    </div>
                    <div className="text-slate-500 text-[10px] sm:text-sm font-bold uppercase tracking-wide sm:tracking-widest">
                      Satisfaction
                    </div>
                    <div className="mt-3 sm:mt-4 w-12 h-1 bg-[#2f8ecd]/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "98%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-[#2f8ecd]"
                      />
                    </div>
                  </div>
                  {/* Subtle background icon */}
                  <i className="fas fa-heart absolute -bottom-4 -right-4 text-slate-50 text-6xl group-hover:text-[#2f8ecd]/5 transition-colors" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-[#2f8ecd] rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 shadow-xl shadow-[#2f8ecd]/20 group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="text-3xl sm:text-5xl font-bold text-white mb-2 sm:mb-3 tracking-tighter">
                      <Counter value={3} suffix=".5x" />
                    </div>
                    <div className="text-white/80 text-[10px] sm:text-sm font-bold uppercase tracking-wide sm:tracking-widest">
                      Performance
                    </div>
                  </div>
                  <i className="fas fa-chart-line absolute top-8 right-8 text-white/10 text-4xl group-hover:scale-125 transition-transform" />
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                </motion.div>
              </div>

              {/* Efficiency Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-slate-50 border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 relative overflow-hidden group hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2f8ecd]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl sm:text-4xl font-bold text-slate-900 leading-none">
                        <Counter value={45} suffix="%" />
                      </span>
                      <span className="text-[#2f8ecd] bg-[#2f8ecd]/10 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        Optimized
                      </span>
                    </div>
                    <div className="text-slate-700 text-sm sm:text-base font-bold">
                      Faster Time-to-Market
                    </div>
                    <p className="text-slate-400 text-[10px] sm:text-xs mt-1">
                      Accelerated development via our proprietary SDKs
                    </p>
                  </div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-[#2f8ecd] text-xl sm:text-2xl group-hover:scale-110 group-hover:bg-[#2f8ecd] group-hover:text-white transition-all duration-500">
                    <i className="fas fa-bolt" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Analytics Dashboard */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="flex-1 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-10 gap-4 md:gap-0">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Performance Growth
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      Average metric improvement across all clients
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 shadow-sm flex items-center justify-center overflow-hidden hover:z-10 hover:scale-110 transition-transform"
                        >
                          <img
                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                            alt="user"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="h-8 w-[1px] bg-slate-100 hidden sm:block mx-2" />
                    <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-green-500 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      LIVE METRICS
                    </div>
                  </div>
                </div>

                <div className="relative h-[300px] w-full">
                  <div ref={chartRef} className="w-full h-full" />
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-50 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2f8ecd] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-slate-900 italic">
                      User Happiness
                    </h3>
                    <div className="px-2 py-1 rounded bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-tighter border border-green-100">
                      ATH
                    </div>
                  </div>
                  <div
                    ref={satisfactionChartRef}
                    className="w-full h-[180px]"
                  />
                </motion.div>

                <div className="bg-slate-900 rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-full blur-2xl" />

                  <div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                      Current Trajectory
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 leading-none">
                      Exponential <br />{" "}
                      <span className="text-[#2f8ecd]">Growth</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex gap-1 items-end h-12">
                      {[40, 70, 45, 90, 65, 100].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="w-2 bg-[#2f8ecd]/50 rounded-full"
                        />
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">+248%</div>
                      <div className="text-green-500 text-[10px] font-bold">
                        YEAR OVER YEAR
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Success Stories --- */}
        <section className="mb-28">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest">
                Case Studies
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                Success Stories
              </h2>
            </div>
            <div className="hidden md:block text-slate-400 text-sm">
              Selected Works 2023-24
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, idx) => (
              <motion.div
                key={idx}
                initial="initial"
                whileHover="hover"
                variants={{
                  initial: { opacity: 0, y: 20 },
                  hover: { y: -5 },
                }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate("/our-works")}
                className={`group relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl ${
                  idx === 0
                    ? "lg:row-span-2 h-[500px] lg:h-[732px]"
                    : "h-[350px]"
                }`}
              >
                {/* Background Image with Parallax-like effect */}
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    hover: { scale: 1.1 },
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"
                    variants={{
                      hover: { backgroundColor: "rgba(15, 23, 42, 0.9)" },
                    }}
                  />
                </motion.div>

                {/* Content Container */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end ${
                    idx === 0 ? "p-6 sm:p-10" : "p-4 sm:p-6"
                  }`}
                >
                  <motion.div
                    variants={{
                      hover: { y: idx === 0 ? -10 : 0 },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Client Badge */}
                    <div className="mb-3 sm:mb-5">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                        {study.client}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-bold text-white mb-2 sm:mb-4 leading-tight tracking-tight ${
                        idx === 0 ? "text-2xl sm:text-4xl md:text-5xl" : "text-lg sm:text-2xl"
                      }`}
                    >
                      {study.title}
                    </h3>

                    {/* Revealable Content */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      variants={{
                        hover: { height: "auto", opacity: 1 },
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-base text-white/70 leading-relaxed mb-4 sm:mb-6 font-normal">
                        {study.description}
                      </p>

                      <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                        {study.results.map((res, i) => (
                          <motion.li
                            key={i}
                            variants={{
                              initial: { x: -20, opacity: 0 },
                              hover: { x: 0, opacity: 1 },
                            }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="text-xs sm:text-sm text-white/90 flex items-center gap-2 sm:gap-3"
                          >
                            <div className="w-1.5 h-1.5 bg-[#2f8ecd] rounded-full shadow-[0_0_10px_rgba(47,142,205,0.8)]" />
                            {res}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                      onClick={() => navigate("/our-works")}
                      className="flex items-center gap-3 text-[#2f8ecd] font-bold text-sm uppercase tracking-widest"
                      variants={{
                        initial: { opacity: 0.6 },
                        hover: { opacity: 1, gap: 20 },
                      }}
                    >
                      Explore Project
                      <i className="fas fa-arrow-right" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Aesthetic Corner Tag */}
                <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-[#2f8ecd] transition-all duration-500">
                  <i className="fas fa-external-link-alt text-xs sm:text-base" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Side - Header */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#2f8ecd]/10 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-widest">
                    FAQ
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                    Common <span className="text-[#2f8ecd]">Questions</span>
                  </h2>
                  <p className="text-xl text-slate-500 font-normal mb-8">
                    Everything you need to know about working with us.
                  </p>

                  {/* Decorative Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-12">
                    <div className="bg-gradient-to-br from-[#2f8ecd] to-blue-600 rounded-2xl p-6 text-white">
                      <div className="text-3xl font-bold mb-1">24/7</div>
                      <div className="text-sm text-white/80">
                        Support Available
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded-2xl p-6 text-white">
                      <div className="text-3xl font-bold mb-1">100%</div>
                      <div className="text-sm text-white/80">Transparency</div>
                    </div>
                  </div>

                  {/* Contact CTA */}
                  <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-slate-600 text-sm mb-3">
                      Still have questions?
                    </p>
                    <button className="text-[#2f8ecd] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                      Get in touch
                      <i className="fas fa-arrow-right text-xs" />
                    </button>
                  </div>

                  {/* Decorative Illustration - Premium Aesthetic */}
                  <div className="mt-8 relative h-96 lg:h-[500px] rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden shadow-2xl group">
                    {/* Animated background patterns */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#2f8ecd_1px,_transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    {/* Gradient Orbs for Depth */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2f8ecd]/30 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px]" />

                    {/* 3D Card Stack Container */}
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <div className="relative w-full max-w-sm aspect-video">
                        {/* Shadow/Glow card */}
                        <div className="absolute inset-0 bg-[#2f8ecd]/40 blur-3xl rounded-3xl transform translate-y-12 scale-90" />

                        {/* Background Cards */}
                        <motion.div
                          animate={{ rotate: 12, x: 20, y: 10 }}
                          className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl"
                        />
                        <motion.div
                          animate={{ rotate: -8, x: -15, y: -5 }}
                          className="absolute inset-0 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl"
                        />

                        {/* Main Featured Card */}
                        <motion.div
                          whileHover={{ y: -10, scale: 1.02 }}
                          className="relative inset-0 bg-white rounded-3xl p-8 shadow-2xl flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2f8ecd] to-blue-600 flex items-center justify-center text-white text-2xl shadow-xl">
                              <i className="fas fa-headset" />
                            </div>
                            <div className="px-3 py-1 rounded-full bg-blue-50 text-[#2f8ecd] text-[10px] font-bold uppercase tracking-wider">
                              Always Online
                            </div>
                          </div>

                          <div>
                            <div className="h-3 w-32 bg-slate-100 rounded-full mb-3" />
                            <div className="space-y-2">
                              <div className="h-2 w-full bg-slate-50 rounded-full" />
                              <div className="h-2 w-5/6 bg-slate-50 rounded-full" />
                              <div className="h-2 w-4/6 bg-slate-50 rounded-full" />
                            </div>
                          </div>

                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className={`w-8 h-8 rounded-full border-2 border-white bg-slate-${i * 100 + 100}`}
                              />
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#2f8ecd] flex items-center justify-center text-[10px] text-white font-bold">
                              +
                            </div>
                          </div>
                        </motion.div>

                        {/* Floating elements attached to card */}
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-4 flex items-center justify-center">
                          <i className="fas fa-bolt text-[#2f8ecd] text-2xl" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 px-4 py-2 bg-slate-900 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-800">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap">
                            Expert Support Team
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 p-8">
                      <div className="w-24 h-[1px] bg-gradient-to-l from-white/40 to-transparent" />
                      <div className="w-[1px] h-24 bg-gradient-to-b from-white/40 to-transparent ml-auto mt-[-1px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - FAQ Items */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  q: "Who can you help?",
                  a: "We work with startups, SMEs, and enterprise clients seeking digital transformation. Whether you're launching your first product or scaling an existing platform, our team adapts to your specific needs and challenges.",
                  icon: "fa-users",
                },
                {
                  q: "What are typical timeline expectations?",
                  a: "Project timelines vary based on scope and complexity. Standard web applications typically take 4-8 weeks, while enterprise solutions may require 12-16 weeks. We provide detailed roadmaps during discovery phase.",
                  icon: "fa-clock",
                },
                {
                  q: "Do you offer ongoing support?",
                  a: "Yes, we provide comprehensive monthly maintenance packages including bug fixes, security updates, performance monitoring, and feature enhancements. Our support ensures your product stays current and competitive.",
                  icon: "fa-headset",
                },
                {
                  q: "How does your agile methodology work?",
                  a: "We use sprint-based delivery with 2-week cycles, ensuring regular feedback and transparency. You'll have access to our project management tools, participate in sprint reviews, and maintain full visibility throughout development.",
                  icon: "fa-sync",
                },
                {
                  q: "What technologies do you specialize in?",
                  a: "Our stack includes React, Next.js, Node.js, TypeScript, and modern cloud platforms (AWS, Azure, GCP). We select technologies based on your specific requirements, scalability needs, and long-term maintainability.",
                  icon: "fa-code",
                },
                {
                  q: "How do you handle project pricing?",
                  a: "We offer both fixed-price and time-and-materials models. After initial discovery, we provide detailed estimates with clear milestones. Our transparent pricing ensures no hidden costs or surprises.",
                  icon: "fa-dollar-sign",
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-[#2f8ecd]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-[#2f8ecd] text-slate-400 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-300">
                      <i className={`fas ${faq.icon} text-lg`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#2f8ecd] transition-colors">
                        {faq.q}
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {faq.a}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <i className="fas fa-chevron-right text-[#2f8ecd] text-sm" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- New Call to Action Section --- */}
        <section className="mb-12">
          <div className="relative w-full bg-slate-900 rounded-[2.5rem] overflow-hidden px-8 py-16 md:px-16 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl shadow-slate-900/20">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#2f8ecd] rounded-full blur-[120px]" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-2xl space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.2]">
                Transform Your Business with Smart Digital Strategy,{" "}
                <span className="text-[#2f8ecd]">The Future Starts Now.</span>
              </h2>
              <p className="text-slate-300 text-lg md:text-xl font-light max-w-lg">
                Let's discuss how we can help you achieve your goals with our
                premium digital solutions.
              </p>
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/onboarding")}
                  className="cursor-pointer group flex items-center gap-3 bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl shadow-white/5"
                >
                  Get Started
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <i className="fas fa-arrow-right text-xs" />
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Right Side Abstract Graphics */}
            <div className="relative z-10 flex-shrink-0 hidden md:block">
              <div className="relative w-64 h-64 opacity-90">
                {/* Code Icon */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 animate-float">
                  <i className="fas fa-code text-4xl text-[#2f8ecd]" />
                </div>

                {/* Graph Icon */}
                <div
                  className="absolute bottom-0 left-4 w-20 h-20 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <i className="fas fa-chart-line text-3xl text-emerald-400" />
                </div>

                {/* Mobile Icon */}
                <div
                  className="absolute bottom-12 right-8 w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <i className="fas fa-mobile-alt text-2xl text-purple-400" />
                </div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                  <line
                    x1="70%"
                    y1="30%"
                    x2="30%"
                    y2="80%"
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1="30%"
                    y1="80%"
                    x2="70%"
                    y2="70%"
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- Premium Enterprise SaaS Modal --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] z-[200] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[93vw] max-w-[660px] max-h-[90vh] h-fit rounded-[24px] border border-[#EEF2F7] shadow-[0_24px_60px_rgba(15,23,42,0.12)] p-6 sm:p-8 relative overflow-hidden flex flex-col my-auto"
            >
              {/* Minimal Circular Close Button */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 transition-all duration-200 flex items-center justify-center outline-none focus:ring-2 focus:ring-[#2f8ecd]/30"
              >
                <i className="fas fa-times text-sm" />
              </button>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mb-5 border border-emerald-100">
                    <i className="fas fa-check" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    Request Received
                  </h2>
                  <p className="text-slate-500 text-base mb-8 max-w-md leading-relaxed">
                    Thank you! We've received your project details and our team will review them and reach out within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setShowModal(false);
                    }}
                    className="h-[48px] sm:h-[52px] px-8 bg-[#2f8ecd] hover:bg-[#2576ad] text-white font-semibold rounded-xl shadow-md shadow-[#2f8ecd]/20 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200 cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <div className="flex flex-col h-full overflow-hidden">
                  {/* Modal Header */}
                  <div className="pr-10 mb-5">
                    <h2
                      id="modal-title"
                      className="text-[26px] md:text-[34px] font-bold text-slate-900 leading-tight tracking-tight"
                    >
                      Project Details
                    </h2>
                    <p
                      id="modal-desc"
                      className="text-[14px] md:text-[16px] text-slate-500 font-normal leading-relaxed mt-1.5"
                    >
                      Tell us about your project and we'll contact you within one business day.
                    </p>
                  </div>

                  {/* Scrollable Form Body */}
                  <form
                    onSubmit={handleSubmit}
                    className="flex-1 overflow-y-auto pr-1.5 -mr-1.5 space-y-4 custom-scrollbar pb-6"
                  >
                    {/* Row 1: Your name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label
                          htmlFor="clientName"
                          className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                        >
                          Your name
                        </label>
                        <input
                          id="clientName"
                          type="text"
                          name="clientName"
                          value={formData.clientName}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                          className="w-full h-[48px] sm:h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="companyName"
                          className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                        >
                          Company
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          placeholder="Acme Inc."
                          className="w-full h-[48px] sm:h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email address & Phone number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                        >
                          Email address
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@example.com"
                          className="w-full h-[48px] sm:h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                        >
                          Phone number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+1 (555) 000-0000"
                          className="w-full h-[48px] sm:h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                    </div>

                    {/* Row 3: Service type */}
                    <div>
                      <label
                        htmlFor="serviceType"
                        className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                      >
                        Service type
                      </label>
                      <input
                        id="serviceType"
                        type="text"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Web Development"
                        className="w-full h-[48px] sm:h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                      />
                    </div>

                    {/* Row 4: Project scope */}
                    <div>
                      <label
                        htmlFor="projectScope"
                        className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                      >
                        Project scope
                      </label>
                      <textarea
                        id="projectScope"
                        name="projectScope"
                        value={formData.projectScope}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="Tell us about your vision..."
                        className="w-full min-h-[120px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none resize-y shadow-none"
                      />
                    </div>

                    {/* Optional additional details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
                      <div>
                        <label
                          htmlFor="features"
                          className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                        >
                          Specific features
                        </label>
                        <input
                          id="features"
                          type="text"
                          name="features"
                          value={formData.features}
                          onChange={handleInputChange}
                          placeholder="Login system, Payment gateway..."
                          className="w-full h-[48px] sm:h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="materials"
                          className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                        >
                          Preferred tech stack
                        </label>
                        <input
                          id="materials"
                          type="text"
                          name="materials"
                          value={formData.materials}
                          onChange={handleInputChange}
                          placeholder="React, Node.js, etc."
                          className="w-full h-[48px] sm:h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label
                          htmlFor="budget"
                          className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                        >
                          Estimated budget
                        </label>
                        <input
                          id="budget"
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          placeholder="$5,000"
                          className="w-full h-[48px] sm:h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="location"
                          className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                        >
                          Location
                        </label>
                        <input
                          id="location"
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="New York, NY"
                          className="w-full h-[48px] sm:h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="additionalNotes"
                        className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5"
                      >
                        Additional notes
                      </label>
                      <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="Any other details..."
                        className="w-full min-h-[80px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none resize-y shadow-none"
                      />
                    </div>

                    {/* Buttons: Cancel & Primary */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="w-full sm:w-auto h-[48px] sm:h-[52px] px-6 rounded-xl text-slate-500 hover:text-slate-800 font-medium hover:bg-slate-100/70 transition-all duration-200 cursor-pointer flex items-center justify-center text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto h-[48px] sm:h-[52px] px-8 rounded-xl bg-[#2f8ecd] hover:bg-[#2576ad] text-white font-semibold shadow-md shadow-[#2f8ecd]/20 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center text-sm sm:text-base"
                      >
                        Submit Project
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quotation;
