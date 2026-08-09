import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Interior hero. Two variants — dark and light — applied consistently, which is
 * why the reference's interior pages never compete with its homepage
 * (design-audit.md §2, hero_interior_* in components.json). Column widths use
 * the reference's three measured settings: narrow, medium, full.
 */
export function PageHero({
  eyebrow,
  title,
  standfirst,
  tone = "dark",
  width = "medium",
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: string;
  standfirst?: string;
  tone?: "dark" | "light";
  width?: "narrow" | "medium" | "full";
  breadcrumb?: { label: string; href: string };
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  const maxWidth = { narrow: "max-w-[30rem]", medium: "max-w-[54rem]", full: "max-w-none" }[width];

  return (
    <section
      // The header watches this element: it stays transparent while any part of
      // a dark hero is still behind the header band.
      id={dark ? "hero-sentinel" : undefined}
      className={`relative isolate overflow-hidden ${
        dark ? "wash-dark grain text-paper" : "bg-paper-alt text-ink"
      }`}
    >
      {dark ? (
        <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 -z-10" />
      ) : null}

      <div className="container-bc pt-36 pb-16 lg:pt-48 lg:pb-24">
        {breadcrumb ? (
          <Link
            href={breadcrumb.href}
            className={`eyebrow inline-flex items-center gap-2 transition-colors duration-150 ${
              dark ? "text-mist hover:text-accent" : "text-ink-muted hover:text-accent-ink"
            }`}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M14 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {breadcrumb.label}
          </Link>
        ) : null}

        <div className={maxWidth}>
          {eyebrow ? (
            <p className={`eyebrow ${breadcrumb ? "mt-8" : ""} ${dark ? "text-accent" : "text-accent-ink"}`}>
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-5 text-[length:var(--text-h1)] leading-[var(--leading-display)] tracking-[var(--tracking-display)]">
            {title}
          </h1>
          {standfirst ? (
            <p
              className={`mt-6 max-w-[42rem] text-[length:var(--text-lead)] leading-[1.45] ${
                dark ? "text-mist-bright" : "text-ink-muted"
              }`}
            >
              {standfirst}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
