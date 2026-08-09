import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { AccreditationBand } from "@/components/blocks/accreditation-band";
import { footerNav, legalNav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-accent bg-ink-950 text-paper">
      <div className="container-bc section">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark className="text-paper" />
            <p className="mt-5 max-w-xs text-body-sm text-mist">{site.tagline}</p>
          </div>

          {footerNav.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="eyebrow text-mist">{column.heading}</h2>
              {/* py-1 lifts each link to ~28px tall, over the 24px WCAG 2.5.8
                  minimum, without stretching the footer. */}
              <ul className="mt-4 space-y-1">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-1 text-body-sm text-paper/85 transition-colors duration-150 hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* UK convention: registered office and company number in the footer.
              Enterprise procurement looks for these. */}
          <div>
            <h2 className="eyebrow text-mist">Get in touch</h2>
            <address className="mt-5 space-y-1 text-body-sm not-italic text-paper/85">
              <p>{site.legalName}</p>
              {site.registration.status === "registered" ? (
                <p>{site.registration.registeredOffice.oneLine}</p>
              ) : (
                <p>{site.location}</p>
              )}
              <p className="pt-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-block py-1 underline underline-offset-4 transition-colors duration-150 hover:text-accent"
                >
                  {site.email}
                </a>
              </p>
            </address>
            {/* The registration line lives in the accreditation band below.
                VAT appears here only once it exists: an empty label reads as an
                oversight, and a fabricated number is checkable. */}
            {site.registration.status === "registered" && site.registration.vatNumber ? (
              <p className="mt-5 text-xs leading-relaxed text-mist">
                VAT {site.registration.vatNumber}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <AccreditationBand />

      <div className="border-t border-line-dark">
        <div className="container-bc flex flex-col gap-4 py-7 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1 transition-colors duration-150 hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
