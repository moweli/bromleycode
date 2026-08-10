export type ServiceSection = {
  heading: string;
  body: string[];
};

export type Service = {
  slug: string;
  title: string;
  /** Nav and card label — shorter than the page title. */
  shortTitle: string;
  eyebrow: string;
  summary: string;
  /** Hero standfirst, one or two sentences. */
  standfirst: string;
  /** Section-break photograph. Atmosphere, not evidence — see MediaBand. */
  image: { src: string; alt: string };
  problem: ServiceSection;
  approach: {
    heading: string;
    intro: string;
    steps: { name: string; detail: string }[];
  };
  deliverables: { name: string; detail: string }[];
  /** The hard parts, named. This is what separates a firm that has shipped from one that has read about it. */
  hardParts: { question: string; answer: string }[];
  relatedCaseStudy: string;
  relatedServices: string[];
};

export const services: Service[] = [
  {
    slug: "data-platform-engineering",
    title: "Data and platform engineering",
    shortTitle: "Data & platform engineering",
    eyebrow: "Service 01",
    summary:
      "Warehouse and lakehouse build, migration, ingestion, modelling, and the contracts that keep the numbers trustworthy enough to act on.",
    standfirst:
      "Most AI programmes stall on data nobody fixed. So do most analytics programmes. We build the platform both of them depend on, and we build it to be handed over.",
    image: {
      src: "/media/services/data-platform-engineering.webp",
      alt: "Painted steel pipes turning through right angles across a plant wall.",
    },
    problem: {
      heading: "The problem this solves",
      body: [
        "The warehouse was built for a set of questions somebody had five years ago. Since then three source systems changed shape, two teams built their own extracts because the central one was too slow, and the number in the board pack no longer matches the number in the operational report. Nobody can say which is right without an afternoon of manual reconciliation.",
        "The usual response is a migration, and migrations usually ask for a freeze. The business will not grant one, so the work runs at half attention alongside the platform it is meant to replace, and the two drift.",
        "Underneath that sits a quieter problem. Almost nothing in the estate declares what it expects. A source changes a column type, the load coerces it, and dashboards stay green while the figures stop meaning what they meant. That is usually found months later by someone reconciling by hand.",
      ],
    },
    approach: {
      heading: "How we build it",
      intro:
        "Every stage below can be evaluated on its own, which is what makes a platform handoverable. If you cannot tell whether a number moved because the source changed, the model changed, or the load silently coerced something, you do not have a platform, you have a habit.",
      steps: [
        {
          name: "Estate survey",
          detail:
            "A sampled inventory before any build: row counts against what the business believes, update patterns, the joins that actually get used, and which of the three systems holding a customer record is treated as correct when they disagree.",
        },
        {
          name: "Ingestion and orchestration",
          detail:
            "Change-data capture where the source supports it, content hashing where it does not. Backfill and incremental run through the same code path, because two paths drift and only one of them is ever tested.",
        },
        {
          name: "Modelling",
          detail:
            "Dimensional models where the questions are known, wide tables where they are not. Slowly changing dimensions are decided per attribute rather than as a policy, because tracking history on everything is how a warehouse becomes unqueryable.",
        },
        {
          name: "Contracts and quality",
          detail:
            "Shape, range, freshness and referential expectations declared as tests that run on every load. A contract that only fails in a dashboard nobody opens is not a contract, so a breach either blocks the load or pages an owner.",
        },
        {
          name: "Semantic layer",
          detail:
            "Metric definitions live in one place with an owner, consumed by every tool rather than reimplemented in each. The alternative is the same number computed four ways in four tools, which is the state most teams are in when they ask us about AI.",
        },
      ],
    },
    deliverables: [
      {
        name: "Pipelines as code",
        detail:
          "Version-controlled, reviewed, deployed through your existing CI. No notebooks in production and no manually configured jobs.",
      },
      {
        name: "Observability",
        detail:
          "Per-stage metrics, lineage, and quality alerts wired into the tooling your team already watches.",
      },
      {
        name: "A tested recovery path",
        detail:
          "Backfill and rollback procedures that have been executed at least once against real data before handover, not documented and hoped for.",
      },
      {
        name: "Capacity and cost model",
        detail:
          "What the system costs today, what it costs at three times the volume, and which knob moves that number most.",
      },
    ],
    hardParts: [
      {
        question: "How do you migrate without a freeze?",
        answer:
          "Parallel running with reconciliation. The new platform is built alongside the old, both are loaded, and the outputs are compared row by row on an agreed set of measures until every difference is explained rather than merely small. Cutover happens per consumer, not per platform, so a failure affects one report rather than all of them.",
      },
      {
        question: "What happens when a source system changes underneath you?",
        answer:
          "Schema changes are detected on ingest and fail the load rather than propagating. That sounds obvious and is rare, because the tempting alternative, coercing the new shape into the old one, keeps every dashboard green while the numbers quietly stop meaning what they meant.",
      },
      {
        question: "How do you decide what to model first?",
        answer:
          "By what a decision depends on, not by what is easiest to load. The survey usually shows two or three subject areas carrying most of the questions. Those get modelled properly, and the rest lands raw and waits for a reason to exist.",
      },
      {
        question: "Who owns it after you leave?",
        answer:
          "Your team, and we treat that as an engineering requirement rather than a handover meeting. The transformation layer, the tests and the deployment pipeline are the ones your engineers change during the engagement, not after it.",
      },
    ],
    relatedCaseStudy: "warehouse-replatform-without-a-freeze",
    relatedServices: ["intelligence-extraction", "evaluation-assurance"],
  },
  {
    slug: "intelligence-extraction",
    title: "Intelligence extraction",
    shortTitle: "Intelligence extraction",
    eyebrow: "Service 02",
    summary:
      "Retrieval, extraction and enrichment over the documents, tickets, contracts and transcripts that never reached the warehouse.",
    standfirst:
      "Most of what an organisation knows is written down somewhere no query can reach. We build the pipelines that make it retrievable, attributable and safe to act on.",
    image: {
      src: "/media/services/intelligence-extraction.webp",
      alt: "A long archive aisle lined floor to ceiling with wooden index drawers.",
    },
    problem: {
      heading: "The problem this solves",
      body: [
        "Your warehouse holds what someone thought to model. It does not hold the surveyor's report, the supplier contract with the non-standard indemnity clause, the eighteen months of support tickets describing the same fault in nine different vocabularies, or the recorded call where a customer explained precisely why they left.",
        "The usual answer is a search box. Search returns documents; leaders need positions. The gap between the two is extraction, turning a corpus into a set of typed, attributed, contestable facts that a person can check and a system can aggregate.",
        "That gap is where most GenAI pilots stall. A demonstration over fifty clean PDFs proves nothing about a corpus of four hundred thousand documents with inconsistent scanning quality, three overlapping permission models, and twenty years of superseded revisions sitting alongside current ones.",
      ],
    },
    approach: {
      heading: "How we build it",
      intro:
        "The pipeline is assembled from stages we can each evaluate in isolation. That matters when something degrades: you need to know whether retrieval got worse, the parser broke on a new document template, or the model changed underneath you.",
      steps: [
        {
          name: "Corpus survey",
          detail:
            "Before any code, we sample the actual corpus: formats, scan quality, revision patterns, duplication rate, and the permission model each source enforces. The survey usually reveals that two or three document families account for most of the value, which changes what gets built first.",
        },
        {
          name: "Parsing and layout recovery",
          detail:
            "Native text where it exists, OCR where it does not, layout-aware parsing for anything tabular. Tables and appendices carry a disproportionate share of the answers and are what naive text extraction destroys first.",
        },
        {
          name: "Chunking",
          detail:
            "Structure-aware rather than fixed-window: sections, clauses and turns, with parent-document context retained and overlap tuned against a retrieval evaluation set rather than chosen by default. Chunk boundaries are the single most under-examined decision in most RAG systems.",
        },
        {
          name: "Enrichment",
          detail:
            "Entity resolution across sources, date and revision normalisation, document-type classification, and typed metadata extraction so retrieval can filter before it ranks. A hybrid filter on document type and date usually beats a better embedding model.",
        },
        {
          name: "Retrieval",
          detail:
            "Hybrid dense and lexical retrieval with reranking, tuned on a labelled evaluation set built from the questions people actually ask. We report recall@k and answer-supported rate, not vibes.",
        },
        {
          name: "Grounding and attribution",
          detail:
            "Every generated claim carries a citation back to a specific chunk of a specific revision. Answers without a supporting passage are refused rather than improvised: an abstention is a feature for this audience, not a failure.",
        },
        {
          name: "Permission inheritance",
          detail:
            "Access is resolved at query time against the source system's own ACLs, so a retrieved passage is only ever visible to someone who could already open the document it came from. Permissions are not a filter applied after retrieval; they are part of the index.",
        },
      ],
    },
    deliverables: [
      {
        name: "A running pipeline in your environment",
        detail:
          "Deployed on your cloud, in your network boundary, using your identity provider. No data leaves your tenancy unless you decide it should.",
      },
      {
        name: "An evaluation harness",
        detail:
          "A labelled question set, a scoring pipeline, and a regression suite that runs on every change, so the system's quality is a number your team can watch rather than an impression.",
      },
      {
        name: "The decisions, written down",
        detail:
          "Chunking strategy, retrieval configuration, model choices and their trade-offs, documented well enough that your engineers can change them after we leave.",
      },
      {
        name: "Handover and enablement",
        detail:
          "Working sessions with the team who will own it, not a slide deck. We consider the engagement finished when your people have changed something in the pipeline themselves.",
      },
    ],
    hardParts: [
      {
        question: "How do you stop it inventing things?",
        answer:
          "Three mechanisms, layered. Retrieval is tuned so the supporting passage is actually present in context; generation is constrained to cite specific retrieved spans; and any claim without a supporting span is refused rather than produced. We then measure the residual rate on a held-out set and report it. A system that abstains 8% of the time and is right the rest is far more useful to a regulated buyer than one that always answers.",
      },
      {
        question: "What happens when documents are contradictory or superseded?",
        answer:
          "Revision handling is a first-class stage, not a cleanup step. Documents carry effective-from and superseded-by metadata where the source system exposes it, and are inferred from content where it does not. Retrieval prefers current revisions and surfaces the conflict explicitly where two current documents disagree, because that conflict is usually the finding.",
      },
      {
        question: "How is permission inheritance actually preserved?",
        answer:
          "The index stores the source ACL alongside each chunk and re-resolves group membership at query time against your directory. A user's retrieval set is filtered before ranking, so ranked results never leak the existence of documents they cannot open. This is checked by a permissions regression suite that runs synthetic users against known-restricted content.",
      },
      {
        question: "Where does a human stay in the loop?",
        answer:
          "Wherever an error is expensive and reversible only by a person. Typically: a review queue for extractions above a value threshold, a feedback control on every answer that writes to the evaluation set, and a periodic sampled audit. The review effort should fall over time, if it does not, the pipeline is not improving and we would rather find that in month two than month ten.",
      },
    ],
    relatedCaseStudy: "asset-information-retrieval-water-utility",
    relatedServices: ["data-platform-engineering", "evaluation-assurance"],
  },
  {
    slug: "data-ai-strategy",
    title: "Data and AI strategy",
    shortTitle: "Data & AI strategy",
    eyebrow: "Service 03",
    summary:
      "A sequenced plan grounded in what your data can actually support, with the disqualifying constraints found before the budget is committed.",
    standfirst:
      "Most AI roadmaps fail on a data constraint that was discoverable in week one. We go looking for those constraints first, then sequence the work around what survives.",
    image: {
      src: "/media/services/data-ai-strategy.webp",
      alt: "A multi-level road interchange from the air in black and white, routes crossing and branching at several heights.",
    },
    problem: {
      heading: "The problem this solves",
      body: [
        "The typical roadmap is a list of use cases ranked by value and effort, where effort was estimated without anyone opening the underlying data. It survives contact with reality for about a quarter.",
        "The constraints that actually kill delivery are specific and findable: the corpus that turns out to be 60% scanned images at 150 dpi, the permission model that cannot be resolved per-user at query time, the contract that forbids the data leaving a jurisdiction, the process where nobody can define what a correct answer looks like.",
        "A useful roadmap is one where each item has been checked against those constraints, and where the sequence is chosen so the first delivery de-risks the second.",
      ],
    },
    approach: {
      heading: "How we do it",
      intro:
        "Typically six to eight weeks, run with your team rather than delivered to them. The output is a plan your engineers helped write and can therefore defend.",
      steps: [
        {
          name: "Opportunity capture",
          detail:
            "Structured interviews with the people doing the work, not only the people sponsoring it. The highest-value candidates are usually processes nobody has thought to describe because they are considered normal.",
        },
        {
          name: "Data feasibility",
          detail:
            "We open the corpora. Sampling for quality, coverage, permission model and revision hygiene, producing a feasibility rating per use case with the specific blocker named where one exists.",
        },
        {
          name: "Evaluability screening",
          detail:
            "For each candidate: what does correct look like, who can adjudicate it, and can we build a labelled set of a few hundred examples? A use case nobody can grade cannot be improved, and we would rather say so before it is funded.",
        },
        {
          name: "Sequencing",
          detail:
            "Ordered so early work builds reusable pipeline capability rather than isolated demos. The second use case should be cheaper than the first because of what the first left behind.",
        },
        {
          name: "Cost and capability modelling",
          detail:
            "Build and run costs per candidate, and an honest read on which parts your team can own now, which need hiring, and which are better bought.",
        },
        {
          name: "Governance",
          detail:
            "The approval path, the review points, and the model and data policies each use case has to satisfy, agreed with risk and legal during the engagement rather than discovered afterwards.",
        },
      ],
    },
    deliverables: [
      {
        name: "A sequenced roadmap",
        detail:
          "Twelve to twenty-four months, with dependencies, decision points and the explicit conditions under which an item should be dropped.",
      },
      {
        name: "Feasibility findings per use case",
        detail: "Including the ones we recommend against, with the reason stated plainly.",
      },
      {
        name: "A reference architecture",
        detail: "Target-state pipeline and platform design, sized to your estate rather than to a template.",
      },
      {
        name: "A costed first delivery",
        detail: "Scoped tightly enough to start within weeks of the roadmap being signed off.",
      },
    ],
    hardParts: [
      {
        question: "Will you tell us not to do something?",
        answer:
          "Regularly. The most common recommendation against is a use case where no one can define a correct answer, without that, there is nothing to evaluate, nothing to improve, and no way to know whether the system is getting better or worse. The second most common is a corpus whose permission model cannot be resolved per user, which makes the system undeployable to the audience that wanted it.",
      },
      {
        question: "How is this different from a strategy deck?",
        answer:
          "We open the data. Feasibility ratings come from sampling real corpora, not from a workshop. It is the difference between a plan that says 'contract analysis: high value, medium effort' and one that says 'contract analysis: 12,000 agreements, 71% native text, 29% scanned pre-2016 at variable quality, no clause-level metadata, so budget for a clause segmentation stage and expect two weeks of labelling before anything can be measured'.",
      },
    ],
    relatedCaseStudy: "ai-roadmap-professional-services",
    relatedServices: ["intelligence-extraction", "evaluation-assurance"],
  },
  {
    slug: "evaluation-assurance",
    title: "Evaluation and assurance",
    shortTitle: "Evaluation & assurance",
    eyebrow: "Service 04",
    summary:
      "Evaluation harnesses, adversarial testing and data contracts, so both the answers and the numbers underneath them can be checked.",
    standfirst:
      "Evaluating a model and contracting a dataset are the same discipline pointed at different objects. Both answer one question: can this be relied on, and how would you know.",
    image: {
      src: "/media/services/evaluation-assurance.webp",
      alt: "A repeating grid of windows across a building facade, a few panes picked out in black against the rest.",
    },
    problem: {
      heading: "The problem this solves",
      body: [
        "Most GenAI systems in production are evaluated by the people who built them, on examples they chose, at a point in time. That is not evidence. It is a demonstration with a sample size.",
        "The consequences arrive later: nobody notices when a model update moves behaviour, a prompt change silently degrades a subset of queries, or a new document family enters the corpus that the retrieval configuration handles badly. Without a regression suite, all three are invisible until a user complains.",
        "For regulated buyers there is a second problem. The system will eventually need to be explained to someone with the authority to stop it: an internal auditor, a regulator, a court. That conversation goes very differently when there is a measured error rate and a documented method.",
        "The same holds one layer down, and is more often missed. A published figure carries the same obligation as a generated answer: you have to be able to say where it came from and when it was last true.",
      ],
    },
    approach: {
      heading: "How we build it",
      intro:
        "Evaluation is built as infrastructure, not run as an exercise. It should be cheaper to check the system than to argue about it.",
      steps: [
        {
          name: "Question set construction",
          detail:
            "Several hundred real questions drawn from logs, interviews and the awkward cases people remember, labelled with acceptable answers and their supporting passages by someone with the authority to adjudicate.",
        },
        {
          name: "Retrieval evaluation",
          detail:
            "Recall@k, mean reciprocal rank and answer-supported rate measured per document family, because aggregate scores hide the family that fails completely.",
        },
        {
          name: "Generation evaluation",
          detail:
            "Faithfulness to retrieved context, citation correctness, and appropriate abstention. Scored with a rubric and an LLM judge, calibrated against human scores on a sample so the judge's own error rate is known.",
        },
        {
          name: "Adversarial and permission testing",
          detail:
            "Prompt injection through document content, attempts to elicit unsupported claims, and synthetic users probing whether restricted content can be surfaced or inferred. Run on every release.",
        },
        {
          name: "Regression in CI",
          detail:
            "The suite runs on every pipeline or prompt change, with thresholds that fail a build. Quality becomes something the team defends automatically rather than remembers to check.",
        },
        {
          name: "Production monitoring",
          detail:
            "Sampled live scoring, drift detection on retrieval quality, and a feedback control wired into the interface so real corrections flow back into the labelled set.",
        },
        {
          name: "Data contracts",
          detail:
            "Expectations about shape, range, freshness and referential integrity, declared next to the data they describe and run on every load. The point is that a breach stops something rather than being recorded somewhere.",
        },
        {
          name: "Lineage and freshness",
          detail:
            "Column-level lineage from source to consumed artefact, and a freshness SLA per dataset with an owner attached. When a figure looks wrong, the question is which upstream change caused it, and that needs an answer in minutes rather than an afternoon.",
        },
      ],
    },
    deliverables: [
      {
        name: "A labelled evaluation set",
        detail: "Owned by you, versioned, and growing from production feedback rather than frozen at handover.",
      },
      {
        name: "A regression suite in CI",
        detail: "With thresholds, so a change that degrades retrieval quality fails before it reaches users.",
      },
      {
        name: "An assurance pack",
        detail:
          "Method, measured error rates, known failure modes, and the mitigations in place, written for a risk committee rather than for engineers.",
      },
      {
        name: "Monitoring in production",
        detail: "Dashboards and alerts on retrieval quality, abstention rate and cost per answered question.",
      },
    ],
    hardParts: [
      {
        question: "Can an LLM judge be trusted to score another LLM?",
        answer:
          "Only with its own error rate measured. We calibrate every judge against human scores on a stratified sample, report the agreement rate, and treat the judge as an instrument with known precision rather than an oracle. Where agreement is poor, usually on nuanced faithfulness judgements, those categories stay human-scored.",
      },
      {
        question: "How large does a labelled set need to be?",
        answer:
          "Smaller than teams fear, and it needs to be stratified rather than large. Two to three hundred well-chosen questions covering each document family and each question type will detect the regressions that matter. Ten thousand unstratified questions will not, and will cost far more to maintain.",
      },
      {
        question: "What error rate is acceptable?",
        answer:
          "That is your decision, not ours, and it depends entirely on what the answer is used for and how reversible the consequence is. Our job is to make the number real, break it down by failure mode, and be explicit about the confidence interval, so the decision is made on evidence rather than on comfort.",
      },
    ],
    relatedCaseStudy: "platform-trustworthy-enough-to-publish-from",
    relatedServices: ["intelligence-extraction", "data-platform-engineering"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
