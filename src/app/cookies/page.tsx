import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/legal-page";
import { cookiePolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "What this site stores, when, and how to change your choices.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie policy"
      updated={cookiePolicy.updated}
      intro={cookiePolicy.intro}
      sections={cookiePolicy.sections}
      showConsentControl
    />
  );
}
