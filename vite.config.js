import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  // Relative asset URLs work on both the GitHub Pages project path
  // (/robertk/) and the production custom domain.
  base: "./",
  plugins: [
    svelte(),
    imagetools({
      defaultDirectives: new URLSearchParams({
        w: "1200",
        format: "webp",
        q: "80"
      })
    })
  ],
  build: {
    outDir: "docs",
    emptyOutDir: true,
    cssMinify: true,
    sourcemap: false
  }
});
