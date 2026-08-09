import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import type { Insight } from "@/content/insights";
import type { Service } from "@/content/services";
import type { Industry } from "@/content/industries";
import { IllustrativeBanner } from "@/components/blocks/illustrative-banner";
import { Card } from "@/components/ui";

/**
 * Card family. Square corners, 1px border, no shadow — separation by border and
 * surface inversion is the reference's system and it suits a technical audience
 * (design-audit.md §1.5, §1.6). The reference's cards have no hover state at
 * all despite being entirely clickable; ours move the border to the accent.
 */

export function CapabilityCard({ service }: { service: Service }) {
  return (
    <Card interactive className="group h-full p-8">
      <p className="eyebrow text-accent-ink">{service.eyebrow}</p>
      <h3 className="mt-5 text-[length:var(--text-h4)]">{service.shortTitle}</h3>
      <p className="mt-4 flex-1 text-body-sm text-ink-muted">{service.summary}</p>
      {/* Not the service name again: it is the card's own heading two lines up,
          and repeating it reads as a stutter. */}
      <Link
        href={`/services/${service.slug}`}
        className="mt-7 inline-flex items-center gap-2 font-medium after:absolute after:inset-0 after:content-['']"
      >
        <span className="relative">
          See how it works
          <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px bg-line-light" />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-150 group-hover:scale-x-100"
          />
        </span>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
          <path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Link>
    </Card>
  );
}

export function CaseStudyCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  return (
    <Card interactive className={`group h-full overflow-hidden ${featured ? "lg:flex-row" : ""}`}>
      <div className={`relative aspect-[16/9] shrink-0 overflow-hidden ${featured ? "lg:aspect-auto lg:w-1/2" : ""}`}>
        <Image
          src={study.image.src}
          alt={study.image.alt}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <IllustrativeBanner variant="compact" />
        <div className="flex flex-1 flex-col p-7">
          <p className="eyebrow text-accent-ink">{study.eyebrow}</p>
          <h3 className={`mt-4 ${featured ? "text-[length:var(--text-h3)]" : "text-[length:var(--text-h4)]"}`}>
            {study.title}
          </h3>
          <p className="mt-4 flex-1 text-body-sm text-ink-muted">{study.summary}</p>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.04em] text-ink-muted">
            {study.scale} · {study.duration}
          </p>
          <Link
            href={`/case-studies/${study.slug}`}
            className="mt-4 inline-flex items-center gap-2 font-medium after:absolute after:inset-0 after:content-['']"
          >
            <span className="relative">
              Read the engagement
              <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px bg-line-light" />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-150 group-hover:scale-x-100"
              />
            </span>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
              <path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export function ArticleCard({ insight, image }: { insight: Insight; image?: string }) {
  return (
    <Card interactive className="group h-full overflow-hidden">
      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-7">
        <p className="eyebrow text-accent-ink">
          {insight.category} · {insight.readingTime}
        </p>
        <h3 className="mt-4 text-[length:var(--text-h4)]">{insight.title}</h3>
        <p className="mt-4 flex-1 text-body-sm text-ink-muted">{insight.standfirst}</p>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.04em] text-ink-muted">
          {insight.author} ·{" "}
          <time dateTime={insight.published}>
            {new Date(insight.published).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </time>
        </p>
        <Link href={`/insights/${insight.slug}`} className="mt-4 font-medium after:absolute after:inset-0 after:content-['']">
          <span className="relative">
            Read
            <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px bg-line-light" />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-150 group-hover:scale-x-100"
            />
          </span>
        </Link>
      </div>
    </Card>
  );
}

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Card interactive className="group h-full overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={industry.image.src}
          alt={industry.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-[length:var(--text-h4)]">{industry.name}</h3>
        <p className="mt-4 flex-1 text-body-sm text-ink-muted">{industry.summary}</p>
        <Link
          href={`/industries/${industry.slug}`}
          className="mt-6 inline-flex items-center gap-2 font-medium after:absolute after:inset-0 after:content-['']"
        >
          <span className="relative">
            {industry.name}
            <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px bg-line-light" />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-150 group-hover:scale-x-100"
            />
          </span>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
            <path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </div>
    </Card>
  );
}
