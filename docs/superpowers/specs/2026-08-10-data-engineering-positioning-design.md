# Broadening Bromley Code from GenAI to two peer practices

**Date:** 10 August 2026
**Status:** approved, ready for an implementation plan
**Scope:** every content surface, one branch, one deploy

---

## 1. The problem

The site sells one thing: production GenAI and retrieval pipelines over
unstructured data. It should sell two, because data engineering is work the firm
takes on and is currently invisible to anyone reading the site.

Measured across `src/content/*.ts` string literals, not impressions:

| Term family | Occurrences |
|---|---|
| GenAI (LLM, RAG, prompt, embedding, chunking, grounding, model) | 139 |
| Retrieval (corpus, unstructured, document, citation) | 185 |
| Data engineering (pipeline, warehouse, ingest, orchestration, schema, lineage) | 101 |
| Platform names (Databricks, Snowflake, Airflow, Spark, Terraform) | 33 |

The 1.38 : 1 ratio understates the problem, because it is concentrated in the
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
arrays, `relatedServices` arrays, industry records and nav content. All 17 move
in the same commit or the related-links blocks and nav 404.

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

**Animation.** The existing left-to-right border relay in
`src/components/blocks/pipeline-diagram.tsx` carries over: spine in sequence,
then both branches in parallel from the fork, then the join. Existing constants
(`PERIMETER`, `LIT`, `RELAY_STEP = 420ms`) stay; only the delay schedule changes,
from `index * RELAY_STEP` to a per-node delay that accounts for the fork.
`prefers-reduced-motion` handling is unchanged.

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

## 7. Depth surfaces

| File | Change |
|---|---|
| `src/content/industries.ts` | Reframe off "unstructured mass". Each of the three sectors gains a structured-data problem alongside its document problem. |
| `src/content/insights.ts` | Add two DE insights to the four retrieval ones. Same voice: one contestable claim per piece, argued. |
| `src/content/about.ts` | "What we are, plainly" widened to two practices. |
| `src/content/stack.ts` | Already DE-heavy, and a flat `stackItems` list with no grouping, so nothing to reorder. Only the file's framing comment and any per-item captions that describe a tool by its retrieval role need changing. |
| `src/content/methodology.ts` | Engagement shape and first 90 days made practice-neutral, since both currently assume a corpus. |
| `src/app/page.tsx` | Industries section body, case-studies section body, insight teaser. |

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
  pipeline diagram and the two service slugs.
- No changes to legal pages except where a service name is quoted.
- The hero video and its grade are untouched.
- No new sectors and no new services beyond the four.

## 10. Open decisions

Neither blocks the implementation plan; both need an answer before the copy is
final.

1. **"Four illustrative engagements"** on the homepage survived the earlier
   removal of the illustrative disclosures. Six studies means the line changes
   anyway. Default if unanswered: rewrite it to state the count and the anatomy
   without the word "illustrative", consistent with the other removals.
2. **`/terms` §3** describes the case studies as illustrative composites and is
   now the only such disclosure on the site. Two more invented studies widen what
   that clause covers. Default if unanswered: leave the clause in place and
   unchanged.

## 11. How this is verified

- `tsc` and `next build` clean.
- Every internal link resolves, including the two renamed service slugs and
  their redirects, checked by crawling the built site rather than by grep.
- No route contains "GenAI" or "unstructured" as the only framing of what the
  firm does.
- The GenAI-to-DE term ratio measured again after the rewrite, reported rather
  than targeted. The point is balance in the load-bearing strings, not a number.
- All routes checked at 1280px and 390px: no horizontal overflow, the forked
  diagram legible at both.
- Contrast unchanged from current AA compliance on every touched surface.
