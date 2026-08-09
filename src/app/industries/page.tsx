import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/page-hero";
import { IndustryCard } from "@/components/blocks/cards";
import { CtaBand } from "@/components/blocks/sections";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Water and utilities, central government and financial services, three sectors where the unstructured mass is large and the cost of a wrong answer is high.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Industries"
        title="Three sectors, chosen deliberately."
        standfirst="We work where the documentary mass is large, the permission model is real, and evaluation is a condition of deployment rather than a refinement. Depth in a few sectors beats a logo grid covering everything."
        width="medium"
      />

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="Large corpora, real permission models, expensive mistakes."
              body="Each of these sectors keeps its most decision-relevant material outside the warehouse, and each has a reason why a wrong answer is not a minor inconvenience."
            />
          </Reveal>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal as="li" key={industry.slug} delay={index * 70}>
                <IndustryCard industry={industry} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section size="lg" className="bg-paper-alt">
        <div className="container-bc">
          <Reveal>
            <SectionHeading
              eyebrow="Not on the list?"
              title="The pattern generalises further than the sector does."
              body="Manufacturing, energy and legal all present the same shape: a large corpus nobody can query, a permission model that has to survive retrieval, and a decision that needs a citation. If that describes your estate, the sector matters less than those three facts."
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
