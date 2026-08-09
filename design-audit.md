# Design audit — aiimi.com, read for Bromely Code

**Audited** 9 August 2026 · **Method** headless Chromium (Playwright), real page runtime, `getComputedStyle` on live elements plus stylesheet introspection — not static HTML, not inference from screenshots.
**Coverage** 18 pages × 4 viewports (1440 / 1024 / 768 / 390) = 72 full-page captures, plus 5 nav-state captures, 6 case-study captures, 33 viewport slices, 9 hero-video frame captures. Raw measurements in `reference/data/*.json`; captures in `reference/screenshots/`.

`robots.txt` returns 404 — no crawl directives to honour. Requests were paced one page at a time from a single browser.

---

## 0. What the reference actually is

A Next.js (App Router) marketing site, Storyblok-backed, Tailwind-styled, Vercel-hosted. Motion via framer-motion + `react-fast-marquee`. Consent via Cookiebot, analytics via GTM/GA4, video embeds via Wistia, chat via HubSpot.

That matters for the rebuild in one specific way: **almost every token in this site is a Tailwind default or a small custom extension of one.** There are only two CSS custom properties in the entire document (`--background: #ffffff`, `--foreground: #171717` — the Next.js starter defaults, largely unused). The real design system lives in `tailwind.config`, exposed to us through class names such as `text-h1`, `bg-aiimi-pink`, `tracking-tighter`. We recover it by evaluating those classes on live probe elements, which is what section 1 does.

---

## 1. Design tokens

### 1.1 Typeface

| | Measured |
|---|---|
| Family (everything) | `GeistSans`, fallback `GeistSans Fallback` → `local("Arial")` |
| File | one variable woff2, weight range `100 900`, **55 KB**, self-hosted at `/_next/static/media/e11418ac562b8ac1-s.p.woff2` |
| Weights actually used | 400, 500, 600, 700 |
| Second face | `slick` (24 KB icon font from slick-carousel) — carousel arrows only |

**Single-family system.** No serif, no mono, no display cut. Hierarchy is carried entirely by size, weight and letter-spacing.

### 1.2 Type scale — measured, not inferred

Probe elements were injected into the live page carrying each Tailwind class, then measured. The scale is **fixed, not fluid** — no `clamp()`. Responsiveness comes from swapping classes at breakpoints (`text-h3 md:text-h2 lg:text-h1`).

| Class | font-size / line-height (raw) | Notes |
|---|---|---|
| `text-h1` | 60px / 90px | always overridden by `leading-none` → 60px |
| `text-h2` | 40px / 60px | overridden → `leading-none` (40) or `leading-tight` (50) |
| `text-h3` | 30px / 45px | → 30px or 37.5px |
| `text-h4` | 22px / 33px | → 27.5px in use |
| `text-h5` | 18px / 27px | → 22.5px in use |
| `text-lg` | 18px / 28px | |
| `text-base` | 16px / 24px | |
| `text-sm` | 14px / 20px | |
| `text-xs` | 12px / 16px | |
| `text-2xl` | 24px / 32px | |
| `text-xl` | **16px / 24px** | custom override — *not* Tailwind's 20px. A trap if you assume defaults. |

**As rendered, per breakpoint** (real elements, `/services`):

| Role | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|
| h1 | 30 / lh 30 / ls −1.5px | 40 / 40 / −2 | 60 / 60 / −3 | 60 / 60 / −3 |
| h2 | 30 / 37.5 / −1.5 | 30 / 37.5 / −1.5 | 40 / 40 / −2 | 40 / 40 / −2 |
| Hero lead ¶ | 18 / 22.5 / −0.45 | 18 / 22.5 | 22 / 27.5 / −0.55 | 22 / 27.5 / −0.55 |
| Body ¶ / list | 16 / 24 / normal | " | " | " |
| Card body | 15 / 22.5 | " | " | " |
| Nav + header link | 14 / 19.25 / −0.35 / w600 | " | " | " |
| Footer link | 18 / 18 / −0.45 / w600 | " | " | " |
| Stats numeral | — | — | 160 / 160 / −8 / w600 | same |

**Letter-spacing is a two-tier rule, and it is the single most characterful decision in the type system:**
- Display sizes (≥30px): `tracking-tighter` = **−0.05em** (60→−3px, 40→−2px, 30→−1.5px, 160→−8px).
- Mid sizes (18–22px): `tracking-tight` = **−0.025em** (22→−0.55px, 18→−0.45px).
- Body (15–16px): `normal`.

Weight ladder: display 600, sub-heads 600, lead paragraphs 500, body 400, nav/labels 600–700.

Sentence-case with a **full stop on almost every heading** ("Trusted by the trusted.", "Projects.", "Talk to us."). It is a voice device, not a typographic one, and it is doing a lot of work — it makes short headings read as statements rather than labels.

### 1.3 Colour — measured census over ~3,000 elements

| Role | Value | Where |
|---|---|---|
| Ink / primary text | `#141414` (`rgb(20,20,20)`) | 187 text nodes — the real body colour |
| Absolute black | `#000000` | 46 text nodes, 42 surfaces — hero, logo band, CTA band, footer |
| Paper | `#FFFFFF` | 27 surfaces, 57 text nodes (on dark) |
| Next.js starter foreground | `#171717` | 12 nodes — leakage from the default template, not a design decision |
| Accent | `#E7295D` (`rgb(231,41,93)`) | 10 surfaces — announcement bar, glow, play button, footer top border |
| Accent, second value | `#E51E59` (`rgb(229,30,89)`) | 3 nodes/surfaces — **the same brand pink specified twice at slightly different values** |
| Hairline / muted surface | `rgba(0,0,0,0.05)` | 32 elements |
| Divider grey | `#D6D6D6` | 21 elements — 1px rules above stats and capability triplets |
| Tailwind default border | `#E5E7EB` | present in computed `border-color` but almost always zero-width — noise, not a token |

There is **no muted-text token.** Secondary copy is the same `#141414` at a smaller size. There is no mid-grey in the text palette at all. The palette is: black, white, one pink, two greys for rules. That discipline is worth copying; the specific hues are not.

Two pink values for one brand colour is a defect — it is what happens when a colour lives in class names rather than in a variable.

### 1.4 Spacing

Tailwind's 4px base, used in a narrow band. Section padding, read off the homepage's own section wrappers:

| Pair | Mobile | ≥1024 | Used for |
|---|---|---|---|
| `pt-4 lg:pt-12` | 16 | 48 | tight continuation blocks |
| `pt-8 lg:pt-16` | 32 | 64 | standard section |
| `pt-12 lg:pt-24` | 48 | 96 | major section |
| `pt-16 lg:pt-32` | 64 | 128 | terminal CTA band |
| `pt-48 lg:pt-80` / `pb-36 lg:pb-72` | 192 / 144 | 320 / 288 | hero only |

**The rule is a clean 1:2 — every desktop value is exactly twice its mobile value.** Four steps, hero excepted. Horizontal gutters: `px-6` (24px) below 1024, `px-8` (32px) at and above.

### 1.5 Radii

| Value | Count | Where |
|---|---|---|
| `9999px` | 9 | CTA pill, announcement bar ends |
| `60px` | 21 | large image/panel corners |
| `32px` | 9 | medium panels |
| `15px` | 31 | most-used panel radius |
| `7.5px` / `3.75px` | 17 / 4 | nested children, scaled halves of 15 |
| `5px` | 1 | hamburger button box |
| **`0`** | — | **all cards, all buttons except the pill, all form fields** |

The system is bimodal: **structural content is square, decorative surfaces are heavily rounded.** Cards have hard 1px black borders and sharp corners; images and media panels get 15–60px radii. That contrast is the visual signature.

### 1.6 Shadows

Three in the entire site, none of them a conventional elevation ramp:

1. `rgba(0,0,0,0.3) 0 30px 70px` — one lifted media panel.
2. `rgba(231,41,93,0.15) 0 0 18px 4px, rgba(231,41,93,0.08) 0 0 40px 8px` — the CTA pill's outer glow.
3. `rgba(226,41,93,0.3) 0 0 12px 2px, rgba(226,41,93,0.1) 0 0 12px 2px inset` — the CTA pill's inner glow.

There is **no elevation system.** Separation is done with 1px borders and surface colour inversion. Copy that decision — a technical audience reads drop shadows as decoration.

### 1.7 Breakpoints

Tailwind defaults, used sparsely: `md` 768 and `lg` 1024 do nearly all the work. `sm` 640, `xl` 1280 and `2xl` 1536 barely appear. **The layout has effectively two states: below 1024 and above 1024**, with a small 768 step for the h1 only.

---

## 2. Layout system

### 2.1 The container is a percentage, not a fixed max-width

This is the most transferable structural decision on the site and the easiest to get wrong by eyeballing:

```
px-6 lg:px-8  w-full  container  lg:w-10/12  mx-auto  relative   /* max-width: 1536px */
```

- **≥1024:** width = **83.33% of viewport**, capped at 1536px, minus 32px padding each side.
- **<1024:** width = 100% of viewport minus 24px each side.

Measured content widths: **342px @390 · 720px @768 · 789px @1024 · 1136px @1440 · 1296px @1632.**

The consequence: the site keeps breathing outward on large monitors instead of stranding a 1280px column in the middle of a 1920px screen, but the 1536px cap stops line lengths running away. Section backgrounds (`bg-black`, `bg-white`) are always full-bleed on the wrapper *outside* the container, so colour bands span edge to edge while content stays aligned.

### 2.2 Grid

12-column proportional widths applied as Tailwind fractions on flex children, not CSS Grid:

- Text column beside media: `w-full lg:w-7/12` (756px of 1296 at 1632).
- Hero copy: three fixed variants — **473px** (narrow, video/image to the right), **852px** (medium, case-study and platform heroes), **1136px** (full container, services/contact/legal).
- Card grids: 3-up at ≥1024, ~348px cards with ~30px gaps; 2-up at 768; 1-up at 390.
- Stats: 3-up → stacked below 1024.

### 2.3 Vertical rhythm and surface alternation

Homepage section stack, measured (`pt`/`pb` at 1440, height, surface):

| # | Section | pt / pb | Height | Surface |
|---|---|---|---|---|
| 1 | Hero (video) | 320 / 288 | 1014 | black |
| 2 | Insight-report promo | 64 / 0 | 540 | white |
| 3 | Three-pillar intro | 64 / 0 | 240 | white |
| 4 | Card carousel | 0 / 48 | 272 | white |
| 5 | Video embed | 48 / 48 | 741 | white |
| 6 | Capability card grid | 64 / 64 | 1306 | white |
| 7 | Stats + positioning | 64 / 64 | 590 | white |
| 8 | Split-feature carousel | 0 / 96 | 458 | white |
| 9–11 | Logo marquee + "Trusted by the trusted." | 96/48, 48/48, 48/96 | 689 | **black** |
| 12 | "Aiimi by industry." | 96 / 96 | 506 | white |
| 13 | "Talk to us." + form | 128 / 128 | 1029 | **black** |
| — | Footer | 64 / 64 | — | black, 1px pink top border |

Rhythm: **black bookends, one black band at the two-thirds mark, everything else white.** The dark bands carry the two trust moments (proof and conversion). Total homepage height 7,383px at 1440 — a long page, and the density is low: eight distinct propositions across 7,383px.

Marketing pages run at that density. Content pages (privacy policy, case-study body) compress hard — continuous prose in a single ~790px column, headings at 30–40px, no cards, no colour bands until the footer. The shift is abrupt and deliberate: the reading pages look like documents, the selling pages look like a deck.

---

## 3. Component inventory

Full inventory with anatomy, measurements, states, responsive behaviour, motion and adopt/adapt/replace decisions is in **`components.json`** (36 entries — 30 observed on the reference, 6 new components with no reference analogue). Summary of the census:

- **Global chrome:** announcement bar, primary nav, full-screen overlay menu, footer, cookie banner, chat widget.
- **Heroes:** video hero (home only), dark interior hero, light interior hero — three variants, consistently applied.
- **Content blocks:** capability triplet, bordered capability card, card carousel, Wistia video embed, count-up stats band, split feature, logo marquee, industries grid, case-study card, featured case study, article card, team grid, FAQ accordion, accreditation band, CTA band, contact form, pull quote, rich-text article body, related-content row.
- **Atoms:** underline text link, square fill button, glowing pill button, social share row, category eyebrow, 1px rule.

Twenty-two components are adopted largely as measured. Five are marked **replace** — client logo wall (→ technology-stack band), card carousel (→ CSS scroll-snap), Wistia embed (→ self-hosted video), Cookiebot (→ first-party consent), and the nav's contents (§8.1). One is **omitted** (chat widget). Six are **new**, with no reference analogue: technology-stack band, pipeline diagram, architecture block, illustrative-content banner, and the placeholder-populated accreditation band and team grid. A rejected-patterns list sits at the end of `components.json`.

---

## 4. Motion language

### 4.1 The three tiers, and the rule that governs them

Measured across the live homepage: 13 distinct transition signatures, 4 keyframe animations, framer-motion mounted (`window.MotionIsMounted`).

**Load-driven** — essentially none. There is no orchestrated page-load sequence. Content above the fold appears immediately; the video starts when it buffers. This is a deliberate omission and it makes the site feel fast rather than staged.

**Scroll-driven** — one effect, applied uniformly. Elements below the fold sit at `opacity: 0; transform: translateY(20px)` and animate to `opacity: 1; translateY(0)` when they enter view. Measured directly: off-screen blocks report `matrix(1, 0, 0, 1, 0, 20)` and zero opacity; on-screen equivalents report `none` / `1`. Duration ~500ms ease (matching the `opacity 0.5s ease` signature found on 5 elements). Fires once. **20px is a very short travel** — the effect registers as "settling" rather than "flying in", which is the right call for this audience.

**Hover-driven** — 150ms, Tailwind's default `cubic-bezier(0.4, 0, 0.2, 1)`, on `color, background-color, border-color, fill, stroke` (25 elements) and `transform` (16 elements). Two bespoke hovers: the underline link wipes its rule left-to-right; the square button fills black → pink.

**Continuous** — three infinite loops, all decorative:
| Name | Spec | Where |
|---|---|---|
| `scroll` | `translateX(0 → −100%)`, **33.7s / 37.5s / 48.8s / 53.7s** linear infinite | logo marquees, duplicated track for a seamless loop |
| `spin-border` | `rotate(1turn)` 4s linear infinite | conic-gradient border on the "Book a demo" pill |
| `glow-pulse` | `opacity 0.4 ↔ 1` 6s ease-in-out infinite | pink glow behind the same pill |

**Nav** is the only element with a 300ms transition (`background-color`, `color`, `border-color`) — deliberately slower than the 150ms interaction tier, so the black→white flip reads as a state change rather than a hover.

**The governing rule, stated:** *load does nothing, scroll does one thing everywhere, hover does one thing per element type at 150ms, and only decoration loops.* That single-effect discipline is why the site does not feel unresolved despite having motion in three tiers. It is worth copying verbatim.

### 4.2 Count-up, measured frame by frame

The stats numerals were sampled every ~80ms after scrolling into view:

```
0–244ms   0, 0, 0                 (idle — observer fires, animation delayed)
326ms     106, 35, 47             (start)
1140ms    1186, 139, 186
1466ms    1568, 143, 191
1791ms    1643, 144, 193
2115ms    1650, 145, 194          (settled)
final     1361+, 141+, 189+       (values differ per visit — live data)
```

≈250–320ms delay after intersection, then **~1,800ms of strongly ease-out counting** (68% of the distance covered in the first third of the duration). Fires once. In static HTML the numerals are `0` — this component is invisible to any audit that does not run the page, which is the concrete reason this audit was done in a browser.

### 4.3 Reduced motion

**There are zero `prefers-reduced-motion` rules in any stylesheet on the site.** The marquees, the pulsing glow, the spinning border and the count-up all run regardless of the user's OS setting. This is a WCAG 2.3.3 / 2.2.2 problem and a deviation point for us, not a pattern to copy.

---

## 5. Hero treatment — the video, in detail

| Property | Measured |
|---|---|
| Element | `<video class="w-full h-auto h-full object-cover aspect-16/9" muted playsinline preload="metadata" loop>` |
| **`autoplay` attribute** | **absent** — playback is started by JS (`paused: false`, `readyState: 4` at runtime) |
| **`poster`** | **empty string — there is no poster frame** |
| Source | single `<source type="video/mp4">`, no WebM/AV1, no `media` attribute |
| File | `…homepage_background-animation_new-tags_industries_desktop_heavy_compressed.mp4`, Storyblok CDN |
| **Weight** | **3,095 KB** (3.02 MB) |
| Intrinsic size | 1920 × 1080 |
| Duration | **16.7s** |
| Rendered box | 1440 × 1014 at 1440 viewport (hero section 1014px ≈ 113vh of a 900px viewport) |
| **Scrim / overlay** | **none.** The video's only siblings are the content container (`z-30`) and an empty positioned div. No gradient, no `rgba` layer, no `mix-blend-mode`. |
| Mobile | **the same 3 MB desktop file is served at 390px**, rendered 390 × 582. No `<picture>`, no source swap, no still fallback. |
| Reduced motion | not handled |

The file name says `desktop_heavy_compressed`, which implies a lighter variant exists somewhere. It is not wired up.

### Contrast, measured across the loop

Because there is no scrim, legibility depends entirely on the footage being graded dark where the type sits. I tested that assumption rather than trusting it: the headline's bounding box (plus 230px, to include the lead paragraph and CTA) was screenshotted at nine points across the 16.7s loop and every background pixel converted to relative luminance and scored against white text.

| t | mean contrast | median | 95th-worst | % pixels < 4.5:1 |
|---|---|---|---|---|
| 0s | 14.75 | 19.47 | 16.44 | 2.9 |
| 4s | 15.49 | 20.38 | 18.42 | 2.8 |
| 8s | 15.77 | 20.87 | 19.03 | 2.8 |
| **12s** | **13.21** | **17.06** | **12.79** | **2.9** |
| 16s | 15.77 | 20.87 | 19.17 | 2.8 |

*(The ~2.9% failing figure is an upper bound — it is dominated by the anti-aliased edges of the white glyphs themselves, which my sampler cannot fully exclude. The background figures are the meaningful ones.)*

**Verdict:** it passes comfortably (13:1 at the worst frame against a 4.5:1 requirement) — but it passes *by luck of footage selection, not by construction*. There is no mechanism preventing a future clip swap from breaking it, and nothing protecting the mobile rendering where the same frame is cropped much tighter. Full-frame captures at each sampled second are in `reference/screenshots/hero-contrast-t*.png`.

### What it degrades to

Nothing. No poster on a slow connection (blank black box until the first frame decodes), full 3 MB payload on a phone, full motion for a user who asked for less. All four of those are ours to fix.

---

## 6. Typography licensing

| Face | Foundry | Licence | Status |
|---|---|---|---|
| **Geist Sans** (variable) | Vercel | **SIL Open Font License 1.1** | Free for commercial use, redistributable, self-hostable |
| slick icon font | slick-carousel | MIT | Free; carousel arrows only |

**No licensing breach is possible here** — the reference's entire type system is openly licensed. There is nothing we would be forced to swap.

We are swapping anyway, for positioning rather than legal reasons: Geist is Vercel's house face and reads as "shipped from a Next.js template" to exactly the technically literate buyer we are addressing. Adopting it would make the two sites look related.

**Proposed for Bromely Code** (all free for commercial use, all self-hosted, no CDN dependency):

| Role | Face | Source / licence | Reason |
|---|---|---|---|
| Display (h1–h3, stats) | **Satoshi** (variable) | Fontshare — ITF Free Font Licence | Closed apertures, near-vertical terminals, tightens well at −0.04em. Comparable metrics to Geist at display sizes (similar x-height ratio), so the reference's spacing rhythm transfers without re-tuning. |
| Body / UI (h4–h6, paragraphs, nav, forms) | **IBM Plex Sans** (variable) | Google Fonts / IBM — OFL 1.1 | Engineered rather than neutral; holds up at 15–16px, which is where this site does most of its reading. Its slightly narrower set width buys ~4% more characters per line than Geist at the same size. |
| Mono (eyebrows, metric suffixes, pipeline stage numbers, diagram labels, code) | **IBM Plex Mono** | Google Fonts / IBM — OFL 1.1 | Metrically harmonised with Plex Sans by design, so the pairing needs no optical correction. |

The pairing has a job, not just a look: **the mono marks anything measured or machine-produced** — evaluation scores, latency figures, stage identifiers, retrieval parameters. For a firm selling evaluation and pipelines, that is a semantic distinction worth having in the type system. Two families would have been the lazier answer; the third earns its place by carrying meaning, and Plex Sans/Mono ship as one designed superfamily so it costs no extra tuning.

Budget: three variable woff2 subsets, `font-display: swap`, target ≤120 KB total (reference: 55 KB for one face).

---

## 7. Case-study anatomy

Read in full: Niftylift (manufacturing), Anglian Water (utilities), Insolvency Service (central government), unnamed professional-services firm. Consistent template across all four.

### Section order

1. **Dark hero** — client logo as a white SVG (~238×65), h1 at 60px/−3px up to 852px wide, social share row (Facebook / X / LinkedIn). Two of four carry a one-sentence summary here; two put it below.
2. **Full-bleed hero photograph** — 1440 × 677 (≈2.13:1), real photography of the client's operating environment (a cherry picker against cloud, not a stock server rack).
3. **Standfirst** — one paragraph: who the client is, what they wanted, who they partnered with. 60–80 words.
4. **"The Challenge"** (or "The Problem") — 30px or 40px semibold run-in heading. **Two paragraphs written in the client's operational terms, not the vendor's** — "operators had to leave their stations, log into a central database, and navigate multiple screens". No technology is named in this section at all.
5. **"The Solution"** — the longest section, 3–5 paragraphs. Names the mechanism: what was integrated, how data is retrieved and presented, the feedback loop that improves the corpus, the training and adoption programme, and the audit/explainability properties. Technology names appear here and nowhere else.
6. **"The Results"** — an intro paragraph, then 3–4 **bolded run-in labels with metrics inside the prose**: "Faster time to answers: … less than a minute – at least an 80% reduction", "from 15% in February 2025 to 28% in February 2026". Then a transferability paragraph explaining what generalises.
7. **"What's next"** — one short paragraph.
8. **Inline CTA** — a single underlined text link to the related service.
9. **Pull quote** — long (60–100 words), attributed to a **named individual, role, and company**.
10. **"Discover more."** — four related article cards.

### Proportions and placement

Body length 4,254–9,149 characters. Ratio, by character count: **context ≈15% · solution ≈45% · results ≈30% · quote ≈10%.**

Two placement facts worth copying exactly:

- **Metrics live inside the Results prose, not in a stats band.** There is no big-numeral component on any case-study page. A number arrives attached to the sentence that explains what it measures. That is far more credible than three 160px numerals, and it is the opposite of what the homepage does.
- **The quote comes after the argument, not before it.** It confirms a case already made rather than substituting for one.

And one that validates our own constraint: the professional-services study — *"AI-driven data management saves £1m in storage costs for leading professional services firm"* — **names no client at all**, referring only to sector and scale. The reference itself ships unnamed case studies. Bromely Code's illustrative studies will therefore sit inside an established convention rather than looking like an evasion.

---

## 8. Deltas — where the reference works against Bromely Code

### 8.1 The three named in the brief

**D1 · Platform-led IA → services-and-method-led IA.**
Confirmed by capture, and it is worse than described. The desktop header contains **no navigation links at all** — a wordmark, a "Book a demo" pill, and a hamburger, at every breakpoint including 1632px. All navigation lives in a full-screen overlay whose order is **Platform → Services → Industries → Resources**. The first entry, the header's only CTA ("Book a demo" → `/platform#demo`), and the top of the overlay all point at a product.

Bromely Code has no product. Copying this yields a site whose primary CTA is undeliverable and whose first nav item 404s in spirit.
*Decision:* keep the fixed nav's scroll behaviour and the overlay's typographic drama; keep the single-CTA discipline. Replace the contents: **Services → How we work → Industries → Case studies → Insights → About**, primary CTA "Start a conversation" → `/contact`. Add persistent desktop nav links — hiding navigation behind a hamburger on a 1440px screen costs a consultancy discovery it cannot afford, and the reference can only afford it because visitors already know the brand.

**D2 · Client-logo wall → technology-stack band.**
Measured: two `react-fast-marquee` tracks on a full-bleed black band, 45px white logo SVGs, 33.7s and 37.5s linear loops in opposite directions, **no greyscale filter** (white artwork is supplied directly), with "Trusted by the trusted." and a "View all Case Studies" link between the rows. Twenty-plus recognisable enterprise and government marks.

A new consultancy cannot fill this slot honestly, and filling it dishonestly is both a trademark problem and an instant credibility failure with a buyer who will recognise the names.
*Decision:* keep the band's geometry, black surface, 45px lockup height, marquee timing and full-bleed treatment. Change the payload to **platforms Bromely Code builds on** — Databricks, Azure, Snowflake, Postgres/pgvector, orchestration and evaluation tooling — using each vendor's official brand assets under their published brand guidelines. True on day one, and to a Head of Data a stack disclosure carries comparable signal to a client list.

**D3 · Accreditation apparatus.**
Measured in the footer: four badges at ~50px height — Cyber Essentials, Cyber Essentials Plus, CO₂-neutral organisation, ISO 27001 (UKAS/British Assessment Bureau) — plus, on `/services`, a full "Accreditations and frameworks" section. This is doing real conversion work for an enterprise data buyer; procurement looks for it.
*Decision:* build the component now, populate with explicitly-marked placeholders (`status: 'pending'`, rendered as a labelled outline rather than a fake badge), so the slot exists the day certifications land. Same for the footer's UK-convention block, which the reference gets right: registered office, "Registered in England & Wales: 05648705", separate Privacy / Cookie / Modern Slavery / Carbon links.

### 8.2 Further deltas found during the audit

**D4 · Accessibility defects that must not be inherited.** Measured on the live site:
- `outline: none` on every focusable element tested — header links, hamburger button, CTA links; form inputs carry an explicit `focus:outline-none`. **The site has no visible keyboard focus indicator** (WCAG 2.4.7, AA).
- **Two `<main>` elements** in one document.
- **No skip link.**
- **Zero `prefers-reduced-motion` rules** (§4.3).
- Alt text is present on all 48 images but is visibly machine-generated, including *"A blank white square with no visible content or details."* on a certification badge — describing pixels rather than meaning.
*Decision:* fix all five. Visible focus rings on the accent colour with a 2px offset, one `<main>`, a skip link, reduced-motion honoured at the token level (transitions collapse to 0.01ms, marquees and count-ups hold their end state), and alt text written for meaning.

**D5 · Hero video engineering.** No poster, no `autoplay` attribute, no WebM/AV1, no mobile source, no scrim, 3 MB on a phone (§5).
*Decision:* poster exported from the clip itself and painted first; video swapped in on `canplaythrough`; ≤3 MB H.264 plus a WebM alternate; a still image below 768px via `<picture>`/media-conditioned `<source>`; reduced-motion holds the poster; and a **directional gradient anchored behind the text block** rather than a full-frame wash — measured across every second of the loop, not just the opening frame, using the same tool that produced §5's table.

**D6 · Two values for one brand colour** (`#E7295D` / `#E51E59`), and only two CSS custom properties site-wide — both unused starter defaults. The design system exists only as Tailwind class names.
*Decision:* every token as a CSS custom property, surfaced through the Tailwind theme. One value per role. A rebrand becomes a token edit.

**D7 · Stats band populated with live counts.** "1361+ Projects, 141+ Customers, 189+ Experts" — earned numbers a new firm does not have.
*Decision:* keep the component and its count-up; populate with `[NEEDS FIGURE]`. A firm quoting invented project counts is precisely what this audience screens for, and an empty slot reads as honest where a fabricated one reads as terminal.

**D8 · No mechanism content anywhere.** The reference sells outcomes and platform capability; it never shows how anything works. It can afford that because the logos do the arguing. Bromely Code cannot.
*Decision:* add two components with no analogue in the reference — a **pipeline/methodology diagram** (SVG, drawn as code) and a **reference-architecture block** — and make `/how-we-work` a first-class nav item. This is the compensating trust apparatus for D2.

**D9 · Prose density on marketing pages.** Eight propositions across 7,383px, most sections carrying 30–60 words. Fine for a known brand; too thin for a firm that has to prove competence in the first scroll.
*Decision:* keep the section rhythm and padding ladder exactly; raise words-per-section on services and methodology pages by roughly half. The layout has the room — the reference simply does not use it.

**D10 · Announcement bar.** A campaign bar adds 96px above the fold and a competing CTA.
*Decision:* build it, ship it disabled behind a single content flag. The slot is real; a new site with nothing to announce should not show an empty one.

---

## 9. What transfers unchanged

Stated explicitly so the build does not accidentally redesign things that already work:

1. Percentage container (83.33% capped at 1536px) with full-bleed section backgrounds.
2. The 1:2 mobile-to-desktop section padding ladder, four steps.
3. Surface alternation — dark bookends, one dark band at two-thirds, white between.
4. Fixed nav that changes surface colour, not opacity, over 300ms.
5. Three hero variants, applied consistently, so interior pages never compete with the homepage.
6. Bimodal radii — square content, rounded media.
7. Borders and surface inversion instead of an elevation ramp.
8. The two-tier letter-spacing rule (−0.05em display, −0.025em mid).
9. Full stops on headings.
10. The 20px / 500ms scroll reveal, one effect used everywhere, fired once.
11. Case-study anatomy and its 15/45/30/10 proportions, metrics inside prose, quote after the argument.
12. The footer's UK company-details convention.

---

## 10. Proposed token set for Bromely Code

Not the reference's palette — comparable contrast discipline, different hue story. Full values land in `globals.css` as custom properties in phase 2; recorded here so the audit can be corrected before it propagates.

**Colour.** One dominant near-black with a blue cast (`#080C12` base, `#111823` raised), a light paper (`#F6F7F8` / `#FFFFFF`), a real muted-text token (the reference's one clear omission), hairline borders at 8% ink, and **a single accent: signal amber `#F5A524`**, hover `#FFB84D`, with a darkened `#8A5200` for accent text on light surfaces where the amber cannot reach 4.5:1. Amber against deep ink reads as instrumentation — the colour of a threshold being watched — which is the right register for a firm selling evaluation and assurance, and it is nowhere near the reference's magenta.

**Depth.** No flat white sections: layered radial gradients on the dark bands, a fine grain overlay, and a faint engineered grid drawn from the domain (document → chunk → embedding → retrieval), used at low opacity behind the hero and the methodology diagram.

**Type.** Satoshi display / IBM Plex Sans body / IBM Plex Mono for measured values (§6). Scale mirrors the reference's ratios but goes fluid — `clamp()` between the 390 and 1440 measurements rather than class-swapping — because it removes the 768–1024 dead zone where the reference's h1 sits at 40px across a 256px range.

**Motion.** The reference's governing rule adopted verbatim (§4.1), with reduced-motion honoured at the token level.

---

## 11. Homepage headline — three candidates

Against the positioning line, avoiding the reference's construction (gerund + abstract noun + place: *"Powering AI everywhere at work."*).

- **A — "The pipeline between your documents and the decision."** *(implement)*
  A noun phrase, not a promise. Names the mechanism and the endpoint in one line, claims nothing that needs a number to support it, and reads unhurried. It is also structurally unlike the reference — no verb, no adverb of place.
- **B — "Your unstructured data already holds the evidence."**
  Strong, buyer-side framing. Held back because it is a claim about the reader's estate that the reader may not accept in the first two seconds.
- **C — "Retrieval that survives an audit."**
  The sharpest of the three and the most disqualification-resistant. Held back as too narrow — it speaks to regulated buyers and leaves manufacturing and professional services outside the sentence. Strong candidate for the evaluation-and-assurance service page.

B and C ship as a comment above the implemented headline for review.

---

## 12. Artefacts

| File | Contents |
|---|---|
| `design-audit.md` | this document |
| `components.json` | 36-entry component inventory with measurements, states, motion, adopt/adapt/replace decisions, plus a rejected-patterns list |
| `reference/screenshots/` | 116 captures — 18 pages × 4 widths, nav states, mobile menu, case studies, page slices, hero contrast frames |
| `reference/data/*.json` | raw computed-style extractions, per page |
| `reference/data/probe-desktop.json` | nav states, motion audit, keyframes, count-up, stats |
| `reference/data/probe-states.json` | type scale per breakpoint, hover/focus states, reveal detection, a11y census |
| `reference/data/hero-contrast.json` | per-frame contrast measurements across the video loop |
| `reference/data/cs-*.json` | four case studies, full text and structure |

---

## 13. Copy voice — measured

Added 9 August 2026, after the client asked for the writing to follow the
reference as well as the design. Measured over the captured page text: 23 pages,
178 unique headings, 379 paragraphs, 577 sentences.

### Headings

| Property | Measured |
|---|---|
| Mean length | **7.0 words** (median 6) |
| **Ending in a full stop** | **76%** |
| Opening with an `-ing` verb | 22% — "Transforming…", "Delivering…", "Creating…", "Powering…" |
| Question form | 8% |
| Containing "you/your" | 12% |

The full stop on a five-word heading is the single most characterful thing about
this site's writing. It turns fragments into statements: *"Less hype. More
impact."*, *"Aiimi at a glance."*, *"Talk to us."*, *"Opportunities. Ideas.
Questions."* Two-fragment headings are a recurring device.

Case-study titles are uniformly gerund-led and name the outcome before the
client: *"Delivering 5x faster fault resolution answers with AI assistant at
Niftylift."*

### Body

| Property | Measured |
|---|---|
| Mean sentence | **19.1 words** (median 17, p90 32, max 60) |
| Sentences under 8 words | **4%** |
| Comma-listed triples (`x, y, and z`) | **29% of sentences** |
| Em or en dash | 9% |
| Mid-sentence colon | 6% |
| Contains a numeral | 9% |
| Contains a `%` figure | 2% |

The body copy is **not** clipped or aphoristic. It runs at a steady 17–19 words
with almost no short punchy sentences, and its signature move is the comma-listed
triple. Numerals are rare outside case studies, where they carry the argument.

### Person

"we/our" appears in 32% of paragraphs, "you/your" in 26% — near balance, tilted
slightly to the first person. Only 7% of sentences open with "We" and 1% with
"You", so the person is present without the copy ever sounding like a boast or a
lecture.

### CTA labels

Verb-first and short, usually naming the destination: *Talk to us · Get in touch
· Discover Aiimi · Download now · View all Case Studies · Find out more about…*

### What we changed to match

| Before | After |
|---|---|
| Clipped, aphoristic, contrarian — *"We would rather be checkable than impressive."* | Steady 17–19 word sentences, comma triples — *"Built on mechanism, not adjectives."* |
| Headings without terminal punctuation | Full stops on section headings and card titles |
| CTAs naming an action — *"Start a conversation"* | CTAs in the reference's register — *"Talk to us."*, *"Discover how we work"* |
| Metric-forward marketing prose | Numerals confined to case studies and the stats band |
| Mono eyebrows with wide tracking | Sans, bold, 12px, uppercase — the reference's own label treatment |

**One deliberate divergence from the measurement:** the reference uses an em or
en dash in 9% of sentences. Ours uses none at all, at the client's request. The
constructions that would have taken a dash now take a colon, a comma or a full
stop.
