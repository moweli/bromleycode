import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/page-hero";
import { ContactForm } from "@/components/blocks/contact-form";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Describe the corpus and the decision it should be supporting. One working day for a reply, from a person who has read it.",
  alternates: { canonical: "/contact" },
};

const expectations = [
  {
    title: "What a first conversation covers",
    items: [
      "What the corpus actually looks like, formats, volume, scan quality, revision hygiene",
      "Whether anyone can define a correct answer, and who adjudicates it",
      "Whether the permission model can be resolved per user at query time",
      "What decision the output is meant to support, and how reversible it is",
    ],
  },
  {
    title: "What we will tell you",
    items: [
      "Which parts are tractable now, and which need remediation first",
      "Which parts we would advise against, with the specific blocker named",
      "A rough shape and duration, or an honest 'not yet', both are useful answers",
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Bring us the corpus you have given up on."
        standfirst="Forty-five minutes is usually enough to tell whether the work is viable. If it is not, we would rather say so now than in month four."
        width="medium"
      />

      <Section size="lg">
        <div className="container-bc grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="space-y-10">
              {expectations.map((block) => (
                <div key={block.title}>
                  <h2 className="text-[length:var(--text-h4)]">{block.title}</h2>
                  <ul className="mt-4 space-y-3">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3 text-body-sm text-ink-muted">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="border-t border-line-light pt-8">
                <h2 className="eyebrow text-accent-ink">Direct</h2>
                <p className="mt-3">
                  <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-accent-ink">
                    {site.email}
                  </a>
                </p>
                <p className="mt-1">
                  <a href={`tel:${site.phoneHref}`} className="underline underline-offset-4 hover:text-accent-ink">
                    {site.phone}
                  </a>
                </p>
                <p className="mt-3 text-body-sm text-ink-muted">{site.hours}</p>
                <address className="mt-6 space-y-1 text-body-sm not-italic text-ink-muted">
                  <p>{site.legalName}</p>
                  {site.registration.status === "registered" ? (
                    <>
                      {site.registration.registeredOffice.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                      <p>{site.registration.registeredOffice.postcode}</p>
                    </>
                  ) : (
                    <p>{site.location}</p>
                  )}
                </address>
                <p className="mt-4 text-xs text-ink-muted">
                  {site.registration.status === "registered"
                    ? `Registered in England & Wales: ${site.registration.companyNumber}`
                    : "Company registration in progress."}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-line-light bg-paper-alt p-8 lg:p-10">
              <h2 className="text-[length:var(--text-h3)]">Send an enquiry</h2>
              <p className="mt-3 text-body-sm text-ink-muted">
                Everything except the message is optional detail that helps us route it well.
              </p>
              <div className="mt-8">
                <ContactForm tone="light" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
