import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/legal-page";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What personal data Bromely Code collects, why, and the rights you have over it.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated={privacyPolicy.updated}
      intro={privacyPolicy.intro}
      sections={privacyPolicy.sections}
    />
  );
}
