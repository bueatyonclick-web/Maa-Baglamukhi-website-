import React from "react";
import SiteScaffold from "../components/site/SiteScaffold";
import Footer from "../components/site/Footer";

export default function ContactPage() {
  return (
    <SiteScaffold showFooter={false}>
      <Footer />
    </SiteScaffold>
  );
}

