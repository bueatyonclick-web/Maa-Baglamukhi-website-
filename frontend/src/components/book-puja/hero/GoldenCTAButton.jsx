import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const baseTap = { scale: 0.98 };

export function GoldenCTAPrimary({ children, to, onClick, href }) {
  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className="relative inline-flex w-full min-w-0 items-center justify-center overflow-hidden rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-8 py-3.5 font-cinzel text-sm tracking-[0.2em] text-ink-900 shadow-[0_0_32px_rgba(245,158,11,0.45)] transition-shadow duration-500 hover:shadow-[0_0_48px_rgba(251,191,36,0.65)] sm:w-auto md:px-10 md:text-[15px]"
        whileHover={{ y: -2, boxShadow: "0 0 52px rgba(251,191,36,0.55)" }}
        whileTap={baseTap}
      >
        <span className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] bg-[length:220%_100%] opacity-40" />
        <span className="relative">{children}</span>
      </motion.a>
    );
  }
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={baseTap}>
      <Link
        to={to}
        onClick={onClick}
        className="relative inline-flex w-full min-w-0 items-center justify-center overflow-hidden rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-8 py-3.5 font-cinzel text-sm tracking-[0.2em] text-ink-900 shadow-[0_0_32px_rgba(245,158,11,0.45)] transition-shadow duration-500 hover:shadow-[0_0_48px_rgba(251,191,36,0.65)] sm:w-auto md:px-10 md:text-[15px]"
      >
        <span className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] bg-[length:220%_100%] opacity-40" />
        <span className="relative">{children}</span>
      </Link>
    </motion.div>
  );
}

export function GoldenCTAGlass({ children, to }) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={baseTap}>
      <Link
        to={to}
        className="group relative inline-flex w-full min-w-0 items-center justify-center overflow-hidden rounded-full border border-amber-400/45 bg-white/[0.04] px-8 py-3.5 font-cinzel text-sm tracking-[0.18em] text-amber-100/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-colors duration-500 hover:border-amber-300/70 hover:bg-white/[0.07] sm:w-auto md:px-10 md:text-[15px]"
      >
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(105deg,transparent_40%,rgba(251,191,36,0.25)_50%,transparent_60%)] bg-[length:200%_100%]" />
        </span>
        <span className="relative">{children}</span>
      </Link>
    </motion.div>
  );
}
