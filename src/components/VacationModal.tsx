"use client";

import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function VacationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { vacationStart, vacationEnd, language } = useLanguage();

  useEffect(() => {
    if (!vacationStart || !vacationEnd) {
      setIsOpen(false);
      return;
    }

    const today = new Date();
    // Normalize current date to local midnight for exact date matching
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const [startYear, startMonth, startDay] = vacationStart.split("-").map(Number);
    const [endYear, endMonth, endDay] = vacationEnd.split("-").map(Number);

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    endDate.setHours(23, 59, 59, 999); // Inclusive end date

    const isCurrentVacation = todayDate >= startDate && todayDate <= endDate;

    if (isCurrentVacation) {
      // Check if this vacation period was already dismissed in the current session
      const dismissedUntil = localStorage.getItem("vacation_dismissed_until");
      if (dismissedUntil === vacationEnd) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
    }
  }, [vacationStart, vacationEnd]);

  const handleDismiss = () => {
    if (vacationEnd) {
      localStorage.setItem("vacation_dismissed_until", vacationEnd);
    }
    setIsOpen(false);
  };

  if (!isOpen || !vacationStart || !vacationEnd) return null;

  // Multi-language date formatter
  const formatDate = (dateStr: string, lang: string) => {
    const [year, month, day] = dateStr.split("-");
    if (lang === "hr") return `${day}.${month}.${year}.`;
    if (lang === "de") return `${day}.${month}.${year}`;
    if (lang === "it") return `${day}/${month}/${year}`;
    return `${month}/${day}/${year}`; // EN
  };

  const formattedStart = formatDate(vacationStart, language);
  const formattedEnd = formatDate(vacationEnd, language);

  // Multi-language messages
  const messages = {
    hr: {
      title: "Godišnji Odmor",
      text: `Bistro Top je na godišnjem odmoru i ne radi od ${formattedStart} do ${formattedEnd}.`,
      close: "Zatvori",
    },
    en: {
      title: "Vacation Notice",
      text: `Bistro Top is on vacation and will be closed from ${formattedStart} to ${formattedEnd}.`,
      close: "Close",
    },
    de: {
      title: "Urlaubshinweis",
      text: `Bistro Top ist im Urlaub und bleibt vom ${formattedStart} bis zum ${formattedEnd} geschlossen.`,
      close: "Schließen",
    },
    it: {
      title: "Avviso di Chiusura",
      text: `Bistro Top è in vacanza e rimarrà chiuso dal ${formattedStart} al ${formattedEnd}.`,
      close: "Chiudi",
    },
  };

  const msg = messages[language as keyof typeof messages] || messages.en;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDismiss}
          className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md bg-[#26201B] border border-[#DFB283]/20 rounded-2xl p-6 sm:p-8 text-center shadow-premium overflow-hidden"
        >
          {/* Subtle gold decoration bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DFB283] to-transparent" />

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1.5 rounded-full text-ivory-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
            aria-label="Dismiss"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {/* Icon */}
          <div className="mx-auto h-12 w-12 rounded-full bg-[#DFB283]/10 border border-[#DFB283]/20 flex items-center justify-center mb-5 text-[#DFB283]">
            <Calendar className="h-6 w-6" />
          </div>

          {/* Typography */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
            {msg.title}
          </h3>
          <p className="font-sans text-ivory-200 text-sm sm:text-base leading-relaxed mb-6 font-light">
            {msg.text}
          </p>

          {/* Dismiss action */}
          <button
            onClick={handleDismiss}
            className="w-full bg-[#DFB283] hover:bg-white text-chocolate-900 text-xs sm:text-sm uppercase tracking-widest font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-soft cursor-pointer"
          >
            {msg.close}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
