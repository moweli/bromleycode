"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, primaryCta, site } from "@/content/site";
import { Wordmark } from "@/components/wordmark";

/**
 * Fixed header. Transparent over a dark hero, resolving to a solid surface on
 * scroll — the reference's behaviour, with two deliberate changes:
 *
 *  1. Desktop navigation links are visible. The reference hides all navigation
 *     behind a hamburger at every width including 1632px, which it can afford
 *     because visitors already know the brand (design-audit.md §8.1 D1).
 *  2. Focus is visible and the mobile panel is a real <dialog>, so focus
 *     trapping, Escape and background inerting come from the platform rather
 *     than from hand-rolled ARIA.
 *
 * Dark-hero pages render <div id="hero-sentinel" /> at the top of their hero;
 * pages without one get the solid header immediately.
 */
export function SiteHeader() {
  const [solid, setSolid] = useState(true);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) {
      setSolid(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setSolid(!entry.isIntersecting), {
      // Fire once the sentinel passes behind the header band.
      rootMargin: "-96px 0px 0px 0px",
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Route change closes the panel.
  useEffect(() => setOpen(false), [pathname]);

  const onDark = !solid;

  return (
    <header
      data-solid={solid}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        solid ? "border-b border-line-light bg-paper" : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      {/* Scrim behind the transparent state. Without it, hero copy scrolling
          under the header collides with the nav links — the reference avoids
          this by never being transparent at all. */}
      {!solid ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(to_bottom,rgba(5,8,13,0.85),rgba(5,8,13,0.55)_55%,transparent)]"
        />
      ) : null}

      <div className="container-bc relative flex h-20 items-center justify-between gap-6 lg:h-24">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="shrink-0 transition-opacity duration-150 hover:opacity-70"
        >
          <Wordmark className={onDark ? "text-paper" : "text-ink"} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative py-2 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-150",
                      onDark ? "text-paper/85 hover:text-paper" : "text-ink-muted hover:text-ink",
                      active ? (onDark ? "text-paper" : "text-ink") : "",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-150 hover:after:scale-x-100",
                      active ? "after:scale-x-100" : "",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={primaryCta.href}
            className={[
              "hidden rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-150 sm:inline-flex",
              onDark
                ? "bg-accent text-ink-950 hover:bg-accent-hover"
                : "bg-ink text-paper hover:bg-ink-700",
            ].join(" ")}
          >
            {primaryCta.label}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={[
              "inline-flex h-11 w-11 items-center justify-center rounded-[6px] border transition-colors duration-150 lg:hidden",
              onDark ? "border-paper/40 text-paper" : "border-line-light text-ink",
            ].join(" ")}
          >
            <span className="sr-only">Open menu</span>
            <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" fill="none">
              <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* <dialog> gives focus trapping, Escape and background inerting from the
          platform. The reference's overlay does none of these and does not even
          lock body scroll. */}
      <dialog
        id="mobile-menu"
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-ink-950/60"
      >
        <div className="container-bc flex h-20 items-center justify-between lg:h-24">
          <Wordmark className="text-ink" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-line-light text-ink transition-colors duration-150 hover:bg-paper-alt"
          >
            <span className="sr-only">Close menu</span>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none">
              <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="container-bc pt-10 pb-16">
          <p className="eyebrow text-ink-muted">Navigation</p>
          <ul className="mt-8 flex flex-col gap-1">
            {primaryNav.map((item, index) => (
              <li key={item.href} style={{ animationDelay: `${60 + index * 55}ms` }} className="[animation:reveal-up_400ms_both]">
                <Link
                  href={item.href}
                  className="block border-b border-line-light py-5 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.03em] transition-colors duration-150 hover:text-accent-ink"
                >
                  {item.label}
                  {item.description ? (
                    <span className="mt-1 block font-[family-name:var(--font-sans)] text-sm font-normal tracking-normal text-ink-muted">
                      {item.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={primaryCta.href}
            className="mt-10 inline-flex rounded-full bg-ink px-7 py-4 font-semibold text-paper transition-colors duration-150 hover:bg-ink-700"
          >
            {primaryCta.label}
          </Link>
        </nav>
      </dialog>
    </header>
  );
}
