"use client";

import { useActionState, useId } from "react";
import Link from "next/link";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

/**
 * Underline-only fields, following the reference's form aesthetic — with the
 * focus states it removes. Client validation is HTML-native (required, type,
 * minLength) so it works before hydration; the server action is the boundary
 * that actually decides.
 */
export function ContactForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const formId = useId();
  const dark = tone === "dark";

  const field = [
    "w-full border-0 border-b bg-transparent px-0 pt-2 pb-3 text-body transition-colors duration-150",
    dark
      ? "border-line-dark text-paper placeholder:text-mist focus:border-accent"
      : "border-line-light text-ink placeholder:text-ink-muted focus:border-accent-ink",
  ].join(" ");
  const label = `block text-body-sm font-medium ${dark ? "text-mist-bright" : "text-ink-muted"}`;
  const error = "mt-2 block text-body-sm text-accent";

  if (state.status === "success") {
    return (
      <div
        role="status"
        className={`border p-8 ${dark ? "border-accent/50 bg-ink-800 text-paper" : "border-accent/50 bg-paper text-ink"}`}
      >
        <p className="eyebrow text-accent">Received</p>
        <h3 className="mt-3 text-[length:var(--text-h4)]">{state.message}</h3>
        <p className={`mt-3 text-body-sm ${dark ? "text-mist-bright" : "text-ink-muted"}`}>
          If it is urgent, email us directly at{" "}
          <a href="mailto:hello@bromelycode.com" className="underline underline-offset-4">
            hello@bromelycode.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-7" noValidate={false}>
      {state.status === "error" && state.message ? (
        <p role="alert" className={`border-l-2 border-accent pl-4 text-body-sm ${dark ? "text-paper" : "text-ink"}`}>
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={label}>
            Your name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            defaultValue={state.values?.name}
            aria-invalid={state.fieldErrors?.name ? true : undefined}
            aria-describedby={state.fieldErrors?.name ? `${formId}-name-error` : undefined}
            className={field}
          />
          {state.fieldErrors?.name ? (
            <span id={`${formId}-name-error`} className={error}>
              {state.fieldErrors.name}
            </span>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className={label}>
            Work email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            defaultValue={state.values?.email}
            aria-invalid={state.fieldErrors?.email ? true : undefined}
            aria-describedby={state.fieldErrors?.email ? `${formId}-email-error` : undefined}
            className={field}
          />
          {state.fieldErrors?.email ? (
            <span id={`${formId}-email-error`} className={error}>
              {state.fieldErrors.email}
            </span>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-organisation`} className={label}>
            Organisation {/* No opacity here: it drops muted label text below 4.5:1. */}
            <span className="font-normal">(optional)</span>
          </label>
          <input
            id={`${formId}-organisation`}
            name="organisation"
            type="text"
            maxLength={160}
            autoComplete="organization"
            defaultValue={state.values?.organisation}
            className={field}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-role`} className={label}>
            Your role {/* No opacity here: it drops muted label text below 4.5:1. */}
            <span className="font-normal">(optional)</span>
          </label>
          <input
            id={`${formId}-role`}
            name="role"
            type="text"
            maxLength={120}
            autoComplete="organization-title"
            defaultValue={state.values?.role}
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className={label}>
          What are you trying to get out of, and what is it sitting in?
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          minLength={20}
          maxLength={4000}
          defaultValue={state.values?.message}
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          aria-describedby={state.fieldErrors?.message ? `${formId}-message-error` : undefined}
          className={`${field} resize-y`}
        />
        {state.fieldErrors?.message ? (
          <span id={`${formId}-message-error`} className={error}>
            {state.fieldErrors.message}
          </span>
        ) : null}
      </div>

      {/* Honeypot — visually and programmatically hidden from people. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={`${formId}-website`}>Company website</label>
        <input id={`${formId}-website`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className={`flex items-start gap-3 text-body-sm ${dark ? "text-mist-bright" : "text-ink-muted"}`}>
          <input
            name="consent"
            type="checkbox"
            required
            defaultChecked={state.values?.consent === "on"}
            aria-invalid={state.fieldErrors?.consent ? true : undefined}
            className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
          />
          <span>
            I agree that Bromely Code may store this enquiry in order to respond to it, as described in
            the{" "}
            <Link href="/privacy" className={dark ? "text-accent underline underline-offset-4" : "text-accent-ink underline underline-offset-4"}>
              privacy policy
            </Link>
            . We will not add you to a mailing list.
          </span>
        </label>
        {state.fieldErrors?.consent ? <span className={error}>{state.fieldErrors.consent}</span> : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold transition-colors duration-150 disabled:cursor-progress disabled:opacity-70 ${
          dark ? "bg-accent text-ink-950 hover:bg-accent-hover" : "bg-ink text-paper hover:bg-ink-700"
        }`}
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
