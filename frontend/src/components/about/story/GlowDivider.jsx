import React, { memo } from "react";
import { motion } from "framer-motion";

function GlowDivider({ className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.6 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative my-10 h-px w-full max-w-md ${className}`}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
        animate={{ opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/80 shadow-[0_0_16px_rgba(251,191,36,0.9)]" />
    </motion.div>
  );
}

export default memo(GlowDivider);
