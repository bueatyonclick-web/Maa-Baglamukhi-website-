import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GALLERY } from "../../data/content";

export default function GallerySection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="gallery" className="py-24 lg:py-32" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
            <p className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-5">✦ DIVINE GALLERY ✦</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Glimpses of the <span className="text-gold-shimmer italic">sacred.</span>
            </h2>
          </div>
          <p className="text-white/65 max-w-md">
            Captured during morning aartis, mahotsavs and silent midnights — moments where the divine becomes visible.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY.map((src, i) => (
            <motion.button
              key={i}
              onClick={() => setOpen(src)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-xl overflow-hidden group ${
                i === 0 || i === 5 ? "md:row-span-2 md:col-span-2 aspect-square md:aspect-auto" : "aspect-square"
              }`}
              data-testid={`gallery-item-${i}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-ink-900/40 group-hover:bg-ink-900/10 transition-colors" />
              <div className="absolute inset-0 ring-1 ring-saffron-500/20 group-hover:ring-saffron-400/60 transition-all" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink-900/95 backdrop-blur-md grid place-items-center p-6"
            onClick={() => setOpen(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={open}
              alt=""
              className="max-w-5xl max-h-[88vh] rounded-2xl border border-saffron-500/30"
            />
            <button onClick={() => setOpen(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full glass-card grid place-items-center text-saffron-300 hover:text-white" data-testid="close-lightbox">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
