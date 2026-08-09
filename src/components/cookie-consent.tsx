"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

/**
 * First-party consent banner. The reference loads a third-party consent SDK
 * (Cookiebot) which renders a panel in its own type stack and costs an extra
 * origin; we keep the same obligations and drop the dependency.
 *
 * Non-essential scripts must not run before consent. Nothing here loads
 * analytics directly — instead consent is published on `window` and as a
 * `bc-consent` event, and any future analytics loader subscribes to it. That
 * keeps the blocking guarantee in one place rather than in every integration.
 */

const STORAGE_KEY = "bc-consent-v1";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

declare global {
  interface Window {
    __bcConsent?: ConsentState;
    bcOpenConsent?: () => void;
  }
}

function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    // Private mode or storage disabled — treat as "not yet decided" and ask again.
    return null;
  }
}

function publish(state: ConsentState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Persisting failed; the in-memory value still gates this page view.
  }
  window.__bcConsent = state;
  window.dispatchEvent(new CustomEvent<ConsentState>("bc-consent", { detail: state }));
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      window.__bcConsent = existing;
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    } else {
      setOpen(true);
    }
    window.bcOpenConsent = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setShowDetail(true);
      setOpen(true);
    };
    return () => {
      delete window.bcOpenConsent;
    };
  }, []);

  const decide = useCallback((next: { analytics: boolean; marketing: boolean }) => {
    publish({ necessary: true, ...next, decidedAt: new Date().toISOString() });
    setOpen(false);
    setShowDetail(false);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line-dark bg-ink-950 text-paper"
    >
      <div className="container-bc py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="consent-title" className="text-[length:var(--text-h4)]">
              Cookies on this site
            </h2>
            <p className="mt-2 text-body-sm text-mist">
              We use strictly necessary cookies to make the site work. Everything else, 
              analytics and marketing, stays switched off until you say otherwise. No
              non-essential script runs before you choose.{" "}
              <Link href="/cookies" className="text-accent underline underline-offset-4">
                Cookie policy
              </Link>
              .
            </p>

            {showDetail ? (
              <fieldset className="mt-5 space-y-3 border-t border-line-dark pt-5">
                <legend className="sr-only">Cookie categories</legend>
                <label className="flex items-start gap-3 text-body-sm text-mist">
                  <input type="checkbox" checked readOnly disabled className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-accent)]" />
                  <span>
                    <span className="block font-medium text-paper">Strictly necessary</span>
                    Session, security and consent state. Always on; the site cannot function without them.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-body-sm text-mist">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                  />
                  <span>
                    <span className="block font-medium text-paper">Analytics</span>
                    Aggregate page and referrer counts, so we can tell which pages are worth keeping.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-body-sm text-mist">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(event) => setMarketing(event.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                  />
                  <span>
                    <span className="block font-medium text-paper">Marketing</span>
                    Campaign attribution. Currently unused, the category exists so the choice is honest if it ever is.
                  </span>
                </label>
              </fieldset>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <button
              type="button"
              onClick={() => decide({ analytics: false, marketing: false })}
              className="rounded-full border border-line-dark px-6 py-3 text-sm font-semibold transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              Reject non-essential
            </button>
            {showDetail ? (
              <button
                type="button"
                onClick={() => decide({ analytics, marketing })}
                className="rounded-full border border-line-dark px-6 py-3 text-sm font-semibold transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                Save choices
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowDetail(true)}
                className="rounded-full border border-line-dark px-6 py-3 text-sm font-semibold transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                Manage
              </button>
            )}
            <button
              type="button"
              onClick={() => decide({ analytics: true, marketing: true })}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-accent-hover"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Footer/legal-page control that reopens the banner. */
export function ConsentReopenButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.bcOpenConsent?.()}
      className={`underline underline-offset-4 transition-colors duration-150 hover:text-accent ${className}`}
    >
      Change your cookie choices
    </button>
  );
}
