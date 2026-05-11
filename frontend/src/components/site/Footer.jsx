import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Flame, Instagram, Youtube, Facebook } from "lucide-react";
import { apiPost } from "../../lib/api";
import { FOOTER_LINKS } from "../../data/content";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [submittingC, setSubmittingC] = useState(false);
  const [submittingN, setSubmittingN] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmittingN(true);
    try {
      await apiPost("/newsletter", { email });
      toast.success("🙏 You'll receive daily blessings.");
      setEmail("");
    } catch {
      toast.error("Subscription failed.");
    } finally {
      setSubmittingN(false);
    }
  };

  const contact = async (e) => {
    e.preventDefault();
    setSubmittingC(true);
    try {
      await apiPost("/contact", { name, email, phone, message });
      toast.success("Your message has reached the temple 🙏");
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch {
      toast.error("Could not send message.");
    } finally {
      setSubmittingC(false);
    }
  };

  return (
    <footer id="contact" className="relative pt-24 lg:pt-32 pb-12 border-t border-saffron-500/15 bg-ink-900" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Contact + Newsletter top */}
        <div className="grid lg:grid-cols-2 gap-12 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-4">✦ REACH THE TEMPLE ✦</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
              Send a <span className="text-gold-shimmer italic">prayer</span> or message
            </h2>
            <p className="mt-4 text-white/70">We respond within 24 hours. For urgent darshan or puja enquiries, WhatsApp us directly.</p>

            <form onSubmit={contact} className="mt-7 space-y-3" data-testid="contact-form">
              <div className="grid grid-cols-2 gap-3">
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"
                  className="bg-ink-800 border border-saffron-500/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-saffron-400"
                  data-testid="contact-name" />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                  className="bg-ink-800 border border-saffron-500/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-saffron-400"
                  data-testid="contact-email" />
              </div>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)"
                className="w-full bg-ink-800 border border-saffron-500/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-saffron-400"
                data-testid="contact-phone" />
              <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message or prayer..." rows={4}
                className="w-full bg-ink-800 border border-saffron-500/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-saffron-400 resize-none"
                data-testid="contact-message" />
              <button type="submit" disabled={submittingC} className="btn-primary-sacred" data-testid="contact-submit">
                {submittingC ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:pl-10"
          >
            <div className="rounded-2xl glass-card p-7">
              <p className="font-cinzel text-saffron-300 text-xs tracking-[0.4em]">✦ TEMPLE OFFICE ✦</p>
              <div className="mt-5 space-y-4 text-white/80">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-saffron-400 mt-0.5 shrink-0" />
                  <p className="text-sm leading-relaxed">Shree Maa Baglamukhi Mandir, Nalkheda<br />Agar Malwa District, Madhya Pradesh — 465445</p>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-saffron-400 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p>+91 99999 11111 · Trust Office</p>
                    <p className="text-white/55">+91 88888 22222 · WhatsApp Help</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-saffron-400 mt-0.5 shrink-0" />
                  <p className="text-sm">darshan@maabaglamukhi-nalkheda.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl glass-card p-7 mt-5">
              <p className="font-cinzel text-saffron-300 text-xs tracking-[0.4em]">✦ DAILY BLESSINGS ✦</p>
              <p className="mt-2 text-white/70 text-sm">Receive Pandit ji's mantra of the day in your inbox.</p>
              <form onSubmit={subscribe} className="mt-4 flex gap-2" data-testid="newsletter-form">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                  className="flex-1 bg-ink-800 border border-saffron-500/20 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-saffron-400"
                  data-testid="newsletter-email" />
                <button type="submit" disabled={submittingN} className="btn-primary-sacred text-sm px-5 py-2.5" data-testid="newsletter-submit">
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="divider-sacred" />

        {/* Bottom */}
        <div className="grid md:grid-cols-4 gap-10 py-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full grid place-items-center bg-gradient-to-br from-saffron-400 to-saffron-700">
                <Flame className="w-5 h-5 text-ink-900" />
              </div>
              <div>
                <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.3em]">SHREE MAA</p>
                <p className="font-serif text-white text-lg leading-none">Baglamukhi Peeth</p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              An ancient Siddha Peeth of the 8th Mahavidya — Nalkheda, Madhya Pradesh.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full grid place-items-center glass-card text-saffron-300 hover:text-white hover:border-saffron-400 transition-all" data-testid={`social-${i}`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.4em] mb-4">QUICK LINKS</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quick.map((l) => (
                <li key={l.label}><a href={l.href} className="text-white/65 hover:text-saffron-300 text-sm">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.4em] mb-4">PILGRIMAGE</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.pilgrimage.map((l) => (
                <li key={l.label}><a href={l.href} className="text-white/65 hover:text-saffron-300 text-sm">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.4em] mb-4">DARSHAN TIMINGS</p>
            <ul className="space-y-2 text-sm text-white/65">
              <li>Mangala Aarti — 5:30 AM</li>
              <li>Morning Darshan — 5:00 AM to 12:30 PM</li>
              <li>Evening Darshan — 4:00 PM to 10:00 PM</li>
              <li>Shayan Aarti — 9:30 PM</li>
            </ul>
          </div>
        </div>

        <div className="divider-sacred" />

        <div className="pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/45">
          <p>© {new Date().getFullYear()} Shree Maa Baglamukhi Trust, Nalkheda. All rights reserved.</p>
          <p>|| ॐ ह्लीं बगलामुखी नमः ||</p>
        </div>
      </div>
    </footer>
  );
}
