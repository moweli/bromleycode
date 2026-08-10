// scripts/verify.mjs
// Encodes the verification criteria from the positioning spec, section 11.
// `tsc` and `next build` both pass while shipping a 404 image or a heading that
// contradicts the diagram, so those need checking against a served page.
//
// Most of it needs only HTTP, so it runs with no dependencies at all. The two
// layout checks need a real browser and are skipped, loudly, when Playwright is
// not installed. Adding it as a devDependency would put a browser download into
// every install and every deploy build to check two assertions, which is not a
// trade worth making.
//
// Usage: npx next start -p 3111 &  then  node scripts/verify.mjs
const BASE = process.argv[2] || "http://localhost:3111";
const failures = [];
const check = (ok, label) => {
  if (!ok) failures.push(label);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
};

const ROUTES = [
  "/",
  "/services",
  "/services/data-platform-engineering",
  "/services/intelligence-extraction",
  "/services/data-ai-strategy",
  "/services/evaluation-assurance",
  "/how-we-work",
  "/industries",
  "/case-studies",
  "/insights",
  "/about",
  "/contact",
];

/** Visible text, near enough: drop script/style bodies, then all tags. */
const visibleText = (html) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

/**
 * Attribute values in HTML are entity-encoded. next/image emits its optimizer
 * URL with `&amp;` between parameters, which is correct HTML; a browser decodes
 * it and the raw regex match does not. Refetching the undecoded string sends a
 * malformed query and the optimizer answers 400, so without this every
 * next/image on the site reads as broken.
 */
const decodeEntities = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

/** <img> tags inside <main>, as {src, hasAlt}. */
function mainImages(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  return [...main.matchAll(/<img\b[^>]*>/gi)].map((m) => ({
    src: decodeEntities(m[0].match(/\ssrc="([^"]*)"/i)?.[1] ?? ""),
    // Presence, not contents. `alt=""` is the correct marking for a decorative
    // image, and this site uses it deliberately on card thumbnails whose
    // heading already carries the meaning. A missing alt attribute is the
    // defect; an empty one is a decision.
    hasAlt: /\salt="/i.test(m[0]),
  }));
}

for (const route of ROUTES) {
  const res = await fetch(BASE + route, { redirect: "follow" });
  check(res.ok, `${route} responds`);
  if (!res.ok) continue;

  const html = await res.text();
  const text = visibleText(html);
  const images = mainImages(html);

  // Next serves images through /_next/image; request each one and require 200.
  const broken = [];
  for (const img of images) {
    if (!img.src) continue;
    const url = img.src.startsWith("http") ? img.src : BASE + img.src;
    const r = await fetch(url, { method: "GET" });
    if (!r.ok) broken.push(`${img.src} (${r.status})`);
  }

  check(broken.length === 0, `${route} images all load${broken.length ? ` (broken: ${broken.join(", ")})` : ""}`);
  check(
    images.every((i) => i.hasAlt),
    `${route} every image has an alt attribute`,
  );
  check(!/ten stages/i.test(text), `${route} does not claim "ten stages"`);
  check(!/illustrative/i.test(text), `${route} carries no illustrative framing`);
}

// The two renamed slugs must redirect rather than 404.
for (const [from, to] of [
  ["/services/data-pipeline-engineering", "/services/data-platform-engineering"],
  ["/services/ai-strategy-roadmap", "/services/data-ai-strategy"],
]) {
  const res = await fetch(BASE + from, { redirect: "follow" });
  check(new URL(res.url).pathname === to, `${from} redirects to ${to}`);
}

// Layout needs a real browser. Optional on purpose: present in a dev
// environment that has Playwright, skipped with a notice everywhere else.
let chromium = null;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.log("\nSKIP  layout checks: playwright is not installed here.");
  console.log("      npm i -D playwright && npx playwright install chromium  enables them.");
}

if (chromium) {
  const browser = await chromium.launch();
  for (const [width, label] of [
    [1280, "1280px"],
    [390, "390px"],
  ]) {
    const page = await (
      await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 768 })
    ).newPage();
    for (const route of ["/", "/how-we-work", "/services"]) {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
      const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      check(!over, `${route} no horizontal overflow at ${label}`);
    }
  }
  await browser.close();
}

console.log(`\n${failures.length === 0 ? "ALL PASSED" : `${failures.length} FAILED`}`);
if (failures.length) console.log(failures.map((f) => `  - ${f}`).join("\n"));
process.exit(failures.length ? 1 : 0);
