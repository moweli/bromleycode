import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { AccreditationBand } from "@/components/blocks/accreditation-band";
import { footerNav, legalNav, site, socials } from "@/content/site";

const socialPaths: Record<string, string> = {
  linkedin:
    "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8h4.52v14H.24V8zm7.2 0h4.33v1.92h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V22h-4.5v-6.63c0-1.58-.03-3.62-2.2-3.62-2.2 0-2.54 1.72-2.54 3.5V22H7.44V8z",
  github:
    "M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z",
};

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-accent bg-ink-950 text-paper">
      <div className="container-bc section">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark className="text-paper" />
            <p className="mt-5 max-w-xs text-body-sm text-mist">{site.tagline}</p>
            <ul className="mt-7 flex gap-3">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    rel="noopener noreferrer me"
                    target="_blank"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-dark text-mist transition-colors duration-150 hover:border-accent hover:text-accent"
                  >
                    <span className="sr-only">{social.label}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={socialPaths[social.icon]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
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
