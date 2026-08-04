import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const repositoryRoot = new URL("../", import.meta.url);

function readSource(path) {
  return readFile(new URL(path, repositoryRoot), "utf8");
}

function readOrganIds(anatomyData) {
  const union = anatomyData.match(/export type OrganId\s*=\s*([\s\S]*?);/);
  assert.ok(union, "expected an OrganId union");
  return [...union[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

test("uses the production domain and Chinese document metadata", async () => {
  const layout = await readSource("app/layout.tsx");

  assert.match(layout, /const SITE_URL = "https:\/\/anatomy\.itea\.fit";/);
  assert.match(layout, /metadataBase:\s*new URL\(SITE_URL\)/);
  assert.match(layout, /canonical:\s*"\/"/);
  assert.match(layout, /<html lang="zh-CN">/);
  assert.match(layout, /"@type": "WebSite"/);
  assert.match(layout, /"@type": "WebApplication"/);
  assert.doesNotMatch(layout, /anatomy-atelier\.openai\.site/);
});

test("publishes static crawler files for every organ route", async () => {
  const [robots, sitemap, anatomyData] = await Promise.all([
    readSource("public/robots.txt"),
    readSource("public/sitemap.xml"),
    readSource("app/lib/anatomy-data.ts"),
  ]);
  const organIds = readOrganIds(anatomyData);

  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Sitemap: https:\/\/anatomy\.itea\.fit\/sitemap\.xml$/m);
  assert.match(sitemap, /<loc>https:\/\/anatomy\.itea\.fit\/<\/loc>/);
  for (const id of organIds) {
    assert.match(sitemap, new RegExp(`<loc>https:\\/\\/anatomy\\.itea\\.fit\\/organs\\/${id}<\\/loc>`));
  }
});

test("generates static organ routes with route-specific metadata", async () => {
  const [route, viewer] = await Promise.all([
    readSource("app/organs/[id]/page.tsx"),
    readSource("app/organs/[id]/OrganDetailViewer.tsx"),
  ]);

  assert.match(route, /export function generateStaticParams\(\)/);
  assert.match(route, /export async function generateMetadata/);
  assert.match(route, /alternates:\s*\{ canonical: pathname \}/);
  assert.match(route, /if \(!organ\) notFound\(\)/);
  assert.match(route, /"@type": "LearningResource"/);
  assert.match(route, /href=\{`\/organs\/\$\{item\.id\}`\}/);
  assert.match(viewer, /<OrganViewer/);
});

test("generates the sitemap before every production build", async () => {
  const packageJson = JSON.parse(await readSource("package.json"));
  const generator = await readSource("scripts/generate-sitemap.mjs");

  assert.match(packageJson.scripts.build, /^node scripts\/generate-sitemap\.mjs && /);
  assert.equal(packageJson.scripts.deploy, "npm run build && wrangler deploy");
  assert.equal(packageJson.scripts["deploy:all"], "npm run deploy && npm run deploy:static");
  assert.match(generator, /export type OrganId/);
  assert.match(generator, /\/organs\/\$\{id\}/);
});

test("keeps every referenced 3D model in public assets", async () => {
  const anatomyData = await readSource("app/lib/anatomy-data.ts");
  const modelPaths = [...anatomyData.matchAll(/model:\s*"([^"]+\.glb)"/g)].map(
    (match) => match[1],
  );

  assert.ok(modelPaths.length >= 9, "expected the organ library to reference at least nine models");
  assert.equal(new Set(modelPaths).size, modelPaths.length, "model paths must be unique");

  await Promise.all(
    modelPaths.map(async (modelPath) => {
      assert.match(modelPath, /^\/models\//);
      await access(new URL(`../public${modelPath}`, import.meta.url));
    }),
  );
});

test("documents the real project instead of the starter template", async () => {
  const readme = await readSource("README.md");

  assert.match(readme, /^# Anatomy Atelier/m);
  assert.match(readme, /https:\/\/anatomy\.itea\.fit\//);
  assert.doesNotMatch(readme, /# vinext-starter|site-creator-vinext-starter/);
});
