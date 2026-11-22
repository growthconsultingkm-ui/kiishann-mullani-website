import type { ReactNode } from "react";

type Props = {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
};

/** Opening block for inner pages — oversized headline, mono label, short intro. */
export function PageIntro({ index, label, title, intro, aside }: Props) {
  return (
    <section className="wrap pb-16 pt-14 md:pb-24 md:pt-20">
      <p className="kicker flex items-center gap-3 text-muted">
        {index && <span className="text-accent-deep">({index})</span>}
        <span aria-hidden className="h-px w-8 bg-current opacity-50" />
        {label}
      </p>
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className={aside ? "lg:col-span-8" : "lg:col-span-11"}>
          <h1 className="display-xl">{title}</h1>
          {intro && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/80 md:text-xl">{intro}</div>}
        </div>
        {aside && <div className="lg:col-span-4">{aside}</div>}
      </div>
    </section>
  );
}
