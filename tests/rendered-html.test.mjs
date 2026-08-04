import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const repositoryRoot = new URL("../", import.meta.url);

function readSource(path) {
  return readFile(new URL(path, repositoryRoot), "utf8");
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

test("publishes crawler routes for the production site", async () => {
  const [robots, sitemap] = await Promise.all([
    readSource("app/robots.ts"),
    readSource("app/sitemap.ts"),
  ]);

  assert.match(robots, /userAgent:\s*"\*"/);
  assert.match(robots, /allow:\s*"\/"/);
  assert.match(robots, /sitemap:\s*`\$\{SITE_URL\}\/sitemap\.xml`/);
  assert.match(sitemap, /url:\s*`\$\{SITE_URL\}\/`/);
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
