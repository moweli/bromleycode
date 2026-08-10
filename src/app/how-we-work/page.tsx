import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/page-hero";
import { PipelineDiagram, PipelineStages } from "@/components/blocks/pipeline-diagram";
import { MediaBand } from "@/components/blocks/media-band";
import { ArchitectureBlock, CtaBand } from "@/components/blocks/sections";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { bandImages } from "@/content/media";
import { engagementShape, firstNinetyDays, principles } from "@/content/methodology";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "The pipeline stage by stage, the shape of an engagement, and what the first 90 days actually looks like.",
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Method"
        title="The mechanism, in the open."
        standfirst="We would rather be judged on the mechanism than on adjectives. This is the whole of it, the stages, the loops, the engagement shape and the first 90 days."
        width="medium"
      />

      <Section tone="dark" size="lg" wash className="grain overflow-hidden">
        <div className="container-bc relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="The pipeline"
              title="One spine, two branches, three loops."
              body="The shared stages turn sources into modelled, tested data. From there the work forks, one branch to analytics and the semantic layer, one to retrieval and generation. Both rejoin at assurance, because both have to be checkable."
            />
          </Reveal>
          <Reveal delay={80} className="mt-14">
            <PipelineDiagram />
          </Reveal>
          <Reveal delay={120} className="mt-16">
            <PipelineStages tone="dark" />
          </Reveal>
        </div>
      </Section>

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading
              eyebrow="Reference architecture"
              title="What gets built, in five layers."
              body="Sized to your estate rather than to a template, and deployed inside your boundary. The assurance layer is the half most projects under-resource and the half that decides whether the system can be switched on."
            />
          </Reveal>
          {/* The photograph carries the layer idea; the block below does the
              actual work of naming them. */}
          <MediaBand
            {...bandImages.howWeWorkLayers}
            className="mt-14"
          />
          <Reveal delay={80} className="mt-14">
            <ArchitectureBlock />
          </Reveal>
        </div>
      </Section>

      <Section size="lg" className="bg-paper-alt">
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
          <MediaBand
            {...bandImages.howWeWorkEngagement}
            className="mt-14"
          />
        </div>
      </Section>

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading eyebrow="First 90 days" title={firstNinetyDays.heading} body={firstNinetyDays.intro} />
          </Reveal>
          <ol className="mt-14 space-y-px border border-line-light bg-line-light">
            {firstNinetyDays.phases.map((phase, index) => (
              <Reveal as="li" key={phase.window} delay={index * 60} className="bg-paper">
                <div className="grid gap-6 p-7 md:grid-cols-[13rem_1fr] md:gap-10 md:p-9">
                  <div>
                    <p className="eyebrow text-accent-ink">{phase.window}</p>
                    <h3 className="mt-3 text-[length:var(--text-h4)]">{phase.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {phase.items.map((item) => (
                      <li key={item} className="flex gap-3 text-body-sm text-ink-muted">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
          <MediaBand
            {...bandImages.howWeWorkNinetyDays}
            className="mt-14"
          />
        </div>
      </Section>

      {/* Light: the dark CTA band follows immediately, and two dark sections in a
          row read as one undifferentiated slab. */}
      <Section size="lg" className="bg-paper-alt">
        <div className="container-bc">
          <Reveal>
            <SectionHeading eyebrow="Principles" title="Five things we will not trade away." />
          </Reveal>
          <ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal as="li" key={principle.name} delay={index * 60} className="border-t border-line-light pt-6">
                <h3 className="text-[length:var(--text-h4)]">{principle.name}</h3>
                <p className="mt-3 text-body-sm text-ink-muted">{principle.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        eyebrow="Start here"
        heading="Bring us an estate and a constraint."
        body="The first conversation covers three things: what the estate actually looks like, whether anyone can define a correct answer or an agreed number, and whether the permission model resolves per user. Any one of them can rule the work out, and we would rather find that in week one."
      />
    </>
  );
}
