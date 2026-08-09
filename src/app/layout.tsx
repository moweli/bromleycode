import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { site } from "@/content/site";

/**
 * Geist Sans carries the whole system — display, body and UI — which is the
 * reference site's own arrangement (design-audit.md §1.1: a single variable
 * face, hierarchy carried entirely by size, weight and letter-spacing).
 *
 * Licensing is clean: Geist is SIL Open Font License 1.1, self-hosted by the
 * `geist` package with no runtime request to a third-party origin.
 *
 * Geist Mono survives in exactly two places — the pipeline diagram's stage
 * numbers and the architecture block's layer notes — where fixed-width figures
 * do real work. It is not used for eyebrows or labels; those are Geist Sans,
 * small and bold, as on the reference.
 */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.tagline}`,
    template: `%s, ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name}, ${site.tagline}`,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  areaServed: "GB",
  // Locality only until incorporation — a fabricated street address in
  // structured data is a machine-readable false statement.
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  knowsAbout: [
    "Retrieval-augmented generation",
    "Information retrieval",
    "Data engineering",
    "Model evaluation",
    "Unstructured data extraction",
  ],
  serviceType: [
    "Intelligence extraction",
    "Data and pipeline engineering",
    "AI strategy and roadmap",
    "Evaluation and assurance",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-3 focus:font-medium focus:text-paper"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CookieConsent />
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
      </body>
    </html>
  );
}
