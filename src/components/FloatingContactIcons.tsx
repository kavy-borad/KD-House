import { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const HangoutIcon = ({ size = 24, className = "w-6 h-6 text-white" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 22C16 22 21 16 21 11C21 6 16.9706 2 12 2C7.02944 2 3 6 3 11C3 16 7.02944 20 12 20V22Z" />
    <path d="M10.5 11.5V10C10.5 9.05719 10.5 8.58579 10.2071 8.29289C9.91421 8 9.44281 8 8.5 8C7.55719 8 7.08579 8 6.79289 8.29289C6.5 8.58579 6.5 9.05719 6.5 10V10.5C6.5 10.9659 6.5 11.1989 6.57612 11.3827C6.67761 11.6277 6.87229 11.8224 7.11732 11.9239C7.30109 12 7.8312 12 8.29714 12C8.51058 12.9056 8 14 8 14C9.38071 14 10.5 12.8807 10.5 11.5Z" strokeLinecap="round" />
    <path d="M17.5 11.5V10C17.5 9.05719 17.5 8.58579 17.2071 8.29289C16.9142 8 16.4428 8 15.5 8C14.5572 8 14.0858 8 13.7929 8.29289C13.5 8.58579 13.5 9.05719 13.5 10V10.5C13.5 10.9659 13.5 11.1989 13.5761 11.3827C13.6776 11.6277 13.8723 11.8224 14.1173 11.9239C14.3011 12 14.8312 12 15.2971 12C15.5106 12.9056 15 14 15 14C16.3807 14 17.5 12.8807 17.5 11.5Z" strokeLinecap="round" />
  </svg>
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
              href="https://wa.me/7434822022"
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
