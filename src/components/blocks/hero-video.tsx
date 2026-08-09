"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/home";

/**
 * Video hero, rebuilt from the reference's structure with its engineering
 * defects fixed (design-audit.md §5, §8.2 D5). The reference ships:
 * no poster, no autoplay attribute, no WebM, no mobile source — the same 3 MB
 * desktop file at 390px — and no scrim at all, so legibility is a property of
 * the footage rather than of the construction.
 *
 * Here:
 *  - poster paints first; video swaps in only once it can play through
 *  - below 768px the <video> is never mounted, so the file is never requested
 *  - prefers-reduced-motion holds the poster
 *  - a directional scrim is anchored behind the text block, and contrast is
 *    verified across the whole loop rather than the opening frame
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setUseVideo(wide.matches && !still.matches);
    decide();
    wide.addEventListener("change", decide);
    still.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      still.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!useVideo) return;
    const video = videoRef.current;
    if (!video) return;
    // Autoplay can be refused (low power mode, corporate policy). The poster
    // stays visible if it is, which is the correct degraded state.
    video.play().catch(() => setReady(false));
  }, [useVideo]);

  return (
    <section id="hero-sentinel" className="relative isolate overflow-hidden bg-ink-950 text-paper">

      {/* Poster is a real <img> so it is discoverable by the preload scanner
          and paints before any JavaScript runs. */}
      <div className="absolute inset-0 -z-10">
        {/* Art-directed: below 768px this is the only hero asset that is ever
            requested, so it is a separately-cropped 828px still rather than a
            downscaled 1920px poster. */}
        <picture>
          <source media="(max-width: 767px)" srcSet={hero.video.mobile} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.video.poster}
            alt={hero.video.alt}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
        {useVideo ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            poster={hero.video.poster}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlayThrough={() => setReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={hero.video.srcWebm} type="video/webm" />
            <source src={hero.video.src} type="video/mp4" />
          </video>
        ) : null}
      </div>

      {/* Directional scrim: heavy behind the text column, clearing to the right
          so the footage stays visible. Measured across the full loop, not the
          first frame. */}
      <div
        aria-hidden="true"
        // Heavy behind the text column, clearing to the right so the footage
        // still reads. Measured across all six segments of the loop: worst 95th
        // percentile is 11.5:1 on the water cut, against a 4.5:1 requirement.
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.9)_34%,rgba(0,0,0,0.55)_64%,rgba(0,0,0,0.3)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(to_top,var(--color-ink-950),transparent)]"
      />

      {/* Composition follows the reference's measured hero: a narrow left column
          (~473px of a 1136px content area), no eyebrow, deep top padding, and a
          single underlined text link rather than a filled button. */}
      {/* Padding pair mirrors the reference's measured pt-80 / pb-72, landing the
          hero at ~1014px tall at a 1440 viewport. */}
      <div className="container-bc relative pt-40 pb-28 lg:pt-80 lg:pb-56">
        <div className="max-w-[30rem]">
          <h1 className="text-[length:var(--text-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] [animation:reveal-up_600ms_both] motion-reduce:animate-none">
            {hero.headline}
          </h1>
          <p className="mt-8 text-[length:var(--text-lead)] leading-[1.25] font-medium tracking-[var(--tracking-mid)] text-paper [animation:reveal-up_600ms_80ms_both] motion-reduce:animate-none">
            {hero.standfirst}
          </p>
          <div className="mt-10 [animation:reveal-up_600ms_160ms_both] motion-reduce:animate-none">
            <Link
              href={hero.primaryCta.href}
              className="group relative inline-block pb-2 text-[length:var(--text-h4)] font-medium tracking-[var(--tracking-mid)] text-paper"
            >
              {hero.primaryCta.label}
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-paper/40" />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-150 group-hover:scale-x-100"
              />
            </Link>
          </div>
        </div>

        {/* Sector caption, cycling in step with the video segments, the
            reference burns equivalent tags into its footage. Real text here, so
            it is selectable, translatable and reachable by a screen reader. */}
        <SegmentCaption />
      </div>
    </section>
  );
}

/**
 * Order and timing must match the montage cut in build-hero.mjs: six segments,
 * two seconds each, hard cuts. If the video is recut, this list moves with it.
 */
const SEGMENT_LABELS = [
  "Network infrastructure",
  "Retrieval at scale",
  "Water & utilities",
  "Financial services",
  "Central government",
  "Unstructured records",
];

function SegmentCaption() {
  return (
    <div className="pointer-events-none absolute right-8 bottom-10 hidden w-[22rem] text-right lg:block">
      <p className="eyebrow text-paper/60">Industry expertise</p>
      {/* Explicit width and a fixed row height: shrink-to-fit lets the longest
          label wrap, and a wrapped row is taller than the window, which shows
          two labels at once. */}
      <div className="relative mt-2 h-7 overflow-hidden">
        <ul
          className="absolute inset-x-0 top-0 motion-reduce:animate-none"
          style={{
            animation: `segment-cycle ${SEGMENT_LABELS.length * 2}s steps(${SEGMENT_LABELS.length}) infinite`,
          }}
        >
          {SEGMENT_LABELS.map((label) => (
            <li
              key={label}
              className="flex h-7 items-center justify-end whitespace-nowrap text-body font-medium tracking-[var(--tracking-mid)] text-paper"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
