export type Insight = {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  /** ISO date. */
  published: string;
  standfirst: string;
  /** Role-attributed, not a named individual — see the team-grid note in components.json. */
  author: string;
  body: { heading?: string; paragraphs: string[]; list?: string[] }[];
  related: string[];
};

export const insights: Insight[] = [
  {
    slug: "chunking-is-a-decision-not-a-default",
    title: "Chunking is a decision, not a default",
    category: "Retrieval",
    readingTime: "6 min",
    published: "2026-07-14",
    standfirst:
      "The 512-token window is the most consequential unexamined choice in most retrieval systems. Here is how to examine it.",
    author: "Retrieval engineering",
    body: [
      {
        paragraphs: [
          "Almost every retrieval system starts life with a fixed-size chunker, because every tutorial starts there. It is a reasonable default for a demonstration and a poor one for a corpus, and the gap between those two facts accounts for a surprising share of disappointing pilots.",
          "The problem is not the size. It is that a fixed window splits on token count, and token count has no relationship to where meaning ends.",
        ],
      },
      {
        heading: "What a bad split costs you",
        paragraphs: [
          "Consider a condition report where a finding reads: 'Section 4.2. Chamber 7, Site ref WTW-0412. Spalling observed to the north wall, moderate, monitor at 12 months.' A fixed window that splits between the site reference and the finding produces two chunks, neither of which is retrievable by a question that names the asset and asks about its condition.",
          "The embedding model is not at fault, and no amount of upgrading it will recover the relationship, because the relationship is no longer present in either chunk. This is why teams who swap models and see no improvement are often looking in the wrong place.",
        ],
      },
      {
        heading: "Structure first, size second",
        paragraphs: [
          "Split on the structure the document already has: sections, clauses, conversational turns, table rows grouped by their subject, then enforce a maximum size within those boundaries rather than across them.",
          "Attach the parent context to every chunk: document title, identifiers, revision state, section heading. It costs tokens and it is almost always worth them, because it is what makes a chunk retrievable in isolation.",
        ],
        list: [
          "Contracts and policies: clause boundaries, with the defined-terms section attached as context",
          "Correspondence: conversational turns, with the thread summary and participants attached",
          "Reports: section boundaries, with tables extracted as structured records rather than flattened prose",
          "Transcripts: speaker turns grouped into topical segments, never fixed durations",
        ],
      },
      {
        heading: "Then measure it",
        paragraphs: [
          "None of the above is worth asserting without evidence, and the evidence is cheap to produce. Build a labelled question set of two to three hundred items, stratified by document family. Run each chunking strategy through the same retrieval configuration. Compare recall@k per family.",
          "In our experience the difference between fixed-window and structure-aware chunking on a heterogeneous corpus is larger than the difference between any two current embedding models. That ordering is worth internalising, because the model upgrade is the change teams reach for first and the chunker is the one that pays.",
          "The corollary is uncomfortable: if you do not have a labelled set, you cannot know which chunking strategy you should be using, and you are choosing by intuition on the decision that matters most.",
        ],
      },
    ],
    related: ["what-permission-inheritance-actually-requires", "abstention-is-a-feature"],
  },
  {
    slug: "what-permission-inheritance-actually-requires",
    title: "What permission inheritance actually requires",
    category: "Architecture",
    readingTime: "7 min",
    published: "2026-06-25",
    standfirst:
      "Filtering results after retrieval is not access control. It is a leak with a user interface.",
    author: "Platform engineering",
    body: [
      {
        paragraphs: [
          "Every enterprise retrieval project reaches the same meeting. Someone from security asks what happens when a user searches for something they are not allowed to see, and the answer determines whether the system is deployable.",
          "There are three common answers. Two of them are wrong.",
        ],
      },
      {
        heading: "The two wrong answers",
        paragraphs: [
          "The first is filtering after generation: retrieve from everything, generate an answer, then check whether the user can see the sources and suppress the answer if not. This leaks. The suppression itself is a signal, and worse, an answer synthesised from restricted material has already been produced: the model saw content the user cannot access, and the system's own logs now contain it.",
          "The second is filtering after ranking: retrieve the top fifty, drop the ones the user cannot open, return what remains. This leaks more subtly. The user's result count and ordering vary with the existence of documents they cannot see, and a determined user can enumerate what exists by watching how results shift. It also degrades quality, because a user with restricted access gets a thin result set assembled from what happened to survive the filter rather than the best fifty they were entitled to.",
        ],
      },
      {
        heading: "The answer that works",
        paragraphs: [
          "Filter before ranking, using access data stored in the index itself. Each chunk carries the ACL of its source document. At query time the user's group membership is resolved against the directory, and the candidate set is constrained before any ranking occurs.",
          "The user then gets the best results from the corpus they are entitled to, which is both correct and better. Ranking operates on a set that is already legitimate.",
        ],
        list: [
          "Store source ACLs alongside each chunk at index time, not as a lookup at query time",
          "Re-resolve group membership per query, cached memberships are how a revoked permission stays live for six hours",
          "Re-index on permission change, and treat permission changes as a first-class event in the ingestion pipeline",
          "Test with synthetic users on every release, including indirect questions that name a subject rather than a document",
        ],
      },
      {
        heading: "The part everyone under-scopes",
        paragraphs: [
          "Permission changes are events, and most ingestion pipelines are built to notice content changes only. A document that is re-permissioned but not edited will keep its old ACL in the index until something forces a re-crawl, and 'something' is usually a person discovering the problem.",
          "Budget for it. It is not difficult; it is simply never in the original estimate, and it is the failure mode most likely to end a deployment.",
        ],
      },
    ],
    related: ["chunking-is-a-decision-not-a-default", "your-evaluation-set-is-too-big"],
  },
  {
    slug: "abstention-is-a-feature",
    title: "Abstention is a feature",
    category: "Evaluation",
    readingTime: "5 min",
    published: "2026-05-30",
    standfirst:
      "A system that answers everything is a system nobody can rely on. The refusal is what makes the answers usable.",
    author: "Evaluation and assurance",
    body: [
      {
        paragraphs: [
          "The most common request we receive after a first demonstration is to reduce how often the system says it does not know. It is an understandable reaction and usually the wrong instinct.",
          "An answer you have to verify saves you nothing. If a system answers every question and is right most of the time, every answer must be checked, and checking costs roughly what finding the answer cost in the first place. The efficiency gain evaporates.",
        ],
      },
      {
        heading: "What abstention buys",
        paragraphs: [
          "A system that abstains where support is absent partitions its output into a set you can act on and a set you must handle yourself. The first set is the value. Its size matters less than its reliability.",
          "This is also the behaviour that changes the conversation with risk functions. 'It is right 94% of the time' invites a question about the other 6%. 'It answers 82% of questions and, on those, cites a supporting passage 97% of the time, and declines the rest' describes a control, and controls are approvable.",
        ],
      },
      {
        heading: "How to build it",
        paragraphs: [
          "Abstention is not a prompt instruction. It is an architectural property with three parts: retrieval that reliably surfaces the supporting passage when one exists, generation constrained to cite retrieved spans, and a check that refuses output where no cited span supports the claim.",
          "Then measure both halves. Track the abstention rate and the answer-supported rate together: one without the other is easy to game. A system can reach a perfect supported rate by declining almost everything, and that is a different failure.",
        ],
        list: [
          "Abstention rate: share of questions where the system declines",
          "Answer-supported rate: of answered questions, the share whose citation genuinely supports the claim",
          "False abstention: questions the corpus could have answered but the system declined: the cost of tuning too conservatively",
        ],
      },
      {
        paragraphs: [
          "The third metric is the one teams forget, and it is the one that keeps abstention honest.",
        ],
      },
    ],
    related: ["your-evaluation-set-is-too-big", "chunking-is-a-decision-not-a-default"],
  },
  {
    slug: "your-evaluation-set-is-too-big",
    title: "Your evaluation set is too big, and too small",
    category: "Evaluation",
    readingTime: "6 min",
    published: "2026-05-08",
    standfirst:
      "Two hundred stratified questions will find regressions ten thousand unstratified ones will miss. Coverage is a shape, not a count.",
    author: "Evaluation and assurance",
    body: [
      {
        paragraphs: [
          "Teams building their first evaluation set tend to worry about volume. The worry is misplaced. Beyond a few hundred items, additional questions mostly add maintenance cost, because someone has to keep them labelled as the corpus moves.",
          "What matters is whether the set covers the ways the system can fail.",
        ],
      },
      {
        heading: "Stratify by failure mode, not by topic",
        paragraphs: [
          "Group by document family first, because families fail independently. A pipeline that handles native-text policy documents well and scanned medical reports badly will show an acceptable aggregate score and an unacceptable experience for one team.",
          "Then group by question type, because those fail independently too.",
        ],
        list: [
          "Lookup: a single fact in a single document",
          "Aggregation: a fact assembled across several documents",
          "Temporal: which version applied on a given date",
          "Negative: questions the corpus genuinely cannot answer, where the correct response is abstention",
          "Adversarial: content designed to elicit an unsupported claim, including instruction-like text inside documents",
        ],
      },
      {
        heading: "Report per stratum, always",
        paragraphs: [
          "A single headline number is the enemy of a useful evaluation. Report per family and per question type, every time, and set CI thresholds per stratum rather than on the mean. A four-point drop confined to one family will not move an aggregate enough to fail a build, and that is precisely the regression you most need to catch.",
        ],
      },
      {
        heading: "Grow it from production",
        paragraphs: [
          "The set should not be frozen at handover. Every correction a reviewer makes is a labelled example that arrived free, and the questions users actually ask drift away from the ones you imagined during the build.",
          "Wire the feedback control into the interface, route corrections into a labelling queue, and add them in batches with the same adjudication standard as the original set. A set that grows every month is the clearest available signal that the system is being taken seriously by the people who own it.",
        ],
      },
    ],
    related: ["abstention-is-a-feature", "what-permission-inheritance-actually-requires"],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
