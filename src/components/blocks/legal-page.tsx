import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/ui";
import { ConsentReopenButton } from "@/components/cookie-consent";
import type { LegalSection } from "@/content/legal";
import type { ReactNode } from "react";

/**
 * An open business decision, marked so a reviewer can find every one of them in
 * a single pass rather than reading the whole document for square brackets.
 */
function ConfirmNote({ children, inline = false }: { children: ReactNode; inline?: boolean }) {
  return (
    <span
      className={`${inline ? "" : "my-4 "}block border-l-2 border-accent bg-accent-soft px-4 py-3 text-body-sm text-accent-ink`}
    >
      {children}
    </span>
  );
}

/**
 * Legal template. The review banner is not decoration — these documents are
 * structured placeholders with the ICO's expected sections stubbed, and shipping
 * them as finished policy would be worse than shipping nothing.
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

      <div className="border-y border-accent/40 bg-accent-soft">
        <div className="container-bc py-4">
          <p className="text-body-sm text-accent-ink">
            <strong className="font-semibold">Draft, requires legal review.</strong> A complete
            draft, not a finished policy: it has not been reviewed by a qualified adviser. Passages
            marked <span className="font-[family-name:var(--font-mono)] text-[0.8em]">CONFIRM</span>{" "}
            are business decisions rather than drafting choices and must be settled before launch.
          </p>
        </div>
      </div>

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
                {section.paragraphs.map((paragraph) =>
                  paragraph.startsWith("CONFIRM") ? (
                    <ConfirmNote key={paragraph.slice(0, 40)}>{paragraph}</ConfirmNote>
                  ) : (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ),
                )}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item.slice(0, 40)}>
                        {item.startsWith("CONFIRM") ? <ConfirmNote inline>{item}</ConfirmNote> : item}
                      </li>
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
