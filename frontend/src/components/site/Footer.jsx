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

function Footer() {
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
      className="relative overflow-x-hidden border-t border-saffron-500/15 bg-ink-900 pt-20 pb-28 sm:pt-24 md:pb-24 lg:pb-16 lg:pt-32"
      data-testid="footer"
    >
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-8 pb-12 sm:gap-10 sm:pb-14 md:gap-12 md:pb-16 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="mb-3 font-cinzel text-[10px] tracking-[0.35em] text-saffron-300 sm:mb-4 sm:text-xs sm:tracking-[0.45em]">
              {t("footer.reachTemple")}
            </p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl md:text-[2.35rem] lg:text-5xl">
              {t("footer.sendPrayerBefore")}{" "}
              <span className="text-gold-shimmer italic">{t("footer.sendPrayerAccent")}</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-base">{t("footer.respondNote")}</p>

            <form onSubmit={contact} className="mt-6 space-y-3 sm:mt-7 sm:space-y-4" data-testid="contact-form">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("footer.name")}
                  className="min-h-[48px] w-full rounded-lg border border-saffron-500/20 bg-ink-800 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-500/30 sm:text-sm"
                  data-testid="contact-name"
                />
                <input
                  required
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder={t("footer.email")}
                  className="min-h-[48px] w-full rounded-lg border border-saffron-500/20 bg-ink-800 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-500/30 sm:text-sm"
                  data-testid="contact-email"
                />
              </div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("footer.phoneOptional")}
                className="min-h-[48px] w-full rounded-lg border border-saffron-500/20 bg-ink-800 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-500/30 sm:text-sm"
                data-testid="contact-phone"
              />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("footer.messagePlaceholder")}
                rows={4}
                className="min-h-[8.5rem] w-full resize-y rounded-lg border border-saffron-500/20 bg-ink-800 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-500/30 sm:text-sm"
                data-testid="contact-message"
              />
              <button
                type="submit"
                disabled={submittingC}
                className="btn-primary-sacred w-full sm:w-auto sm:min-w-[12rem]"
                data-testid="contact-submit"
              >
                {submittingC ? t("footer.sending") : t("footer.sendMessage")}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-w-0 lg:pl-6 xl:pl-10"
          >
            <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-7">
              <p className="font-cinzel text-[10px] tracking-[0.32em] text-saffron-300 sm:text-xs sm:tracking-[0.4em]">
                {t("footer.office")}
              </p>
              {cmsContact?.templeName ? (
                <p className="mt-2 font-serif text-base text-amber-100/95 sm:text-lg">{cmsContact.templeName}</p>
              ) : null}
              <div className="mt-4 space-y-4 text-white/80 sm:mt-5">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-saffron-400" />
                  <div className="min-w-0 text-sm leading-relaxed sm:text-base">
                    <p className="break-words">
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
                        className="mt-2 inline-block text-xs text-saffron-400 hover:text-amber-200 sm:text-sm"
                      >
                        Google Maps →
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-saffron-400" />
                  <div className="min-w-0 space-y-1 text-sm sm:text-base">
                    {cmsContact?.phone1 ? (
                      <p className="break-words text-white/90">{cmsContact.phone1}</p>
                    ) : (
                      <p>{t("footer.phoneTrust")}</p>
                    )}
                    {cmsContact?.phone2 ? <p className="break-words text-white/75">{cmsContact.phone2}</p> : null}
                    {cmsContact?.whatsapp ? (
                      <p className="break-words text-white/75">WhatsApp: {cmsContact.whatsapp}</p>
                    ) : cmsContact ? null : (
                      <p className="text-white/55">{t("footer.phoneWhatsapp")}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-saffron-400" />
                  <a
                    href={`mailto:${displayEmail}`}
                    className="min-w-0 break-words text-sm text-amber-200/90 hover:text-amber-100 sm:text-base"
                  >
                    {displayEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card mt-5 rounded-2xl p-5 sm:mt-6 sm:p-6 md:p-7">
              <p className="font-cinzel text-[10px] tracking-[0.32em] text-saffron-300 sm:text-xs sm:tracking-[0.4em]">
                {t("footer.blessings")}
              </p>
              <p className="mt-2 text-sm text-white/70 sm:text-base">{t("footer.blessingsNote")}</p>
              <form
                onSubmit={subscribe}
                className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch"
                data-testid="newsletter-form"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t("footer.newsletterPlaceholder")}
                  className="min-h-[48px] w-full flex-1 rounded-full border border-saffron-500/20 bg-ink-800 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-500/30 sm:text-sm"
                  data-testid="newsletter-email"
                />
                <button
                  type="submit"
                  disabled={submittingN}
                  className="btn-primary-sacred w-full shrink-0 px-6 text-sm sm:w-auto sm:min-w-[9.5rem]"
                  data-testid="newsletter-submit"
                >
                  {t("footer.subscribe")}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="divider-sacred" />

        <div className="grid min-w-0 grid-cols-2 gap-8 py-10 sm:gap-10 md:grid-cols-4 md:gap-10 md:py-12 lg:gap-12">
          <div className="col-span-2 min-w-0 md:col-span-1">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-saffron-500/25 bg-ink-900/40 shadow-[0_0_22px_rgba(245,158,11,0.25)] sm:h-12 sm:w-12 md:h-14 md:w-14">
                <img src={logoSrc} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="min-w-0 leading-normal">
                <p className="font-cinzel text-[10px] tracking-[0.28em] text-saffron-300 sm:tracking-[0.3em]">{t("brand.line1")}</p>
                <p className="font-serif text-base leading-tight text-white sm:text-lg md:text-xl">{t("brand.line2")}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/55 sm:text-base">{t("footer.blurb")}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socialPairs.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  title={`Connect on ${label}`}
                  aria-label={`Connect on ${label}`}
                  target={href && href !== "#" ? "_blank" : undefined}
                  rel={href && href !== "#" ? "noopener noreferrer" : undefined}
                  className="grid h-11 w-11 place-items-center rounded-full glass-card text-saffron-300 transition-all hover:border-saffron-400 hover:text-white sm:h-12 sm:w-12"
                  data-testid={`social-${i}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <p className="mb-3 font-cinzel text-[10px] tracking-[0.32em] text-saffron-300 sm:mb-4 sm:text-xs sm:tracking-[0.4em]">
              {t("footer.quickLinks")}
            </p>
            <ul className="space-y-2.5 sm:space-y-3">
              {FOOTER_LINKS.quick.map((l) => (
                <li key={l.navKey}>
                  <a
                    href={l.href}
                    className="inline-block py-1 text-sm text-white/65 hover:text-saffron-300 sm:text-base break-words"
                  >
                    {t(`nav.${l.navKey}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <p className="mb-3 font-cinzel text-[10px] tracking-[0.32em] text-saffron-300 sm:mb-4 sm:text-xs sm:tracking-[0.4em]">
              {t("footer.pilgrimage")}
            </p>
            <ul className="space-y-2.5 sm:space-y-3">
              {FOOTER_LINKS.pilgrimage.map((l) => (
                <li key={l.tKey}>
                  <a
                    href={l.href}
                    className="inline-block py-1 text-sm text-white/65 hover:text-saffron-300 sm:text-base break-words"
                  >
                    {t(l.tKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 min-w-0 md:col-span-1">
            <p className="mb-3 font-cinzel text-[10px] tracking-[0.32em] text-saffron-300 sm:mb-4 sm:text-xs sm:tracking-[0.4em]">
              {t("footer.timings")}
            </p>
            <ul className="space-y-2 text-sm text-white/65 sm:text-base">
              <li>{t("footer.timing1")}</li>
              <li>{t("footer.timing2")}</li>
              <li>{t("footer.timing3")}</li>
              <li>{t("footer.timing4")}</li>
            </ul>
          </div>
        </div>

        <div className="divider-sacred" />

        <div className="flex flex-col justify-between gap-3 pt-6 text-xs text-white/45 sm:text-sm md:flex-row">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("footer.mantraLine")}</p>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
