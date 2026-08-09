import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/case-studies";
import { insights } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/how-we-work", priority: 0.9 },
    { path: "/industries", priority: 0.8 },
    { path: "/case-studies", priority: 0.8 },
    { path: "/insights", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.2 },
    { path: "/cookies", priority: 0.2 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    ...industries.map((i) => ({ path: `/industries/${i.slug}`, priority: 0.7 })),
    ...caseStudies.map((c) => ({ path: `/case-studies/${c.slug}`, priority: 0.7 })),
    ...insights.map((i) => ({ path: `/insights/${i.slug}`, priority: 0.6 })),
  ];

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
