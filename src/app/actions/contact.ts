"use server";

/**
 * Contact form handler.
 *
 * Validation runs here as well as in the browser — the client checks are a
 * convenience, this is the trust boundary. No third-party form service is
 * assumed; `deliver()` is the single stub to replace with a mailer, a CRM call
 * or a queue write.
 */

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echoed back so a failed submission does not empty the form. */
  values?: Partial<Record<ContactField, string>>;
};

type ContactField = "name" | "email" | "organisation" | "role" | "message" | "consent";

const MAX = { name: 120, email: 254, organisation: 160, role: 120, message: 4000 } as const;

// Deliberately permissive: the only reliable email validation is delivery.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(data: FormData, field: ContactField) {
  const value = data.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(_previous: ContactState, data: FormData): Promise<ContactState> {
  // Honeypot. Bots fill every field; humans never see this one.
  if (text(data, "role" as ContactField) && data.get("company_website")) {
    return { status: "success", message: "Thanks, we will come back to you within one working day." };
  }

  const values = {
    name: text(data, "name"),
    email: text(data, "email"),
    organisation: text(data, "organisation"),
    role: text(data, "role"),
    message: text(data, "message"),
    consent: data.get("consent") === "on" ? "on" : "",
  };

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!values.name) fieldErrors.name = "Please tell us your name.";
  else if (values.name.length > MAX.name) fieldErrors.name = `Please keep this under ${MAX.name} characters.`;

  if (!values.email) fieldErrors.email = "We need an email address to reply to.";
  else if (!EMAIL.test(values.email) || values.email.length > MAX.email)
    fieldErrors.email = "That does not look like an email address we can reply to.";

  if (values.organisation.length > MAX.organisation)
    fieldErrors.organisation = `Please keep this under ${MAX.organisation} characters.`;
  if (values.role.length > MAX.role) fieldErrors.role = `Please keep this under ${MAX.role} characters.`;

  if (!values.message) fieldErrors.message = "A sentence or two about the corpus is enough to start.";
  else if (values.message.length < 20) fieldErrors.message = "A little more detail would help us route this well.";
  else if (values.message.length > MAX.message)
    fieldErrors.message = `Please keep this under ${MAX.message} characters.`;

  if (!values.consent) fieldErrors.consent = "We need your agreement before we can store this enquiry.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Some details need another look.",
      fieldErrors,
      values,
    };
  }

  try {
    await deliver(values);
    return {
      status: "success",
      message: "Thanks, we will come back to you within one working day.",
    };
  } catch (error) {
    // Never lose the enquiry silently: log for the operator, tell the sender the truth.
    console.error("[contact] delivery failed", error);
    return {
      status: "error",
      message:
        "Something went wrong sending this. Please email enquiries@bromelycode.com directly and we will pick it up from there.",
      values,
    };
  }
}

/**
 * STUB. Replace with the real delivery path — SMTP, a transactional provider,
 * a CRM endpoint or a queue. Keep the throw-on-failure contract so the caller
 * can tell the sender the truth.
 */
async function deliver(enquiry: Record<string, string>) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] enquiry received (stub handler)", {
      ...enquiry,
      // Do not log the message body in full; it may carry client detail.
      message: `${enquiry.message.slice(0, 60)}…`,
    });
    return;
  }
  throw new Error("No delivery handler configured. Wire up deliver() before launch.");
}
