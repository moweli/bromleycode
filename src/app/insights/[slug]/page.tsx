import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks/page-hero";
import { ArticleCard } from "@/components/blocks/cards";
import { CtaBand } from "@/components/blocks/sections";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/ui";
import { getInsight, insights } from "@/content/insights";
import { insightImages } from "@/content/media";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return { title: "Article not found" };
  return {
    title: insight.title,
    description: insight.standfirst,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      title: `${insight.title} | Bromley Code`,
      description: insight.standfirst,
      publishedTime: insight.published,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: insight.title }],
    },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const related = insight.related
    .map((relatedSlug) => getInsight(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: insight.title,
    description: insight.standfirst,
    datePublished: insight.published,
    author: { "@type": "Organization", name: "Bromley Code Ltd" },
    publisher: { "@type": "Organization", name: "Bromley Code Ltd" },
  };

  return (
    <>
      <PageHero
        eyebrow={`${insight.category} · ${insight.readingTime}`}
        title={insight.title}
        standfirst={insight.standfirst}
        breadcrumb={{ label: "All insights", href: "/insights" }}
        width="medium"
      >
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.04em] text-mist">
          {insight.author} ·{" "}
          <time dateTime={insight.published}>
            {new Date(insight.published).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </p>
      </PageHero>

      <Section size="lg">
        <div className="container-bc">
          {insightImages[insight.slug] ? (
            <Reveal>
              <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius-media)]">
                <Image
                  src={insightImages[insight.slug]}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 83vw"
                  priority
                  className="object-cover"
                />
              </div>
            </Reveal>
          ) : null}

          <article className="prose-bc mx-auto mt-16">
            {insight.body.map((block, index) => (
              <section key={block.heading ?? index}>
                {block.heading ? <h2>{block.heading}</h2> : null}
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                {block.list ? (
                  <ul>
                    {block.list.map((item) => (
                      <li key={item.slice(0, 40)}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </Section>

      {related.length ? (
        <Section size="lg" className="bg-paper-alt">
          <div className="container-bc">
            <h2 className="text-[length:var(--text-h3)]">Related</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((item, index) => (
                <Reveal as="li" key={item.slug} delay={index * 70}>
                  <ArticleCard insight={item} image={insightImages[item.slug]} />
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <CtaBand />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
