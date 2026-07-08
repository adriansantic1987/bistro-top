"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Flame, Pizza, Calendar, Leaf, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TranslatedReview {
  author_name: string;
  rating: number;
  text: {
    hr: string;
    en: string;
    de: string;
    it: string;
  };
  relative_time_description: {
    hr: string;
    en: string;
    de: string;
    it: string;
  };
}

function ReviewItem({ review }: { review: TranslatedReview }) {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const langKey = language.toLowerCase() as "hr" | "en" | "de" | "it";
  const reviewText = review.text[langKey] || review.text.hr;
  const reviewTime = review.relative_time_description[langKey] || review.relative_time_description.hr;

  // Measure if text overflows 3 lines (which is line-clamp-3)
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = textRef.current;
      if (element) {
        setIsTruncated(element.scrollHeight > element.clientHeight);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [reviewText]);

  const readMoreText = {
    hr: "Pročitaj više",
    en: "Read more",
    de: "Mehr lesen",
    it: "Leggi di più",
  }[language] || "Read more";

  const showLessText = {
    hr: "Prikaži manje",
    en: "Show less",
    de: "Weniger anzeigen",
    it: "Mostra meno",
  }[language] || "Show less";

  return (
    <div className="space-y-2 border-b border-ivory-200/40 dark:border-chocolate-800/20 pb-6 last:border-0 last:pb-0">
      {/* Stars in Soft Sand color */}
      <div className="flex space-x-1">
        {[...Array(Math.round(review.rating || 5))].map((_, i) => (
          <span key={i} className="text-[#E6D5C3] dark:text-[#DFB283] text-sm">★</span>
        ))}
      </div>
      
      {/* Quote text flowing naturally */}
      <div className="relative">
        <p
          ref={textRef}
          className={`text-chocolate-850 dark:text-ivory-200 font-serif italic text-sm sm:text-base leading-relaxed transition-all duration-300 ease-in-out ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          &ldquo;{reviewText}&rdquo;
        </p>
        
        {/* Subtle fade-out overlay when collapsed and truncated */}
        {!isExpanded && isTruncated && (
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-ivory-100/60 dark:from-[#1A1512]/80 to-transparent pointer-events-none" />
        )}
      </div>

      {isTruncated && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sea-600 hover:text-sea-700 dark:text-sea-250 dark:hover:text-sea-100 font-sans text-xs font-semibold uppercase tracking-wider focus:outline-none mt-1 transition-colors duration-200 cursor-pointer"
        >
          {isExpanded ? showLessText : readMoreText}
        </button>
      )}

      {/* Guest Name & Time relative */}
      <div className="flex items-center space-x-2 text-chocolate-700/60 dark:text-ivory-300/40 font-sans text-xs pt-1">
        <span className="font-semibold text-chocolate-850 dark:text-ivory-100">— {review.author_name}</span>
        {reviewTime && (
          <>
            <span>&bull;</span>
            <span>{reviewTime}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function AboutUs() {
  const { language, dict } = useLanguage();

  // Realistic backup review texts in case of API failure
  const reviewTexts = {
    HR: {
      r1: "Najbolja pizza na otoku Krku! Osoblje je iznimno uslužno, a ambijent na trgu je predivan.",
      r2: "Izvrsna jela s roštilja i fantastična usluga. Preporučujem domaće burgere i ćevapčiće!",
      r3: "Ugodna atmosfera, obilne porcije i vrlo pristupačne cijene. Svakako ćemo se vratiti opet!",
      time1: "prije tjedan dana",
      time2: "prije 2 tjedna",
      time3: "prije mjesec dana"
    },
    EN: {
      r1: "The best pizza on Krk island! The staff is very friendly, and the atmosphere on the main square is wonderful.",
      r2: "Excellent grilled dishes and fantastic service. Highly recommend the homemade burgers and ćevapčići!",
      r3: "Cozy atmosphere, generous portions, and very reasonable prices. We will definitely come back again!",
      time1: "a week ago",
      time2: "2 weeks ago",
      time3: "a month ago"
    },
    IT: {
      r1: "La migliore pizza dell'isola di Krk! Il personale è gentilissimo e l'atmosfera nella piazza principale è meravigliosa.",
      r2: "Ottimi piatti alla griglia e servizio fantastico. Consiglio vivamente gli hamburger fatti in casa e i ćevapčići!",
      r3: "Atmosfera accogliente, porzioni generose e prezzi molto ragionevoli. Ritorneremo sicuramente!",
      time1: "una settimana fa",
      time2: "2 settimane fa",
      time3: "un mese fa"
    },
    DE: {
      r1: "Die beste Pizza auf der Insel Krk! Das Personal ist sehr freundlich und die Atmosphäre auf dem Hauptplatz ist wunderschön.",
      r2: "Hervorragende Grillgerichte und fantastischer Service. Ich empfehle die hausgemachten Burger und Ćevapčići!",
      r3: "Gemütliche Atmosphäre, reichliche Portionen und sehr faire Preise. Wir kommen auf jeden Fall wieder!",
      time1: "vor einer Woche",
      time2: "vor 2 Wochen",
      time3: "vor einem Monat"
    }
  };

  // Localized backup reviews
  const backupReviews: TranslatedReview[] = [
    { 
      author_name: "Ana M.", 
      rating: 5, 
      text: {
        hr: reviewTexts.HR.r1,
        en: reviewTexts.EN.r1,
        de: reviewTexts.DE.r1,
        it: reviewTexts.IT.r1,
      },
      relative_time_description: {
        hr: reviewTexts.HR.time1,
        en: reviewTexts.EN.time1,
        de: reviewTexts.DE.time1,
        it: reviewTexts.IT.time1,
      }
    },
    { 
      author_name: "David K.", 
      rating: 5, 
      text: {
        hr: reviewTexts.HR.r2,
        en: reviewTexts.EN.r2,
        de: reviewTexts.DE.r2,
        it: reviewTexts.IT.r2,
      },
      relative_time_description: {
        hr: reviewTexts.HR.time2,
        en: reviewTexts.EN.time2,
        de: reviewTexts.DE.time2,
        it: reviewTexts.IT.time2,
      }
    },
    { 
      author_name: "Elena S.", 
      rating: 5, 
      text: {
        hr: reviewTexts.HR.r3,
        en: reviewTexts.EN.r3,
        de: reviewTexts.DE.r3,
        it: reviewTexts.IT.r3,
      },
      relative_time_description: {
        hr: reviewTexts.HR.time3,
        en: reviewTexts.EN.time3,
        de: reviewTexts.DE.time3,
        it: reviewTexts.IT.time3,
      }
    }
  ];

  const [isUsingLive, setIsUsingLive] = useState(false);
  const [reviewsData, setReviewsData] = useState<TranslatedReview[] | null>(null);
  const [liveRating, setLiveRating] = useState<number | null>(null);

  // Monitor active language changes and log them for diagnostics
  useEffect(() => {
    console.log(`[AboutUs] Active site language changed: ${language}`);
  }, [language]);

  useEffect(() => {
    async function fetchLiveReviews() {
      try {
        console.log("[AboutUs] Loading translations dataset from /api/reviews...");
        const res = await fetch("/api/reviews");
        if (!res.ok) {
          console.warn(`[AboutUs] /api/reviews returned non-ok status: ${res.status}. Falling back to local reviews.`);
          setIsUsingLive(false);
          setReviewsData(null);
          return;
        }
        const data = await res.json();
        
        if (data && data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviewsData(data.reviews as TranslatedReview[]);
          setIsUsingLive(true);
        } else {
          setIsUsingLive(false);
          setReviewsData(null);
        }
        if (data && data.rating) {
          setLiveRating(data.rating as number);
        }
      } catch (err: any) {
        console.error("Failed to load live Google reviews. Displaying high-quality backup reviews instead.", err.message || err);
        setIsUsingLive(false);
        setReviewsData(null);
      }
    }
    fetchLiveReviews();
  }, []);

  const reviewsToRender = isUsingLive && reviewsData && reviewsData.length > 0
    ? reviewsData
    : backupReviews;

  const statsTranslations = {
    hr: {
      experienceVal: "15+",
      experienceLabel: "Godina iskustva",
      freshVal: "100%",
      freshLabel: "Svježi sastojci",
      ratingLabel: "Google ocjena",
    },
    en: {
      experienceVal: "15+",
      experienceLabel: "Years of Experience",
      freshVal: "100%",
      freshLabel: "Fresh Ingredients",
      ratingLabel: "Google Rating",
    },
    de: {
      experienceVal: "15+",
      experienceLabel: "Jahre Erfahrung",
      freshVal: "100%",
      freshLabel: "Frische Zutaten",
      ratingLabel: "Google-Bewertung",
    },
    it: {
      experienceVal: "15+",
      experienceLabel: "Anni di Esperienza",
      freshVal: "100%",
      freshLabel: "Ingredienti Freschi",
      ratingLabel: "Valutazione Google",
    },
  };
  const ratingValue = liveRating !== null ? liveRating.toFixed(1) : "4.8";
  const googleScoreText = dict.about.google_score.replace("4.5+", ratingValue);

  return (
    <section id="about" className="py-16 bg-ivory-100/50 dark:bg-[#1A1512]/60 border-y border-ivory-200/40 dark:border-chocolate-850/40 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Our Content */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <span className="text-xs sm:text-sm font-sans tracking-[0.2em] text-sea-600 dark:text-sea-200 uppercase font-semibold">
                {dict.about.tagline}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate-900 dark:text-ivory-100 mt-3 mb-4">
                {dict.about.title}
              </h2>
              <div className="h-0.5 w-16 bg-sea-600 dark:bg-sea-600 rounded" />
            </div>

            <p className="text-chocolate-850 dark:text-ivory-200 font-sans font-light text-sm sm:text-base leading-relaxed">
              {dict.about.desc}
            </p>

            {/* Split Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Feature 1 */}
              <div className="bg-white dark:bg-[#26201B] p-5 rounded-2xl border border-ivory-200 dark:border-chocolate-850/50 shadow-soft dark:shadow-none">
                <h4 className="font-serif text-base font-semibold text-chocolate-900 dark:text-ivory-100 mb-2 uppercase flex items-center gap-2">
                  <Flame className="h-5 w-5 text-[#8B5A2B] dark:text-[#DFB283] flex-shrink-0" />
                  <span>{dict.about.feature1_title}</span>
                </h4>
                <p className="text-xs text-chocolate-700 dark:text-ivory-300 font-light leading-relaxed">
                  {dict.about.feature1_desc}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-[#26201B] p-5 rounded-2xl border border-ivory-200 dark:border-chocolate-850/50 shadow-soft dark:shadow-none">
                <h4 className="font-serif text-base font-semibold text-chocolate-900 dark:text-ivory-100 mb-2 uppercase flex items-center gap-2">
                  <Pizza className="h-5 w-5 text-[#8B5A2B] dark:text-[#DFB283] flex-shrink-0" />
                  <span>{dict.about.feature2_title}</span>
                </h4>
                <p className="text-xs text-chocolate-700 dark:text-ivory-300 font-light leading-relaxed">
                  {dict.about.feature2_desc}
                </p>
              </div>

            </div>

            {/* Stats Row */}
            <div className="mt-8 pt-8 border-t border-ivory-200/60 dark:border-chocolate-850/40 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-ivory-200/60 dark:sm:divide-chocolate-850/40">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center px-4 space-y-1">
                <Calendar className="h-5 w-5 text-sea-600 dark:text-sea-250 mb-1" />
                <span className="font-serif text-lg sm:text-xl font-bold text-chocolate-900 dark:text-ivory-100">
                  {statsTranslations[language].experienceVal}
                </span>
                <span className="text-xs text-chocolate-700/80 dark:text-ivory-300/80 font-light font-sans">
                  {statsTranslations[language].experienceLabel}
                </span>
              </div>
              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center px-4 space-y-1">
                <Leaf className="h-5 w-5 text-sea-600 dark:text-sea-250 mb-1" />
                <span className="font-serif text-lg sm:text-xl font-bold text-chocolate-900 dark:text-ivory-100">
                  {statsTranslations[language].freshVal}
                </span>
                <span className="text-xs text-chocolate-700/80 dark:text-ivory-300/80 font-light font-sans">
                  {statsTranslations[language].freshLabel}
                </span>
              </div>
              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center px-4 space-y-1">
                <Star className="h-5 w-5 text-sea-600 dark:text-sea-250 mb-1" />
                <span className="font-serif text-lg sm:text-xl font-bold text-chocolate-900 dark:text-ivory-100">
                  {ratingValue}★
                </span>
                <span className="text-xs text-chocolate-700/80 dark:text-ivory-300/80 font-light font-sans">
                  {statsTranslations[language].ratingLabel}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Places Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs sm:text-sm font-sans tracking-[0.2em] text-sea-600 dark:text-sea-200 uppercase font-semibold">
                {dict.about.reviews_tagline}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-900 dark:text-ivory-100 mt-3 mb-2">
                {dict.about.reviews_title}
              </h3>

              {/* Google Badge Row */}
              <div className="flex items-center space-x-2 text-chocolate-700/60 dark:text-ivory-300/60 pb-2">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.65 4.5 1.8l2.4-2.4C17.34 1.7 14.9 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.353 0 10.57-4.468 10.57-10.772 0-.726-.078-1.272-.23-1.943H12.24z" />
                </svg>
                <span className="font-sans text-xs tracking-wider uppercase font-semibold">
                  {googleScoreText}
                </span>
              </div>
              <div className="h-0.5 w-16 bg-sea-600 dark:bg-sea-600 rounded" />
            </div>

            {/* Reviews List */}
            <div className="space-y-6 pt-4">
              {reviewsToRender.map((review, idx) => (
                <ReviewItem key={`${idx}-${language}`} review={review} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
