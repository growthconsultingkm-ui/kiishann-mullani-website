import { site } from "@/site.config";
import { isDev } from "@/lib/site";
import { DevNote } from "./DevNote";

/**
 * Newsletter signup. Renders a real form only when a provider form
 * action is configured. Otherwise it is hidden in production and shown
 * as a clearly disabled placeholder during development.
 */
export function NewsletterBlock() {
  const { actionUrl, emailFieldName, provider } = site.newsletter;
  const live = actionUrl.trim() !== "";
  if (!live && !isDev) return null;

  return (
    <section className="border-t border-ink/10" aria-labelledby="newsletter-title">
      <div className="wrap grid gap-10 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="kicker text-muted">Newsletter</p>
          <h2 id="newsletter-title" className="display-md mt-5 max-w-[22ch]">
            One useful idea on growth, marketing or AI — in your inbox, occasionally.
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          {live ? (
            <form action={actionUrl} method="post" target="_blank" className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name={emailFieldName}
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className="min-h-12 flex-1 rounded-full border border-ink/25 bg-white px-5 focus:border-ink focus:outline-none"
              />
              <button type="submit" className="min-h-12 rounded-full bg-ink px-6 font-medium text-paper hover:bg-ink-2">
                Subscribe
              </button>
            </form>
          ) : (
            <>
              <div className="flex flex-col gap-3 opacity-50 sm:flex-row" aria-hidden>
                <div className="min-h-12 flex-1 rounded-full border border-dashed border-ink/40" />
                <div className="min-h-12 w-32 rounded-full bg-ink/30" />
              </div>
              <DevNote className="mt-4">
                Newsletter is not connected, so this block is hidden in production. Add a provider form action in
                site.config.ts → newsletter.actionUrl{provider ? ` (${provider})` : ""}.
              </DevNote>
            </>
          )}
          <p className="mt-4 text-sm text-muted">No spam. Unsubscribe any time.</p>
        </div>
      </div>
    </section>
  );
}
