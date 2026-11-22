import { ImageResponse } from "next/og";
import { site } from "@/site.config";
import { OgFrame, ogFonts, ogSize } from "@/lib/og";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgFrame kicker={site.role} title={site.positioning} footer={site.name} />, {
    ...size,
    fonts: ogFonts,
  });
}
