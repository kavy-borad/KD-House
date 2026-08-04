import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactJSLogo from "../assets/internship image/react.gif";
import MERNLogo from "../assets/internship image/mern1.gif";
import PythonLogo from "../assets/internship image/pyhton.gif";
import AndroidLogo from "../assets/internship image/Android.gif";
import FlutterLogo from "../assets/internship image/flutter.gif";
import WebDevLogo from "../assets/internship image/htmlcss.gif";
import { api } from "../lib/apiClient";
import {
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Phone,
  Mail,
  User,
} from "lucide-react";

const Internship: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (showForm || showSuccessPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showForm, showSuccessPopup]);

  const techData = [
    {
      name: "React JS",
      description:
        "Dive into React JS to build dynamic, high-performance user interfaces. Learn component-based architecture, state management with hooks, and modern tools like Redux and React Router to create scalable web applications.",
      logo: ReactJSLogo,
    },
    {
      name: "MERN Stack",
      description:
        "Master full-stack development with the MERN stack (MongoDB, Express.js, React, Node.js). Build end-to-end applications, from RESTful APIs to responsive frontends, and deploy scalable solutions using industry-standard practices.",
      logo: MERNLogo,
    },
    {
      name: "Python",
      description:
        "Explore Python’s versatility for web development, data analysis, and automation. Gain hands-on experience with frameworks like Django and Flask, and learn libraries like Pandas and NumPy for real-world projects.",
      logo: PythonLogo,
    },
    {
      name: "Android",
      description:
        "Develop cutting-edge Android apps using Kotlin and Java. Master Android Studio, UI design with XML, and core concepts like Activities, Fragments, and Room database to build robust mobile applications.",
      logo: AndroidLogo,
    },
    {
      name: "Flutter",
      description:
        "Create cross-platform apps with Flutter’s powerful framework. Learn Dart, design stunning UIs with widgets, and build apps for iOS, Android, and web from a single codebase, optimized for performance.",
      logo: FlutterLogo,
    },
    {
      name: "Basic Web Dev (HTML, CSS, JS)",
      description:
        "Kickstart your web development journey with HTML, CSS, and JavaScript. Learn to responsive layouts, style with modern CSS frameworks, and add interactivity using vanilla JS and DOM manipulation.",
      logo: WebDevLogo,
    },
  ];

  const handleRegister = (tech: string) => {
    setSelectedTech(tech);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showForm) {
        setShowForm(false);
      }
    };
    if (showForm) {
      document.body.classList.add("overflow-hidden");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showForm]);

  const fetchStudentData = async () => {
    setIsLoading(true);
    try {
      const result = await api.students.getAll();
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      mobile_number: formData.get("mobileNumber") as string,
      date_of_birth: formData.get("dateOfBirth") as string,
      gender: formData.get("gender") as string,
      duration: formData.get("duration") as string,
      technology: selectedTech || "",
    };

    if (!data.email.includes("@") || !/^\d{10}$/.test(data.mobile_number)) {
      setErrorMessage("Please enter a valid email or 10-digit mobile number.");
      setIsLoading(false);
      return;
    }

    const dob = new Date(data.date_of_birth);
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 16,
      today.getMonth(),
      today.getDate(),
    );
    const maxAgeDate = new Date(
      today.getFullYear() - 100,
      today.getMonth(),
      today.getDate(),
    );

    if (isNaN(dob.getTime())) {
      setErrorMessage("Please select a valid date of birth.");
      setIsLoading(false);
      return;
    }
    if (dob > today) {
      setErrorMessage("Date of birth cannot be in the future.");
      setIsLoading(false);
      return;
    }
    if (dob > minAgeDate) {
      setErrorMessage("You must be at least 16 years old to register.");
      setIsLoading(false);
      return;
    }
    if (dob < maxAgeDate) {
      setErrorMessage("Date of birth seems invalid (age exceeds 100 years).");
      setIsLoading(false);
      return;
    }

    try {
      const result = await api.students.create(data);
      if (!result.success) {
        if (result.code === "23505" || result.message?.includes("duplicate")) {
          setErrorMessage("This email is already registered.");
        } else {
          throw new Error(result.message || "Failed to submit registration");
        }
        return;
      }

      setShowForm(false);
      setShowSuccessPopup(true);
      setErrorMessage(null);
      fetchStudentData();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Subtle Background Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* --- Swiss Editorial Hero --- */}
        <header className="pt-24 pb-6 md:pt-40 md:pb-24 relative overflow-hidden">
          <div className="w-full">
            {/* Top Meta Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex justify-between items-center mb-12 md:mb-20 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-6"
            >
              <span className="text-[#2f8ecd]">KarmaDude</span>
              <span className="hidden md:inline">Shape Your Future</span>
              <span>©2021</span>
            </motion.div>

            {/* Massive Typography */}
            <div className="relative">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] font-bold text-gray-900 tracking-tighter"
              >
                INTERNSHIP
              </motion.h1>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-start md:items-center md:pl-[12vw] mt-4 md:mt-0"
              >
                <h1 className="text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] font-serif italic font-light text-[#2f8ecd] tracking-tighter z-10">
                  PROGRAMS
                </h1>

                <div className="mt-6 md:mt-4 md:ml-12 max-w-sm">
                  <p className="text-gray-500 text-lg leading-relaxed font-light">
                    Elevate your skills with structured, hands-on
                    <span className="text-[#2f8ecd] font-bold">
                      {" "}
                      industry training
                    </span>{" "}
                    designed to kickstart your career.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        <section className="pb-12 md:pb-24 mt-6 md:mt-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {techData.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  onClick={() => handleRegister(tech.name)}
                  className="group relative bg-white border border-gray-200 rounded-3xl p-5 sm:p-8 hover:border-[#2f8ecd]/50 hover:shadow-[0_1rem_3rem_rgba(47,142,205,0.15)] transition-all duration-500 cursor-pointer flex flex-col h-full overflow-hidden"
                >
                  {/* Subtle Top Inner Glow */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2f8ecd]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Background Soft Glow Aura */}
                  <div className="absolute top-8 right-8 w-32 h-32 bg-[#2f8ecd]/5 rounded-full blur-3xl group-hover:bg-[#2f8ecd]/20 transition-all duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-6">
                      <img
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-sm mix-blend-multiply group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                        loading="lazy"
                      />
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-[#2f8ecd] transition-colors">
                        {tech.name}
                      </h3>
                    </div>

                    <p className="text-gray-500 leading-relaxed text-sm sm:text-[15px] mb-6 sm:mb-8 flex-grow">
                      {tech.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegister(tech.name);
                    }}
                    className="relative z-10 w-full mt-auto py-3.5 rounded-xl font-bold text-sm tracking-wide overflow-hidden bg-gray-50 text-gray-700 hover:text-white border border-gray-200 hover:border-transparent transition-all duration-300 group/btn"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Register Now
                      <ArrowRight className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2f8ecd] to-[#1a5b8a] translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* --- Form Modal (Enterprise SaaS Style) --- */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-[200] bg-slate-950/40 backdrop-blur-[2px] overflow-y-auto flex items-center justify-center p-3 sm:p-6"
              onClick={handleCloseForm}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 pointer-events-none"
            >
              <div
                className="relative w-[93vw] max-w-[660px] max-h-[90vh] h-fit bg-white rounded-[28px] border border-[#EEF2F7] shadow-[0_24px_60px_rgba(15,23,42,0.12)] p-6 sm:p-8 pointer-events-auto flex flex-col my-auto"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Minimal Circular Close Button */}
                <button
                  type="button"
                  onClick={handleCloseForm}
                  aria-label="Close modal"
                  className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full bg-slate-100/70 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 transition-all duration-200 flex items-center justify-center outline-none focus:ring-2 focus:ring-[#2f8ecd]/30"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="pr-10 mb-5">
                  <h2 className="text-[26px] md:text-[34px] font-bold text-slate-900 leading-tight tracking-tight">
                    Join {selectedTech}
                  </h2>
                  <p className="text-[14px] md:text-[16px] text-slate-500 font-normal leading-relaxed mt-1.5">
                    Fill out the details below to secure your spot in an industry-leading training session.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1.5 -mr-1.5 space-y-4 custom-scrollbar pb-1">
                  {errorMessage && (
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-[14px] flex items-center gap-3 text-rose-600 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  {/* Row 1: Full name & Email address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5">
                        Full name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                          required
                          name="fullName"
                          placeholder="John Carter"
                          className="w-full h-[48px] sm:h-[52px] pl-11 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5">
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          className="w-full h-[48px] sm:h-[52px] pl-11 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Mobile number & Date of birth */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5">
                        Mobile number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                          type="tel"
                          name="mobileNumber"
                          placeholder="123 456 7890"
                          pattern="[0-9]{10}"
                          minLength={10}
                          maxLength={10}
                          required
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            target.value = target.value.replace(/\D/g, "");
                          }}
                          className="w-full h-[48px] sm:h-[52px] pl-11 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none shadow-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5">
                        Date of birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        max={new Date().toISOString().split("T")[0]}
                        required
                        className="w-full h-[48px] sm:h-[52px] px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm sm:text-base font-medium text-slate-900 focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none cursor-pointer shadow-none"
                      />
                    </div>
                  </div>

                  {/* Row 3: Gender & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5">
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          required
                          name="gender"
                          defaultValue=""
                          className="w-full h-[48px] sm:h-[52px] px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm sm:text-base font-medium text-slate-900 focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none appearance-none cursor-pointer shadow-none"
                        >
                          <option value="" disabled>
                            Select gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[13px] sm:text-sm font-semibold text-slate-800 block mb-1.5">
                        Duration
                      </label>
                      <div className="relative">
                        <select
                          required
                          name="duration"
                          defaultValue=""
                          className="w-full h-[48px] sm:h-[52px] px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm sm:text-base font-medium text-slate-900 focus:bg-white focus:border-[#2f8ecd] focus:ring-0 transition-colors duration-150 outline-none appearance-none cursor-pointer shadow-none"
                        >
                          <option value="" disabled>
                            Select duration
                          </option>
                          <option value="4 weeks">4 Weeks</option>
                          <option value="8 weeks">8 Weeks</option>
                          <option value="3 months">3 Months</option>
                          <option value="6 months">6 Months</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="w-full sm:w-auto h-[48px] sm:h-[52px] px-6 rounded-[14px] text-slate-500 hover:text-slate-800 font-medium hover:bg-slate-100/70 transition-all duration-200 cursor-pointer flex items-center justify-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto h-[48px] sm:h-[52px] px-8 rounded-[14px] bg-[#2f8ecd] hover:bg-[#2576ad] text-white font-semibold shadow-md shadow-[#2f8ecd]/20 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit Registration</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Success Popup --- */}
      <AnimatePresence>
        {showSuccessPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-[200] bg-slate-950/40 backdrop-blur-[2px]"
              style={{ willChange: "opacity" }}
              onClick={() => setShowSuccessPopup(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{
                duration: 0.25,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="relative bg-white p-8 sm:p-10 rounded-[28px] shadow-[0_24px_60px_rgba(15,23,42,0.12)] text-center max-w-sm w-full border border-[#EEF2F7] pointer-events-auto"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Success!
                </h3>
                <p className="text-slate-500 mb-8 leading-relaxed text-base">
                  Thank you for registering for the{" "}
                  <strong className="text-slate-800">{selectedTech}</strong> program. Our team will contact
                  you shortly.
                </p>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="w-full h-[54px] px-8 bg-[#2f8ecd] hover:bg-[#2576ad] text-white font-semibold rounded-[14px] shadow-md shadow-[#2f8ecd]/20 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                  Return to Programs
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Internship;
