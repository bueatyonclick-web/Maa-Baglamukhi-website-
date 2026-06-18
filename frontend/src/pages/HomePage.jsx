import React from "react";
import HeroSection from "../components/site/HeroSection";
import DailyMantraSection from "../components/site/DailyMantraSection";
import BaglamukhiHavanSection from "../components/site/BaglamukhiHavanSection";
import MaaBaglamukhiKnowledgeSection from "../components/site/MaaBaglamukhiKnowledgeSection";
import FestivalsSection from "../components/site/FestivalsSection";
import GallerySection from "../components/site/GallerySection";
import HowToReachSection from "../components/site/HowToReachSection";
import FAQSection from "../components/site/FAQSection";
import SiteScaffold from "../components/site/SiteScaffold";

export default function HomePage() {
  return (
    <SiteScaffold>
      <HeroSection />
      <div className="divider-sacred mx-auto max-w-5xl" aria-hidden />
      <DailyMantraSection />
      <BaglamukhiHavanSection />
      <MaaBaglamukhiKnowledgeSection />
      <FestivalsSection />
      <HowToReachSection />
      <GallerySection />
      <FAQSection />
    </SiteScaffold>
  );
}
