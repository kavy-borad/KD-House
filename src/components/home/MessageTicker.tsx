import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MessageTicker = () => {
  const messages = [
    "Online in 5 days. Just $499. No stress, no hidden fees — just your business, live.",
    "Why wait? Get a custom website that means business — only $499, delivered fast.",
    "Turn clicks into clients. your website, built in 5 days for just $499.",
    "From idea to online. launch your site in 5 days, starting at just $499.",
    "Smart-Simple-Stunning. Your website for $499 — live in just 5 days.",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMessageIndex}
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -14, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full flex items-center justify-center text-center"
      >
        <div className="inline-flex items-center justify-center gap-2.5 md:gap-3">
          <span className="hidden md:inline-flex shrink-0 items-center justify-center bg-blue-500 text-white text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            Limited Offer
          </span>
          <span className="text-gray-100 text-xs sm:text-sm md:text-[15px] font-semibold tracking-normal drop-shadow-sm leading-snug md:whitespace-nowrap">
            {messages[currentMessageIndex]}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageTicker;
