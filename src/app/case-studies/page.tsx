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
    "Four illustrative engagements — water and utilities, central government, financial services and professional services — written the way we would write a real one.",
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

      <Section size="md" className="bg-paper-alt">
        <div className="container-bc">
          <Reveal>
            <SectionHeading
              eyebrow="On these being illustrative"
              title="Why we would rather label them than dress them up."
              body={[
                "Bromely Code is new. We could have written these without the banner and most readers would not have checked — which is exactly why the banner is driven by a single constant rather than by good intentions.",
                "Presenting unattributed illustrative scenarios is ordinary marketing practice. Presenting the same content as real client outcomes is a misleading commercial practice under the DMCC Act and the CAP Code. The distance between those two things is one careless edit, and this is the control that prevents it.",
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
