"use client";

import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { InsightMeta } from "@/lib/insights";
import { categories } from "@/site.config";
import { InsightCard } from "./InsightCard";

type Props = { insights: InsightMeta[] };

export function InsightsLibrary({ insights }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  // Read initial filters from the URL (?category=…&q=…) so filtered views are shareable.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category");
    const q = params.get("q");
    if (c && categories.some((x) => x.slug === c)) setCategory(c);
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [category, query]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: insights.length };
    for (const i of insights) map[i.category] = (map[i.category] ?? 0) + 1;
    return map;
  }, [insights]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insights.filter((i) => {
      if (category !== "all" && i.category !== category) return false;
      if (!q) return true;
      return `${i.title} ${i.summary} ${i.categoryName}`.toLowerCase().includes(q);
    });
  }, [insights, query, category]);

  const filtering = category !== "all" || query.trim() !== "";
  const [featured, ...rest] = results;

  return (
    <div>
      <div className="border-y border-ink/15 py-6">
        <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="kicker text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
            {category !== "all" && ` in ${categories.find((c) => c.slug === category)?.name}`}
            {query.trim() && ` matching “${query.trim()}”`}
          </p>
          <div className="relative w-full sm:max-w-xs">
            <label htmlFor="insight-search" className="sr-only">
              Search insights
            </label>
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
            <input
              id="insight-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search insights"
              className="min-h-12 w-full rounded-full border border-ink/20 bg-white/60 pl-11 pr-10 text-[0.95rem] placeholder:text-muted focus:border-ink focus:outline-none focus-visible:outline-2"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-ink"
                aria-label="Clear search"
              >
                <X className="size-4" aria-hidden />
              </button>
            )}
          </div>
        </div>
        <div role="group" aria-label="Filter by category" className="mt-5 flex flex-wrap gap-2">
          <FilterChip active={category === "all"} onClick={() => setCategory("all")} count={counts.all}>
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.slug}
              active={category === c.slug}
              onClick={() => setCategory(c.slug)}
              count={counts[c.slug] ?? 0}
            >
              {c.name}
            </FilterChip>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 border border-dashed border-ink/25 px-6 py-16 text-center">
          <p className="display-md">Nothing here yet.</p>
          <p className="mx-auto mt-3 max-w-md text-ink/70">
            {insights.length === 0
              ? "New articles and videos are on the way. Check back soon."
              : "No pieces match that search. Try a different word or browse all categories."}
          </p>
          {filtering && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-6 inline-flex min-h-11 items-center rounded-full border border-ink px-5 text-sm font-medium hover:bg-ink hover:text-paper"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : filtering ? (
        <div className="mt-6 border-b border-ink/15">
          {results.map((i) => (
            <InsightCard key={i.slug} insight={i} variant="row" headingLevel="h2" />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <InsightCard insight={featured} variant="feature" headingLevel="h2" />
            </div>
            <div className="flex flex-col gap-10 lg:col-span-4">
              {rest.slice(0, 2).map((i) => (
                <InsightCard key={i.slug} insight={i} headingLevel="h2" />
              ))}
            </div>
          </div>
          {rest.length > 2 && (
            <div className="mt-16 border-b border-ink/15">
              <h2 className="kicker mb-2 text-muted">More insights</h2>
              {rest.slice(2).map((i) => (
                <InsightCard key={i.slug} insight={i} variant="row" />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
        active ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink/80 hover:border-ink hover:text-ink"
      }`}
    >
      {children}
      <span className={`font-mono text-[0.7rem] ${active ? "text-accent" : "text-muted"}`}>{count}</span>
    </button>
  );
}
