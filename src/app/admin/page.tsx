import { supabaseAdmin } from "@/utils/supabase";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // 1. Fetch menu_items
  const { data: menuItems } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .order("category")
    .order("display_order");

  // 2. Fetch opening_hours
  const { data: hours } = await supabaseAdmin
    .from("opening_hours")
    .select("*")
    .order("id");

  // 3. Fetch site_content
  const { data: siteContent } = await supabaseAdmin
    .from("site_content")
    .select("*");

  // 3b. Fetch site_settings (resilient to missing table)
  let vacationStart = null;
  let vacationEnd = null;
  try {
    const { data: settings } = await supabaseAdmin
      .from("site_settings")
      .select("vacation_start, vacation_end")
      .eq("id", 1)
      .maybeSingle();
      
    if (settings) {
      vacationStart = settings.vacation_start;
      vacationEnd = settings.vacation_end;
    }
  } catch (err) {
    console.warn("[AdminPage] Could not fetch site_settings table:", err);
  }

  // 4. Fetch page views from last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const { data: pageViews } = await supabaseAdmin
    .from("page_views")
    .select("section, viewed_at")
    .gt("viewed_at", thirtyDaysAgo.toISOString());

  // --- Aggregate Analytics ---
  const totalViews: Record<string, number> = {
    hero: 0,
    jelovnik: 0,
    kontakt: 0,
    rezervacija: 0
  };

  const viewsByDay: Record<string, Record<string, number>> = {};
  const last30DaysList: string[] = [];

  // Initialize dates list
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    last30DaysList.push(dateStr);
    viewsByDay[dateStr] = { hero: 0, jelovnik: 0, kontakt: 0, rezervacija: 0 };
  }

  // Populate counts
  if (pageViews) {
    pageViews.forEach((pv) => {
      const sectionKey = pv.section.toLowerCase();
      
      // Update totals
      if (totalViews[sectionKey] !== undefined) {
        totalViews[sectionKey]++;
      } else {
        totalViews[sectionKey] = 1;
      }

      // Update timeline
      if (pv.viewed_at) {
        const dateStr = new Date(pv.viewed_at).toISOString().split("T")[0];
        if (viewsByDay[dateStr]) {
          if (viewsByDay[dateStr][sectionKey] !== undefined) {
            viewsByDay[dateStr][sectionKey]++;
          } else {
            viewsByDay[dateStr][sectionKey] = 1;
          }
        }
      }
    });
  }

  return (
    <AdminDashboard
      initialMenuItems={menuItems || []}
      initialHours={hours || []}
      initialSiteContent={siteContent || []}
      initialVacationStart={vacationStart}
      initialVacationEnd={vacationEnd}
      analytics={{
        totalViews,
        viewsByDay,
        last30DaysList
      }}
    />
  );
}
