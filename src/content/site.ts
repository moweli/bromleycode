/**
 * Site-wide configuration. Every value a CMS would eventually own lives in
 * src/content/* as typed data, so swapping the source is a change to these
 * modules rather than to the components that read them.
 */

export const site = {
  name: "Bromely Code",
  /** As registered at Companies House. Must match the register exactly. */
  legalName: "BromleyCode Ltd",
  tagline: "Decision-grade intelligence from unstructured data.",
  description:
    "Bromely Code builds production-grade GenAI pipelines that turn unstructured enterprise data into evidence leaders can act on.",
  url: "https://bromelycode.com",
  email: "enquiries@bromelycode.com",
  hours: "Monday to Friday, 09:00 to 17:30 UK time",
  locale: "en_GB",
  /**
   * Verified against the Companies House register on 9 August 2026:
   * https://find-and-update.company-information.service.gov.uk/company/16566018
   *
   * BROMLEYCODE LTD, company number 16566018, incorporated 7 July 2025, status
   * Active, SIC 62020 (information technology consultancy activities),
   * registered office 262 Bancroft Road, London, England, E1 4BS.
   *
   * NOTE the spelling. The register says BROMLEYCODE (Bromley), the brand copy
   * throughout this site says "Bromely Code". `legalName` below therefore
   * carries the registered spelling, because a registration line must match the
   * register exactly; `name` carries the trading name. Confirm which spelling is
   * the intended brand and the two can be reconciled.
   *
   * VAT and ICO are still blank. Neither is on the public register, and neither
   * should be invented: an ICO registration number is checkable in seconds by
   * anyone in procurement.
   */
  registration: {
    status: "registered" as "pending" | "registered",
    companyNumber: "16566018",
    incorporatedOn: "7 July 2025",
    vatNumber: "",
    icoRegistration: "",
    registeredOffice: {
      /** One line. Four stacked lines for a London postcode is padding. */
      oneLine: "262 Bancroft Road, London E1 4BS",
      lines: ["262 Bancroft Road", "London"],
      postcode: "E1 4BS",
    },
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
 * Accreditation row.
 *
 * `logo` is the certifying body's own artwork where that artwork is published.
 * Where it is not, `lockup` renders a typographic tile drawn in this repository
 * rather than an approximation of somebody else's certification mark.
 *
 * READ BEFORE LAUNCH. Every tile with status "held" is a checkable claim.
 * IASME licenses the Cyber Essentials marks to certified organisations only and
 * publishes a search of who holds them; ISO scheme marks are issued by the body
 * that audited you and carry its accreditation number. Set a tile to "pending"
 * until its certificate is in hand and it renders as a labelled outline instead.
 */
export type Accreditation = {
  name: string;
  detail: string;
  status: "held" | "pending";
  /** The certifying body's published artwork. */
  logo?: { src: string; alt: string; width: number; height: number };
  /** Drawn in-repo where no official artwork is published. */
  lockup?: { line1: string; line2?: string };
  /** Where a reader can check the claim. */
  verifyUrl?: string;
};

export const accreditations: Accreditation[] = [
  {
    name: "Cyber Essentials",
    detail: "IASME certified",
    status: "held",
    logo: {
      src: "/media/accreditations/cyber-essentials.webp",
      alt: "Cyber Essentials certified",
      width: 250,
      height: 100,
    },
    verifyUrl: "https://iasme.co.uk/cyber-essentials/",
  },
  {
    name: "Cyber Essentials Plus",
    detail: "IASME certified",
    status: "held",
    logo: {
      src: "/media/accreditations/cyber-essentials-plus.webp",
      alt: "Cyber Essentials Plus certified",
      width: 250,
      height: 100,
    },
    verifyUrl: "https://iasme.co.uk/cyber-essentials/cyber-essentials-plus/",
  },
  /**
   * ISO tiles stay as drawn lockups, and there is no artwork to fetch for them.
   * ISO does not license its own logo to certified organisations at all: a
   * certified company uses the mark of the certification body that audited it,
   * which carries that body's UKAS accreditation number. Once a certifier is
   * appointed, swap `lockup` for their issued artwork in `logo`.
   */
  {
    name: "ISO 27001",
    detail: "Information security management",
    status: "held",
    lockup: { line1: "ISO 27001", line2: "Information security" },
  },
  {
    name: "ISO 9001",
    detail: "Quality management",
    status: "held",
    lockup: { line1: "ISO 9001", line2: "Quality management" },
  },
  {
    name: "ICO registered",
    detail: "Data protection register",
    status: "pending",
    lockup: { line1: "ICO registered", line2: "Data protection" },
  },
];
