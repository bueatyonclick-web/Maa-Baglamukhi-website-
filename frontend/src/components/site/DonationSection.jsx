import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Heart, Wheat, MilkOff, Building2, Check } from "lucide-react";
import { apiPost } from "../../lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const causes = [
  { id: "anna-daan", icon: Wheat, title: "Anna Daan", desc: "Feed 1,000 pilgrims daily at the temple kitchen.", suggested: 1100 },
  { id: "gau-seva", icon: MilkOff, title: "Gau Seva", desc: "Care for 80+ rescued cows in our goshala.", suggested: 2100 },
  { id: "temple-dev", icon: Building2, title: "Temple Development", desc: "Restore ancient stone carvings & sanctum.", suggested: 5100 },
  { id: "general", icon: Heart, title: "General Donation", desc: "Support the trust's spiritual mission.", suggested: 501 },
];

const amounts = [501, 1100, 2100, 5100, 11000, 21000];

export default function DonationSection() {
  const [openCause, setOpenCause] = useState(null);
  const [amount, setAmount] = useState(1100);
  const [form, setForm] = useState({ donor_name: "", email: "", phone: "", message: "", is_anonymous: false });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const open = (c) => {
    setOpenCause(c);
    setAmount(c.suggested);
    setSuccess(null);
    setForm({ donor_name: "", email: "", phone: "", message: "", is_anonymous: false });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiPost("/donations", { ...form, cause: openCause.title, amount });
      setSuccess(res);
      toast.success("🙏 Maa accepts your offering with grace.");
    } catch {
      toast.error("Donation failed. Please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="donate" className="py-24 lg:py-32" data-testid="donation-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-5">✦ DAAN ✦</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Your offering, <span className="text-gold-shimmer italic">infinite</span> blessings.
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Every rupee is used transparently for seva, daily prasad, gau seva and temple restoration.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {causes.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => open(c)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-left rounded-2xl p-7 glass-card hover:border-saffron-400 hover:-translate-y-1 transition-all group"
              data-testid={`cause-${c.id}`}
            >
              <div className="w-14 h-14 rounded-full grid place-items-center bg-gradient-to-br from-saffron-400/20 to-saffron-700/20 border border-saffron-500/30 group-hover:from-saffron-400 group-hover:to-saffron-700 transition-all">
                <c.icon className="w-6 h-6 text-saffron-300 group-hover:text-ink-900 transition-colors" />
              </div>
              <h3 className="font-serif text-2xl text-white mt-5">{c.title}</h3>
              <p className="text-white/60 text-sm mt-2 leading-relaxed">{c.desc}</p>
              <p className="mt-5 text-saffron-300 text-sm font-cinzel tracking-wider">
                FROM ₹{c.suggested.toLocaleString("en-IN")}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!openCause} onOpenChange={(o) => !o && setOpenCause(null)}>
        <DialogContent className="bg-ink-800 border border-saffron-500/30 text-white max-w-lg" data-testid="donation-dialog">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-saffron-300">
              {success ? "Thank you, devotee" : `Donate — ${openCause?.title}`}
            </DialogTitle>
          </DialogHeader>

          {success ? (
            <div className="text-center py-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-700 grid place-items-center animate-glow-pulse mb-5">
                <Check className="w-10 h-10 text-ink-900" />
              </div>
              <p className="font-serif text-2xl text-white">Your daan has reached Maa's feet</p>
              <p className="mt-2 text-white/70 text-sm">
                Receipt: <span className="text-saffron-300 font-cinzel">{success.receipt}</span>
              </p>
              <p className="mt-1 text-white/60 text-sm">
                Amount: <span className="text-saffron-200">₹{success.amount.toLocaleString("en-IN")}</span>
              </p>
              <button onClick={() => setOpenCause(null)} className="btn-primary-sacred mt-6">Om Shanti</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4 mt-2" data-testid="donation-form">
              <div>
                <Label className="text-white/70 text-xs">Select amount</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {amounts.map((a) => (
                    <button key={a} type="button" onClick={() => setAmount(a)}
                      className={`py-2.5 rounded-lg text-sm border transition-all ${
                        amount === a
                          ? "bg-saffron-500 text-ink-900 border-saffron-500"
                          : "bg-ink-700 text-white/70 border-saffron-500/20 hover:border-saffron-400"
                      }`}
                      data-testid={`amount-${a}`}
                    >
                      ₹{a.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
                <Input type="number" min="51" value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="bg-ink-700 border-saffron-500/20 text-white mt-3"
                  data-testid="amount-input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="don-name" className="text-white/70 text-xs">Name</Label>
                  <Input id="don-name" required value={form.donor_name}
                    onChange={(e) => setForm({ ...form, donor_name: e.target.value })}
                    className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="donor-name" />
                </div>
                <div>
                  <Label htmlFor="don-email" className="text-white/70 text-xs">Email</Label>
                  <Input id="don-email" type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-ink-700 border-saffron-500/20 text-white mt-1" data-testid="donor-email" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-white/70 text-sm">
                <input type="checkbox" checked={form.is_anonymous}
                  onChange={(e) => setForm({ ...form, is_anonymous: e.target.checked })}
                  className="accent-saffron-500" data-testid="anonymous-checkbox" />
                Donate anonymously
              </label>
              <button type="submit" disabled={submitting} className="btn-primary-sacred w-full justify-center" data-testid="submit-donation">
                {submitting ? "Offering..." : `Donate ₹${amount.toLocaleString("en-IN")}`}
              </button>
              <p className="text-white/40 text-xs text-center">80G tax exemption certificate emailed instantly</p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
