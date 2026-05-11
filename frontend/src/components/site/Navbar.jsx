import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { label: "About", href: "/about" },
  { label: "Book Puja", href: "/book-puja" },
  { label: "Live Darshan", href: "/live-darshan" },
  { label: "Festivals", href: "/festivals" },
  { label: "Gallery", href: "/gallery" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink-900/85 backdrop-blur-xl border-b border-saffron-500/15" : "bg-transparent"
      }`}
      data-testid="site-navbar"
    >
      <div className="w-full px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" data-testid="nav-logo">
          <div className="w-10 h-10 rounded-full grid place-items-center bg-gradient-to-br from-saffron-400 to-saffron-700 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <Flame className="w-5 h-5 text-ink-900" />
          </div>
          <div className="leading-tight">
            <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.3em]">SHREE MAA</p>
            <p className="font-serif text-white text-lg -mt-0.5">Baglamukhi Peeth</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="text-base lg:text-[17px] tracking-wide text-white/85 hover:text-saffron-300 transition-colors relative group"
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-saffron-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/book-puja" className="hidden md:inline-flex btn-primary-sacred text-sm py-2.5 px-5" data-testid="nav-book-puja">
            Book Puja
          </Link>
          <button
            className="md:hidden p-2 rounded-full bg-ink-700/60 border border-saffron-500/20 text-saffron-300"
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
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-saffron-300 py-1.5"
                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/book-puja" onClick={() => setOpen(false)} className="btn-primary-sacred mt-2 justify-center">Book Puja</Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
