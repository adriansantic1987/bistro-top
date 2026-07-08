import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 86400; // Default segment revalidation of 24 hours

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

const BACKUP_REVIEWS = [
  { 
    author_name: "Ana M.", 
    rating: 5, 
    text: {
      hr: "Najbolja pizza na otoku Krku! Osoblje je iznimno uslužno, a ambijent na trgu je predivan.",
      en: "The best pizza on Krk island! The staff is very friendly, and the atmosphere on the main square is wonderful.",
      de: "Die beste Pizza auf der Insel Krk! Das Personal ist sehr freundlich und die Atmosphäre auf dem Hauptplatz ist wunderschön.",
      it: "La migliore pizza dell'isola di Krk! Il personale è gentilissimo e l'atmosfera nella piazza principale è meravigliosa.",
    },
    relative_time_description: {
      hr: "prije tjedan dana",
      en: "a week ago",
      de: "vor einer Woche",
      it: "una settimana fa",
    }
  },
  { 
    author_name: "David K.", 
    rating: 5, 
    text: {
      hr: "Izvrsna jela s roštilja i fantastična usluga. Preporučujem domaće burgere i ćevapčiće!",
      en: "Excellent grilled dishes and fantastic service. Highly recommend the homemade burgers and ćevapčići!",
      de: "Hervorragende Grillgerichte und fantastischer Service. Ich empfehle die hausgemachten Burger und Ćevapčići!",
      it: "Ottimi piatti alla griglia e servizio fantastico. Consiglio vivamente gli hamburger fatti in casa e i ćevapčići!",
    },
    relative_time_description: {
      hr: "prije 2 tjedna",
      en: "2 weeks ago",
      de: "vor 2 Wochen",
      it: "2 settimane fa",
    }
  },
  { 
    author_name: "Elena S.", 
    rating: 5, 
    text: {
      hr: "Ugodna atmosfera, obilne porcije i vrlo pristupačne cijene. Svakako ćemo se vratiti opet!",
      en: "Cozy atmosphere, generous portions, and very reasonable prices. We will definitely come back again!",
      de: "Gemütliche Atmosphäre, reichliche Portionen und sehr faire Preise. Wir kommen auf jeden Fall wieder!",
      it: "Atmosfera accogliente, porzioni generose e prezzi molto ragionevoli. Ritorneremo sicuramente!",
    },
    relative_time_description: {
      hr: "prije mjesec dana",
      en: "a month ago",
      de: "vor einem Monat",
      it: "un mese fa",
    }
  }
];

async function fetchFallbackReviews() {
  try {
    // 1. Try querying "reviews" table in Supabase
    const { data: dbReviews, error: dbReviewsError } = await supabase
      .from("reviews")
      .select("*");
      
    if (!dbReviewsError && dbReviews && dbReviews.length > 0) {
      console.log("[Reviews API Fallback] Successfully fetched reviews from fallback 'reviews' table.");
      return dbReviews.filter((r: any) => r.rating >= 4);
    }
  } catch (err) {
    console.warn("[Reviews API Fallback] Failed fetching from 'reviews' table:", err);
  }

  try {
    // 2. Try querying "site_content" table in Supabase
    const { data: dbSiteContent, error: dbContentError } = await supabase
      .from("site_content")
      .select("*")
      .like("key", "reviews.item.%");

    if (!dbContentError && dbSiteContent && dbSiteContent.length > 0) {
      console.log("[Reviews API Fallback] Successfully fetched reviews from fallback 'site_content' table.");
    }
  } catch (err) {
    console.warn("[Reviews API Fallback] Failed fetching from 'site_content' table:", err);
  }

  // 3. Fallback to local BACKUP_REVIEWS
  console.log("[Reviews API Fallback] Using hardcoded backup reviews.");
  return BACKUP_REVIEWS;
}

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId || apiKey === "YOUR_GOOGLE_PLACES_API_KEY" || placeId === "YOUR_GOOGLE_PLACE_ID") {
    console.warn("Google Places API credentials are not configured. Triggering fallback.");
    const reviews = await fetchFallbackReviews();
    return NextResponse.json({ rating: 4.8, reviews });
  }

  const languages = ["hr", "en", "de", "it"] as const;

  try {
    // Fetch reviews for all 4 languages in parallel
    const fetchPromises = languages.map(async (lang) => {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}&language=${lang}`;
      
      const response = await fetch(url, {
        next: { revalidate: 86400 },
      });

      if (!response.ok) {
        throw new Error(`Google Places API request failed for language ${lang} with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== "OK") {
        throw new Error(`Google Places API error for language ${lang}: ${data.status} - ${data.error_message || "No details provided"}`);
      }

      return {
        lang,
        rating: data.result?.rating ?? 4.8,
        reviews: (data.result?.reviews ?? []) as GoogleReview[],
      };
    });

    const results = await Promise.all(fetchPromises);

    // Extract average rating from the first result
    const rating = results[0]?.rating ?? 4.8;

    // Use Croatian ("hr") as the base language to determine the fixed set of 3 reviews
    const hrResult = results.find((r) => r.lang === "hr") || results[0];
    const hrReviews = hrResult.reviews.filter((r) => r.rating >= 4);

    // Calculate overlap count for each hr review in other languages
    const reviewsWithOverlap = hrReviews.map((hrRev, index) => {
      let overlapCount = 0;
      for (const langResult of results) {
        if (langResult.lang === "hr") continue;
        const found = langResult.reviews.some((r) => r.author_name === hrRev.author_name);
        if (found) {
          overlapCount++;
        }
      }
      return {
        review: hrRev,
        overlapCount,
        originalIndex: index,
      };
    });

    // Sort by overlapCount (descending) to prioritize reviews that exist in all/most language responses,
    // keeping original recency order for ties.
    reviewsWithOverlap.sort((a, b) => {
      if (b.overlapCount !== a.overlapCount) {
        return b.overlapCount - a.overlapCount;
      }
      return a.originalIndex - b.originalIndex;
    });

    const baseReviews = reviewsWithOverlap.slice(0, 3).map((item) => item.review);

    // Build the translated array of reviews with text and relative_time per language
    const translatedReviews = baseReviews.map((baseRev) => {
      const textDict: Record<string, string> = {};
      const timeDict: Record<string, string> = {};

      for (const lang of languages) {
        const langResult = results.find((r) => r.lang === lang);
        const langReviews = langResult ? langResult.reviews : [];
        const matched = langReviews.find((r) => r.author_name === baseRev.author_name);

        textDict[lang] = matched?.text || baseRev.text;
        timeDict[lang] = matched?.relative_time_description || baseRev.relative_time_description;
      }

      return {
        author_name: baseRev.author_name,
        rating: baseRev.rating,
        text: {
          hr: textDict.hr || baseRev.text,
          en: textDict.en || baseRev.text,
          de: textDict.de || baseRev.text,
          it: textDict.it || baseRev.text,
        },
        relative_time_description: {
          hr: timeDict.hr || baseRev.relative_time_description,
          en: timeDict.en || baseRev.relative_time_description,
          de: timeDict.de || baseRev.relative_time_description,
          it: timeDict.it || baseRev.relative_time_description,
        },
      };
    });

    return NextResponse.json({ rating, reviews: translatedReviews });
  } catch (error) {
    console.error("Error in Google Places fetch, attempting database fallback:", error);
    const reviews = await fetchFallbackReviews();
    return NextResponse.json({ rating: 4.8, reviews });
  }
}
