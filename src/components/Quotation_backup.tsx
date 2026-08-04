import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/apiClient";

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

  const heroImage =
    "https://public.readdy.ai/ai/img_res/e40c26609e589a5e5bbf1b024815bc69.jpg";
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

  const processSteps = [
    {
      icon: "fas fa-comments",
      title: "Discovery",
      description: "We begin with a thorough consultation.",
    },
    {
      icon: "fas fa-sitemap",
      title: "Strategy",
      description: "Our team develops a comprehensive strategy.",
    },
    {
      icon: "fas fa-code",
      title: "Development",
      description: "We bring your vision to life.",
    },
    {
      icon: "fas fa-rocket",
      title: "Launch",
      description: "We ensure a smooth deployment.",
    },
    {
      icon: "fas fa-chart-line",
      title: "Growth",
      description: "We continuously optimize your solution.",
    },
  ];

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      setIsSubmitted(false);
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
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // For phone field, only allow digits
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
      // Insert form data into API
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

      if (!result.success) {
        throw new Error(result.message || "Failed to save to database");
      }

      // Web3Forms submission (retained from original code)
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

      const web3formsData = {
        access_key: "1c8bf4a3-2ca7-4a7d-9f4c-8da075781434",
        name: clientName,
        email: email,
        message: messageWithDetails,
        subject: "New Quotation Request with Detailed Information",
        to_email: "vatsalmodi2003@gmail.com",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(web3formsData),
      });

      const web3formsResult = await response.json();

      if (web3formsResult.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(`Web3Forms error: ${web3formsResult.message}`);
      }
    } catch (error: any) {
      console.error("Failed to submit form:", error);
      alert(
        `There was an error submitting your request: ${error.message}. Please try again later.`,
      );
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        animation: false,
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        legend: { data: ["Before", "After"] },
        grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
        xAxis: { type: "value", boundaryGap: [0, 0.01] },
        yAxis: {
          type: "category",
          data: [
            "Website Traffic",
            "Conversion Rate",
            "Customer Retention",
            "Revenue Growth",
          ],
        },
        series: [
          {
            name: "Before",
            type: "bar",
            data: [25, 8, 35, 12],
            itemStyle: { color: "#CBD5E1" },
          },
          {
            name: "After",
            type: "bar",
            data: [89, 32, 78, 45],
            itemStyle: { color: "#000000" },
          },
        ],
      };
      chart.setOption(option);
      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (satisfactionChartRef.current) {
      const chart = echarts.init(satisfactionChartRef.current);
      const option = {
        animation: false,
        tooltip: { trigger: "item" },
        legend: { top: "5%", left: "center" },
        series: [
          {
            name: "Client Satisfaction",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: { show: false, position: "center" },
            emphasis: {
              label: { show: true, fontSize: 16, fontWeight: "bold" },
            },
            labelLine: { show: false },
            data: [
              {
                value: 75,
                name: "Very Satisfied",
                itemStyle: { color: "#000000" },
              },
              { value: 20, name: "Satisfied", itemStyle: { color: "#4B5563" } },
              { value: 5, name: "Neutral", itemStyle: { color: "#9CA3AF" } },
              {
                value: 0,
                name: "Dissatisfied",
                itemStyle: { color: "#E5E7EB" },
              },
            ],
          },
        ],
      };
      chart.setOption(option);
      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 py-12 mt-18">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-32 mt-12 gap-12">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-fadeInLeft">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg">
                Professional IT Solutions
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
              Transform Your Business with Our IT Solutions
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
              Comprehensive digital solutions tailored to your business needs.
              We deliver excellence through innovation, expertise, and
              dedication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="group relative !rounded-button bg-blue-600 text-white px-10 py-4 text-lg font-bold hover:bg-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span className="relative z-10">Get Custom Quote</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
            <div className="mt-8 flex items-center flex-wrap gap-6">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <span className="ml-2 text-gray-800 font-semibold">4.9/5</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-md border border-gray-200">
                  <i className="fab fa-google text-gray-600 mr-1"></i>
                  <span className="text-gray-700 text-sm font-medium">
                    Google
                  </span>
                </div>
                <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-md border border-gray-200">
                  <i className="fab fa-trustpilot text-gray-600 mr-1"></i>
                  <span className="text-gray-700 text-sm font-medium">
                    Trustpilot
                  </span>
                </div>
                <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-md border border-gray-200">
                  <i className="fab fa-yelp text-gray-600 mr-1"></i>
                  <span className="text-gray-700 text-sm font-medium">
                    Yelp
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative animate-fadeInRight">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-2xl opacity-10"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-200">
                <img
                  src={heroImage}
                  alt="IT Solutions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <i className="fas fa-chart-line text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Client Success
                  </p>
                  <p className="font-bold text-2xl text-blue-600">+85%</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-8 -right-8 bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <i className="fas fa-rocket text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Projects Completed
                  </p>
                  <p className="font-bold text-2xl text-gray-800">500+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div id="services" className="mb-32 scroll-mt-20">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg mb-4">
              OUR SERVICES
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Comprehensive IT Solutions
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
              We offer a wide range of digital services designed to elevate your
              business to new heights with cutting-edge technology and
              innovative solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-code text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold mt-2 mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  Web Development
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Custom web solutions that drive business growth and deliver
                  exceptional user experiences across all devices.
                </p>
                <img
                  src={serviceImages.webDev}
                  alt="Web Development"
                  className="w-full h-56 object-cover rounded-xl mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm text-blue-700 font-medium shadow-sm">
                    Responsive Design
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm text-blue-700 font-medium shadow-sm">
                    E-commerce
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm text-blue-700 font-medium shadow-sm">
                    CMS
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm text-blue-700 font-medium shadow-sm">
                    Web Apps
                  </span>
                </div>
                <button
                  onClick={() => navigate("/web-applications")}
                  className="group/btn inline-flex items-center text-blue-600 font-semibold hover:text-purple-600 transition-colors cursor-pointer"
                >
                  Learn More
                  <i className="fas fa-arrow-right ml-2 group-hover/btn:translate-x-2 transition-transform duration-300"></i>
                </button>
              </div>
            </div>
            <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-cogs text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold mt-2 mb-4 text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  Custom Software Engineering
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Strategic digital marketing solutions that amplify your brand
                  and drive measurable results.
                </p>
                <img
                  src={serviceImages.digitalMarketing}
                  alt="Digital Marketing"
                  className="w-full h-56 object-cover rounded-xl mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full text-sm text-green-700 font-medium shadow-sm">
                    SEO
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full text-sm text-green-700 font-medium shadow-sm">
                    PPC
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full text-sm text-green-700 font-medium shadow-sm">
                    Social Media
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full text-sm text-green-700 font-medium shadow-sm">
                    Content Marketing
                  </span>
                </div>
                <button
                  onClick={() => navigate("/custom-software")}
                  className="group/btn inline-flex items-center text-green-600 font-semibold hover:text-teal-600 transition-colors cursor-pointer"
                >
                  Learn More
                  <i className="fas fa-arrow-right ml-2 group-hover/btn:translate-x-2 transition-transform duration-300"></i>
                </button>
              </div>
            </div>
            <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-mobile-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold mt-2 mb-4 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  Mobile App Development
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Innovative mobile applications that engage users and deliver
                  seamless experiences on iOS and Android.
                </p>
                <img
                  src={serviceImages.mobileApp}
                  alt="Mobile App Development"
                  className="w-full h-56 object-cover rounded-xl mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm text-purple-700 font-medium shadow-sm">
                    iOS
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm text-purple-700 font-medium shadow-sm">
                    Android
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm text-purple-700 font-medium shadow-sm">
                    Cross-Platform
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm text-purple-700 font-medium shadow-sm">
                    UX/UI Design
                  </span>
                </div>
                <button
                  onClick={() => navigate("/mobile-application")}
                  className="group/btn inline-flex items-center text-purple-600 font-semibold hover:text-pink-600 transition-colors cursor-pointer"
                >
                  Learn More
                  <i className="fas fa-arrow-right ml-2 group-hover/btn:translate-x-2 transition-transform duration-300"></i>
                </button>
              </div>
            </div>
            <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-lightbulb text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold mt-2 mb-4 text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  Product Engineering
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Expert guidance for digital transformation that positions your
                  business for long-term success.
                </p>
                <img
                  src={serviceImages.consulting}
                  alt="IT Consulting"
                  className="w-full h-56 object-cover rounded-xl mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-sm text-orange-700 font-medium shadow-sm">
                    Strategy
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-sm text-orange-700 font-medium shadow-sm">
                    Digital Transformation
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-sm text-orange-700 font-medium shadow-sm">
                    IT Infrastructure
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-sm text-orange-700 font-medium shadow-sm">
                    Cloud Solutions
                  </span>
                </div>
                <button
                  onClick={() => navigate("/product-engineering")}
                  className="group/btn inline-flex items-center text-orange-600 font-semibold hover:text-red-600 transition-colors cursor-pointer"
                >
                  Learn More
                  <i className="fas fa-arrow-right ml-2 group-hover/btn:translate-x-2 transition-transform duration-300"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div id="process" className="mb-32 scroll-mt-20">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg mb-4">
              OUR PROCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              How We Work
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
              Our proven methodology ensures success at every stage of your
              digital transformation journey.
            </p>
          </div>
          <div className="relative flex flex-col md:flex-row justify-between items-start gap-6">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center mb-8 md:mb-0 w-full md:w-1/5 group relative z-10"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <i className={`${step.icon} text-white text-2xl`}></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg font-bold text-blue-600">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 -z-0"></div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm font-semibold rounded-full shadow-lg mb-4">
              OUR IMPACT
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-green-900 to-teal-900 bg-clip-text text-transparent">
              Real Results
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
              We deliver measurable outcomes that transform businesses and drive
              sustainable growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <i className="fas fa-chart-bar text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Performance Improvement
                  </h3>
                </div>
                <div
                  ref={chartRef}
                  style={{ width: "100%", height: "400px" }}
                ></div>
              </div>
            </div>
            <div className="relative group bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <i className="fas fa-smile text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Client Satisfaction
                  </h3>
                </div>
                <div
                  ref={satisfactionChartRef}
                  style={{ width: "100%", height: "400px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Studies Section */}
        <div id="case-studies" className="mb-32 scroll-mt-20">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full shadow-lg mb-4">
              SUCCESS STORIES
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
              Case Studies
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
              Explore how we've helped businesses achieve remarkable growth and
              transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {study.client}
                    </span>
                  </div>
                </div>
                <div className="relative p-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {study.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-3 text-gray-900 flex items-center">
                      <i className="fas fa-trophy text-yellow-500 mr-2"></i>
                      Key Results:
                    </h4>
                    <ul className="space-y-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm">
                            {result}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-semibold rounded-full shadow-lg mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-orange-900 to-red-900 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our services and processes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <i className="fas fa-question text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    What types of businesses do you work with?
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed ml-14">
                  We work with businesses of all sizes across various
                  industries, from startups to enterprise-level organizations.
                </p>
              </div>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <i className="fas fa-clock text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    How long does a typical project take?
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed ml-14">
                  Project timelines vary based on complexity; a simple website
                  might take 4-6 weeks, while larger projects may take several
                  months.
                </p>
              </div>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <i className="fas fa-headset text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    Do you offer ongoing support?
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed ml-14">
                  Yes, we offer comprehensive support and maintenance packages
                  to ensure your solution continues to perform optimally.
                </p>
              </div>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <i className="fas fa-tasks text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    What is your project management approach?
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed ml-14">
                  We follow agile methodologies with regular communication,
                  transparent progress tracking, and iterative development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-20 relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 p-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full shadow-lg">
                  🚀 Ready to Transform?
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
                Transform Your Business with Smart Digital Strategy, The Future
                Starts Now.
              </h2>
              <p className="text-xl mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto">
                Let's discuss how we can help you achieve your goals and drive
                unprecedented growth for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/onboarding")}
                  className="group !rounded-button bg-white text-purple-600 px-10 py-4 text-lg font-bold hover:bg-gray-100 transition-all duration-300 cursor-pointer whitespace-nowrap shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Get Started
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300"></i>
                </button>
              </div>
              <div className="mt-10 flex items-center justify-center gap-8 text-white/80">
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-300"></i>
                  <span className="text-sm font-medium">Free Consultation</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-300"></i>
                  <span className="text-sm font-medium">
                    No Commitment Required
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-300"></i>
                  <span className="text-sm font-medium">Expert Guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 mt-10">
            <div
              className={`bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${isSubmitted ? "p-6 max-w-sm" : "p-8 max-w-2xl w-full"}`}
            >
              {isSubmitted ? (
                <div className="text-center py-6">
                  <i className="fas fa-check-circle text-4xl text-green-500 mb-4 animate-bounce"></i>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Success!
                  </h4>
                  <p className="text-gray-600 text-base mb-5">
                    Your request has been submitted. We'll reach out soon!
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight mt-8">
                      Request Your Quote
                    </h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                    >
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        Basic Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Client Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                            placeholder="Your company"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                            placeholder="Your email"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                            placeholder="Your phone number (10 digits)"
                            required
                            minLength={10}
                            maxLength={10}
                            pattern="[0-9]{10}"
                            title="Please enter exactly 10 digits"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                            placeholder="Your location (optional)"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        Project Details
                      </h4>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type of Service/Product{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                            placeholder="e.g., Web Development, Mobile App"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Scope & Objectives{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="projectScope"
                            value={formData.projectScope}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                            rows={4}
                            placeholder="Describe your project"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Required Features/Specifications
                          </label>
                          <textarea
                            name="features"
                            value={formData.features}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                            rows={4}
                            placeholder="List specific features (optional)"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Materials/Software
                          </label>
                          <input
                            type="text"
                            name="materials"
                            value={formData.materials}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                            placeholder="e.g., React, Stainless Steel"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        Budget & Timeline
                      </h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estimated Budget
                        </label>
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                          placeholder="e.g., $5000"
                        />
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        Additional Notes
                      </h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Any Other Instructions
                        </label>
                        <textarea
                          name="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 shadow-sm transition-all duration-200"
                          rows={4}
                          placeholder="Add any extra details here"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                    >
                      Submit Request
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-fadeInLeft { animation: fadeInLeft 0.5s ease-out; }
        .animate-fadeInRight { animation: fadeInRight 0.5s ease-out; }
        html, body { overflow-x: hidden; }
      `}</style>
    </div>
  );
};

export default Quotation;
