export type Industry = {
  slug: string;
  name: string;
  eyebrow: string;
  standfirst: string;
  summary: string;
  /** Where the unstructured mass actually sits in this sector. */
  corpora: { name: string; detail: string }[];
  challenges: { name: string; detail: string }[];
  /** Sector-specific constraints that shape the architecture. */
  constraints: { name: string; detail: string }[];
  relatedCaseStudies: string[];
  services: string[];
  image: { src: string; alt: string };
};

export const industries: Industry[] = [
  {
    slug: "water-utilities",
    name: "Water and utilities",
    eyebrow: "Sector",
    standfirst:
      "Asset knowledge accumulated over decades, held in drawings, surveys and permits that no asset register was ever going to contain.",
    summary:
      "Regulated network operators carry thirty years of documentary history about physical assets, and the operational questions that matter are answered in it rather than in the warehouse.",
    corpora: [
      {
        name: "As-built drawings and schematics",
        detail:
          "Meaning carried in title blocks and annotations rather than prose, frequently scanned, frequently superseded without a clear marker.",
      },
      {
        name: "Condition surveys and inspection reports",
        detail:
          "Heavily tabular. The row-to-asset relationship is the finding, and it is the first thing naive text extraction destroys.",
      },
      {
        name: "Permits, consents and regulatory correspondence",
        detail:
          "Conditions attached to specific discharge points and abstraction sites, amended by letters filed separately from the permit.",
      },
      {
        name: "Contractor handover packs",
        detail:
          "Often commercially restricted, which makes permission inheritance a deployment blocker rather than a refinement.",
      },
    ],
    challenges: [
      {
        name: "Superseded revisions",
        detail:
          "An answer drawn from a superseded drawing is worse than no answer. Revision lineage has to be an explicit pipeline stage, not a metadata field somebody hopes was filled in.",
      },
      {
        name: "Asset identity across systems",
        detail:
          "One asset carries a site code, a legacy reference and two aliases. Retrieval that cannot resolve them returns a quarter of what it should.",
      },
      {
        name: "Escalation as a bottleneck",
        detail:
          "When engineers cannot find something quickly, they raise a request. The specialist team becomes a queue, and the queue becomes the constraint on planning decisions.",
      },
      {
        name: "Regulatory reporting cycles",
        detail:
          "Evidence assembly for periodic review is a scramble across the same corpora, done by hand, under a deadline that does not move.",
      },
    ],
    constraints: [
      {
        name: "Safety-critical accuracy",
        detail:
          "Answers inform decisions about buried and pressurised assets. Abstention on a low-confidence answer is not a degraded experience; it is the required behaviour.",
      },
      {
        name: "Commercially restricted material",
        detail:
          "Contractor packs and legal correspondence sit in the same repository as general asset documentation. Access must be resolved per user at query time.",
      },
      {
        name: "Long-lived evidence",
        detail:
          "A retrieval decision may need to be explained years later. Lineage from answer to source revision is a design requirement.",
      },
    ],
    relatedCaseStudies: ["asset-information-retrieval-water-utility"],
    services: ["intelligence-extraction", "data-platform-engineering"],
    image: {
      src: "/media/industries/water-utilities.webp",
      alt: "Concrete water treatment channels running towards a low horizon",
    },
  },
  {
    slug: "central-government",
    name: "Central government",
    eyebrow: "Sector",
    standfirst:
      "Casework, correspondence and consultation responses, where the obligation is not to find documents but to assemble a defensible position.",
    summary:
      "Departments and agencies hold decision-relevant material in correspondence and casework systems, under explainability and residency constraints that rule out most of the market.",
    corpora: [
      {
        name: "Casework correspondence",
        detail:
          "Submissions, responses and internal assessments, usually spread across successive case management systems and a shared drive older than both.",
      },
      {
        name: "Consultation responses",
        detail:
          "Thousands of free-text submissions per consultation, analysed under a deadline by a small team, where the outlying response is often the one that matters.",
      },
      {
        name: "Policy and guidance archives",
        detail:
          "Superseded guidance sits alongside current, and the question is usually which version applied on a specific date.",
      },
      {
        name: "FOI and disclosure material",
        detail:
          "Requires exhaustive recall with a documented method, and the ability to show what was excluded and why.",
      },
    ],
    challenges: [
      {
        name: "Explainability to auditors",
        detail:
          "A relevance score that cannot be explained is not usable. Lineage from surfaced passage to pipeline and model version is the price of approval.",
      },
      {
        name: "Recall asymmetry",
        detail:
          "The cost of missing a relevant document vastly exceeds the cost of reviewing an irrelevant one. Retrieval is tuned for recall and the review interface absorbs the precision cost.",
      },
      {
        name: "Vocabulary mismatch",
        detail:
          "Correspondents do not use departmental terminology. Keyword-and-taxonomy approaches miss exactly the submissions most worth finding.",
      },
      {
        name: "Thread reconstruction",
        detail:
          "A single message is often meaningless without the exchange around it, and the exchange frequently spans two systems.",
      },
    ],
    constraints: [
      {
        name: "Data residency and egress",
        detail:
          "Material cannot leave the boundary. Inference runs through a private endpoint or a self-hosted model, and that is assumed from the first design session.",
      },
      {
        name: "Assurance and audit",
        detail:
          "Method, measured error rates and known failure modes have to be written for an internal auditor, not for engineers.",
      },
      {
        name: "Procurement and accreditation",
        detail:
          "Security assurance, DPIA and supplier accreditation shape the timeline as much as the engineering does. We plan for it rather than discovering it.",
      },
    ],
    relatedCaseStudies: ["regulatory-evidence-pipeline-central-government"],
    services: ["data-platform-engineering", "evaluation-assurance"],
    image: {
      src: "/media/industries/central-government.webp",
      alt: "Classical stone columns of a government building rising against an overcast sky",
    },
  },
  {
    slug: "financial-services",
    name: "Financial services",
    eyebrow: "Sector",
    standfirst:
      "Claims files, policy wordings, suitability evidence and complaints, where a measured error rate is the condition of deployment rather than a refinement.",
    summary:
      "Regulated firms can build retrieval systems quickly and cannot deploy them without evidence. Assurance is the constraint, and it is the one most projects under-resource.",
    corpora: [
      {
        name: "Claims correspondence and medical reports",
        detail:
          "Specialist language, inconsistent structure, and the hardest document family in most insurers' estates.",
      },
      {
        name: "Policy wordings and endorsements",
        detail:
          "Precision matters at clause level, and the endorsement that changes everything is filed separately from the policy.",
      },
      {
        name: "Suitability and advice files",
        detail:
          "Consumer Duty requires demonstrating that a decision was supported by evidence actually present in the file.",
      },
      {
        name: "Complaints and quality assurance",
        detail:
          "A rich signal about systemic failure, almost always analysed by sampling because reading it all is infeasible by hand.",
      },
    ],
    challenges: [
      {
        name: "Silent degradation",
        detail:
          "A model update changes behaviour and nobody can say whether accuracy moved with it. Without a regression suite, the first signal is a complaint.",
      },
      {
        name: "Aggregate scores hiding a failing family",
        detail:
          "Acceptable mean performance frequently conceals one document family performing far below it, usually the specialist one.",
      },
      {
        name: "Vendor benchmarks",
        detail:
          "A public benchmark figure bears no relationship to consultant-authored medical reports. Measurement has to happen on your corpus.",
      },
      {
        name: "Prompt injection through documents",
        detail:
          "Submitted PDFs are untrusted input. Instruction-like text inside a claim document is a live attack surface, not a theoretical one.",
      },
    ],
    constraints: [
      {
        name: "Consumer Duty evidence",
        detail:
          "Customer-affecting decisions need a documented basis, and the limitations of any supporting system need to be understood by the people relying on it.",
      },
      {
        name: "Segregation between claims and roles",
        detail:
          "Boundaries must hold against indirect questions as well as direct ones. Inference attacks belong in the test suite.",
      },
      {
        name: "Model risk governance",
        detail:
          "A change to a model is a governed release. Blue-green index builds and CI thresholds make that routine rather than exceptional.",
      },
    ],
    relatedCaseStudies: ["claims-evidence-assurance-financial-services"],
    services: ["evaluation-assurance", "intelligence-extraction"],
    image: {
      src: "/media/industries/financial-services.webp",
      alt: "Repeating glass panels of a City office tower under flat grey light",
    },
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
