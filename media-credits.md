# Media credits

Every third-party asset shipped in this repository, with its source, licence and
where it is used. Licences were checked on the individual asset page at download
time rather than assumed from the library's general terms — Unsplash+ and parts
of Mixkit and Videvo are paid or attribution-bound and sit alongside free
content in the same search results.

**Downloaded:** 9 August 2026. **Originals retained:** `reference/media-raw/`
(not served; kept so a re-encode never needs a re-download).

---

## Photography

All from Pexels under the **Pexels Licence**: free for commercial use, no
attribution required, modification permitted. Source pages are recorded anyway —
attribution is not required but provenance is, and a licence can change.

| Shipped file | Library | Licence | Source | Downloaded | Weight (before → after) | Used on |
|---|---|---|---|---|---|---|
| public/media/case-studies/water-utility.webp | Pexels | Pexels Licence | [35425762](https://www.pexels.com/photo/aerial-view-of-a-wastewater-treatment-plant-35425762/) | 2026-08-09 | 919 KB → 387 KB | Case study — water utility (hero image); homepage and index cards |
| public/media/case-studies/central-government.webp | Pexels | Pexels Licence | [14544989](https://www.pexels.com/photo/low-angle-shot-of-a-building-with-columns-14544989/) | 2026-08-09 | 603 KB → 233 KB | Case study — central government (hero image); index cards |
| public/media/industries/central-government.webp | Pexels | Pexels Licence | [18275155](https://www.pexels.com/photo/facade-of-neoclassical-building-18275155/) | 2026-08-09 | 1060 KB → 357 KB | Industries — central government (hero image and card) |
| public/media/case-studies/financial-services.webp | Pexels | Pexels Licence | [26238613](https://www.pexels.com/photo/low-angle-shot-of-a-modern-skyscraper-26238613/) | 2026-08-09 | 308 KB → 86 KB | Case study — financial services (hero image); index cards |
| public/media/industries/financial-services.webp | Pexels | Pexels Licence | [13012283](https://www.pexels.com/photo/high-rise-buildings-in-a-city-13012283/) | 2026-08-09 | 468 KB → 123 KB | Industries — financial services (hero image and card) |
| public/media/case-studies/professional-services.webp | Pexels | Pexels Licence | [9301900](https://www.pexels.com/photo/a-blank-whiteboard-inside-the-conference-room-9301900/) | 2026-08-09 | 146 KB → 35 KB | Case study — professional services (hero image); index cards |
| public/media/about/studio.webp | Pexels | Pexels Licence | [14963655](https://www.pexels.com/photo/dimly-lit-office-room-with-a-computer-desk-by-a-window-14963655/) | 2026-08-09 | 298 KB → 66 KB | About — page image |
| public/media/insights/abstention.webp | Pexels | Pexels Licence | [37730212](https://www.pexels.com/photo/data-center-server-racks-with-active-equipment-37730212/) | 2026-08-09 | 175 KB → 43 KB | Insight — “Abstention is a feature” |
| public/media/og/default.webp | Pexels | Pexels Licence | [5354506](https://www.pexels.com/photo/patch-cables-plugged-in-patch-panel-5354506/) | 2026-08-09 | 314 KB → 94 KB | Reserve social image (currently unused; /opengraph-image is generated) |
| public/media/insights/permissions.webp | Pexels | Pexels Licence | [4864249](https://www.pexels.com/photo/optical-switch-connector-with-similar-cables-in-building-4864249/) | 2026-08-09 | 375 KB → 124 KB | Insight — “What permission inheritance actually requires” |
| public/media/insights/chunking.webp | Pexels | Pexels Licence | [11831530](https://www.pexels.com/photo/concrete-geometric-building-11831530/) | 2026-08-09 | 975 KB → 269 KB | Insight — “Chunking is a decision, not a default” |
| public/media/insights/evaluation.webp | Pexels | Pexels Licence | [34368893](https://www.pexels.com/photo/geometric-steel-frame-with-crossed-shadows-34368893/) | 2026-08-09 | 310 KB → 51 KB | Insight — “Your evaluation set is too big, and too small” |

**Checks applied to every image**

- Landscape orientation and ≥2000px on the long edge before compression.
- No visible third-party logo, trademark or recognisable product. The stock
  licence does not extend to a depicted brand, so any frame containing one was
  rejected at selection.
- No identifiable individuals. Nothing here depicts a person in a way that could
  imply they endorse Bromely Code — the free licences explicitly prohibit implied
  endorsement by depicted individuals, which is also why the team grid uses
  monograms rather than stock portraits.
- Re-encoded to WebP at quality 72, capped at 2000px wide. Next.js generates the
  responsive variants at request time from these.

---

## Hero video

| Field | Value |
|---|---|
| Shipped files | `public/media/hero/hero.mp4`, `hero.webm`, `hero-poster.webp`, `hero-mobile.webp` |
| Library | Pexels Videos |
| Licence | Pexels Licence — free for commercial use, no attribution required |
| Source | https://www.pexels.com/video/blue-colored-cables-1085656/ |
| Downloaded | 9 August 2026 |
| Subject | Network patch panel, static camera, link LEDs — real infrastructure, no legible branding |
| Source file | 1920×1080, 23.5s, 15002 KB |

**Why this clip.** Candidates from `content.pexels.com/aigc-bundle/*` were
excluded on sight: they are AI-generated stock, and an AI-generated data centre
on a page selling GenAI engineering is precisely the tell this audience reads.
Results served from `media.istockphoto.com` inside the same markup were also
excluded — those are paid placements, not free-licence content. A second
shortlisted clip was dropped because the switch in frame carried a legible
vendor logo.

**Processing** (`ffmpeg`, all steps recorded so the encode is reproducible):

| Step | Detail |
|---|---|
| Trim | 1.5s → 13.5s, a 12-second window |
| Seamless loop | tail alpha-faded and overlaid onto the head over 0.8s, so the last frame matches the first |
| Grade | `eq=contrast=1.16:saturation=0.50:brightness=0.01` + `colorbalance=rs=0.05:gs=0.02:bs=-0.07` — the source is heavily blue, which fights an amber accent |
| Audio | stripped entirely (`-an`) — it is never played and only adds weight |
| MP4 | H.264 high profile, CRF 30, maxrate 2200k, faststart → **535 KB** |
| WebM | VP9, CRF 40 → **237 KB** |
| Poster | frame 0 of the *encoded* clip, so the swap is invisible → **45 KB** |
| Mobile still | 4:5 crop of frame 0 at 828px → **19 KB** |

Budget was under 3 MB for the MP4; the shipped file is 535 KB, about
6× inside it. The reference site's equivalent is 3,095 KB and is served
unchanged to a 390px phone.

---

## Typefaces

| Face | Source | Licence | Shipped as |
|---|---|---|---|
| Satoshi (variable, 300–900) | [Fontshare](https://www.fontshare.com/fonts/satoshi) (Indian Type Foundry) | ITF Free Font Licence — free for commercial use | `public/fonts/Satoshi-Variable.woff2`, 42 KB, self-hosted |
| IBM Plex Sans (400/500/600) | Google Fonts / IBM | SIL Open Font License 1.1 | Self-hosted at build by `next/font/google` |
| IBM Plex Mono (400/500) | Google Fonts / IBM | SIL Open Font License 1.1 | Self-hosted at build by `next/font/google` |

No font is requested from a third-party origin at runtime. Italics were not
downloaded — the design system does not use them.

The reference site's own face (Geist) is OFL and could legally have been reused;
it was swapped for positioning rather than licensing reasons. See
`design-audit.md` §6.

---

## Vendor marks (technology-stack band)

| Item | Source | Licence |
|---|---|---|
| Databricks, Snowflake, PostgreSQL, Apache Airflow, Apache Spark, OpenSearch, Qdrant, DuckDB, Python, Hugging Face, MLflow, OpenTelemetry, Grafana, Kubernetes, Terraform, Redis | [Simple Icons](https://simpleicons.org) (npm `simple-icons`) | **CC0 1.0** for the icon set |

The CC0 licence covers the drawn icons. **Trademarks remain the property of
their respective owners.** The band states in copy that the marks indicate
platforms Bromely Code builds on, not partnership or endorsement.

**Microsoft Azure and AWS are named in prose and deliberately not shown as
marks.** Both companies require their brand assets to be sourced and approved
through their own brand centres, and both have asked to be removed from
third-party icon sets. Using a redrawn mark for either would be the one place on
this page where we were not following the vendor's stated terms.

**Before launch:** have someone confirm each vendor's current brand guidelines
permit this use. It is a low risk and a five-minute check, and it is the kind of
thing a client's legal team asks about.

---

## Nothing else is third-party

- The wordmark, pipeline diagram, reference-architecture block, favicon and
  Open Graph image are drawn in code in this repository.
- The grain texture is an inline SVG `feTurbulence` filter — no file, no request.
- No icon library is shipped for UI icons; the handful in use are inline SVG
  paths written here.
- No copy, markup, image, video or font from aiimi.com is present in this
  repository. The reference informed structural and interaction decisions only;
  captures of it live in `reference/screenshots/` as audit evidence and are not
  served by the site.
