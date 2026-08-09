import { services } from "./services";

/**
 * Homepage headline candidates, drafted against the positioning line:
 * "Bromely Code builds production-grade GenAI pipelines that turn unstructured
 * enterprise data into evidence leaders can act on."
 *
 * Implemented: A.
 *
 * B — "Your unstructured data already holds the evidence."
 *     Strong buyer-side framing. Held back: it is a claim about the reader's
 *     estate that the reader may not accept in the first two seconds.
 *
 * C — "Retrieval that survives an audit."
 *     Sharpest of the three and the most disqualification-resistant. Held back
 *     as too narrow — it speaks to regulated buyers and leaves manufacturing
 *     and professional services outside the sentence. Strong candidate for the
 *     evaluation-and-assurance service page.
 *
 * All three deliberately avoid the reference site's construction
 * (gerund + abstract noun + place: "Powering AI everywhere at work.").
 */
export const hero = {
  headline: "The pipeline between your documents and the decision.",
  standfirst:
    "We build production-grade GenAI pipelines — retrieval, extraction, enrichment and evaluation — that turn unstructured enterprise data into evidence you can put in front of a board.",
  primaryCta: { label: "How we work", href: "/how-we-work" },
  secondaryCta: { label: "Start a conversation", href: "/contact" },
  video: {
    src: "/media/hero/hero.mp4",
    srcWebm: "/media/hero/hero.webm",
    poster: "/media/hero/hero-poster.webp",
    /** Below 768px the video is never requested — this still is served instead. */
    mobile: "/media/hero/hero-mobile.webp",
    alt: "Rows of network infrastructure receding into low light",
  },
};

export const positioning = {
  eyebrow: "What we do",
  heading: "Most of what your organisation knows was never modelled.",
  body: [
    "It is in surveys, contracts, tickets, transcripts and correspondence — written by people, for people, and invisible to every query your warehouse can run.",
    "We build the engineered path from that mass to a decision: parsed, chunked on structure, enriched with typed metadata, retrieved under your own permission model, grounded in a citable passage, and measured against a labelled set that your team owns.",
  ],
};

export const capabilities = services.map((s) => ({
  title: s.shortTitle,
  href: `/services/${s.slug}`,
  summary: s.summary,
  eyebrow: s.eyebrow,
}));

/**
 * Stats band. Every figure is [NEEDS FIGURE] rather than invented — a new
 * consultancy quoting fabricated counts is the exact failure mode this audience
 * screens for (design-audit.md §8.2 D7).
 */
export const stats = {
  eyebrow: "By the numbers",
  heading: "Figures we will publish when we have earned them.",
  body: "This slot is deliberately empty. We would rather show a gap than a number nobody can check.",
  items: [
    { label: "Pipelines in production", value: null, suffix: "+", note: "[NEEDS FIGURE]" },
    { label: "Documents indexed", value: null, suffix: "m", note: "[NEEDS FIGURE]" },
    { label: "Median answer-supported rate", value: null, suffix: "%", note: "[NEEDS FIGURE]" },
  ],
};

export const differentiators = {
  eyebrow: "Why this reads differently",
  heading: "We would rather be checkable than impressive.",
  items: [
    {
      title: "No product to sell you",
      body: "Every recommendation is about your estate, because we have nothing of our own to place in it. When the honest answer is that a use case is not viable, that is the answer you get.",
    },
    {
      title: "Evaluation from day one",
      body: "The labelled set and the regression suite are built alongside the pipeline, not bolted on afterwards. Nothing reaches users without a measured baseline behind it.",
    },
    {
      title: "Permissions in the index",
      body: "Access is resolved before ranking, against your directory, on every query — not filtered out of results after the fact, which is a leak with a user interface.",
    },
    {
      title: "Built to be handed over",
      body: "Your engineers are in the repository from the first increment. The engagement is finished when your team has changed the pipeline themselves.",
    },
  ],
};

export const ctaBand = {
  eyebrow: "Start here",
  heading: "Bring us the corpus you have given up on.",
  body: "A first conversation is usually 45 minutes and covers three things: what the corpus actually looks like, whether anyone can define a correct answer, and whether the permission model can be resolved per user. If any of those rules the work out, we will tell you then rather than in month four.",
};
