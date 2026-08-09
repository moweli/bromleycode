import Image from "next/image";
import { accreditations, site } from "@/content/site";

/**
 * The reference carries certification badges in its footer, and they do genuine
 * conversion work for an enterprise data buyer (design-audit.md §8.1 D3). Same
 * slot, same 50px lockup height.
 *
 * The left-hand column carries the statutory registration line, which UK
 * companies must disclose on their website under the Companies (Trading
 * Disclosures) Regulations, so it sits beside the marks rather than duplicating
 * them in the contact column.
 *
 * Badges are supplied as white or mono artwork and are NOT tinted here. Applying
 * an invert to artwork that is already light turns it black.
 */
export function AccreditationBand({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const registered = site.registration.status === "registered";

  return (
    <div className={`border-t ${dark ? "border-line-dark" : "border-line-light"}`}>
      <div className="container-bc py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <p className={`max-w-xs text-body-sm ${dark ? "text-mist" : "text-ink-muted"}`}>
            {registered
              ? `Registered in England & Wales, company number ${site.registration.companyNumber}.`
              : "Company registration in progress."}
          </p>

          <ul className="flex flex-wrap items-center gap-5">
            {accreditations.map((item) => {
              const tile =
                item.status === "held" && item.logo ? (
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={item.logo.width}
                    height={item.logo.height}
                    className="h-[50px] w-auto"
                  />
                ) : (
                  <span
                    className={`flex h-[50px] flex-col justify-center border px-4 ${
                      item.status === "held"
                        ? dark
                          ? "border-line-dark text-paper"
                          : "border-line-light text-ink"
                        : dark
                          ? "border-dashed border-line-dark text-mist"
                          : "border-dashed border-line-light text-ink-muted"
                    }`}
                  >
                    <span className="text-[0.8125rem] font-semibold leading-tight">
                      {item.lockup?.line1 ?? item.name}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.04em] opacity-80">
                      {item.status === "held" ? item.lockup?.line2 ?? item.detail : `In progress · ${item.detail}`}
                    </span>
                  </span>
                );

              return (
                <li key={item.name}>
                  {item.verifyUrl ? (
                    // No aria-label: an accessible name that does not contain the
                    // visible text fails WCAG 2.5.3 Label in Name.
                    <a
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex transition-opacity duration-150 hover:opacity-80"
                    >
                      {tile}
                      <span className="sr-only"> (verify on the public register, opens in a new tab)</span>
                    </a>
                  ) : (
                    tile
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
