import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { imagetools } from "vite-imagetools";

export default defineConfig({
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
    cssMinify: true,
    sourcemap: false
  }
});
