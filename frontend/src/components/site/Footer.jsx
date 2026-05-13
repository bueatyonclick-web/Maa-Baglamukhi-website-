import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Instagram, Youtube, Facebook } from "lucide-react";
import { apiPost } from "../../lib/api";
import {
  fetchAdminJson,
  getAdminApiOrigin,
  postAdminJson,
  resolveAdminAssetUrl,
} from "../../lib/adminApi";
import { FOOTER_LINKS } from "../../data/content";
import { useLanguage } from "../../i18n/LanguageContext";

const SITE_LOGO = `${process.env.PUBLIC_URL || ""}/site-logo.png`;

export default function Footer() {
  const { t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [submittingC, setSubmittingC] = useState(false);
  const [submittingN, setSubmittingN] = useState(false);
  const [cmsContact, setCmsContact] = useState(null);
  const [cmsSocial, setCmsSocial] = useState(null);
  const [cmsLogo, setCmsLogo] = useState(null);

  useEffect(() => {
    const origin = getAdminApiOrigin();
    if (!origin) return;

    let cancelled = false;
    (async () => {
      const [c, s, w] = await Promise.all([
        fetchAdminJson("/api/settings/contact"),
        fetchAdminJson("/api/settings/social"),
        fetchAdminJson("/api/settings/website"),
      ]);
      if (cancelled) return;
      if (c?.settings) setCmsContact(c.settings);
      if (s?.social) setCmsSocial(s.social);
      if (w?.website?.logo) setCmsLogo(w.website.logo);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const addressLines = useMemo(() => {
    if (cmsContact?.address) {
      return cmsContact.address
        .split(/\n+/)
        .map((l) => l.trim())
        .filter(Boolean);
    }
    return t("footer.address").split("\n");
  }, [cmsContact, t]);

  const displayEmail = cmsContact?.email || "darshan@maabaglamukhi-nalkheda.com";

  const logoSrc = cmsLogo ? resolveAdminAssetUrl(cmsLogo) : SITE_LOGO;

  const socialPairs = useMemo(() => {
    if (!cmsSocial) {
      return [
        { Icon: Instagram, href: "#", label: "Instagram" },
        { Icon: Youtube, href: "#", label: "YouTube" },
        { Icon: Facebook, href: "#", label: "Facebook" },
      ];
    }
    return [
      { Icon: Instagram, href: cmsSocial.instagram || "#", label: "Instagram" },
      { Icon: Youtube, href: cmsSocial.youtube || "#", label: "YouTube" },
      { Icon: Facebook, href: cmsSocial.facebook || "#", label: "Facebook" },
    ];
  }, [cmsSocial]);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubmittingN(true);
    try {
      await apiPost("/newsletter", { email: newsletterEmail });
      toast.success(t("footer.toastSubscribeSuccess"));
      setNewsletterEmail("");
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
      if (getAdminApiOrigin()) {
        await postAdminJson("/api/messages", {
          name,
          email: contactEmail,
          phone: phone || undefined,
          message,
        });
      } else {
        await apiPost("/contact", { name, email: contactEmail, phone, message });
      }
      toast.success(t("footer.toastContactSuccess"));
      setName("");
      setContactEmail("");
      setPhone("");
      setMessage("");
    } catch {
      toast.error(t("footer.toastContactError"));
    } finally {
      setSubmittingC(false);
    }
  };

  return (
    <footer
      id="contact"
      className="relative overflow-x-hidden pt-24 pb-12 border-t border-saffron-500/15 bg-ink-900 lg:pt-32"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 min-w-0">
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
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
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
              {cmsContact?.templeName ? (
                <p className="mt-2 text-lg font-serif text-amber-100/95">{cmsContact.templeName}</p>
              ) : null}
              <div className="mt-5 space-y-4 text-white/80">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-saffron-400 mt-0.5 shrink-0" />
                  <div className="text-sm leading-relaxed">
                    <p>
                      {addressLines.map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < addressLines.length - 1 ? <br /> : null}
                        </React.Fragment>
                      ))}
                    </p>
                    {cmsContact?.googleMapLink ? (
                      <a
                        href={cmsContact.googleMapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-saffron-400 hover:text-amber-200 text-xs"
                      >
                        Google Maps →
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-saffron-400 mt-0.5 shrink-0" />
                  <div className="text-sm space-y-1">
                    {cmsContact?.phone1 ? (
                      <p className="text-white/90">{cmsContact.phone1}</p>
                    ) : (
                      <p>{t("footer.phoneTrust")}</p>
                    )}
                    {cmsContact?.phone2 ? <p className="text-white/75">{cmsContact.phone2}</p> : null}
                    {cmsContact?.whatsapp ? (
                      <p className="text-white/75">WhatsApp: {cmsContact.whatsapp}</p>
                    ) : cmsContact ? null : (
                      <p className="text-white/55">{t("footer.phoneWhatsapp")}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-saffron-400 mt-0.5 shrink-0" />
                  <a href={`mailto:${displayEmail}`} className="text-sm text-amber-200/90 hover:text-amber-100 break-all">
                    {displayEmail}
                  </a>
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
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 min-w-0">
          <div className="col-span-2 md:col-span-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-saffron-500/25 bg-ink-900/40 shadow-[0_0_22px_rgba(245,158,11,0.25)]">
                <img src={logoSrc} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div>
                <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.3em]">{t("brand.line1")}</p>
                <p className="font-serif text-white text-lg leading-none">{t("brand.line2")}</p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">{t("footer.blurb")}</p>
            <div className="flex gap-3 mt-5">
              {socialPairs.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  title={`Connect on ${label}`}
                  aria-label={`Connect on ${label}`}
                  target={href && href !== "#" ? "_blank" : undefined}
                  rel={href && href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-full grid place-items-center glass-card text-saffron-300 hover:text-white hover:border-saffron-400 transition-all"
                  data-testid={`social-${i}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.4em] mb-4">{t("footer.quickLinks")}</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quick.map((l) => (
                <li key={l.navKey}>
                  <a href={l.href} className="text-white/65 hover:text-saffron-300 text-sm break-words">
                    {t(`nav.${l.navKey}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <p className="font-cinzel text-saffron-300 text-[10px] tracking-[0.4em] mb-4">{t("footer.pilgrimage")}</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.pilgrimage.map((l) => (
                <li key={l.tKey}>
                  <a href={l.href} className="text-white/65 hover:text-saffron-300 text-sm break-words">
                    {t(l.tKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 min-w-0">
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
