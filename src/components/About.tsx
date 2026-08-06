import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { api, ASSETS_BASE } from "../lib/apiClient";

// --- Assets ---
import Sir from "../assets/Developer_Image/kanaksirr.jpg";

// --- Data & Types ---
interface TabData {
  id: string;
  label: string;
  icon: string;
}
interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}
interface Benefit {
  icon: string;
  title: string;
  description: string;
}
interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  department: string;
}

// Team members are now fetched from the API dynamically

// --- Sub-Components ---

const SectionTitle = ({
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle?: string;
}) => (
  <div className="mb-12 text-left">
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="text-lg text-gray-500 font-light max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// --- Job Application Modal ---
const JobApplicationModal = ({
  isOpen,
  onClose,
  selectedJob,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: Job | null;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // 1. Upload Resume
      const uploadData = new FormData();
      uploadData.append("image", resume); // Use 'image' to match existing UploadController param
      uploadData.append("folder", "resumes");

      const uploadRes = await fetch(api.UPLOAD, {
        // Standardize URL if needed, or use full URL
        method: "POST",
        headers: {
          "x-api-key": "karmadude_api_key_secure_2025", // Match backend key
        },
        body: uploadData,
      });

      const uploadResult = await uploadRes.json();

      if (!uploadResult.success) {
        throw new Error(uploadResult.message || "Resume upload failed");
      }

      const resumeUrl = uploadResult.data.url;

      const payload = {
        job_id: selectedJob.id === "general" ? undefined : selectedJob.id,
        job_title: selectedJob.title,
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        resume_url: resumeUrl,
        message: formData.message,
      };

      // 2. Submit Application
      const response = await api.jobApplications.create(payload);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          setResume(null);
        }, 3000);
      } else {
        setError(response.message || "Failed to submit application.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999999] overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative my-8"
        >
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Apply Now</h2>
                <p className="text-[#2f8ecd] font-bold text-sm mt-1">
                  Applying for {selectedJob?.title}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <i className="fas fa-times text-gray-400"></i>
              </button>
            </div>

            {success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                  <i className="fas fa-check"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Application Sent!
                </h3>
                <p className="text-gray-500">
                  We've received your application and will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2f8ecd]/20 text-gray-900"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2f8ecd]/20 text-gray-900"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2f8ecd]/20 text-gray-900"
                      placeholder="Your Phone"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d+]/g, "");
                        setFormData({ ...formData, phone: value });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Resume (PDF/DOC)
                    </label>
                    <input
                      required
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2f8ecd]/20 text-gray-900 text-xs"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setResume(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Your Pitch
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2f8ecd]/20 text-gray-900 resize-none"
                    placeholder="Tell us why you belong here..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-[#2f8ecd] text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:shadow-2xl transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>,
    document.body,
  );
};

// --- Tab Contents ---

const OurStoryTab = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-24 px-0 md:px-8">
      {/* Sticky Left Column: The Founder (Hero Visual) */}
      <div className="w-full lg:w-5/12 lg:sticky lg:top-32 h-fit mb-2 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/20 group"
        >
          {/* The "Moti Size" Pic */}
          <div className="aspect-[3/4] lg:aspect-[4/5] w-full relative bg-gray-100">
            <img
              src={Sir}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              alt="Kanaksinh Dodiya"
            />

            {/* Artistic Overlay - Always Visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Floating Badge */}
            <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest shadow-lg">
              Since 2021
            </div>
          </div>

          {/* Text Overlay - Always Visible */}
          <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-1 w-12 bg-[#2f8ecd] mb-6"></div>

              <h2 className="text-2xl lg:text-3xl font-bold leading-none mb-2">
                Kanaksinh Dodiya
              </h2>

              {/* Revealed on Hover */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  <p className="text-[#2f8ecd] font-bold text-sm uppercase tracking-widest mb-4 pt-2">
                    Founder & CEO
                  </p>
                  <div className="flex gap-3 mt-5">
                    <a
                      href="https://www.linkedin.com/in/kanaksinh-dodiya/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300"
                    >
                      <i className="fab fa-linkedin-in text-sm"></i>
                    </a>
                    <a
                      href="https://x.com/kditsolution22"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-[#000000] hover:border-[#000000] transition-all duration-300"
                    >
                      <i className="fa-brands fa-x-twitter text-sm"></i>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scrolling Right Column: The Story & Vision */}
      <div className="w-full lg:w-7/12 space-y-8 lg:space-y-16 pt-0 lg:pt-8">
        {/* 1. The Intro */}
        <div className="space-y-4 lg:space-y-8">
          <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 leading-[0.95] md:leading-[0.9] tracking-tight">
            Beyond <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2f8ecd] to-blue-400">
              Boundaries.
            </span>
          </h3>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
            What started as a spark in a garage has ignited into a global
            digital revolution. KarmaDude is a testament to the power of
            relentless innovation.
          </p>

          {/* Modern Stats Bar */}
          <div className="flex flex-row justify-around md:grid md:grid-cols-3 gap-4 md:gap-8 py-4 lg:py-8 border-y border-gray-100">
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">5+</div>
              <div className="text-[10px] font-bold text-[#2f8ecd] uppercase tracking-widest mt-1">
                Years
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">50+</div>
              <div className="text-[10px] font-bold text-[#2f8ecd] uppercase tracking-widest mt-1">
                Experts
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">Global</div>
              <div className="text-[10px] font-bold text-[#2f8ecd] uppercase tracking-widest mt-1">
                Impact
              </div>
            </div>
          </div>
        </div>

        {/* 2. Mission & Vision (Stacked Minimal) */}
        <div className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-xl shadow-gray-100 border border-gray-100 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#2f8ecd] rounded-bl-full opacity-10 transition-opacity group-hover:opacity-20"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] text-[#2f8ecd] flex items-center justify-center text-2xl shrink-0">
              <i className="fas fa-bullseye"></i>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                Our Mission
              </h4>
              <p className="text-gray-500 leading-relaxed font-light">
                To empower businesses with innovative technology solutions that
                enhance user experiences, streamline operations, and foster
                sustainable growth.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group bg-gray-900 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-xl shadow-gray-900/20 border border-gray-800 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#2f8ecd] rounded-tl-full opacity-10 transition-opacity group-hover:opacity-20"></div>
            <div className="w-16 h-16 rounded-2xl bg-gray-800 text-[#2f8ecd] flex items-center justify-center text-2xl shrink-0">
              <i className="fas fa-eye"></i>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-3">Our Vision</h4>
              <p className="text-gray-400 leading-relaxed font-light">
                To serve as the global catalyst for digital transformation,
                setting the gold standard for quality, creativity, and customer
                satisfaction by 2030.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
const TeamCard = memo(
  ({
    member,
    isActive,
    index,
    onToggle,
  }: {
    member: TeamMember;
    isActive: boolean;
    index: number;
    onToggle: (index: number) => void;
  }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
      <div
        onClick={() => onToggle(index)}
        className={`
                group relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] cursor-pointer shadow-lg transition-all duration-500 ease-in-out
                w-full h-full min-h-[380px]
                sm:w-auto sm:min-h-0
                ${isActive
            ? "sm:col-span-2 sm:row-span-2 z-10 shadow-2xl"
            : "col-span-1 row-span-1 z-0 hover:shadow-xl hover:scale-[1.02]"
          }
                 bg-gray-100 flex flex-col justify-end transform-gpu
            `}
      >
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-20">
            <i className="fas fa-image text-gray-300 text-3xl"></i>
          </div>
        )}
        <img
          src={member.image}
          alt={member.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
        />

        {/* Dynamic Overlay */}
        <div
          className={`
                  absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500
                  ${isActive ? "opacity-90" : "opacity-60 group-hover:opacity-80"}
              `}
        ></div>

        {/* Content */}
        <div
          className={`
                  relative z-10 p-6 transition-all duration-500
                  ${isActive ? "translate-y-0" : "translate-y-2 group-hover:translate-y-0"}
              `}
        >
          <div className="flex justify-between items-end">
            <div className="text-white">
              <p className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-2 opacity-100 drop-shadow-md">
                {member.role}
              </p>
              <h3
                className={`font-bold leading-tight mb-0 transition-all duration-300 ${isActive ? "text-3xl lg:text-4xl" : "text-lg lg:text-xl"}`}
              >
                {member.name}
              </h3>
            </div>

            {/* LinkedIn Icon */}
            <a
              href={
                member.linkedin
                  ? member.linkedin.startsWith("http")
                    ? member.linkedin
                    : `https://${member.linkedin}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (member.linkedin) {
                  e.stopPropagation();
                }
              }}
              className={`
                          w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white transition-all duration-300
                          ${isActive ? "bg-[#0077b5] border-[#0077b5]" : "group-hover:bg-white group-hover:text-[#0077b5]"}
                          ${!member.linkedin && "cursor-default opacity-50"}
                      `}
            >
              <i className="fab fa-linkedin-in text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    );
  },
);

const GalleryItem = memo(
  ({ img }: { img: { image: string; title: string } }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
      <div className="relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-[400px] w-full group bg-gray-100 transform-gpu">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <i className="fas fa-image text-gray-300 text-3xl"></i>
          </div>
        )}
        <img
          src={img.image}
          alt={img.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>

        <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:translate-y-[-8px]">
          <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-medium text-white mb-2 tracking-wider uppercase">
            Culture
          </div>
          <h3 className="text-white text-2xl font-bold leading-tight">
            {img.title}
          </h3>
        </div>
      </div>
    );
  },
);

const OurTeamTab = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollActiveIndex, setScrollActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Stable callback to prevent re-renders of all cards on click
  const handleToggle = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const step = container.offsetWidth; // each card = full container width
    const index = Math.round(container.scrollLeft / step);
    if (index >= 0 && index < teamMembers.length) {
      setScrollActiveIndex(index);
    }
  }, [teamMembers.length]);

  const scrollToCard = useCallback((index: number) => {
    if (!sliderRef.current) return;
    const step = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({ left: index * step, behavior: "smooth" });
    setScrollActiveIndex(index);
  }, []);

  // ── Drag-to-scroll state ──
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - sliderRef.current.offsetLeft;
    dragScrollLeft.current = sliderRef.current.scrollLeft;
    // disable snap so drag feels smooth
    sliderRef.current.style.scrollSnapType = "none";
    sliderRef.current.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    sliderRef.current.scrollLeft = dragScrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!sliderRef.current) return;
    isDragging.current = false;
    sliderRef.current.style.cursor = "grab";
    // re-enable snap so it snaps after release
    sliderRef.current.style.scrollSnapType = "x mandatory";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging.current || !sliderRef.current) return;
    isDragging.current = false;
    sliderRef.current.style.cursor = "grab";
    sliderRef.current.style.scrollSnapType = "x mandatory";
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const response = await api.teamMembers.getAll();
        if (response.success && Array.isArray(response.data)) {
          const mapped = response.data
            .filter(
              (m: any) => String(m.is_active) === "1" || m.is_active === true,
            )
            .map((m: any) => {
              const imageUrl = m.image_url;
              const finalImage =
                imageUrl && imageUrl.startsWith("http")
                  ? imageUrl
                  : imageUrl
                    ? `${ASSETS_BASE}${imageUrl}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=2f8ecd&color=fff&size=512`;

              return {
                name: m.name,
                role: m.role,
                image: finalImage,
                linkedin: m.linkedin_url,
              };
            });
          setTeamMembers(mapped);
        }
      } catch (err) {
        console.error("Failed to load team:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2f8ecd] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">
          Assembling the team...
        </p>
      </div>
    );
  }

  return (
    <div className="pb-6 sm:pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-16 gap-4">
        <SectionTitle
          title={
            <>
              The <span className="text-[#2f8ecd]">Dream Team</span>
            </>
          }
          subtitle="Meet the visionaries, the creators, and the problem solvers."
        />

        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">
          <i className="fas fa-mouse"></i> Tap to Expand
        </div>
      </div>

      {teamMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 auto-rows-[380px] sm:auto-rows-[350px] grid-flow-dense pb-12">
          {teamMembers.map((member, idx) => (
            <TeamCard
              key={idx}
              member={member}
              isActive={activeIndex === idx}
              index={idx}
              onToggle={handleToggle}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-400 italic">
          Check back soon to meet our growing team!
        </div>
      )}
    </div>
  );
};

const LifeAtKarmadudeTab = () => {
  const [gallery, setGallery] = useState<{ image: string; title: string }[]>(
    [],
  );
  const [cultureBenefits, setCultureBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        setLoading(true);
        const [galleryRes, benefitsRes] = await Promise.all([
          api.culture.getGallery(),
          api.culture.getBenefits(),
        ]);

        if (galleryRes.success && Array.isArray(galleryRes.data)) {
          const mappedGallery = galleryRes.data
            .filter(
              (item: any) =>
                String(item.is_active) === "1" || item.is_active === true,
            )
            .map((item: any) => ({
              image:
                item.image_url && item.image_url.startsWith("http")
                  ? item.image_url
                  : `${ASSETS_BASE}${item.image_url}`,
              title: item.title,
            }));
          setGallery(mappedGallery);
        }

        if (benefitsRes.success && Array.isArray(benefitsRes.data)) {
          const mappedBenefits = benefitsRes.data
            .filter(
              (item: any) =>
                String(item.is_active) === "1" || item.is_active === true,
            )
            .map((item: any) => ({
              icon: item.icon,
              title: item.title,
              description: item.description,
            }));
          setCultureBenefits(mappedBenefits);
        }
      } catch (err) {
        console.error("Failed to load culture data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCulture();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="w-10 h-10 border-4 border-[#2f8ecd] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-32">
      <div>
        <SectionTitle
          title={
            <>
              Life at <span className="text-[#2f8ecd]">KarmaDude</span>
            </>
          }
          subtitle="Where work meets passion, and colleagues become family."
        />

        {/* Dynamic Gallery */}
        {gallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {gallery.map((img, idx) => (
              <GalleryItem key={idx} img={img} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400 italic mb-24">
            Our culture is blooming. Check back soon for snapshots!
          </div>
        )}
      </div>

      <div className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-gray-50 -mx-8 md:-mx-12 rounded-[4rem] -z-10 transform skew-y-1"></div>

        <div className="text-center max-w-2xl mx-auto mb-16 px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why We <span className="text-red-500">Love</span> It Here
          </h3>
          <p className="text-gray-500 text-lg">
            More than just a job, it's a lifestyle. Here's what keeps us going.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {cultureBenefits.map((b: Benefit, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10, rotate: idx % 2 === 0 ? 1 : -1 }}
              className="p-8 bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-300 transform border border-transparent hover:border-blue-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl mb-6 shadow-lg shadow-blue-500/30">
                <i className={b.icon}></i>
              </div>
              <h4 className="font-bold text-xl text-gray-900 mb-3">
                {b.title}
              </h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CareersTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleGeneralApply = () => {
    setSelectedJob({
      id: "general",
      title: "General Application",
      location: "Remote/On-site",
      type: "Full-Time",
      description: "Open application for future opportunities at KarmaDude.",
      department: "General",
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await api.jobs.getAll();
        if (response.success && Array.isArray(response.data)) {
          const filtered = response.data
            .filter(
              (j: any) => String(j.is_active) === "1" || j.is_active === true,
            )
            .map((j: any) => ({
              id: j.id,
              title: j.title,
              location: j.location,
              type: j.type,
              description: j.description,
              department: j.department,
            }));
          setActiveJobs(filtered);
        }
      } catch (err) {
        console.error("Failed to load jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2f8ecd] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
          Syncing Opportunities...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Careers Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-[1px] bg-[#2f8ecd]"></div>
            <span className="text-[#2f8ecd] text-xs font-black uppercase tracking-[0.3em]">
              Careers at Karmadude
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.95] tracking-tighter">
            Where Talents <br />
            Meet <span className="text-[#2f8ecd]">Purpose.</span>
          </h2>

          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
            We're building the infrastructure of the digital age. Join a team
            that values raw talent over pedigree and outcome over activity.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {[
              { label: "Elite Culture", icon: "fas fa-star" },
              { label: "Rapid Growth", icon: "fas fa-chart-line" },
              { label: "Ownership", icon: "fas fa-key" },
            ].map((perk, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-6 py-3 bg-white shadow-xl shadow-gray-100 rounded-2xl border border-gray-50 text-gray-600 font-bold text-sm"
              >
                <i className={`${perk.icon} text-[#2f8ecd]`}></i>
                {perk.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-blue-100/50 rounded-[4rem] blur-2xl group-hover:bg-blue-200/50 transition-colors"></div>
          <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Team Workshop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>

            <div className="absolute bottom-10 left-10 text-white">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-lg"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="team"
                      />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-[#2f8ecd] flex items-center justify-center text-[10px] font-black shadow-lg">
                    +12
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-300">
                    Our Experts
                  </p>
                  <p className="text-sm font-bold">Collaborative Workspace</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Jobs Board */}
      <div className="space-y-10 border border-gray-300 p-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
              Open Opportunities
            </h3>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Pipeline • Updated daily
            </p>
          </div>
          <div className="px-8 py-4 bg-white shadow-lg shadow-gray-100 rounded-3xl border border-gray-50 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900 leading-none">
                {activeJobs.length}
              </span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                Positions
              </span>
            </div>
            <div className="w-px h-10 bg-gray-100"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#2f8ecd] leading-none">
                4
              </span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                Teams
              </span>
            </div>
          </div>
        </div>

        {activeJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {activeJobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative bg-white p-10 md:p-12 rounded-[3.5rem] border border-transparent hover:border-blue-100 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(47,142,205,0.08)] overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-12"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-[#2f8ecd] transition-all duration-500"></div>

                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-5 py-2 rounded-2xl bg-blue-50 text-[#2f8ecd] text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100/50">
                      {job.department}
                    </span>
                    <span className="px-5 py-2 rounded-2xl bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border border-gray-100/50">
                      {job.type}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-[#2f8ecd] transition-colors tracking-tight uppercase">
                      {job.title}
                    </h4>
                    <div
                      className="text-gray-500 mb-5 text-base leading-relaxed prose-description"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2.5 text-gray-400 text-sm font-bold uppercase tracking-widest">
                        <i className="fas fa-map-marker-alt text-[#2f8ecd]"></i>
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2.5 text-gray-400 text-sm font-bold uppercase tracking-widest">
                        <i className="fas fa-clock text-[#2f8ecd]"></i>
                        Posted Recently
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleApply(job)}
                    className="cursor-pointer group/btn relative px-10 py-6 bg-gray-900 overflow-hidden text-white rounded-3xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-gray-900/10"
                  >
                    <span className="relative z-10">Launch Application</span>
                    <div className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 bg-[#2f8ecd] transition-transform duration-300"></div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[4rem] border border-gray-100 shadow-xl shadow-gray-50 flex flex-col items-center px-8">
            <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center mb-8 rotate-12 group-hover:rotate-0 transition-transform">
              <i className="fas fa-rocket text-[#2f8ecd] text-4xl"></i>
            </div>
            <h4 className="text-3xl font-black text-gray-900 mb-4 tracking-tight uppercase">
              Building the next wave
            </h4>
            <p className="text-gray-500 font-medium text-lg max-w-sm mb-12">
              Our current teams are full of talent, but we're always scouting
              for the extraordinary.
            </p>
            <button
              onClick={handleGeneralApply}
              className="px-8 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#2f8ecd] hover:text-white transition-all shadow-sm"
            >
              Drop Your Resume anyway
            </button>
          </div>
        )}
      </div>

      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        selectedJob={selectedJob}
      />
    </div>
  );
};

// --- Main Component ---

const About = () => {
  const { tabId } = useParams();
  const navigate = useNavigate();
  const activeTab = tabId || "our-story";

  const tabs: TabData[] = [
    { id: "our-story", label: "Story", icon: "fas fa-book-open" },
    { id: "our-team", label: "Team", icon: "fas fa-users" },
    { id: "life-at-karmadude", label: "Culture", icon: "fas fa-heart" },
    { id: "careers", label: "Careers", icon: "fas fa-briefcase" },
  ];

  // Map IDs to content
  const renderContent = () => {
    switch (activeTab) {
      case "our-story":
        return <OurStoryTab />;
      case "our-team":
        return <OurTeamTab />;
      case "life-at-karmadude":
        return <LifeAtKarmadudeTab />;
      case "careers":
        return <CareersTab />;
      default:
        return <OurStoryTab />;
    }
  };

  return (
    <>
      <Helmet>
        <title>About Us | KarmaDude</title>
      </Helmet>

      <div className="min-h-screen bg-[#fafafa] pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header & Nav */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-8 md:mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#2f8ecd] text-xs font-bold tracking-widest uppercase mb-2 sm:mb-4"
              >
                Who We Are
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[0.9]"
              >
                We Build <br />{" "}
                <span className="text-[#2f8ecd]">The Future.</span>
              </motion.h1>
            </div>

            {/* Minimal Pill Navigation */}
            <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-200 inline-flex overflow-x-auto max-w-full scrollbar-hide self-center md:self-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => navigate(`/about/${tab.id}`)}
                  className={`
                            relative px-3 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer bg-transparent border-0 outline-none
                            ${activeTab === tab.id ? "text-white shadow-md" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}
                        `}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 bg-[#2f8ecd] rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    <i className={tab.icon}></i> {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-[3rem] p-6 md:p-12 lg:p-16 shadow-2xl shadow-gray-200 border border-gray-100 min-h-[600px]">
            {/* <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence> */}
            <div key={activeTab} className="animate-fade-in-up">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
