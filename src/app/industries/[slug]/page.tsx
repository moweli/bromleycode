import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks/page-hero";
import { CaseStudyCard } from "@/components/blocks/cards";
import { CtaBand, RelatedLinks } from "@/components/blocks/sections";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { getIndustry, industries } from "@/content/industries";
import { getCaseStudy } from "@/content/case-studies";
import { getService } from "@/content/services";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry not found" };
  return {
    title: industry.name,
    description: industry.summary,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      title: `${industry.name} — Bromely Code`,
      description: industry.summary,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: industry.name }],
    },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const studies = industry.relatedCaseStudies
    .map((studySlug) => getCaseStudy(studySlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const services = industry.services
    .map((serviceSlug) => getService(serviceSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <PageHero
        eyebrow={industry.eyebrow}
        title={industry.name}
        standfirst={industry.standfirst}
        breadcrumb={{ label: "All industries", href: "/industries" }}
        width="medium"
      />

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius-media)]">
              <Image
                src={industry.image.src}
                alt={industry.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 83vw"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow="Where it sits" title="The corpora that matter here." />
            </Reveal>
            <Reveal delay={80}>
              <ul className="border-t border-line-light">
                {industry.corpora.map((item) => (
                  <li key={item.name} className="border-b border-line-light py-6">
                    <h3 className="text-[length:var(--text-h4)]">{item.name}</h3>
                    <p className="mt-2 text-body-sm text-ink-muted">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="dark" size="lg" wash className="grain overflow-hidden">
        <div className="container-bc relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Challenges"
              title="What actually goes wrong."
              body="Not the sector's problems in general — the specific failure modes that decide whether a retrieval system in this sector survives contact with production."
            />
          </Reveal>
          <ul className="mt-14 grid gap-px border border-line-dark bg-line-dark md:grid-cols-2">
            {industry.challenges.map((item, index) => (
              <Reveal as="li" key={item.name} delay={index * 60} className="bg-ink-900 p-7">
                <h3 className="text-[length:var(--text-h4)]">{item.name}</h3>
                <p className="mt-3 text-body-sm text-mist-bright">{item.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading
              eyebrow="Constraints"
              title="What shapes the architecture before a line is written."
            />
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {industry.constraints.map((item, index) => (
              <Reveal as="li" key={item.name} delay={index * 60} className="border-t border-line-light pt-6">
                <h3 className="text-[length:var(--text-h4)]">{item.name}</h3>
                <p className="mt-3 text-body-sm text-ink-muted">{item.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {studies.length ? (
        <Section size="lg" className="bg-paper-alt">
          <div className="container-bc">
            <Reveal>
              <SectionHeading eyebrow="Engagement" title="How this looks in practice." />
            </Reveal>
            <div className="mt-12 space-y-6">
              {studies.map((study) => (
                <Reveal key={study.slug}>
                  <CaseStudyCard study={study} featured />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {services.length ? (
        <Section size="md">
          <div className="container-bc">
            <RelatedLinks
              heading="Services that apply here"
              links={services.map((service) => ({
                label: service.shortTitle,
                href: `/services/${service.slug}`,
                detail: service.summary,
              }))}
            />
          </div>
        </Section>
      ) : null}

      <CtaBand
        eyebrow="Start here"
        heading={`Talk to us about ${industry.name.toLowerCase()}.`}
        body="Describe the corpus and the decision it should be supporting. We will tell you which parts are tractable now, which need remediation first, and which we would advise against."
      />
    </>
  );
}
