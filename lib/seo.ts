import type { Metadata } from "next";
import { site } from "@/site.config";

type Args = {
  title: string;
  description: string;
  path: string;
  /** Use the plain title (no "— Kiishann Mullani" suffix). */
  absoluteTitle?: boolean;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Per-page metadata with its own canonical URL and social preview fields. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  noindex,
  type = "website",
  publishedTime,
  modifiedTime,
}: Args): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors: [site.name] }
        : { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.role}` }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(type === "article" ? {} : { images: ["/opengraph-image"] }),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
