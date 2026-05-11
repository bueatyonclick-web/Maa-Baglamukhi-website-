import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { apiGet } from "../../lib/api";

function useCountdown(target) {
  const [diff, setDiff] = useState(null);
  useEffect(() => {
    const tick = () => {
      const t = new Date(target).getTime() - Date.now();
      if (t <= 0) return setDiff({ d: 0, h: 0, m: 0, s: 0 });
      setDiff({
        d: Math.floor(t / (1000 * 60 * 60 * 24)),
        h: Math.floor((t / (1000 * 60 * 60)) % 24),
        m: Math.floor((t / (1000 * 60)) % 60),
        s: Math.floor((t / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return diff;
}

const FestivalCard = ({ festival, idx }) => {
  const c = useCountdown(festival.date);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="rounded-2xl glass-card p-7 hover:border-saffron-400 transition-all"
      data-testid={`festival-card-${festival.id}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.3em]">FESTIVAL</p>
          <h3 className="font-serif text-2xl text-white mt-2">{festival.name}</h3>
          <p className="text-white/55 text-xs mt-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(festival.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
      <p className="text-white/65 text-sm mt-3 leading-relaxed">{festival.description}</p>

      {c && (
        <div className="mt-5 grid grid-cols-4 gap-2 text-center">
          {[
            { v: c.d, l: "Days" },
            { v: c.h, l: "Hrs" },
            { v: c.m, l: "Min" },
            { v: c.s, l: "Sec" },
          ].map((u) => (
            <div key={u.l} className="bg-ink-800/80 border border-saffron-500/15 rounded-lg py-2.5">
              <p className="font-serif text-2xl text-saffron-300 leading-none">{String(u.v).padStart(2, "0")}</p>
              <p className="text-white/50 text-[10px] mt-1 tracking-wider">{u.l}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function FestivalsSection() {
  const [festivals, setFestivals] = useState([]);
  useEffect(() => {
    apiGet("/festivals").then((d) => setFestivals(d.festivals || [])).catch(() => {});
  }, []);

  return (
    <section id="festivals" className="py-24 lg:py-32" data-testid="festivals-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-5">✦ FESTIVAL CALENDAR ✦</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white">
            Sacred <span className="text-gold-shimmer italic">celebrations</span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Be present for the most powerful nights at the temple — each festival is a cosmic gateway.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {festivals.map((f, i) => (
            <FestivalCard key={f.id} festival={f} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
