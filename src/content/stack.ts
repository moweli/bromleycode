/**
 * Technology-stack band — replaces the reference site's client logo wall
 * (design-audit.md §8.1 D2). Same geometry, same trust function, and true on
 * day one, which is the claim the stack list has to support.
 *
 * Marks are rendered from Simple Icons (CC0-1.0). Trademarks remain the
 * property of their respective owners; their presence indicates a platform we
 * build on, not a partnership or endorsement. Microsoft Azure and AWS are named
 * in prose rather than shown as marks — their brand guidelines require assets
 * to be sourced and approved directly, which is a step we have not taken.
 */

export type StackItem = {
  /** Simple Icons slug. */
  icon: string;
  name: string;
  /** What we actually use it for — a technical buyer reads this, not the logo. */
  role: string;
};

export const stackItems: StackItem[] = [
  { icon: "databricks", name: "Databricks", role: "Lakehouse and batch processing" },
  { icon: "snowflake", name: "Snowflake", role: "Warehouse and derived tables" },
  { icon: "postgresql", name: "PostgreSQL", role: "Relational store and pgvector index" },
  { icon: "apacheairflow", name: "Apache Airflow", role: "Pipeline orchestration" },
  { icon: "apachespark", name: "Apache Spark", role: "Distributed parsing and embedding" },
  { icon: "opensearch", name: "OpenSearch", role: "Lexical retrieval and hybrid ranking" },
  { icon: "qdrant", name: "Qdrant", role: "Vector index at scale" },
  { icon: "duckdb", name: "DuckDB", role: "Local analysis and evaluation runs" },
  { icon: "python", name: "Python", role: "Pipeline and evaluation code" },
  { icon: "huggingface", name: "Hugging Face", role: "Model hosting and embeddings" },
  { icon: "mlflow", name: "MLflow", role: "Experiment and model tracking" },
  { icon: "opentelemetry", name: "OpenTelemetry", role: "Tracing across pipeline stages" },
  { icon: "grafana", name: "Grafana", role: "Retrieval-quality dashboards" },
  { icon: "kubernetes", name: "Kubernetes", role: "Service deployment" },
  { icon: "terraform", name: "Terraform", role: "Infrastructure as code" },
  { icon: "redis", name: "Redis", role: "Caching and queues" },
];

export const stackBand = {
  eyebrow: "Where we build",
  heading: "Your platform, not ours.",
  body: "We have no product to sell you, which means we have no reason to recommend one. Engagements are built on the platforms you already run, including Microsoft Azure and AWS, whose marks we do not display because their brand guidelines require assets to be sourced and approved directly. Vendor marks below indicate platforms we build on, not partnership or endorsement.",
  ctaLabel: "How we work",
  ctaHref: "/how-we-work",
};
