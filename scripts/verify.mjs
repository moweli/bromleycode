// scripts/verify.mjs
// Encodes the verification criteria from the positioning spec, section 11.
// tsc and next build both pass while shipping a broken image or a heading that
// contradicts the diagram, so these checks use a real browser.
//
// Usage: npx next start -p 3111 &  then  node scripts/verify.mjs
import { chromium } from "playwright";

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

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

for (const route of ROUTES) {
  const res = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
  check(res !== null && res.status() < 400, `${route} responds`);
  if (!res || res.status() >= 400) continue;

  const d = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("main img")];
    return {
      text: document.body.innerText,
      brokenImages: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src")),
      noAlt: imgs.filter((i) => !i.getAttribute("alt")).length,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  check(d.brokenImages.length === 0, `${route} images all load${d.brokenImages.length ? ` (broken: ${d.brokenImages})` : ""}`);
  check(d.noAlt === 0, `${route} every image has alt text`);
  check(!d.overflow, `${route} no horizontal overflow at 1280px`);
  check(!/ten stages/i.test(d.text), `${route} does not claim "ten stages"`);
  check(!/illustrative/i.test(d.text), `${route} carries no illustrative framing`);
}

// The two renamed slugs must redirect rather than 404.
for (const [from, to] of [
  ["/services/data-pipeline-engineering", "/services/data-platform-engineering"],
  ["/services/ai-strategy-roadmap", "/services/data-ai-strategy"],
]) {
  await page.goto(BASE + from, { waitUntil: "domcontentloaded", timeout: 60000 });
  check(new URL(page.url()).pathname === to, `${from} redirects to ${to}`);
}

// Mobile pass: the forked diagram must not force the page sideways.
const mobile = await (
  await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })
).newPage();
for (const route of ["/", "/how-we-work", "/services"]) {
  await mobile.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
  const over = await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  check(!over, `${route} no horizontal overflow at 390px`);
}

await browser.close();
console.log(`\n${failures.length === 0 ? "ALL PASSED" : `${failures.length} FAILED`}`);
if (failures.length) console.log(failures.map((f) => `  - ${f}`).join("\n"));
process.exit(failures.length ? 1 : 0);
