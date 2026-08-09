import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/blocks/page-hero";
import { CtaBand, Faq } from "@/components/blocks/sections";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { faqs, story } from "@/content/about";
import { principles } from "@/content/methodology";
import { aboutImage } from "@/content/media";

export const metadata: Metadata = {
  title: "About",
  description:
    "A data intelligence consultancy built around the parts of enterprise GenAI that usually go wrong: the corpus, the permission model, and the absence of a definition of correct.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow={story.eyebrow}
        title={story.heading}
        standfirst={story.body[0]}
        width="medium"
      />

      <Section size="lg">
        <div className="container-bc">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius-media)]">
              <Image
                src={aboutImage.src}
                alt={aboutImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 83vw"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <Reveal>
              <h2 className="text-[length:var(--text-h2)]">What we are, plainly.</h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-5">
                {story.body.slice(1).map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-[length:var(--text-lead)] leading-[1.5] text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="dark" size="lg" wash className="grain overflow-hidden">
        <div className="container-bc relative">
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

      <Section size="lg" className="bg-paper-alt">
        <div className="container-bc">
          <Reveal>
            <SectionHeading eyebrow="Questions" title="The ones we are actually asked." />
          </Reveal>
          <Reveal delay={80} className="mt-12">
            <Faq items={faqs} />
          </Reveal>
        </div>
      </Section>


      <CtaBand />
    </>
  );
}
