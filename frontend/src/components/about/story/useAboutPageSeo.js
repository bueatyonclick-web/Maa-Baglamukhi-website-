import { useEffect } from "react";
import { useLanguage } from "../../../i18n/LanguageContext";

function setOrCreateMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Page-specific SEO for /about — restores global defaults on unmount. */
export function useAboutPageSeo() {
  const { t } = useLanguage();

  useEffect(() => {
    const title = t("aboutPageSeo.title");
    const description = t("aboutPageSeo.description");
    const prevTitle = document.title;

    document.title = title;
    setOrCreateMeta("name", "description", description);
    setOrCreateMeta("property", "og:title", title);
    setOrCreateMeta("property", "og:description", description);
    setOrCreateMeta("name", "twitter:title", title);
    setOrCreateMeta("name", "twitter:description", description);

    const placeSchema = {
      "@context": "https://schema.org",
      "@type": "PlaceOfWorship",
      name: "Shree Maa Baglamukhi Siddha Peeth Nalkheda",
      description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nalkheda",
        addressRegion: "Madhya Pradesh",
        postalCode: "465445",
        addressCountry: "IN",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "about-place-schema";
    script.textContent = JSON.stringify(placeSchema);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      document.getElementById("about-place-schema")?.remove();
    };
  }, [t]);
}
