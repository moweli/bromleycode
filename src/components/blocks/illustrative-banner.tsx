import { CONTENT_STATUS, CONTENT_STATUS_NOTICE } from "@/content/case-studies";

/**
 * Renders on every case-study surface while CONTENT_STATUS is "illustrative".
 * One constant removes every banner at once when real studies land, which is
 * the point — the risk is not writing illustrative content, it is illustrative
 * content quietly becoming presented-as-real during a launch rush.
 */
export function IllustrativeBanner({ variant = "full" }: { variant?: "full" | "compact" }) {
  if (CONTENT_STATUS !== "illustrative") return null;

  if (variant === "compact") {
    return (
      <p className="flex items-center gap-2 bg-accent-soft px-4 py-2 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.1em] text-accent-ink">
        <Dot />
        {CONTENT_STATUS_NOTICE.short}
      </p>
    );
  }

  return (
    <div className="border-y border-accent/40 bg-accent-soft">
      <div className="container-bc flex items-start gap-3 py-4">
        <Dot className="mt-1.5" />
        <p className="text-body-sm text-accent-ink">
          <strong className="font-semibold">{CONTENT_STATUS_NOTICE.short}.</strong>{" "}
          {CONTENT_STATUS_NOTICE.long.split(" — ")[1]}
        </p>
      </div>
    </div>
  );
}

function Dot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 shrink-0 rounded-full bg-accent ${className}`}
    />
  );
}
