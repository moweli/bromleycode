/**
 * Wordmark: a mark plus a logotype set in the display face, rather than an SVG
 * with outlined text — it stays crisp at any size and needs no separate asset.
 * The mark reads as a document ruled into chunks, resolving to a single point.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="shrink-0">
        <rect x="0.75" y="0.75" width="20.5" height="20.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 6.5h9M5 11h12M5 15.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        <circle cx="16.5" cy="15.5" r="2" fill="var(--color-accent)" />
      </svg>
      <span className="font-[family-name:var(--font-display)] text-[1.0625rem] font-bold tracking-[-0.035em]">
        Bromely Code
      </span>
    </span>
  );
}
