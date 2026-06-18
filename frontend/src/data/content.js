export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1698153210197-5a1027c6c5e8?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400";

/** Home page hero — Maa Baglamukhi (`frontend/public/home-hero-maa-baglamukhi.png`). */
export const HOME_HERO_IMAGE = `${process.env.PUBLIC_URL || ""}/home-hero-maa-baglamukhi.png`;

/** Used if `frontend/public/maa-baglamukhi-hero.png` is missing or fails to load. */
export const BOOK_PUJA_MAA_FALLBACK = HERO_IMAGE;

/** About page — Maa Baglamukhi illustration (`frontend/public/about-maa-baglamukhi-peeth.png`). */
export const ABOUT_PAGE_MAA_IMAGE = `${process.env.PUBLIC_URL || ""}/about-maa-baglamukhi-peeth.png`;

const PUB = process.env.PUBLIC_URL || "";

/** Cinematic story sections on `/about` — portrait-friendly, lazy-loaded. */
export const ABOUT_STORY_IMAGES = [
  `${PUB}/about-maa-baglamukhi-peeth.png`,
  `${PUB}/about-sacred-legend-mandir.jpg`,
  `${PUB}/about-temple-deity-trishakti.png`,
  `${PUB}/about-temple-deity-shringar.png`,
  `${PUB}/about-sacred-legend-shrine.jpg`,
];

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1774020039814-c5bdab09e1cf?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

export const FLOWER_IMAGE =
  "https://images.unsplash.com/photo-1661142175513-a5f0871f1ad1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

export const BOKEH_IMAGE =
  "https://images.unsplash.com/photo-1769159076690-43f36fc8adcf?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";

export const MOUNTAIN_IMAGE =
  "https://images.unsplash.com/photo-1547992039-47e365bcaee7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

/** Maa Baglamukhi Siddha Peeth, Nalkheda — map pin for How to Reach section. */
export const TEMPLE_LOCATION = {
  name: "Maa Baglamukhi Siddha Peeth",
  lat: 23.84031,
  lng: 76.23671,
};

export const TEMPLE_MAP_EMBED_URL = `https://www.google.com/maps?q=${TEMPLE_LOCATION.lat},${TEMPLE_LOCATION.lng}+(${encodeURIComponent(`${TEMPLE_LOCATION.name}, Nalkheda`)})&hl=en&z=16&output=embed`;

export const GALLERY = [
  {
    src: `${PUB}/gallery/havan-ritual-priest.png`,
    title: { en: "Sacred Havan at the Peeth", hi: "पीठ पर पवित्र हवन" },
    description: {
      en: "A priest performing havan before Maa Baglamukhi — flames, mantra and devotion united in ritual.",
      hi: "माँ बगलामुखी के समक्ष हवन — अग्नि, मंत्र और भक्ति का पवित्र संयोग।",
    },
  },
  {
    src: `${PUB}/gallery/havan-samagri-offerings.png`,
    title: { en: "Havan Samagri & Offerings", hi: "हवन सामग्री और अर्पण" },
    description: {
      en: "Ritual ingredients arranged with care — turmeric, flowers and sacred herbs for the yajna.",
      hi: "हवन के लिए सजी पवित्र सामग्री — हल्दी, पुष्प और औषधियाँ।",
    },
  },
  {
    src: `${PUB}/gallery/mass-havan-ceremony.png`,
    title: { en: "Mass Havan Ceremony", hi: "सामूहिक हवन अनुष्ठान" },
    description: {
      en: "Hundreds of devotees seated around havan kunds — a powerful collective sankalp at Nalkheda.",
      hi: "सैकड़ों भक्त हवन कुंडों के चारों ओर — नलखेड़ा में सामूहिक संकल्प।",
    },
  },
  {
    src: `${PUB}/gallery/havan-by-the-river.png`,
    title: { en: "Havan by the Sacred Waters", hi: "पवित्र जल के तट पर हवन" },
    description: {
      en: "Anushthan beside the river — where nature and devotion meet in serene ritual.",
      hi: "नदी तट पर अनुष्ठान — जहाँ प्रकृति और भक्ति मिलकर दिव्यता बनती है।",
    },
  },
  {
    src: `${PUB}/gallery/temple-havan-kund.png`,
    title: { en: "Temple Havan Kund", hi: "मंदिर हवन कुंड" },
    description: {
      en: "Devotees gathered around the sacred fire pit within the temple pavilion.",
      hi: "मंदिर प्रांगण में पवित्र हवन कुंड के चारों ओर एकत्रित भक्तगण।",
    },
  },
  {
    src: `${PUB}/gallery/havan-with-devotees.png`,
    title: { en: "Devotees Offering in Havan", hi: "हवन में भक्तों का अर्पण" },
    description: {
      en: "Families offering ahuti together — the golden glow of turmeric and sacred flame.",
      hi: "परिवार सहित आहुति अर्पण — हल्दी और पवित्र अग्नि की स्वर्णिम आभा।",
    },
  },
  {
    src: `${PUB}/gallery/devotees-at-peeth.png`,
    title: { en: "Devotees at the Peeth", hi: "पीठ पर भक्तगण" },
    description: {
      en: "Pilgrims at Maa Baglamukhi Siddha Peeth — faith dressed in devotion.",
      hi: "माँ बगलामुखी सिद्ध पीठ पर तीर्थयात्री — श्रद्धा और भक्ति में सजे भक्त।",
    },
  },
];

export const FOOTER_LINKS = {
  quick: [
    { navKey: "home", href: "/" },
    { navKey: "about", href: "/about" },
    { navKey: "bookPuja", href: "/book-puja" },
  ],
  pilgrimage: [
    { tKey: "footer.linkReach", href: "/#reach" },
    { tKey: "footer.linkGallery", href: "/gallery" },
    { tKey: "footer.linkContact", href: "/contact" },
  ],
};

