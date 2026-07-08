import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// 1. Load env variables manually from .env.local
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
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

console.log(`Connecting to Supabase URL: "${supabaseUrl}"`);
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing credentials in process.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log("Testing connection... fetching 1 menu item...");
  
  // Create a timeout race
  const queryPromise = supabase.from("menu_items").select("*").limit(1);
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Connection timed out after 5000ms")), 5000)
  );

  try {
    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);
    if (error) {
      console.error("Connection failed with Supabase error:", error);
    } else {
      console.log("Connection successful! Query returned:", data);
    }
  } catch (err: any) {
    console.error("Connection failed with execution error:", err.message || err);
  }
  process.exit(0);
}

testConnection();
