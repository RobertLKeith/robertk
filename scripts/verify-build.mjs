import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve("docs");
const html = await readFile(resolve(outputDirectory, "index.html"), "utf8");
const sitemap = await readFile(resolve(outputDirectory, "sitemap.xml"), "utf8");
const robots = await readFile(resolve(outputDirectory, "robots.txt"), "utf8");
const failures = [];
const productionUrl = "https://robertkeith.com/";
const retiredUrl = "https://369-webdev.github.io/robertk/";

const requireText = (content, value, label) => {
  if (!content.includes(value)) failures.push(`Missing ${label}: ${value}`);
};

requireText(html, `rel="canonical" href="${productionUrl}"`, "canonical URL");
requireText(html, `property="og:url" content="${productionUrl}"`, "Open Graph URL");
requireText(html, 'type="application/ld+json"', "JSON-LD");
requireText(html, `"url": "${productionUrl}"`, "JSON-LD production URL");
requireText(html, '<div id="app"></div>', "application mount point");
requireText(sitemap, `<loc>${productionUrl}</loc>`, "sitemap production URL");
requireText(sitemap, `<image:loc>${productionUrl}og.jpg</image:loc>`, "sitemap image URL");
requireText(robots, `Sitemap: ${productionUrl}sitemap.xml`, "robots.txt sitemap URL");

for (const [content, label] of [[html, "HTML"], [sitemap, "sitemap"], [robots, "robots.txt"]]) {
  if (content.includes(retiredUrl)) failures.push(`${label} contains retired production URL: ${retiredUrl}`);
}

if (html.includes("/src/main.js")) failures.push("Production HTML still references Vite source code");
if (html.includes("pages-root-fallback")) failures.push("Production HTML contains the repository-root fallback redirect");

const assetReferences = [...html.matchAll(/(?:src|href)="\.\/([^"#?]+)"/g)].map(match => match[1]);
for (const asset of assetReferences) {
  try {
    await access(resolve(outputDirectory, asset));
  } catch {
    failures.push(`Missing built asset: ${asset}`);
  }
}

const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
try {
  JSON.parse(jsonLdMatch?.[1] ?? "");
} catch {
  failures.push("JSON-LD is not valid JSON");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Verified production HTML and ${assetReferences.length} local asset references.`);
