import { ImageResponse } from "next/og";
import { site } from "@/site.config";
import { getAllInsights, getInsight } from "@/lib/insights";
import { OgFrame, ogFonts, ogSize } from "@/lib/og";

export const alt = `Article by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllInsights().map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  return new ImageResponse(
    <OgFrame
      kicker={insight ? insight.categoryName : "Insights"}
      title={insight ? insight.title : "Insights"}
      footer={`${site.name} · Insights`}
    />,
    { ...size, fonts: ogFonts },
  );
}
