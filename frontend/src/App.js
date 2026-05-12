import React, { Suspense, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

const HomePage = React.lazy(() => import("@/pages/HomePage"));
const AboutPage = React.lazy(() => import("@/pages/AboutPage"));
const BookPujaPage = React.lazy(() => import("@/pages/BookPujaPage"));
const LiveDarshanPage = React.lazy(() => import("@/pages/LiveDarshanPage"));
const FestivalsPage = React.lazy(() => import("@/pages/FestivalsPage"));
const GalleryPage = React.lazy(() => import("@/pages/GalleryPage"));
const DonatePage = React.lazy(() => import("@/pages/DonatePage"));
const ContactPage = React.lazy(() => import("@/pages/ContactPage"));

function RouteFallback() {
  return (
    <div
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#0A0505] px-6 text-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-9 w-9 rounded-full border-2 border-amber-500/25 border-t-amber-400/90 animate-spin"
        aria-hidden
      />
      <p className="mt-4 font-cinzel text-xs tracking-[0.35em] text-amber-200/70">Loading…</p>
    </div>
  );
}

/** Scroll window to top on client-side route changes (navbar, links). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
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
        </Suspense>
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
