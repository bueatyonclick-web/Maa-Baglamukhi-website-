import React, { useEffect } from "react";
import Lenis from "lenis";
import HeroSection from "../components/site/HeroSection";
import DailyMantraSection from "../components/site/DailyMantraSection";
import FestivalsSection from "../components/site/FestivalsSection";
import GallerySection from "../components/site/GallerySection";
import HowToReachSection from "../components/site/HowToReachSection";
import FAQSection from "../components/site/FAQSection";
import SiteScaffold from "../components/site/SiteScaffold";

export default function HomePage() {
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const lenis = new Lenis({
      duration: 0.82,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.15,
    });
    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <SiteScaffold>
      <HeroSection />
      <div className="divider-sacred mx-auto max-w-5xl" aria-hidden />
      <DailyMantraSection />
      <FestivalsSection />
      <GallerySection />
      <HowToReachSection />
      <FAQSection />
    </SiteScaffold>
  );
}
