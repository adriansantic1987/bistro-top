"use client";

import { useState } from "react";
import { loginAdmin } from "../actions";
import { Lock, Utensils, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError("");

    try {
      const res = await loginAdmin(password);
      if (res.success) {
        window.location.href = "/admin";
      } else {
        setError(res.error || "Pogrešna lozinka");
      }
    } catch (err) {
      setError("Došlo je do pogreške. Provjerite vezu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1512] flex items-center justify-center px-4 font-sans select-none">
      <div className="max-w-md w-full bg-[#26201B] border border-chocolate-850/50 rounded-3xl p-8 sm:p-10 shadow-premium space-y-8">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-chocolate-900/40 rounded-full border border-[#C1682B]/20">
            <Utensils className="h-6 w-6 text-[#DFB283]" />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-wide text-ivory-100 uppercase">
            Bistro Top
          </h1>
          <p className="text-xs text-ivory-300 tracking-wider uppercase">
            Administracijska Prijava
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl flex items-center space-x-2.5 text-xs">
              <AlertCircle className="h-4.5 w-4.5 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#DFB283]">
              Lozinka sustava
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-ivory-300/45">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#1A1512] border border-[#E6D5C3]/10 focus:border-[#C1682B] outline-none pl-11 pr-4 py-3.5 text-ivory-100 font-sans text-sm rounded-xl transition-all duration-200 placeholder:text-ivory-300/20"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C1682B] hover:bg-[#A9551E] active:scale-[0.99] disabled:opacity-50 text-white font-sans font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-soft hover:shadow-active transition-all duration-300 cursor-pointer text-xs uppercase tracking-wider"
          >
            <span>{loading ? "Prijava u tijeku..." : "Prijavi se"}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
