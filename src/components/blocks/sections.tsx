import Link from "next/link";
import { ContactForm } from "@/components/blocks/contact-form";
import { Reveal } from "@/components/reveal";
import { ctaBand } from "@/content/home";

/**
 * Terminal CTA band. The reference puts a form here rather than a link, which
 * is the right call for a consultancy — it removes a click from the only
 * conversion that matters (components.json cta_band).
 */
export function CtaBand({
  heading = ctaBand.heading,
  body = ctaBand.body,
  eyebrow = ctaBand.eyebrow,
}: {
  heading?: string;
  body?: string;
  eyebrow?: string;
}) {
  return (
    <section id="contact" className="section-xl wash-dark grain relative isolate overflow-hidden text-paper">
      <div className="container-bc relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-[34rem]">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h2 className="mt-4 text-[length:var(--text-h2)]">{heading}</h2>
          <p className="mt-6 text-[length:var(--text-lead)] leading-[1.45] text-mist-bright">{body}</p>
          <dl className="mt-10 space-y-5 border-t border-line-dark pt-8">
            <div>
              <dt className="eyebrow text-mist">Prefer email</dt>
              <dd className="mt-1">
                <a
                  href="mailto:enquiries@bromelycode.com"
                  className="underline underline-offset-4 transition-colors duration-150 hover:text-accent"
                >
                  enquiries@bromelycode.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-mist">Response time</dt>
              <dd className="mt-1 text-mist-bright">One working day, from a person who has read it.</dd>
            </div>
          </dl>
        </div>
        <ContactForm tone="dark" />
      </div>
    </section>
  );
}

/**
 * FAQ. Built on <details>/<summary> so keyboard and screen-reader behaviour
 * come from the platform rather than from added ARIA.
 */
export function Faq({ items, tone = "light" }: { items: { question: string; answer: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={`border-t ${dark ? "border-line-dark" : "border-line-light"}`}>
      {items.map((item) => (
        <details key={item.question} className={`group border-b ${dark ? "border-line-dark" : "border-line-light"}`}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[length:var(--text-h4)] font-semibold [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className={`mt-1 shrink-0 transition-transform duration-150 group-open:rotate-45 ${
                dark ? "text-accent" : "text-accent-ink"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
          </summary>
          <p className={`max-w-[52rem] pb-7 text-body-sm ${dark ? "text-mist-bright" : "text-ink-muted"}`}>
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

/**
 * Reference-architecture block. Like the pipeline diagram, drawn as code — a
 * stock diagram always describes something slightly different from what the
 * words claim.
 */
export function ArchitectureBlock() {
  const layers = [
    {
      name: "Sources",
      items: ["Document management", "Case & ticket systems", "Shared drives", "Transcripts & email"],
      note: "Read-only connectors. ACLs read at the same time as content.",
    },
    {
      name: "Pipeline",
      items: ["Parse & OCR routing", "Structure-aware chunking", "Entity & revision resolution", "Embedding"],
      note: "Idempotent, resumable, versioned. Every record traces to a source revision.",
    },
    {
      name: "Indexes",
      items: ["Vector index", "Lexical index", "Metadata & ACL store", "Lineage store"],
      note: "Blue-green rebuilds. Permissions live here, not in a post-filter.",
    },
    {
      name: "Serving",
      items: ["Pre-filter by ACL & metadata", "Hybrid retrieval", "Rerank", "Grounded generation"],
      note: "Access resolved per query against your directory, before ranking.",
    },
    {
      name: "Assurance",
      items: ["Labelled question set", "CI regression gates", "Adversarial & permission suites", "Live sampling"],
      note: "The half most projects under-resource, and the half that decides deployability.",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <ol className="grid min-w-[860px] grid-cols-5 gap-px bg-line-dark">
        {layers.map((layer, index) => (
          <li key={layer.name} className="flex flex-col bg-ink-900 p-6">
            <p className="eyebrow text-accent">
              {String(index + 1).padStart(2, "0")} · {layer.name}
            </p>
            <ul className="mt-5 flex-1 space-y-2">
              {layer.items.map((item) => (
                <li key={item} className="border-l border-line-dark pl-3 text-body-sm text-paper/90">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs font-bold uppercase leading-relaxed tracking-[0.04em] text-mist">
              {layer.note}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RelatedLinks({
  heading,
  links,
  tone = "light",
}: {
  heading: string;
  links: { label: string; href: string; detail?: string }[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div>
      <h2 className="text-[length:var(--text-h3)]">{heading}</h2>
      <ul className={`mt-8 border-t ${dark ? "border-line-dark" : "border-line-light"}`}>
        {links.map((link) => (
          <li key={link.href} className={`border-b ${dark ? "border-line-dark" : "border-line-light"}`}>
            <Link
              href={link.href}
              className="group flex items-baseline justify-between gap-6 py-5 transition-colors duration-150 hover:text-accent-ink"
            >
              <span>
                <span className="text-[length:var(--text-h4)] font-semibold">{link.label}</span>
                {link.detail ? (
                  <span className={`mt-1 block text-body-sm ${dark ? "text-mist" : "text-ink-muted"}`}>
                    {link.detail}
                  </span>
                ) : null}
              </span>
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                aria-hidden="true"
                className="shrink-0 translate-y-1 transition-transform duration-150 group-hover:translate-x-1"
              >
                <path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
