"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/content/home";

/**
 * Stats band. The reference's version counts up over ~1,800ms with a strong
 * ease-out after a ~300ms delay, fires once, and is invisible in static HTML
 * (design-audit.md §4.2). We keep the component and the timing.
 *
 * Every figure here is deliberately null — a new consultancy quoting fabricated
 * project counts is the exact failure mode this audience screens for. The
 * count-up runs the moment a real number is supplied.
 */
function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1800;
        const start = performance.now() + 280; // the reference's measured delay
        const tick = (now: number) => {
          const elapsed = now - start;
          if (elapsed < 0) {
            frame = requestAnimationFrame(tick);
            return;
          }
          const t = Math.min(1, elapsed / duration);
          // ease-out cubic — matches the measured curve: ~68% covered in the first third
          setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular">
      {display.toLocaleString("en-GB")}
      {suffix ? <span className="text-[0.35em] align-super">{suffix}</span> : null}
    </span>
  );
}

export function StatsBand() {
  return (
    <section className="section-lg bg-paper text-ink">
      <div className="container-bc">
        <div className="max-w-[46rem]">
          <p className="eyebrow text-accent-ink">{stats.eyebrow}</p>
          <h2 className="mt-4 text-[length:var(--text-h2)]">{stats.heading}</h2>
          <p className="mt-5 text-[length:var(--text-lead)] leading-[1.45] text-ink-muted">{stats.body}</p>
        </div>

        <ul className="mt-14 grid gap-10 lg:grid-cols-3">
          {stats.items.map((item) => (
            <li key={item.label} className="border-t border-line-light pt-6">
              <p className="text-[length:var(--text-h4)] font-semibold">{item.label}</p>
              <p className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-stat)] leading-[0.9] tracking-[-0.05em]">
                {item.value === null ? (
                  <span className="text-line-light" aria-hidden="true">
                    —
                  </span>
                ) : (
                  <CountUp value={item.value} suffix={item.suffix} />
                )}
              </p>
              <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.1em] text-accent-ink">
                {item.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
