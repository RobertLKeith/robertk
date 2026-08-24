# Actor Website (Svelte + Vite)

Premium, lightweight, mobile-first actor website with:
- Cinematic hero (auto loads first image in src/assets/hero)
- Headshot gallery (auto loads all images in src/assets/headshots)
- Embedded showreel (YouTube or Vimeo)
- Structured credits
- Downloadable CV (public/cv.pdf)
- Contact form (static-friendly endpoint)
- Agency details
- Optional testimonials
- SEO basics: title/description, canonical, og/twitter, robots.txt, sitemap.xml, JSON-LD Person

## Setup
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Update content
- Edit `src/data/profile.js`, `src/data/credits.js`, `src/data/testimonials.js`
- Replace `public/cv.pdf` with the real CV
- Replace `public/og.jpg` with a real social share image (1200x630 recommended)
- Put your hero image(s) in `src/assets/hero/`
- Put your headshots in `src/assets/headshots/`

## SEO checklist
- In `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `src/data/profile.js`, change `https://example.com/` to your real domain.
- Use a real `og.jpg` (1200x630) so Google and social platforms can show rich previews.
- Submit the sitemap URL in Google Search Console.
