import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { categories, site } from "@/site.config";
import { getAllInsights, getInsight, getRelated, youtubeId } from "@/lib/insights";
import { absoluteUrl, formatDate } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ButtonLink";
import { InsightCard } from "@/components/InsightCard";
import { InsightCover } from "@/components/InsightCover";
import { JsonLd } from "@/components/JsonLd";
import { KmMark } from "@/components/KmMark";
import { ShareLinks } from "@/components/ShareLinks";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInsights().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.title,
    description: insight.summary,
    path: `/insights/${insight.slug}`,
    type: "article",
    publishedTime: insight.date,
    modifiedTime: insight.updated ?? insight.date,
    noindex: insight.status === "draft",
  });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const related = getRelated(insight.slug, 3);
  const url = absoluteUrl(`/insights/${insight.slug}`);
  const short = categories.find((c) => c.slug === insight.category)?.short ?? "";
  const yt = youtubeId(insight.video);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: insight.title,
      description: insight.summary,
      datePublished: insight.date,
      dateModified: insight.updated ?? insight.date,
      author: { "@type": "Person", name: insight.author, url: absoluteUrl("/about") },
      publisher: { "@type": "Person", name: site.name, url: absoluteUrl("/") },
      mainEntityOfPage: url,
      image: `${url}/opengraph-image`,
      articleSection: insight.categoryName,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Insights", item: absoluteUrl("/insights") },
        { "@type": "ListItem", position: 3, name: insight.title, item: url },
      ],
    },
  ];

  return (
    <>
      <article>
        <header className="wrap pb-12 pt-10 md:pt-14">
          <nav aria-label="Breadcrumb">
            <ol className="kicker flex flex-wrap items-center gap-2 text-muted">
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <ChevronRight aria-hidden className="size-3" />
              <li>
                <Link href="/insights" className="hover:text-ink">
                  Insights
                </Link>
              </li>
              <ChevronRight aria-hidden className="size-3" />
              <li>
                <Link href={`/insights?category=${insight.category}`} className="hover:text-ink">
                  {insight.categoryName}
                </Link>
              </li>
            </ol>
          </nav>

          {insight.status === "draft" && (
            <p
              className="mt-8 inline-flex items-center gap-2 rounded-sm border border-accent-deep/40 bg-accent/10 px-3 py-2 text-sm text-accent-deep"
              role="note"
            >
              <span className="kicker">Draft</span>
              This article is a draft awaiting the author&apos;s review.
            </p>
          )}

          <h1 className="display-xl mt-8 max-w-[20ch]">{insight.title}</h1>
          <p className="mt-8 max-w-2xl text-xl leading-snug text-ink/80 md:text-2xl">{insight.summary}</p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6 sm:grid-cols-4">
            <Meta label="Author" value={insight.author} />
            <Meta label="Published" value={<time dateTime={insight.date}>{formatDate(insight.date)}</time>} />
            <Meta
              label="Updated"
              value={
                <time dateTime={insight.updated ?? insight.date}>{formatDate(insight.updated ?? insight.date)}</time>
              }
            />
            <Meta
              label={insight.format === "video" ? "Watch time" : "Reading time"}
              value={`${insight.readingMinutes} min`}
            />
          </dl>
        </header>

        <div className="wrap">
          {yt ? (
            <div className="relative aspect-video w-full bg-ink">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${yt}`}
                title={insight.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ) : (
            <InsightCover
              category={insight.category}
              label={short}
              large
              className="aspect-[16/9] w-full md:aspect-[21/8]"
            />
          )}
        </div>

        <div className="wrap grid gap-12 py-16 md:py-20 lg:grid-cols-12">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <ShareLinks url={url} title={insight.title} />
            </div>
          </aside>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="prose-km max-w-[68ch]" dangerouslySetInnerHTML={{ __html: insight.html }} />

            {/* Author bio */}
            <div className="mt-16 grid gap-6 border-t border-ink/15 pt-10 sm:grid-cols-[auto_1fr]">
              <div className="flex size-16 items-center justify-center bg-ink">
                <KmMark className="h-7 w-auto text-paper" />
              </div>
              <div>
                <p className="kicker text-muted">Written by</p>
                <p className="mt-2 text-xl font-semibold">{site.name}</p>
                <p className="mt-2 max-w-lg leading-relaxed text-ink/75">
                  {site.positioning} Writing here about marketing, practical AI, business growth and execution.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/about" variant="secondary" className="min-h-11 px-5 text-sm">
                    About Kiishann
                  </ButtonLink>
                  <ButtonLink href="/contact?type=growth" className="min-h-11 px-5 text-sm">
                    Discuss a growth challenge
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-white/60" aria-labelledby="related-title">
          <div className="wrap py-20 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="related-title" className="display-md">
                Keep reading
              </h2>
              <Link href="/insights" className="link-underline font-medium">
                All insights
              </Link>
            </div>
            <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-8">
              {related.map((r) => (
                <InsightCard key={r.slug} insight={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd data={schema} />
    </>
  );
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="kicker text-muted">{label}</dt>
      <dd className="mt-2 font-medium">{value}</dd>
    </div>
  );
}
