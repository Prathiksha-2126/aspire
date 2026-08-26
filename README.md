# AspiRE Website

React + Vite + Tailwind CSS + Framer Motion build of the AspiRE marketing site (Home, AspiRE Engineering, AspiRE Sales, Privacy Policy, Terms of Service).

Live: `https://aspire-dun.vercel.app` (production domain `aspirecloud.in` when DNS verified)

## Tech Stack

- Vite 5 + React 18 + React Router
- Tailwind CSS (Poppins)
- Framer Motion (page/section transitions, carousels, tab switches)
- Resend HTTPS API for Contact Us delivery (replaces EmailJS — Vercel blocks raw SMTP 25/465/587)

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # vite build -> dist/
```

## Environment Variables

Create `.env.local` (local) and set in Vercel → Settings → Environment Variables (Production + Preview):

```
RESEND_API_KEY=re_xxx            # from resend.com → API Keys
RESEND_FROM=AspiRE Website <onboarding@resend.dev>  # use enquiries@aspirecloud.in after domain verified in Resend → Domains
CONTACT_TO=inquiry@coppercodes.com                  # inbox that receives enquiries
# Optional fallback for local preview without Resend:
# VERCEL_PROJECT_PRODUCTION_URL auto-provided by Vercel for logo URL in mail
```

`src/components/ContactForm.jsx:6` and `api/contact.js:1` share the same HTML builder — mail is sent via `POST /api/contact` → `https://api.resend.com/emails` with `reply_to` set to the visitor's email. Logo in mail uses `https://<VERCEL_PROJECT_PRODUCTION_URL>/images/Black%20AspiRE%20Logo.png` (falls back to `https://aspirecloud.in`).

## Contact Form

- `src/components/ContactForm.jsx` collects `full_name, company_name, email, phone, message` → `fetch("/api/contact")`.
- `api/contact.js` validates, builds `text` + `html` (green `Message` block, no `Next Steps`, no `Digitising Real Estate` duplicate below logo — `Black AspiRE Logo.png` already contains it, `height:48px`), sends via Resend. Preview mode (`200 {preview:true}`) when `RESEND_API_KEY` missing.
- `vite.config.js` has dev middleware fallback for `/api/contact` so `npm run dev` works without Vercel.

## Key Features

- **Responsive:** Mobile hamburger sidebar from right (full opacity, `src/components/Navbar.jsx:180`), fixed logo/hamburger with luminance sampling, `md` breakpoint for desktop nav pill.
- **Hero:** Engineering (`src/pages/Engineering.jsx:80`) and Sales (`src/pages/Sales.jsx:62`) with `Sales_Hero_mobile.png` for mobile (`object-cover` zoom to fit), `object-[32%_center]` / `object-[75%_center]` positioning.
- **Our Features:** `src/components/FeatureTabs.jsx` (Engineering 6 tabs) / `SalesFeatureTabs.jsx` (Sales 4 tabs) — `imageMap` composites (`Task Management Features section...png` etc.) + `iconImage` bubbles (`Task Mangement Icon (eng).png` etc. with `w-full h-full object-cover` no border). Mobile is `min-h-[100svh]` `flex flex-col`, green full circle `w-[700/800] h-[700/800] rounded-full bg-[#2c6035]` behind phone, `translate-y-[80%]` half visible, phone `w-[200/220]` centered, strip `EXTENDED=[...tabs,...tabs,...tabs]` + `virtualActive` + `containerWidth` + `itemWidth 76/80` + `translateX` `0.5s` pure `translateX` (no scale), last→first seamless, auto 3s, pause 5s on manual.
- **Our Products / Testimonials / Package Plans / Why AspiRE:** `vector-on-light` (`Black Vector.png` 45% opacity) for white, `vector-on-green` (`White Vector.png` 45% opacity) for green (`src/index.css:72`), with `blend-to-green/light` fade zone (`--fade-h`/`--fade-clear`) and `fade-clear-top`.
- **Legal:** `src/pages/PrivacyPolicy.jsx` / `TermsOfService.jsx` — `id="hero"` dark header, `window.scrollTo instant` via `src/App.jsx:15` `ScrollToTop`, mobile sticky `ON THIS PAGE` hamburger (`w-8 h-8`), `mobileScrollRef` horizontal-only scroll (no vertical jump).
- **Footer:** `src/components/Footer.jsx:68` `Privacy Policy` / `Terms of Service` links, `© 2026`, mailto.

## Folder Structure

```
src/
  components/
    Navbar.jsx              → fixed logo/hamburger, Our Products/Package Plan dropdowns, luminance
    Footer.jsx              → brand, social, nav, India/USA, legal links
    ContactForm.jsx         → Let's Discuss + Contact Us (Resend)
    FeatureTabs.jsx         → Engineering tabs (6) + imageMap
    SalesFeatureTabs.jsx    → Sales tabs (4) + imageMap
    OurProducts.jsx         → 2 green cards (Engineering/Sales) on #2c6035
    Testimonials.jsx        → green carousel (mobile single, desktop 5-card)
    PackagePlans.jsx        → Engineering/Sales toggle
    WhyAspireSection (in Home.jsx) → circle + bubbles
  pages/
    Home.jsx                → Hero video + Our Vision + OurProducts + WhyAspiRE + Testimonials
    Engineering.jsx         → Hero + FeatureTabs + OurAimSection
    Sales.jsx               → Hero (mobile Sales_Hero_mobile.png) + SalesFeatureTabs + OurAimSection
    PrivacyPolicy.jsx       → 18 sections, sticky ON THIS PAGE
    TermsOfService.jsx      → 33 sections, sticky ON THIS PAGE
  App.jsx                   → BrowserRouter + ScrollToTop + LoadingOverlay + Routes
  index.css                 → Tailwind + vector-on-* + blend/fade
api/
  contact.js                → Resend handler (CORS, validation, html/text)
public/images/
  Black Vector.png / White Vector.png (45% opacity via ::after)
  Hero Section of AspiRe Sales.png / Sales_Hero_mobile.png
  Task Management Features section...png etc. + Icon *.png
```

## Deployment (Vercel)

- `vercel.json` rewrites `/api/(.*)` → serverless.
- Push to `main` → auto deploy. After changing env vars, Redeploy top Production (uncheck cache).
- Check `Logs → Runtime` for `POST /api/contact 200 + Resend id` and Resend Dashboard → Logs.

## Notes

- No `display:none` hacks — spacing/positioning/z-index only.
- `vite build` must pass (currently 1879 modules, ~1.1MB css, ~454KB js).
