import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks/page-hero";
import { CaseStudyCard } from "@/components/blocks/cards";
import { CtaBand, RelatedLinks } from "@/components/blocks/sections";
import { IllustrativeBanner } from "@/components/blocks/illustrative-banner";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/ui";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { getService } from "@/content/services";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.title}. Bromley Code`,
      description: study.summary,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: study.title }],
    },
  };
}

/**
 * Section order follows the reference's measured case-study anatomy
 * (design-audit.md §7): context → problem → why previous approaches failed →
 * pipeline → what shipped → outcomes → quote → what next. Metrics stay inside
 * the outcome prose rather than in a stats band, and the quote comes after the
 * argument rather than in place of it.
 */
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 3);
  const services = study.services
    .map((serviceSlug) => getService(serviceSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <PageHero
        eyebrow={`${study.eyebrow} · ${study.engagement}`}
        title={study.title}
        standfirst={study.summary}
        breadcrumb={{ label: "All case studies", href: "/case-studies" }}
        width="medium"
      >
        <dl className="mt-10 grid gap-6 border-t border-line-dark pt-8 sm:grid-cols-3">
          {[
            ["Sector", study.sector],
            ["Scale", study.scale],
            ["Duration", study.duration],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="eyebrow text-mist">{term}</dt>
              <dd className="mt-2 text-body-sm text-paper">{value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <IllustrativeBanner />

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius-media)]">
              <Image
                src={study.image.src}
                alt={study.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 83vw"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-20">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="eyebrow text-accent-ink">On this page</h2>
              <ul className="mt-4 space-y-2 text-body-sm">
                {[
                  ["Context", "context"],
                  ["The problem", "problem"],
                  ["Why earlier approaches failed", "why-failed"],
                  ["The pipeline", "pipeline"],
                  ["What shipped", "shipped"],
                  ["Outcomes", "outcomes"],
                  ["What next", "what-next"],
                ].map(([label, id]) => (
                  <li key={id}>
                    <Link href={`#${id}`} className="text-ink-muted transition-colors duration-150 hover:text-accent-ink">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              {services.length ? (
                <div className="mt-8 border-t border-line-light pt-6">
                  <h2 className="eyebrow text-accent-ink">Services</h2>
                  <ul className="mt-4 space-y-2 text-body-sm">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-ink-muted transition-colors duration-150 hover:text-accent-ink"
                        >
                          {service.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="mt-8 border-t border-line-light pt-6">
                <h2 className="eyebrow text-accent-ink">Built on</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {study.stack.map((item) => (
                    <li
                      key={item}
                      className="border border-line-light px-2 py-1 text-xs font-bold uppercase tracking-[0.04em] text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="prose-bc max-w-none">
              <section id="context">
                <h2>Context</h2>
                {study.context.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </section>

              <section id="problem">
                <h2>The problem</h2>
                {study.problem.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </section>

              <section id="why-failed">
                <h2>Why earlier approaches failed</h2>
                {study.whyPreviousApproachesFailed.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </section>

              <section id="pipeline">
                <h2>The pipeline we built</h2>
                <p>{study.pipeline.intro}</p>
                <ol className="not-prose mt-8 grid gap-px border border-line-light bg-line-light">
                  {study.pipeline.stages.map((stage, index) => (
                    <li key={stage.name} className="bg-paper p-6">
                      <p className="eyebrow text-accent-ink">
                        {String(index + 1).padStart(2, "0")} · {stage.name}
                      </p>
                      <p className="mt-3 text-body-sm text-ink-muted">{stage.detail}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="shipped">
                <h2>What shipped</h2>
                <ul>
                  {study.shipped.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              </section>

              <section id="outcomes">
                <h2>Outcomes</h2>
                <p>
                  Each figure below carries the method behind it and the baseline it is measured
                  against, which is the form a real result should take. These particular numbers are
                  illustrative, they show the shape and scale of the outcome, not a measured client
                  result.
                </p>
                <dl className="not-prose mt-8 space-y-px border border-line-light bg-line-light">
                  {study.outcomes.map((outcome) => (
                    <div key={outcome.label} className="bg-paper p-6">
                      <dt className="text-[length:var(--text-h4)] font-semibold">{outcome.label}</dt>
                      <dd className="mt-2 text-body-sm text-ink-muted">{outcome.detail}</dd>
                      <dd className="mt-3 font-[family-name:var(--font-mono)] text-body-sm uppercase tracking-[0.06em] text-accent-ink">
                        {outcome.metric}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <figure className="not-prose mt-14 border-l-2 border-accent bg-paper-alt p-8">
                <blockquote className="text-[length:var(--text-h4)] leading-[1.45]">
                  &ldquo;{study.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-xs font-bold uppercase tracking-[0.04em] text-ink-muted">
                  {study.quote.attribution}
                  <span className="mt-2 block normal-case tracking-normal">
                    Attributed to a role and sector, not an individual, this is an illustrative
                    engagement and no person said this.
                  </span>
                </figcaption>
              </figure>

              <section id="what-next">
                <h2>What next</h2>
                <p>{study.whatNext}</p>
              </section>
            </div>
          </div>
        </div>
      </Section>

      {services.length ? (
        <Section size="md" className="bg-paper-alt">
          <div className="container-bc">
            <RelatedLinks
              heading="Services involved"
              links={services.map((service) => ({
                label: service.shortTitle,
                href: `/services/${service.slug}`,
                detail: service.summary,
              }))}
            />
          </div>
        </Section>
      ) : null}

      <Section size="lg">
        <div className="container-bc">
          <h2 className="text-[length:var(--text-h3)]">More engagements</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {others.map((other, index) => (
              <Reveal as="li" key={other.slug} delay={index * 70}>
                <CaseStudyCard study={other} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
