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

// Every route the site generates, index and detail. Detail routes carry most of
// the prose, so leaving them out let the harness report ALL PASSED over the
// pages that changed least. The lists mirror each generateStaticParams set and
// have to be extended by hand when a study, insight or sector is added.
const ROUTES = [
  "/",
  "/services",
  "/services/data-platform-engineering",
  "/services/intelligence-extraction",
  "/services/data-ai-strategy",
  "/services/evaluation-assurance",
  "/how-we-work",
  "/industries",
  "/industries/water-utilities",
  "/industries/central-government",
  "/industries/financial-services",
  "/case-studies",
  "/case-studies/asset-information-retrieval-water-utility",
  "/case-studies/regulatory-evidence-pipeline-central-government",
  "/case-studies/claims-evidence-assurance-financial-services",
  "/case-studies/ai-roadmap-professional-services",
  "/case-studies/warehouse-replatform-without-a-freeze",
  "/case-studies/platform-trustworthy-enough-to-publish-from",
  "/insights",
  "/insights/history-is-a-per-attribute-decision",
  "/insights/a-contract-that-cannot-stop-a-load",
  "/insights/chunking-is-a-decision-not-a-default",
  "/insights/what-permission-inheritance-actually-requires",
  "/insights/abstention-is-a-feature",
  "/insights/your-evaluation-set-is-too-big",
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

// Brand kit. The tab and home-screen icons are what a browser actually caches,
// so check the tags the served page emits and the files behind them, not just
// that the files exist on disk.
const home = await (await fetch(BASE + "/")).text();
const head = home.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? "";
const iconHrefs = [...head.matchAll(/<link\b[^>]*rel="(?:icon|apple-touch-icon)"[^>]*>/gi)].map((m) =>
  decodeEntities(m[0].match(/\shref="([^"]*)"/i)?.[1] ?? ""),
);
for (const href of [
  "/assets/brand/favicon/favicon.ico",
  "/assets/brand/favicon/favicon-32x32.png",
  "/assets/brand/favicon/favicon-16x16.png",
  "/assets/brand/favicon/apple-touch-icon.png",
]) {
  check(iconHrefs.includes(href), `head links ${href}`);
  const r = await fetch(BASE + href);
  check(r.ok && /^image\//.test(r.headers.get("content-type") ?? ""), `${href} serves an image`);
}
// The old generated icons would compete with the brand kit for the tab.
check(
  iconHrefs.every((h) => h.startsWith("/assets/brand/")),
  `head links no icon outside the brand kit (${iconHrefs.join(", ")})`,
);

// Crawlers request /favicon.ico by convention; it must be the brand kit's ICO.
const [legacyIco, brandIco] = await Promise.all(
  ["/favicon.ico", "/assets/brand/favicon/favicon.ico"].map(async (p) => {
    const r = await fetch(BASE + p);
    return r.ok ? Buffer.from(await r.arrayBuffer()) : null;
  }),
);
check(Boolean(legacyIco && brandIco?.equals(legacyIco)), "/favicon.ico serves the brand kit ICO");

// The header home link is named once, by its label; the logo inside it is
// alt="" so a screen reader does not announce the name twice.
const homeLink = home.match(/<a\b[^>]*aria-label="Bromley Code home"[^>]*>([\s\S]*?)<\/a>/i)?.[1] ?? "";
const headerLogo = homeLink.match(/<img\b[^>]*>/i)?.[0] ?? "";
check(/bromleycode-logo/.test(headerLogo) && /\salt=""/.test(headerLogo), "header home link holds the logo, alt=\"\"");
check(homeLink !== "" && visibleText(homeLink).trim() === "","header home link carries no duplicate text wordmark");
const footer = home.match(/<footer[\s\S]*?<\/footer>/i)?.[0] ?? "";
check(/<img\b[^>]*alt="Bromley Code"[^>]*bromleycode-logo|<img\b[^>]*bromleycode-logo[^>]*alt="Bromley Code"/i.test(footer), "footer shows the logo, alt=\"Bromley Code\"");
for (const tag of [headerLogo, footer.match(/<img\b[^>]*bromleycode-logo[^>]*>/i)?.[0] ?? ""]) {
  const src = decodeEntities(tag.match(/\ssrc="([^"]*)"/i)?.[1] ?? "");
  if (!src) continue;
  const r = await fetch(src.startsWith("http") ? src : BASE + src);
  check(r.ok, `logo ${src} loads`);
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
