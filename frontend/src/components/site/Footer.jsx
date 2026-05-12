import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Instagram, Youtube, Facebook } from "lucide-react";
import { apiPost } from "../../lib/api";
import { FOOTER_LINKS } from "../../data/content";
import { useLanguage } from "../../i18n/LanguageContext";

const SITE_LOGO = `${process.env.PUBLIC_URL || ""}/site-logo.png`;

export default function Footer() {
  const { t } = useLanguage();
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
      toast.success(t("footer.toastSubscribeSuccess"));
      setEmail("");
    } catch {
      toast.error(t("footer.toastSubscribeError"));
    } finally {
      setSubmittingN(false);
    }
  };

  const contact = async (e) => {
    e.preventDefault();
    setSubmittingC(true);
    try {
      await apiPost("/contact", { name, email, phone, message });
      toast.success(t("footer.toastContactSuccess"));
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      toast.error(t("footer.toastContactError"));
    } finally {
      setSubmittingC(false);
    }
  };

  const addressLines = t("footer.address").split("\n");

  return (
    <footer id="contact" className="relative pt-24 lg:pt-32 pb-12 border-t border-saffron-500/15 bg-ink-900" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-cinzel text-saffron-300 text-xs tracking-[0.5em] mb-4">{t("footer.reachTemple")}</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
              {t("footer.sendPrayerBefore")}{" "}
              <span className="text-gold-shimmer italic">{t("footer.sendPrayerAccent")}</span>
            </h2>
            <p className="mt-4 text-white/70">{t("footer.respondNote")}</p>

            <form onSubmit={contact} className="mt-7 space-y-3" data-testid="contact-form">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("footer.name")}
                  className="bg-ink-800 border border-saffron-500/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-saffron-400"
                  data-testid="contact-name"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.email")}
                  className="bg-ink-800 border border-saffron-500/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-saffron-400"
                  data-testid="contact-email"
                />
              </div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("footer.phoneOptional")}
                className="w-full bg-ink-800 border border-saffron-500/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-saffron-400"
                data-testid="contact-phone"
              />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("footer.messagePlaceholder")}
                rows={4}
                className="w-full bg-ink-800 border border-saffron-500/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-saffron-400 resize-none"
                data-testid="contact-message"
              />
              <button type="submit" disabled={submittingC} className="btn-primary-sacred" data-testid="contact-submit">
                {submittingC ? t("footer.sending") : t("footer.sendMessage")}
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
              <p className="font-cinzel text-saffron-300 text-xs tracking-[0.4em]">{t("footer.office")}</p>
              <div className="mt-5 space-y-4 text-white/80">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-saffron-400 mt-0.5 shrink-0" />
                  <p className="text-sm leading-relaxed">
                    {addressLines.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < addressLines.length - 1 ? <br /> : null}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-saffron-400 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p>{t("footer.phoneTrust")}</p>
                    <p className="text-white/55">{t("footer.phoneWhatsapp")}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-saffron-400 mt-0.5 shrink-0" />
                  <p className="text-sm">darshan@maabaglamukhi-nalkheda.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl glass-card p-7 mt-5">
              <p className="font-cinzel text-saffron-300 text-xs tracking-[0.4em]">{t("footer.blessings")}</p>
              <p className="mt-2 text-white/70 text-sm">{t("footer.blessingsNote")}</p>
              <form onSubmit={subscribe} className="mt-4 flex gap-2" data-testid="newsletter-form">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletterPlaceholder")}
                  className="flex-1 bg-ink-800 border border-saffron-500/20 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-saffron-400"
                  data-testid="newsletter-email"
                />
                <button type="submit" disabled={submittingN} className="btn-primary-sacred text-sm px-5 py-2.5" data-testid="newsletter-submit">
                  {t("footer.subscribe")}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="divider-sacred" />

        <div className="grid md:grid-cols-4 gap-10 py-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-saffron-500/25 bg-ink-900/40 shadow-[0_0_22px_rgba(245,158,11,0.25)]">
                <img src={SITE_LOGO} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div>
                <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.3em]">{t("brand.line1")}</p>
                <p className="font-serif text-white text-lg leading-none">{t("brand.line2")}</p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">{t("footer.blurb")}</p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full grid place-items-center glass-card text-saffron-300 hover:text-white hover:border-saffron-400 transition-all"
                  data-testid={`social-${i}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.4em] mb-4">{t("footer.quickLinks")}</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quick.map((l) => (
                <li key={l.navKey}>
                  <a href={l.href} className="text-white/65 hover:text-saffron-300 text-sm">
                    {t(`nav.${l.navKey}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.4em] mb-4">{t("footer.pilgrimage")}</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.pilgrimage.map((l) => (
                <li key={l.tKey}>
                  <a href={l.href} className="text-white/65 hover:text-saffron-300 text-sm">
                    {t(l.tKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.4em] mb-4">{t("footer.timings")}</p>
            <ul className="space-y-2 text-sm text-white/65">
              <li>{t("footer.timing1")}</li>
              <li>{t("footer.timing2")}</li>
              <li>{t("footer.timing3")}</li>
              <li>{t("footer.timing4")}</li>
            </ul>
          </div>
        </div>

        <div className="divider-sacred" />

        <div className="pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/45">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("footer.mantraLine")}</p>
        </div>
      </div>
    </footer>
  );
}
