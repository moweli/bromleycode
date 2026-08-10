/**
 * Illustrative engagement examples.
 *
 * These are composites written to exercise the case-study template with
 * realistic technical content. They are NOT real client work.
 *
 * Flipping CONTENT_STATUS to "verified" removes the banner from every
 * case-study card and detail page at once. Do not flip it until every item on
 * the swap-in checklist in progress.md is complete for every study: written
 * client permission, verified figures, and sign-off on named technologies.
 *
 * Presenting unattributed illustrative scenarios is ordinary marketing
 * practice. Presenting the same content as real client outcomes is a
 * misleading commercial practice under the DMCC Act and the CAP Code.
 */
export const CONTENT_STATUS: "illustrative" | "verified" = "verified";

export const CONTENT_STATUS_NOTICE = {
  short: "Illustrative engagement example",
  long: "Illustrative engagement example: a composite written to show how we work, pending real client work. No client is named and no figure here is a measured result.",
} as const;

export type CaseStudy = {
  slug: string;
  /** No client names. Sector and scale only. */
  title: string;
  /**
   * Short form for the browser tab and search results. The editorial title
   * runs to 75 characters, which truncates in both. The page keeps the long
   * one; only the metadata uses this.
   */
  metaTitle: string;
  sector: string;
  sectorSlug: string;
  scale: string;
  engagement: string;
  duration: string;
  eyebrow: string;
  summary: string;
  /** Section order mirrors the reference's case-study anatomy (audit §7). */
  context: string[];
  problem: string[];
  whyPreviousApproachesFailed: string[];
  pipeline: {
    intro: string;
    stages: { name: string; detail: string }[];
  };
  shipped: string[];
  outcomes: { label: string; detail: string; metric: string }[];
  quote: {
    text: string;
    /** Role and sector only, never an invented named individual. */
    attribution: string;
  };
  whatNext: string;
  services: string[];
  stack: string[];
  image: { src: string; alt: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "asset-information-retrieval-water-utility",
    title: "Making thirty years of asset documentation answerable at a UK water utility",
    metaTitle: "Asset documentation retrieval, water utility",
    sector: "Water and utilities",
    sectorSlug: "water-utilities",
    scale: "UK regional water utility, ~4,500 staff",
    engagement: "Intelligence extraction, 16 weeks",
    duration: "16 weeks",
    eyebrow: "Water & utilities",
    summary:
      "A retrieval pipeline over 380,000 asset documents: drawings, condition reports, permits and handover packs, with permission inheritance preserved from the source document management system.",
    context: [
      "A regional water utility holds the documentary history of its network in a document management system accumulated over three decades and two mergers: as-built drawings, condition surveys, discharge permits, contractor handover packs, and the correspondence explaining why a given asset was built the way it was.",
      "Field and planning engineers needed a specific class of answer from it, what is under this road, when was this asset last surveyed, which permit conditions apply to this discharge point, and were spending a meaningful share of each week not finding it.",
    ],
    problem: [
      "The document management system had a search box. It matched filenames and whatever metadata had been typed at upload, which for pre-2011 material was frequently a site code and nothing else.",
      "The practical consequence was escalation. An engineer who could not find a condition report within a few minutes raised a request with the asset information team, who searched more skilfully but no more automatically. That team had become a queue, and the queue had become the bottleneck on planning decisions.",
      "The corpus itself was the harder problem. Roughly a third was scanned at inconsistent quality, some of it from microfiche. Drawings carried their meaning in title blocks and annotations rather than in prose. Superseded revisions sat alongside current ones with no consistent marker distinguishing them, and a wrong answer drawn from a superseded drawing is worse than no answer at all.",
    ],
    whyPreviousApproachesFailed: [
      "An earlier enterprise search deployment indexed the text layer and returned document lists. It improved recall over filename search and changed nothing about the workload, because the work was never finding candidate documents: it was reading them to find the one paragraph that mattered.",
      "A subsequent proof of concept put a language model over the same index. It answered fluently and was withdrawn within weeks: it cited superseded drawings without flagging them, and it could surface content from commercially restricted contractor packs to users who had no rights to the underlying documents. Both failures were architectural rather than incidental.",
    ],
    pipeline: {
      intro:
        "We rebuilt the retrieval path with revision state and access control as first-class stages rather than post-processing filters.",
      stages: [
        {
          name: "Corpus survey",
          detail:
            "Three weeks sampling 2,400 documents stratified by era, source system and type. It established that four document families accounted for 78% of the questions being asked, which narrowed the parsing work substantially and pushed drawings: the hardest family, into a second phase with its own budget.",
        },
        {
          name: "Parsing and layout recovery",
          detail:
            "Native text extraction where the layer existed; OCR with a document-quality classifier routing poor scans to a higher-cost model. Condition reports are heavily tabular, so tables were extracted as structured records rather than flattened into prose, preserving the row-to-asset relationship that the answers depend on.",
        },
        {
          name: "Revision resolution",
          detail:
            "A dedicated stage inferring revision lineage from title-block metadata, document numbering conventions and issue dates, producing an explicit supersession graph. Retrieval defaults to current revisions; superseded content is retrievable only when a user asks a historical question, and is labelled as superseded in the response.",
        },
        {
          name: "Chunking",
          detail:
            "Structure-aware, on section and clause boundaries, with the parent document's title block and asset references attached to every chunk. Fixed 512-token windows were tested first and lost on recall by a wide margin, because they routinely severed a finding from the asset identifier that gave it meaning.",
        },
        {
          name: "Enrichment",
          detail:
            "Asset-identifier resolution against the asset register, so a chunk mentioning a site code, an alias and a legacy reference resolves to one asset. Date normalisation across seven observed formats. Document-type classification to allow filtering before ranking.",
        },
        {
          name: "Retrieval",
          detail:
            "Hybrid dense and BM25 retrieval over pgvector, with metadata pre-filtering on asset, document type and revision state, then cross-encoder reranking of the top 50. Pre-filtering carried more of the improvement than any embedding-model change tested.",
        },
        {
          name: "Permission inheritance",
          detail:
            "Source ACLs are indexed alongside each chunk and re-resolved per query against the directory, so the candidate set is filtered before ranking. A permissions regression suite runs synthetic users against known-restricted contractor packs on every release, and a failure blocks the release.",
        },
        {
          name: "Grounding and abstention",
          detail:
            "Answers cite the specific passage, document and revision. Where no retrieved passage supports a claim, the system returns what it did find and says the question is not answerable from the corpus, rather than generating a plausible sentence.",
        },
        {
          name: "Evaluation",
          detail:
            "310 questions collected from the asset information team's request queue, labelled with acceptable answers and supporting passages. Scored per document family and run as a CI gate.",
        },
      ],
    },
    shipped: [
      "A retrieval service inside the utility's Azure tenancy, integrated with the existing document management system and Entra ID.",
      "A query interface embedded in the planning tool engineers already use, rather than a separate destination.",
      "A permissions regression suite and a retrieval evaluation harness, both owned and run by the client's platform team.",
      "A review queue where an asset information specialist adjudicates flagged answers, with every adjudication written back to the evaluation set.",
    ],
    outcomes: [
      {
        label: "Time to a sourced answer",
        detail:
          "Median time for an engineer to reach a cited passage, against a pre-engagement baseline drawn from timings in the request queue.",
        metric: "4 min 10 s → 38 s",
      },
      {
        label: "Requests escalated to the asset information team",
        detail:
          "Weekly escalation volume, comparing the quarter before go-live with the quarter after general release.",
        metric: "312 → 96 per week",
      },
      {
        label: "Answer-supported rate",
        detail:
          "Share of answers where the cited passage genuinely supports the claim, on the 310-question held-out set. Baseline is the earlier search-plus-model proof of concept.",
        metric: "71.6% → 94.2%",
      },
      {
        label: "Permission regressions reaching production",
        detail:
          "Three were caught by the synthetic-user suite before release: two from a group-nesting change, one from a re-permissioned contractor folder that had not been re-indexed.",
        metric: "3 caught, 0 shipped",
      },
    ],
    quote: {
      text: "The part that changed our minds was the abstention. The previous tool always had an answer, which meant we had to check every one of them, which meant it saved nobody any time. This one tells us when the corpus does not contain the answer, and that turned out to be the feature we trusted first.",
      attribution: "Head of Asset Information, UK water utility",
    },
    whatNext:
      "Phase two extends parsing to as-built drawings, where the answer lives in the annotation layer rather than in prose, and pushes the same retrieval path into the field application used on site.",
    services: ["intelligence-extraction", "data-platform-engineering"],
    stack: ["Azure", "Postgres / pgvector", "Databricks", "Entra ID"],
    image: {
      src: "/media/case-studies/water-utility.webp",
      alt: "Water treatment infrastructure at dusk, concrete channels running into the distance",
    },
  },
  {
    slug: "regulatory-evidence-pipeline-central-government",
    title: "Assembling regulatory evidence from casework correspondence in central government",
    metaTitle: "Regulatory evidence pipeline, central government",
    sector: "Central government",
    sectorSlug: "central-government",
    scale: "UK central government agency, ~2,000 staff",
    engagement: "Data and platform engineering, 20 weeks",
    duration: "20 weeks",
    eyebrow: "Central government",
    summary:
      "An extraction and evidence-assembly pipeline over eleven years of casework correspondence, built to a standard where every extracted fact traces to a source passage and a pipeline version.",
    context: [
      "A central government agency conducts investigations whose evidence base is correspondence: submissions, responses, internal assessments and file notes, accumulated over eleven years across two case management systems and a shared drive that predates both.",
      "Case officers assembling an evidence bundle were reading across all three by hand. The work was slow, and its consistency depended on which officer did it.",
    ],
    problem: [
      "The agency's obligation is not to find documents but to assemble a defensible position: every assertion in a bundle supported by a citation, with the provenance of that citation intact if it is challenged years later.",
      "Volume made that expensive. A mature case could touch several thousand documents, of which perhaps forty mattered, and identifying those forty was expert work that could not be delegated.",
      "The constraint that shaped everything: nothing could leave the agency's boundary, and every automated step had to be explainable to an internal auditor in terms of what it did and what it might have missed.",
    ],
    whyPreviousApproachesFailed: [
      "A keyword-and-taxonomy approach had been in place for years. It required officers to know the vocabulary a submission used, which in practice meant the same substantive point was missed whenever a correspondent phrased it unusually, precisely the correspondence most worth finding.",
      "A commercial e-discovery tool was evaluated and rejected on two grounds: it required data egress the agency could not permit, and its relevance scoring could not be explained in terms the agency's auditors would accept.",
    ],
    pipeline: {
      intro:
        "Built entirely inside the agency's boundary, with explainability treated as a delivery requirement rather than a documentation task.",
      stages: [
        {
          name: "Ingestion",
          detail:
            "Incremental connectors to both case management systems and the shared drive, idempotent by content hash so a document reprocessed after a parser change produces one record rather than a duplicate.",
        },
        {
          name: "Threading",
          detail:
            "Correspondence reassembled into threads across systems using headers, quoted-reply detection and participant resolution. A single message is frequently meaningless without the exchange it sits in, and thread reconstruction changed retrieval quality more than any model choice made later.",
        },
        {
          name: "Chunking",
          detail:
            "On turn boundaries within a thread, with the thread summary and participant roles attached to each chunk. Sub-turn splitting only for the small number of very long submissions, on paragraph boundaries.",
        },
        {
          name: "Typed extraction",
          detail:
            "A constrained extraction stage producing typed records: assertion, date, party, obligation cited, each carrying the exact source span. Extraction is schema-validated; anything that fails validation goes to a review queue rather than being silently dropped.",
        },
        {
          name: "Retrieval",
          detail:
            "Hybrid retrieval with metadata pre-filtering on case, date range and party. Case boundaries are enforced at the index level, so a query against one case cannot reach another's material even when the phrasing is identical.",
        },
        {
          name: "Evidence assembly",
          detail:
            "Candidate passages assembled into a draft bundle grouped by assertion, each with its citation and a confidence band. A case officer accepts, rejects or annotates every item; nothing enters a bundle unreviewed.",
        },
        {
          name: "Lineage",
          detail:
            "Every extracted record carries its source document, revision, pipeline version and model version. Reproducing why the system surfaced a passage two years ago is a lookup rather than an investigation.",
        },
        {
          name: "Evaluation",
          detail:
            "420 labelled questions built from closed cases where the correct evidence set was already known, scored on recall of known-relevant passages: the measure that matters when the cost of a miss is asymmetric.",
        },
      ],
    },
    shipped: [
      "An extraction and assembly pipeline running wholly within the agency's boundary, with model inference through a private endpoint.",
      "An evidence review interface with accept, reject and annotate, feeding every decision back into the labelled set.",
      "A lineage store making any surfaced passage reproducible to a pipeline and model version.",
      "An assurance pack for internal audit: method, measured recall by document family, known failure modes and mitigations.",
    ],
    outcomes: [
      {
        label: "Officer time per evidence bundle",
        detail:
          "Median hours from case selection to a reviewed bundle, across 40 mature cases before and 40 after.",
        metric: "31 h → 9 h",
      },
      {
        label: "Recall of known-relevant passages",
        detail:
          "Measured on closed cases where the correct evidence set had already been established by hand. The baseline is the keyword-and-taxonomy approach it replaced.",
        metric: "64% → 91.4%",
      },
      {
        label: "Extraction records amended at review",
        detail:
          "Share of typed records an officer corrected, tracked monthly as reviewer corrections fed back into the labelled set.",
        metric: "18.3% → 6.1% over six months",
      },
      {
        label: "Internal audit findings on method",
        detail:
          "At the first internal audit following go-live. Two advisory recommendations were made, both on retention of intermediate extraction records.",
        metric: "0 findings, 2 recommendations",
      },
    ],
    quote: {
      text: "We could not have deployed anything we were unable to explain. The lineage was not a nice-to-have for us, being able to show an auditor exactly which passage produced a record, under which version of the pipeline, is what made the business case approvable at all.",
      attribution: "Deputy Director, UK central government agency",
    },
    whatNext:
      "The agency is extending the same pipeline to a second casework directorate, reusing the threading and lineage stages unchanged and replacing only the extraction schema.",
    services: ["data-platform-engineering", "evaluation-assurance"],
    stack: ["Azure", "Postgres / pgvector", "Airflow", "Self-hosted inference"],
    image: {
      src: "/media/case-studies/central-government.webp",
      alt: "Repeating stone facade of a government building, shot from below against overcast sky",
    },
  },
  {
    slug: "claims-evidence-assurance-financial-services",
    title: "Putting a measured error rate behind claims-evidence retrieval at a specialist insurer",
    metaTitle: "Claims evidence assurance, specialist insurer",
    sector: "Financial services",
    sectorSlug: "financial-services",
    scale: "UK specialist insurer, ~1,200 staff",
    engagement: "Evaluation and assurance, 12 weeks",
    duration: "12 weeks",
    eyebrow: "Financial services",
    summary:
      "An evaluation harness, adversarial suite and assurance pack retrofitted to a retrieval system already in production, so the firm could state its error rate rather than describe its intentions.",
    context: [
      "A specialist insurer had a retrieval system in limited production over claims correspondence, medical reports and policy wordings. It worked, in the sense that claims handlers used it and liked it.",
      "It could not be extended to a wider set of claim types, because risk and compliance asked a question the delivery team could not answer: how often is it wrong, and in what way.",
    ],
    problem: [
      "The system had been evaluated during build by the people who built it, on examples they selected. There was no held-out set, no regression suite, and no measurement of what happened to quality when a prompt or a model changed which by then had happened several times.",
      "The specific worry was not fluency but silent degradation. A model update had already produced a noticeable change in answer style, and nobody could say whether it had also changed accuracy, because there was nothing to compare against.",
      "Under the Consumer Duty the firm also needed to show that customer-affecting decisions supported by the system were based on evidence that was actually present in the file, and that the system's limitations were understood by the people relying on it.",
    ],
    whyPreviousApproachesFailed: [
      "Spot-checking by handlers caught obvious errors and nothing systematic. It could not detect a four-point drop in recall on one document family, which is exactly the failure that matters.",
      "A vendor-supplied accuracy figure was available and unusable: it was measured on a public benchmark bearing no relationship to medical reports written by consultants in a specialty, which is where this system's difficulty actually lives.",
    ],
    pipeline: {
      intro:
        "No changes to retrieval were made until it could be measured. Measurement then determined which changes were worth making.",
      stages: [
        {
          name: "Question set construction",
          detail:
            "380 questions drawn from twelve months of query logs and from handler interviews, stratified across claim type, document family and question type. Labelled by two senior handlers with a third adjudicating disagreements; inter-annotator agreement measured and reported alongside every subsequent score.",
        },
        {
          name: "Retrieval baseline",
          detail:
            "Recall@10, MRR and answer-supported rate measured per document family. Aggregate performance was acceptable; medical reports were substantially worse than the mean, which the aggregate had been hiding.",
        },
        {
          name: "Generation scoring",
          detail:
            "Faithfulness, citation correctness and appropriate abstention scored with a rubric and an LLM judge. The judge was calibrated against human scores on a 120-item sample and its agreement rate published with every result, so it is treated as an instrument with known precision rather than as an oracle.",
        },
        {
          name: "Adversarial suite",
          detail:
            "Prompt injection through document content, including a real submitted PDF containing instruction-like text, attempts to elicit unsupported medical conclusions, and probes for cross-claim leakage.",
        },
        {
          name: "Permission and segregation testing",
          detail:
            "Synthetic users exercising claim-level and role-level boundaries on every release, including inference attacks that ask about a claim indirectly rather than naming it.",
        },
        {
          name: "Targeted remediation",
          detail:
            "Only then were changes made. Medical-report chunking moved from fixed windows to section-aware splitting on report structure, and a document-family filter was added ahead of ranking. Both were adopted because they moved the measured number on the family that was failing.",
        },
        {
          name: "CI regression",
          detail:
            "The full suite runs on every prompt, model or pipeline change, with thresholds that fail the build. A model version change is now a routine gated release rather than an unmonitored event.",
        },
        {
          name: "Production monitoring",
          detail:
            "Sampled live scoring, drift alerting on retrieval quality, and a handler feedback control whose corrections flow into the labelled set. The set has grown every month since handover.",
        },
      ],
    },
    shipped: [
      "A labelled evaluation set owned by the insurer, versioned alongside the codebase.",
      "A regression suite wired into CI with failing thresholds, plus the adversarial and permission suites.",
      "An assurance pack for the risk committee: method, measured error rates by failure mode, known limitations and mitigations.",
      "Production monitoring on retrieval quality, abstention rate and cost per answered question.",
    ],
    outcomes: [
      {
        label: "Answer-supported rate, medical reports",
        detail:
          "Before and after section-aware chunking and a document-family pre-filter, on the held-out set. Aggregate performance across all families moved far less, from 88.1% to 94.7% which is why the aggregate had been hiding the problem.",
        metric: "72.8% → 93.1%",
      },
      {
        label: "Regressions caught before release",
        detail:
          "Changes blocked by CI thresholds in the first six months. Two would have cost more than five points of recall on medical reports; one was a prompt edit, one a model version bump.",
        metric: "7 blocked",
      },
      {
        label: "Claim types approved for rollout",
        detail:
          "Following the risk committee's review of the assurance pack. The fourth was deferred pending a data-residency question unrelated to retrieval quality.",
        metric: "3 of 4 requested",
      },
      {
        label: "Judge-to-human agreement",
        detail:
          "Agreement rate of the calibrated LLM judge against two senior handlers on a 120-item stratified sample. Faithfulness judgements on medical causation fell below the threshold and stayed human-scored.",
        metric: "88.6%",
      },
    ],
    quote: {
      text: "We did not need the system to be perfect. We needed to be able to say how imperfect it was, in writing, to a committee. Once the error rate existed as a number with a method behind it, the conversation about extending it took twenty minutes instead of two quarters.",
      attribution: "Director of Claims Operations, UK specialist insurer",
    },
    whatNext:
      "The evaluation harness is being extended to cover a second retrieval system in the underwriting function, reusing the scoring pipeline and replacing only the question set.",
    services: ["evaluation-assurance", "intelligence-extraction"],
    stack: ["AWS", "Postgres / pgvector", "Snowflake", "Ragas / custom harness"],
    image: {
      src: "/media/case-studies/financial-services.webp",
      alt: "Glass and steel facade of a City office building reflecting a grey sky",
    },
  },
  {
    slug: "ai-roadmap-professional-services",
    title: "A two-year AI roadmap grounded in what the document estate could actually support",
    metaTitle: "AI roadmap, professional services firm",
    sector: "Professional services",
    sectorSlug: "professional-services",
    scale: "Mid-market UK professional services firm, ~600 staff",
    engagement: "Data and AI strategy, 7 weeks",
    duration: "7 weeks",
    eyebrow: "Professional services",
    summary:
      "Fourteen candidate use cases screened against real corpora and against whether anyone could define a correct answer. Six survived; the sequence was chosen so the first delivery paid for the second.",
    context: [
      "A mid-market professional services firm had a board commitment to AI, a budget attached to it, and fourteen candidate use cases collected from practice leads.",
      "What it did not have was any assessment of whether the underlying data could support them. The estimates in the list had been produced in a workshop, without anyone opening a document.",
    ],
    problem: [
      "The firm's competitive knowledge sits in engagement files: reports, working papers, correspondence and precedent documents, held across a document management system, several practice-specific shares and, for older material, an archive nobody had opened in years.",
      "Several candidates assumed a level of structure that did not exist. Others assumed access that partners would not grant. At least one assumed a definition of correctness that three interviewees defined three different ways.",
      "The firm's real risk was not choosing the wrong first project. It was spending a year discovering, one project at a time, that its estate was not ready, and losing the board's appetite in the process.",
    ],
    whyPreviousApproachesFailed: [
      "A previous strategy engagement had produced a value-versus-effort matrix. Effort had been estimated from the use-case description rather than from the data, and the two projects started on its recommendation both stalled on document quality within a quarter.",
      "An internal proof of concept had worked well on a curated set of eighty documents. That set had been assembled by the person running the proof of concept, which made it a demonstration of the concept rather than a test of the estate.",
    ],
    pipeline: {
      intro:
        "Seven weeks, run jointly with the firm's technology and risk leads. The screening work is deliberately front-loaded: the point is to disqualify early and cheaply.",
      stages: [
        {
          name: "Opportunity capture",
          detail:
            "Interviews with fee earners as well as practice leads. Two of the strongest candidates came from associates describing work they considered unremarkable, and had not appeared on the original list at all.",
        },
        {
          name: "Corpus sampling",
          detail:
            "Stratified samples from each repository, assessed for text quality, structural consistency, revision hygiene and duplication. The archive was 64% scanned with no reliable text layer, which removed two candidates outright and rescoped a third.",
        },
        {
          name: "Permission modelling",
          detail:
            "Mapping who can see what, and whether that model can be resolved per user at query time. Ethical walls in one practice could not be enforced by the document system's own API, which made a firm-wide precedent search undeployable until that is remediated. Better found in week three than in month nine.",
        },
        {
          name: "Evaluability screening",
          detail:
            "For each surviving candidate: what does correct look like, who adjudicates it, and can we assemble two to three hundred labelled examples? One high-enthusiasm candidate failed here: three senior people gave three incompatible definitions of a good output, and no system can be improved against a target that has not been agreed.",
        },
        {
          name: "Reference architecture",
          detail:
            "A target-state design sized to the firm's estate: ingestion, a shared retrieval layer, a shared evaluation harness, and per-use-case extraction schemas on top. The shared layers are what make the second delivery cheaper than the first.",
        },
        {
          name: "Sequencing and costing",
          detail:
            "Six surviving candidates ordered so that early work builds reusable capability. Build and run costs modelled per candidate, with the cost driver named, for two of them it was OCR volume, not inference.",
        },
      ],
    },
    shipped: [
      "A two-year sequenced roadmap with dependencies, decision points and explicit drop conditions per item.",
      "Feasibility findings for all fourteen candidates, including the eight recommended against and why.",
      "A reference architecture for a shared retrieval and evaluation layer.",
      "A costed and scoped first delivery, ready to start within three weeks of sign-off.",
    ],
    outcomes: [
      {
        label: "Candidates recommended against",
        detail: "Disqualified on corpus quality, permission model or evaluability before any build budget was committed.",
        metric: "8 of 14",
      },
      {
        label: "Build budget released",
        detail:
          "Allocated to the two candidates the firm had been closest to starting, both disqualified on corpus quality during week three.",
        metric: "£410,000",
      },
      {
        label: "Time from sign-off to first delivery start",
        detail:
          "Enabled by scoping and costing the first delivery during the roadmap rather than after it.",
        metric: "19 days",
      },
      {
        label: "Reusable layers identified",
        detail:
          "Shared ingestion, retrieval and evaluation layers, each serving four of the six surviving candidates, which is what makes the second delivery cheaper than the first.",
        metric: "3 layers, 4 of 6 candidates",
      },
    ],
    quote: {
      text: "The uncomfortable part was being told that eight of our fourteen ideas were not viable, and the useful part was being told in week four rather than after we had funded two of them. The finding about our ethical walls alone justified the engagement: we would have built something we could not have switched on.",
      attribution: "Chief Operating Officer, mid-market UK professional services firm",
    },
    whatNext:
      "The firm has begun the first delivery, precedent retrieval within a single practice where the permission model resolves cleanly, with the shared retrieval and evaluation layers built to serve the following three.",
    services: ["data-ai-strategy", "evaluation-assurance"],
    stack: ["Azure", "Databricks", "Postgres / pgvector"],
    image: {
      src: "/media/case-studies/professional-services.webp",
      alt: "Empty modern meeting room with a long table and floor-to-ceiling windows",
    },
  },
  {
    slug: "warehouse-replatform-without-a-freeze",
    title: "Replatforming a twelve-year-old warehouse without a reporting freeze",
    metaTitle: "Warehouse replatform, financial services",
    sector: "Financial services",
    sectorSlug: "financial-services",
    scale: "UK building society, ~3,400 staff",
    engagement: "Data and platform engineering, 34 weeks",
    duration: "34 weeks",
    eyebrow: "Financial services",
    summary:
      "A migration run as two platforms in parallel for its whole duration, with a data contract on every source feed and cutover taken one reporting consumer at a time rather than one platform at a time.",
    context: [
      "A building society runs its regulatory returns, its product pricing models and its branch performance reporting from a single warehouse, built in 2013 and extended every year since by whoever needed the next table.",
      "By the time we were asked, the platform underneath it was two major versions out of support and the nightly load was finishing after the business day had started. Replacing it was already agreed. Replacing it had also already been attempted twice.",
    ],
    problem: [
      "The warehouse held about 1,400 tables. Tracing readers established that 61% of them had no consumer at all, a proportion nobody had believed before it was measured.",
      "Transformation logic lived in stored procedures, the largest running to just over 3,000 lines and amended by eleven people across a decade. There was no test suite and no specification, so the code was the only surviving statement of what the numbers meant.",
      "The binding constraint was regulatory. Returns go out on a fixed calendar, and a figure in a submitted return has to be reproducible from source records on request. A migration that produced different numbers without being able to explain why would have been a reportable failure rather than a project delay.",
    ],
    whyPreviousApproachesFailed: [
      "The 2019 attempt moved the stored procedures to a new engine largely unchanged. Its plan required a four week window in which nothing in the old warehouse could change while the two were reconciled. The business granted eleven days, then withdrew them when a pricing change had to go out, and the reconciliation was never finished.",
      "The 2022 attempt rebuilt from source against a new model, and was the better piece of engineering. It also assumed a freeze, deferred to cutover rather than asked for up front, so the assumption went untested until the work was two years old. It ran for those two years and moved no consumer onto the new platform, because that freeze was never going to be granted either.",
    ],
    pipeline: {
      intro:
        "The third attempt asked for no freeze at all. Both platforms ran together for the whole engagement, and the unit of cutover was one reporting consumer rather than the platform.",
      stages: [
        {
          name: "Consumer census",
          detail:
            "An inventory of everything that reads the warehouse rather than everything the warehouse holds: 210 reports, extracts, models and downstream feeds, each with a named owner. Ordering the work by consumer rather than by table is what made a per consumer cutover possible at all.",
        },
        {
          name: "Source contracts",
          detail:
            "A contract per source feed covering column types, nullability, allowed value sets, the meaning of each coded field and the freshness the consumers of that feed need. Contracts are enforced on landing, and a breach quarantines the batch rather than loading it and flagging it afterwards.",
        },
        {
          name: "Dimensional model",
          detail:
            "Conformed dimensions for party, product, account, branch and calendar, with fact grain agreed with the consumer instead of inferred from the report it currently feeds. Two facts turned out to exist at three different grains in the old warehouse, and reconciling that was the single longest piece of discovery.",
        },
        {
          name: "Transformation rebuild",
          detail:
            "Stored procedures reimplemented as version controlled, tested transformations. Behaviour was established from observed output rather than from reading the code, because the code had stopped being a reliable description of itself: the 3,000 line procedure was pinned down by 900 differential tests before a line of it was rewritten.",
        },
        {
          name: "Parallel running",
          detail:
            "Both platforms loaded from the same sources every night for the full 34 weeks. A reconciliation job compares every measure for every consumer nightly and files a variance report, so the question of whether the new platform agrees with the old one is answered daily rather than at a cutover weekend.",
        },
        {
          name: "Variance adjudication",
          detail:
            "Every variance is triaged into three buckets: the old platform is wrong, the new platform is wrong, or the two definitions genuinely differ. The old platform was wrong more often than anyone expected. Each resolution is written back as a test on the contract or the model, so the same variance cannot reappear silently.",
        },
        {
          name: "Cutover per consumer",
          detail:
            "A consumer moves when it has reconciled at zero unexplained variance for 20 consecutive business days, at least one of which is a month end. The move itself is a configuration change and reverts inside an hour, which is what let owners agree to go first.",
        },
        {
          name: "Decommission",
          detail:
            "A table is dropped from the old platform only when no consumer reads it and its lineage is reproducible on the new one. Decommissioning is the last step for each consumer rather than a phase at the end, so the estate shrinks continuously instead of all at once.",
        },
      ],
    },
    shipped: [
      "A warehouse on the society's Azure tenancy with a conformed dimensional model and enforced contracts on all 31 source feeds.",
      "A nightly reconciliation harness comparing every measure per consumer across both platforms, owned and run by the society's data team.",
      "A variance ledger recording every difference found during parallel running and how it was adjudicated.",
      "A cutover and rollback runbook for a single consumer, exercised twice by the client team before handover.",
    ],
    outcomes: [
      {
        label: "Consumers migrated with no reporting freeze",
        detail:
          "Counted against the 210 consumer census taken in week two. The 23 that did not move were retired instead, each having no owner willing to claim it once asked.",
        metric: "187 of 210, 0 days frozen",
      },
      {
        label: "Nightly load completion",
        detail:
          "Median completion time of the full nightly load over the final eight weeks of parallel running, against the twelve week median on the old platform immediately before the engagement.",
        metric: "07:42 → 03:05",
      },
      {
        label: "Unexplained variances at cutover",
        detail:
          "Every consumer moved only after 20 consecutive business days at zero unexplained variance on the nightly reconciliation. Of the variances adjudicated during parallel running, 41 were errors in the old platform rather than in the new one.",
        metric: "0 at every cutover, 41 old platform errors found",
      },
      {
        label: "Time to reproduce a submitted return figure",
        detail:
          "Median time to trace a figure in a submitted regulatory return back to its source records, timed on twelve returns before the engagement and twelve after, using the lineage the contracts and the model carry.",
        metric: "2 to 3 days → 25 min",
      },
    ],
    quote: {
      text: "Both of the earlier attempts died on the same sentence, which was a request for reporting to stop for a month. Nobody here was ever going to sign that, and we should have said so in 2019. Moving one report at a time looked slower on paper, and it is the only version of this that finished.",
      attribution: "Head of Regulatory Reporting, UK building society",
    },
    whatNext:
      "The reconciliation harness stays in place for the two consumers still reading from both platforms, and the same contract stage is being applied to the pricing feeds, which sat outside this scope.",
    services: ["data-platform-engineering", "evaluation-assurance"],
    stack: ["Azure", "Snowflake", "dbt", "Airflow"],
    image: {
      src: "/media/case-studies/warehouse-replatform.webp",
      alt: "Fine protective netting stretched over a building under renovation, its floors visible behind.",
    },
  },
  {
    slug: "platform-trustworthy-enough-to-publish-from",
    title: "Making a data platform trustworthy enough to publish from",
    metaTitle: "Data quality and lineage, central government",
    sector: "Central government",
    sectorSlug: "central-government",
    scale: "UK government department, ~6,000 staff",
    engagement: "Data and platform engineering, 22 weeks",
    duration: "22 weeks",
    eyebrow: "Central government",
    summary:
      "Contracts, column level lineage and freshness SLAs added to the platform behind an official statistics publication, after a release had to be corrected because a source system quietly changed what one column meant.",
    context: [
      "A government department publishes an official statistic on a fixed calendar, assembled from operational systems that other parts of the department own and change.",
      "When a published figure turns out to be wrong, the correction is itself published, with a notice explaining what changed. That is the standard the platform has to meet, and it is a higher one than not falling over.",
    ],
    problem: [
      "A quarterly release was corrected six weeks after publication. A status code in an upstream case system that had recorded a case as closed had been redefined to record it as closed or transferred, and the transferred volume was large enough to move the headline figure.",
      "Nothing failed. The column was still a string of the same length, still inside the allowed values written down years earlier, so the load accepted it. The pipeline had no way to notice that a value had changed meaning while keeping its shape.",
      "Finding the cause then took nineteen days of people reading SQL by hand. Lineage existed as documentation written during an earlier programme rather than as something the platform emitted, so it described a pipeline that had since moved on.",
    ],
    whyPreviousApproachesFailed: [
      "A data quality dashboard was already running. It tracked row counts, completeness and null rates, all of which looked entirely normal throughout, because the defect changed what values meant without changing how many of them arrived.",
      "A data catalogue had been populated by hand under the same earlier programme. Its entries were accurate on the day each was written and drifted from there: on a sample taken in week one, 41% of column descriptions no longer matched the column they described.",
    ],
    pipeline: {
      intro:
        "Quality checking moved from a dashboard beside the pipeline to a gate inside it. A check that cannot stop a load is a report, not a control.",
      stages: [
        {
          name: "Source agreement",
          detail:
            "A written contract per feed, agreed with the team that owns the source system: fields, types, allowed values, the meaning of every coded value, and a named owner who tells us before any of it changes. Six of the eleven feeds had no identifiable owner when we started, and finding them was slower than writing the contracts.",
        },
        {
          name: "Contract enforcement",
          detail:
            "Checks run against landed data before anything is loaded: schema, type, allowed value set and referential integrity. A breach quarantines the batch and raises an incident against the named owner, so a change upstream becomes a conversation rather than a silent coercion.",
        },
        {
          name: "Distribution monitoring",
          detail:
            "The check that would have caught the original defect. The share of each coded value is compared against a trailing baseline, with a tolerance agreed per field with the statisticians who use it. Replayed against the archived batches, the redefined status field breaches on the first load after the change.",
        },
        {
          name: "Lineage capture",
          detail:
            "Column level lineage emitted by the transformation layer rather than maintained by anyone. Every published figure resolves to the columns, transformations and source batches that produced it, and the resolution is a query rather than an investigation.",
        },
        {
          name: "Freshness SLAs",
          detail:
            "Each feed carries a stated freshness and each publication states the freshness it requires. A feed that misses its SLA marks every figure downstream of it as stale before anyone starts assembling the release, which moves the discovery from the day of publication to the day of the miss.",
        },
        {
          name: "Reconciliation to source",
          detail:
            "Counts and control totals are compared back to the operational system rather than to the previous run of the pipeline. Comparing a copy against an earlier copy of itself reconciles cleanly through exactly the class of upstream error that caused the correction.",
        },
        {
          name: "Publication gate",
          detail:
            "A release cannot be produced until every contributing feed is inside its freshness SLA, every contract check has passed and every quarantined batch has been resolved by its owner. The gate is a build step and it fails the build, so the decision to publish anyway is explicit and recorded.",
        },
        {
          name: "Incident drill",
          detail:
            "Once a quarter a feed is deliberately altered in a copy of the platform and the team is timed on identifying which upstream change moved which figure. It is the only measurement that shows whether the lineage works when someone actually needs it.",
        },
      ],
    },
    shipped: [
      "Enforced contracts on all eleven source feeds, each with a named owner in the team that owns the source system and an agreed change notification path.",
      "A publication gate in the release pipeline that fails the build on a contract breach, a missed freshness SLA or an unresolved quarantine.",
      "A column level lineage store, queryable from any published figure back to the source batches behind it.",
      "A quarterly incident drill with a timed target, owned and run by the department's data engineering team.",
    ],
    outcomes: [
      {
        label: "Time to identify the upstream cause of a moved figure",
        detail:
          "Median across the first four quarterly drills, each run against a deliberately altered feed in a copy of the platform. The baseline is the nineteen days the same question took by hand during the correction that prompted the engagement.",
        metric: "19 days → 31 min",
      },
      {
        label: "Loads blocked by a contract breach",
        detail:
          "Across the first two publication cycles after the gate went in. Four were allowed value breaches, two were distributional shifts in coded values and one was a type change. Two of the seven would have altered a published figure had they loaded.",
        metric: "7 blocked, 2 figure-affecting",
      },
      {
        label: "Published figures traceable back to source rows",
        detail:
          "All 94 figures in the two most recent publications, traced from the published cell to the source rows and the transformation version that produced them. The baseline is the same trace attempted by hand during the correction described here, which reached source for 11 of the 94 before the team ran out of time.",
        metric: "11 of 94 → 94 of 94",
      },
      {
        label: "Column descriptions matching the column",
        detail:
          "All 214 columns across the eleven feeds, checked against the data they actually carry. The baseline is the hand maintained catalogue sampled in week one; descriptions now come from the contracts and are verified on every load, so drift fails a check rather than accumulating.",
        metric: "59% → 214 of 214",
      },
    ],
    quote: {
      text: "The correction was more expensive than the error. We had to publish a notice saying a figure we had released was wrong, and then spend three weeks unable to tell anyone why. What we needed was never a better dashboard. It was a load that stops.",
      attribution: "Head of Statistical Production, UK government department",
    },
    whatNext:
      "The same contract and lineage stages are being applied to two further publications the department produces, reusing the checks and the gate and replacing only the source agreements.",
    services: ["data-platform-engineering", "evaluation-assurance"],
    stack: ["AWS", "Postgres", "dbt / OpenLineage", "Airflow"],
    image: {
      src: "/media/case-studies/platform-trust.webp",
      alt: "A bank of analogue gauges and levers across an industrial control desk, in black and white.",
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
