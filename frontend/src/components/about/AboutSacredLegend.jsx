import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ABOUT_IMAGE, FLOWER_IMAGE, MOUNTAIN_IMAGE } from "../../data/content";

const timeline = [
  { label: "Mahabharata Era", text: "Sacred tradition links this land with ancient dharma and the pursuit of righteous victory." },
  { label: "Ancient Siddha Peeth", text: "For generations, seekers have regarded Nalkheda as a living seat of Siddha energy and disciplined worship." },
  { label: "Tantric Worship Center", text: "The temple remains a respected place for authentic mantra, havan, and guidance within established lineage norms." },
  { label: "Present-Day Pilgrimage", text: "Devotees from across India and the world journey here with prayers for protection, clarity, and peace." },
];

export default function AboutSacredLegend() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -18]);

  return (
    <section
      id="about-legend"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden py-24 lg:py-36"
      aria-labelledby="about-legend-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(245,158,11,0.12),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left collage */}
          <div className="relative mx-auto h-[520px] w-full max-w-lg lg:mx-0 lg:h-[600px]" data-about-parallax data-speed="0.2">
            <motion.div style={{ y: y1 }} className="absolute left-0 top-0 h-[72%] w-[78%] overflow-hidden rounded-2xl border border-saffron-500/25 shadow-[0_30px_90px_-25px_rgba(245,158,11,0.35)]">
              <img src={ABOUT_IMAGE} alt="Temple worship and offerings" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              style={{ y: y2 }}
              className="absolute bottom-0 right-0 h-[62%] w-[68%] overflow-hidden rounded-2xl border border-saffron-500/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] animate-float-slow"
            >
              <img src={FLOWER_IMAGE} alt="Sacred flowers offered at the altar" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              style={{ y: y3 }}
              className="absolute -right-4 top-1/3 h-40 w-40 rounded-full border-2 border-saffron-400/35 shadow-[0_0_60px_rgba(245,158,11,0.25)]"
              aria-hidden
            />
            <div className="absolute -bottom-8 -left-6 h-28 w-28 rounded-full border border-saffron-500/25 bg-gradient-to-br from-saffron-500/10 to-transparent blur-sm animate-spin-slow" />
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[12%] top-[8%] h-24 w-24 rounded-full bg-saffron-500/15 blur-2xl"
            />
            <div className="absolute bottom-[6%] left-[4%] hidden h-36 w-52 overflow-hidden rounded-xl border border-saffron-500/15 opacity-90 sm:block">
              <img src={MOUNTAIN_IMAGE} alt="Sacred landscape near the region" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Right story */}
          <div data-about-reveal>
            <p className="font-cinzel text-xs tracking-[0.5em] text-saffron-300/90">✦ THE SACRED LEGEND ✦</p>
            <h2
              id="about-legend-heading"
              className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              A temple older than <span className="text-gold-shimmer italic">memory itself.</span>
            </h2>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/72">
              <p>
                On the banks of the Lakhundar River in Nalkheda, Madhya Pradesh, Shree Maa Baglamukhi Siddha Peeth is
                honoured as one of the deeply revered centres of Baglamukhi worship in India — a place where prayer,
                discipline, and devotion meet in quiet strength.
              </p>
              <p>
                Local and oral traditions associate this land with the Mahabharata age, when righteous seekers turned to
                the Mahavidyas for protection and clarity amid great trials. Such accounts are held devotionally rather
                than as literal historical proof; they express the temple&apos;s long spiritual memory in the heart of
                the community.
              </p>
              <p>
                Maa Baglamukhi, the eighth among the Dasha Mahavidyas, is worshipped as the power that stills harm,
                confusion, and hostile forces — granting courage, steadiness, and a clear path for the sincere devotee.
              </p>
              <p className="text-white/60">
                Across centuries, saints, householders, and practitioners have visited this Siddha Peeth for havan,
                mantra anushthan, and guidance — carrying forward a tone of respect, humility, and authentic sadhana.
              </p>
            </div>

            {/* Vertical golden timeline */}
            <div className="relative mt-12 border-l border-saffron-500/25 pl-8">
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-saffron-400/70 via-saffron-500/30 to-transparent" />
              {timeline.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ delay: i * 0.12, duration: 0.85, ease: "easeOut" }}
                  className="relative pb-10 last:pb-0"
                >
                  <span className="absolute -left-[39px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-saffron-400/60 bg-ink-800 shadow-[0_0_18px_rgba(245,158,11,0.45)]">
                    <span className="h-2 w-2 rounded-full bg-saffron-400" />
                  </span>
                  <p className="font-serif text-xl text-white">{t.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
