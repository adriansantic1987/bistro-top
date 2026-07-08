"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/utils/supabase";
import { FALLBACK_SITE_CONTENT } from "@/utils/fallbackData";
import useSWR from "swr";

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
  vacationStart: string | null;
  vacationEnd: string | null;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({
  children,
  initialSiteContent,
  initialMenuItems,
  initialOpeningHours,
  initialSettings
}: {
  children: ReactNode;
  initialSiteContent: Record<string, any>;
  initialMenuItems: any[];
  initialOpeningHours: any[];
  initialSettings?: { vacation_start: string | null; vacation_end: string | null };
}) {
  const [language, setLanguage] = useState<Language>("hr");

  const [dict, setDict] = useState<TranslationDictionary>(() => {
    const key = "hr";
    const content = initialSiteContent[key] || initialSiteContent[key.toUpperCase()] || FALLBACK_SITE_CONTENT.HR;
    return content as TranslationDictionary;
  });

  // Fetch site content dynamically via SWR to silently update translations and settings in background
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: liveData } = useSWR("/api/site_content", fetcher, {
    fallbackData: {
      siteContent: [],
      settings: initialSettings || { vacation_start: null, vacation_end: null }
    },
    revalidateOnFocus: false
  });

  const settings = liveData?.settings || initialSettings || { vacation_start: null, vacation_end: null };
  const vacationStart = settings.vacation_start;
  const vacationEnd = settings.vacation_end;

  // Reactively rebuild translation dictionary when language or liveData updates
  useEffect(() => {
    const baseKey = language.toUpperCase() as keyof typeof FALLBACK_SITE_CONTENT;
    let baseDict = JSON.parse(JSON.stringify(FALLBACK_SITE_CONTENT[baseKey] || FALLBACK_SITE_CONTENT.HR));

    // 1. Merge in server-side cached values if available
    const serverLangContent = initialSiteContent[language.toUpperCase()] || initialSiteContent[language];
    if (serverLangContent) {
      const mergeDeep = (target: any, source: any) => {
        for (const key in source) {
          if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            mergeDeep(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        }
      };
      mergeDeep(baseDict, serverLangContent);
    }

    // 2. Override with fresh SWR database values
    if (liveData?.siteContent && Array.isArray(liveData.siteContent)) {
      const langRows = liveData.siteContent.filter(
        (row: any) => row.language.toLowerCase() === language.toLowerCase()
      );
      langRows.forEach((row: any) => {
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
    }

    setDict(baseDict as TranslationDictionary);
  }, [language, liveData, initialSiteContent]);

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
        translateMenuItem,
        vacationStart,
        vacationEnd
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
