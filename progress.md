# Progress

**Project:** Bromely Code marketing site
**Reference audited:** aiimi.com, 9 August 2026 (`design-audit.md`)
**Last updated:** 9 August 2026

---

## State

| Phase | Status |
|---|---|
| 1 — Reference design audit | **Complete.** `design-audit.md`, `components.json`, 116 captures in `reference/screenshots/`, 27 computed-style extractions in `reference/data/` |
| 2 — Build | **Complete.** 33 static routes, all verified at four breakpoints |
| 3 — Client revisions, 9 Aug 2026 | **Complete.** Team section removed · case-study figures populated with invented values (banner retained) · company details filled where safe, statutory identifiers withheld · four legal documents completed as drafts, two of them new |
| Media sourcing and compression | **Complete.** 12 photographs, 1 hero video, 3 typefaces — all recorded in `media-credits.md` |
| Verification | **Complete.** Lighthouse, keyboard, reduced-motion, mobile fallback, hero contrast across the loop, banner coverage |
| Launch readiness | **Blocked** on the items in *Before launch* below — none of them are engineering |

### Stack

Next.js 16.3 (App Router) · React 19.2 · TypeScript · Tailwind CSS v4 (CSS-first
`@theme`) · no runtime third-party origins.

### Run it

```
npm install
npm run dev      # http://localhost:3000
npm run build && npx next start -p 4321
```

---

## Lighthouse

Run against the production build (`next start`), Chromium headless, desktop
preset unless stated.

| Route | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 99 | 100 | 100 | 100 | 862 ms | 0 | 0 ms |
| `/services` | 100 | 100 | 100 | 100 | 582 ms | 0 | 0 ms |
| `/how-we-work` | 100 | 100 | 100 | 100 | 730 ms | 0 | 0 ms |
| `/industries` | 100 | 100 | 100 | 100 | 828 ms | 0 | 0 ms |
| `/industries/water-utilities` | 99 | 100 | 100 | 100 | 849 ms | 0 | 0 ms |
| `/case-studies` | 100 | 100 | 100 | 100 | 872 ms | 0 | 0 ms |
| `/case-studies/asset-information-retrieval-water-utility` | 100 | 100 | 100 | 100 | 638 ms | 0 | 0 ms |
| `/insights` | 100 | 100 | 100 | 100 | 616 ms | 0 | 0 ms |
| `/insights/abstention-is-a-feature` | 100 | 100 | 100 | 100 | 768 ms | 0 | 0 ms |
| `/about` | 100 | 100 | 100 | 100 | 617 ms | 0 | 0 ms |
| `/contact` | 100 | 100 | 100 | 100 | 578 ms | 0 | 0 ms |
| `/privacy` | 100 | 100 | 100 | 100 | 728 ms | 0 | 0 ms |
| `/cookies` | 100 | 100 | 100 | 100 | 537 ms | 0 | 0 ms |
| `/terms` | 100 | 100 | 100 | 100 | — | 0 | 0 ms |
| `/accessibility` | 100 | 100 | 100 | 100 | — | 0 | 0 ms |
| **`/` — mobile preset** | **93** | **100** | **100** | **100** | 3.2 s | 0 | 10 ms |

Mobile LCP is the hero still under Lighthouse's simulated slow 4G. Total transfer
for the homepage on mobile is **415 KB**, of which the hero still is 19 KB — the
video is never requested below 768px.

### Failures found and fixed during verification

| Finding | Cause | Fix |
|---|---|---|
| `color-contrast` on `/` | `opacity-70` on 11px mono text in the accreditation band dropped it to 3.32:1 on `#05080d` | Removed the opacity; the token colour alone is 5.7:1 |
| `color-contrast` on `/contact` | Same pattern on the `(optional)` label spans — 3.36:1 | Removed the opacity |
| `heading-order` on four index pages | `h1` followed by card `h3`s with no `h2` between | Added a real section heading to each index; the content was thin there anyway |
| Detail routes shipped no `og:image` | Overriding `openGraph` in `generateMetadata` replaces the parent entry wholesale | Restated `images` in each override |
| Mobile hero served the 1920px poster | `hero.video.mobile` was defined and never wired up | Art-directed `<picture>`; mobile LCP 3.8 s → 3.2 s, transfer 441 KB → 415 KB |
| Nav never left its solid state | The sentinel was a 1px div at the hero's top, always outside the observer's `-96px` root margin | The hero section *is* the sentinel; the header stays transparent while any part of it sits behind the header band |

---

## Media weights

### Hero video — budget was under 3 MB for the MP4

| Asset | Before | After |
|---|---|---|
| Source clip (1920×1080, 23.5s) | 15,046 KB | — |
| `hero.mp4` (H.264, 12s seamless loop, no audio) | | **535 KB** |
| `hero.webm` (VP9) | | **237 KB** |
| `hero-poster.webp` (frame 0 of the encoded clip) | | **45 KB** |
| `hero-mobile.webp` (4:5 crop, 828px) | | **19 KB** |

For comparison, the reference site's hero video is **3,095 KB** and the same file
is served to a 390px phone.

### Photography — 13 files, JPEG → WebP at ≤2000px

| Asset | Before | After |
|---|---|---|
| case-studies/water-utility | 919 KB | 387 KB |
| case-studies/central-government | 603 KB | 233 KB |
| case-studies/financial-services | 308 KB | 86 KB |
| case-studies/professional-services | 146 KB | 35 KB |
| industries/water-utilities | 872 KB | 354 KB |
| industries/central-government | 1,060 KB | 357 KB |
| industries/financial-services | 468 KB | 123 KB |
| insights/chunking | 975 KB | 269 KB |
| insights/permissions | 375 KB | 124 KB |
| insights/abstention | 175 KB | 43 KB |
| insights/evaluation | 310 KB | 51 KB |
| about/studio | 298 KB | 66 KB |
| og/default | 314 KB | 94 KB |
| **Total** | **6,823 KB** | **2,222 KB** (−67%) |

Next.js generates responsive variants from these at request time; the figures
above are the stored originals, not what a visitor downloads.

### Fonts

| Face | Weight |
|---|---|
| Satoshi variable (300–900) | 42 KB |
| IBM Plex Sans (400/500/600) + Mono (400/500) | self-hosted by `next/font`, subset to `latin` |

---

## Verification results

### Structural comparison against the reference

Local captures are in `reference/build-screenshots/`, at the same four widths as
the reference captures in `reference/screenshots/`. Every difference below was
checked against `design-audit.md` §8 and classified.

| Aspect | Reference | Build | Verdict |
|---|---|---|---|
| Container | 83.33% of viewport, capped 1536px, 32/24px gutters | Same | Match |
| Section padding ladder | 4 steps, exactly 1:2 mobile→desktop | Same ratios, made fluid with `clamp()` | Intentional — removes the 768–1023 dead zone |
| Surface alternation | Dark bookends, one dark band at two-thirds | Same | Match |
| Nav behaviour | Fixed, colour flip at 300ms | Same timing | Match |
| Nav contents | Hamburger-only at every width, platform first | Persistent links ≥1024, services first | **Intentional — deviation D1** |
| Hero text column | 473 / 852 / 1136px, three fixed settings | Same three settings | Match |
| Scroll reveal | 20px rise, ~500ms, once | Same | Match |
| Card treatment | 1px border, radius 0, no hover state | Same, plus a border-colour hover | Intentional — the reference wastes an affordance |
| Logo band | Two opposing marquees, 45px lockups, black | Same geometry, technology marks | **Intentional — deviation D2** |
| Stats band | 160px numerals counting up from live data | Same component, `[NEEDS FIGURE]` | **Intentional — deviation D7** |
| Page density | 8 propositions across 7,383px | Denser on services and method pages | Intentional — deviation D9 |
| Motion tiers | Load: none · scroll: one effect · hover: 150ms | Same rule; load-stagger added on the hero only | Minor, intentional |

No unintentional divergences were found. Horizontal overflow was measured on
every page at every breakpoint: **0px everywhere**.

### Accessibility

| Check | Result |
|---|---|
| Keyboard traversal, first 14 tab stops on `/` | All reachable, **0 with an invisible focus indicator** |
| Skip link | Present on every route, first tab stop, visible on focus |
| Mobile menu — keyboard open | ✅ opens on Enter |
| Mobile menu — focus containment | ✅ focus stays inside (native `<dialog>`) |
| Mobile menu — Escape | ✅ closes and returns focus to the trigger |
| Landmarks | Exactly one `<main>` per page (the reference ships two) |
| Headings | One `h1` per page, **0 level skips** on every route |
| Images | 0 missing `alt` across all sampled routes; alt text written for meaning |
| Form controls | 0 unlabelled inputs |
| `lang` | `en-GB` |
| Lighthouse accessibility | **100 on every route audited** |

### Hero video behaviour

| Condition | Expected | Measured |
|---|---|---|
| `prefers-reduced-motion: reduce` at 1440px | Poster only, video never requested | 0 `<video>` elements, **0 video requests**, poster visible |
| Viewport < 768px | Still image only, video never requested | 0 `<video>` elements, **0 video requests** |
| Autoplay refused | Poster stays visible | Handled — `play()` rejection leaves `ready` false, video stays at opacity 0 |
| Poster before video | Poster paints first, video swaps on `canplaythrough` | Confirmed |

### Hero text contrast across the whole loop

Sampled every 1.5s across the 12s loop, measuring the **background behind the
text** (copy block hidden, video forced visible) rather than the composite —
otherwise glyph anti-aliasing is scored as though it were background.

| t | 0s | 1.5s | 3s | 4.5s | 6s | 7.5s | 9s | 10.5s |
|---|---|---|---|---|---|---|---|---|
| Mean contrast vs white | 19.69 | 19.69 | 19.69 | 19.69 | 19.69 | 19.69 | 19.69 | 19.69 |
| 95th-percentile worst | 18.99 | 18.99 | 18.99 | 18.99 | 18.99 | 18.99 | 18.98 | 19.01 |

Requirement is 4.5:1. The worst sampled pixel across the loop is **~19:1**,
because the scrim is anchored behind the text block rather than relying on the
footage being dark — the reference has no scrim at all and passes on grading
alone (13.2–15.8:1 mean, and nothing preventing a clip swap from breaking it).

Per-frame captures: `reference/build-screenshots/audit.json`.

### Illustrative banner coverage

`CONTENT_STATUS === "illustrative"` renders a banner on every case-study surface.
Counted in rendered text:

| Route | Case-study links | Banners |
|---|---|---|
| `/case-studies` | 4 | 5 (one per card + the page-level band) |
| Each case-study detail page | 3 | 4 (page band + three related cards) |
| `/` | 3 | 3 |
| `/industries/water-utilities` | 1 | 1 |
| `/services/intelligence-extraction` | 1 | 1 |

No case-study surface renders without one.

---

## Case-study swap-in checklist

Four illustrative composites ship, and **every figure in them is now populated
with an invented number** (client request, 9 August 2026). There are no
`[NEEDS FIGURE]` placeholders left.

That raises the stakes on the labelling rather than lowering them. Invented
prose with visible placeholders is obviously illustrative; invented prose with
concrete percentages reads as reported fact unless something says otherwise. The
`CONTENT_STATUS` banner is now the only thing separating ordinary marketing from
a misleading commercial practice under the DMCC Act and the CAP Code. **Do not
remove it until real studies replace this content.**

What is currently invented, so nobody has to reverse-engineer it later:

| Study | Invented figures |
|---|---|
| Water utility | 4 min 10 s → 38 s · 312 → 96 escalations/week · 71.6% → 94.2% supported · 3 permission regressions caught |
| Central government | 31 h → 9 h per bundle · 64% → 91.4% recall · 18.3% → 6.1% amended · 0 audit findings |
| Financial services | 72.8% → 93.1% on medical reports · 88.1% → 94.7% aggregate · 7 regressions blocked · 3 of 4 claim types · 88.6% judge agreement |
| Professional services | 8 of 14 disqualified · £410,000 released · 19 days to delivery · 3 reusable layers |

Per study — `asset-information-retrieval-water-utility`,
`regulatory-evidence-pipeline-central-government`,
`claims-evidence-assurance-financial-services`,
`ai-roadmap-professional-services`:

- [ ] **Written client permission** to publish, naming what may be disclosed —
      sector, scale, technologies, figures — and what may not.
- [ ] **Client sign-off on the text**, from someone with authority to give it.
- [ ] **Every invented figure replaced with a measured one**, each with the
      method and baseline recorded somewhere auditable. The table above is the
      list; all of them live in the `outcomes` arrays.
- [ ] **Named technologies confirmed** against what was actually deployed, and
      cleared with the client — a stack disclosure can be commercially sensitive.
- [ ] **Pull quote re-attributed.** Quotes are currently role-and-sector only and
      no person said them. A real quote needs the speaker's approval of the exact
      wording and of being named.
- [ ] **Client name decided.** If the client will not be named, the study can stay
      sector-only — the reference site itself ships an unnamed professional-services
      study, so this is an established convention and not an evasion.
- [ ] **Photography reviewed.** Current images are generic stock. If a real client
      is named, a generic image of someone else's facility becomes misleading.

Then, once all four are complete:

- [ ] Flip `CONTENT_STATUS` to `"verified"`.
- [ ] Re-run the banner check — it should report 0 across every route.
- [ ] Remove the "On these being illustrative" section from `/case-studies`.
- [ ] Update the FAQ answer on `/about` about not yet having real case studies.
- [ ] Update section 3 of `/terms`, which currently states that the case studies
      are illustrative composites with illustrative figures.

---

## Before launch

Not engineering. Nothing below can be done from this repository.

**Legal**

Four documents now ship as **complete drafts** rather than outlines: `/privacy`,
`/cookies`, `/terms` and `/accessibility`. Each carries a visible "requires legal
review" banner, and each open business decision is marked inline with `CONFIRM`
and rendered as a highlighted note, so a reviewer can find all of them in one
pass.

- [ ] **Review by a qualified adviser.** These are drafts written to be reviewed,
      not advice. Remove the banner from `src/components/blocks/legal-page.tsx`
      only after sign-off.
- [ ] Settle the eleven `CONFIRM` points — `grep -n CONFIRM src/content/legal.ts`.
      In summary: whether a DPO is required; hosting and email providers and their
      sub-processor lists; international transfer safeguards per processor; server
      log retention; alignment of the security section with the client-contract
      security schedule; the liability wording in the terms; and whether public
      sector accessibility regulations bite on any deliverable.
- [ ] Legitimate-interests assessment for enquiry handling, written and retained —
      the privacy notice says it exists and is available on request.
- [ ] Set up `privacy@` and `accessibility@` mailboxes. Both are published.
- [ ] Cookie policy updated **before** any analytics goes live, not after.
- [ ] Confirm vendor brand guidelines permit the technology-band marks.

**Company details**

Searched 9 August 2026: no Companies House record, no domain and no listing
exists for Bromely Code. There was nothing to retrieve, so the site says what is
true today rather than inventing identifiers.

- [ ] **Incorporate**, then set `site.registration.status` to `"registered"` and
      fill in `companyNumber`, `vatNumber`, `icoRegistration` and
      `registeredOffice` in `src/content/site.ts`. The footer, contact page and
      JSON-LD all switch from "registration in progress" automatically — nothing
      else needs editing.
- [ ] **Replace the phone number.** `+44 20 7946 0412` is inside Ofcom's reserved
      020 7946 0xxx range for fiction and documentation. It cannot ring a real
      subscriber, which is exactly why it was used, and it must not go live.
- [ ] Point the social links at real profiles — they currently go to the
      platforms' home pages.

Deliberately **not** invented, and why: a plausible eight-digit company number
almost certainly belongs to a real, unrelated company, and printing one under
"Registered in England & Wales" is a false statement about a real registration
rather than placeholder copy. Same for VAT and ICO numbers, and for a street
address that belongs to somebody. Give me the real details and it is a one-file
edit.

**Accreditations**

- [ ] All four entries in `src/content/site.ts` are `status: "pending"` and render
      as labelled outlines. As each is awarded, set `status: "held"` and supply the
      certifying body's own mark in `logo`.

**Contact form**

- [ ] Implement `deliver()` in `src/app/actions/contact.ts`. It currently logs in
      development and **throws in production**, so a live deployment without it
      shows the sender an honest failure rather than silently dropping the
      enquiry. That is deliberate; it is still a launch blocker.
- [ ] Add rate limiting at the edge. The honeypot stops naive bots and nothing else.

**Content**

- [ ] Stats band on the homepage is three `[NEEDS FIGURE]` slots by design — the
      one place placeholders remain. Populate when the numbers exist; the count-up
      animation runs automatically once `value` is a number rather than `null`.
- [x] ~~Team grid~~ — removed on request, 9 August 2026. The staffing argument it
      carried moved into the About page prose. If it returns, it needs real names
      and headshots; stock portraits presented as team members are prohibited by
      the licences the photography is used under.

**Analytics**

- [ ] None is installed. The consent banner already gates a future one: consent
      is published on `window.__bcConsent` and as a `bc-consent` event, and any
      loader must subscribe rather than run on load.

---

## Known limitations

- **`.playwright-mcp/`** in the project root is a scratch directory written by the
  browser tooling during the audit. It is gitignored; deleting it needs a
  permission this session did not have.
- **`reference/`** is 127 MB of audit evidence (screenshots, computed styles, raw
  media). Useful for a re-audit or a licence query, and a candidate for Git LFS or
  removal from the repository before it is handed to a client.
- **Mobile performance is 93, not 100.** The remaining cost is the hero still plus
  webfont loading under simulated slow 4G. Dropping the hero image below 768px
  entirely would score higher and look worse.
- **The seamless hero loop uses a 0.8s crossfade**, not a genuinely matched cut.
  On close inspection there is a slow dissolve at the loop point. A matched-cut
  clip would be better; this one was chosen for content over cut.
