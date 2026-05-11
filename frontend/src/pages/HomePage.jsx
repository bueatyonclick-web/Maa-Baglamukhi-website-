import React, { useEffect } from "react";
import Lenis from "lenis";
import HeroSection from "../components/site/HeroSection";
import DailyMantraSection from "../components/site/DailyMantraSection";
import AboutTempleSection from "../components/site/AboutTempleSection";
import PujaBookingSection from "../components/site/PujaBookingSection";
import LiveDarshanSection from "../components/site/LiveDarshanSection";
import FestivalsSection from "../components/site/FestivalsSection";
import MiraclesSection from "../components/site/MiraclesSection";
import GallerySection from "../components/site/GallerySection";
import DonationSection from "../components/site/DonationSection";
import HowToReachSection from "../components/site/HowToReachSection";
import FAQSection from "../components/site/FAQSection";
import SiteScaffold from "../components/site/SiteScaffold";

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <SiteScaffold>
      <main>
        <HeroSection />
        <div className="divider-sacred max-w-5xl mx-auto" />
        <DailyMantraSection />
        <AboutTempleSection />
        <PujaBookingSection />
        <LiveDarshanSection />
        <FestivalsSection />
        <MiraclesSection />
        <GallerySection />
        <DonationSection />
        <HowToReachSection />
        <FAQSection />
      </main>
    </SiteScaffold>
  );
}
