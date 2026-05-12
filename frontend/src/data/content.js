export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1698153210197-5a1027c6c5e8?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400";

/** Home page hero — Maa Baglamukhi (`frontend/public/home-hero-maa-baglamukhi.png`). */
export const HOME_HERO_IMAGE = `${process.env.PUBLIC_URL || ""}/home-hero-maa-baglamukhi.png`;

/** Used if `frontend/public/maa-baglamukhi-hero.png` is missing or fails to load. */
export const BOOK_PUJA_MAA_FALLBACK = HERO_IMAGE;

/** About page — Maa Baglamukhi illustration (`frontend/public/about-maa-baglamukhi-peeth.png`). */
export const ABOUT_PAGE_MAA_IMAGE = `${process.env.PUBLIC_URL || ""}/about-maa-baglamukhi-peeth.png`;

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1774020039814-c5bdab09e1cf?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

export const DIYA_IMAGE =
  "https://images.unsplash.com/photo-1597122582304-97edf3b0ff69?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

export const FLOWER_IMAGE =
  "https://images.unsplash.com/photo-1661142175513-a5f0871f1ad1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

export const BOKEH_IMAGE =
  "https://images.unsplash.com/photo-1769159076690-43f36fc8adcf?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";

export const MOUNTAIN_IMAGE =
  "https://images.unsplash.com/photo-1547992039-47e365bcaee7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

export const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    title: { en: "Morning Aarti Glow", hi: "प्रातः आरती का प्रकाश" },
    description: {
      en: "The first light of diyas — a quiet beginning before the chants fill the sanctum.",
      hi: "दीपों की पहली लौ — मंत्रोच्चार से पहले का शांत, पवित्र क्षण।",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    title: { en: "Temple Courtyard Serenity", hi: "मंदिर प्रांगण की शांति" },
    description: {
      en: "A sacred pause in the temple space — where devotion feels timeless.",
      hi: "मंदिर की पवित्र शांति — जहाँ भक्ति समय से परे लगती है।",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    title: { en: "Golden Mandir Details", hi: "स्वर्णिम मंदिर शिल्प" },
    description: {
      en: "Ornate textures and warm gold tones that echo the sacred atmosphere.",
      hi: "सूक्ष्म शिल्प और स्वर्णिम आभा — जो दिव्यता का अनुभव कराए।",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    title: { en: "Deepa & Incense", hi: "दीपक और धूप" },
    description: {
      en: "Smoke, flame, and silence — the simplest offerings carry the deepest prayer.",
      hi: "धुआँ, लौ और मौन — सरल अर्पण में ही गहन प्रार्थना।",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1609766418204-94aae0ecf4e5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    title: { en: "Sacred Bells Above", hi: "ऊपर झूलती घंटियाँ" },
    description: {
      en: "Temple bells swaying softly — every ring feels like a blessing.",
      hi: "मंदिर की घंटियाँ — हर ध्वनि मानो आशीर्वाद बन जाए।",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1606293926249-ed22e4f2f12a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    title: { en: "Evening Ritual Light", hi: "सांध्य अनुष्ठान की रोशनी" },
    description: {
      en: "Warm amber light at dusk — a cinematic calm across the temple.",
      hi: "सांझ की स्वर्णिम रोशनी — मंदिर में छाया दिव्य सुकून।",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1583309217394-d63f2bf7b3fa?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    title: { en: "Offerings & Flowers", hi: "अर्पण और पुष्प" },
    description: {
      en: "Marigolds, petals, and sacred intent — devotion arranged with care.",
      hi: "गेंदा, पुष्प और संकल्प — श्रद्धा को स्नेह से सजाया गया।",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1604608672516-f1b9b1d52cd1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    title: { en: "Temple Lamps & Shadows", hi: "दीप और छायाएँ" },
    description: {
      en: "A play of lamp-light and shadow — a timeless temple mood.",
      hi: "दीप प्रकाश और छाया का खेल — मंदिर का शाश्वत वातावरण।",
    },
  },
  {
    src: ABOUT_IMAGE,
    title: { en: "Sanctum Atmosphere", hi: "गर्भगृह का वातावरण" },
    description: {
      en: "A sacred interior mood — quiet, focused, and devotional.",
      hi: "पवित्र भीतरी वातावरण — शांत, एकाग्र और भक्तिमय।",
    },
  },
  {
    src: DIYA_IMAGE,
    title: { en: "Diya Flame Close-up", hi: "दीपक की लौ" },
    description: {
      en: "A single diya can hold a whole prayer — steady and luminous.",
      hi: "एक दीपक में पूरी प्रार्थना — स्थिर और उज्ज्वल।",
    },
  },
  {
    src: FLOWER_IMAGE,
    title: { en: "Sacred Flowers", hi: "पवित्र पुष्प" },
    description: {
      en: "Flowers offered with sankalp — simplicity that reaches the divine.",
      hi: "संकल्प सहित अर्पित पुष्प — सरलता में दिव्यता।",
    },
  },
  {
    src: MOUNTAIN_IMAGE,
    title: { en: "Pilgrimage Journey", hi: "तीर्थ यात्रा" },
    description: {
      en: "Every journey begins with faith — the road itself becomes part of devotion.",
      hi: "हर यात्रा विश्वास से शुरू होती है — मार्ग भी भक्ति बन जाता है।",
    },
  },
];

export const FOOTER_LINKS = {
  quick: [
    { navKey: "home", href: "/" },
    { navKey: "about", href: "/about" },
    { navKey: "bookPuja", href: "/book-puja" },
    { navKey: "liveDarshan", href: "/live-darshan" },
    { navKey: "donate", href: "/donate" },
  ],
  pilgrimage: [
    { tKey: "footer.linkReach", href: "/#reach" },
    { tKey: "footer.linkStay", href: "/#stay" },
    { tKey: "footer.linkFestivals", href: "/festivals" },
    { tKey: "footer.linkGallery", href: "/gallery" },
    { tKey: "footer.linkContact", href: "/contact" },
  ],
};

