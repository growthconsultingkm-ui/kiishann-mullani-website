import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost-light" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-2",
  secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
  accent: "bg-accent text-ink hover:bg-paper",
  light: "bg-paper text-ink hover:bg-accent",
  "ghost-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: Props) {
  const cls = `group inline-flex min-h-12 items-center gap-3 rounded-full px-6 py-3 text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-300 ${styles[variant]} ${className}`;
  const Icon = external ? ArrowUpRight : ArrowRight;
  const icon = (
    <Icon
      aria-hidden
      className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px"
      strokeWidth={1.75}
    />
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
        {icon}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}
