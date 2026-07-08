"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function MobileDeliveryFAB() {
  return (
    <motion.a
      href="tel:+385994111894"
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-4 right-4 z-50 md:hidden bg-navy-600 hover:bg-navy-700 active:scale-95 text-white p-4 rounded-full shadow-premium flex items-center justify-center border border-white/20 select-none cursor-pointer"
      aria-label="Call for food delivery"
    >
      <div className="relative">
        {/* Custom Food Delivery Scooter/Bike SVG */}
        <svg
          className="h-6 w-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="5.5" cy="17.5" r="2.5" />
          <circle cx="18.5" cy="17.5" r="2.5" />
          <path d="M5.5 17.5H12M18.5 17.5h-3.5L12 12V6c0-1.1-.9-2-2-2H8M12 9H9" />
        </svg>

        {/* Small Phone Indicator badge */}
        <span className="absolute -top-2.5 -right-2.5 bg-sea-500 border border-white rounded-full p-0.5 animate-pulse">
          <Phone className="h-2.5 w-2.5 text-white" />
        </span>
      </div>
    </motion.a>
  );
}
