import { services } from "./services";

/**
 * Copy voice, measured from the reference site (design-audit.md section 13):
 * headings of 5 to 8 words, sentence case, ending in a full stop (76% of theirs
 * do); body sentences around 17 to 19 words, flowing rather than clipped;
 * comma-listed triples as the signature construction (29% of sentences);
 * balanced first and second person; numerals kept out of marketing prose; CTAs
 * verb-first and short, in the manner of "Talk to us."
 *
 * No dashes anywhere in visible copy, by request.
 *
 * Homepage headline candidates, drafted against the positioning line:
 * "Bromley Code builds production-grade GenAI pipelines that turn unstructured
 * enterprise data into evidence leaders can act on."
 *
 * Implemented: A.
 * B: "Your unstructured data already holds the evidence."
 * C: "Retrieval that survives an audit."
 */
export const hero = {
  headline: "The pipeline between your data and the decision.",
  standfirst:
    "Better foundations. Better evidence. Better decisions. We build the data platforms that make your information usable, and the AI systems that turn it into answers your teams can act on.",
  primaryCta: { label: "Discover how we work", href: "/how-we-work" },
  secondaryCta: { label: "Talk to us", href: "/contact" },
  video: {
    src: "/media/hero/hero.mp4",
    srcWebm: "/media/hero/hero.webm",
    poster: "/media/hero/hero-poster.webp",
    /**
     * Separate portrait cut for phones. The mobile hero is a portrait box and
     * object-cover discards most of a landscape frame, so a 9:16 encode puts the
     * bytes into pixels that are actually seen: 718 KB against the desktop
     * file's 2,326 KB, and sharper on the screen it is made for.
     */
    mobileSrc: "/media/hero/hero-mobile.mp4",
    mobilePoster: "/media/hero/hero-mobile.webp",
    alt: "Network infrastructure, water treatment works and archived records",
  },
};

export const positioning = {
  eyebrow: "What we do",
  heading: "Most organisations have both problems at once.",
  body: [
    "A warehouse nobody quite trusts, and a document estate nobody can query. The two are usually owned by different teams, funded from different budgets, and failing for the same reason.",
    "We build both paths, and they share their first four stages. Sources are ingested, modelled and tested until the numbers can be relied on. From there the work forks, to a semantic layer your analysts can query, or to retrieval that grounds an answer in a citable passage. Both are measured against a set your team owns.",
  ],
};

export const capabilities = services.map((s) => ({
  title: s.shortTitle,
  href: `/services/${s.slug}`,
  summary: s.summary,
  eyebrow: s.eyebrow,
}));

export const stats = {
  eyebrow: "By the numbers",
  heading: "Bromley Code at a glance.",
  body: "Pipelines in production, documents made retrievable, and the answer-supported rate we hold ourselves to on every engagement.",
  items: [
    {
      label: "Pipelines in production.",
      value: 24,
      suffix: "+",
      note: "Across water, government, financial and professional services.",
    },
    {
      label: "Documents indexed.",
      value: 12,
      suffix: "m+",
      note: "Parsed, chunked, enriched and retrievable under source permissions.",
    },
    {
      label: "Median answer-supported rate.",
      value: 94,
      suffix: "%",
      note: "Measured on held-out sets, per document family, gated in CI.",
    },
  ],
};

export const differentiators = {
  eyebrow: "Why teams choose us",
  heading: "Built on mechanism, not adjectives.",
  items: [
    {
      title: "No product to sell you.",
      body: "Every recommendation is about your estate, because we have nothing of our own to place in it. When the honest answer is that a use case is not viable, that is the answer you get, and you get it early.",
    },
    {
      title: "Evaluation from day one.",
      body: "The labelled set, the regression suite and the assurance pack are built alongside the pipeline rather than bolted on afterwards. Nothing reaches your users without a measured baseline behind it.",
    },
    {
      title: "Permissions inside the index.",
      body: "Access is resolved before ranking, against your own directory, on every query. Filtering results after the fact is not access control. It is a leak with a user interface.",
    },
    {
      title: "Built to be handed over.",
      body: "Your engineers are in the repository from the first increment, and the engagement finishes when your team has changed the pipeline themselves. If you need us permanently, the handover failed.",
    },
  ],
};

export const ctaBand = {
  eyebrow: "Get in touch",
  heading: "Talk to us.",
  body: "A first conversation runs about forty-five minutes and covers three things: what your corpus actually looks like, whether anyone can define a correct answer, and whether your permission model resolves per user. Any one of them can rule the work out, and we would rather tell you in week one.",
};
