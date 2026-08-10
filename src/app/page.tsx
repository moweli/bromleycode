import Link from "next/link";
import { HeroVideo } from "@/components/blocks/hero-video";
import { StatsBand } from "@/components/blocks/stats-band";
import { StackBand } from "@/components/blocks/stack-band";
import { PipelineDiagram } from "@/components/blocks/pipeline-diagram";
import { CapabilityCard, CaseStudyCard, IndustryCard } from "@/components/blocks/cards";
import { CtaBand } from "@/components/blocks/sections";
import { Reveal } from "@/components/reveal";
import { ArrowLink, Section, SectionHeading } from "@/components/ui";
import { differentiators, positioning } from "@/content/home";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";

export default function HomePage() {
  return (
    <>
      <HeroVideo />

      {/* Positioning + capabilities.
          No scroll reveal in this section, deliberately. Part of it is already
          on screen when the page loads, and the observer's -12% bottom margin
          means anything peeking above the fold stays at opacity 0 until the
          reader scrolls. That reads as a rendering fault rather than as motion.
          Every section below this one starts well out of view, so the reveal is
          kept there. */}
      <Section size="lg">
        <div className="container-bc">
          <SectionHeading eyebrow={positioning.eyebrow} title={positioning.heading} body={positioning.body} />
          <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <li key={service.slug}>
                <CapabilityCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Mechanism, the trust apparatus the positioning rests on */}
      <Section tone="dark" size="lg" wash className="grain overflow-hidden">
        <div className="container-bc relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="The mechanism"
              title="Ten stages, two loops, and the parts that usually break."
              body="Every stage can be evaluated in isolation. That matters when something degrades and you need to know whether retrieval got worse, the parser broke on a new template, or the model changed underneath you."
            />
          </Reveal>
          <Reveal delay={80} className="mt-14">
            <PipelineDiagram />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <ArrowLink href="/how-we-work" tone="dark">
              Read the method in full
            </ArrowLink>
          </Reveal>
        </div>
      </Section>

      {/* Differentiators */}
      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading eyebrow={differentiators.eyebrow} title={differentiators.heading} />
          </Reveal>
          <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {differentiators.items.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 70} className="border-t border-line-light pt-6">
                <h3 className="text-[length:var(--text-h4)]">{item.title}</h3>
                <p className="mt-3 max-w-[32rem] text-body-sm text-ink-muted">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <StatsBand />

      <StackBand />

      {/* Case studies */}
      <Section size="lg">
        <div className="container-bc">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading
                eyebrow="Engagements"
                title="What the work looks like, end to end."
                body="Four engagements written the way the work actually runs: the corpus, the constraint, the pipeline stage by stage, and what shipped."
              />
            </Reveal>
            <Reveal delay={80}>
              <ArrowLink href="/case-studies">All case studies</ArrowLink>
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {caseStudies.slice(0, 3).map((study, index) => (
              <Reveal as="li" key={study.slug} delay={index * 70}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Industries */}
      <Section size="lg" className="bg-paper-alt">
        <div className="container-bc">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading
                eyebrow="Sectors"
                title="Where we have depth."
                body="Three sectors where the unstructured mass is large, the permission model is real, and the cost of a wrong answer is high enough that evaluation is not optional."
              />
            </Reveal>
            <Reveal delay={80}>
              <ArrowLink href="/industries">All industries</ArrowLink>
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal as="li" key={industry.slug} delay={index * 70}>
                <IndustryCard industry={industry} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Insight teaser */}
      <Section size="md">
        <div className="container-bc flex flex-wrap items-center justify-between gap-8 border-y border-line-light py-10">
          <p className="max-w-[42rem] text-[length:var(--text-h4)]">
            &ldquo;Chunking is a decision, not a default.&rdquo; Notes from the build, on the parts of
            retrieval that decide whether a system survives its first quarter.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-4 font-semibold text-paper transition-colors duration-150 hover:bg-ink-700"
          >
            Read the insights
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
