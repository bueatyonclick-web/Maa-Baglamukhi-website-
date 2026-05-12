import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import BookPujaPage from "@/pages/BookPujaPage";
import LiveDarshanPage from "@/pages/LiveDarshanPage";
import FestivalsPage from "@/pages/FestivalsPage";
import GalleryPage from "@/pages/GalleryPage";
import DonatePage from "@/pages/DonatePage";
import ContactPage from "@/pages/ContactPage";

/** Scroll window to top on client-side route changes (navbar, links). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/book-puja" element={<BookPujaPage />} />
          <Route path="/live-darshan" element={<LiveDarshanPage />} />
          <Route path="/festivals" element={<FestivalsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1A0B0C",
            border: "1px solid rgba(245,158,11,0.3)",
            color: "#FDF8F5",
          },
        }}
      />
    </div>
  );
}

export default App;
