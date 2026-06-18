import React, { Suspense, lazy } from "react";
import HeroSection from "../components/site/HeroSection";
import DailyMantraSection from "../components/site/DailyMantraSection";
import SiteScaffold from "../components/site/SiteScaffold";

// Below-the-fold sections are split out so they don't bloat the initial
// homepage chunk or delay the hero (LCP) paint on mobile.
const BaglamukhiHavanSection = lazy(() => import("../components/site/BaglamukhiHavanSection"));
const MaaBaglamukhiKnowledgeSection = lazy(() => import("../components/site/MaaBaglamukhiKnowledgeSection"));
const FestivalsSection = lazy(() => import("../components/site/FestivalsSection"));
const HowToReachSection = lazy(() => import("../components/site/HowToReachSection"));
const GallerySection = lazy(() => import("../components/site/GallerySection"));
const FAQSection = lazy(() => import("../components/site/FAQSection"));

function SectionSkeleton() {
  return <div className="min-h-[40vh]" aria-hidden />;
}

export default function HomePage() {
  return (
    <SiteScaffold>
      <HeroSection />
      <div className="divider-sacred mx-auto max-w-5xl" aria-hidden />
      <DailyMantraSection />
      <Suspense fallback={<SectionSkeleton />}>
        <BaglamukhiHavanSection />
        <MaaBaglamukhiKnowledgeSection />
        <FestivalsSection />
        <HowToReachSection />
        <GallerySection />
        <FAQSection />
      </Suspense>
    </SiteScaffold>
  );
}
