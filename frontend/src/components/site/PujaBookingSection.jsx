import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Calendar as CalendarIcon, User, Flame, Sparkles, Check } from "lucide-react";
import { apiGet, apiPost } from "../../lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function PujaBookingSection() {
  const [pujas, setPujas] = useState([]);
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [form, setForm] = useState({
    devotee_name: "",
    email: "",
    phone: "",
    booking_date: "",
    gotra: "",
    special_request: "",
  });

  useEffect(() => {
    apiGet("/pujas").then((d) => setPujas(d.pujas || [])).catch(() => {});
  }, []);

  const openBook = (p) => {
    setSelected(p);
    setSuccess(null);
    setForm({ devotee_name: "", email: "", phone: "", booking_date: "", gotra: "", special_request: "" });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    try {
      const res = await apiPost("/bookings", { ...form, puja_type: selected.name });
      setSuccess(res);
      toast.success("Booking confirmed. Maa's blessings are upon you 🙏");
    } catch (err) {
      toast.error("Could not complete booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="relative py-24 lg:py-32" data-testid="booking-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-5">✦ SACRED PUJAS ✦</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Book a <span className="text-gold-shimmer italic">divine</span> ceremony
          </h2>
          <p className="mt-5 text-white/70 max-w-2xl mx-auto text-lg">
            Authentic Vedic pujas performed by lineage priests. Sankalp taken in your name & gotra.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {pujas.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl p-7 glass-card hover:border-saffron-400 hover:-translate-y-1 transition-all duration-500"
              data-testid={`puja-card-${p.id}`}
            >
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-700 grid place-items-center shadow-[0_0_25px_rgba(245,158,11,0.6)]">
                <Flame className="w-5 h-5 text-ink-900" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-2">{p.name}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{p.description}</p>
              <div className="mt-5 flex items-center gap-2 text-saffron-300/80 text-xs">
                <User className="w-3.5 h-3.5" /> {p.priest}
                <span className="opacity-30">·</span>
                <span>{p.duration}</span>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-white/50 text-xs">Dakshina</p>
                  <p className="font-serif text-3xl text-saffron-300">₹{p.price.toLocaleString("en-IN")}</p>
                </div>
                <button
                  onClick={() => openBook(p)}
                  className="btn-primary-sacred text-sm py-2.5 px-5"
                  data-testid={`book-now-${p.id}`}
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="bg-ink-800 border border-saffron-500/30 text-white max-w-lg" data-testid="booking-dialog">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-saffron-300">
              {success ? "Booking Confirmed" : `Book — ${selected?.name}`}
            </DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-700 grid place-items-center animate-glow-pulse mb-5">
                  <Check className="w-10 h-10 text-ink-900" />
                </div>
                <p className="font-serif text-2xl text-white">Maa has accepted your sankalp</p>
                <p className="mt-2 text-white/70 text-sm">
                  Reference: <span className="text-saffron-300 font-cinzel">{success.reference}</span>
                </p>
                <p className="mt-1 text-white/60 text-sm">
                  Puja date: <span className="text-saffron-200">{success.booking_date}</span>
                </p>
                <p className="mt-5 text-white/70 text-sm italic">
                  A confirmation has been sent. Prasad will be couriered after the ceremony.
                </p>
                <button onClick={() => setSelected(null)} className="btn-primary-sacred mt-6">
                  Jai Maa Baglamukhi 🙏
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} className="space-y-4 mt-2" data-testid="booking-form">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="dname" className="text-white/70 text-xs">Devotee Name</Label>
                    <Input id="dname" required value={form.devotee_name}
                      onChange={(e) => setForm({ ...form, devotee_name: e.target.value })}
                      className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="input-name" />
                  </div>
                  <div>
                    <Label htmlFor="dphone" className="text-white/70 text-xs">Phone</Label>
                    <Input id="dphone" required value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="input-phone" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="demail" className="text-white/70 text-xs">Email</Label>
                  <Input id="demail" type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="input-email" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="ddate" className="text-white/70 text-xs">Puja Date</Label>
                    <Input id="ddate" type="date" required value={form.booking_date}
                      onChange={(e) => setForm({ ...form, booking_date: e.target.value })}
                      className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="input-date" />
                  </div>
                  <div>
                    <Label htmlFor="dgotra" className="text-white/70 text-xs">Gotra (optional)</Label>
                    <Input id="dgotra" value={form.gotra}
                      onChange={(e) => setForm({ ...form, gotra: e.target.value })}
                      className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="input-gotra" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dreq" className="text-white/70 text-xs">Special request</Label>
                  <Textarea id="dreq" value={form.special_request}
                    onChange={(e) => setForm({ ...form, special_request: e.target.value })}
                    className="bg-ink-700 border-saffron-500/20 text-white mt-1" rows={3} data-testid="input-request" />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary-sacred w-full justify-center" data-testid="submit-booking">
                  {submitting ? "Offering sankalp..." : `Confirm — ₹${selected?.price.toLocaleString("en-IN")}`}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
