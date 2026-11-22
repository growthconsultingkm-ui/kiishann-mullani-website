import Link from "next/link";
import { navigation, site } from "@/site.config";
import { activeSocials, visibleVentures } from "@/lib/site";
import { DevNote } from "./DevNote";
import { KmMark } from "./KmMark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="wrap grid gap-12 border-t border-paper/10 pb-10 pt-16 md:grid-cols-12 md:gap-8 lg:pt-20">
        <div className="md:col-span-5">
          <KmMark className="h-9 w-auto text-paper" />
          <p className="display-md mt-8 text-paper">
            {site.tagline.split(/(?<=\.)\s+/).map((line) => (
              <span key={line} className="block">
                {line.replace(/\.$/, "")}
                <span className="text-accent">.</span>
              </span>
            ))}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2 md:col-start-7">
          <h2 className="kicker text-mist">Explore</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <Link href="/" className="link-underline text-paper/85 hover:text-paper">
                Home
              </Link>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-paper/85 hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="kicker text-mist">Connect</h2>
          <ul className="mt-5 space-y-3">
            {activeSocials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="link-underline text-paper/85 hover:text-paper"
                >
                  {s.label} <span aria-hidden>↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
            {site.contact.email && (
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline break-all text-paper/85 hover:text-paper"
                >
                  {site.contact.email}
                </a>
              </li>
            )}
            <li>
              <Link href="/contact" className="link-underline text-paper/85 hover:text-paper">
                Send an enquiry
              </Link>
            </li>
          </ul>
          {activeSocials.length === 0 && (
            <DevNote className="mt-4">Add social profile URLs in site.config.ts → socials.</DevNote>
          )}
        </div>

        {visibleVentures.length > 0 && (
          <div className="md:col-span-2">
            <h2 className="kicker text-mist">Ventures</h2>
            <ul className="mt-5 space-y-3">
              {visibleVentures.map((v) => (
                <li key={v.name}>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-paper/85 hover:text-paper"
                  >
                    {v.name} <span aria-hidden>↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="wrap flex flex-col gap-3 pb-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {site.location && <span>Based in {site.location}</span>}
          <Link href="/privacy" className="link-underline hover:text-paper">
            Privacy
          </Link>
        </p>
      </div>

      {/* Decorative oversized name, drawn with CSS so it is invisible to assistive tech. */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div data-text={site.name} className="footer-giant wrap" />
      </div>
    </footer>
  );
}
