import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks/page-hero";
import { CaseStudyCard } from "@/components/blocks/cards";
import { CtaBand, Faq, RelatedLinks } from "@/components/blocks/sections";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { getService, services } from "@/content/services";
import { getCaseStudy } from "@/content/case-studies";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    // Overriding openGraph replaces the parent's entry wholesale, so the image
    // has to be restated or these routes ship without one.
    openGraph: {
      title: `${service.title} — Bromely Code`,
      description: service.summary,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: service.title }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const caseStudy = getCaseStudy(service.relatedCaseStudy);
  const related = service.relatedServices
    .map((relatedSlug) => getService(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: { "@type": "ProfessionalService", name: "Bromely Code Ltd" },
    areaServed: "GB",
    serviceType: service.title,
  };

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        standfirst={service.standfirst}
        breadcrumb={{ label: "All services", href: "/services" }}
        width="medium"
      />

      <Section size="lg">
        <div className="container-bc grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <h2 className="text-[length:var(--text-h2)]">{service.problem.heading}</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-5">
              {service.problem.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[length:var(--text-lead)] leading-[1.5] text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark" size="lg" wash className="grain overflow-hidden">
        <div className="container-bc relative">
          <Reveal>
            <SectionHeading tone="dark" eyebrow="Method" title={service.approach.heading} body={service.approach.intro} />
          </Reveal>
          <ol className="mt-14 grid gap-px border border-line-dark bg-line-dark md:grid-cols-2">
            {service.approach.steps.map((step, index) => (
              <Reveal as="li" key={step.name} delay={index * 50} className="bg-ink-900 p-7">
                <p className="eyebrow text-accent">
                  {String(index + 1).padStart(2, "0")} · {step.name}
                </p>
                <p className="mt-4 text-body-sm text-mist-bright">{step.detail}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading eyebrow="Deliverables" title="What you are left holding." />
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {service.deliverables.map((item, index) => (
              <Reveal as="li" key={item.name} delay={index * 60} className="border-t border-line-light pt-6">
                <h3 className="text-[length:var(--text-h4)]">{item.name}</h3>
                <p className="mt-3 text-body-sm text-ink-muted">{item.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section size="lg" className="bg-paper-alt">
        <div className="container-bc">
          <Reveal>
            <SectionHeading
              eyebrow="The hard parts"
              title="The questions worth asking us."
              body="If a supplier cannot answer these specifically, they have not shipped one of these systems."
            />
          </Reveal>
          <Reveal delay={80} className="mt-12">
            <Faq items={service.hardParts.map((item) => ({ question: item.question, answer: item.answer }))} />
          </Reveal>
        </div>
      </Section>

      {caseStudy ? (
        <Section size="lg">
          <div className="container-bc">
            <Reveal>
              <SectionHeading eyebrow="Related engagement" title="How this looks in practice." />
            </Reveal>
            <Reveal delay={80} className="mt-12">
              <CaseStudyCard study={caseStudy} featured />
            </Reveal>
          </div>
        </Section>
      ) : null}

      {related.length ? (
        <Section size="md" className="bg-paper-alt">
          <div className="container-bc">
            <RelatedLinks
              heading="Usually engaged alongside"
              links={related.map((item) => ({
                label: item.shortTitle,
                href: `/services/${item.slug}`,
                detail: item.summary,
              }))}
            />
          </div>
        </Section>
      ) : null}

      <CtaBand
        eyebrow="Start here"
        heading={`Talk to us about ${service.shortTitle.toLowerCase()}.`}
        body="Bring the corpus, the constraint and the question you want answered. Forty-five minutes is usually enough to tell whether this is viable, and we would rather say so early."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
