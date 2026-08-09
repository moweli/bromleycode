import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "light" | "dark";

/**
 * Section wrapper. Surface alternation and the padding ladder are the two
 * things that carry the reference's rhythm (design-audit.md §2.3), so they live
 * in one place rather than being spelled out per page.
 */
export function Section({
  children,
  tone = "light",
  size = "md",
  className = "",
  id,
  wash = false,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
  /** Layered radial gradient — depth instead of a flat slab. */
  wash?: boolean;
}) {
  const padding = size === "lg" ? "section-xl" : size === "sm" ? "section" : "section-lg";
  const surface = tone === "dark" ? (wash ? "wash-dark text-paper" : "bg-ink-900 text-paper") : "bg-paper text-ink";
  return (
    <section id={id} className={`relative ${padding} ${surface} ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return <p className={`eyebrow ${tone === "dark" ? "text-accent" : "text-accent-ink"}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  body?: string | string[];
  tone?: Tone;
  className?: string;
}) {
  const paragraphs = typeof body === "string" ? [body] : (body ?? []);
  return (
    <div className={`max-w-[46rem] ${className}`}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 className={`${eyebrow ? "mt-4" : ""} text-[length:var(--text-h2)]`}>{title}</h2>
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className={`mt-5 text-[length:var(--text-lead)] leading-[1.45] ${
            tone === "dark" ? "text-mist-bright" : "text-ink-muted"
          }`}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/** The site's default CTA: a text link with a rule that wipes in on hover. */
export function ArrowLink({
  href,
  children,
  tone = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 pb-2 font-medium tracking-[-0.02em] ${
        tone === "dark" ? "text-paper" : "text-ink"
      } ${className}`}
    >
      <span>{children}</span>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
        <path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-px ${tone === "dark" ? "bg-paper/30" : "bg-line-light"}`}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-150 group-hover:scale-x-100"
      />
    </Link>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "accent" | "ghost-dark";
  className?: string;
}) {
  const styles = {
    primary: "bg-ink text-paper hover:bg-ink-700",
    accent: "bg-accent text-paper hover:bg-accent-hover",
    "ghost-dark": "border border-paper/30 text-paper hover:border-accent hover:text-accent",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-4 font-semibold transition-colors duration-150 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

/**
 * Bordered card. Square corners against rounded media is the reference's
 * clearest visual signature (design-audit.md §1.5).
 */
export function Card({
  children,
  tone = "light",
  className = "",
  interactive = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={[
        "relative flex flex-col border",
        tone === "dark" ? "border-ink-600 bg-ink-800" : "border-line-light bg-paper",
        interactive
          ? "transition-colors duration-150 hover:border-accent focus-within:border-accent"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/** A 1px rule — the reference separates with borders, never with shadows. */
export function Rule({ tone = "light", className = "" }: { tone?: Tone; className?: string }) {
  return (
    <hr className={`border-0 border-t ${tone === "dark" ? "border-line-dark" : "border-line-light"} ${className}`} />
  );
}
