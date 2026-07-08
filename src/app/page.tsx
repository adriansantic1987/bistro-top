import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import MenuSection from "@/components/Menu/MenuSection";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function Home() {
  return (
    <>
      {/* Dynamic analytics view logger */}
      <AnalyticsTracker />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero />

        {/* Story/About Us Section (Moved above Menu) */}
        <AboutUs />

        {/* Menu Cards List Section */}
        <MenuSection />
      </main>

      {/* Footer Area with consolidated Address, Hours, Maps and Action Box */}
      <Footer />
    </>
  );
}
