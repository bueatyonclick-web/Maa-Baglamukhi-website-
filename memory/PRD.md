# PRD — Shree Maa Baglamukhi Siddha Peeth, Nalkheda

## Original Problem Statement
Create a WORLD-CLASS PREMIUM SPIRITUAL WEBSITE for "Shree Maa Baglamukhi Siddha Peeth Nalkheda" — luxury devotional aesthetics, cinematic animations, dark/golden palette, immersive pilgrimage experience. Pages: Home, About, How to Reach, Online Puja Booking, Gallery, Festivals, Live Darshan, Donation, Accommodation, Contact, Blog, Marketplace, Ask a Pandit, Daily Mantra, Miracles, etc.

## User Personas
- Devotees worldwide seeking online puja & darshan
- Pilgrims planning visit to Nalkheda
- Donors supporting seva, gau seva, anna daan
- Spiritual seekers exploring tantric tradition

## Architecture
- **Frontend**: React 19 + CRA + Tailwind + Framer Motion + Lenis (smooth scroll) + Shadcn UI
- **Backend**: FastAPI + MongoDB (Motor) + Pydantic
- **AI**: Claude Sonnet 4.5 via Emergent Universal LLM Key (`emergentintegrations`)
- **Design**: Dark ink-black/maroon palette + saffron/gold glow; Cormorant Garamond + Tenor Sans + Tiro Devanagari Hindi

## Core Requirements (static)
- Premium cinematic UI with golden particles, glassmorphism, mandala motifs
- Online Puja Booking with calendar dates, priest cards, success animation
- Online Donation with multiple causes & amounts
- Live Darshan with YouTube embed + interactive virtual diya lighting
- Festivals timeline with live countdown timers
- Miracle stories / devotee testimonials
- Gallery with lightbox
- Ask a Pandit AI chatbot (Claude Sonnet 4.5)
- Daily Mantra section with Sanskrit verse
- How to Reach with Google Maps embed
- FAQ accordion
- Newsletter + Contact form

## Implemented (2026-02-XX, v1)
- ✅ Cinematic Home page with 11 sections (Hero, Mantra, About, Booking, Live Darshan, Festivals, Miracles, Gallery, Donation, How to Reach, FAQ, Footer/Contact)
- ✅ Backend endpoints: /pujas, /bookings, /donations, /diya-offering, /prayer-requests, /newsletter, /contact, /chat, /festivals, /temple-stats
- ✅ AI chatbot "Ask Pandit ji" floating button — Claude Sonnet 4.5
- ✅ Virtual diya offering with flame animation
- ✅ Booking & donation success animations with reference IDs
- ✅ Live countdown timers for festivals
- ✅ Lightbox gallery, accordion FAQ
- ✅ Newsletter, contact form, social links

## Backlog (P1/P2)
- P1: Razorpay/Stripe live payment gateway (currently mock confirmation)
- P1: Admin dashboard to view bookings/donations
- P1: Dedicated pages for Gallery, Booking, Donation, Festivals (currently single-page anchors)
- P1: Multi-language support (English, Hindi, Gujarati)
- P2: 3D temple Three.js scene
- P2: Spiritual marketplace (Rudraksha, Yantras, books)
- P2: Accommodation listings page
- P2: Blog CMS
- P2: 360° virtual temple tour
- P2: Volunteer / Yatra registration
- P2: Live crowd status, digital prasad delivery
- P2: PWA support, offline mode
- P2: Multi-currency international donations
