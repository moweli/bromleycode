/**
 * Legal templates.
 *
 * These are STRUCTURED PLACEHOLDERS, not legal advice and not a finished
 * policy. Section headings follow the ICO's expectations for a privacy notice
 * under UK GDPR so nothing structural is missing; the content in square
 * brackets must be completed and the whole document reviewed by a qualified
 * adviser before launch.
 */

export const LEGAL_STATUS = "requires-legal-review" as const;

export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };

export const privacyPolicy: { updated: string; intro: string[]; sections: LegalSection[] } = {
  updated: "9 August 2026",
  intro: [
    "This notice explains what personal data Bromely Code Ltd collects, why we collect it, what we do with it, and the rights you have over it.",
    "It covers this website and enquiries made through it. Personal data processed on behalf of a client during an engagement is governed by the data processing agreement in that engagement's contract, not by this notice.",
  ],
  sections: [
    {
      heading: "1. Who we are",
      paragraphs: [
        "Bromely Code Ltd ([COMPANY NUMBER]) is the data controller for personal data collected through this website. Our registered office is [REGISTERED OFFICE ADDRESS].",
        "We are registered with the Information Commissioner's Office under registration number [ICO REGISTRATION NUMBER].",
        "Data protection enquiries: [DATA PROTECTION CONTACT EMAIL]. [CONFIRM whether a Data Protection Officer is required under Article 37 and, if appointed, name them here.]",
      ],
    },
    {
      heading: "2. What personal data we collect",
      paragraphs: ["We collect only what we need in order to reply to you and to run the site."],
      list: [
        "Enquiry data: your name, email address, and any organisation, role or message content you choose to provide through the contact form.",
        "Technical data: IP address, browser type and pages requested, recorded in server logs. [CONFIRM retention period with hosting provider.]",
        "Consent data: your cookie choices and the date you made them, stored in your browser.",
        "Analytics data: only if you consent to analytics cookies. [COMPLETE once an analytics provider is selected — name the provider, the data collected, and the transfer position.]",
      ],
    },
    {
      heading: "3. How we use it, and our lawful basis",
      paragraphs: [
        "We rely on the following lawful bases under Article 6 of the UK GDPR:",
      ],
      list: [
        "Replying to your enquiry — legitimate interests (Article 6(1)(f)): responding to someone who has contacted us about our services. [A legitimate interests assessment should be completed and retained.]",
        "Analytics — consent (Article 6(1)(a)), withdrawable at any time through the cookie controls.",
        "Keeping records of enquiries and contracts — legal obligation (Article 6(1)(c)) and legitimate interests.",
      ],
    },
    {
      heading: "4. Who we share it with",
      paragraphs: [
        "We do not sell personal data and we do not share it for advertising.",
        "[LIST every processor before launch — hosting, email delivery, analytics, CRM — with the categories of data each receives and a link to their sub-processor list.]",
      ],
    },
    {
      heading: "5. International transfers",
      paragraphs: [
        "[COMPLETE once processors are confirmed. For each transfer outside the UK, state the safeguard relied on — UK adequacy regulations, the International Data Transfer Agreement, or the UK Addendum to the EU Standard Contractual Clauses — and confirm a transfer risk assessment has been carried out.]",
      ],
    },
    {
      heading: "6. How long we keep it",
      paragraphs: [
        "[SET a retention period for each category and record the justification. Suggested starting points for review: enquiries that do not become engagements — 24 months; enquiries that do — the contractual retention period; server logs — [PERIOD]; consent records — 24 months from the date given.]",
      ],
    },
    {
      heading: "7. How we protect it",
      paragraphs: [
        "Access to enquiry data is limited to the people who need it in order to reply. Data is encrypted in transit. [COMPLETE with the technical and organisational measures actually in place, and align this section with the security schedule used in client contracts.]",
      ],
    },
    {
      heading: "8. Your rights",
      paragraphs: [
        "Under the UK GDPR you have the right to access your data, to have inaccurate data corrected, to have data erased, to restrict or object to processing, to data portability, and to withdraw consent at any time where processing is based on consent.",
        "To exercise any of these, contact [DATA PROTECTION CONTACT EMAIL]. We will respond within one month.",
      ],
    },
    {
      heading: "9. Automated decision-making",
      paragraphs: [
        "We do not make decisions about you by automated means, and we do not carry out profiling, on this website.",
      ],
    },
    {
      heading: "10. Complaints",
      paragraphs: [
        "If you are unhappy with how we have handled your data, please tell us first so we can put it right. You also have the right to complain to the Information Commissioner's Office at ico.org.uk, or by calling 0303 123 1113.",
      ],
    },
    {
      heading: "11. Changes to this notice",
      paragraphs: [
        "We will update this notice when our processing changes, and will record the date of the most recent change at the top of this page.",
      ],
    },
  ],
};

export const cookiePolicy: { updated: string; intro: string[]; sections: LegalSection[] } = {
  updated: "9 August 2026",
  intro: [
    "This page explains the cookies and similar technologies this site uses, and how to change your choices.",
    "Nothing beyond strictly necessary storage is set before you consent. If you reject non-essential cookies, no analytics or marketing script is loaded at all — the choice is enforced by the site, not by a request to a third party.",
  ],
  sections: [
    {
      heading: "Strictly necessary",
      paragraphs: [
        "These are required for the site to work and are exempt from the consent requirement under regulation 6(4) of the Privacy and Electronic Communications Regulations.",
      ],
      list: [
        "bc-consent-v1 — stores your cookie choices and the date you made them, in your browser's local storage. Retained for 24 months or until you clear it.",
      ],
    },
    {
      heading: "Analytics",
      paragraphs: [
        "Set only if you accept analytics. Used to count page views and referrers in aggregate so we can tell which pages are worth keeping.",
        "[COMPLETE once an analytics provider is selected — list each cookie, its purpose, its lifetime, and the provider.]",
      ],
    },
    {
      heading: "Marketing",
      paragraphs: [
        "None are currently set. The category exists so that the choice is available and honest if that ever changes.",
      ],
    },
    {
      heading: "Changing your mind",
      paragraphs: [
        "Use the control below to reopen the cookie panel at any time. Withdrawing consent is as easy as giving it, and takes effect immediately.",
      ],
    },
  ],
};
