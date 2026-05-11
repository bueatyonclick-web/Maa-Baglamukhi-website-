import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { MIRACLES } from "../../data/content";

export default function MiraclesSection() {
  return (
    <section className="relative py-24 lg:py-32 mandala-bg" data-testid="miracles-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <p className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-5">✦ DEVOTEE STORIES ✦</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
              Where <span className="text-gold-shimmer italic">miracles</span> are remembered.
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              From courtrooms in Mumbai to homes in California, devotees share how Maa Baglamukhi
              turned despair into divine victory.
            </p>
            <a href="#contact" className="btn-ghost-sacred mt-7 inline-flex" data-testid="share-story-btn">
              Share Your Story
            </a>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {MIRACLES.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 glass-card hover:border-saffron-400 transition-all ${i % 2 === 0 ? "sm:mt-10" : ""}`}
                data-testid={`miracle-card-${i}`}
              >
                <Quote className="w-7 h-7 text-saffron-400/70 mb-3" />
                <p className="text-white/85 text-sm leading-relaxed italic">"{m.text}"</p>
                <div className="mt-5 pt-4 border-t border-saffron-500/15">
                  <p className="font-serif text-saffron-200 text-base">{m.name}</p>
                  <p className="text-white/50 text-xs tracking-wide">{m.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
