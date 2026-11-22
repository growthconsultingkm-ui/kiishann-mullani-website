"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

/** Slow-moving strip of focus areas, with a visible pause control (WCAG 2.2.2). */
export function Marquee({ items }: { items: readonly string[] }) {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="display-md px-6 font-medium text-paper sm:px-10">{item}</span>
          <span className="text-3xl font-light text-accent" aria-hidden>
            /
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="on-dark relative flex items-center overflow-hidden bg-ink py-7 sm:py-9">
      <p className="sr-only">Areas of work: {items.join(", ")}.</p>
      <div
        className="marquee-track flex w-max animate-marquee"
        style={{ animationPlayState: paused ? "paused" : "running" }}
        aria-hidden
      >
        {row(false)}
        {row(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 bg-ink text-paper transition-colors hover:border-accent hover:text-accent sm:right-6"
        aria-label={paused ? "Play moving text" : "Pause moving text"}
        aria-pressed={paused}
      >
        {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
