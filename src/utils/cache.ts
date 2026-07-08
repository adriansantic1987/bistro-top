import { supabase } from "./supabase";
import { 
  FALLBACK_MENU_ITEMS, 
  FALLBACK_OPENING_HOURS, 
  FALLBACK_SITE_CONTENT 
} from "./fallbackData";
import { unstable_cache } from "next/cache";

const CACHE_FILE_PATH = "./bistro_cache.json";

// Dynamic imports of 'fs' for server-only context
async function getFs() {
  if (typeof window === "undefined") {
    try {
      return await import("fs/promises");
    } catch (e) {
      console.warn("fs module not available", e);
    }
  }
  return null;
}

// Write helper
async function writeBackupCache(data: any) {
  const fs = await getFs();
  if (fs) {
    try {
      await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (e) {
      // In serverless read-only filesystems, fallback to /tmp
      try {
        await fs.writeFile("/tmp/bistro_cache.json", JSON.stringify(data, null, 2), "utf-8");
      } catch (err) {
        console.warn("Failed to write fallback cache file", err);
      }
    }
  }
}

// Read helper
async function readBackupCache(): Promise<any | null> {
  const fs = await getFs();
  if (fs) {
    try {
      const content = await fs.readFile(CACHE_FILE_PATH, "utf-8");
      return JSON.parse(content);
    } catch (e) {
      try {
        const content = await fs.readFile("/tmp/bistro_cache.json", "utf-8");
        return JSON.parse(content);
      } catch (err) {
        return null;
      }
    }
  }
  return null;
}

// Reconstruct site content tree from flat key-value rows
function parseSiteContent(rows: any[]) {
  // Deep clone fallback
  const result: any = JSON.parse(JSON.stringify(FALLBACK_SITE_CONTENT));
  
  rows.forEach((row) => {
    const lang = row.language.toUpperCase();
    if (!result[lang]) result[lang] = {};
    
    // Support nested keys e.g. "hero.subtitle" or "menu.categories.pizze"
    const parts = row.key.split(".");
    let current = result[lang];
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        current[part] = row.value;
      } else {
        if (!current[part]) current[part] = {};
        current[part] = { ...current[part] }; // Ensure clone
        current = current[part];
      }
    }
  });
  
  return result;
}

// Query Timeout Helper (prevents infinite hanging)
function withTimeout<T>(promise: Promise<T>, ms: number = 25000): Promise<T> {
  // Prevent unhandled promise rejections if the database query fails after timeout
  promise.catch((err) => {
    console.warn(`[Cache Timeout Guard] Query rejected after timeout boundary:`, err.message || err);
  });

  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Query timed out after ${ms}ms`)), ms)
    )
  ]);
}

// Direct dynamic fetcher (Supabase)
async function fetchDirectFromSupabase() {
  const urlVal = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-url.supabase.co";
  console.log(`[Supabase] Querying live database... URL: "${urlVal}"`);
  
  // 1. Fetch menu_items
  const { data: dbMenuItems, error: menuError } = await withTimeout(
    Promise.resolve(
      supabase
        .from("menu_items")
        .select("*")
        .order("category")
        .order("display_order")
    )
  );
    
  if (menuError) throw menuError;

  // 2. Fetch site_content
  const { data: dbSiteContent, error: contentError } = await withTimeout(
    Promise.resolve(
      supabase
        .from("site_content")
        .select("*")
    )
  );
    
  if (contentError) throw contentError;

  // 3. Fetch opening_hours
  const { data: dbHours, error: hoursError } = await withTimeout(
    Promise.resolve(
      supabase
        .from("opening_hours")
        .select("*")
        .order("id")
    )
  );
    
  if (hoursError) throw hoursError;

  return {
    menu_items: dbMenuItems && dbMenuItems.length > 0 ? dbMenuItems : FALLBACK_MENU_ITEMS,
    site_content: dbSiteContent && dbSiteContent.length > 0 ? parseSiteContent(dbSiteContent) : FALLBACK_SITE_CONTENT,
    opening_hours: dbHours && dbHours.length > 0 ? dbHours : FALLBACK_OPENING_HOURS,
    timestamp: Date.now()
  };
}

// Main fetcher utilizing Next.js cache and tiered fallbacks
export const getBistroData = unstable_cache(
  async () => {
    try {
      const data = await fetchDirectFromSupabase();
      // Update local file cache for recovery
      await writeBackupCache(data);
      return data;
    } catch (err) {
      console.error("[Cache] Supabase connection failed. Attempting file cache read...", err);
      
      const backup = await readBackupCache();
      if (backup) {
        console.log("[Cache] Recovered successfully from disk backup cache.");
        return backup;
      }
      
      console.warn("[Cache] Database and file cache both failed. Using hardcoded codebase fallbacks.");
      return {
        menu_items: FALLBACK_MENU_ITEMS,
        site_content: FALLBACK_SITE_CONTENT,
        opening_hours: FALLBACK_OPENING_HOURS,
        timestamp: Date.now()
      };
    }
  },
  ["bistro-database-cache"],
  { revalidate: 60, tags: ["bistro-data"] } // 60s ISR revalidation Cache
);
