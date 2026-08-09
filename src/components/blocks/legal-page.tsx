import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/ui";
import { ConsentReopenButton } from "@/components/cookie-consent";
import type { LegalSection } from "@/content/legal";

/**
 * Legal template. Plain document layout: a light hero, a last-updated line, and
 * numbered sections set in a reading measure.
 */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
  showConsentControl = false,
}: {
  title: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
  showConsentControl?: boolean;
}) {
  return (
    <>
      <PageHero tone="light" eyebrow="Legal" title={title} width="full" />

      <Section size="lg">
        <div className="container-bc">
          <div className="prose-bc">
            <p className="text-xs font-bold uppercase tracking-[0.04em] text-ink-muted">
              Last updated {updated}
            </p>
            {intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-[length:var(--text-lead)] leading-[1.5]">
                {paragraph}
              </p>
            ))}

            {sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item.slice(0, 40)}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {showConsentControl ? (
              <p className="mt-10">
                <ConsentReopenButton className="text-accent-ink" />
              </p>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}
