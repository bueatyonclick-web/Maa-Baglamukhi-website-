import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import MantraMuteButton from "./MantraMuteButton";
import { useLanguage } from "../../i18n/LanguageContext";
import { setSmoothScrollPaused } from "../../lib/smoothScroll";

const SITE_LOGO = `${process.env.PUBLIC_URL || ""}/site-logo.png`;

function Navbar() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const { pathname } = useLocation();
  const isBookPuja = pathname === "/book-puja";
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const mainNavLinks = useMemo(
    () => [
      { label: t("nav.home"), href: "/" },
      { label: t("nav.about"), href: "/about" },
      { label: t("nav.gallery"), href: "/gallery" },
      { label: t("nav.contact"), href: "/contact" },
    ],
    [t],
  );

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    setSmoothScrollPaused(open);
    return () => {
      document.body.style.removeProperty("overflow");
      setSmoothScrollPaused(false);
    };
  }, [open]);

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
      ? `text-sm xl:text-[15px] tracking-[0.12em] uppercase text-white/92 hover:text-amber-200 transition-colors relative group drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] ${isHi ? "font-deva normal-case tracking-wide leading-[1.45] pb-0.5" : "font-cinzel"}`
      : `text-sm xl:text-[15px] tracking-[0.12em] uppercase text-white/85 hover:text-saffron-300 transition-colors relative group ${isHi ? "font-deva normal-case tracking-wide leading-[1.45] pb-0.5" : "font-cinzel"}`;

  const ctaClass =
    "inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border border-amber-400/55 bg-black/20 px-4 py-2.5 text-[11px] tracking-[0.18em] text-amber-50 shadow-[0_0_22px_rgba(245,158,11,0.22)] backdrop-blur-sm transition-all hover:border-amber-300 hover:bg-amber-500/10 hover:shadow-[0_0_32px_rgba(251,191,36,0.38)] touch-manipulation xl:px-5 xl:text-xs xl:tracking-[0.22em]";

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerSurface}`}
      data-testid="site-navbar"
    >
      <div className="flex w-full min-w-0 items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-6 lg:px-8 xl:gap-8 xl:px-10">
        <Link
          to="/"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 justify-self-start sm:gap-3 lg:gap-4"
          data-testid="nav-logo"
        >
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-amber-400/40 bg-ink-900/50 shadow-[0_0_24px_rgba(245,158,11,0.35)] sm:h-12 sm:w-12 lg:h-14 lg:w-14">
            <img src={SITE_LOGO} alt="" className="h-full w-full object-cover" loading="eager" decoding="async" />
          </div>
          <p
            className={`min-w-0 text-white drop-shadow-md ${
              isHi
                ? "font-deva text-base leading-snug sm:text-lg md:text-xl lg:text-2xl"
                : "font-cinzel text-xs tracking-[0.12em] sm:text-sm lg:text-base xl:text-lg"
            } max-w-[9.5rem] truncate sm:max-w-[11rem] md:max-w-[14rem] lg:max-w-none`}
          >
            {t("brand.name")}
          </p>
        </Link>

        {/* Desktop nav — 1024px+ only (tablets use menu) */}
        <nav className="hidden min-w-0 items-center justify-center justify-self-center gap-4 px-2 lg:flex xl:gap-7">
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

        <div className="hidden shrink-0 items-center justify-end gap-2 justify-self-end lg:flex xl:gap-3">
          <MantraMuteButton />
          <LanguageToggle />
          <Link
            to="/book-puja"
            className={`${ctaClass} ${isHi ? "font-deva normal-case tracking-wide text-sm" : "font-cinzel"}`}
            data-testid="nav-cta-book-puja"
          >
            {t("nav.ctaBook")}
          </Link>
        </div>

        {/* Mobile + tablet controls */}
        <div className="flex items-center justify-end gap-2 lg:hidden">
          <MantraMuteButton className="hidden sm:flex" />
          <button
            type="button"
            className="grid min-h-[44px] min-w-[44px] place-items-center rounded-full border border-saffron-500/20 bg-ink-700/60 p-2 text-saffron-300 touch-manipulation"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
            data-testid="nav-mobile-toggle"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-saffron-500/10 bg-ink-900/95 backdrop-blur-xl"
          data-lenis-prevent
        >
          <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 md:px-8 md:py-6">
            <div className="grid gap-2 sm:grid-cols-2">
              {mainNavLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center rounded-xl border border-white/5 px-4 py-3 text-base text-white/85 transition-colors hover:border-amber-400/25 hover:bg-white/5 hover:text-saffron-300 md:min-h-[52px] md:text-lg"
                  data-testid={
                    l.href === "/contact"
                      ? "mobile-nav-contact"
                      : `mobile-nav-${l.label.toLowerCase().replace(/\s/g, "-")}`
                  }
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                to="/book-puja"
                onClick={() => setOpen(false)}
                className={`${ctaClass} w-full justify-center sm:w-auto ${isHi ? "font-deva normal-case tracking-wide text-sm" : "font-cinzel"}`}
                data-testid="nav-cta-book-puja-mobile"
              >
                {t("nav.ctaBook")}
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <MantraMuteButton className="sm:hidden" />
                <LanguageToggle />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

export default React.memo(Navbar);
