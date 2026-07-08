import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, guests, date, time } = await request.json();

    if (!name || !guests || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate a unique 8-character alphanumeric ID
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Insert reservation row via supabaseAdmin (bypasses RLS)
    const { error } = await supabaseAdmin
      .from("reservations")
      .insert({
        id: randomId,
        name,
        guests,
        date,
        time,
        status: "pending"
      });

    if (error) {
      console.error("[API reservations] Supabase error:", error.message || error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: randomId });
  } catch (err: any) {
    console.error("[API reservations] Server error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
