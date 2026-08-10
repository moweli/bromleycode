# Two Peer Practices Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Bromley Code site so it sells two peer practices, data engineering and applied AI, instead of GenAI alone.

**Architecture:** Content lives in typed records under `src/content/`; pages are Next.js App Router server components that read those records. Most of this work is content edits. Three pieces are structural: the pipeline diagram forks from one row into a spine with two branches, two service slugs are renamed with redirects, and the relay animation's cycle length moves in step with its node count. Copy is written to the measured voice rules in `design-audit.md` §13.

**Tech Stack:** Next.js 16.3 App Router, React 19.2, TypeScript, Tailwind CSS v4 (CSS-first `@theme`), `sharp` for image encoding, Playwright (resolvable at runtime, not a package dependency) for browser verification.

**Spec:** `docs/superpowers/specs/2026-08-10-data-engineering-positioning-design.md`

## Global Constraints

- **No dashes in visible copy.** Standing client instruction. Applies to em, en and hyphen-as-punctuation. Hyphenated compound words are fine.
- **Headings average 7 words and 76% end in a full stop** (`design-audit.md` §13).
- **Body sentences median 17 words**, mean 19.1.
- **No empty adjectives.** "Robust", "cutting-edge", "seamless", "end-to-end" are banned. Every claim is checkable or it is not made.
- **The firm has two named practices, not a capability supermarket.** Do not add a third or fourth practice, sector, or service.
- **WCAG 2.1 AA holds.** Contrast, focus visibility, 24px minimum target size, `prefers-reduced-motion`.
- **`CONTENT_STATUS` in `src/content/case-studies.ts` stays at `"verified"`.** Do not change it.
- **There is no test framework in this repo** and this plan does not add one. The test cycle is `npx tsc --noEmit`, then `npm run build`, then `node scripts/verify.mjs` against a running `npx next start -p 3111`. Task 1 creates that script; later tasks extend it.
- **Commit after every task.** Do not push or deploy; the operator does that.

---

## File Structure

| File | Responsibility | Task |
|---|---|---|
| `scripts/verify.mjs` | Encodes spec §11 as runnable checks. Extended by later tasks. | 1 |
| `src/content/site.ts` | Tagline, meta description | 2 |
| `src/content/home.ts` | Hero, positioning heading and body | 2 |
| `src/content/services.ts` | Four service records, renumbered, two renamed | 3 |
| `next.config.ts` | Permanent redirects for the two old slugs | 4 |
| `src/content/methodology.ts` | 14 pipeline stages with branch assignment | 5 |
| `src/components/blocks/pipeline-diagram.tsx` | Forked layout, relay schedule, loops | 6 |
| `src/app/globals.css` | Relay cycle duration | 6 |
| `src/app/page.tsx`, `how-we-work/page.tsx`, `services/page.tsx` | Hardcoded diagram headings | 7 |
| `src/content/case-studies.ts` | Two new DE studies | 8 |
| `public/media/case-studies/*`, `media-credits.md` | Two new photographs and their provenance | 8 |
| `src/content/industries.ts`, `insights.ts`, `about.ts`, `stack.ts` | Depth surfaces | 9 |

---

### Task 1: Verification harness

Everything after this depends on being able to check work by observation. `tsc` and `next build` both pass while shipping a 404 image or a heading that contradicts the diagram, so those need a browser.

**Files:**
- Create: `scripts/verify.mjs`

**Interfaces:**
- Produces: `node scripts/verify.mjs [baseUrl]`, exits 0 when all checks pass and 1 with a printed list when any fail. Default base URL `http://localhost:3111`.

- [ ] **Step 1: Write the script**

```js
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
```

- [ ] **Step 2: Run it and confirm it fails on the routes that do not exist yet**

```bash
npm run build && (npx next start -p 3111 &) && sleep 7 && node scripts/verify.mjs
```

Expected: FAIL on `/services/data-platform-engineering responds`, `/services/data-ai-strategy responds`, and both redirect checks. Those routes arrive in Tasks 3 and 4. Every other check should PASS. If anything else fails, that is a pre-existing defect: record it and stop.

- [ ] **Step 3: Commit**

```bash
git add scripts/verify.mjs
git commit -m "Add a verification harness for the positioning rewrite"
```

---

### Task 2: The positioning spine

**Files:**
- Modify: `src/content/site.ts` (`tagline`, `description`)
- Modify: `src/content/home.ts` (`hero.headline`, `hero.standfirst`, `positioning.heading`, `positioning.body`)

**Interfaces:**
- Consumes: nothing.
- Produces: no new symbols. Existing exported names and types are unchanged; only string values change.

- [ ] **Step 1: Replace the two strings in `src/content/site.ts`**

Set `tagline` to exactly:

```
Decision-grade data, and the systems that act on it.
```

Set `description` to exactly:

```
Bromley Code builds the data platforms that make enterprise information usable, and the AI systems that turn it into evidence leaders can act on.
```

- [ ] **Step 2: Replace the four strings in `src/content/home.ts`**

`hero.headline`, exactly. One word changes from the current value. Do not rewrite the rest of the sentence:

```
The pipeline between your data and the decision.
```

`hero.standfirst`, exactly:

```
Better foundations. Better evidence. Better decisions. We build the data platforms that make your information usable, and the AI systems that turn it into answers your teams can act on.
```

`positioning.heading`, exactly:

```
Most organisations have both problems at once.
```

`positioning.body`, exactly:

```
A warehouse nobody quite trusts, and a document estate nobody can query. The two are usually owned by different teams, funded from different budgets, and failing for the same reason.
```

- [ ] **Step 3: Check no dashes entered the copy**

```bash
grep -nE "[—–]|[a-z] - [a-z]" src/content/site.ts src/content/home.ts
```

Expected: no output.

- [ ] **Step 4: Typecheck and build**

```bash
npx tsc --noEmit && npm run build
```

Expected: both clean.

- [ ] **Step 5: Commit**

```bash
git add src/content/site.ts src/content/home.ts
git commit -m "Reframe the positioning spine for two practices"
```

---

### Task 3: Service records

**Files:**
- Modify: `src/content/services.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: service slugs `data-platform-engineering`, `intelligence-extraction`, `data-ai-strategy`, `evaluation-assurance`. Tasks 4, 5, 8 and 9 reference these exact strings.

- [ ] **Step 1: Rename the two slugs and retitle**

In the record currently `slug: "data-pipeline-engineering"`:
- `slug` becomes `"data-platform-engineering"`
- `title` and `shortTitle` become `"Data and platform engineering"`
- `eyebrow` becomes `"Service 01"`

In the record currently `slug: "ai-strategy-roadmap"`:
- `slug` becomes `"data-ai-strategy"`
- `title` and `shortTitle` become `"Data and AI strategy"`
- `eyebrow` becomes `"Service 03"`

Set `eyebrow` on `intelligence-extraction` to `"Service 02"` and on `evaluation-assurance` to `"Service 04"`.

Reorder the array so `data-platform-engineering` is first, then `intelligence-extraction`, `data-ai-strategy`, `evaluation-assurance`. The array order drives card order on `/services` and the homepage.

- [ ] **Step 2: Decide the image-path question from spec §4**

The two records carry image paths built from the old slugs:

```
services.ts:151  src: "/media/services/data-pipeline-engineering.webp"
services.ts:251  src: "/media/services/ai-strategy-roadmap.webp"
```

Take the rename option. Move both files and update their `src` values:

```bash
git mv public/media/services/data-pipeline-engineering.webp public/media/services/data-platform-engineering.webp
git mv public/media/services/ai-strategy-roadmap.webp public/media/services/data-ai-strategy.webp
```

Then set `src` to `"/media/services/data-platform-engineering.webp"` and `"/media/services/data-ai-strategy.webp"` respectively, and update the two matching rows in `media-credits.md` so the shipped-file column still names files that exist.

- [ ] **Step 3: Widen service 01's scope to the four DE areas**

Replace the `approach.steps` array of `data-platform-engineering` with these five steps. Each names a decision and a failure mode, which is the binding constraint from spec §4. Do not soften these into a capability list.

```ts
steps: [
  {
    name: "Estate survey",
    detail:
      "A sampled inventory before any build: row counts against what the business believes, update patterns, the joins that actually get used, and which of the three systems holding a customer record is treated as correct when they disagree.",
  },
  {
    name: "Ingestion and orchestration",
    detail:
      "Change-data capture where the source supports it, content hashing where it does not. Backfill and incremental run through the same code path, because two paths drift and only one of them is tested.",
  },
  {
    name: "Modelling",
    detail:
      "Dimensional models where the questions are known and wide tables where they are not. Slowly changing dimensions are decided per attribute rather than as a policy, because tracking history on everything is how a warehouse becomes unqueryable.",
  },
  {
    name: "Contracts and quality",
    detail:
      "Schema and semantic expectations declared as tests that run on every load. A contract that only fails in a dashboard nobody opens is not a contract, so failures either block the load or page someone.",
  },
  {
    name: "Semantic layer",
    detail:
      "Metric definitions live in one place with an owner. The alternative is the same number computed four ways in four tools, which is the state most teams are actually in when they ask for AI.",
  },
],
```

Replace `hardParts` with four entries whose questions a buyer would actually ask:

```ts
hardParts: [
  {
    question: "How do you migrate without a freeze?",
    answer:
      "Parallel running with reconciliation. The new platform is built alongside the old, both are loaded, and the outputs are compared row by row on an agreed set of measures until the difference is explained rather than merely small. Cutover happens per consumer, not per platform, so a failure affects one report rather than all of them.",
  },
  {
    question: "What happens when a source system changes underneath you?",
    answer:
      "Schema changes are detected on ingest and fail the load rather than propagating. That sounds obvious and is rare, because the alternative, coercing the new shape into the old one, keeps dashboards green while the numbers quietly stop meaning what they meant.",
  },
  {
    question: "How do you decide what to model first?",
    answer:
      "By what a decision depends on, not by what is easiest to load. The survey usually shows two or three subject areas carrying most of the questions, and those get modelled properly while the rest lands raw and waits for a reason to exist.",
  },
  {
    question: "Who owns it after you leave?",
    answer:
      "Your team, and we treat that as an engineering requirement rather than a handover meeting. The transformation layer, the tests and the deployment pipeline are the ones your engineers change during the engagement, not after it.",
  },
],
```

Update `summary`, `standfirst` and `problem.body` of this record so they describe platform and warehouse work rather than pipelines feeding retrieval. Keep the voice rules in Global Constraints.

- [ ] **Step 4: Widen service 04 to cover data assurance**

In `evaluation-assurance`, add two `approach.steps` entries after the existing model-evaluation steps:

```ts
{
  name: "Data contracts",
  detail:
    "Expectations about shape, range, freshness and referential integrity, declared next to the data they describe and run on every load. The point is that a breach stops something, rather than being recorded.",
},
{
  name: "Lineage and freshness",
  detail:
    "Column-level lineage from source to consumed artefact, and a freshness SLA per dataset with an owner attached. When a figure looks wrong, the question is which upstream change caused it, and that question needs an answer in minutes.",
},
```

Update this record's `summary` and `standfirst` to say the practice covers both model outputs and the data underneath, since they are the same discipline pointed at different objects.

- [ ] **Step 5: Typecheck**

```bash
npx tsc --noEmit
```

Expected: FAIL, with errors about `relatedServices` and case-study `services` arrays referencing slugs that no longer exist. That is the point of Task 4 and confirms the blast radius is real. Do not fix them here.

- [ ] **Step 6: Commit**

```bash
git add src/content/services.ts public/media/services media-credits.md
git commit -m "Promote data engineering to service 01 and widen its scope"
```

---

### Task 4: Slug migration and redirects

**Files:**
- Modify: every file containing `data-pipeline-engineering` or `ai-strategy-roadmap`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: the slugs produced by Task 3.
- Produces: `redirects()` in `next.config.ts` returning both permanent redirects.

- [ ] **Step 1: Find every remaining reference**

```bash
grep -rn "data-pipeline-engineering\|ai-strategy-roadmap" src/
```

Expected: 15 references across `src/content/services.ts` (`relatedServices`), `src/content/case-studies.ts` (`services`), `src/content/methodology.ts` (stage `services`, 4 of them) and `src/content/industries.ts`. The two image paths were already handled in Task 3 and must not appear here.

- [ ] **Step 2: Replace all of them**

```bash
grep -rl "data-pipeline-engineering" src/ | xargs sed -i '' 's/data-pipeline-engineering/data-platform-engineering/g'
grep -rl "ai-strategy-roadmap" src/ | xargs sed -i '' 's/ai-strategy-roadmap/data-ai-strategy/g'
```

Then confirm nothing survives:

```bash
grep -rn "data-pipeline-engineering\|ai-strategy-roadmap" src/ ; echo "exit: $?"
```

Expected: no output, exit 1.

- [ ] **Step 3: Add redirects to `next.config.ts`**

The file currently defines `rewrites()` and no `redirects()`. Add the second function alongside the first:

```ts
  async redirects() {
    return [
      // The two service slugs changed when data engineering was promoted to the
      // lead practice. Permanent, because the old paths were published and are
      // linked from the sitemap crawlers already have.
      {
        source: "/services/data-pipeline-engineering",
        destination: "/services/data-platform-engineering",
        permanent: true,
      },
      {
        source: "/services/ai-strategy-roadmap",
        destination: "/services/data-ai-strategy",
        permanent: true,
      },
    ];
  },
```

- [ ] **Step 4: Typecheck, build, verify**

```bash
npx tsc --noEmit && npm run build && (npx next start -p 3111 &) && sleep 7 && node scripts/verify.mjs
```

Expected: `tsc` clean. All twelve routes respond. Both redirect checks PASS. Both service hero images load, which is the check that catches the §4 image-path trap.

- [ ] **Step 5: Confirm the sitemap picked up the new slugs**

```bash
curl -s http://localhost:3111/sitemap.xml | grep -c "data-platform-engineering\|data-ai-strategy"
```

Expected: `2`. `src/app/sitemap.ts` derives entries from the service records, so this needs no edit, but it is asserted rather than assumed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Migrate the two renamed service slugs and add permanent redirects"
```

---

### Task 5: Pipeline stage data

**Files:**
- Modify: `src/content/methodology.ts`

**Interfaces:**
- Consumes: service slugs from Task 3.
- Produces: `PipelineStage` gains `branch: "spine" | "analytics" | "retrieval" | "join"`. `pipelineStages` becomes 14 entries. Task 6 reads `stage.branch` to lay the diagram out.

- [ ] **Step 1: Add `branch` to the `PipelineStage` type**

```ts
export type PipelineStage = {
  id: string;
  name: string;
  /** One line for the diagram. */
  short: string;
  detail: string;
  /** The decision on this stage that most often gets made badly. */
  hardPart: string;
  services: string[];
  /**
   * Where the stage sits in the forked diagram. The spine is shared by both
   * practices, which is the structural argument for selling both; the branches
   * run in parallel and rejoin at the assurance stages.
   */
  branch: "spine" | "analytics" | "retrieval" | "join";
};
```

- [ ] **Step 2: Assign existing stages to branches**

Add `branch` to each of the ten existing records:

| id | branch |
|---|---|
| `survey` | `"spine"` |
| `ingest` | `"spine"` |
| `parse` | `"spine"` |
| `chunk` | `"retrieval"` |
| `enrich` | `"retrieval"` |
| `index` | `"retrieval"` |
| `retrieve` | `"retrieval"` |
| `ground` | `"retrieval"` |
| `evaluate` | `"join"` |
| `review` | `"join"` |

Widen `parse`'s `short` and `detail` so it covers structure recovery in documents *and* schema conformance in tabular sources, since it is now a shared spine stage rather than a document stage.

- [ ] **Step 3: Add four new stages**

Insert `model` and `quality` after `parse`, and `semantic` and `publish` after them, before `chunk`. Final array order is: survey, ingest, parse, model, quality, semantic, publish, chunk, enrich, index, retrieve, ground, evaluate, review.

```ts
  {
    id: "model",
    name: "Model",
    short: "Decide what a customer is before counting them",
    detail:
      "Dimensional models where the questions are known, wide tables where they are not, and entity resolution across the systems that each hold part of the answer. Slowly changing dimensions are decided per attribute rather than as a blanket policy.",
    hardPart:
      "Tracking history on every attribute is the default that quietly makes a warehouse unqueryable. Deciding which attributes actually need it is unglamorous and is the difference between a model people use and one they route around.",
    services: ["data-platform-engineering"],
    branch: "spine",
  },
  {
    id: "quality",
    name: "Quality",
    short: "Contracts that stop a load, not a dashboard",
    detail:
      "Shape, range, freshness and referential expectations declared beside the data and run on every load. Breaches block the load or page an owner, because a failing test nobody is accountable for is documentation rather than control.",
    hardPart:
      "The tempting fix when a source changes shape is to coerce it back to the old one. That keeps dashboards green while the numbers stop meaning what they meant, and it is usually found months later by someone reconciling by hand.",
    services: ["data-platform-engineering", "evaluation-assurance"],
    branch: "spine",
  },
  {
    id: "semantic",
    name: "Semantic",
    short: "One definition of the metric, with an owner",
    detail:
      "Metric and dimension definitions in one place, versioned, consumed by every tool rather than reimplemented in each. The layer is the contract between the model and the people who ask it questions.",
    hardPart:
      "Every organisation believes it has one definition of revenue until the definitions are written down next to each other. Reconciling them is a political exercise before it is a technical one, and pretending otherwise is how the layer stalls.",
    services: ["data-platform-engineering"],
    branch: "analytics",
  },
  {
    id: "publish",
    name: "Publish",
    short: "Marts and reports people can be held to",
    detail:
      "Consumer-facing datasets with a freshness SLA, a named owner and lineage back to source. A published figure carries the same obligations as a generated answer: you must be able to say where it came from and when it was last true.",
    hardPart:
      "Publishing is where scope grows without anyone deciding to grow it. Each new consumer adds a dataset that must be kept correct forever, so the entry test is whether someone will act on it, not whether someone requested it.",
    services: ["data-platform-engineering"],
    branch: "analytics",
  },
```

- [ ] **Step 4: Typecheck**

```bash
npx tsc --noEmit
```

Expected: FAIL. `pipeline-diagram.tsx` positions nodes by array index on one row and knows nothing about `branch`. Task 6 fixes it.

- [ ] **Step 5: Commit**

```bash
git add src/content/methodology.ts
git commit -m "Add the four shared-spine and analytics stages"
```

---

### Task 6: Fork the diagram

The layout changes from "index maps to x" to an explicit per-node coordinate, because two branches occupy the same horizontal span at different heights.

**Files:**
- Modify: `src/components/blocks/pipeline-diagram.tsx`
- Modify: `src/app/globals.css:399-404`

**Interfaces:**
- Consumes: `pipelineStages` with `branch` from Task 5.
- Produces: unchanged exports, `PipelineDiagram` and `PipelineStages`.

- [ ] **Step 1: Replace the layout constants and add a positioning function**

Replace the `nodeX` / `nodeCentre` helpers with a layout pass that assigns every stage a slot and a row. Branch stages share slot numbers with their opposite branch, which is what makes the relay run both branches in parallel:

```ts
const NODE_W = 96;
const GAP = 16;
const X0 = 48;
const NODE_H = 56;
const ROW_GAP = 84;
const MID_Y = 150;
const STAGGER = 70;

const PERIMETER = 2 * (NODE_W + NODE_H);
const LIT = 50;
/** Hand-off interval. Slots, not nodes: parallel branches share a slot. */
const RELAY_STEP = 420;

type Placed = { stage: PipelineStage; slot: number; row: -1 | 0 | 1 };

/**
 * Slot is horizontal position and relay order; row is which branch line the
 * node sits on. The two branches start at the same slot and advance together,
 * so the relay lights one node on each branch at the same moment rather than
 * running one branch and then the other.
 */
function layout(stages: PipelineStage[]): { placed: Placed[]; slots: number } {
  const spine = stages.filter((s) => s.branch === "spine");
  const analytics = stages.filter((s) => s.branch === "analytics");
  const retrieval = stages.filter((s) => s.branch === "retrieval");
  const join = stages.filter((s) => s.branch === "join");

  const placed: Placed[] = [];
  spine.forEach((stage, i) => placed.push({ stage, slot: i, row: 0 }));

  const forkAt = spine.length;
  analytics.forEach((stage, i) => placed.push({ stage, slot: forkAt + i, row: -1 }));
  retrieval.forEach((stage, i) => placed.push({ stage, slot: forkAt + i, row: 1 }));

  const branchSlots = Math.max(analytics.length, retrieval.length);
  const joinAt = forkAt + branchSlots;
  join.forEach((stage, i) => placed.push({ stage, slot: joinAt + i, row: 0 }));

  return { placed, slots: joinAt + join.length };
}

const slotX = (slot: number) => X0 + slot * (NODE_W + GAP);
const rowY = (row: -1 | 0 | 1) => MID_Y + row * ROW_GAP - NODE_H / 2;
```

- [ ] **Step 2: Import the type and drive the render from `layout`**

Add `PipelineStage` to the existing import:

```ts
import { pipelineStages, type PipelineStage } from "@/content/methodology";
```

Inside the component, replace `const total = pipelineStages.length;` with:

```ts
const { placed, slots } = layout(pipelineStages);
const total = placed.length;
const cycleMs = slots * RELAY_STEP;
```

Render `placed` instead of `pipelineStages`, taking `x` from `slotX(p.slot)` and `y` from `rowY(p.row)`, and set the relay delay from the slot rather than the array index so parallel branches light together:

```tsx
style={{ animationDelay: `${loopDelay + p.slot * RELAY_STEP}ms` }}
```

Keep the stage-build stagger on array order (`index * STAGGER`) so the drawing still reads left to right.

- [ ] **Step 3: Update the viewBox and the connectors**

The diagram is now three rows tall. Set:

```tsx
viewBox={`0 0 ${slotX(slots - 1) + NODE_W + X0} ${MID_Y + ROW_GAP + NODE_H + 40}`}
```

Draw connectors between consecutive slots within each row, plus two fork edges from the last spine node to the first node of each branch, and two join edges from the last node of each branch to the first join node.

- [ ] **Step 4: Reposition the loops**

`loopPath` takes node indices. Change it to take `Placed` entries so it can span rows:

- The retrieval loop runs from the first join stage (`evaluate`) back to `chunk`, below the retrieval row.
- The analytics loop runs from the first join stage back to `model`, above the analytics row. This is the new one required by spec §5, and without it assurance-as-the-join is decorative on the left branch.
- The per-query ACL loop stays between `index` and `retrieve` on the retrieval row.

Update the figcaption at the end of the component, which currently reads "Solid: the forward path. Dashed: the two loops that decide whether it improves." It becomes:

```
Solid: the forward path, shared then forked. Dashed: the three loops that decide whether it improves.
```

Update `<title>` and `<desc>`: the title says "in ten stages" and must not.

- [ ] **Step 5: Move the CSS cycle to match the slot count**

`src/app/globals.css:399-404` currently reads 4.2s with a comment explaining that ten boxes at 420ms fill it exactly. There are now 12 slots:

```css
/* Every box shares one cycle and is offset by 420ms per slot, so twelve slots
   fill the cycle exactly: the last hands back to the first with no gap and no
   overlap. The two branches share slots, so they light together rather than in
   turn. Changing the slot count means changing this duration, together. */
.pipeline[data-shown="true"] .pipeline-border {
  animation: pipeline-border 5.04s linear infinite;
}
```

- [ ] **Step 6: Collapse to one column below `md`**

A two-branch diagram at 390px is illegible. The SVG already sits in `overflow-x-auto` with `min-w-[900px]`, so it scrolls rather than overflowing the page, which satisfies the no-overflow check. Confirm by measurement in Step 7 rather than adding a second mobile-only rendering.

- [ ] **Step 7: Typecheck, build, verify**

```bash
npx tsc --noEmit && npm run build && (npx next start -p 3111 &) && sleep 7 && node scripts/verify.mjs
```

Expected: `tsc` clean, all checks PASS including no horizontal overflow at 390px on `/`, `/how-we-work` and `/services`.

- [ ] **Step 8: Confirm the relay does not drift**

Screenshot the diagram at four points across one cycle and confirm the lit node advances and wraps cleanly:

```bash
node -e "
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto('http://localhost:3111/how-we-work', { waitUntil: 'networkidle' });
  await p.locator('.pipeline').scrollIntoViewIfNeeded();
  await p.waitForTimeout(1500);
  for (const t of [0, 1260, 2520, 3780, 5040]) {
    await p.waitForTimeout(t === 0 ? 0 : 1260);
    await p.locator('.pipeline').screenshot({ path: 'relay-' + t + '.png' });
  }
  await b.close();
})();"
```

Open the five images. The lit border must be on a different node in each, and the fifth must match the first. If it does not, the CSS duration and the slot count disagree.

- [ ] **Step 9: Commit**

```bash
git add src/components/blocks/pipeline-diagram.tsx src/app/globals.css
git commit -m "Fork the pipeline diagram into a shared spine and two branches"
```

---

### Task 7: The three hardcoded diagram headings

These live in page JSX, not in `src/content/`, so no content edit reaches them. Each currently claims ten stages.

**Files:**
- Modify: `src/app/page.tsx:47-48`
- Modify: `src/app/how-we-work/page.tsx:35-36`
- Modify: `src/app/services/page.tsx:59-60`

- [ ] **Step 1: `src/app/page.tsx`**

`title` becomes exactly:

```
One spine, two branches, and the parts that usually break.
```

`body` becomes exactly:

```
Both practices share the first four stages, which is why we sell them together. Every stage can be evaluated in isolation, and that matters when something degrades and you need to know whether a contract broke, retrieval got worse, or the model changed underneath you.
```

- [ ] **Step 2: `src/app/how-we-work/page.tsx`**

`title` becomes exactly:

```
One spine, two branches, two loops.
```

`body` becomes exactly:

```
The shared stages turn sources into modelled, tested data. From there the work forks: one branch to analytics and the semantic layer, one to retrieval and generation. Both rejoin at assurance, because both have to be checkable.
```

- [ ] **Step 3: `src/app/services/page.tsx`**

The `title` "Where each service sits." stays. Replace the `body`, which currently states the pre-renumbering order and contradicts assurance-as-the-join:

```
Platform engineering builds the spine both branches run on. Extraction takes the retrieval branch, strategy decides which branch earns the next quarter, and assurance sits on the join because both branches have to be checkable.
```

- [ ] **Step 4: Verify no route claims ten stages**

```bash
npm run build && (npx next start -p 3111 &) && sleep 7 && node scripts/verify.mjs
```

Expected: every `does not claim "ten stages"` check PASSES. This is the check that catches these three, which `tsc` and `next build` cannot.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/how-we-work/page.tsx src/app/services/page.tsx
git commit -m "Update the three hardcoded diagram headings for the fork"
```

---

### Task 8: Two data engineering case studies

Per spec §6 and the decision recorded there. Written to the anatomy the existing four follow.

**Files:**
- Modify: `src/content/case-studies.ts`
- Create: `public/media/case-studies/warehouse-replatform.webp`, `public/media/case-studies/platform-trust.webp`
- Modify: `media-credits.md`

- [ ] **Step 1: Read the shape before writing**

```bash
sed -n '1,120p' src/content/case-studies.ts
```

Copy the field set exactly: `slug`, `title`, `metaTitle`, `eyebrow`, `engagement`, `sector`, `scale`, `duration`, `summary`, `image`, `context`, `problem`, `whyPreviousApproachesFailed`, `pipeline`, `shipped`, `outcomes`, `quote`, `whatNext`, `services`, `stack`.

- [ ] **Step 2: Source two photographs**

Use the harness from earlier in this project: search a free-licence library, reject any frame with people, legible third-party marks or business signage, and encode to WebP at 2000px wide, quality 72, under 400 KB.

Register both in `media-credits.md` in the existing table format, and record any rejected candidate with its reason in the "Rejected at selection" table. The rejection record is not optional; two earlier images in this project failed exactly this check after passing a glance.

- [ ] **Step 3: Write `warehouse-replatform-without-a-freeze`**

```
slug      warehouse-replatform-without-a-freeze
title     Replatforming a twelve-year-old warehouse without a reporting freeze
metaTitle Warehouse replatform, financial services
sector    Financial services
services  ["data-platform-engineering", "evaluation-assurance"]
```

Leads on migration, dimensional modelling, data contracts and parallel running. `whyPreviousApproachesFailed` covers the two prior attempts that assumed a freeze the business would not grant. `outcomes` figures each carry method and baseline, matching the existing four.

- [ ] **Step 4: Write `platform-trustworthy-enough-to-publish-from`**

```
slug      platform-trustworthy-enough-to-publish-from
title     Making a data platform trustworthy enough to publish from
metaTitle Data quality and lineage, central government
sector    Central government
services  ["data-platform-engineering", "evaluation-assurance"]
```

Leads on quality, lineage, freshness SLAs and observability. The problem is a statistics publication that had to be corrected after release.

- [ ] **Step 5: Typecheck, build, verify**

```bash
npx tsc --noEmit && npm run build && (npx next start -p 3111 &) && sleep 7 && node scripts/verify.mjs
```

Expected: clean. Six studies on `/case-studies`.

- [ ] **Step 6: Update the homepage case-studies body for the new count**

`src/app/page.tsx` currently reads "Four engagements written the way the work actually runs". Change "Four" to "Six".

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add two data engineering case studies"
```

---

### Task 9: Depth surfaces and final sweep

**Files:**
- Modify: `src/content/industries.ts`, `src/content/insights.ts`, `src/content/about.ts`, `src/content/stack.ts`, `src/content/methodology.ts`
- Modify: `src/app/page.tsx` (industries section body)

- [ ] **Step 1: Industries**

Each of the three sectors gains a structured-data problem alongside its document problem. Do not add a fourth sector.

The homepage industries body currently reads "Three sectors where the unstructured mass is large, the permission model is real…". Replace with:

```
Three sectors where both estates are large, the permission model is real, and the cost of a wrong answer is high enough that evaluation is not optional.
```

- [ ] **Step 2: Two new insights**

Add to `src/content/insights.ts`, matching the existing four in form: one contestable claim per piece, argued rather than asserted. Suggested subjects, each of which the plan's own service copy already takes a position on:

- Why slowly changing dimensions should be decided per attribute rather than as a policy.
- Why a data contract that only fails in a dashboard is not a contract.

Each needs an image registered in `media-credits.md`.

- [ ] **Step 3: About, stack, methodology**

- `about.ts`: widen "What we are, plainly" to two practices.
- `stack.ts`: it is a flat `stackItems` list with no grouping, so there is nothing to reorder. Change only the file's framing comment and any item caption that describes a tool by its retrieval role.
- `methodology.ts`: `engagementShape` and `firstNinetyDays` both assume a corpus. Make them practice-neutral.

- [ ] **Step 4: Re-measure the term ratio**

Report it, do not target it. Use the method stated in spec §1: string literals only in `src/content/*.ts`, case-insensitive, prefix-stemmed, `model*` excluded and counted separately.

```bash
node -e "
const fs = require('fs'), path = require('path');
const DIR = 'src/content';
const F = {
  genai: /\\b(GenAI|LLM|RAG|retrieval-augmented|prompt\\w*|embedding\\w*|vector|hallucinat\\w*|abstention|chunk\\w*|rerank\\w*|grounding)\\b/gi,
  retrieval: /\\b(retrieval|corpus|corpora|unstructured|document\\w*|citation\\w*)\\b/gi,
  dataeng: /\\b(pipeline\\w*|warehouse|lakehouse|ingest\\w*|ETL|ELT|orchestrat\\w*|dbt|Airflow|Spark|schema\\w*|batch|streaming|lineage|CDC|modell\\w*|dimensional)\\b/gi,
  platform: /\\b(Databricks|Snowflake|BigQuery|Synapse|Fabric|PostgreSQL|Postgres|pgvector|Kafka|Terraform|Kubernetes|Azure|AWS|GCP)\\b/gi,
};
const t = { genai: 0, retrieval: 0, dataeng: 0, platform: 0 };
for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.ts'))) {
  const s = (fs.readFileSync(path.join(DIR, f), 'utf8').match(/\"(?:[^\"\\\\\\\\]|\\\\\\\\.)*\"/g) || []).join(' ');
  for (const k in F) t[k] += (s.match(F[k]) || []).length;
}
console.log(t);
console.log('AI', t.genai + t.retrieval, 'DE', t.dataeng + t.platform,
  'ratio', ((t.genai + t.retrieval) / (t.dataeng + t.platform)).toFixed(2));
"
```

Baseline before this work was AI 340, DE 151, 2.25 : 1. Record the new figure in the commit message.

- [ ] **Step 5: Full verification**

```bash
npx tsc --noEmit && npm run build && (npx next start -p 3111 &) && sleep 7 && node scripts/verify.mjs
```

Expected: ALL PASSED.

- [ ] **Step 6: Check for dashes across all changed copy**

```bash
grep -rnE "[—–]" src/content/ src/app/
```

Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Reframe the depth surfaces for two practices"
```

---

## Self-Review

**Spec coverage:**

| Spec section | Task |
|---|---|
| §3 positioning spine | 2 |
| §4 services, renumbering, slugs, image paths, redirects | 3, 4 |
| §5 forked diagram, CSS cycle, loops, three route headings | 5, 6, 7 |
| §6 two case studies and their images | 8 |
| §7 depth surfaces | 9 |
| §8 voice rules | Global Constraints, enforced in Tasks 2 and 9 |
| §9 out of scope | Respected; `globals.css` and the two service images are the named exceptions |
| §10 no `CONTENT_STATUS` change | Global Constraints |
| §11 verification | Task 1, run at the end of Tasks 4, 6, 7, 8, 9 |

**Type consistency:** `PipelineStage.branch` is introduced in Task 5 and consumed in Task 6 under that exact name. `layout()` returns `{ placed, slots }` and both are used in Task 6 Steps 2 and 3. Slugs produced in Task 3 are the strings used in Tasks 4, 5, 8.

**Known deviation from the skill's default:** the skill assumes a test framework and a red-green cycle. This repository has none, and adding one is outside the spec. The equivalent cycle here is a failing `scripts/verify.mjs` check, then the change, then a passing one. Tasks 1, 3 and 5 deliberately end on a failing state that the next task resolves, which is the closest honest analogue.
