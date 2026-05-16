import React, { memo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function SpiritualCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border border-amber-500/20 bg-black/30 p-5 backdrop-blur-md shadow-[0_0_40px_-12px_rgba(245,158,11,0.25)] sm:p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SpiritualPoint({ text, index = 0 }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-white/75 sm:text-base">
      <Sparkles className="mt-1 h-4 w-4 shrink-0 text-amber-400/90" aria-hidden />
      <span>{text}</span>
    </li>
  );
}

export default memo(SpiritualCard);
