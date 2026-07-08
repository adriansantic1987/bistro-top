"use client";

import { useEffect, useRef } from "react";

export default function AnalyticsTracker() {
  const trackedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const logView = async (section: string) => {
      try {
        await fetch("/api/page-views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ section }),
          // keepalive: true allows the request to outlive the page unload if needed
          keepalive: true
        });
      } catch (e) {
        // Silently capture errors so tracking failure never impacts user experience
        console.warn("Analytics logging failed silently:", e);
      }
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          let sectionName = "";

          if (targetId === "home") {
            sectionName = "hero";
          } else if (targetId === "menu") {
            sectionName = "jelovnik";
          } else if (targetId === "footer-contact") {
            sectionName = "kontakt";
          } else if (targetId === "footer-booking") {
            sectionName = "rezervacija";
          }

          if (sectionName && !trackedSections.current.has(sectionName)) {
            trackedSections.current.add(sectionName);
            logView(sectionName);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null, // Viewport
      rootMargin: "0px",
      threshold: 0.25 // Trigger when 25% of the element is visible
    });

    // Observe targeted elements on home page
    const targets = ["home", "menu", "footer-contact", "footer-booking"];
    targets.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // Renderless tracker
}
