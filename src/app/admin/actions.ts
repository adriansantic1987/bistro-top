"use server";

import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { supabaseAdmin } from "@/utils/supabase";

// Auth Check Helper
async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const expectedPassword = (process.env.ADMIN_PASSWORD || "tonifruk1987!").trim();
  
  if (!session || session.trim() !== expectedPassword) {
    throw new Error("Unauthorized admin access");
  }
}

// 1. Auth Actions
export async function loginAdmin(password: string) {
  const expectedPassword = (process.env.ADMIN_PASSWORD || "tonifruk1987!").trim();
  const inputPassword = (password || "").trim();
  
  console.log(`[loginAdmin] Input length: ${inputPassword.length}, Expected length: ${expectedPassword.length}`);
  
  if (inputPassword === expectedPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", expectedPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/"
    });
    return { success: true };
  }
  return { success: false, error: "Pogrešna lozinka" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}

// 2. Menu Item CRUD Actions
export async function createMenuItem(formData: {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  display_order?: number;
}) {
  await checkAuth();

  // Find max display_order to append
  const { data: currentItems } = await supabaseAdmin
    .from("menu_items")
    .select("display_order")
    .eq("category", formData.category)
    .order("display_order", { ascending: false })
    .limit(1);

  const nextOrder = currentItems && currentItems[0] ? currentItems[0].display_order + 1 : 0;

  const { error } = await supabaseAdmin.from("menu_items").insert({
    id: formData.id,
    category: formData.category,
    name: formData.name,
    description: formData.description,
    price: formData.price,
    display_order: formData.display_order ?? nextOrder,
    active: true
  });

  if (error) throw error;
  updateTag("bistro-data");
  return { success: true };
}

export async function updateMenuItem(
  id: string,
  updates: {
    name?: string;
    description?: string;
    price?: number;
    active?: boolean;
  }
) {
  await checkAuth();

  const { error } = await supabaseAdmin
    .from("menu_items")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
  updateTag("bistro-data");
  return { success: true };
}

export async function deleteMenuItem(id: string) {
  await checkAuth();

  const { error } = await supabaseAdmin
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (error) throw error;
  updateTag("bistro-data");
  return { success: true };
}

export async function reorderMenuItem(id: string, direction: "up" | "down") {
  await checkAuth();

  // Get current item category and display_order
  const { data: itemData, error: fetchError } = await supabaseAdmin
    .from("menu_items")
    .select("category, display_order")
    .eq("id", id)
    .single();

  if (fetchError || !itemData) throw new Error("Item not found");

  const { category, display_order } = itemData;

  // Get items in same category ordered by display_order
  const { data: list } = await supabaseAdmin
    .from("menu_items")
    .select("id, display_order")
    .eq("category", category)
    .order("display_order", { ascending: true });

  if (!list) return { success: false };

  const currentIndex = list.findIndex((item) => item.id === id);
  if (currentIndex === -1) return { success: false };

  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (targetIndex < 0 || targetIndex >= list.length) return { success: false }; // Bound checks

  const currentItem = list[currentIndex];
  const targetItem = list[targetIndex];

  // Swap display_order in Supabase
  const { error: err1 } = await supabaseAdmin
    .from("menu_items")
    .update({ display_order: targetItem.display_order })
    .eq("id", currentItem.id);

  const { error: err2 } = await supabaseAdmin
    .from("menu_items")
    .update({ display_order: currentItem.display_order })
    .eq("id", targetItem.id);

  if (err1 || err2) throw new Error("Failed to swap order");

  updateTag("bistro-data");
  return { success: true };
}

// 3. Opening Hours Actions
export async function updateOpeningHours(
  id: number,
  updates: {
    day_group: string;
    open_time: string;
    close_time: string;
    season_label: string;
  }
) {
  await checkAuth();

  const { error } = await supabaseAdmin
    .from("opening_hours")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
  updateTag("bistro-data");
  return { success: true };
}

// 4. Site Content Text Actions
export async function updateSiteContent(key: string, language: string, value: string) {
  await checkAuth();

  const { error } = await supabaseAdmin
    .from("site_content")
    .upsert({
      key,
      language: language.toLowerCase(),
      value
    });

  if (error) throw error;
  updateTag("bistro-data");
  return { success: true };
}
