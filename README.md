# AspiRE Website

React + Vite + Tailwind CSS build of the AspiRE 3-page marketing site
(Home, AspiRE Engineering, AspiRE Sales).

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Before this is production-ready

1. **EmailJS** — open `src/components/ContactForm.jsx` and replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, and `YOUR_PUBLIC_KEY` with your actual EmailJS credentials (emailjs.com → Email Services / Templates / Account → API Keys). The form field names (`full_name`, `company_name`, `email`, `phone`, `message`) must match the variables in your EmailJS template.

2. **Images & mockups** — every placeholder box (grey/dark rounded rectangles with descriptive text) needs a real image or exported PNG from Figma. Search each page file for `placeholder` to find them:
   - Hero background image (`Home.jsx`)
   - About Us image
   - Purpose-Built Modules card backgrounds
   - Dashboard / phone mockups (Hero, FeatureTabs)
   - Warehouse Management image
   - Before/After images ("What We Aim" sections)
   - Client logos (`ClientLogos.jsx`) — swap text for actual logo images

3. **Client logos** — `src/components/ClientLogos.jsx` currently renders client names as text. Replace with `<img>` tags once you have the logo files (NANU Estates, KAMAT Construction, MahaRudra Real Estate, EDCON, etc).

4. **WhatsApp number** — update the `href` in `src/components/WhatsAppWidget.jsx` if needed.

5. **Package Plans pricing** — `src/components/PackagePlans.jsx` currently has no prices shown (matching your reference screenshots). Add price values to each plan object if you want them displayed.

## Folder structure

```
src/
  components/
    Navbar.jsx          → top navigation, Our Products + Package Plan dropdowns
    Footer.jsx           → footer with India/USA addresses, social links
    ContactForm.jsx       → "Let's Discuss" + Contact Us form (EmailJS)
    WhatsAppWidget.jsx    → floating WhatsApp button
    SectionHeading.jsx    → reusable eyebrow + title + subtitle heading
    Testimonials.jsx      → testimonial cards + dot indicators
    PackagePlans.jsx      → Engineering/Sales toggle + pricing cards
    ClientLogos.jsx       → client logos strip
    FeatureTabs.jsx       → reusable tab-switcher (used by Engineering & Sales)
  pages/
    Home.jsx              → full home page (Hero → About → Modules → Why AspiRE
                             → Vision → Testimonials → Package Plans → Clients)
    Engineering.jsx        → AspiRE Engineering product page
    Sales.jsx              → AspiRE Sales product page
  App.jsx                  → routing, wraps every page with Navbar/Contact/Footer
  main.jsx                 → React entry point
  index.css                → Tailwind directives
```

## Next steps (animation pass)

Once content and images are final, layer in Framer Motion for:
- Card hover states (Purpose-Built Modules, Why AspiRE cards)
- On-scroll fade-ins for each section
- Package Plan toggle transition
- Testimonial carousel auto-play

`FeatureTabs.jsx` already has a basic Framer Motion fade/scale transition between tabs as a reference pattern for the rest.
