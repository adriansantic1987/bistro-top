"use client";

import { Clock, MapPin, Phone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactInfo() {
  const whatsAppLink = "https://wa.me/38551221445?text=Pozdrav!%20%C5%BDelio%20bih%20rezervirati%20stol%20u%20Bistrou%20Top.%20Ime%20i%20prezime%3A%20%2C%20Broj%20ljudi%3A%20%2C%20Datum%20i%20vrijeme%3A%20";

  return (
    <section id="contact" className="py-24 bg-ivory-50 px-4 sm:px-6 lg:px-8 border-t border-ivory-200/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Info & Google Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div>
              <span className="text-xs sm:text-sm font-sans tracking-[0.2em] text-sea-600 uppercase font-semibold">
                Posjetite nas
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate-900 mt-3 mb-4">
                Kontakt & Lokacija
              </h2>
              <div className="h-0.5 w-16 bg-sea-600/80 rounded mb-6" />
            </div>

            {/* Details list */}
            <div className="space-y-5 flex-1">
              
              {/* Address */}
              <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-ivory-200 shadow-soft">
                <div className="p-2.5 bg-sea-50 text-sea-600 rounded-xl flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-chocolate-900 uppercase">Adresa</h4>
                  <a
                    href="https://maps.google.com/?q=Vela+Placa+3,+51500+Krk,+Croatia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-chocolate-850 font-sans font-light text-sm hover:text-sea-600 transition-colors"
                  >
                    Vela Placa 3, 51500 Krk, Hrvatska
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-ivory-200 shadow-soft">
                <div className="p-2.5 bg-sea-50 text-sea-600 rounded-xl flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-chocolate-900 uppercase">Radno vrijeme (Ljeto)</h4>
                  <div className="mt-0.5 space-y-0.5 text-chocolate-850 font-sans font-light text-sm">
                    <p className="flex justify-between w-48 sm:w-52">
                      <span>Pon - Sub:</span>
                      <span className="text-chocolate-900 font-normal">12:00 - 23:00</span>
                    </p>
                    <p className="flex justify-between w-48 sm:w-52">
                      <span>Nedjelja:</span>
                      <span className="text-chocolate-900 font-normal">12:00 - 22:00</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact numbers / email */}
              <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-ivory-200 shadow-soft">
                <div className="p-2.5 bg-sea-50 text-sea-600 rounded-xl flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-chocolate-900 uppercase">Kontakt za informacije</h4>
                  <div className="mt-0.5 space-y-0.5 text-chocolate-850 font-sans font-light text-sm">
                    <p>
                      <a href="tel:+38551221445" className="hover:text-sea-600 transition-colors">
                        +385 51 221 445
                      </a>
                    </p>
                    <p>
                      <a href="mailto:info@bistrotopkrk.com" className="hover:text-sea-600 transition-colors">
                        info@bistrotopkrk.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-[220px] rounded-2xl overflow-hidden border border-ivory-200 shadow-soft relative bg-ivory-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.785025700889!2d14.573617376594247!3d45.02619707107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4764a85b9a4c0c1b%3A0x6d90a6e87f8f9e0!2sVela%20Placa%203%2C%2051500%2C%20Krk%2C%20Croatia!5e0!3m2!1sen!2shr!4v1715000000000!5m2!1sen!2shr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bistro Top Krk Google Maps Location"
              ></iframe>
            </div>

          </motion.div>

          {/* Right Column: Overhauled Two-Action Booking Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-white border border-ivory-200 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-center shadow-soft relative"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-900 uppercase">
                  Rezervacija stola
                </h3>
                <p className="text-chocolate-850 font-sans font-light text-sm mt-2 leading-relaxed">
                  Želite osigurati svoje mjesto u našem bistrou? Odaberite jedan od dva brza načina rezervacije stola ispod. Odgovorit ćemo vam i potvrditi rezervaciju u najkraćem roku.
                </p>
              </div>

              {/* Action Buttons Container Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                
                {/* WhatsApp booking link */}
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BA56] active:scale-99 text-white font-sans font-semibold py-4 rounded-xl flex flex-col items-center justify-center space-y-2 shadow-soft hover:shadow-active transition-all duration-300 text-center cursor-pointer p-4 border border-white/10"
                >
                  <svg className="h-7 w-7 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.727-1.465L0 24zm6.59-4.846c1.665.988 3.311 1.488 4.96.16 6.305-.28 11.442-5.41 11.446-11.725.002-3.003-1.168-5.83-3.292-7.957C17.639 2.505 14.808 1.332 11.8 1.333c-5.918 0-10.732 4.81-10.736 10.735-.001 1.914.502 3.784 1.457 5.438L1.47 21.65l4.316-1.579c1.6.877 3.4 1.332 5.093 1.332h.004-.002zm12.336-8.918c-.328-.164-1.94-.959-2.241-1.07-.3-.11-.518-.165-.738.165-.219.329-.85 1.07-.1.042-.15.19-.328.329-.657.165-.328 0-.656-.164-.329-.164-.33-.163-.656.329-1.637.33-.984.001-1.64.001-.82-.656-.328-.656-.328-1.748-1.07-2.32-.657-.573-1.256-.466-1.72-.055-.466-.411-.902-.821-1.229-.821-.328 0-.656-.164-.82.164-.164.329-.656 1.638-.656 1.638s.163.33.328.657c.164.328.492.656.82.82.328.164 1.15.82 2.3.985.49.07 1.05.08 1.54.04 1.31-.09 2.45-.66 2.87-1.39.42-.73.42-1.37.28-1.54-.14-.17-.518-.329-.848-.493z" />
                  </svg>
                  <span className="text-sm font-bold">Rezerviraj putem WhatsAppa</span>
                  <span className="text-[10px] opacity-80 font-normal">Otvara WhatsApp s predloškom poruke</span>
                </a>

                {/* Call reservation link */}
                <a
                  href="tel:+38551221445"
                  className="bg-sea-600 hover:bg-sea-700 active:scale-99 text-white font-sans font-semibold py-4 rounded-xl flex flex-col items-center justify-center space-y-2 shadow-soft hover:shadow-active transition-all duration-300 text-center cursor-pointer p-4 border border-white/10"
                >
                  <Phone className="h-7 w-7 text-white" />
                  <span className="text-sm font-bold">Rezerviraj pozivom</span>
                  <span className="text-[10px] opacity-80 font-normal">Izravan telefonski poziv</span>
                </a>

              </div>

              {/* Informational Tip box */}
              <div className="bg-ivory-100/50 p-4 rounded-xl border border-ivory-200 mt-6 flex items-start space-x-3 text-left">
                <MessageSquare className="h-5 w-5 text-sea-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-chocolate-800 font-sans font-light leading-relaxed">
                  <strong className="font-semibold text-chocolate-900">Napomena za WhatsApp:</strong> Klikom na gumb otvorit će se chat s unaprijed unesenom porukom. Samo upišite svoje ime, broj gostiju i željeni termin rezervacije te pošaljite poruku.
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
