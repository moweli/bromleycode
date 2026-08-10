import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/page-hero";
import { CaseStudyCard } from "@/components/blocks/cards";
import { CtaBand } from "@/components/blocks/sections";
import { IllustrativeBanner } from "@/components/blocks/illustrative-banner";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Four engagements, water and utilities, central government, financial services and professional services, written the way the work actually runs.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  const [featured, ...rest] = caseStudies;

  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Case studies"
        title="Engagements, end to end."
        standfirst="The corpus, the constraint, the pipeline stage by stage, and what shipped. Written at the level of detail a Head of Data would need to decide whether we have done this before."
        width="medium"
      />

      <IllustrativeBanner />

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading
              eyebrow="Four engagements"
              title="Written to be checked, not skimmed."
              body="Each one names the chunking strategy, the retrieval approach, the permission model and the evaluation method, because that is the level at which a technical buyer can tell whether a supplier has done this before."
              className="mb-14"
            />
          </Reveal>
          <Reveal>
            <CaseStudyCard study={featured} featured />
          </Reveal>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((study, index) => (
              <Reveal as="li" key={study.slug} delay={index * 70}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
