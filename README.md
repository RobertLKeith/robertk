# Robert Keith — Official Actor Website

The official portfolio website for actor Robert Keith, presenting selected credits, showreels, portrait and on-set photography, testimonials, professional profiles, representation details, and a downloadable résumé.

## Technology

- [Svelte 5](https://svelte.dev/) for the user interface
- [Vite 6](https://vite.dev/) for development and production builds
- JavaScript, semantic HTML, and custom CSS
- `vite-imagetools` and Sharp for optimized image processing
- Static production output suitable for GitHub Pages or a custom domain

## Local development

This project requires a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

Create and verify a production build with:

```bash
npm run check
```

The production site is generated in `docs/`.

## Content management

Core profile, credit, testimonial, and showreel content is maintained in `src/data/`. Images and downloadable media are organized in `src/assets/`.

The site automatically uses the non-hidden file placed in `src/assets/resume/` as the downloadable résumé. Keep only the current résumé in that directory.

## Design and development

Website designed and developed by [San Roku Ku](https://sanrokuku.com).

## Copyright

Copyright © Robert Keith. All rights reserved.

The website and its content—including text, photographs, video, branding, and other media—are owned by or used with the permission of the client. They may not be copied, reproduced, distributed, or reused without prior written permission.
