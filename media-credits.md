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

Six clips cut into one 12-second loop, two seconds each, on hard cuts. Because
the joins are cuts rather than dissolves, the loop point is simply another cut,
so the montage loops seamlessly by construction.

All six are from **Pexels Videos** under the **Pexels Licence**: free for
commercial use, no attribution required.

| # | Segment | Source file | Pexels ID | Original | Cut |
|---|---|---|---|---|---|
| 1 | Network infrastructure | network-7140928 | [7140928](https://www.pexels.com/video/7140928/) | 6.1 MB | from 1.4s, 2s used |
| 2 | Retrieval at scale | fibre-5926165 | [5926165](https://www.pexels.com/video/5926165/) | 9 MB | from 3s, 2s used |
| 3 | Water & utilities | water-5115937 | [5115937](https://www.pexels.com/video/5115937/) | 22.1 MB | from 6s, 2s used |
| 4 | Financial services | finance-11977876 | [11977876](https://www.pexels.com/video/11977876/) | 24.9 MB | from 9s, 2s used |
| 5 | Central government | government-5372949 | [5372949](https://www.pexels.com/video/5372949/) | 8.2 MB | from 2s, 2s used |
| 6 | Unstructured records | archive-6550428 | [6550428](https://www.pexels.com/video/6550428/) | 8.9 MB | from 4s, 2s used |

**Two categories excluded on sight.** Results served from
`content.pexels.com/aigc-bundle/*` are AI-generated stock, and an AI-generated
data centre on a page selling GenAI engineering is exactly the tell this audience
reads. Results from `media.istockphoto.com`, which appear inside the same
markup, are paid placements rather than free-licence content. A further clip was
rejected because the switch in frame carried a legible vendor logo, which the
stock licence does not cover.

**Processing** (`ffmpeg`, reproducible from `build-hero.mjs`):

| Step | Detail |
|---|---|
| Per-clip exposure | Individual brightness trim so a bright London aerial and a dark server room sit at the same level |
| Shared grade | `eq=contrast=1.12:saturation=0.48:brightness=-0.02` plus `vignette=PI/5`, applied after the concat so six clips read as one piece of footage |
| Order | Opens on the darkest segment: it compresses far better as the LCP poster and gives the headline more contrast at first paint |
| Audio | stripped entirely (`-an`) |
| MP4 | H.264 high, CRF 31, maxrate 2600k, faststart, 1920×1080, 25fps → **2326 KB** |
| WebM | VP9, CRF 52 → **1325 KB** (listed first, so most browsers take the smaller file) |
| Poster | frame 0.4s of the *encoded* montage → **19 KB** |
| Mobile still | 4:5 crop at 828px → **8 KB** |

Budget was under 3 MB for the MP4; the shipped file is 2326 KB. The
reference site's single-scene equivalent is 3,095 KB and is served unchanged to a
390px phone.

The sector caption that cycles over the video is **real HTML text**, stepped by a
CSS animation on the same 12-second period. The reference burns equivalent tags
into its footage, which cannot be selected, translated or read aloud.


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
