/**
 * Team roles carry a monogram, not a photograph. Free stock licences prohibit
 * implied endorsement by depicted individuals, so a stock portrait captioned as
 * a named team member is the same category of problem as an invented client.
 * The grid is built to take real headshots the day they exist — populate
 * `photo` and the component uses it.
 */
export type TeamRole = {
  /** Initials shown in the monogram tile. */
  monogram: string;
  role: string;
  focus: string;
  /** Populated when a real headshot and permission exist. */
  photo?: { src: string; alt: string };
  /** Set to a real name once the person is hired and has agreed to be listed. */
  name?: string;
};

export const team: TeamRole[] = [
  {
    monogram: "PE",
    role: "Principal engineer, retrieval",
    focus: "Chunking strategy, hybrid retrieval, reranking, grounding and abstention behaviour.",
  },
  {
    monogram: "DE",
    role: "Lead data engineer",
    focus: "Ingestion, orchestration, lineage, index lifecycle and the operational readiness handover.",
  },
  {
    monogram: "EL",
    role: "Evaluation lead",
    focus: "Labelled sets, judge calibration, adversarial and permission suites, assurance packs.",
  },
  {
    monogram: "SA",
    role: "Solution architect",
    focus: "Reference architecture, permission modelling, security review and platform fit.",
  },
  {
    monogram: "DP",
    role: "Delivery principal",
    focus: "Engagement shape, sequencing, stakeholder alignment and the awkward conversations.",
  },
  {
    monogram: "ML",
    role: "Machine learning engineer",
    focus: "Extraction schemas, model selection, fine-tuning where it earns its cost, inference economics.",
  },
];

export const teamNote =
  "Role titles are real and describe how engagements are staffed. Names and photographs will appear here as the team is named publicly — we would rather show an honest placeholder than a stock photograph of someone who has never heard of us.";

export const story = {
  eyebrow: "About",
  heading: "A consultancy built around the parts that usually go wrong.",
  body: [
    "Bromely Code exists because the hard parts of enterprise GenAI are not the parts most engagements are staffed for. The model is rarely the problem. The corpus is the problem — its scanning quality, its revision sprawl, its three overlapping permission models, and the absence of any agreed definition of a correct answer.",
    "We are a data intelligence consultancy. The work is retrieval, extraction, enrichment and evaluation, delivered as engagements, on your platforms, inside your boundary. There is no product, no licence and no reason for us to recommend one.",
    "We take a narrow set of work and finish it. An engagement ends with a running pipeline, an evaluation harness your team owns, a rollback path that has been executed at least once against real data, and engineers who have already changed something in the pipeline without us in the room.",
  ],
};

export const faqs = [
  {
    question: "Do you resell or implement a particular platform?",
    answer:
      "No. We build on what you already run — Azure, AWS, Databricks, Snowflake, Postgres and the rest — because introducing a stack your team has no on-call experience with is the fastest way to make a system unsupportable. We hold no reseller agreements, which is why our recommendations can be about your estate rather than about our margin.",
  },
  {
    question: "Will you tell us not to build something?",
    answer:
      "Frequently, and early. The two most common recommendations against are a use case where nobody can define a correct answer — nothing to evaluate means nothing to improve — and a corpus whose permission model cannot be resolved per user at query time, which makes the result undeployable to the audience that asked for it. We would rather establish that in week three than in month nine.",
  },
  {
    question: "Can you work inside a restricted network boundary?",
    answer:
      "Yes, and we assume it by default for government and regulated engagements. Everything runs in your tenancy, with inference through a private endpoint or a self-hosted model where policy requires it. We plan for security review and accreditation as part of the timeline rather than discovering them.",
  },
  {
    question: "What size of engagement do you take?",
    answer:
      "Discovery runs two to three weeks. Build engagements typically run eight to sixteen weeks with a team of three to five. We do not take open-ended staff augmentation — if you need people permanently, you need to hire them, and we would rather help you specify the roles.",
  },
  {
    question: "Who owns what you build?",
    answer:
      "You do, including the evaluation set and the harness. Code lives in your repositories from the first increment. We retain nothing that would make leaving us difficult.",
  },
  {
    question: "What happens after handover?",
    answer:
      "A defined support window with an end date, and a runbook your team has already used. If you find yourself needing us permanently, the handover failed and we would want to fix that rather than bill for it.",
  },
  {
    question: "Do you have case studies from real clients?",
    answer:
      "Not yet, and the ones on this site say so on every page. They are illustrative composites written to show how we work, marked as such structurally rather than in a footnote. Real studies will replace them with client permission and verified figures.",
  },
];
