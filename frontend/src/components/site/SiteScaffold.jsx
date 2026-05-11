import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AskPanditChat from "./AskPanditChat";

export default function SiteScaffold({ children, showFooter = true }) {
  return (
    <div className="dark bg-ink-900 text-white min-h-screen">
      <Navbar />
      <main>{children}</main>
      {showFooter && <Footer />}
      <AskPanditChat />
    </div>
  );
}

