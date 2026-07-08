"use client";

import { useState } from "react";
import { 
  logoutAdmin, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem, 
  reorderMenuItem,
  updateOpeningHours,
  updateSiteContent,
  updateVacationSettings
} from "@/app/admin/actions";
import { 
  LogOut, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  Clock, 
  Menu as MenuIcon, 
  FileText, 
  BarChart3, 
  Check, 
  X,
  PlusCircle,
  Eye,
  EyeOff,
  Settings as SettingsIcon
} from "lucide-react";

interface AdminDashboardProps {
  initialMenuItems: any[];
  initialHours: any[];
  initialSiteContent: any[];
  initialVacationStart?: string | null;
  initialVacationEnd?: string | null;
  analytics: {
    totalViews: Record<string, number>;
    viewsByDay: Record<string, Record<string, number>>;
    last30DaysList: string[];
  };
}

export default function AdminDashboard({
  initialMenuItems,
  initialHours,
  initialSiteContent,
  initialVacationStart,
  initialVacationEnd,
  analytics
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"menu" | "hours" | "text" | "analytics" | "settings">("menu");
  
  // States
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [hours, setHours] = useState(initialHours);
  const [siteContent, setSiteContent] = useState(initialSiteContent);
  const [vacationStart, setVacationStart] = useState(initialVacationStart || "");
  const [vacationEnd, setVacationEnd] = useState(initialVacationEnd || "");

  // Notifications
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error">("success");

  const triggerMsg = (text: string, type: "success" | "error" = "success") => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(""), 4000);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    window.location.href = "/admin/login";
  };

  // ==========================================
  // MENU MANAGEMENT TAB LOGIC
  // ==========================================
  const [selectedCategory, setSelectedCategory] = useState("pizze");
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "pizze"
  });

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemData, setEditingItemData] = useState<any>({});

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.id || !newItem.name || !newItem.price) {
      triggerMsg("Molimo popunite sva obavezna polja", "error");
      return;
    }

    const priceNum = parseFloat(newItem.price);
    if (isNaN(priceNum)) {
      triggerMsg("Cijena mora biti broj", "error");
      return;
    }

    // Save previous state for rollback
    const previousMenuItems = [...menuItems];

    // Optimistic Update: Append the item immediately
    const nextOrder = menuItems.filter(i => i.category === newItem.category).length;
    const newItemObj = {
      id: newItem.id,
      category: newItem.category,
      name: newItem.name,
      description: newItem.description,
      price: priceNum,
      display_order: nextOrder,
      active: true
    };

    setMenuItems([...menuItems, newItemObj]);
    const originalNewItemInput = { ...newItem };
    // Clear inputs immediately
    setNewItem({ id: "", name: "", description: "", price: "", category: selectedCategory });
    triggerMsg("Jelo uspješno dodano!");

    try {
      await createMenuItem({
        id: originalNewItemInput.id,
        category: originalNewItemInput.category,
        name: originalNewItemInput.name,
        description: originalNewItemInput.description,
        price: priceNum
      });
    } catch (err: any) {
      // Rollback
      setMenuItems(previousMenuItems);
      setNewItem(originalNewItemInput);
      triggerMsg(err.message || "Došlo je do pogreške pri dodavanju jela", "error");
    }
  };

  const startEditing = (item: any) => {
    setEditingItemId(item.id);
    setEditingItemData({ ...item });
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    setEditingItemData({});
  };

  const handleSaveEdit = async (id: string) => {
    const previousMenuItems = [...menuItems];
    const priceNum = parseFloat(editingItemData.price);
    
    if (isNaN(priceNum)) {
      triggerMsg("Cijena mora biti broj", "error");
      return;
    }

    const updatedItem = {
      ...editingItemData,
      price: priceNum
    };

    // Optimistic Update: Modify the state immediately
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, ...updatedItem } : item));
    setEditingItemId(null);
    triggerMsg("Jelo uspješno ažurirano!");

    try {
      await updateMenuItem(id, {
        name: updatedItem.name,
        description: updatedItem.description,
        price: priceNum
      });
    } catch (err: any) {
      // Rollback
      setMenuItems(previousMenuItems);
      triggerMsg(err.message || "Pogreška pri spremanju", "error");
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const previousMenuItems = [...menuItems];
    
    // Optimistic Update: Toggle immediately
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, active: !currentStatus } : item));
    triggerMsg(currentStatus ? "Jelo deaktivirano" : "Jelo aktivirano!");

    try {
      await updateMenuItem(id, { active: !currentStatus });
    } catch (err: any) {
      // Rollback
      setMenuItems(previousMenuItems);
      triggerMsg(err.message || "Greška", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Jeste li sigurni da želite obrisati ovo jelo?")) return;
    
    const previousMenuItems = [...menuItems];

    // Optimistic Update: Remove immediately
    setMenuItems(menuItems.filter(item => item.id !== id));
    triggerMsg("Jelo uspješno obrisano!");

    try {
      await deleteMenuItem(id);
    } catch (err: any) {
      // Rollback
      setMenuItems(previousMenuItems);
      triggerMsg(err.message || "Greška pri brisanju", "error");
    }
  };

  const handleMove = async (id: string, direction: "up" | "down") => {
    const previousMenuItems = [...menuItems];

    const categoryItems = [...menuItems]
      .filter(item => item.category === selectedCategory)
      .sort((a, b) => a.display_order - b.display_order);
    const idx = categoryItems.findIndex(i => i.id === id);
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    
    if (targetIdx < 0 || targetIdx >= categoryItems.length) return;

    const itemA = categoryItems[idx];
    const itemB = categoryItems[targetIdx];
    
    // Swap display orders locally
    const orderA = itemA.display_order;
    const orderB = itemB.display_order;

    // Optimistic Update: Swap display_order in local state
    const nextItems = menuItems.map(item => {
      if (item.id === itemA.id) {
        return { ...item, display_order: orderB };
      }
      if (item.id === itemB.id) {
        return { ...item, display_order: orderA };
      }
      return item;
    }).sort((a, b) => a.display_order - b.display_order);

    setMenuItems(nextItems);
    triggerMsg("Redoslijed uspješno promijenjen!");

    try {
      const res = await reorderMenuItem(id, direction);
      if (!res.success) {
        throw new Error("Failed to swap order");
      }
    } catch (err: any) {
      // Rollback
      setMenuItems(previousMenuItems);
      triggerMsg(err.message || "Došlo je do greške", "error");
    }
  };

  // ==========================================
  // HOURS TAB LOGIC
  // ==========================================
  const handleHoursChange = (id: number, field: string, value: string) => {
    setHours(hours.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  const handleSaveHours = async (h: any) => {
    try {
      await updateOpeningHours(h.id, {
        day_group: h.day_group,
        open_time: h.open_time,
        close_time: h.close_time,
        season_label: h.season_label
      });
      triggerMsg("Radno vrijeme ažurirano!");
    } catch (err: any) {
      triggerMsg("Pogreška pri spremanju radnog vremena", "error");
    }
  };

  // ==========================================
  // SITE TEXT TAB LOGIC
  // ==========================================
  const [selectedLanguage, setSelectedLanguage] = useState<"hr" | "en" | "it" | "de">("hr");
  
  // Filter site content rows for dynamic text keys
  // Let's filter out menu translations keys e.g. "menu.item." to display clean fields
  const filteredContentRows = siteContent
    .filter(row => row.language === selectedLanguage && !row.key.startsWith("menu.item."))
    .sort((a, b) => a.key.localeCompare(b.key));

  const handleTextChange = (key: string, value: string) => {
    setSiteContent(siteContent.map(row => 
      (row.key === key && row.language === selectedLanguage) ? { ...row, value } : row
    ));
  };

  const handleSaveText = async (key: string, value: string) => {
    try {
      await updateSiteContent(key, selectedLanguage, value);
      triggerMsg("Tekst uspješno spremljen!");
    } catch (err: any) {
      triggerMsg("Greška pri spremanju teksta", "error");
    }
  };

  // Categories helper mapping
  const categoryNames: Record<string, string> = {
    pizze: "Pizze",
    rostilj: "Jela s roštilja",
    peka: "Jela pod pekom",
    riba: "Riba & Plodovi mora",
    predjela_deserti: "Predjela & Deserti"
  };

  return (
    <div className="min-h-screen bg-[#1A1512] text-ivory-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-[#26201B] border-b border-chocolate-850/50 px-6 py-4 flex items-center justify-between shadow-premium z-10">
        <div className="flex items-center space-x-3">
          <span className="font-serif text-lg sm:text-xl font-bold tracking-wide uppercase text-white">
            Bistro Top Admin
          </span>
          <span className="bg-[#C1682B]/20 text-[#DFB283] text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#C1682B]/25">
            Upravljačka Ploča
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-chocolate-900 hover:bg-chocolate-850 text-ivory-200 hover:text-white px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold border border-chocolate-800 transition duration-300 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Odjava</span>
        </button>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row items-stretch">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#26201B]/55 border-b md:border-b-0 md:border-r border-chocolate-850/30 p-4 space-y-2 flex flex-row md:flex-col justify-around md:justify-start">
          
          <button
            onClick={() => setActiveTab("menu")}
            className={`w-full flex items-center justify-center md:justify-start space-x-3 px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "menu" 
                ? "bg-[#C1682B] text-white shadow-soft" 
                : "text-ivory-300 hover:bg-[#26201B] hover:text-white"
            }`}
          >
            <MenuIcon className="h-4.5 w-4.5" />
            <span className="hidden md:inline">Jelovnik</span>
          </button>

          <button
            onClick={() => setActiveTab("hours")}
            className={`w-full flex items-center justify-center md:justify-start space-x-3 px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "hours" 
                ? "bg-[#C1682B] text-white shadow-soft" 
                : "text-ivory-300 hover:bg-[#26201B] hover:text-white"
            }`}
          >
            <Clock className="h-4.5 w-4.5" />
            <span className="hidden md:inline">Radno Vrijeme</span>
          </button>

          <button
            onClick={() => setActiveTab("text")}
            className={`w-full flex items-center justify-center md:justify-start space-x-3 px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "text" 
                ? "bg-[#C1682B] text-white shadow-soft" 
                : "text-ivory-300 hover:bg-[#26201B] hover:text-white"
            }`}
          >
            <FileText className="h-4.5 w-4.5" />
            <span className="hidden md:inline">Tekstovi Stranice</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center justify-center md:justify-start space-x-3 px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "analytics" 
                ? "bg-[#C1682B] text-white shadow-soft" 
                : "text-ivory-300 hover:bg-[#26201B] hover:text-white"
            }`}
          >
            <BarChart3 className="h-4.5 w-4.5" />
            <span className="hidden md:inline">Analitika Posjeta</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center justify-center md:justify-start space-x-3 px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "settings" 
                ? "bg-[#C1682B] text-white shadow-soft" 
                : "text-ivory-300 hover:bg-[#26201B] hover:text-white"
            }`}
          >
            <SettingsIcon className="h-4.5 w-4.5" />
            <span className="hidden md:inline">Godišnji Odmor</span>
          </button>

        </aside>

        {/* Action Panel Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-6xl mx-auto w-full space-y-6">
          
          {/* Notification Toast Alert */}
          {msg && (
            <div className={`fixed bottom-6 right-6 z-50 px-5 py-4 rounded-xl border flex items-center space-x-3 text-xs tracking-wide uppercase font-semibold shadow-premium animate-fade-in ${
              msgType === "success" 
                ? "bg-emerald-950/90 border-emerald-500/25 text-emerald-200" 
                : "bg-red-950/90 border-red-500/25 text-red-200"
            }`}>
              <Check className="h-4 w-4" />
              <span>{msg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 1: MENU ITEMS MANAGER */}
          {/* ======================================================== */}
          {activeTab === "menu" && (
            <div className="space-y-8">
              
              {/* Top Selector Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#26201B] p-5 rounded-2xl border border-chocolate-850/30">
                <div className="space-y-1">
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-white">Kategorija Jelovnika</h2>
                  <p className="text-xs text-ivory-300">Odaberite grupu jela za pregled i uređivanje redoslijeda.</p>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setNewItem({ ...newItem, category: e.target.value });
                  }}
                  className="bg-[#1A1512] border border-[#E6D5C3]/10 focus:border-[#C1682B] text-ivory-100 rounded-xl px-4 py-2.5 outline-none font-sans text-sm font-semibold"
                >
                  {Object.entries(categoryNames).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>

              {/* Grid: 1. Add new item form, 2. Items List */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Section A: Add Item form */}
                <form onSubmit={handleCreateItem} className="lg:col-span-4 bg-[#26201B] border border-chocolate-850/35 rounded-2xl p-6 space-y-4 shadow-soft">
                  <div className="flex items-center space-x-2 border-b border-chocolate-850/40 pb-3">
                    <PlusCircle className="h-5 w-5 text-[#DFB283]" />
                    <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                      Dodaj Novo Jelo
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase text-ivory-300 tracking-wider">ID jela (jedinstven, npr. piz-11)</label>
                    <input
                      type="text"
                      required
                      value={newItem.id}
                      onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
                      placeholder="piz-11"
                      className="w-full bg-[#1A1512] border border-[#E6D5C3]/10 focus:border-[#C1682B] outline-none px-3.5 py-2.5 text-ivory-100 text-xs rounded-xl transition duration-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase text-ivory-300 tracking-wider">Naziv jela (Hrvatski)</label>
                    <input
                      type="text"
                      required
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="Pizza Šunka Sir"
                      className="w-full bg-[#1A1512] border border-[#E6D5C3]/10 focus:border-[#C1682B] outline-none px-3.5 py-2.5 text-ivory-100 text-xs rounded-xl transition duration-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase text-ivory-300 tracking-wider">Cijena (EUR)</label>
                    <input
                      type="text"
                      required
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      placeholder="11.50"
                      className="w-full bg-[#1A1512] border border-[#E6D5C3]/10 focus:border-[#C1682B] outline-none px-3.5 py-2.5 text-ivory-100 text-xs rounded-xl transition duration-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase text-ivory-300 tracking-wider">Opis jela</label>
                    <textarea
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="Umak od rajčice, šunka, sir..."
                      rows={3}
                      className="w-full bg-[#1A1512] border border-[#E6D5C3]/10 focus:border-[#C1682B] outline-none px-3.5 py-2.5 text-ivory-100 text-xs rounded-xl transition duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C1682B] hover:bg-[#A9551E] text-white text-xs uppercase tracking-wider font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition duration-300 shadow-soft cursor-pointer mt-2"
                  >
                    <Plus className="h-4.5 w-4.5" />
                    <span>Dodaj jelo</span>
                  </button>
                </form>

                {/* Section B: Items list */}
                <div className="lg:col-span-8 bg-[#26201B] border border-chocolate-850/35 rounded-2xl p-6 space-y-4 shadow-soft">
                  <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider border-b border-chocolate-850/40 pb-3">
                    Popis Jela: {categoryNames[selectedCategory]}
                  </h3>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                    {menuItems
                      .filter(item => item.category === selectedCategory)
                      .sort((a, b) => a.display_order - b.display_order)
                      .map((item, idx, list) => {
                        const isEditing = editingItemId === item.id;
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`p-4 rounded-xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                              item.active 
                                ? "bg-[#1A1512]/60 border-chocolate-850/20" 
                                : "bg-black/30 border-dashed border-chocolate-850/10 opacity-60"
                            }`}
                          >
                            {isEditing ? (
                              // Edit Form Mode
                              <div className="flex-1 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  <input
                                    type="text"
                                    value={editingItemData.name}
                                    onChange={(e) => setEditingItemData({ ...editingItemData, name: e.target.value })}
                                    className="bg-[#26201B] border border-[#E6D5C3]/20 text-ivory-100 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#C1682B]"
                                  />
                                  <input
                                    type="text"
                                    value={editingItemData.price}
                                    onChange={(e) => setEditingItemData({ ...editingItemData, price: e.target.value })}
                                    className="bg-[#26201B] border border-[#E6D5C3]/20 text-ivory-100 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#C1682B]"
                                  />
                                </div>
                                <textarea
                                  value={editingItemData.description}
                                  onChange={(e) => setEditingItemData({ ...editingItemData, description: e.target.value })}
                                  rows={2}
                                  className="w-full bg-[#26201B] border border-[#E6D5C3]/20 text-ivory-100 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#C1682B] resize-none"
                                />
                                <div className="flex space-x-2 justify-end">
                                  <button
                                    onClick={cancelEditing}
                                    className="px-3 py-1.5 rounded-lg border border-chocolate-850/40 text-xs text-ivory-300 hover:text-white"
                                  >
                                    Odustani
                                  </button>
                                  <button
                                    onClick={() => handleSaveEdit(item.id)}
                                    className="bg-[#C1682B] hover:bg-[#A9551E] text-white px-3.5 py-1.5 rounded-lg text-xs flex items-center space-x-1.5"
                                  >
                                    <Save className="h-3.5 w-3.5" />
                                    <span>Spremi</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // View mode
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center space-x-3">
                                  <h4 className="font-serif text-sm font-semibold text-white">
                                    {item.name}
                                  </h4>
                                  <span className="text-[#DFB283] font-semibold text-xs font-sans">
                                    {item.price} €
                                  </span>
                                  <span className="text-[10px] text-ivory-300/40 font-mono">
                                    {item.id}
                                  </span>
                                </div>
                                <p className="text-xs text-ivory-300 font-sans leading-relaxed">
                                  {item.description || "Nema opisa..."}
                                </p>
                              </div>
                            )}

                            {/* Utility actions */}
                            {!isEditing && (
                              <div className="flex items-center space-x-2.5 self-end md:self-center">
                                
                                {/* Up button */}
                                <button
                                  disabled={idx === 0}
                                  onClick={() => handleMove(item.id, "up")}
                                  className="p-1.5 bg-chocolate-900 border border-chocolate-800 text-ivory-300 hover:text-white rounded-lg disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                  title="Pomakni gore"
                                >
                                  <ArrowUp className="h-3.5 w-3.5" />
                                </button>
                                
                                {/* Down button */}
                                <button
                                  disabled={idx === list.length - 1}
                                  onClick={() => handleMove(item.id, "down")}
                                  className="p-1.5 bg-chocolate-900 border border-chocolate-800 text-ivory-300 hover:text-white rounded-lg disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                  title="Pomakni dolje"
                                >
                                  <ArrowDown className="h-3.5 w-3.5" />
                                </button>

                                {/* Toggle Active Check */}
                                <button
                                  onClick={() => handleToggleActive(item.id, item.active)}
                                  className={`p-1.5 border rounded-lg transition duration-200 cursor-pointer ${
                                    item.active 
                                      ? "bg-[#C1682B]/10 border-[#C1682B]/20 text-[#DFB283] hover:bg-[#C1682B]/20" 
                                      : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                                  }`}
                                  title={item.active ? "Sakrij jelo na stranici" : "Prikaži jelo na stranici"}
                                >
                                  {item.active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                                </button>

                                {/* Edit trigger */}
                                <button
                                  onClick={() => startEditing(item)}
                                  className="px-2.5 py-1.5 bg-[#26201B] border border-chocolate-850/40 text-ivory-300 hover:text-[#DFB283] text-xs font-semibold rounded-lg transition duration-200 cursor-pointer"
                                >
                                  Uredi
                                </button>

                                {/* Delete button */}
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-300 hover:text-red-400 rounded-lg cursor-pointer transition duration-200"
                                  title="Obriši"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>

                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: OPENING HOURS MANAGER */}
          {/* ======================================================== */}
          {activeTab === "hours" && (
            <div className="bg-[#26201B] border border-chocolate-850/35 rounded-2xl p-6 sm:p-8 space-y-6 shadow-soft">
              <div className="border-b border-chocolate-850/40 pb-4">
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wider">Radno Vrijeme</h2>
                <p className="text-xs text-ivory-300 mt-1">Uredite dane i satnicu rada za sezonu.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hours.map((h) => (
                  <div key={h.id} className="bg-[#1A1512]/60 border border-chocolate-850/20 p-5 rounded-xl space-y-4">
                    <h3 className="font-serif text-sm font-semibold text-[#DFB283] uppercase tracking-wide">
                      {h.day_group || "Grupa dana"}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-ivory-300 uppercase font-semibold">Početak</label>
                        <input
                          type="text"
                          value={h.open_time}
                          onChange={(e) => handleHoursChange(h.id, "open_time", e.target.value)}
                          className="w-full bg-[#26201B] border border-[#E6D5C3]/10 focus:border-[#C1682B] rounded-lg px-3.5 py-2 text-xs outline-none text-ivory-100"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-ivory-300 uppercase font-semibold">Završetak</label>
                        <input
                          type="text"
                          value={h.close_time}
                          onChange={(e) => handleHoursChange(h.id, "close_time", e.target.value)}
                          className="w-full bg-[#26201B] border border-[#E6D5C3]/10 focus:border-[#C1682B] rounded-lg px-3.5 py-2 text-xs outline-none text-ivory-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1 col-span-2">
                        <label className="text-[10px] text-ivory-300 uppercase font-semibold">Sezonska Oznaka</label>
                        <input
                          type="text"
                          value={h.season_label}
                          onChange={(e) => handleHoursChange(h.id, "season_label", e.target.value)}
                          className="w-full bg-[#26201B] border border-[#E6D5C3]/10 focus:border-[#C1682B] rounded-lg px-3.5 py-2 text-xs outline-none text-ivory-100"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleSaveHours(h)}
                      className="w-full bg-[#C1682B] hover:bg-[#A9551E] text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-1.5 transition duration-300 shadow-soft cursor-pointer mt-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Spremi promjene</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: SITE TRANSLATED TEXTS */}
          {/* ======================================================== */}
          {activeTab === "text" && (
            <div className="bg-[#26201B] border border-chocolate-850/35 rounded-2xl p-6 sm:p-8 space-y-6 shadow-soft">
              
              {/* Header and Language Subtab Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-chocolate-850/40 pb-4 gap-4">
                <div className="space-y-1">
                  <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wider">Tekstovi & Prijevodi</h2>
                  <p className="text-xs text-ivory-300">Uredite naslove, opise i predloške poruka po jezicima.</p>
                </div>
                
                <div className="flex space-x-1.5 bg-[#1A1512] p-1 border border-chocolate-850/30 rounded-xl">
                  {(["hr", "en", "it", "de"] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg text-xs uppercase font-bold tracking-wider transition cursor-pointer ${
                        selectedLanguage === lang 
                          ? "bg-[#C1682B] text-white shadow-soft" 
                          : "text-ivory-300 hover:text-white"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editable Fields list */}
              <div className="space-y-5 max-h-[600px] overflow-y-auto pr-1">
                {filteredContentRows.map((row) => (
                  <div key={row.key} className="bg-[#1A1512]/60 border border-chocolate-850/20 p-4.5 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#DFB283] font-mono uppercase tracking-widest bg-chocolate-900/40 border border-[#C1682B]/10 px-2.5 py-1 rounded-md">
                        {row.key}
                      </span>
                      <button
                        onClick={() => handleSaveText(row.key, row.value)}
                        className="bg-[#C1682B] hover:bg-[#A9551E] text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
                      >
                        <Save className="h-3 w-3" />
                        <span>Spremi</span>
                      </button>
                    </div>

                    <textarea
                      value={row.value}
                      onChange={(e) => handleTextChange(row.key, e.target.value)}
                      rows={row.value.length > 100 ? 4 : 2}
                      className="w-full bg-[#26201B] border border-[#E6D5C3]/10 focus:border-[#C1682B] rounded-xl px-3.5 py-2.5 text-xs outline-none text-ivory-100 leading-relaxed"
                    />
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: SECTION VIEW TRACKING ANALYTICS */}
          {/* ======================================================== */}
          {activeTab === "analytics" && (
            <div className="bg-[#26201B] border border-chocolate-850/35 rounded-2xl p-6 sm:p-8 space-y-8 shadow-soft">
              
              <div className="border-b border-chocolate-850/40 pb-4">
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wider">Statistika Posjeta</h2>
                <p className="text-xs text-ivory-300 mt-1">Pregledajte posjećenost pojedinih sekcija u zadnjih 30 dana.</p>
              </div>

              {/* Total Aggregate statistics blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["hero", "jelovnik", "kontakt", "rezervacija"].map(sect => {
                  const val = analytics.totalViews[sect] || 0;
                  return (
                    <div key={sect} className="bg-[#1A1512]/60 border border-chocolate-850/20 p-5 rounded-xl text-center space-y-1">
                      <p className="text-[10px] text-ivory-300 font-semibold uppercase tracking-wider">{sect}</p>
                      <h4 className="text-2xl sm:text-3xl font-bold text-[#DFB283]">{val}</h4>
                      <p className="text-[9px] text-ivory-300/40">ukupno pregleda</p>
                    </div>
                  );
                })}
              </div>

              {/* Beautiful custom CSS Progress indicators bar chart */}
              <div className="space-y-5">
                <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wide">
                  Relativna Učestalost Posjeta
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(analytics.totalViews).map(([sect, views]) => {
                    const max = Math.max(...Object.values(analytics.totalViews), 1);
                    const percent = Math.min((views / max) * 100, 100);
                    
                    return (
                      <div key={sect} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="uppercase text-ivory-100">{sect}</span>
                          <span className="text-[#DFB283]">{views} pregleda</span>
                        </div>
                        <div className="w-full bg-[#1A1512] rounded-full h-3.5 overflow-hidden border border-chocolate-850/15">
                          <div 
                            className="bg-[#C1682B] h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Views Timeline List Table */}
              <div className="space-y-3">
                <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wide border-b border-chocolate-850/40 pb-2">
                  Dnevni Zapis Pregleda (Zadnjih 7 Dana)
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-chocolate-850/20 text-[#DFB283] uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 font-semibold">Datum</th>
                        <th className="py-2.5 font-semibold">Hero</th>
                        <th className="py-2.5 font-semibold">Jelovnik</th>
                        <th className="py-2.5 font-semibold">Kontakt</th>
                        <th className="py-2.5 font-semibold">Rezervacija</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-chocolate-850/10 text-ivory-300">
                      {analytics.last30DaysList.slice(0, 7).map(date => {
                        const hero = analytics.viewsByDay[date]?.["hero"] || 0;
                        const menu = analytics.viewsByDay[date]?.["jelovnik"] || 0;
                        const contact = analytics.viewsByDay[date]?.["kontakt"] || 0;
                        const booking = analytics.viewsByDay[date]?.["rezervacija"] || 0;
                        
                        return (
                          <tr key={date} className="hover:bg-[#1A1512]/40 transition duration-150">
                            <td className="py-2.5 font-mono">{date}</td>
                            <td className="py-2.5">{hero}</td>
                            <td className="py-2.5">{menu}</td>
                            <td className="py-2.5">{contact}</td>
                            <td className="py-2.5">{booking}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: VACATION AND SETTINGS MANAGER */}
          {/* ======================================================== */}
          {activeTab === "settings" && (
            <div className="bg-[#26201B] border border-chocolate-850/35 rounded-2xl p-6 sm:p-8 space-y-6 shadow-soft animate-fade-in">
              <div className="border-b border-chocolate-850/40 pb-4">
                <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wider">Upravljanje Godišnjim Odmorom</h2>
                <p className="text-xs text-ivory-300 mt-1">Postavite razdoblje godišnjeg odmora. Bistro Top će automatski prikazati obavijest posjetiteljima tijekom ovog perioda.</p>
              </div>

              <div className="max-w-md space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-ivory-300 uppercase font-semibold">Godišnji od</label>
                    <input
                      type="date"
                      value={vacationStart}
                      onChange={(e) => setVacationStart(e.target.value)}
                      className="w-full bg-[#1A1512] border border-[#E6D5C3]/10 focus:border-[#C1682B] rounded-xl px-3.5 py-2.5 text-xs outline-none text-ivory-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-ivory-300 uppercase font-semibold">Godišnji do</label>
                    <input
                      type="date"
                      value={vacationEnd}
                      onChange={(e) => setVacationEnd(e.target.value)}
                      className="w-full bg-[#1A1512] border border-[#E6D5C3]/10 focus:border-[#C1682B] rounded-xl px-3.5 py-2.5 text-xs outline-none text-ivory-100"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={async () => {
                      try {
                        const startVal = vacationStart || null;
                        const endVal = vacationEnd || null;
                        const res = await updateVacationSettings(startVal, endVal);
                        if (res.success) {
                          triggerMsg("Postavke godišnjeg odmora su uspješno spremljene!");
                        }
                      } catch (err: any) {
                        triggerMsg(err.message || "Greška pri spremanju postavki", "error");
                      }
                    }}
                    className="bg-[#C1682B] hover:bg-[#A9551E] text-white text-xs uppercase tracking-wider font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition duration-300 shadow-soft cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Spremi</span>
                  </button>

                  {(vacationStart || vacationEnd) && (
                    <button
                      onClick={async () => {
                        try {
                          const res = await updateVacationSettings(null, null);
                          if (res.success) {
                            setVacationStart("");
                            setVacationEnd("");
                            triggerMsg("Godišnji odmor uspješno uklonjen!");
                          }
                        } catch (err: any) {
                          triggerMsg(err.message || "Greška pri uklanjanju", "error");
                        }
                      }}
                      className="bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 hover:text-red-200 text-xs uppercase tracking-wider font-semibold py-3 px-5 rounded-xl transition duration-300 cursor-pointer"
                    >
                      Ukloni
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
