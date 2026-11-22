import type { MetadataRoute } from "next";
import { getAllInsights } from "@/lib/insights";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  const pages = ["", "/work-with-me", "/about", "/insights", "/speaking-collaborations", "/contact", "/privacy"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: path === "/insights" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/work-with-me" ? 0.9 : 0.7,
    }),
  );
  // Drafts are noindex, so only published articles go in the sitemap.
  const articles = getAllInsights()
    .filter((i) => i.status === "published")
    .map((i) => ({
      url: `${base}/insights/${i.slug}`,
      lastModified: new Date(i.updated ?? i.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));
  return [...pages, ...articles];
}
