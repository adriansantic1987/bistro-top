"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Pizza, Flame, Utensils } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { dict } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center bg-chocolate-900 px-4 pt-32 pb-44 sm:pt-40 sm:pb-52 overflow-hidden"
    >
      {/* Cinematic Full-Bleed Background Image */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1920&q=80"
          alt="Bistro Top Wood-Fired Pizza Oven Ambient"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-102"
        />
        {/* Deep Warm/Dark Tinted Overlay for high text readability */}
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Clean Centered Typography Content Area (No Container Boxes) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-6 sm:space-y-8 px-4">
        
        <div className="space-y-3 sm:space-y-4">
          {/* Accent Label */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm font-sans tracking-[0.25em] text-[#DFB283] uppercase font-semibold block"
          >
            {dict.hero.accent}
          </motion.span>
          
          {/* Massive Luxurious Serif Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-serif text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-none uppercase"
          >
            Bistro Top
          </motion.h1>
        </div>

        {/* Clean subtitle value proposition (pizzas, grill, rich portions) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl sm:text-2xl lg:text-3xl text-ivory-100 font-serif font-medium leading-relaxed max-w-3xl"
        >
          {dict.hero.subtitle}
        </motion.p>

        {/* Description Text block */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base text-white/80 font-sans font-light max-w-2xl leading-relaxed"
        >
          {dict.hero.desc}
        </motion.p>

        {/* Tightly Spaced Grouped Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
        >
          <a
            href="#menu"
            className="group flex items-center justify-center space-x-2 bg-[#C1682B] hover:bg-[#A9551E] text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 ease-in-out hover:shadow-active cursor-pointer"
          >
            <span>{dict.hero.ctaMenu}</span>
            <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center bg-[#C1682B]/10 hover:bg-[#C1682B]/20 border border-[#C1682B] text-[#DFB283] hover:text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 ease-in-out cursor-pointer"
          >
            {dict.hero.ctaBook}
          </a>
        </motion.div>

      </div>

      {/* Floating Silhouette Icon Section Breakers representing good food */}
      <div className="absolute bottom-[16%] left-[8%] z-20 text-white/10 hidden md:block select-none pointer-events-none transform -rotate-12">
        <Pizza size={90} strokeWidth={1} />
      </div>
      <div className="absolute bottom-[14%] right-[10%] z-20 text-white/10 hidden md:block select-none pointer-events-none transform rotate-12">
        <Flame size={90} strokeWidth={1} />
      </div>
      <div className="absolute bottom-[18%] right-[40%] z-20 text-white/10 hidden md:block select-none pointer-events-none transform rotate-6">
        <Utensils size={80} strokeWidth={1} />
      </div>

      {/* Fluid Gradient Bleed Overflow washing down into the next soft ivory section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-ivory-100/50 dark:to-[#1A1512]/50 z-10 pointer-events-none" />
    </section>
  );
}
