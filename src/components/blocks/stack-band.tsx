import * as simpleIcons from "simple-icons";
import { stackBand, stackItems } from "@/content/stack";
import { ArrowLink } from "@/components/ui";

/**
 * Technology-stack band — the replacement for the reference's client logo wall
 * (design-audit.md §8.1 D2, components.json client_logo_wall).
 *
 * Geometry is inherited: full-bleed dark band, 45px lockups, two marquee tracks
 * running in opposite directions at ~34s and ~38s. Two things the reference's
 * version lacks: it pauses on hover and on focus-within, and it collapses to a
 * static grid under prefers-reduced-motion.
 *
 * Marks come from Simple Icons (CC0-1.0). Trademarks remain their owners'.
 */

type Mark = { name: string; role: string; path: string };

function icon(slug: string) {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof simpleIcons;
  const entry = simpleIcons[key] as { path: string; title: string } | undefined;
  return entry?.path;
}

const marks: Mark[] = stackItems
  .map((item) => ({ name: item.name, role: item.role, path: icon(item.icon) ?? "" }))
  .filter((mark) => mark.path);

const half = Math.ceil(marks.length / 2);
const rows: { items: Mark[]; direction: "left" | "right"; duration: string }[] = [
  { items: marks.slice(0, half), direction: "left", duration: "34s" },
  { items: marks.slice(half), direction: "right", duration: "38s" },
];

function Track({ items, direction, duration }: { items: Mark[]; direction: "left" | "right"; duration: string }) {
  // The track is duplicated so translating by exactly -50% loops seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}>
      <ul
        className="flex w-max items-center gap-16 py-6 [animation-play-state:running] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center"
        style={{
          animationName: direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: duration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {doubled.map((mark, index) => (
          <li
            key={`${mark.name}-${index}`}
            className="flex shrink-0 items-center gap-3 text-mist transition-colors duration-150 hover:text-paper"
            // The duplicate half is presentational only.
            aria-hidden={index >= items.length ? "true" : undefined}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={mark.path} />
            </svg>
            <span className="whitespace-nowrap">
              <span className="block text-body-sm font-medium text-paper">{mark.name}</span>
              <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.04em]">
                {mark.role}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StackBand() {
  return (
    <section className="section-lg wash-dark grain relative isolate overflow-hidden text-paper">
      <div className="container-bc relative">
        <div className="max-w-[46rem]">
          <p className="eyebrow text-accent">{stackBand.eyebrow}</p>
          <h2 className="mt-4 text-[length:var(--text-h2)]">{stackBand.heading}</h2>
          <p className="mt-5 text-[length:var(--text-lead)] leading-[1.45] text-mist-bright">{stackBand.body}</p>
          <ArrowLink href={stackBand.ctaHref} tone="dark" className="mt-8">
            {stackBand.ctaLabel}
          </ArrowLink>
        </div>
      </div>

      <div className="relative mt-14 border-y border-line-dark">
        {rows.map((row) => (
          <Track key={row.direction} {...row} />
        ))}
      </div>
    </section>
  );
}
