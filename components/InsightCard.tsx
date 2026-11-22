import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { InsightMeta } from "@/lib/insights";
import { categories } from "@/site.config";
import { formatDate } from "@/lib/site";
import { InsightCover } from "./InsightCover";

type Props = { insight: InsightMeta; variant?: "feature" | "standard" | "row"; headingLevel?: "h2" | "h3" };

export function InsightMetaLine({ insight, className = "" }: { insight: InsightMeta; className?: string }) {
  return (
    <p className={`kicker flex flex-wrap items-center gap-x-3 gap-y-1 text-muted ${className}`}>
      {insight.status === "draft" && (
        <span className="rounded-sm bg-accent/20 px-1.5 py-0.5 text-accent-deep">Draft</span>
      )}
      <span>{insight.categoryName}</span>
      <span aria-hidden>·</span>
      <time dateTime={insight.date}>{formatDate(insight.date)}</time>
      <span aria-hidden>·</span>
      <span>
        {insight.readingMinutes} min {insight.format === "video" ? "watch" : "read"}
      </span>
    </p>
  );
}

export function InsightCard({ insight, variant = "standard", headingLevel = "h3" }: Props) {
  const H = headingLevel;
  const short = categories.find((c) => c.slug === insight.category)?.short ?? "";
  const href = `/insights/${insight.slug}`;

  if (variant === "row") {
    return (
      <article className="group relative grid gap-4 border-t border-ink/15 py-7 md:grid-cols-12 md:gap-8">
        <InsightMetaLine insight={insight} className="md:col-span-3 md:pt-2" />
        <div className="md:col-span-8">
          <H className="display-md">
            <Link href={href} className="after:absolute after:inset-0 group-hover:text-accent-deep">
              {insight.title}
            </Link>
          </H>
          <p className="mt-3 max-w-2xl text-ink/75">{insight.summary}</p>
        </div>
        <ArrowUpRight
          aria-hidden
          className="hidden size-7 justify-self-end text-ink/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-deep md:col-span-1 md:block"
          strokeWidth={1.5}
        />
      </article>
    );
  }

  const feature = variant === "feature";
  return (
    <article className="group relative flex h-full flex-col">
      <InsightCover
        category={insight.category}
        label={short}
        large={feature}
        className={`${feature ? "aspect-[16/10]" : "aspect-[16/10]"} transition-transform duration-700 ease-[var(--ease-out-expo)]`}
      />
      <div className="flex flex-1 flex-col pt-5">
        <InsightMetaLine insight={insight} />
        <H className={`${feature ? "display-lg" : "text-2xl font-semibold leading-tight"} mt-4`}>
          <Link href={href} className="after:absolute after:inset-0 group-hover:text-accent-deep">
            {insight.title}
          </Link>
        </H>
        <p className={`mt-3 text-ink/75 ${feature ? "max-w-xl text-lg" : ""}`}>{insight.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium" aria-hidden>
          Read
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </span>
      </div>
    </article>
  );
}
