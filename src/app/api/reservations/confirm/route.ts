import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const status = searchParams.get("status"); // 'approved' or 'rejected'
  const lang = (searchParams.get("lang") || "hr").toLowerCase();

  if (!id || !status) {
    return new Response("Missing required parameters: id and status are required.", { status: 400 });
  }

  if (status !== "approved" && status !== "rejected") {
    return new Response("Invalid status value. Must be 'approved' or 'rejected'.", { status: 400 });
  }

  let reservationData = null;

  try {
    // 1. Update the reservation status in the database (RLS bypassed on admin client)
    const { data, error } = await supabaseAdmin
      .from("reservations")
      .update({ status })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("[API confirm] Supabase update failed:", error.message || error);
    } else {
      reservationData = data;
    }
  } catch (err) {
    console.error("[API confirm] Catch block database error:", err);
  }

  // 2. Format the response message dynamically based on status, lang, and reservation details
  const name = reservationData?.name || "";
  const guests = reservationData?.guests || "";
  const date = reservationData?.date || "";
  const time = reservationData?.time || "";

  // Helper date formatter for Croatia/German style dates if it is YYYY-MM-DD
  const formatDate = (dateStr: string, l: string) => {
    if (!dateStr || !dateStr.includes("-")) return dateStr;
    const [y, m, d] = dateStr.split("-");
    if (l === "hr" || l === "de") return `${d}.${m}.${y}.`;
    if (l === "it") return `${d}/${m}/${y}`;
    return `${m}/${d}/${y}`;
  };

  const formattedDate = formatDate(date, lang);

  // Multi-language response templates
  const templates = {
    hr: {
      approved: name
        ? `Poštovani/a ${name}, vaša rezervacija za ${guests} osoba dana ${formattedDate} u ${time} je ODOBRENA. Veselimo se vašem dolasku! Bistro Top`
        : "Vaša rezervacija je ODOBRENA. Veselimo se vašem dolasku! Bistro Top",
      rejected: name
        ? `Poštovani/a ${name}, nažalost nismo u mogućnosti potvrditi vašu rezervaciju za ${guests} osoba dana ${formattedDate} u ${time} jer smo u tom terminu popunjeni. Hvala na razumijevanju. Bistro Top`
        : "Nažalost nismo u mogućnosti potvrditi vašu rezervaciju jer smo u tom terminu popunjeni. Hvala na razumijevanju. Bistro Top"
    },
    en: {
      approved: name
        ? `Dear ${name}, your reservation for ${guests} people on ${formattedDate} at ${time} is CONFIRMED. We look forward to seeing you! Bistro Top`
        : "Your reservation is CONFIRMED. We look forward to seeing you! Bistro Top",
      rejected: name
        ? `Dear ${name}, unfortunately we are unable to confirm your reservation for ${guests} people on ${formattedDate} at ${time} as we are fully booked. Thank you for your understanding. Bistro Top`
        : "Unfortunately we are unable to confirm your reservation as we are fully booked. Thank you for your understanding. Bistro Top"
    },
    de: {
      approved: name
        ? `Sehr geehrte/r ${name}, Ihre Reservierung für ${guests} Personen am ${formattedDate} um ${time} ist BESTÄTIGT. Wir freuen uns auf Ihren Besuch! Bistro Top`
        : "Ihre Reservierung ist BESTÄTIGT. Wir freuen uns auf Ihren Besuch! Bistro Top",
      rejected: name
        ? `Sehr geehrte/r ${name}, leider können wir Ihre Reservierung für ${guests} Personen am ${formattedDate} um ${time} nicht bestätigen, da wir ausgebucht sind. Vielen Dank für Ihr Verständnis. Bistro Top`
        : "Leider können wir Ihre Reservierung nicht bestätigen, da wir ausgebucht sind. Vielen Dank für Ihr Verständnis. Bistro Top"
    },
    it: {
      approved: name
        ? `Gentile ${name}, la vostra prenotazione per ${guests} persone il ${formattedDate} alle ${time} è CONFERMATA. Vi aspettiamo! Bistro Top`
        : "La vostra prenotazione è CONFERMATA. Vi aspettiamo! Bistro Top",
      rejected: name
        ? `Gentile ${name}, purtroppo non siamo in grado di confermare la vostra prenotazione per ${guests} persone il ${formattedDate} alle ${time} perché siamo al completo. Grazie per la comprensione. Bistro Top`
        : "Purtroppo non siamo in grado di confermare la vostra prenotazione perché siamo al completo. Grazie per la comprensione. Bistro Top"
    }
  };

  const activeLangTemplates = templates[lang as keyof typeof templates] || templates.en;
  const replyMessage = status === "approved" ? activeLangTemplates.approved : activeLangTemplates.rejected;

  // 3. Perform redirect to WhatsApp Web / Mobile sharing deep-link
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(replyMessage)}`;
  
  return NextResponse.redirect(whatsappUrl);
}
