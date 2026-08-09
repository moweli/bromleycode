import Image from "next/image";
import { accreditations } from "@/content/site";

/**
 * The reference carries four certification badges in its footer, and they do
 * genuine conversion work for an enterprise data buyer (design-audit.md §8.1
 * D3). Same slot, same 50px lockup height, same greyscale-on-dark treatment.
 *
 * Three renderings, by what each mark actually is:
 *   held + logo    the certifying body's own published artwork
 *   held + lockup  a tile drawn here, where no official artwork is published
 *   pending        a labelled outline, so the status is never ambiguous
 *
 * A tile linking to `verifyUrl` lets a procurement reader check the claim in one
 * click, which is the point of putting these on a page at all.
 */
export function AccreditationBand({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const held = accreditations.filter((a) => a.status === "held");
  const pending = accreditations.filter((a) => a.status === "pending");

  return (
    <div className={`border-t ${dark ? "border-line-dark" : "border-line-light"}`}>
      <div className="container-bc py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-xs">
            <h2 className={`eyebrow ${dark ? "text-mist" : "text-ink-muted"}`}>Accreditations</h2>
            <p className={`mt-2 text-xs ${dark ? "text-mist" : "text-ink-muted"}`}>
              {pending.length > 0
                ? `${held.length} held, ${pending.length} in progress. Anything shown as in progress is not yet awarded.`
                : "Certificates are available on request, and the registers below are public."}
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-3">
            {accreditations.map((item) => {
              const tile =
                item.status === "held" && item.logo ? (
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={item.logo.width}
                    height={item.logo.height}
                    className={`h-[50px] w-auto ${dark ? "brightness-0 invert" : ""}`}
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
                    <span className="text-[0.6875rem] font-bold uppercase tracking-[0.04em] opacity-80">
                      {item.status === "held" ? item.lockup?.line2 ?? item.detail : `In progress · ${item.detail}`}
                    </span>
                  </span>
                );

              return (
                <li key={item.name}>
                  {item.verifyUrl ? (
                    // No aria-label here: an accessible name that does not
                    // contain the visible text fails WCAG 2.5.3 Label in Name.
                    // The tile's own text (or the image alt) names the link.
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
