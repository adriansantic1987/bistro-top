"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Utensils, Instagram, Facebook, Twitter, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const labelWho = {
  hr: "Tko dolazi?",
  en: "Who is coming?",
  it: "Chi viene?",
  de: "Wer kommt?"
};

const labelWhen = {
  hr: "Kada dolazite?",
  en: "When are you coming?",
  it: "Quando arrivate?",
  de: "Wann kommen Sie?"
};

const openInMapsTranslations = {
  hr: "Otvori u Kartama",
  en: "Open in Maps",
  it: "Apri in Mappe",
  de: "In Maps öffnen"
};

const whatsappNote = {
  hr: "Klikom na gumb otvorit će se chat s unaprijed unesenom porukom. Samo upišite svoje ime, broj gostiju i željeni termin rezervacije te pošaljite poruku.",
  en: "Clicking the button will open a chat with a pre-filled message. Just enter your name, number of guests, and desired reservation time, then send the message.",
  it: "Cliccando sul pulsante si aprirà una chat con un messaggio precompilato. Inserisci il tuo nome, il numero di ospiti e l'orario di prenotazione desiderato, quindi invia il messaggio.",
  de: "Durch Klicken auf die Schaltfläche wird ein Chat mit einer vorausgefüllten Nachricht geöffnet. Geben Sie einfach Ihren Namen, die Anzahl der Gäste und die gewünschte Reservierungszeit ein und senden Sie die Nachricht."
};

const whatsappNoteTitle = {
  hr: "Napomena za WhatsApp:",
  en: "Note for WhatsApp:",
  it: "Nota per WhatsApp:",
  de: "Hinweis für WhatsApp:"
};

export default function Footer() {
  const { dict, language, openingHours } = useLanguage();
  const [userName, setUserName] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");


  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", name: "Instagram" },
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com", name: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", name: "Twitter" },
  ];

  const quickLinks = [
    { name: dict.navbar.home, href: "#home" },
    { name: dict.navbar.about, href: "#about" },
    { name: dict.navbar.menu, href: "#menu" },
    { name: dict.navbar.contact, href: "#contact" },
  ];

  const [isBooking, setIsBooking] = useState(false);

  const handleWhatsAppBooking = async () => {
    if (isBooking) return;
    setIsBooking(true);
    let reservationId = "";

    try {
      if (userName && guestCount && bookingDate && bookingTime) {
        const res = await fetch("/api/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName,
            guests: guestCount,
            date: bookingDate,
            time: bookingTime
          })
        });
        if (res.ok) {
          const data = await res.json();
          reservationId = data.id;
        }
      }
    } catch (err) {
      console.warn("[Footer Booking] Failed to save reservation to Supabase, falling back to direct link:", err);
    }

    // Compile dynamic WhatsApp pre-filled template replacing tags
    const template = dict.action_box.whatsapp_template;
    let text = template
      .replace("{name}", userName)
      .replace("{guests}", guestCount)
      .replace("{date}", bookingDate)
      .replace("{time}", bookingTime);

    if (reservationId) {
      const baseUrl = window.location.origin;
      const confirmUrl = `${baseUrl}/api/reservations/confirm?id=${reservationId}&status=approved&lang=${language}`;
      const rejectUrl = `${baseUrl}/api/reservations/confirm?id=${reservationId}&status=rejected&lang=${language}`;
      
      text += `\n\n--- ODOBRENJE REZERVACIJE ---\n🟢 ODOBRI STOL: ${confirmUrl}\n❌ ODBIJ / PUNO: ${rejectUrl}`;
    }

    const encodedText = encodeURIComponent(text);
    const link = `https://wa.me/38551221445?text=${encodedText}`;
    window.open(link, "_blank");
    setIsBooking(false);
  };

  return (
    <footer id="contact" className="bg-ivory-100 dark:bg-[#1A1512] border-t border-ivory-200/60 dark:border-chocolate-850/40 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
           {/* Left Column: Address, Hours, & Google Map */}
          <motion.div
            id="footer-contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div>
              <span className="text-xs sm:text-sm font-sans tracking-[0.2em] text-sea-600 dark:text-sea-250 uppercase font-semibold">
                {dict.footer.contact_tagline}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate-900 dark:text-ivory-50 mt-3 mb-4">
                {dict.footer.visit_us}
              </h2>
              <div className="h-0.5 w-16 bg-sea-600/80 dark:bg-sea-600 rounded" />
            </div>

            {/* Hours & Address Cards */}
            <div className="space-y-4 flex-1">
              
              {/* Address */}
              <div className="bg-white dark:bg-[#26201B] p-5 rounded-2xl border border-ivory-200 dark:border-chocolate-850/50 shadow-soft dark:shadow-none">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-[#8B5A2B] dark:text-[#DFB283] flex-shrink-0" />
                  <h4 className="font-serif text-base font-semibold text-chocolate-900 dark:text-ivory-100 uppercase">
                    {dict.footer.address_title}
                  </h4>
                </div>
                <div className="mt-2.5 pl-7">
                  <a
                    href="https://maps.google.com/?q=Vela+Placa+3,+51500+Krk,+Croatia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-chocolate-850 dark:text-ivory-200 font-sans font-light text-sm hover:text-sea-600 dark:hover:text-sea-250 transition-colors"
                  >
                    {dict.footer.address_value}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white dark:bg-[#26201B] p-5 rounded-2xl border border-ivory-200 dark:border-chocolate-850/50 shadow-soft dark:shadow-none">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-[#8B5A2B] dark:text-[#DFB283] flex-shrink-0" />
                  <h4 className="font-serif text-base font-semibold text-chocolate-900 dark:text-ivory-100 uppercase">
                    {dict.footer.hours_title}
                  </h4>
                </div>
                <div className="mt-2.5 pl-7 text-chocolate-850 dark:text-ivory-200 font-sans font-light text-sm space-y-1">
                  {openingHours && openingHours.map((h: any) => (
                    <p key={h.id || h.day_group} className="flex justify-between w-48 sm:w-52">
                      <span>{h.day_group}:</span>
                      <span className="text-chocolate-900 dark:text-white font-normal">
                        {h.open_time} - {h.close_time}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

            </div>

            {/* Embedded Google Map */}
            <div className="relative w-full h-[220px] rounded-2xl overflow-hidden border border-ivory-200 dark:border-chocolate-850/50 shadow-soft dark:shadow-none bg-white dark:bg-[#26201B] p-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.785025700889!2d14.573617376594247!3d45.02619707107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4764a85b9a4c0c1b%3A0x6d90a6e87f8f9e0!2sVela%20Placa%203%2C%2051500%2C%20Krk%2C%20Croatia!5e0!3m2!1sen!2shr!4v1715000000000!5m2!1sen!2shr"
                width="100%"
                height="100%"
                style={{ 
                  border: 0
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bistro Top Krk Google Maps Location"
                className="rounded-xl dark:invert-[90%] dark:hue-rotate-[180deg] dark:contrast-[85%] dark:brightness-[90%]"
              ></iframe>
              
              {/* Custom 'Open in Maps' Button overlay */}
              <div className="absolute bottom-3 right-3 z-10">
                <a
                  href="https://maps.google.com/?q=Vela+Placa+3,+51500+Krk,+Croatia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-chocolate-900 dark:bg-chocolate-800 hover:bg-chocolate-850 dark:hover:bg-chocolate-700 active:scale-[0.99] text-white font-sans text-[10px] font-semibold px-3.5 py-2 rounded-lg shadow-soft hover:shadow-active transition-all duration-300 uppercase tracking-wider block"
                >
                  {openInMapsTranslations[language] || "Otvori u Kartama"}
                </a>
              </div>
            </div>

          </motion.div>

           {/* Right Column: Quiet Luxury Action Box (With spacing refinements) */}
          <motion.div
            id="footer-booking"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-white dark:bg-[#26201B] border border-ivory-200 dark:border-chocolate-850/50 rounded-3xl px-8 pt-8 pb-8 shadow-soft dark:shadow-none flex flex-col justify-between space-y-8 text-center animate-fade-in"
          >
            {/* Upper Section - Exclusive to Reservations (Tightly Grouped at the Top) */}
            <div className="space-y-4 flex flex-col justify-start w-full">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate-900 dark:text-ivory-50 uppercase tracking-wide">
                  {dict.action_box.reserve_title}
                </h3>
                <p className="text-chocolate-850 dark:text-ivory-200 font-sans font-light text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                  {dict.action_box.reserve_subtitle}
                </p>
              </div>
              
              {/* Grouped Input Fields with Micro-Labels */}
              <div className="space-y-6 w-full pt-1 text-left">
                
                {/* Group 1: Tko dolazi? */}
                <div className="space-y-2.5">
                  <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8B5A2B] dark:text-[#DFB283]">
                    {labelWho[language] || "Tko dolazi?"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder={dict.action_box.name_placeholder}
                      className="w-full bg-transparent border-b border-[#E6D5C3] dark:border-chocolate-800 focus:border-chocolate-900 dark:focus:border-ivory-100 outline-none pb-2 text-chocolate-900 dark:text-ivory-100 font-sans text-xs transition-colors duration-200 placeholder:text-chocolate-200/50 dark:placeholder:text-ivory-300/35 rounded-none px-1"
                    />
                    <input
                      type="text"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      placeholder={dict.action_box.guests_placeholder}
                      className="w-full bg-transparent border-b border-[#E6D5C3] dark:border-chocolate-800 focus:border-chocolate-900 dark:focus:border-ivory-100 outline-none pb-2 text-chocolate-900 dark:text-ivory-100 font-sans text-xs transition-colors duration-200 placeholder:text-chocolate-200/50 dark:placeholder:text-ivory-300/35 rounded-none px-1"
                    />
                  </div>
                </div>

                {/* Group 2: Kada dolazite? */}
                <div className="space-y-2.5">
                  <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8B5A2B] dark:text-[#DFB283]">
                    {labelWhen[language] || "Kada dolazite?"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <input
                      type="text"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      placeholder={dict.action_box.date_placeholder}
                      onFocus={(e) => (e.currentTarget.type = "date")}
                      onBlur={(e) => {
                        if (!e.currentTarget.value) e.currentTarget.type = "text";
                      }}
                      className="w-full bg-transparent border-b border-[#E6D5C3] dark:border-chocolate-800 focus:border-chocolate-900 dark:focus:border-ivory-100 outline-none pb-2 text-chocolate-900 dark:text-ivory-100 font-sans text-xs transition-colors duration-200 placeholder:text-chocolate-200/50 dark:placeholder:text-ivory-300/35 rounded-none px-1"
                    />
                    <input
                      type="text"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      placeholder={dict.action_box.time_placeholder}
                      onFocus={(e) => (e.currentTarget.type = "time")}
                      onBlur={(e) => {
                        if (!e.currentTarget.value) e.currentTarget.type = "text";
                      }}
                      className="w-full bg-transparent border-b border-[#E6D5C3] dark:border-chocolate-800 focus:border-chocolate-900 dark:focus:border-ivory-100 outline-none pb-2 text-chocolate-900 dark:text-ivory-100 font-sans text-xs transition-colors duration-200 placeholder:text-chocolate-200/50 dark:placeholder:text-ivory-300/35 rounded-none px-1"
                    />
                  </div>
                </div>

              </div>

              {/* Quiet Luxury WhatsApp Booking Button */}
              <button
                onClick={handleWhatsAppBooking}
                disabled={isBooking}
                className="w-full bg-chocolate-900 dark:bg-[#C1682B] hover:bg-chocolate-850 dark:hover:bg-[#A9551E] active:scale-[0.99] text-white font-sans font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-soft hover:shadow-active transition-all duration-300 cursor-pointer text-xs sm:text-sm border border-transparent uppercase tracking-wider disabled:opacity-50 disabled:pointer-events-none"
              >
                {isBooking ? (
                  <span>
                    {
                      {
                        hr: "Slanje...",
                        en: "Sending...",
                        de: "Senden...",
                        it: "Invio..."
                      }[language] || "Sending..."
                    }
                  </span>
                ) : (
                  <>
                    <svg className="h-4 w-4 fill-white flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.727-1.465L0 24zm6.59-4.846c1.665.988 3.311 1.488 4.96.16 6.305-.28 11.442-5.41 11.446-11.725.002-3.003-1.168-5.83-3.292-7.957C17.639 2.505 14.808 1.332 11.8 1.333c-5.918 0-10.732 4.81-10.736 10.735-.001 1.914.502 3.784 1.457 5.438L1.47 21.65l4.316-1.579c1.6.877 3.4 1.332 5.093 1.332h.004-.002zm12.336-8.918c-.328-.164-1.94-.959-2.241-1.07-.3-.11-.518-.165-.738.165-.219.329-.85 1.07-.1.042-.15.19-.328.329-.657.165-.328 0-.656-.164-.329-.164-.33-.163-.656.329-1.637.33-.984.001-1.64.001-.82-.656-.328-.656-.328-1.748-1.07-2.32-.657-.573-1.256-.466-1.72-.055-.466-.411-.902-.821-1.229-.821-.328 0-.656-.164-.82.164-.164.329-.656 1.638-.656 1.638s.163.33.328.657c.164.328.492.656.82.82.328.164 1.15.82 2.3.985.49.07 1.05.08 1.54.04 1.31-.09 2.45-.66 2.87-1.39.42-.73.42-1.37.28-1.54-.14-.17-.518-.329-.848-.493z" />
                    </svg>
                    <span>{dict.action_box.reserve_btn}</span>
                  </>
                )}
              </button>
            </div>
 
            {/* Informational Tip box */}
            <div className="bg-ivory-100/50 dark:bg-[#1A1512]/50 p-4 rounded-xl border border-ivory-200 dark:border-chocolate-850/50 mt-6 flex items-start space-x-3 text-left">
              <Phone className="h-5 w-5 text-sea-600 dark:text-sea-250 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-chocolate-800 dark:text-ivory-300 font-sans font-light leading-relaxed">
                <strong className="font-semibold text-chocolate-900 dark:text-ivory-100">{whatsappNoteTitle[language] || "Napomena za WhatsApp:"}</strong> {whatsappNote[language]}
              </p>
            </div>

            {/* Lower Section - Exclusive to Phone Orders & Delivery (Anchored & nudged further upward) */}
            <div className="space-y-4 w-full -translate-y-2 mb-2 pb-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate-900 dark:text-ivory-50 uppercase tracking-wide">
                {dict.action_box.order_title}
              </h3>
              
              <p className="text-chocolate-850 dark:text-ivory-200 font-sans font-light text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
                {dict.action_box.order_subtitle}
              </p>

              {/* Quiet Luxury Voice Contact Button */}
              <a
                href="tel:+38551221445"
                className="w-full border border-chocolate-900 dark:border-[#C1682B] text-chocolate-900 dark:text-[#DFB283] hover:bg-chocolate-900 dark:hover:bg-[#C1682B] hover:text-white dark:hover:text-white active:scale-[0.99] font-sans font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2.5 shadow-soft hover:shadow-active transition-all duration-300 cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
              >
                <Phone className="h-4.5 w-4.5 flex-shrink-0" />
                <span>{dict.action_box.contact_btn}</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Subfooter (Brand copyright, links, and socials) */}
        <div className="border-t border-ivory-200/50 dark:border-chocolate-850/40 pt-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <a href="#home" className="flex items-center space-x-2 group">
              <Utensils className="h-5 w-5 text-sea-600 dark:text-sea-250 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-serif text-lg font-bold tracking-wide text-chocolate-900 dark:text-ivory-100">
                Bistro Top
              </span>
            </a>
            <p className="text-chocolate-800 dark:text-ivory-300 font-sans font-light text-xs">
              {dict.footer.logo_desc}
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center space-x-6 sm:space-x-8">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-chocolate-850 dark:text-ivory-200 hover:text-sea-600 dark:hover:text-sea-250 font-sans text-sm font-semibold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex space-x-4 justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-chocolate-700 dark:text-ivory-200 hover:text-white p-2.5 bg-white dark:bg-[#26201B] border border-ivory-200 dark:border-chocolate-850/50 shadow-soft hover:bg-sea-600 dark:hover:bg-sea-600 rounded-full transition-all duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

        </div>

        {/* Copyright info */}
        <div className="pt-4 flex items-center justify-center text-chocolate-700/50 dark:text-ivory-300/30 font-sans text-xs font-light">
          <p>
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
        </div>

      </div>
    </footer>
  );
}
