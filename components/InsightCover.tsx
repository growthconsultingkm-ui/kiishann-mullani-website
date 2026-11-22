import type { CategorySlug } from "@/site.config";

type Props = { category: CategorySlug; label: string; className?: string; large?: boolean };

/**
 * Typographic, code-drawn covers per category — no stock imagery.
 * Replace with real hero media later by adding a `cover` to an article.
 */
export function InsightCover({ category, label, className = "", large }: Props) {
  const theme = themes[category];
  return (
    <div className={`relative overflow-hidden ${theme.bg} ${className}`} aria-hidden>
      {theme.art}
      <span className={`kicker absolute left-5 top-5 ${theme.label}`}>{label}</span>
      <span
        className={`absolute bottom-4 right-5 font-mono text-[0.7rem] ${theme.label} ${large ? "" : "hidden sm:block"}`}
      >
        KM / Insights
      </span>
    </div>
  );
}

const themes: Record<CategorySlug, { bg: string; label: string; art: React.ReactNode }> = {
  "marketing-branding": {
    bg: "bg-paper-2",
    label: "text-muted",
    art: (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <circle cx="250" cy="150" r="92" fill="none" stroke="#0e1424" strokeWidth="1.5" />
        <circle cx="250" cy="150" r="56" fill="none" stroke="#0e1424" strokeWidth="1.5" />
        <circle cx="250" cy="150" r="18" fill="#f26a3d" />
        <line x1="40" y1="270" x2="360" y2="30" stroke="#f26a3d" strokeWidth="3" />
      </svg>
    ),
  },
  "ai-automation": {
    bg: "bg-ink",
    label: "text-mist",
    art: (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {Array.from({ length: 9 }).map((_, r) =>
          Array.from({ length: 13 }).map((__, c) => (
            <circle
              key={`${r}-${c}`}
              cx={40 + c * 27}
              cy={45 + r * 27}
              r={(r + c) % 5 === 0 ? 4 : 1.6}
              fill={(r * 3 + c) % 11 === 0 ? "#f26a3d" : "#a9adb8"}
              opacity={(r + c) % 5 === 0 ? 1 : 0.55}
            />
          )),
        )}
        <path d="M40 261 L148 153 L229 207 L364 72" fill="none" stroke="#f26a3d" strokeWidth="2.5" />
      </svg>
    ),
  },
  "business-growth": {
    bg: "bg-stone",
    label: "text-ink/70",
    art: (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={70 + i * 56}
            y={230 - i * 36}
            width="40"
            height={20 + i * 36}
            fill={i === 4 ? "#f26a3d" : "#0e1424"}
          />
        ))}
        <line x1="40" y1="250" x2="370" y2="250" stroke="#0e1424" strokeWidth="1.5" />
      </svg>
    ),
  },
  "consumer-psychology": {
    bg: "bg-accent",
    label: "text-ink/80",
    art: (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <path d="M60 150 C 120 60, 200 60, 230 150 S 340 240, 360 150" fill="none" stroke="#0e1424" strokeWidth="2" />
        <path d="M60 150 C 120 240, 200 240, 230 150 S 340 60, 360 150" fill="none" stroke="#0e1424" strokeWidth="2" />
        <circle cx="230" cy="150" r="10" fill="#0e1424" />
      </svg>
    ),
  },
  "mindset-execution": {
    bg: "bg-ink-2",
    label: "text-mist",
    art: (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={i}
            x1="60"
            y1={70 + i * 26}
            x2={i === 6 ? 340 : 140 + i * 30}
            y2={70 + i * 26}
            stroke={i === 6 ? "#f26a3d" : "#a9adb8"}
            strokeWidth={i === 6 ? 3 : 1.5}
            opacity={i === 6 ? 1 : 0.6}
          />
        ))}
        <path d="M325 222 L345 226 L325 230" fill="none" stroke="#f26a3d" strokeWidth="3" />
      </svg>
    ),
  },
};
