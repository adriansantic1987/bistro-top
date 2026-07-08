import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

import { getBistroData } from "@/utils/cache";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bistro Top | Krk Island Mediterranean Grill & Peka",
  description: "Savor authentic Mediterranean dining at Bistro Top on Krk Island, Croatia. Specializing in traditional charcoal grill, slow-cooked lamb and veal peka, and fresh seafood.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bistroData = await getBistroData();
  return (
    <html
      lang="hr"
      className={`${playfair.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory-50 text-chocolate-900 dark:bg-[#1A1512] dark:text-ivory-100 font-sans selection:bg-ivory-200 selection:text-chocolate-900 overflow-x-hidden transition-colors duration-250">
        <ThemeProvider>
          <LanguageProvider
            initialSiteContent={bistroData.site_content}
            initialMenuItems={bistroData.menu_items}
            initialOpeningHours={bistroData.opening_hours}
            initialSettings={bistroData.site_settings}
          >
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
