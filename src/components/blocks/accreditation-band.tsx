import { accreditations } from "@/content/site";

/**
 * The reference carries four real certification badges in its footer, and they
 * do genuine conversion work for an enterprise data buyer (design-audit.md
 * §8.1 D3). We build the slot now and fill it with labelled outlines rather
 * than badge-shaped graphics — a placeholder that looks like an accreditation
 * is worse than an empty one. Populate `logo` and flip `status` to "held" and
 * the tile renders the real mark instead.
 */
export function AccreditationBand({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div className={`border-t ${dark ? "border-line-dark" : "border-line-light"}`}>
      <div className="container-bc py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className={`eyebrow ${dark ? "text-mist" : "text-ink-muted"}`}>
              Accreditations
            </h2>
            <p className={`mt-2 max-w-md text-xs ${dark ? "text-mist" : "text-ink-muted"}`}>
              None of the below are held yet. They are shown as pending so the status is
              never ambiguous, and will be replaced by the certifying body&rsquo;s own mark
              on award.
            </p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {accreditations.map((item) => (
              <li key={item.name}>
                {item.status === "held" && item.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={item.logo.width}
                    height={item.logo.height}
                    className="h-[50px] w-auto"
                  />
                ) : (
                  <div
                    className={`flex h-[50px] flex-col justify-center border border-dashed px-4 ${
                      dark ? "border-line-dark text-mist" : "border-line-light text-ink-muted"
                    }`}
                  >
                    <span className="text-[0.8125rem] font-medium leading-tight">{item.name}</span>
                    <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.1em] opacity-70">
                      Pending · {item.detail}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
