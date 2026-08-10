export const story = {
  eyebrow: "About",
  heading: "A consultancy built around the parts that usually go wrong.",
  body: [
    "Bromley Code exists because the hard parts of this work are not the parts most engagements are staffed for. The model is rarely the problem, and neither is the warehouse tool. The estate is the problem: its scanning quality, its revision sprawl, its three overlapping permission models, its four definitions of a customer, and the absence of any agreed definition of a correct answer.",
    "We are a data consultancy with two practices. Data and platform engineering builds the ingestion, modelling and contracts that make a warehouse worth querying. Applied AI builds the extraction, retrieval and grounding that make a document estate answerable. They are peers rather than a main course and a side, they share the first five stages of the same pipeline, and most engagements need both.",
    "Both are delivered as engagements, on your platforms, inside your boundary. There is no product, no licence and no reason for us to recommend one.",
    "Engagements are staffed with three to five people, all of whom write code or evaluate output. There is no account layer between you and the people building the thing, and no bench being kept warm at your expense.",
    "We take a narrow set of work and finish it. An engagement ends with a running pipeline, an evaluation harness your team owns, a rollback path that has been executed at least once against real data, and engineers who have already changed something in the pipeline without us in the room.",
  ],
};

export const faqs = [
  {
    question: "Do you resell or implement a particular platform?",
    answer:
      "No. We build on what you already run. Azure, AWS, Databricks, Snowflake, Postgres and the rest, because introducing a stack your team has no on-call experience with is the fastest way to make a system unsupportable. We hold no reseller agreements, which is why our recommendations can be about your estate rather than about our margin.",
  },
  {
    question: "Will you tell us not to build something?",
    answer:
      "Frequently, and early. The two most common recommendations against are a use case where nobody can define a correct answer, nothing to evaluate means nothing to improve, and a corpus whose permission model cannot be resolved per user at query time, which makes the result undeployable to the audience that asked for it. We would rather establish that in week three than in month nine.",
  },
  {
    question: "Can you work inside a restricted network boundary?",
    answer:
      "Yes, and we assume it by default for government and regulated engagements. Everything runs in your tenancy, with inference through a private endpoint or a self-hosted model where policy requires it. We plan for security review and accreditation as part of the timeline rather than discovering them.",
  },
  {
    question: "What size of engagement do you take?",
    answer:
      "Discovery runs two to three weeks. Build engagements typically run eight to sixteen weeks with a team of three to five. We do not take open-ended staff augmentation, if you need people permanently, you need to hire them, and we would rather help you specify the roles.",
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
];
