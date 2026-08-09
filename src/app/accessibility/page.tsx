import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/legal-page";
import { accessibilityStatement } from "@/content/legal";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description:
    "Where this site stands against WCAG 2.1 AA, what we tested, and the limitations we know about.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility statement"
      updated={accessibilityStatement.updated}
      intro={accessibilityStatement.intro}
      sections={accessibilityStatement.sections}
    />
  );
}
