import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/page-hero";
import { PipelineDiagram, PipelineStages } from "@/components/blocks/pipeline-diagram";
import { ArchitectureBlock, CtaBand } from "@/components/blocks/sections";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
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
        eyebrow="Method"
        title="The mechanism, in the open."
        standfirst="We have no client logos to argue on our behalf, so the argument has to be the method. This is the whole of it — the stages, the loops, the engagement shape and the first 90 days."
        width="medium"
      />

      <Section tone="dark" size="lg" wash className="grain overflow-hidden">
        <div className="container-bc relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="The pipeline"
              title="Ten stages and two loops."
              body="The forward path turns a corpus into cited answers. The two loops decide whether it gets better: access control resolving into retrieval on every query, and evaluation feeding back into the decisions that set quality."
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
        </div>
      </Section>

      <Section tone="dark" size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading tone="dark" eyebrow="Principles" title="Five things we will not trade away." />
          </Reveal>
          <ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal as="li" key={principle.name} delay={index * 60} className="border-t border-line-dark pt-6">
                <h3 className="text-[length:var(--text-h4)]">{principle.name}</h3>
                <p className="mt-3 text-body-sm text-mist-bright">{principle.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        eyebrow="Start here"
        heading="Bring us a corpus and a constraint."
        body="The first conversation covers three things: what the corpus actually looks like, whether anyone can define a correct answer, and whether the permission model resolves per user. Any one of them can rule the work out, and we would rather find that in week one."
      />
    </>
  );
}
