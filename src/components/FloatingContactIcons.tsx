import { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaTimes, FaCommentDots } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const HangoutIcon = ({ size = 24, className = "w-6 h-6 text-white" }: { size?: number; className?: string }) => (
  <FaCommentDots size={size} className={className} />
);

interface FloatingContactIconsProps {
  hide?: boolean;
}

export default function FloatingContactIcons({
  hide = false,
}: FloatingContactIconsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (hide) return null;

  return (
    <div
      ref={containerRef}
      className="fixed right-6 bottom-8 z-[100] flex flex-col items-center"
    >
      {/* Animated Pop-up List of Contact Icons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="flex flex-col gap-3.5 mb-3.5 items-center"
          >
            {/* WhatsApp */}
            <ContactItem
              href="https://wa.me/7435822022"
              icon={<FaWhatsapp className="w-6 h-6" />}
              color="bg-[#25D366]"
              label="WhatsApp"
              index={0}
            />

            {/* Email */}
            <ContactItem
              href="mailto:karmadudeitsolutions@gmail.com"
              icon={<FaEnvelope className="w-5 h-5" />}
              color="bg-[#3B82F6]"
              label="Email"
              index={1}
            />

            {/* Instagram */}
            <ContactItem
              href="https://www.instagram.com/karmadudeitsolutions/"
              icon={<FaInstagram className="w-6 h-6" />}
              color="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]"
              label="Instagram"
              index={2}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Floating Action Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle contact menu"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#2f8ecd] to-[#1d6fa8] text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
      >
        {/* Rotatable Icon Container */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <HangoutIcon size={24} className="w-6 h-6 text-white" />
          )}
        </motion.div>

        {/* Tooltip on main button hover when closed */}
        {!isOpen && (
          <span className="absolute right-16 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Contact Us
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 transform rotate-45"></span>
          </span>
        )}
      </button>
    </div>
  );
}

const ContactItem = ({
  href,
  icon,
  color,
  label,
  index,
}: {
  href: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  index: number;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{
      duration: 0.2,
      ease: "easeOut",
      delay: index * 0.03,
    }}
    className="group relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg text-white hover:shadow-2xl transition-all cursor-pointer"
  >
    {/* Colored Background */}
    <div
      className={`absolute inset-0 rounded-full ${color} opacity-95 group-hover:opacity-100 transition-opacity`}
    />

    {/* Icon */}
    <span className="relative z-10">{icon}</span>

    {/* Tooltip */}
    <span className="absolute right-14 px-3 py-1.5 bg-white text-gray-800 text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap border border-gray-100">
      {label}
      <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45 border-t border-r border-gray-100"></span>
    </span>
  </motion.a>
);
