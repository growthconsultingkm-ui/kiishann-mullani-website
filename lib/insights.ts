import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { categories, site, type CategorySlug } from "@/site.config";

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

export type InsightMeta = {
  slug: string;
  title: string;
  summary: string;
  category: CategorySlug;
  categoryName: string;
  author: string;
  date: string;
  updated?: string;
  status: "draft" | "published";
  format: "article" | "video";
  video?: string;
  readingMinutes: number;
  order: number;
};

export type Insight = InsightMeta & { html: string };

function slugFromFile(file: string) {
  return file.replace(/\.md$/, "");
}

function categoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

function readingMinutes(text: string) {
  const words = text
    .replace(/[#>*_`\-[\]()!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function toIsoDate(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function parseFile(file: string): Insight {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const category = String(data.category) as CategorySlug;
  if (!categories.some((c) => c.slug === category)) {
    throw new Error(`Unknown category "${data.category}" in content/insights/${file}`);
  }
  return {
    slug: slugFromFile(file),
    title: String(data.title),
    summary: String(data.summary ?? ""),
    category,
    categoryName: categoryName(category),
    author: String(data.author ?? site.name),
    date: toIsoDate(data.date) ?? "1970-01-01",
    updated: toIsoDate(data.updated),
    status: data.status === "published" ? "published" : "draft",
    format: data.format === "video" ? "video" : "article",
    video: data.video ? String(data.video) : undefined,
    readingMinutes: readingMinutes(content),
    order: Number(data.order ?? 999),
    html: marked.parse(content, { async: false }) as string,
  };
}

let cache: Insight[] | null = null;

function loadAll(): Insight[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(CONTENT_DIR)
    ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    : [];
  cache = files.map(parseFile).sort((a, b) => (a.date === b.date ? a.order - b.order : b.date.localeCompare(a.date)));
  return cache;
}

function visible(i: Insight) {
  return i.status === "published" || site.showDraftContent;
}

export function getAllInsights(): InsightMeta[] {
  return loadAll()
    .filter(visible)
    .map(({ html: _html, ...meta }) => meta);
}

export function getInsight(slug: string): Insight | undefined {
  const found = loadAll().find((i) => i.slug === slug);
  return found && visible(found) ? found : undefined;
}

export function getRelated(slug: string, count = 3): InsightMeta[] {
  const all = getAllInsights();
  const current = all.find((i) => i.slug === slug);
  if (!current) return all.slice(0, count);
  const same = all.filter((i) => i.slug !== slug && i.category === current.category);
  const rest = all.filter((i) => i.slug !== slug && i.category !== current.category);
  return [...same, ...rest].slice(0, count);
}

export function youtubeId(url?: string): string | undefined {
  if (!url) return undefined;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m?.[1];
}
