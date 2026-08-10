/**
 * Image assignments that are not part of a content record's own shape.
 * Provenance for every file here is recorded in media-credits.md.
 */
export const insightImages: Record<string, string> = {
  "history-is-a-per-attribute-decision": "/media/insights/dimensions.webp",
  "a-contract-that-cannot-stop-a-load": "/media/insights/contracts.webp",
  "chunking-is-a-decision-not-a-default": "/media/insights/chunking.webp",
  "what-permission-inheritance-actually-requires": "/media/insights/permissions.webp",
  "abstention-is-a-feature": "/media/insights/abstention.webp",
  "your-evaluation-set-is-too-big": "/media/insights/evaluation.webp",
};

export const aboutImage = {
  src: "/media/about/studio.webp",
  alt: "A dimly lit office at a desk by a window, one monitor awake",
};

/**
 * Section-break photographs, keyed by where they sit. Each one breaks a long
 * run of text; none of them carries an argument, so the copy either side stands
 * on its own. Service pages keep their image on the service record instead,
 * because there it varies with the content.
 */
export const bandImages = {
  howWeWorkLayers: {
    src: "/media/how-we-work/layers.webp",
    alt: "A concrete building rising in stacked horizontal tiers against a clear sky.",
  },
  howWeWorkEngagement: {
    src: "/media/how-we-work/engagement.webp",
    alt: "An external metal staircase climbing a plain white wall in regular flights.",
  },
  howWeWorkNinetyDays: {
    src: "/media/how-we-work/ninety-days.webp",
    alt: "Scaffolding and stair towers erected around a building under construction.",
  },
  servicesIndex: {
    src: "/media/services/index.webp",
    alt: "An aisle between rows of server cabinets in a data centre, cabling visible along one side.",
  },
  aboutLondon: {
    src: "/media/about/london.webp",
    alt: "The City of London skyline at dusk, seen from beneath a bridge arch across the Thames.",
  },
  contactFacade: {
    src: "/media/contact/facade.webp",
    alt: "A glass office facade at an angle, its panels reflecting a clear sky.",
  },
} as const;
