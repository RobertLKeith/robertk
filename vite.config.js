import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  // The custom domain serves the site from its root.
  base: "/",
  plugins: [
    {
      name: "pages-production-entry",
      enforce: "post",
      transformIndexHtml(html) {
        return html.replace(/\s*<!-- pages-root-fallback:start -->[\s\S]*?<!-- pages-root-fallback:end -->\s*/, "\n");
      }
    },
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
    outDir: "dist",
    emptyOutDir: true,
    cssMinify: true,
    sourcemap: false
  }
});
