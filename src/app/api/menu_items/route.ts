import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category")
      .order("display_order");
      
    if (error) {
      console.error("[API menu_items] Supabase query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("[API menu_items] Server error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
