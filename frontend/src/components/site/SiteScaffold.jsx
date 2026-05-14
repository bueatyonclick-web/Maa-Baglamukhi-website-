import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AskPanditChat from "./AskPanditChat";

export default function SiteScaffold({ children, showFooter = true }) {
  return (
    <div className="dark min-h-[100svh] overflow-x-hidden bg-ink-900 text-white">
      <Navbar />
      <main className="min-w-0 touch-pan-y">{children}</main>
      {showFooter && <Footer />}
      <AskPanditChat />
    </div>
  );
}

