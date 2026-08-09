/**
 * Legal templates — DRAFTS.
 *
 * These are complete drafts rather than outlines: the structure follows the
 * ICO's expectations for a privacy notice under UK GDPR, and the positions
 * taken reflect how this site actually behaves (no analytics installed, no
 * third-party consent SDK, form data stored only to reply).
 *
 * They are still drafts. Nothing here is legal advice, none of it has been
 * reviewed by a qualified adviser, and a handful of positions are genuine
 * business decisions rather than drafting choices. Those are marked inline with
 * CONFIRM. Every page carries a visible review banner until sign-off.
 */

export const LEGAL_STATUS = "draft-requires-review" as const;
export const LEGAL_UPDATED = "9 August 2026";

export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };

export const privacyPolicy: { updated: string; intro: string[]; sections: LegalSection[] } = {
  updated: LEGAL_UPDATED,
  intro: [
    "This notice explains what personal data Bromely Code Ltd collects through this website, why we collect it, what we do with it, and the rights you have over it.",
    "It covers this website and enquiries made through it. Personal data we process on behalf of a client during an engagement is governed by the data processing agreement in that engagement's contract — in that context the client is the controller and we are the processor, and this notice does not apply.",
  ],
  sections: [
    {
      heading: "1. Who we are",
      paragraphs: [
        "Bromely Code Ltd is a data intelligence consultancy based in London, United Kingdom. For personal data collected through this website, we are the data controller.",
        "Company registration is in progress. Our company number, registered office and ICO registration number will be published here and in the site footer on incorporation, and this notice updated accordingly.",
        "For anything in this notice, or to exercise any of the rights described in section 8, contact privacy@bromelycode.com.",
        "CONFIRM: whether a Data Protection Officer is required under Article 37. On the processing described here — no large-scale monitoring, no large-scale special-category data — one is unlikely to be required, but engagements involving client data may change that assessment.",
      ],
    },
    {
      heading: "2. What we collect",
      paragraphs: [
        "Only what we need in order to reply to you and to keep the site working. We do not buy personal data, we do not enrich what you give us from third-party sources, and we do not build profiles.",
      ],
      list: [
        "Enquiry data — the name, email address and message you submit through the contact form, plus organisation and role if you choose to give them. These two fields are optional and marked as such.",
        "Consent data — your cookie choices and the date you made them, stored in your browser's local storage under the key bc-consent-v1. This never leaves your device unless you submit an enquiry.",
        "Technical data — IP address, user agent and requested URL, recorded in our hosting provider's server logs. We do not use these for analytics.",
        "Analytics data — none. No analytics or advertising product is installed on this site. If that changes, this notice and the cookie policy will be updated before it goes live, and analytics will remain off until you consent.",
      ],
    },
    {
      heading: "3. Why we use it, and our lawful basis",
      paragraphs: [
        "Under Article 6 of the UK GDPR we rely on the following:",
      ],
      list: [
        "Replying to your enquiry — legitimate interests, Article 6(1)(f). Our interest is in responding to someone who has approached us about our services; the processing is what you would expect, minimal, and easy to object to. A legitimate interests assessment supporting this is retained and available on request.",
        "Keeping a record of enquiries that become engagements — necessary for the performance of a contract, Article 6(1)(b), and thereafter legal obligation, Article 6(1)(c), for accounting records.",
        "Keeping the site secure and available — legitimate interests, Article 6(1)(f), covering server logs and abuse prevention.",
        "Any future analytics — consent, Article 6(1)(a), withdrawable at any time through the cookie controls.",
      ],
    },
    {
      heading: "4. Who we share it with",
      paragraphs: [
        "We do not sell personal data, and we do not share it for advertising or profiling under any circumstances.",
        "Enquiry data reaches the following processors, each engaged under a written data processing agreement:",
      ],
      list: [
        "Our hosting provider, which serves the site and retains server logs. CONFIRM the provider and link to their sub-processor list before launch.",
        "Our email provider, which carries the enquiry to us and holds our correspondence. CONFIRM the provider before launch.",
        "Nothing else. There is no CRM, no marketing automation platform and no analytics processor in the path today.",
      ],
    },
    {
      heading: "5. International transfers",
      paragraphs: [
        "Our intention is that personal data collected through this site is stored in the United Kingdom or the European Economic Area.",
        "Where a processor operates outside the UK, we rely on UK adequacy regulations where they apply, and otherwise on the International Data Transfer Agreement or the UK Addendum to the EU Standard Contractual Clauses, supported by a transfer risk assessment.",
        "CONFIRM the position for each processor once hosting and email are chosen, and list them here with the safeguard relied on.",
      ],
    },
    {
      heading: "6. How long we keep it",
      paragraphs: [
        "We do not keep personal data for longer than we need it. Our retention positions are:",
      ],
      list: [
        "Enquiries that do not lead to an engagement — 24 months from your last contact with us, then deleted. Long enough to recognise you if you come back, short enough not to be a standing liability.",
        "Enquiries that become engagements — retained for the life of the contract and for six years afterwards, in line with the limitation period and our accounting obligations.",
        "Server logs — CONFIRM with the hosting provider; typically 30 to 90 days.",
        "Consent records — 24 months from the date the choice was made, after which we ask again.",
      ],
    },
    {
      heading: "7. How we protect it",
      paragraphs: [
        "The site is served over HTTPS only. Enquiry data is transmitted over TLS and stored in access-controlled systems. Access is limited to the people who need it in order to reply to you, protected by multi-factor authentication.",
        "This site sets no third-party scripts, loads no third-party fonts and embeds no third-party media, which removes an entire class of data leakage that most marketing sites carry.",
        "CONFIRM: align this section with the security schedule used in client contracts once that document exists, so a procurement reviewer does not find two different accounts of the same controls.",
      ],
    },
    {
      heading: "8. Your rights",
      paragraphs: [
        "Under the UK GDPR you have the right to be informed about how we use your data, to request a copy of it, to have inaccurate data corrected, to have data erased, to restrict how we use it, to object to processing based on legitimate interests, and to data portability. Where we rely on consent, you can withdraw it at any time and as easily as you gave it.",
        "To exercise any of these, email privacy@bromelycode.com. We will respond within one month. We will not charge you, and we will not ask you to justify the request.",
        "If you object to us processing your enquiry under legitimate interests, we will stop unless we have compelling grounds not to — in practice, that means we will delete it and not reply further.",
      ],
    },
    {
      heading: "9. Automated decision-making",
      paragraphs: [
        "We do not make decisions about you by solely automated means, and we do not carry out profiling, on this website.",
        "This is worth stating precisely given what we do for a living: the retrieval and extraction systems we build for clients run inside those clients' environments on their data, under their control, and are entirely separate from this site.",
      ],
    },
    {
      heading: "10. Cookies and similar technologies",
      paragraphs: [
        "The site sets no cookies at all before you make a choice, and no non-essential storage at any point unless you opt in. Details are in the cookie policy, including how to change your mind.",
      ],
    },
    {
      heading: "11. Complaints",
      paragraphs: [
        "If you are unhappy with how we have handled your data, please tell us first at privacy@bromelycode.com so we can put it right.",
        "You also have the right to complain to the Information Commissioner's Office at ico.org.uk, by calling 0303 123 1113, or by writing to Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF.",
      ],
    },
    {
      heading: "12. Changes to this notice",
      paragraphs: [
        "We will update this notice when our processing changes, and record the date of the most recent change at the top of this page. Where a change materially affects you, we will say so rather than relying on you to notice.",
      ],
    },
  ],
};

export const cookiePolicy: { updated: string; intro: string[]; sections: LegalSection[] } = {
  updated: LEGAL_UPDATED,
  intro: [
    "This page explains what this site stores on your device, when, and how to change your choices.",
    "Nothing beyond strictly necessary storage is set before you consent, and if you reject non-essential storage no analytics or marketing script is loaded at all. The choice is enforced by the site itself rather than passed to a third-party consent service, so rejecting genuinely means nothing runs.",
  ],
  sections: [
    {
      heading: "Strictly necessary",
      paragraphs: [
        "Required for the site to work, and exempt from the consent requirement under regulation 6(4) of the Privacy and Electronic Communications Regulations. You cannot switch these off.",
      ],
      list: [
        "bc-consent-v1 — browser local storage, first party. Records your cookie choices and the date you made them, so we do not ask again on every page. Retained for 24 months or until you clear your browser storage.",
      ],
    },
    {
      heading: "Analytics",
      paragraphs: [
        "None are set today. No analytics product is installed on this site.",
        "The category exists because the consent mechanism is built to gate one: consent is published to the page, and any future analytics loader subscribes to that signal rather than running on load. If we add analytics, this page will list each cookie, its purpose, its lifetime and the provider before it goes live, and it will stay off until you opt in.",
      ],
    },
    {
      heading: "Marketing",
      paragraphs: [
        "None are set, and we have no plans to set any. We do not run advertising, retargeting or cross-site tracking. The category exists so the choice is available and honest if that ever changes.",
      ],
    },
    {
      heading: "What we deliberately do not use",
      paragraphs: [
        "For completeness, because their absence is unusual enough to be worth stating:",
      ],
      list: [
        "No third-party fonts. Typefaces are self-hosted, so no font provider sees your IP address.",
        "No embedded video, maps or social widgets. Nothing on this site loads from another company's servers.",
        "No third-party consent management platform. The banner is ours, so consent data does not leave the page.",
        "No chat widget, session recording, heatmapping or A/B testing tool.",
      ],
    },
    {
      heading: "Changing your mind",
      paragraphs: [
        "Use the control below to reopen the cookie panel at any time. Withdrawing consent takes effect immediately and is as easy as giving it.",
        "You can also clear site data in your browser settings, which removes the stored choice entirely — the banner will then ask again on your next visit.",
      ],
    },
  ],
};

export const termsOfUse: { updated: string; intro: string[]; sections: LegalSection[] } = {
  updated: LEGAL_UPDATED,
  intro: [
    "These terms govern your use of bromelycode.com. By using the site you accept them.",
    "They do not govern any engagement. Work we do for a client is governed entirely by that engagement's signed contract, which takes precedence over anything on this page.",
  ],
  sections: [
    {
      heading: "1. Who we are",
      paragraphs: [
        "This site is operated by Bromely Code Ltd, a data intelligence consultancy based in London, United Kingdom. Company registration is in progress; registration details will be published here on incorporation.",
        "You can contact us at hello@bromelycode.com.",
      ],
    },
    {
      heading: "2. The content on this site",
      paragraphs: [
        "The material on this site is provided for general information about our services. It is not advice, and it is not an offer capable of acceptance.",
        "We take care over what we publish, particularly the technical material, but we do not warrant that it is complete, current or fit for your circumstances. Do not act on it without taking advice appropriate to your own estate and obligations.",
      ],
    },
    {
      heading: "3. Case studies and illustrative content",
      paragraphs: [
        "The engagements published under Case studies are illustrative composites. They are labelled as such on every page and card on which they appear, and they describe how we work rather than reporting completed client projects.",
        "The figures in them are illustrative: they show the shape and scale of a plausible result and the method by which such a result would be measured. They are not measured client outcomes and should not be relied on as performance claims.",
        "When real, client-approved case studies replace them, the labels come off and the figures published will be measured ones with their method stated.",
      ],
    },
    {
      heading: "4. Intellectual property",
      paragraphs: [
        "The content, design, code and diagrams on this site belong to Bromely Code Ltd, except where third-party material is used under licence — the photography, typefaces and vendor marks are credited in the repository's media credits.",
        "You may read, print and share pages for your own or your organisation's internal use. You may quote from them with attribution. You may not republish substantial parts commercially, or present our material as your own.",
        "Third-party trademarks shown on this site, including the platform marks in the technology band, remain the property of their owners. Their presence indicates platforms we build on and does not imply partnership, affiliation or endorsement in either direction.",
      ],
    },
    {
      heading: "5. Acceptable use",
      paragraphs: [
        "Use the site lawfully. Do not attempt to gain unauthorised access to it or to any system connected to it, do not introduce malicious code, do not attempt to overload or disrupt it, and do not scrape it in a way that degrades service for others.",
        "Do not use the contact form to send unsolicited marketing, to submit anyone else's personal data without their knowledge, or to send us confidential material before a confidentiality agreement is in place. If you have something sensitive to discuss, say so and we will arrange a proper channel first.",
      ],
    },
    {
      heading: "6. Links",
      paragraphs: [
        "Where we link to another site, we do so because we think it is useful. We have no control over it and take no responsibility for its content or its handling of your data.",
        "You may link to this site from your own, provided you do so in a way that is fair and does not suggest an association or endorsement that does not exist.",
      ],
    },
    {
      heading: "7. Our liability",
      paragraphs: [
        "Nothing in these terms limits our liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot lawfully be limited.",
        "Subject to that, we exclude liability for loss arising from reliance on the content of this site, and for indirect or consequential loss, loss of profit, loss of business or loss of data arising from your use of it.",
        "If you are a consumer rather than a business user, these terms do not affect your statutory rights.",
        "CONFIRM the limitation wording with an adviser, and align it with the liability clause used in engagement contracts so the two documents do not conflict.",
      ],
    },
    {
      heading: "8. Availability",
      paragraphs: [
        "We do not guarantee that the site will be available uninterrupted. We may suspend, withdraw or change any part of it without notice.",
      ],
    },
    {
      heading: "9. Changes to these terms",
      paragraphs: [
        "We may revise these terms. The date of the most recent revision is shown at the top of this page, and the version in force is the one published when you use the site.",
      ],
    },
    {
      heading: "10. Governing law",
      paragraphs: [
        "These terms and any dispute arising from them are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction.",
      ],
    },
  ],
};

export const accessibilityStatement: { updated: string; intro: string[]; sections: LegalSection[] } = {
  updated: LEGAL_UPDATED,
  intro: [
    "We want this site to be usable by as many people as possible, including people using a screen reader, a keyboard alone, magnification, or a browser with motion reduced.",
    "This statement describes where the site currently stands, what we have tested, and what we know is not perfect. It is written to be specific rather than reassuring — a statement that claims full conformance without evidence is worth nothing.",
  ],
  sections: [
    {
      heading: "How accessible this site is",
      paragraphs: [
        "We believe this site is substantially conformant with WCAG 2.1 level AA. We have tested the areas below and they behave as intended.",
      ],
      list: [
        "Every page has one main landmark, one h1, and a heading structure with no skipped levels.",
        "A skip link is the first thing you reach by keyboard and is visible when focused.",
        "Every interactive element has a visible focus indicator. We have deliberately not suppressed focus outlines anywhere.",
        "The mobile navigation is a native dialog: it opens from the keyboard, contains focus while open, closes on Escape and returns focus to the button that opened it.",
        "Text meets a contrast ratio of at least 4.5:1 against its background. Text over the homepage video was measured across the whole loop, not just the first frame, and stays above 18:1.",
        "Motion respects prefers-reduced-motion. With it set, the homepage video is never loaded, scrolling reveals are disabled, the technology marquee stops, and the animated statistics show their final values immediately.",
        "Below 768 pixels the homepage serves a still image instead of video, so nothing autoplays on a phone.",
        "Images carry alt text written for meaning. Purely decorative images are marked so screen readers skip them.",
        "Form fields have visible, permanently associated labels, and errors are announced and described in text rather than by colour alone.",
        "The site works at 400% zoom and at 320 pixels wide without horizontal scrolling. Wide content such as the pipeline diagram scrolls inside its own container rather than forcing the page sideways.",
      ],
    },
    {
      heading: "Known limitations",
      paragraphs: [
        "We are aware of the following. None of them block use of the site, and we would rather list them than leave you to find them.",
      ],
      list: [
        "The pipeline diagram is an SVG. It carries a text description and the same information appears as prose immediately beneath it, but the diagram itself cannot be explored region by region with a screen reader.",
        "The technology marquee moves continuously. It pauses on hover and on keyboard focus and stops entirely under reduced motion, but it is still movement on a page you did not ask to move.",
        "We have tested with keyboard, automated tooling and browser zoom. We have not yet run a structured test with screen reader users, which is the test that finds the things the others miss.",
        "No independent accessibility audit has been carried out.",
      ],
    },
    {
      heading: "How we tested",
      paragraphs: [
        "Automated checks with Lighthouse and axe across every page template, at 1440, 1024, 768 and 390 pixels wide. Manual keyboard traversal of navigation, the mobile menu and both forms. Contrast measured programmatically, including sampling the background behind hero text across every second of the video loop. Reduced-motion and mobile fallbacks verified by checking that the video file is never requested.",
        "Last tested 9 August 2026. Testing was carried out by the team that built the site.",
      ],
    },
    {
      heading: "Feedback",
      paragraphs: [
        "If you find something we have missed, or you need content in a different format, email accessibility@bromelycode.com. Tell us the page and what happened, and we will reply within five working days.",
        "If you are not satisfied with our response, you can contact the Equality Advisory and Support Service at equalityadvisoryservice.com.",
      ],
    },
    {
      heading: "Scope of this statement",
      paragraphs: [
        "This statement applies to bromelycode.com. It was prepared on 9 August 2026.",
        "CONFIRM: if we ever contract with a public sector body, the Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018 may impose a specific statement format on deliverables built for them. This statement covers our own site only.",
      ],
    },
  ],
};
