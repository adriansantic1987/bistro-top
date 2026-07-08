"use client";

import { motion } from "framer-motion";
import { MenuItemType } from "@/data/menuData";
import { useLanguage } from "@/context/LanguageContext";

interface MenuItemProps {
  item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProps) {
  const { translateMenuItem } = useLanguage();
  const { name, description } = translateMenuItem(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex items-baseline justify-between py-4 border-b border-dotted border-ivory-300 dark:border-chocolate-800/30"
    >
      {/* Left Details: Title & Ingredients */}
      <div className="pr-6 flex-1">
        <h4 className="font-serif text-base sm:text-lg font-bold text-chocolate-900 dark:text-ivory-100">
          {name}
        </h4>
        <p className="text-xs sm:text-sm text-chocolate-700 dark:text-ivory-300 font-light italic mt-1 font-sans">
          {description}
        </p>
      </div>

      {/* Right Price */}
      <div className="font-sans font-bold text-base sm:text-lg text-chocolate-900 dark:text-ivory-100 whitespace-nowrap pl-4">
        {(typeof item.price === "number" ? item.price : parseFloat(item.price) || 0).toFixed(2)} €
      </div>
    </motion.div>
  );
}
