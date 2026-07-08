import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey || apiKey === "YOUR_GOOGLE_PLACES_API_KEY") {
    return NextResponse.json({ key: null });
  }
  
  return NextResponse.json({ key: apiKey });
}
