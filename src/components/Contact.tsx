import React, { useState } from "react";
import { api } from "../lib/apiClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  Linkedin,
  Instagram,
  CheckCircle2,
  AlertCircle,
  Globe2,
  MessageSquare,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const processedValue = name === "phone" ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await api.contacts.create(formData);
      if (!result.success)
        throw new Error(result.message || "Failed to submit form");
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Global Offices",
      details: [
        "Nikol-Ahmedabad, Gujarat, India",
        "27 Cotton Grass, Kitchener, Canada",
        "31 Elmgrove Road, HA1 2AR, UK",
        "142 Marylinn Dr Milpitas CA 95035, California, USA",
      ],
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Numbers",
      details: [
        { label: "India", value: "+91 74348 22022" },
        { label: "Canada", value: "+1 289 888 3877" },
        { label: "UK", value: "+44 077 7004 2843" },
      ],
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Addresses",
      details: ["kanak@karmadude.in", "karmadudeenterprise@gmail.com"],
      color: "bg-sky-50 text-sky-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        "Mon - Fri: 9:00 AM - 7:00 PM",
        "Sat: 10:00 AM - 5:00 PM",
        "Sunday: Closed",
      ],
      color: "bg-slate-50 text-slate-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Subtle Background Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* --- Swiss Editorial Hero --- */}
        <header className="pt-24 pb-4 md:pt-40 md:pb-24 relative overflow-hidden">
          <div className="w-full">
            {/* Top Meta Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex justify-between items-center mb-6 md:mb-20 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-4 md:pb-6"
            >
              <span className="text-[#2f8ecd]">KarmaDude</span>
              <span className="hidden md:inline">Open for Collaboration</span>
              <span>©2021</span>
            </motion.div>

            {/* Massive Typography - Cleaned for proper editorial spacing */}
            <div className="relative">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3.5rem,13vw,11rem)] leading-[0.8] font-bold text-gray-900 tracking-tighter"
              >
                CONNECT
              </motion.h1>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-start md:items-center md:pl-[12vw] mt-2 md:mt-0"
              >
                <h1 className="text-[clamp(3.5rem,13vw,11rem)] leading-[0.8] font-serif italic font-light text-[#2f8ecd] tracking-tighter z-10">
                  WITH US
                </h1>

                <div className="mt-4 md:mt-4 md:ml-12 max-w-sm">
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light">
                    Have a vision? Let’s talk about
                    <span className="text-[#2f8ecd] font-bold">
                      {" "}
                      crafting something
                    </span>{" "}
                    extraordinary together. Our team is ready to listen.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        <section className="pb-12 md:pb-24 px-0 sm:px-6 mt-6 md:mt-32">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* --- Contact Info Bento Grid --- */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white -mx-6 sm:mx-0 rounded-none sm:rounded-[2rem] border-x-0 sm:border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl ${info.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                      {info.title}
                    </h3>
                    <div className="space-y-2">
                      {info.details.map((detail, dIdx) => (
                        <p
                          key={dIdx}
                          className="text-sm text-slate-500 leading-relaxed"
                        >
                          {typeof detail === "string" ? (
                            detail
                          ) : (
                            <>
                              <span className="font-semibold text-slate-700">
                                {detail.label}:{" "}
                              </span>
                              {detail.value}
                            </>
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Social Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="sm:col-span-2 p-6 sm:p-8 bg-slate-900 -mx-6 sm:mx-0 rounded-none sm:rounded-[2rem] text-white overflow-hidden relative"
                >
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Follow Our Journey
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Stay updated with our latest projects and insights.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <a
                        href="https://www.linkedin.com/company/karmadude/posts/?feedView=all"
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2f8ecd] transition-all duration-300"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="https://www.instagram.com/karmadudeitsolutions/"
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E1306C] transition-all duration-300"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#2f8ecd]/20 blur-3xl rounded-full translate-x-10 -translate-y-10" />
                </motion.div>
              </div>

              {/* --- Contact Form --- */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 bg-white -mx-6 sm:mx-0 rounded-none sm:rounded-[2.5rem] border-x-0 sm:border border-slate-100 shadow-lg shadow-slate-200/50 p-5 sm:p-8 md:p-12 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="mb-6 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                      Send a Message
                    </h2>
                    <p className="text-slate-500">
                      I'm interested in hearing about your project goals and how
                      we can help.
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-green-50 border border-green-100 p-8 rounded-3xl text-center py-16"
                      >
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-900 mb-2">
                          Message Sent!
                        </h3>
                        <p className="text-green-700">
                          We've received your inquiry and will get back to you
                          within 24 hours.
                        </p>
                        <button
                          onClick={() => setSuccess(false)}
                          className="mt-8 px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-all"
                        >
                          Send Another
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">
                              Full Name
                            </label>
                            <input
                              required
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Carter"
                              className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">
                              Email Address
                            </label>
                            <input
                              required
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">
                              Phone Number
                            </label>
                            <input
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="123 456 7890"
                              maxLength={10}
                              className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">
                              Subject
                            </label>
                            <div className="relative">
                              <select
                                required
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none"
                              >
                                <option value="" disabled>
                                  Select inquiry type
                                </option>
                                <option value="Web Development">
                                  Web Development
                                </option>
                                <option value="Mobile App">
                                  Mobile App Development
                                </option>
                                <option value="UI/UX Design">
                                  UI/UX Design
                                </option>
                                <option value="Cloud Solutions">
                                  Cloud Solutions
                                </option>
                                <option value="Other">Other Inquiry</option>
                              </select>
                              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">
                            Project Details
                          </label>
                          <textarea
                            required
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your project, goals, and timeline..."
                            rows={5}
                            className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"
                          />
                        </div>

                        {error && (
                          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-1/2 bg-slate-900 text-white rounded-2xl py-5 font-bold flex items-center justify-center gap-3 hover:bg-[#2f8ecd] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-xl shadow-slate-900/10"
                          >
                            {isSubmitting ? (
                              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <span>Launch Inquiry</span>
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={async () => {
                              if (
                                !formData.name ||
                                !formData.email ||
                                !formData.phone ||
                                !formData.subject ||
                                !formData.message
                              ) {
                                setError(
                                  "Please fill out all required fields before connecting via WhatsApp.",
                                );
                                return;
                              }

                              setIsSubmitting(true);
                              setError(null);

                              try {
                                const result =
                                  await api.contacts.create(formData);
                                if (!result.success) {
                                  throw new Error(
                                    result.message || "Failed to submit form",
                                  );
                                }
                                window.open(
                                  "https://wa.me/917434822022",
                                  "_blank",
                                );

                                setSuccess(true);
                                setFormData({
                                  name: "",
                                  email: "",
                                  phone: "",
                                  subject: "",
                                  message: "",
                                });
                              } catch (err: any) {
                                setError(
                                  err.message ||
                                  "Failed to submit. Please try again.",
                                );
                              } finally {
                                setIsSubmitting(false);
                              }
                            }}
                            className="w-full sm:w-1/2 bg-[#25D366] text-white rounded-2xl py-5 font-bold flex items-center justify-center gap-3 hover:bg-[#1ebd5a] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-xl shadow-[#25D366]/20"
                          >
                            {isSubmitting ? (
                              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <FaWhatsapp className="w-6 h-6" />
                                <span>Let's Connect</span>
                              </>
                            )}
                          </button>
                        </div>

                        <p className="text-center text-xs text-slate-400 mt-6">
                          By submitting this form, you agree to our{" "}
                          <a
                            href="/privacy"
                            className="text-[#2f8ecd] hover:underline"
                          >
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- FAQ / Value Section --- */}
        <section className="py-8 sm:py-16 md:py-24 bg-slate-50/50 px-4 sm:px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-6 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-2 sm:mb-6">
                Common Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
                Everything you need to know about starting a project with
                Karmadude.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {[
                {
                  q: "How fast can we start?",
                  a: "Post-discovery, we typically kick off within 1-2 weeks. We value thorough planning to ensure smooth execution.",
                  icon: <Clock className="w-5 h-5 text-blue-600" />,
                },
                {
                  q: "Do you offer post-launch support?",
                  a: "Absolutely. We provide comprehensive maintenance and support packages tailored to your product's specific needs.",
                  icon: <CheckCircle2 className="w-5 h-5 text-indigo-600" />,
                },
                {
                  q: "Can you handle global projects?",
                  a: "Yes, our team is distributed across India, Canada, and the UK, enabling us to support clients across all time zones.",
                  icon: <Globe2 className="w-5 h-5 text-sky-600" />,
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-5 sm:p-8 bg-white border border-slate-100 rounded-2xl sm:rounded-3xl shadow-sm"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3 sm:mb-6">
                    {faq.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-4">
                    {faq.q}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
