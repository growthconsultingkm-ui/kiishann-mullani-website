type Props = { index?: string; children: React.ReactNode; className?: string; tone?: "light" | "dark" };

/** Numbered mono label used to mark the rhythm of each section. */
export function SectionLabel({ index, children, className = "", tone = "light" }: Props) {
  const color = tone === "dark" ? "text-mist" : "text-muted";
  return (
    <p className={`kicker flex items-center gap-3 ${color} ${className}`}>
      {index && <span className={tone === "dark" ? "text-accent" : "text-accent-deep"}>({index})</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}
