# Progress

**Project:** Bromley Code marketing site
**Reference audited:** aiimi.com, 9 August 2026 (`design-audit.md`)
**Last updated:** 9 August 2026 (Round 3)

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

### Hero video

**Superseded by Round 3.** The single-clip hero was replaced by a six-segment
montage; current weights are in the Round 3 section below.

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
| Geist Sans (variable) | self-hosted by the  package, SIL OFL |
| Geist Mono (variable) | self-hosted, used only in the pipeline diagram |

**Superseded by Round 3.** Satoshi and IBM Plex were replaced by Geist to match
the reference.

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
| Stats band | 160px numerals counting up from live data | Same component, populated in Round 3 | Match |
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
- [ ] Settle the nine `CONFIRM` points — `grep -n CONFIRM src/content/legal.ts`.
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
exists for Bromley Code. There was nothing to retrieve, so the site says what is
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

---

## Round 3 — client revisions, 9 August 2026

### Design alignment to the reference

The client asked for the typography, colour, hero and copy voice to follow
aiimi.com rather than diverge from it. The original brief specified divergence,
so this reverses that decision deliberately. It is all token-level, so it is
reversible from `globals.css` and the content modules.

| Area | Change |
|---|---|
| Typeface | Geist Sans throughout, replacing Satoshi + IBM Plex Sans/Mono. SIL OFL, self-hosted by the `geist` package, no third-party origin. Single-family hierarchy carried by size, weight and tracking, as measured on the reference |
| Scale | The reference's own 60 / 40 / 30 / 22 / 18, stepping to 30 / 30 / 18 at 390px. Kept fluid via `clamp()` so the 768–1023 dead zone disappears while hitting identical values at 390 and 1440 |
| Tracking | Two tiers exactly as measured: −0.05em on display, −0.025em on the 18–22px band, normal on body |
| Eyebrows | Mono retired. Now Geist Sans, 12px, bold, uppercase, 0.04em — the reference's own label treatment |
| Colour | Pure black surfaces, `#141414` ink, one magenta accent, `#D6D6D6` divider. Two tokens added that the reference does without: a muted text colour and a darkened accent for text on light |
| Accent | `#E0245A`, three per cent deeper than the reference's `#E7295D`. See below |
| Hero | Narrow left column, no eyebrow, single underlined text CTA, deep top padding. **1007px tall at 1440 against the reference's measured 1014px**; h1 60px / 60 / −3px, matching exactly |

### The accent had to move to carry white text

The client asked for white text on the red buttons. Measured:

| Colour | White text on it | It as text on black |
|---|---|---|
| `#E7295D` (reference) | 4.31:1 ✗ | 4.87:1 ✓ |
| `#E32C5F` | 4.38:1 ✗ | 4.79:1 ✓ |
| **`#E0245A` (shipped)** | **4.60:1 ✓** | **4.57:1 ✓** |
| `#DE1E54` | 4.75:1 ✓ | 4.42:1 ✗ |

Only a narrow band satisfies both. `#E0245A` sits in it, and is visually a
whisker from the reference red. Hover darkens to `#C9143F` rather than
lightening, because lightening drops white back below 4.5:1.

### Hero video — six segments

Recut from one static clip to a six-segment montage on hard cuts: network
infrastructure, fibre, water treatment, the London financial district,
Westminster, and an archive stack. Two seconds each, twelve seconds total.

Hard cuts mean the loop point is just another cut, so it loops seamlessly with
no crossfade. A sector caption cycles in step, as real HTML text rather than
burnt into the footage.

| Asset | Weight |
|---|---|
| `hero.mp4` (H.264, 1920×1080, 12s, no audio) | **2,326 KB** — budget was 3 MB |
| `hero.webm` (VP9) | **1,325 KB** — listed first, so most browsers take it |
| `hero-poster.webp` | **19 KB** |
| `hero-mobile.webp` | **8 KB** |

Contrast behind the headline, measured across all six segments with the copy
block hidden and the video forced visible:

| t | 0s | 1.5s | 3s | 4.5s | 6s | 7.5s | 9s | 10.5s |
|---|---|---|---|---|---|---|---|---|
| Mean | 20.7 | 20.8 | 19.6 | 16.4 | 18.7 | 18.7 | 19.7 | 18.6 |
| 95th worst | 19.8 | 20.1 | 18.9 | **11.5** | 14.8 | 14.8 | 16.4 | 16.5 |

Worst case is 11.5:1 on the water cut, against a 4.5:1 requirement.

### Copy voice

Rewritten against a measured profile of the reference's writing, recorded in
`design-audit.md` section 13. Headings now carry terminal full stops, body
sentences run at 17–19 words, comma triples replace clipped fragments, and CTAs
adopt the reference's register. **All dashes removed from visible copy** at the
client's request, which is the one deliberate divergence from the measurement —
the reference uses one in 9% of its sentences.

### Other changes this round

- Team section removed; the staffing argument moved into the About prose.
- `enquiries@` replaces `hello@` throughout.
- Wordmark scaled to a 40px lockup, comparable to the reference's 33px.
- `/how-we-work` opened with a dark hero directly above a dark section, so the
  two read as one slab. Hero is now light and the principles band moved off dark.
- Stats band populated (24+ pipelines, 12m+ documents, 94% answer-supported).

### Verification after all of the above

Lighthouse, production build, desktop preset:

| Route | Perf | A11y | Best practices | SEO |
|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 |
| `/how-we-work` | 100 | 100 | 100 | 100 |
| `/case-studies` | 100 | 100 | 100 | 100 |
| `/about` | 100 | 100 | 100 | 100 |
| `/contact` | 100 | 100 | 100 | 100 |

Keyboard traversal clean, mobile dialog still traps focus and closes on Escape,
reduced-motion still holds the poster with zero video requests, mobile still
requests no video, zero horizontal overflow at four breakpoints.

---

## ⚠ The case-study banner has been removed

`CONTENT_STATUS` is now `"verified"`, so no banner renders anywhere. This was
done at the client's explicit instruction, having been raised twice.

**What that means in practice.** The four case studies are invented composites
and every figure in them is invented. They are now presented without any visible
label saying so. Invented prose carrying visible placeholders is self-evidently
illustrative; invented prose carrying `93.1%` reads as a reported result.

**What still discloses it.** Two places, and only two:

1. `/terms` section 3 states that the case studies are illustrative composites
   and that the figures are not measured client outcomes.
2. The `/about` FAQ answers "Do you have case studies from real clients?"
   honestly.

Disclosure in terms rather than on every card is a real and common industry
position, and it is materially weaker than the banner was.

**Nothing on the case-study pages themselves discloses it any more.** The
quote-attribution note ("attributed to a role and sector, not an individual,
this is an illustrative engagement and no person said this") was removed on
9 August 2026 at the client's instruction. The pull quotes now read as ordinary
attributed testimony from a named role at a named kind of organisation. They are
invented, as are the figures beside them.

If sections 3 of `/terms` and the `/about` FAQ answer are also edited, there is
no disclosure left anywhere on the site.

**To restore the banners:** set `CONTENT_STATUS` back to `"illustrative"` in
`src/content/case-studies.ts`. One value, every surface.

The swap-in checklist above still applies in full.

---

## Round 4 — company details and accreditations, 9 August 2026

### Company details are now real and verified

Taken from the Companies House register on 9 August 2026, record
[16566018](https://find-and-update.company-information.service.gov.uk/company/16566018):

| Field | Value |
|---|---|
| Registered name | **BROMLEYCODE LTD** |
| Company number | **16566018** |
| Status | Active |
| Incorporated | 7 July 2025 |
| Registered office | 262 Bancroft Road, London, England, E1 4BS |
| SIC | 62020, information technology consultancy activities |

`site.registration.status` is now `"registered"`, so the footer, contact page and
JSON-LD all print the real registration line and address in place of
"registration in progress".

### Name spelling — resolved

The register says **BROMLEY**CODE. The brief and the original build said
**BROMELY** Code throughout. Confirmed on 9 August 2026 that the brand is
**Bromley Code**, so the site copy was the typo, not the registration.

Corrected across 20 files and 51 occurrences: display name, wordmark, page copy,
legal documents, email addresses, canonical URL and the documentation.

Two fields remain, deliberately:

- `site.legalName` = `"BromleyCode Ltd"`, one word, the registered form. Used
  wherever a statutory disclosure has to match the register exactly.
- `site.name` = `"Bromley Code"`, two words, the trading name, everywhere else.

**Follow-on, outside this repository:** the domain `bromleycode.com` and the
`enquiries@`, `privacy@` and `accessibility@` mailboxes on it are now referenced
throughout the site and the legal pages. They need to exist and resolve before
launch.

Still outstanding: **VAT number.** Not on the public register and not invented.
The footer prints that line only once the value exists.

### Accreditation row now carries artwork

Three renderings, chosen by what each mark actually is:

| Tile | Rendering | Status |
|---|---|---|
| Cyber Essentials | IASME's own published artwork, inverted for the dark band | held |
| Cyber Essentials Plus | typographic lockup drawn in-repo | held |
| ISO 27001 | typographic lockup | held |
| ISO 9001 | typographic lockup | held |
| ICO registered | dashed outline, labelled "in progress" | pending |
| Companies House 16566018 | typographic lockup, links to the register | held |

Tiles with a `verifyUrl` link to the public register, so a procurement reader can
check the claim in one click. The Companies House tile is verified true.

No official public artwork exists for the ISO scheme marks: they are issued by
the certification body that audited you and carry that body's accreditation
number. A lockup drawn by us is honest about being a wordmark; an approximation
of a certification body's mark would be wrong on the detail that matters.

### Five tiles are now making checkable claims

**Confirm every certificate is in hand before this goes live.** IASME licenses
the Cyber Essentials marks to certified organisations only and publishes a search
of who holds them. ISO marks come from an accredited certification body. A
consultancy selling assurance to regulated buyers is the worst possible place to
be caught displaying an accreditation it does not hold, and this audience checks.

To correct any tile: set its `status` to `"pending"` in `src/content/site.ts`. It
renders as a labelled outline reading "in progress" instead of a badge. No other
change is needed.

### Verification

Lighthouse after these changes: `/` 99/100/100/100, `/contact` and `/about`
100/100/100/100, all accessibility audits clean.

One failure was found and fixed on the way: the accreditation links carried an
`aria-label` that did not contain their visible text, which fails WCAG 2.5.3
Label in Name. The tile's own text now names the link, with a visually-hidden
note that it opens the public register in a new tab.

---

## Round 6 — mobile video, reviews, ship, 9 August 2026

### Live

| | |
|---|---|
| Production | **https://bromleycode.vercel.app** |
| Repository | **https://github.com/moweli/bromleycode** (private) |
| Vercel project | `omgdigital/bromleycode`, connected to the repo, so pushes to `master` deploy |

The per-deployment URL (`bromleycode-<hash>-omgdigital.vercel.app`) sits behind
the team's Deployment Protection and shows a Vercel login. That is expected: the
production alias above is the public one. All 12 sampled routes return 200 with
exactly one h1.

Production Lighthouse, desktop: **100 / 100 / 100 / 100**, LCP 0.6 s, CLS 0,
TBT 0 ms, no accessibility failures.

### Hero video now plays on phones

This reverses the earlier decision to serve a still below 768px, at the client's
request. It is not the reference's mistake of shipping the desktop file to a
phone: the mobile hero is a portrait box and `object-cover` discards most of a
landscape frame's width, so phones get their own 9:16 cut.

| Asset | Weight |
|---|---|
| `hero.mp4` desktop, 1920×1080 | 2,326 KB |
| `hero-mobile.mp4` phone, 540×960 portrait | **718 KB** |
| `hero-mobile.webp` poster, matched crop | 6 KB |

Verified in production: 1440px loads `hero.webm` and plays; 390px loads
`hero-mobile.mp4` at 540×960 and plays; reduced-motion loads neither.

Two conditions still hold the poster and request no video at all:
`prefers-reduced-motion` and the `Save-Data` header. Corporate and roaming users
set the latter, and this audience browses on both.

Mobile page weight rose from 415 KB to 1,151 KB, which is the cost of the
request. Mobile Lighthouse performance 93.

### Mobile responsiveness audit

14 routes × 4 widths (320, 360, 390, 414).

| Check | Result |
|---|---|
| Horizontal overflow | **0 px on every route at every width** |
| Lines over 78 characters | **none** |
| Tap targets under 24 px (WCAG 2.5.8) | fixed, see below |
| Text under 12 px | fixed, see below |

Fixed:

- Micro-labels were 11 px in 116 places. Raised to 12 px, which is also the
  smallest size the reference uses.
- Consent and marketing checkboxes were 13×16. Now 20×20.
- Footer navigation, legal links and the contact email were 19 px tall. Padded
  to roughly 28 px, past the 24 px minimum, without stretching the footer.
- Pipeline diagram SVG labels were 11 px. Now 12 px.

The one remaining "wide element" the audit reports is the technology marquee,
which is inside an `overflow-hidden` track by design and does not move the page.

### Copywriting review

Mechanical pass over all visible copy on 16 routes, about 58,000 characters.
Clean on: doubled words, stray punctuation, Americanisms, and dashes.

It did surface real damage left by the earlier dash removal, now repaired:

| Damage | Example | Fix |
|---|---|---|
| Numeric ranges lost their en dash entirely | `Days 1, 15` · `Discovery, 2, 3 weeks` | `Days 1 to 15` · `Discovery, 2 to 3 weeks` |
| Appositive dashes became commas where a colon was needed | "a stratified sample of the real corpus, formats, scan quality…" | "…of the real corpus: formats, scan quality…" |
| A relative clause lost its comma | "…surviving candidates which is what makes…" | "…surviving candidates, which is what makes…" |

Six of those, across methodology, services, case studies and insights. They were
grammatical but misleading: a colon-list read as a continuation of the sentence
before it, and `Days 1, 15` read as two numbers rather than a range.

One editorial fix: capability cards used the service name as both the card
heading and the link text two lines below it. The link now reads "See how it
works".

### Repository hygiene

- `reference/media-raw/` untracked: 346 MB of source video the build never
  reads, and every original is re-fetchable from the URLs in `media-credits.md`.
- `.vercelignore` excludes `reference/` so deploys do not upload the audit
  evidence.
- History still contains the raw media, so the pack is 276 MiB. Vercel clones
  shallowly for builds, so this costs a one-time clone rather than every deploy.
  If a slim repo is wanted later, that is a `git filter-repo` pass and a
  force-push, and it is a separate job.
