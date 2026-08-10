import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/page-hero";
import { ArticleCard } from "@/components/blocks/cards";
import { CtaBand } from "@/components/blocks/sections";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { insights } from "@/content/insights";
import { insightImages } from "@/content/media";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes from the build: per-attribute history, contracts that stop a load, chunking strategy, permission inheritance, abstention, and evaluation set design.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Insights"
        title="Notes from the build."
        standfirst="Written for the people who will have to run these systems. Specific enough to disagree with, which is the point."
        width="medium"
      />

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <SectionHeading
              eyebrow="Latest"
              title="Six decisions that decide whether a system survives."
              body="History, contracts, chunking, permission inheritance, abstention and evaluation design. None of them are the model or the warehouse tool, and all of them are where the projects we get called into have already gone wrong."
            />
          </Reveal>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {insights.map((insight, index) => (
              <Reveal as="li" key={insight.slug} delay={index * 70}>
                <ArticleCard insight={insight} image={insightImages[insight.slug]} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
