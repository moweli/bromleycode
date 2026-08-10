/**
 * Site-wide configuration. Every value a CMS would eventually own lives in
 * src/content/* as typed data, so swapping the source is a change to these
 * modules rather than to the components that read them.
 */

export const site = {
  name: "Bromley Code",
  /** As registered at Companies House. Must match the register exactly. */
  legalName: "BromleyCode Ltd",
  tagline: "Decision-grade data, and the systems that act on it.",
  description:
    "Bromley Code builds the data platforms that make enterprise information usable, and the AI systems that turn it into evidence leaders can act on.",
  url: "https://bromleycode.com",
  email: "enquiries@bromleycode.com",
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
   * Spelling resolved 9 August 2026: the brand is BROMLEY Code, matching the
   * register. An earlier misspelling ("Bromely") was corrected across the site,
   * the domain and the email addresses.
   *
   * `legalName` is the registered form, one word, used wherever a statutory
   * disclosure has to match the register exactly. `name` is the trading name,
   * two words, used everywhere else.
   *
   * VAT is still blank. It is not on the public register and is not invented.
   */
  registration: {
    status: "registered" as "pending" | "registered",
    companyNumber: "16566018",
    incorporatedOn: "7 July 2025",
    vatNumber: "",
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
      { label: "Data & platform engineering", href: "/services/data-platform-engineering" },
      { label: "Intelligence extraction", href: "/services/intelligence-extraction" },
      { label: "Data & AI strategy", href: "/services/data-ai-strategy" },
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
  { label: "Bromley Code on LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Bromley Code on GitHub", href: "https://github.com/", icon: "github" },
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

/**
 * Artwork supplied by the client, downloaded and self-hosted rather than
 * hotlinked. Alternative IASME-sourced horizontal lockups are also in
 * public/media/accreditations if the badge format is ever swapped for a lockup.
 */
export const accreditations: Accreditation[] = [
  {
    name: "Cyber Essentials",
    detail: "IASME certified",
    status: "held",
    logo: {
      src: "/media/accreditations/ce-badge.svg",
      alt: "Cyber Essentials certified",
      width: 42,
      height: 50,
    },
    verifyUrl: "https://iasme.co.uk/cyber-essentials/",
  },
  {
    name: "Cyber Essentials Plus",
    detail: "IASME certified",
    status: "held",
    logo: {
      src: "/media/accreditations/ce-plus-badge.webp",
      alt: "Cyber Essentials Plus certified",
      width: 100,
      height: 120,
    },
    verifyUrl: "https://iasme.co.uk/cyber-essentials/cyber-essentials-plus/",
  },
  {
    name: "ISO 27001",
    detail: "Information security management",
    status: "held",
    logo: {
      src: "/media/accreditations/iso-27001.webp",
      alt: "ISO 27001 information security management certified",
      width: 120,
      height: 120,
    },
  },
];
