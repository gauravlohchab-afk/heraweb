# Hera Wellness Studio — website

React + Vite site, prerendered to static HTML at build time so every
treatment description and JSON-LD block is in the initial HTML for search engines and AI crawlers.

## Run locally

```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # production build → dist/ (prerendered pages, 404.html, sitemap.xml)
npm run preview   # serve the production build at http://localhost:4173
```

Deploy the `dist/` folder to any static host. Configure the host to serve
`404.html` for unknown paths.

## Where things live

| What | File |
| --- | --- |
| Business info, promotion, map | `src/data/site.js` |
| Treatments, categories | `src/data/treatments.js` |
| All image paths (incl. before/after) | `src/data/media.js` |
| Reviews and video testimonials | `src/data/testimonials.js` |
| Page titles, descriptions, JSON-LD | `src/data/seo.js` |
| Design tokens (colours, type, spacing) | `src/styles/tokens.css` |
| All other styling (global) | `src/styles/*.css` via `src/styles/index.css` |
| Booking popup (one component, two modes) | `src/components/booking/` |
| Leads API client & validation | `src/lib/booking.js` (API URL, center name, payment methods in `src/data/site.js`) |
| Brand font slots (Canva Sans) | `src/styles/fonts.css` → `public/fonts/` |
| Decorative SVG artwork | `src/components/decor/Decor.jsx` |
| All images & videos (single folder) | `public/images/` — `center/`, `treatments/<group>/`, `before-after/`, `testimonials/`, `general/` |

## Pages

`/`, `/treatments/`, `/treatments/<category>/`, `/treatments/<category>/<treatment>/` (18 pages),
`/about/`, `/reviews/`, `/contact/`.

## SEO

- Per-page titles, descriptions, canonical, robots, Open Graph/Twitter tags and JSON-LD: `src/data/seo.js`.
- Social-share images (1200×630) in `public/images/og/`, generated from page photos by
  `python scripts/og-images.py` — re-run it if those photos change.
- `npm run build` writes static HTML for every page plus `dist/sitemap.xml` (indexable pages only, with images).
- `public/robots.txt` points crawlers to the sitemap; `/sitemap/` is the human-readable version.
- Fonts are self-hosted in `public/fonts/` (no third-party font requests).

## Booking

Every booking CTA renders `<BookButton treatment="…" mode="booking|call" />`, which opens the
single popup (`BookingProvider` in the layout). Requests go to
`POST …/api/leads?type=call|booking&center=Hera%20Wellness%20Studio` with
`fullname, email, phone, treatment` (+ `message` for calls; + `schedule, preferredDate,
preferredTime, age, paymentMethod` for bookings). Success is shown only after a 2xx response.

## Adding media later

- **Treatment photos:** add `<group>-N.webp` (1000×1000) and `<group>-N-600.webp` to `public/images/treatments/<group>/`, then set the count in `treatmentMedia` (`src/data/media.js`). Every treatment now has a folder. Images not taken at the studio use `illustrative('<group>', N)` instead of `photos(…)`, so they are described as illustrative and left out of structured data. No promotional posters. After changing a treatment's first image, re-run `python scripts/og-images.py`.
- **Canva Sans:** add licensed `CanvaSans-Regular.woff2` / `CanvaSans-Bold.woff2` to `public/fonts/` and uncomment the `url()` lines in `fonts.css`.
- **Before & after:** hidden for now. To bring it back, add genuine pairs to `beforeAfter` in `media.js`, re-add a `/results/` route (and its entry in `src/routes.js`, `seo.js` and the header nav) rendering `<BeforeAfterGallery filters />`.
- **Prices:** intentionally not published anywhere on the site (pages, metadata or structured data).
- **Testimonial video:** `featuredTestimonial` in `testimonials.js`; web file in `public/images/testimonials/`.

Full-quality masters the site doesn't serve (4K testimonial, 1080p clinic film, full-size plant
photo, HydraFacial PNG originals, the PNG originals of the treatment photos in `media-masters/treatments/`) are in `media-masters/` — not public, and excluded from git.
The previous static HTML site is kept in `legacy/` for reference.
