/**
 * Site-wide configuration. Every value a CMS would eventually own lives in
 * src/content/* as typed data, so swapping the source is a change to these
 * modules rather than to the components that read them.
 */

export const site = {
  name: "Bromely Code",
  legalName: "Bromely Code Ltd",
  tagline: "Decision-grade intelligence from unstructured data.",
  description:
    "Bromely Code builds production-grade GenAI pipelines that turn unstructured enterprise data into evidence leaders can act on.",
  url: "https://bromelycode.com",
  email: "enquiries@bromelycode.com",
  /**
   * Ofcom reserves 020 7946 0xxx for fiction and documentation — it cannot ring
   * a real subscriber. Replace with the real number; do not leave this live.
   */
  phone: "+44 20 7946 0412",
  phoneHref: "+442079460412",
  hours: "Monday to Friday, 09:00, 17:30 UK time",
  locale: "en_GB",
  /**
   * UK convention — enterprise procurement looks for these in the footer.
   *
   * The statutory identifiers below are deliberately NOT invented. A plausible
   * eight-digit company number almost certainly belongs to a real, unrelated
   * company, and printing one under "Registered in England & Wales" is a false
   * statement about a real registration rather than harmless placeholder copy.
   * The same applies to VAT and ICO numbers. Until incorporation, the site says
   * registration is in progress, which is both true and unambiguous.
   *
   * On incorporation: set registration.status to "registered" and fill in the
   * four fields. Nothing else needs to change.
   */
  registration: {
    status: "pending" as "pending" | "registered",
    companyNumber: "",
    vatNumber: "",
    icoRegistration: "",
    registeredOffice: { lines: [] as string[], postcode: "" },
  },
  /** Where the team actually is, at the level of detail we can stand behind. */
  location: "London, United Kingdom",
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/**
 * Services and method lead. The reference site leads with a proprietary
 * platform and buries services beneath it — an IA that would point our primary
 * navigation at something that does not exist (design-audit.md §8.1 D1).
 */
export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services", description: "What we are engaged to build" },
  { label: "How we work", href: "/how-we-work", description: "The pipeline, stage by stage" },
  { label: "Industries", href: "/industries", description: "Where we have depth" },
  { label: "Case studies", href: "/case-studies", description: "Engagements, end to end" },
  { label: "Insights", href: "/insights", description: "Notes from the build" },
  { label: "About", href: "/about", description: "Who you would be working with" },
];

export const primaryCta = {
  label: "Start a conversation",
  href: "/contact",
} as const;

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "What we do",
    items: [
      { label: "Intelligence extraction", href: "/services/intelligence-extraction" },
      { label: "Data & pipeline engineering", href: "/services/data-pipeline-engineering" },
      { label: "AI strategy & roadmap", href: "/services/ai-strategy-roadmap" },
      { label: "Evaluation & assurance", href: "/services/evaluation-assurance" },
      { label: "How we work", href: "/how-we-work" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Industries", href: "/industries" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Cookie policy", href: "/cookies" },
  { label: "Terms of use", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

export const socials: { label: string; href: string; icon: "linkedin" | "github" }[] = [
  { label: "Bromely Code on LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Bromely Code on GitHub", href: "https://github.com/", icon: "github" },
];

/**
 * Accreditation slots exist from day one so the component does not need a
 * retrofit the week a certificate lands. `status: "pending"` renders a labelled
 * outline, never a badge — a placeholder that looks like an accreditation is
 * worse than an empty one (design-audit.md §8.1 D3).
 */
export type Accreditation = {
  name: string;
  detail: string;
  status: "held" | "pending";
  /** Populated only when status is "held". */
  logo?: { src: string; alt: string; width: number; height: number };
};

export const accreditations: Accreditation[] = [
  { name: "Cyber Essentials Plus", detail: "Assessment scheduled", status: "pending" },
  { name: "ISO 27001", detail: "Gap analysis complete", status: "pending" },
  { name: "ISO 9001", detail: "In preparation", status: "pending" },
  { name: "UK GDPR / ICO", detail: "Registration in progress", status: "pending" },
];
