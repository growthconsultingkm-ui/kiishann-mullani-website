"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
  ];
  return (
    <div>
      <p className="kicker text-muted">Share</p>
      <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center rounded-full border border-ink/20 px-4 text-sm hover:border-ink"
            >
              {l.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {
                setCopied(false);
              }
            }}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/20 px-4 text-sm hover:border-ink"
          >
            {copied ? (
              <Check className="size-4 text-accent-deep" aria-hidden />
            ) : (
              <Link2 className="size-4" aria-hidden />
            )}
            <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
