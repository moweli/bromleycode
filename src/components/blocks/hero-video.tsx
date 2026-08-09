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
    <section className="relative isolate overflow-hidden bg-ink-950 text-paper">
      <div id="hero-sentinel" className="absolute inset-x-0 top-0 h-px" aria-hidden="true" />

      {/* Poster is a real <img> so it is discoverable by the preload scanner
          and paints before any JavaScript runs. */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.video.poster}
          alt={hero.video.alt}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(5,8,13,0.94)_0%,rgba(5,8,13,0.88)_34%,rgba(5,8,13,0.55)_62%,rgba(5,8,13,0.35)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(to_top,var(--color-ink-950),transparent)]"
      />

      <div className="container-bc relative pt-40 pb-24 lg:pt-56 lg:pb-40">
        <div className="max-w-[38rem]">
          <p className="eyebrow text-accent [animation:reveal-up_600ms_both] motion-reduce:animate-none">
            Data intelligence consultancy
          </p>
          <h1
            className="mt-6 text-[length:var(--text-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] [animation:reveal-up_600ms_80ms_both] motion-reduce:animate-none"
          >
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-[34rem] text-[length:var(--text-lead)] leading-[1.45] text-paper/90 [animation:reveal-up_600ms_160ms_both] motion-reduce:animate-none">
            {hero.standfirst}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 [animation:reveal-up_600ms_240ms_both] motion-reduce:animate-none">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 font-semibold text-ink-950 transition-colors duration-150 hover:bg-accent-hover"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="group relative inline-flex items-center gap-2 pb-2 font-medium text-paper"
            >
              {hero.secondaryCta.label}
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-paper/30" />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-150 group-hover:scale-x-100"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
