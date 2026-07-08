"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/utils/supabase";
import { FALLBACK_SITE_CONTENT } from "@/utils/fallbackData";

export type Language = "hr" | "en" | "it" | "de";

interface TranslationDictionary {
  navbar: {
    home: string;
    about: string;
    menu: string;
    contact: string;
  };
  hero: {
    accent: string;
    subtitle: string;
    desc: string;
    ctaMenu: string;
    ctaBook: string;
  };
  about: {
    tagline: string;
    title: string;
    desc: string;
    feature1_title: string;
    feature1_desc: string;
    feature2_title: string;
    feature2_desc: string;
    bottom_text: string;
    reviews_tagline: string;
    reviews_title: string;
    google_score: string;
  };
  menu: {
    tagline: string;
    title: string;
    subtitle: string;
    banner_subtitle: string;
    allergy_note: string;
    categories: {
      pizze: string;
      rostilj: string;
      peka: string;
      riba: string;
      predjela_deserti: string;
    };
  };
  footer: {
    contact_tagline: string;
    visit_us: string;
    address_title: string;
    address_value: string;
    hours_title: string;
    hours_weekdays: string;
    hours_sunday: string;
    logo_desc: string;
    copyright: string;
  };
  action_box: {
    reserve_title: string;
    reserve_subtitle: string;
    name_placeholder: string;
    guests_placeholder: string;
    date_placeholder: string;
    time_placeholder: string;
    reserve_btn: string;
    order_title: string;
    order_subtitle: string;
    contact_btn: string;
    whatsapp_template: string;
  };
}

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: TranslationDictionary;
  menuItems: any[];
  openingHours: any[];
  translateMenuItem: (item: { id: string; name: string; description: string }) => { name: string; description: string };
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({
  children,
  initialSiteContent,
  initialMenuItems,
  initialOpeningHours
}: {
  children: ReactNode;
  initialSiteContent: Record<string, any>;
  initialMenuItems: any[];
  initialOpeningHours: any[];
}) {
  const [language, setLanguage] = useState<Language>("hr");

  const [dict, setDict] = useState<TranslationDictionary>(() => {
    const key = "hr";
    const content = initialSiteContent[key] || initialSiteContent[key.toUpperCase()] || FALLBACK_SITE_CONTENT.HR;
    return content as TranslationDictionary;
  });

  useEffect(() => {
    async function loadTranslations() {
      try {
        console.log(`[LanguageContext] Querying Supabase for language: "${language}"...`);
        const { data, error } = await supabase
          .from("site_content")
          .select("*")
          .eq("language", language);

        if (error) throw error;

        if (data && data.length > 0) {
          // Deep clone the fallback dictionary for the current language
          const baseKey = language.toUpperCase() as keyof typeof FALLBACK_SITE_CONTENT;
          const baseDict = JSON.parse(JSON.stringify(FALLBACK_SITE_CONTENT[baseKey] || FALLBACK_SITE_CONTENT.HR));

          // Map flat keys from the database to the nested dictionary
          data.forEach((row) => {
            const parts = row.key.split(".");
            let current = baseDict;
            for (let i = 0; i < parts.length; i++) {
              const part = parts[i];
              if (i === parts.length - 1) {
                current[part] = row.value;
              } else {
                if (!current[part]) current[part] = {};
                current[part] = { ...current[part] };
                current = current[part];
              }
            }
          });

          setDict(baseDict as TranslationDictionary);
        } else {
          // If no rows, fall back to local fallback data
          const baseKey = language.toUpperCase() as keyof typeof FALLBACK_SITE_CONTENT;
          setDict((FALLBACK_SITE_CONTENT[baseKey] || FALLBACK_SITE_CONTENT.HR) as TranslationDictionary);
        }
      } catch (err) {
        console.error(`[LanguageContext] Failed to fetch site_content for "${language}":`, err);
        const baseKey = language.toUpperCase() as keyof typeof FALLBACK_SITE_CONTENT;
        setDict((FALLBACK_SITE_CONTENT[baseKey] || FALLBACK_SITE_CONTENT.HR) as TranslationDictionary);
      }
    }

    loadTranslations();
  }, [language]);

  const translateMenuItem = (item: { id: string; name: string; description: string }) => {
    if (language === "hr") {
      return { name: item.name, description: item.description };
    }
    
    // First try dynamic translations from database
    const dynamicName = (dict as any).menu?.item?.[item.id]?.name;
    const dynamicDesc = (dict as any).menu?.item?.[item.id]?.description;
    
    if (dynamicName || dynamicDesc) {
      return {
        name: dynamicName || item.name,
        description: dynamicDesc || item.description
      };
    }
    
    return { name: item.name, description: item.description };
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dict,
        menuItems: initialMenuItems,
        openingHours: initialOpeningHours,
        translateMenuItem
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
