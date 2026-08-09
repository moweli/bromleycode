import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/legal-page";
import { termsOfUse } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms governing use of this website, and what they do and do not cover.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated={termsOfUse.updated}
      intro={termsOfUse.intro}
      sections={termsOfUse.sections}
    />
  );
}
