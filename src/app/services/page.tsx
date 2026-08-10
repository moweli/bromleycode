import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/page-hero";
import { CapabilityCard } from "@/components/blocks/cards";
import { CtaBand } from "@/components/blocks/sections";
import { PipelineDiagram } from "@/components/blocks/pipeline-diagram";
import { MediaBand } from "@/components/blocks/media-band";
import { Reveal } from "@/components/reveal";
import { ArrowLink, Section, SectionHeading } from "@/components/ui";
import { services } from "@/content/services";
import { bandImages } from "@/content/media";
import { engagementShape } from "@/content/methodology";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four engagements: intelligence extraction, data and pipeline engineering, AI strategy and roadmap, and evaluation and assurance.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four engagements, one pipeline."
        standfirst="We are engaged to build and hand over. Each service is a different entry point into the same pipeline, and most engagements touch two of them."
        width="medium"
      />

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading
              eyebrow="What we are engaged to do"
              title="Pick the entry point; the pipeline is the same."
              body="Extraction and engineering usually run together. Strategy comes first when nobody has opened the corpus yet. Assurance runs alongside everything and is the one most often left out."
            />
          </Reveal>
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={index * 70}>
                <CapabilityCard service={service} />
              </Reveal>
            ))}
          </ul>
          <MediaBand
            {...bandImages.servicesIndex}
            className="mt-16"
          />
        </div>
      </Section>

      <Section tone="dark" size="lg" wash className="grain overflow-hidden">
        <div className="container-bc relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="The pipeline"
              title="Where each service sits."
              body="Platform engineering builds the spine both branches run on. Extraction takes the retrieval branch, strategy decides which branch earns the next quarter, and assurance sits on the join because both branches have to be checkable."
            />
          </Reveal>
          <Reveal delay={80} className="mt-14">
            <PipelineDiagram />
          </Reveal>
        </div>
      </Section>

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading eyebrow="Engagement shape" title={engagementShape.heading} body={engagementShape.intro} />
          </Reveal>
          <ol className="mt-14 grid gap-px border border-line-light bg-line-light md:grid-cols-2">
            {engagementShape.items.map((item, index) => (
              <Reveal as="li" key={item.name} delay={index * 60} className="bg-paper p-7">
                <p className="eyebrow text-accent-ink">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-[length:var(--text-h4)]">{item.name}</h3>
                <p className="mt-3 text-body-sm text-ink-muted">{item.detail}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120} className="mt-10">
            <ArrowLink href="/how-we-work">What the first 90 days looks like</ArrowLink>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="Start here"
        heading="Not sure which of these you need?"
        body="Most people are not, at the point they get in touch. Describe the corpus and what you want out of it and we will tell you which of the four this actually is, including when the honest answer is none of them yet."
      />
    </>
  );
}
