import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabase";

export async function POST(request: Request) {
  try {
    const { section } = await request.json();
    if (!section) {
      return NextResponse.json({ error: "Missing section identifier" }, { status: 400 });
    }

    // Insert section view (timestamp defaults to now in DB)
    const { error } = await supabaseAdmin
      .from("page_views")
      .insert({ section: section.toLowerCase() });

    if (error) {
      console.error("Failed to insert page view in Supabase:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error in page-views API route:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
