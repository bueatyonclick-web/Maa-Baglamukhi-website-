import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../../i18n/LanguageContext";

const SITE_LOGO = `${process.env.PUBLIC_URL || ""}/site-logo.png`;

export default function Navbar() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const { pathname } = useLocation();
  const isBookPuja = pathname === "/book-puja";
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /** Main nav (desktop center): Book Puja as text link; Contact after Donate. */
  const mainNavLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.bookPuja"), href: "/book-puja" },
    { label: t("nav.gallery"), href: "/gallery" },
    { label: t("nav.donate"), href: "/donate" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerSurface =
    scrolled || open
      ? "bg-ink-900/88 backdrop-blur-xl border-b border-saffron-500/20"
      : isHome
        ? "bg-black/30 backdrop-blur-[14px] border-b border-amber-400/15"
        : isBookPuja
          ? "bg-transparent border-b border-transparent"
        : "bg-transparent";

  const linkClass =
    isBookPuja || isHome
      ? `text-base lg:text-[17px] tracking-wide text-white/92 hover:text-amber-200 transition-colors relative group drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] ${isHi ? "font-deva leading-[1.45] pb-0.5" : "leading-snug"}`
      : `text-base lg:text-[17px] tracking-wide text-white/85 hover:text-saffron-300 transition-colors relative group ${isHi ? "font-deva leading-[1.45] pb-0.5" : "leading-snug"}`;

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${headerSurface}`}
      data-testid="site-navbar"
    >
      <div className="flex w-full items-center justify-between gap-3 px-4 py-4 md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-6 md:px-6 lg:gap-8 lg:px-10">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3.5 md:gap-4 group justify-self-start"
          data-testid="nav-logo"
        >
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-saffron-500/25 bg-ink-900/40 shadow-[0_0_28px_rgba(245,158,11,0.32)] md:h-[4.25rem] md:w-[4.25rem] lg:h-[4.75rem] lg:w-[4.75rem]">
            <img src={SITE_LOGO} alt="" className="h-full w-full object-cover" loading="eager" decoding="async" />
          </div>
          <div className="min-w-0 leading-normal">
            <p
              className={`text-saffron-300 drop-shadow-sm ${
                isHi
                  ? "font-deva text-sm leading-snug tracking-wide md:text-base lg:text-lg"
                  : "font-cinzel text-[10px] tracking-[0.32em] md:text-[11px]"
              }`}
            >
              {t("brand.line1")}
            </p>
            <p
              className={`text-white drop-shadow-md ${
                isHi
                  ? "font-deva text-xl leading-snug md:text-2xl lg:text-[1.75rem]"
                  : "font-serif text-lg -mt-0.5 leading-tight md:text-xl"
              }`}
            >
              {t("brand.line2")}
            </p>
          </div>
        </Link>

        <nav className="hidden min-w-0 items-center justify-center justify-self-center gap-4 px-2 md:flex lg:gap-6">
          {mainNavLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                className={`${linkClass} shrink-0 ${active ? "text-amber-100" : ""}`}
                data-testid={
                  l.href === "/contact"
                    ? "nav-link-contact"
                    : `nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`
                }
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-amber-300 to-saffron-500 transition-all duration-300 ${
                    active ? "w-full opacity-90" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center justify-end justify-self-end md:flex">
          <LanguageToggle />
        </div>

        <div className="flex items-center justify-end md:hidden">
          <button
            className="p-2 rounded-full bg-ink-700/60 border border-saffron-500/20 text-saffron-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-testid="nav-mobile-toggle"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-ink-900/95 backdrop-blur-xl border-t border-saffron-500/10"
        >
          <div className="px-6 py-5 grid gap-3">
            {mainNavLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-saffron-300 py-1.5"
                data-testid={
                  l.href === "/contact"
                    ? "mobile-nav-contact"
                    : `mobile-nav-${l.label.toLowerCase().replace(/\s/g, "-")}`
                }
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2">
              <LanguageToggle />
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
