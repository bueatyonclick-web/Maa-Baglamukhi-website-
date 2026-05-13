import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Calendar as CalendarIcon, User, Flame, Sparkles, Check } from "lucide-react";
import { apiGet, apiPost } from "../../lib/api";
import { fetchAdminJson, getAdminApiOrigin, postAdminJson } from "../../lib/adminApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useLanguage } from "../../i18n/LanguageContext";

export default function PujaBookingSection() {
  const { t, lang } = useLanguage();
  const isHi = lang === "hi";
  const [pujas, setPujas] = useState([]);
  /** When admin URL is set and CMS returned packages, bookings go to Next admin API. */
  const [useAdminBookings, setUseAdminBookings] = useState(false);
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
    let cancelled = false;
    (async () => {
      if (getAdminApiOrigin()) {
        const data = await fetchAdminJson("/api/packages?category=PUJA");
        if (cancelled) return;
        const raw = data?.items;
        if (Array.isArray(raw) && raw.length > 0) {
          setPujas(
            raw.map((p) => ({
              id: p.id,
              name: p.title,
              description: p.description,
              priest: p.panditName,
              duration: p.duration,
              price: p.price,
            })),
          );
          setUseAdminBookings(true);
          return;
        }
      }
      if (cancelled) return;
      try {
        const d = await apiGet("/pujas");
        if (!cancelled) {
          setPujas(d.pujas || []);
          setUseAdminBookings(false);
        }
      } catch {
        if (!cancelled) setPujas([]);
      }
    })();
    return () => {
      cancelled = true;
    };
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
      let res;
      if (useAdminBookings && getAdminApiOrigin()) {
        const extras = [];
        if (form.gotra?.trim()) extras.push(`Gotra: ${form.gotra.trim()}`);
        if (form.special_request?.trim()) extras.push(form.special_request.trim());
        const address = extras.length ? extras.join("\n\n") : undefined;
        const created = await postAdminJson("/api/bookings", {
          userName: form.devotee_name,
          email: form.email,
          phone: form.phone,
          packageId: selected.id,
          bookingDate: form.booking_date,
          address,
        });
        const bid = created?.booking?.id;
        res = {
          reference: bid ? `MBN-${String(bid).slice(-8).toUpperCase()}` : "",
          booking_date: form.booking_date,
        };
      } else {
        res = await apiPost("/bookings", { ...form, puja_type: selected.name });
      }
      setSuccess(res);
      toast.success(t("booking.toastSuccess"));
    } catch (err) {
      toast.error(t("booking.toastError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="booking"
      className="relative scroll-mt-28 py-20 lg:scroll-mt-32 lg:py-28"
      data-testid="booking-section"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <p className={`mb-3 text-saffron-300/90 ${isHi ? "font-deva text-sm tracking-[0.2em] md:text-base" : "font-cinzel text-xs tracking-[0.5em]"}`}>
            {t("booking.label")}
          </p>
          <h2 className={`text-3xl text-white sm:text-4xl lg:text-5xl ${isHi ? "font-deva leading-snug" : "font-serif leading-tight"}`}>
            {t("booking.headingLine1")}{" "}
            <span className="text-gold-shimmer italic">{t("booking.headingAccent")}</span>
          </h2>
          <p className={`mx-auto mt-4 max-w-2xl text-base text-white/65 lg:text-lg ${isHi ? "font-deva leading-relaxed" : ""}`}>
            {t("booking.sub")}
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
              <h3 className={`text-2xl text-white mb-2 ${isHi ? "font-deva leading-snug" : "font-serif"}`}>{p.name}</h3>
              <p className={`text-white/60 text-sm leading-relaxed ${isHi ? "font-deva" : ""}`}>{p.description}</p>
              <div className={`mt-5 flex items-center gap-2 text-saffron-300/80 text-xs ${isHi ? "font-deva text-sm leading-snug" : ""}`}>
                <User className="w-3.5 h-3.5" /> {p.priest}
                <span className="opacity-30">·</span>
                <span>{p.duration}</span>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-white/50 text-xs">{t("booking.dakshina")}</p>
                  <p className="font-serif text-3xl text-saffron-300">
                    ₹{p.price.toLocaleString(lang === "hi" ? "hi-IN" : "en-IN")}
                  </p>
                </div>
                <button
                  onClick={() => openBook(p)}
                  className="btn-primary-sacred text-sm py-2.5 px-5"
                  data-testid={`book-now-${p.id}`}
                >
                  {t("booking.bookNow")}
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
              {success ? t("booking.dialogConfirmed") : `${t("booking.dialogBookPrefix")}${selected?.name || ""}`}
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
                <p className="font-serif text-2xl text-white">{t("booking.sankalpAccepted")}</p>
                <p className="mt-2 text-white/70 text-sm">
                  {t("booking.reference")} <span className="text-saffron-300 font-cinzel">{success.reference}</span>
                </p>
                <p className="mt-1 text-white/60 text-sm">
                  {t("booking.pujaDate")} <span className="text-saffron-200">{success.booking_date}</span>
                </p>
                <p className="mt-5 text-white/70 text-sm italic">
                  {t("booking.confirmationNote")}
                </p>
                <button onClick={() => setSelected(null)} className="btn-primary-sacred mt-6">
                  {t("booking.closeBlessing")}
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} className="space-y-4 mt-2" data-testid="booking-form">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="dname" className="text-white/70 text-xs">{t("booking.devoteeName")}</Label>
                    <Input id="dname" required value={form.devotee_name}
                      onChange={(e) => setForm({ ...form, devotee_name: e.target.value })}
                      className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="input-name" />
                  </div>
                  <div>
                    <Label htmlFor="dphone" className="text-white/70 text-xs">{t("booking.phone")}</Label>
                    <Input id="dphone" required value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="input-phone" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="demail" className="text-white/70 text-xs">{t("booking.email")}</Label>
                  <Input id="demail" type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="input-email" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="ddate" className="text-white/70 text-xs">{t("booking.pujaDateLabel")}</Label>
                    <Input id="ddate" type="date" required value={form.booking_date}
                      onChange={(e) => setForm({ ...form, booking_date: e.target.value })}
                      className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="input-date" />
                  </div>
                  <div>
                    <Label htmlFor="dgotra" className="text-white/70 text-xs">{t("booking.gotraOptional")}</Label>
                    <Input id="dgotra" value={form.gotra}
                      onChange={(e) => setForm({ ...form, gotra: e.target.value })}
                      className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="input-gotra" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dreq" className="text-white/70 text-xs">{t("booking.specialRequest")}</Label>
                  <Textarea id="dreq" value={form.special_request}
                    onChange={(e) => setForm({ ...form, special_request: e.target.value })}
                    className="bg-ink-700 border-saffron-500/20 text-white mt-1" rows={3} data-testid="input-request" />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary-sacred w-full justify-center" data-testid="submit-booking">
                  {submitting
                    ? t("booking.offering")
                    : `${t("booking.confirmPrefix")} ₹${selected?.price?.toLocaleString(lang === "hi" ? "hi-IN" : "en-IN")}`}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
