import React from "react";
import SiteScaffold from "../components/site/SiteScaffold";
import BookPujaHeroCinematic from "../components/book-puja/BookPujaHeroCinematic";
import HavanBookingExperience from "../components/book-puja/HavanBookingExperience";
import PujaBookingSection from "../components/site/PujaBookingSection";

export default function BookPujaPage() {
  return (
    <SiteScaffold>
      <BookPujaHeroCinematic />
      <HavanBookingExperience />
      <PujaBookingSection />
    </SiteScaffold>
  );
}

