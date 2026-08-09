"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The site's single scroll effect: 20px rise, 500ms, fires once.
 *
 * The reference applies exactly this one effect everywhere, which is why its
 * motion reads as resolved despite spanning three tiers (design-audit.md §4.1).
 * Copying the restraint matters more than copying the numbers.
 *
 * Under prefers-reduced-motion the content renders in its final state and the
 * observer never runs — the reference has no reduced-motion handling at all.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  /** Stagger, in ms. Keep sequences short — 3 or 4 steps at 80ms. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: shown ? `${delay}ms` : undefined }}
      className={[
        "transition-[opacity,transform] duration-[var(--duration-reveal)] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
