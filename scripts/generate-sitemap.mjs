import { readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://anatomy.itea.fit";
const anatomyDataUrl = new URL("../app/lib/anatomy-data.ts", import.meta.url);
const sitemapUrl = new URL("../public/sitemap.xml", import.meta.url);
const source = await readFile(anatomyDataUrl, "utf8");
const organIdUnion = source.match(/export type OrganId\s*=\s*([\s\S]*?);/);

if (!organIdUnion) {
  throw new Error("Could not find the OrganId union in app/lib/anatomy-data.ts");
}

const organIds = [...organIdUnion[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);

if (organIds.length === 0 || new Set(organIds).size !== organIds.length) {
  throw new Error("OrganId entries must be present and unique before generating the sitemap");
}

const paths = ["/", ...organIds.map((id) => `/organs/${id}`)];
const urls = paths
  .map((path) => `  <url>\n    <loc>${siteUrl}${path}</loc>\n  </url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

await writeFile(sitemapUrl, sitemap, "utf8");
console.log(`Generated sitemap with ${paths.length} URLs.`);
