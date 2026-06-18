/* eslint-disable */
/**
 * One-off image optimizer: generates .webp next to large .png/.jpg files in /public.
 * Run: node scripts/optimize-images.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

// Files to optimize: [relativePath, maxWidth]
const TARGETS = [
  ["home-hero-maa-baglamukhi.png", 1400],
  ["maa-baglamukhi-hero.png", 1400],
  ["about-maa-baglamukhi-peeth.png", 1200],
  ["about-temple-deity-shringar.png", 1200],
  ["about-temple-deity-trishakti.png", 1200],
  ["about-sacred-legend-shrine.jpg", 1200],
  ["puja-thali-hero.png", 1100],
  ["pandit-ankit-sharma.png", 900],
  ["havan-kund.png", 1000],
  ["havan-kund-reference.png", 1000],
  ["samohan-dhyana.png", 900],
  ["gallery/devotees-at-peeth.png", 1000],
  ["gallery/havan-by-the-river.png", 1000],
  ["gallery/havan-ritual-priest.png", 1000],
  ["gallery/havan-samagri-offerings.png", 1000],
  ["gallery/havan-with-devotees.png", 1000],
  ["gallery/mass-havan-ceremony.png", 1000],
  ["gallery/temple-havan-kund.png", 1000],
];

(async () => {
  let totalSaved = 0;
  for (const [rel, maxWidth] of TARGETS) {
    const src = path.join(PUBLIC_DIR, rel);
    if (!fs.existsSync(src)) {
      console.log(`skip (missing): ${rel}`);
      continue;
    }
    const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
    const before = fs.statSync(src).size;
    try {
      await sharp(src)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: 72, effort: 5 })
        .toFile(out);
      const after = fs.statSync(out).size;
      totalSaved += before - after;
      console.log(
        `${rel}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
      );
    } catch (e) {
      console.error(`FAIL ${rel}: ${e.message}`);
    }
  }
  console.log(`\nTotal saved: ${(totalSaved / 1024).toFixed(0)} KB`);
})();
