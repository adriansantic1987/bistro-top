import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { FALLBACK_MENU_ITEMS, FALLBACK_OPENING_HOURS, FALLBACK_SITE_CONTENT } from "../src/utils/fallbackData";
import { MENU_TRANSLATIONS } from "../src/data/menuTranslations";

// 1. Manually parse .env.local to load keys
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const index = trimmed.indexOf("=");
        if (index !== -1) {
          const key = trimmed.substring(0, index).trim();
          const val = trimmed.substring(index + 1).trim();
          process.env[key] = val;
        }
      }
    });
    console.log("Loaded environment variables from .env.local");
  }
} catch (e) {
  console.warn("Could not load .env.local", e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be defined in .env.local");
  process.exit(1);
}

// 2. Initialize Admin client (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log("Starting database seed script...");

  // --- A. Seed menu_items ---
  console.log("Seeding menu_items...");
  // Clear existing items first
  const { error: deleteMenuError } = await supabase.from("menu_items").delete().neq("id", "0");
  if (deleteMenuError) {
    console.error("Error clearing menu_items:", deleteMenuError);
  }

  const { error: insertMenuError } = await supabase.from("menu_items").insert(FALLBACK_MENU_ITEMS);
  if (insertMenuError) {
    console.error("Error inserting menu_items:", insertMenuError);
    process.exit(1);
  }
  console.log(`Successfully seeded ${FALLBACK_MENU_ITEMS.length} menu items.`);

  // --- B. Seed site_content (General Text & Translations) ---
  console.log("Seeding site_content...");
  // Clear existing first
  const { error: deleteContentError } = await supabase.from("site_content").delete().neq("key", "");
  if (deleteContentError) {
    console.error("Error clearing site_content:", deleteContentError);
  }

  const siteContentRows: any[] = [];

  // 1. Recursive flattener for FALLBACK_SITE_CONTENT
  function flattenContent(obj: any, prefix: string = "") {
    const rows: { key: string; value: string }[] = [];
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        rows.push(...flattenContent(obj[key], prefix ? `${prefix}.${key}` : key));
      } else {
        rows.push({
          key: prefix ? `${prefix}.${key}` : key,
          value: String(obj[key])
        });
      }
    }
    return rows;
  }

  // Flatten and structure rows for each language
  for (const lang in FALLBACK_SITE_CONTENT) {
    const langKey = lang as keyof typeof FALLBACK_SITE_CONTENT;
    const flat = flattenContent(FALLBACK_SITE_CONTENT[langKey]);
    flat.forEach((item) => {
      siteContentRows.push({
        key: item.key,
        language: lang.toLowerCase(),
        value: item.value
      });
    });
  }

  // 2. Add menu translation keys into site_content
  // Format: key = "menu.item.<id>.name" or "menu.item.<id>.description"
  for (const itemId in MENU_TRANSLATIONS) {
    const translations = MENU_TRANSLATIONS[itemId];
    
    // Names
    if (translations.name) {
      for (const lang in translations.name) {
        const langKey = lang as keyof typeof translations.name;
        siteContentRows.push({
          key: `menu.item.${itemId}.name`,
          language: lang.toLowerCase(),
          value: translations.name[langKey]
        });
      }
    }

    // Descriptions
    if (translations.description) {
      for (const lang in translations.description) {
        const langKey = lang as keyof typeof translations.description;
        siteContentRows.push({
          key: `menu.item.${itemId}.description`,
          language: lang.toLowerCase(),
          value: translations.description[langKey]
        });
      }
    }
  }

  const { error: insertContentError } = await supabase.from("site_content").insert(siteContentRows);
  if (insertContentError) {
    console.error("Error inserting site_content:", insertContentError);
    process.exit(1);
  }
  console.log(`Successfully seeded ${siteContentRows.length} translation rows.`);

  // --- C. Seed opening_hours ---
  console.log("Seeding opening_hours...");
  const { error: deleteHoursError } = await supabase.from("opening_hours").delete().neq("id", 0);
  if (deleteHoursError) {
    console.error("Error clearing opening_hours:", deleteHoursError);
  }

  const { error: insertHoursError } = await supabase.from("opening_hours").insert(FALLBACK_OPENING_HOURS);
  if (insertHoursError) {
    console.error("Error inserting opening_hours:", insertHoursError);
    process.exit(1);
  }
  console.log(`Successfully seeded ${FALLBACK_OPENING_HOURS.length} opening hours records.`);

  // --- D. Seed site_settings ---
  console.log("Seeding site_settings...");
  const { error: deleteSettingsError } = await supabase.from("site_settings").delete().neq("id", 0);
  if (deleteSettingsError) {
    console.error("Error clearing site_settings:", deleteSettingsError);
  }

  const { error: insertSettingsError } = await supabase.from("site_settings").insert({ id: 1, vacation_start: null, vacation_end: null });
  if (insertSettingsError) {
    console.error("Error inserting site_settings:", insertSettingsError);
    process.exit(1);
  }
  console.log("Successfully seeded site_settings with default null values.");

  console.log("Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("Unhandled error during seeding:", err);
  process.exit(1);
});
