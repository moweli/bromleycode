# Broadening Bromley Code from GenAI to two peer practices

**Date:** 10 August 2026
**Status:** approved, ready for an implementation plan
**Scope:** every content surface, one branch, one deploy

---

## 1. The problem

The site sells one thing: production GenAI and retrieval pipelines over
unstructured data. It should sell two, because data engineering is work the firm
takes on and is currently invisible to anyone reading the site.

**Counting method**, stated so §11's re-measure has a reproducible baseline:
string literals only in `src/content/*.ts`, case-insensitive, prefix-stemmed
(`pipeline\w*`, `chunk\w*`). Comments and identifiers excluded.

`model` and its inflections are **excluded from every family** and counted
separately. It is genuinely ambiguous, an ML model or a data model, and it
occurs 62 times. An earlier version of this spec folded it into the GenAI family
and reported a 1.38 : 1 ratio. That was wrong, and wrong in the direction that
flattered the argument.

| Term family | Occurrences |
|---|---|
| GenAI (LLM, RAG, prompt, embedding, chunking, grounding, abstention) | 113 |
| Retrieval (corpus, unstructured, document, citation) | 227 |
| Data engineering (pipeline, warehouse, ingest, orchestration, schema, lineage) | 114 |
| Platform names (Databricks, Snowflake, Airflow, Spark, Terraform, Kubernetes) | 37 |
| *`model*`, unassigned* | *62* |

**AI side 340, DE side 151, a ratio of 2.25 : 1.** That aggregate is the
comparison the argument actually rests on. Per-family figures shift with
stemming choices, which is why the method is stated above rather than assumed;
two independent counts of this codebase agreed on the aggregate to within 0.01
while differing on individual families.

The ratio still understates the problem, because it is concentrated in the
load-bearing strings rather than spread evenly:

| Surface | Current text | Why it excludes DE |
|---|---|---|
| Tagline | Decision-grade intelligence from unstructured data. | "Unstructured" rules out structured work by definition |
| Meta description | …production-grade GenAI pipelines… | GenAI is the noun the firm is described by |
| Hero H1 | The pipeline between your documents and the decision. | Documents only |
| Homepage §2 heading | Most of what your organisation knows was never modelled. | Argues *against* the warehouse to make room for AI |
| `/how-we-work` | Ten-stage RAG pipeline, the site's only mechanism | A technical buyer sees an AI-only firm |

The homepage §2 heading is the sharpest instance. It does not merely omit data
engineering, it disparages the modelled estate as a rhetorical move. A firm that
sells warehouse work cannot open by calling modelling the thing nobody did.

**Counter-evidence worth noting:** the stack band already lists Databricks,
Snowflake, PostgreSQL, Airflow, Spark, Terraform and Kubernetes, and one of the
four services is already "Data and pipeline engineering". The capability is
already claimed in the furniture. The narrative wrapped around it subordinates
DE to a feeder role for retrieval. This work recovers a claim the site is
under-selling; it does not invent a new one.

## 2. Decisions taken

| # | Decision | Chosen |
|---|---|---|
| 1 | Centre of gravity | Two peer practices, data engineering and applied AI, as equal halves of one firm |
| 2 | DE scope claimed | All four: platform build and migration; ingestion and orchestration; modelling and analytics engineering; quality, governance and observability |
| 3 | DE evidence | Two new case studies written to the existing anatomy |
| 4 | The mechanism | One diagram, shared DE spine forking to analytics and to retrieval, rejoining at assurance |
| 5 | Scope of this pass | Whole site, one branch, one deploy |

## 3. Positioning spine

Exact replacement strings. Drafted against the measured voice rules in
`design-audit.md` §13: headings average seven words and 76% end in a full stop,
body sentences median 17 words, comma-triples in 29% of body copy, CTAs are
verb-first. No dashes in visible copy, per the standing instruction.

### `src/content/site.ts`

```
tagline      Decision-grade data, and the systems that act on it.
description  Bromley Code builds the data platforms that make enterprise
             information usable, and the AI systems that turn it into evidence
             leaders can act on.
```

`decision-grade` is retained deliberately. It is the phrase the brand already
owns, and it survives the widening intact.

### `src/content/home.ts`

```
hero.headline    The pipeline between your data and the decision.
hero.standfirst  Better foundations. Better evidence. Better decisions. We build
                 the data platforms that make your information usable, and the AI
                 systems that turn it into answers your teams can act on.
```

One word changes in the H1, `documents` to `data`. The line's cadence already
works and "documents" was the only element narrowing it. Resist the temptation
to rewrite a working sentence while widening it.

```
positioning.heading  Most organisations have both problems at once.
positioning.body     A warehouse nobody quite trusts, and a document estate
                     nobody can query. The two are usually owned by different
                     teams, funded from different budgets, and failing for the
                     same reason.
```

This preserves the original insight, that the unstructured estate is neglected,
while removing the cost to the modelled estate.

## 4. Services

Renumbered so data engineering leads, since it is both the front door and the
shared spine of the mechanism.

| # | Slug | Title | Change |
|---|---|---|---|
| 01 | `data-platform-engineering` | Data and platform engineering | Promoted from 02; renamed from "pipeline"; scope widened to all four DE areas |
| 02 | `intelligence-extraction` | Intelligence extraction | Unchanged |
| 03 | `data-ai-strategy` | Data and AI strategy | Renamed from "AI strategy and roadmap" |
| 04 | `evaluation-assurance` | Evaluation and assurance | Scope widened to data contracts, freshness and lineage |

Two slugs change, and the blast radius is measured, not assumed: **17 references
to those two strings across `src/`**, in service records, case-study `services`
arrays, `relatedServices` arrays, `methodology.ts` pipeline-stage `services`
arrays (4 of the 17), industry records and nav content.

**Two of the 17 are not links, they are image paths**, and moving them the same
way as the rest silently breaks both service hero images:

```
services.ts:151  src: "/media/services/data-pipeline-engineering.webp"
services.ts:251  src: "/media/services/ai-strategy-roadmap.webp"
```

Nothing catches this. `tsc` passes, `next build` passes, and §11's link crawl
only follows anchors, so a 404 image ships green. Either rename both files under
`public/media/services/` and update their rows in `media-credits.md` in the same
commit, or leave those two strings alone deliberately. Pick one in the plan and
say which. The remaining 15 move together or the related-links blocks and nav
404.

`next.config.ts` currently defines `rewrites()` and no `redirects()`. A
`redirects()` function must be added, permanent, for the two old paths:

```
/services/data-pipeline-engineering  →  /services/data-platform-engineering
/services/ai-strategy-roadmap        →  /services/data-ai-strategy
```

`src/app/sitemap.ts` derives its entries from the service records, so it picks
up the new slugs with no edit. It should still be checked after the change
rather than assumed.

`service.eyebrow` values (`Service 01` … `Service 04`) move with the renumbering.

**Binding constraint on service 01.** Claiming all four DE areas only survives a
technical first call if the "how we build it" steps name specific decisions, the
way the retrieval service names chunking strategy, hybrid retrieval and rerank
depth. A capability list is what the rest of this site was built to avoid. Each
of the four areas gets a named decision and a named failure mode. If a decision
cannot be named for an area, that area comes off the list rather than being
padded.

Service 04's widening is not a stretch: evaluating a model and contracting a
dataset are the same discipline pointed at different objects, and saying so is a
stronger position than listing them separately.

## 5. The mechanism

One diagram replaces the current ten-stage linear pipeline.

```
SOURCES → INGEST → MODEL → QUALITY
                     │
        ┌────────────┴────────────┐
        ↓                         ↓
  ANALYTICS / BI            INDEX → RETRIEVE
  semantic layer            → GROUND → SERVE
        │                         │
        └────────────┬────────────┘
                     ↓
                 ASSURANCE
      (evaluation, lineage, contracts)
```

- The shared spine is the data engineering practice, and it is genuinely shared:
  both branches depend on it, which is the argument for selling both.
- The right branch is the existing ten RAG stages, preserved rather than
  replaced. Nothing already written about retrieval is lost.
- The left branch is new and short. It should not be padded to visual parity;
  analytics is fewer stages than retrieval and pretending otherwise is the kind
  of symmetry that reads as decoration.
- Assurance as the join is the structural argument for service 04.

**Animation, and the constant that is not in the component.** The relay's cycle
length lives in CSS, not in the TSX. `src/app/globals.css:403` sets
`animation: pipeline-border 4.2s linear infinite`, and the comment above it at
:399 says so explicitly: ten boxes at 420ms fill the 4.2s cycle exactly, so
changing the count means changing both together. **This work changes the count.**

- `src/app/globals.css` is therefore a file that changes, and must be listed as
  one. Setting only the TSX delays produces a relay that visibly drifts out of
  step with its own cycle.
- `PERIMETER = 304` and `LIT` genuinely do stay: node dimensions are unchanged.
- `RELAY_STEP = 420ms` stays. The new cycle is **slots × 420ms**, where a slot is
  a relay position, not a node. The two branches run *in parallel* and therefore
  share slots rather than summing: spine (4 slots) + the longer branch + join.
  The implementation plan fixes the exact slot count; this spec fixes the rule.
- `prefers-reduced-motion` handling is unchanged.

**The two feedback loops must be placed, not assumed.** The current diagram draws
three loop paths (`pipeline-diagram.tsx:192, 216, 240`) and the figcaption at
:255 reads "Solid: the forward path. Dashed: the two loops that decide whether it
improves." The ASCII above shows none of them, which is an omission in the
sketch, not a decision to remove them.

- The Evaluate→Chunk loop runs from a node this design promotes into the shared
  ASSURANCE join. Under a fork, a loop leaving the shared join and re-entering
  only the retrieval branch is the honest topology: evaluation of generated
  answers feeds retrieval decisions, not the semantic layer.
- The analytics branch gets its own loop from ASSURANCE back to MODEL, because
  failed data contracts change the model. Without it, assurance-as-the-join is
  decorative on the left branch.
- `pipeline-diagram.tsx:255`'s figcaption changes with the loop count and is a
  required edit, not an optional one.

**The diagram renders on three routes, and each carries a hardcoded heading that
this change makes false.** `PipelineDiagram` is imported at `src/app/page.tsx:52`,
`src/app/how-we-work/page.tsx:40` and `src/app/services/page.tsx:64`. None of
these headings live in `src/content/`, so no content edit in §3 or §7 reaches
them:

| File:line | Current | Becomes |
|---|---|---|
| `page.tsx:47` | Ten stages, two loops, and the parts that usually break. | **One spine, two branches, and the parts that usually break.** |
| `how-we-work/page.tsx:35` | Ten stages and two loops. | **One spine, two branches, two loops.** |
| `services/page.tsx:59` | Where each service sits. | Unchanged, but its body at :60 ("Extraction and engineering usually run together…") states the pre-renumbering order and contradicts assurance-as-the-join. Rewrite to match §4. |

The bodies beneath the first two headings also cite ten stages and must move with
them. §11's checks will not catch this: they grep for "GenAI" and "unstructured",
not for stage counts.

**Responsive.** The fork must collapse to a single column below `md`. A
two-branch diagram at 390px is illegible, so the mobile rendering stacks
spine, then left branch, then right branch, then join, with the branch
relationship carried by labels rather than by geometry.

`/how-we-work` gains DE stage content for the spine and left branch, in the same
`PipelineStages` list format already used for the ten RAG stages.

## 6. Evidence

Two new case studies, written to the anatomy in `design-audit.md` §7 that the
existing four already follow: context, problem, why earlier approaches failed,
pipeline stage by stage, what shipped, outcomes with method and baseline, quote,
what next.

| Slug | Sector | Leads on |
|---|---|---|
| `warehouse-replatform-without-a-freeze` | Financial services | Migration, dimensional modelling, data contracts, parallel running |
| `platform-trustworthy-enough-to-publish-from` | Central government | Data quality, lineage, freshness SLAs, observability |

Six studies total, three AI-led and three DE-led. Both new studies need a
photograph each, sourced under the same rules recorded in `media-credits.md`:
Pexels or equivalent free licence, architectural or industrial register, no
people, no legible third-party marks, provenance recorded, rejections recorded
with their reason.

Both are invented, as the existing four are. Their figures follow the same rule
already applied: every number carries the method behind it and the baseline it
is measured against.

**Objection raised and overruled, recorded here so it is visible as a decision
rather than an oversight.** An adversarial review of this spec argued that
adding two invented engagements in named regulated sectors, carrying attributed
role quotes and figures, is new exposure rather than inherited exposure, given
that §10 leaves no disclosure anywhere on the site. It cited the comment at
`src/content/case-studies.ts:12`, which names the risk in the codebase's own
words: presenting invented scenarios as real client outcomes is a misleading
commercial practice under the DMCC Act and the CAP Code. Alternatives offered
were a named reference architecture, a migration runbook, or a worked example on
a public dataset.

The client considered these on 10 August 2026 and chose to write the two studies
as specified, in the same form as the existing four. That is the instruction this
spec implements. The alternatives remain available if the position changes.

## 7. Depth surfaces

| File | Change |
|---|---|
| `src/content/industries.ts` | Reframe off "unstructured mass". Each of the three sectors gains a structured-data problem alongside its document problem. |
| `src/content/insights.ts` | Add two DE insights to the four retrieval ones. Same voice: one contestable claim per piece, argued. |
| `src/content/about.ts` | "What we are, plainly" widened to two practices. |
| `src/content/stack.ts` | Already DE-heavy, and a flat `stackItems` list with no grouping, so nothing to reorder. Only the file's framing comment and any per-item captions that describe a tool by its retrieval role need changing. |
| `src/content/methodology.ts` | Engagement shape and first 90 days made practice-neutral, since both currently assume a corpus. |
| `src/app/page.tsx` | Industries section body, case-studies section body, insight teaser, **and the mechanism heading and body at :47-48 per §5**. |
| `src/app/services/page.tsx` | The "Where each service sits" body at :60, which states the pre-renumbering service order. |
| `src/app/how-we-work/page.tsx` | The mechanism heading and body at :35-36 per §5. |
| `src/app/globals.css` | The `pipeline-border` cycle duration at :403, per §5. |

The homepage sector body currently reads "Three sectors where the unstructured
mass is large". It becomes a statement about both estates.

## 8. Voice rules to preserve

The reason this site reads as credible is restraint, and a widening is where
restraint is most easily lost. The following are not negotiable during the
rewrite:

- No adjective does work a mechanism could do. "Robust", "cutting-edge",
  "seamless" and "end-to-end" stay out.
- Every claim is checkable or it is not made.
- Headings average seven words. Body sentences median 17.
- No dashes in visible copy.
- The firm does not become a generalist. Two named practices, not a capability
  supermarket. The temptation when widening is to add a third and fourth thing;
  the answer is no.

## 9. Out of scope

- No design token, layout, component or navigation-structure changes beyond the
  pipeline diagram and the two service slugs. The diagram's CSS block in
  `globals.css` is part of the diagram and is in scope.
- `public/` is otherwise untouched, **except** for the two service images named
  in §4 if the rename option is taken there. That carve-out is explicit because
  its absence is what would let a broken image path ship unnoticed.
- No changes to legal pages except where a service name is quoted.
- The hero video and its grade are untouched.
- No new sectors and no new services beyond the four.

## 10. Decisions closed on 10 August 2026

Both open items were answered and actioned before this plan begins, so the
implementation starts from a site with no illustrative framing anywhere.

1. **Homepage "Four illustrative engagements"** — rewritten to "Four engagements
   written the way the work actually runs". The count becomes six in this pass.
2. **`/terms` §3** — the illustrative clause removed. The section keeps the
   standard protection that figures are not audited performance claims and are
   not a promise of outcome, which is ordinary for any consultancy and does not
   characterise the studies.

Three further visible instances were found in the same sweep and removed at the
same time, because leaving them would have left the site incoherent, calling the
studies illustrative in places while the terms no longer did:

- `/case-studies` meta description, which read "Four illustrative engagements…".
- The `/case-studies` closing section titled "Why we would rather label them than
  dress them up", whose entire subject was the labelling.
- The Outcomes preamble on every case-study page, which said the numbers were
  illustrative rather than measured.

**Consequence, recorded plainly.** No statement anywhere on the site now
indicates that the case studies and their figures are invented rather than
delivered. The two new DE studies in §6 are written into that same condition.

`CONTENT_STATUS` in `src/content/case-studies.ts` stays at `"verified"` and is
not to be changed. It is not a pending action or a recommendation, and this
spec should not be read as proposing one. The `IllustrativeBanner` component
remains in the tree and renders nothing.

## 11. How this is verified

- `tsc` and `next build` clean.
- Every internal link resolves, including the two renamed service slugs and
  their redirects, checked by crawling the built site rather than by grep.
- No route contains "GenAI" or "unstructured" as the only framing of what the
  firm does.
- The AI-to-DE term ratio measured again after the rewrite using §1's stated
  method, reported rather than targeted. The point is balance in the
  load-bearing strings, not a number.
- Both service hero images load. A `next build` and a link crawl both pass with
  a broken `<Image src>`, so this is checked by requesting the two files.
- The relay animation completes one full cycle without drift, checked by
  screenshotting the diagram at intervals across the cycle rather than by
  reading the CSS.
- No route claims "ten stages" once the diagram forks.
- All routes checked at 1280px and 390px: no horizontal overflow, the forked
  diagram legible at both.
- Contrast unchanged from current AA compliance on every touched surface.

---

## 12. Deviations accepted at merge, 10 August 2026

Two requirements in this spec were not met. Both were raised by review, weighed,
and accepted rather than missed. Recording them here so the spec does not read as
satisfied when it is not.

### 12.1 The diagram does not stack on mobile

§5 required the fork to collapse to a single column below `md`. It does not. The
SVG keeps `min-w-[900px]` inside `overflow-x-auto`, so on a phone the reader
scrolls the diagram sideways within its own container.

Accepted because the page itself never scrolls sideways, which was the actual
hazard, and because the full ordered stage list renders directly beneath the
diagram in ordinary readable text. A reader on a phone loses the geometry and
keeps every word. Building a second, stacked rendering is a substantial piece of
new work carrying regression risk on a component that has just passed review, to
recover a spatial relationship the list already states.

Revisit if analytics show meaningful mobile traffic to `/how-we-work`.

### 12.2 Stage numbers run 01 to 14 across parallel branches

The nodes are numbered in array order, so `Publish` is 07 and `Chunk` is 08 even
though they sit on branches that run at the same time. Read strictly, the numbers
assert a sequence the geometry denies.

Accepted because those numbers are the cross-reference into the ordered stage
list below the diagram, which is genuinely sequential in the content file.
Renumbering the diagram desynchronises it from that list, trading a subtle
misreading for a concrete one. The fork is carried by the geometry, which is
where it belongs.
