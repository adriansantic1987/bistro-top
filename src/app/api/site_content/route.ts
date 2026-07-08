import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Fetch site content translations
    const { data: siteContent, error: contentError } = await supabase
      .from("site_content")
      .select("*");
      
    if (contentError) {
      console.error("[API site_content] Content query error:", contentError);
      return NextResponse.json({ error: contentError.message }, { status: 500 });
    }

    // 2. Fetch vacation/site settings (isolated error resilience if table doesn't exist yet)
    let settings = { vacation_start: null, vacation_end: null };
    try {
      const { data: settingsData, error: settingsError } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      if (!settingsError && settingsData) {
        settings = settingsData;
      } else if (settingsError) {
        console.warn("[API site_content] Settings query failed (this is expected if DDL is not yet run):", settingsError.message);
      }
    } catch (err) {
      console.warn("[API site_content] Catching settings table fetch error:", err);
    }

    return NextResponse.json({ siteContent, settings });
  } catch (err: any) {
    console.error("[API site_content] Server error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
