import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "assets", "og");

export const ogFonts = [
  {
    name: "Space Grotesk",
    data: fs.readFileSync(path.join(dir, "SpaceGrotesk-600.woff")),
    weight: 600 as const,
    style: "normal" as const,
  },
  {
    name: "Inter",
    data: fs.readFileSync(path.join(dir, "Inter-400.woff")),
    weight: 400 as const,
    style: "normal" as const,
  },
];

export const ogSize = { width: 1200, height: 630 };

/** Shared social-preview artwork: ink background, KM mark, orange diagonal. */
export function OgFrame({ kicker, title, footer }: { kicker: string; title: string; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0e1424",
        color: "#f5f2ec",
        padding: "64px 72px",
        position: "relative",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -110,
          top: 60,
          width: 420,
          height: 4,
          background: "#f26a3d",
          transform: "rotate(-38deg)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="58" height="54" viewBox="0 0 965 898" fill="#f5f2ec">
          <path d="M747 0H491L213 301V0H0v898h213V588zM285 620l221 278h249L412 474zM852 0 483 453l160 196 119-141 1 390h202V0z" />
        </svg>
        <div style={{ fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#a9adb8" }}>{kicker}</div>
      </div>
      <div
        style={{
          fontFamily: "Space Grotesk",
          fontSize: title.length > 100 ? 56 : title.length > 60 ? 66 : 78,
          lineHeight: 1.02,
          letterSpacing: -2.5,
          maxWidth: 860,
          display: "flex",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a9adb8" }}>
        <span>{footer}</span>
        <span style={{ color: "#f26a3d" }}>Think better. Grow smarter. Build what matters.</span>
      </div>
    </div>
  );
}
