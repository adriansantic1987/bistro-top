"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/data/menuData";
import MenuItem from "./MenuItem";
import { useLanguage } from "@/context/LanguageContext";
import useSWR from "swr";

const CATEGORY_BANNERS: Record<string, string> = {
  pizze: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85",
  rostilj: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
  peka: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=1200&q=85",
  riba: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=1200&q=85",
  predjela_deserti: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=1200&q=85",
};

export default function MenuSection() {
  const { dict, menuItems: fallbackItems } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("pizze");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: rawMenuItems } = useSWR("/api/menu_items", fetcher, {
    fallbackData: fallbackItems,
    revalidateOnFocus: false
  });

  const menuItems = Array.isArray(rawMenuItems) ? rawMenuItems : fallbackItems;

  const filteredItems = menuItems.filter(
    (item: any) => item.category === activeCategory && item.active
  );

  return (
    <section id="menu" className="py-24 bg-ivory-50 dark:bg-[#1A1512] px-4 sm:px-6 lg:px-8 border-t border-ivory-200/50 dark:border-chocolate-850/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-sans tracking-[0.2em] text-sea-600 dark:text-sea-250 uppercase font-semibold">
            {dict.menu.tagline}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate-900 dark:text-ivory-100 mt-3 mb-4 font-black">
            {dict.menu.title}
          </h2>
          <div className="h-0.5 w-16 bg-sea-600 dark:bg-sea-600 mx-auto rounded mb-4" />
          <p className="text-chocolate-850 dark:text-ivory-200 font-sans font-light text-sm sm:text-base leading-relaxed">
            {dict.menu.subtitle}
          </p>
        </div>

        {/* Categories Tab Bar (Mobile Horizontally Scrollable) */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 overflow-x-auto pb-3 sm:pb-0 scrollbar-none w-full max-w-5xl justify-start sm:justify-center px-2 flex-nowrap">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory;
              const displayName = dict.menu.categories[cat.id as keyof typeof dict.menu.categories] || cat.name;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex-shrink-0 px-6 py-3.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide uppercase transition-all duration-300 focus:outline-none cursor-pointer ${
                    isActive ? "text-white" : "text-chocolate-800 dark:text-ivory-200 hover:text-chocolate-900 dark:hover:text-white hover:bg-ivory-100 dark:hover:bg-[#26201B]"
                  }`}
                >
                  {/* Sliding Background Highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-sea-600 rounded-full z-0"
                    />
                  )}
                  <span className="relative z-10">{displayName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Category Atmosphere Banner */}
        <div className="relative w-full h-[200px] sm:h-[300px] md:h-[350px] mb-12 sm:mb-16 overflow-hidden rounded-2xl border border-ivory-200/50 dark:border-chocolate-850/40 shadow-soft dark:shadow-none bg-ivory-100 dark:bg-[#26201B]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={CATEGORY_BANNERS[activeCategory]}
                alt={`${activeCategory} Showcase`}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-900/70 via-chocolate-900/30 to-transparent" />
              
              {/* Overlay Title */}
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-left">
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white uppercase tracking-wider">
                  {dict.menu.categories[activeCategory as keyof typeof dict.menu.categories] || activeCategory}
                </h3>
                <p className="text-chocolate-50/80 font-sans text-xs sm:text-sm mt-1 sm:mt-2 font-light">
                  {dict.menu.banner_subtitle}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text-Based Menu Rows split into two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* Dietary Note */}
        <div className="mt-16 text-center">
          <p className="text-xs sm:text-sm text-chocolate-700/60 dark:text-ivory-300/40 font-sans">
            {dict.menu.allergy_note}
          </p>
        </div>

      </div>
    </section>
  );
}
