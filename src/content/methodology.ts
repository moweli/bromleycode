/**
 * The pipeline, the engagement shape, and the first 90 days.
 *
 * This is the trust apparatus the whole site rests on: the argument is the
 * mechanism, shown in full (design-audit.md §8.1 D2, §8.2 D8). The reference
 * site sells outcomes and never shows mechanism, because its logo wall does the
 * arguing for it.
 */

export type PipelineStage = {
  id: string;
  name: string;
  /** One line for the diagram. */
  short: string;
  detail: string;
  /** The decision on this stage that most often gets made badly. */
  hardPart: string;
  services: string[];
  /**
   * Where the stage sits in the forked diagram. The spine is shared by both
   * practices, which is the structural argument for selling them together; the
   * branches run in parallel and rejoin at the assurance stages.
   */
  branch: "spine" | "analytics" | "retrieval" | "join";
};

export const pipelineStages: PipelineStage[] = [
  {
    id: "survey",
    name: "Survey",
    short: "Open the corpus before designing anything",
    detail:
      "A stratified sample of the real corpus: formats, scan quality, revision patterns, duplication, and the permission model each source enforces. Two or three document families usually account for most of the value, which changes what gets built first.",
    hardPart:
      "Skipping this is the most expensive decision available. Almost every stalled pilot we are asked to look at was designed against an assumed corpus rather than a sampled one.",
    services: ["data-ai-strategy"],
    branch: "spine",
  },
  {
    id: "ingest",
    name: "Ingest",
    short: "Incremental, idempotent, resumable",
    detail:
      "Connectors with change-data capture where the source supports it and content hashing where it does not. Reprocessing a document after a parser change must produce one record, not two.",
    hardPart:
      "Idempotency is easy to claim and hard to hold once three sources disagree about what a document's identity is.",
    services: ["data-platform-engineering"],
    branch: "spine",
  },
  {
    id: "parse",
    name: "Parse",
    short: "Recover structure, in documents and in tables",
    detail:
      "Native text where a layer exists, OCR where it does not, layout-aware parsing for anything tabular. Tables and appendices carry a disproportionate share of the answers and are what naive extraction destroys first.",
    hardPart:
      "Routing by document quality. Sending everything to the expensive parser is wasteful; sending everything to the cheap one silently loses the hardest third of the corpus.",
    services: ["intelligence-extraction", "data-platform-engineering"],
    branch: "spine",
  },
  {
    id: "model",
    name: "Model",
    short: "Decide what a customer is before counting them",
    detail:
      "Dimensional models where the questions are known, wide tables where they are not, and entity resolution across the systems that each hold part of the answer. Slowly changing dimensions are decided per attribute rather than as a blanket policy.",
    hardPart:
      "Tracking history on every attribute is the default that quietly makes a warehouse unqueryable. Deciding which attributes actually need it is unglamorous, and it is the difference between a model people use and one they route around.",
    services: ["data-platform-engineering"],
    branch: "spine",
  },
  {
    id: "quality",
    name: "Quality",
    short: "Contracts that stop a load, not a dashboard",
    detail:
      "Shape, range, freshness and referential expectations declared beside the data and run on every load. A breach blocks the load or pages an owner, because a failing test nobody is accountable for is documentation rather than control.",
    hardPart:
      "The tempting fix when a source changes shape is to coerce it back to the old one. That keeps dashboards green while the numbers stop meaning what they meant, and it is usually found months later by someone reconciling by hand.",
    services: ["data-platform-engineering", "evaluation-assurance"],
    branch: "spine",
  },
  {
    id: "semantic",
    name: "Semantic",
    short: "One definition of the metric, with an owner",
    detail:
      "Metric and dimension definitions in one place, versioned, consumed by every tool rather than reimplemented in each. The layer is the contract between the model and the people who ask it questions.",
    hardPart:
      "Every organisation believes it has one definition of revenue until the definitions are written down next to each other. Reconciling them is a political exercise before it is a technical one, and pretending otherwise is how the layer stalls.",
    services: ["data-platform-engineering"],
    branch: "analytics",
  },
  {
    id: "publish",
    name: "Publish",
    short: "Marts and reports people can be held to",
    detail:
      "Consumer-facing datasets with a freshness SLA, a named owner and lineage back to source. A published figure carries the same obligation as a generated answer: you must be able to say where it came from and when it was last true.",
    hardPart:
      "Publishing is where scope grows without anyone deciding to grow it. Every new consumer adds a dataset that must be kept correct forever, so the entry test is whether someone will act on it, not whether someone asked for it.",
    services: ["data-platform-engineering"],
    branch: "analytics",
  },
  {
    id: "chunk",
    name: "Chunk",
    short: "On structure, not on token count",
    detail:
      "Sections, clauses and conversational turns, with parent context attached and overlap tuned against a retrieval evaluation set. Fixed windows are a default, not a decision.",
    hardPart:
      "Chunk boundaries are the most under-examined choice in most retrieval systems. Severing a finding from the identifier that gives it meaning costs more recall than any embedding-model upgrade will win back.",
    services: ["intelligence-extraction"],
    branch: "retrieval",
  },
  {
    id: "enrich",
    name: "Enrich",
    short: "Typed metadata so retrieval can filter before it ranks",
    detail:
      "Entity resolution across sources, date and revision normalisation, document-type classification. A hybrid filter on type and date routinely beats a better embedding model, at a fraction of the cost.",
    hardPart:
      "Entity resolution across systems that each have their own idea of an identifier. This is ordinary data engineering and it is where most of the unglamorous effort goes.",
    services: ["intelligence-extraction", "data-platform-engineering"],
    branch: "retrieval",
  },
  {
    id: "index",
    name: "Index",
    short: "Vector and lexical, with permissions inside",
    detail:
      "Dense embeddings alongside a lexical index, with source ACLs stored per chunk. Rebuilds run blue-green so a re-embedding never takes retrieval offline.",
    hardPart:
      "Permissions belong in the index, not in a post-filter. A post-filter leaks the existence of documents a user cannot open.",
    services: ["data-platform-engineering"],
    branch: "retrieval",
  },
  {
    id: "retrieve",
    name: "Retrieve",
    short: "Hybrid, pre-filtered, reranked",
    detail:
      "Metadata pre-filtering, hybrid dense and lexical candidate generation, cross-encoder reranking. Tuned against a labelled set built from the questions people actually ask.",
    hardPart:
      "Resolving access per user at query time, at latency. If your directory cannot answer group membership fast enough, this is where you find out.",
    services: ["intelligence-extraction"],
    branch: "retrieval",
  },
  {
    id: "ground",
    name: "Ground",
    short: "Cite the passage or abstain",
    detail:
      "Every claim carries a citation to a specific chunk of a specific revision. Claims without a supporting passage are refused rather than improvised.",
    hardPart:
      "Abstention has to be designed for, and defended. It is the behaviour that earns trust with a technical buyer and the first thing a demo-driven roadmap removes.",
    services: ["intelligence-extraction", "evaluation-assurance"],
    branch: "retrieval",
  },
  {
    id: "evaluate",
    name: "Evaluate",
    short: "A number, per document family, in CI",
    detail:
      "A labelled question set, scored per family, run as a build gate. Retrieval and generation measured separately, because they fail separately.",
    hardPart:
      "Aggregate scores hide the family that fails completely. Stratify or you will ship a system that works well on average and not at all for one team.",
    services: ["evaluation-assurance"],
    branch: "join",
  },
  {
    id: "review",
    name: "Review",
    short: "Humans where the error is expensive",
    detail:
      "A review queue above a consequence threshold, a feedback control on every answer, and a sampled audit. Every adjudication writes back to the labelled set.",
    hardPart:
      "Review effort should fall over time. If it does not, the pipeline is not learning, and you want to know that in month two.",
    services: ["evaluation-assurance"],
    branch: "join",
  },
];

export const engagementShape = {
  heading: "How engagements are shaped",
  intro:
    "We are engaged to build and hand over, not to stay. Every engagement is scoped so that the people who will run the system afterwards have changed it themselves before we leave.",
  items: [
    {
      name: "Discovery, 2 to 3 weeks",
      detail:
        "A survey of the real sources, structured and documentary alike, with permission modelling and an evaluability screen. Ends with a written recommendation, including the recommendation not to proceed where that is the honest answer.",
    },
    {
      name: "Build, 8 to 16 weeks",
      detail:
        "Two-week increments against a working system, not a sequence of documents. Your engineers are in the repository from the first increment; a handover that begins at the end is a handover that fails.",
    },
    {
      name: "Assurance, in parallel",
      detail:
        "The harness is built alongside the pipeline, not after it, whether it measures answers or the numbers behind them. Nothing goes to users without a measured baseline it can be compared against.",
    },
    {
      name: "Handover and support",
      detail:
        "Runbooks, a rollback path that has been executed at least once against real data, and a defined support window that ends. If you need us permanently, something has gone wrong with the handover.",
    },
  ],
};

export const firstNinetyDays = {
  heading: "What the first 90 days looks like",
  intro:
    "Concrete enough to hold us to. Dates shift with the size of the estate and with access lead times; the sequence does not.",
  phases: [
    {
      window: "Days 1 to 15",
      title: "Survey and access",
      items: [
        "Stratified sample of the real sources, by format, era and owning system",
        "Permission model mapped, including whether it resolves per user at query time",
        "Access, environments and security review under way, usually the long pole",
        "Evaluability check: what does correct look like, and who adjudicates it",
      ],
    },
    {
      window: "Days 16 to 30",
      title: "Baseline and first slice",
      items: [
        "A labelled set of 200 to 400 items, built with the people who ask the questions",
        "Ingestion for the highest-value source only, one subject area or one document family",
        "A measured baseline, deliberately unimpressive, and the number every later change is compared against",
      ],
    },
    {
      window: "Days 31 to 60",
      title: "Build against the number",
      items: [
        "The branch the engagement needs, tuned against the labelled set: semantic layer and marts, or chunking, enrichment and retrieval",
        "Permission inheritance implemented and covered by a synthetic-user regression suite",
        "What the system refuses to do agreed with the people relying on it: a load that blocks, an answer that abstains",
        "Evaluation running in CI with thresholds that fail a build",
      ],
    },
    {
      window: "Days 61 to 90",
      title: "Production and handover",
      items: [
        "Deployment into your environment, behind your identity provider, inside your boundary",
        "Review queue and feedback loop live, writing corrections back into the labelled set",
        "Monitoring on freshness and quality per dataset, and on abstention rate and cost per answered question",
        "Runbooks, rollback executed once against real data, and your team making changes unaided",
      ],
    },
  ],
};

export const principles = [
  {
    name: "Mechanism over adjectives",
    detail:
      "Every claim we make about a system should be checkable by reading the pipeline. If it cannot be checked, it is marketing and we will leave it out.",
  },
  {
    name: "Measure before you improve",
    detail:
      "No change to retrieval before there is a baseline to compare it against. Improvements that cannot be demonstrated are indistinguishable from preferences.",
  },
  {
    name: "Abstention is a feature",
    detail:
      "A system that says it does not know is deployable in places a system that always answers is not.",
  },
  {
    name: "Build on what you already run",
    detail:
      "The fastest way to make a system unsupportable is to introduce a stack your team has no on-call experience with.",
  },
  {
    name: "Leave with the lights on",
    detail:
      "Documentation, runbooks and a rollback path that has actually been executed. The measure of a good handover is that nobody needs to call us.",
  },
];
