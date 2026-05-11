import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Radio, Flame as FlameIcon } from "lucide-react";
import { toast } from "sonner";
import { apiGet, apiPost } from "../../lib/api";
import { DIYA_IMAGE } from "../../data/content";

export default function LiveDarshanSection() {
  const [stats, setStats] = useState({ diyas_lit: 100023, devotees_today: 4827, live_viewers: 312 });
  const [lit, setLit] = useState(false);
  const [wish, setWish] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    apiGet("/temple-stats").then(setStats).catch(() => {});
  }, []);

  const lightDiya = async () => {
    try {
      const res = await apiPost("/diya-offering", { devotee_name: name || "Anonymous Devotee", wish });
      setLit(true);
      setStats((s) => ({ ...s, diyas_lit: res.total_diyas_lit }));
      toast.success("🪔 Your diya glows at Maa's feet.");
      setTimeout(() => setLit(false), 4000);
    } catch {
      toast.error("Could not light diya. Try again.");
    }
  };

  return (
    <section id="darshan" className="relative py-24 lg:py-32 overflow-hidden" data-testid="darshan-section">
      <div className="absolute inset-0">
        <img src={DIYA_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/70 to-ink-900" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-saffron-300 text-xs font-cinzel tracking-[0.3em]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE NOW
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mt-5 leading-tight">
            <span className="text-gold-shimmer italic">Live Darshan</span> from the Garbhagriha
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Connect with the divine in real-time. Join thousands of devotees in worship from anywhere in the world.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-7">
          {/* Video */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-saffron-500/30 shadow-[0_30px_80px_-20px_rgba(245,158,11,0.3)]">
            <div className="aspect-video bg-ink-800">
              <iframe
                src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=1"
                title="Live Darshan"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                data-testid="live-darshan-iframe"
              />
            </div>
            <div className="bg-ink-800 p-5 grid grid-cols-3 gap-4 border-t border-saffron-500/15">
              <Stat icon={Radio} label="Live Viewers" value={stats.live_viewers} />
              <Stat icon={Users} label="Devotees Today" value={stats.devotees_today.toLocaleString("en-IN")} />
              <Stat icon={FlameIcon} label="Diyas Lit" value={stats.diyas_lit.toLocaleString("en-IN")} />
            </div>
          </div>

          {/* Virtual Diya */}
          <div className="rounded-2xl glass-card p-8 flex flex-col" data-testid="virtual-diya-card">
            <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.4em]">✦ VIRTUAL OFFERING ✦</p>
            <h3 className="font-serif text-3xl text-white mt-3 leading-tight">Light a Diya<br />for Maa</h3>

            <div className="flex-1 grid place-items-center my-6 relative">
              <div className="relative">
                <motion.div
                  animate={lit ? { scale: [1, 1.2, 1] } : {}}
                  className="w-24 h-12 bg-gradient-to-b from-amber-900 to-amber-950 rounded-b-full border-x border-saffron-700/50"
                />
                <div className={`absolute -top-10 left-1/2 -translate-x-1/2 transition-opacity duration-700 ${lit ? "opacity-100" : "opacity-80"}`}>
                  <div className="flame animate-flame-flicker" />
                </div>
                {lit && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0, scale: 3 }}
                    transition={{ duration: 1.6 }}
                    className="absolute inset-0 rounded-full bg-saffron-400/40 blur-2xl"
                  />
                )}
              </div>
            </div>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="bg-ink-700 border border-saffron-500/20 rounded-lg px-3 py-2 text-sm text-white mb-2 focus:outline-none focus:border-saffron-400"
              data-testid="diya-name-input"
            />
            <input
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Your sankalp / wish"
              className="bg-ink-700 border border-saffron-500/20 rounded-lg px-3 py-2 text-sm text-white mb-4 focus:outline-none focus:border-saffron-400"
              data-testid="diya-wish-input"
            />
            <button onClick={lightDiya} className="btn-primary-sacred justify-center" data-testid="light-diya-btn">
              🪔 Light Diya
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full grid place-items-center bg-saffron-500/15 border border-saffron-500/30 text-saffron-300">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-white font-serif text-lg leading-none">{value}</p>
      <p className="text-white/55 text-xs tracking-wide">{label}</p>
    </div>
  </div>
);
