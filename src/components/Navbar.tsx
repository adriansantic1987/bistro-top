"use client";

import { useState, useEffect } from "react";
import { Menu, X, Utensils, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { language, setLanguage, dict } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: dict.navbar.home, href: "#home" },
    { name: dict.navbar.about, href: "#about" },
    { name: dict.navbar.menu, href: "#menu" },
    { name: dict.navbar.contact, href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-ivory-50/85 dark:bg-[#1A1512]/95 border-b border-ivory-200/50 dark:border-chocolate-850/40 py-3 shadow-soft dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2 group">
              <Utensils
                className={`h-6 w-6 transition-transform duration-300 group-hover:rotate-12 ${
                  isScrolled ? "text-sea-600 dark:text-sea-200" : "text-sea-200"
                }`}
              />
              <span
                className={`font-serif text-xl sm:text-2xl font-bold tracking-wide transition-all duration-300 ease-in-out ${
                  isScrolled ? "text-chocolate-900 dark:text-ivory-100" : "text-white"
                }`}
              >
                Bistro Top
              </span>
            </a>

            {/* Desktop Navigation - Text Links & Minimal Dropdown Selector */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6 lg:space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`font-sans text-sm font-semibold tracking-wide transition-all duration-300 ease-in-out ${
                      isScrolled
                        ? "text-chocolate-850 dark:text-ivory-200 hover:text-sea-600 dark:hover:text-sea-200"
                        : "text-ivory-100 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${
                  isScrolled
                    ? "text-chocolate-850 dark:text-ivory-200 hover:text-sea-600 dark:hover:text-sea-200 hover:bg-chocolate-100/40 dark:hover:bg-chocolate-850/50"
                    : "text-ivory-100 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-4.5 w-4.5" />
                ) : (
                  <Moon className="h-4.5 w-4.5" />
                )}
              </button>

              {/* Language Dropdown Selector */}
              <div className="relative inline-block text-left border-l border-ivory-300/30 dark:border-chocolate-800/30 pl-4">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                  className={`flex items-center space-x-1 font-sans text-xs tracking-wider uppercase font-bold cursor-pointer focus:outline-none transition-all duration-300 ease-in-out ${
                    isScrolled
                      ? "text-chocolate-900 dark:text-ivory-100 hover:text-sea-600 dark:hover:text-sea-200"
                      : "text-white hover:text-sea-250"
                  }`}
                >
                  <span>{language.toUpperCase()}</span>
                  <span className="text-[9px] opacity-70">▼</span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-16 bg-white dark:bg-[#26201B] border border-ivory-200 dark:border-chocolate-850/50 rounded-xl shadow-premium dark:shadow-none py-1.5 z-50 text-center flex flex-col justify-start"
                    >
                      {(["hr", "en", "it", "de"] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setDropdownOpen(false);
                          }}
                          className={`w-full py-1.5 text-xs font-sans font-bold uppercase transition-all duration-300 ease-in-out cursor-pointer ${
                            language === lang
                              ? "text-sea-600 dark:text-sea-200 bg-ivory-50 dark:bg-chocolate-900/50"
                              : "text-chocolate-850 dark:text-ivory-200 hover:text-chocolate-900 dark:hover:text-white hover:bg-ivory-50/50 dark:hover:bg-chocolate-850/50"
                          }`}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Actions (Theme Toggle & Menu Button) */}
            <div className="md:hidden flex items-center space-x-1.5">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${
                  isScrolled
                    ? "text-chocolate-850 dark:text-ivory-200 hover:text-sea-600 dark:hover:text-sea-200 hover:bg-chocolate-100/40 dark:hover:bg-chocolate-850/50"
                    : "text-ivory-100 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-4.5 w-4.5" />
                ) : (
                  <Moon className="h-4.5 w-4.5" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 focus:outline-none transition-all duration-300 ease-in-out ${
                  isScrolled ? "text-chocolate-900 dark:text-ivory-100 hover:text-sea-600 dark:hover:text-sea-200" : "text-white hover:text-sea-200"
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 top-[60px] z-40 bg-sea-800/98 backdrop-blur-lg md:hidden flex flex-col justify-center px-6 py-12 border-t border-sea-700/50"
          >
            <nav className="flex flex-col space-y-8 items-center text-center">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif text-white hover:text-sea-200 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile Language Selector */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="flex items-center space-x-4 pt-6 border-t border-white/10 w-32 justify-center"
              >
                {(["hr", "en", "it", "de"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`font-sans text-sm font-bold uppercase transition-colors cursor-pointer ${
                      language === lang ? "text-sea-200 underline underline-offset-4" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
