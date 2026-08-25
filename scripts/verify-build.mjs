import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve("docs");
const html = await readFile(resolve(outputDirectory, "index.html"), "utf8");
const failures = [];

const requireText = (value, label) => {
  if (!html.includes(value)) failures.push(`Missing ${label}: ${value}`);
};

requireText('rel="canonical" href="https://369-webdev.github.io/robertk/"', "canonical URL");
requireText('type="application/ld+json"', "JSON-LD");
requireText('<div id="app"></div>', "application mount point");

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
