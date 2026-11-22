# QA report

Tested 22 November 2026 against a production build (`npm run build && npm run start`) in headless Chrome. Where noted, a development server and a build with dummy contact credentials were also used.

## Build

| Check | Result |
| --- | --- |
| `npm run build` (Next.js 16.4.6, Turbopack) | ✅ Compiles; 35 static routes + 1 API route; no warnings |
| `npm run typecheck` | ✅ No TypeScript errors |
| Browser console on every page (production and dev) | ✅ No errors or warnings (except the expected 404 on the 404 page) |

## Responsive layout

Inspected at **375, 768, 1024 and 1440 px** on Home, About, Work With Me, Insights, an article, Speaking & Collaborations, Contact, Privacy and 404.

- ✅ No horizontal overflow at any width.
- Fixed during QA: at 1024 px the header's name, nav and CTA wrapped. The header CTA now shows only below 1024 px and from 1280 px, and the labels no longer wrap.
- Fixed during QA: the footer tagline broke mid-sentence, so each sentence now sits on its own line. A decorative diagonal in the closing CTA crossed body text and was removed.
- Fixed during QA: the Insights filter chips and search competed for one row, so search now sits above the chips.

## Functional checks

| Check | Result |
| --- | --- |
| Mobile menu: opens, focuses first link, traps Tab, closes on Escape and returns focus, closes on navigation | ✅ |
| All header, footer, in-page and CTA links (23 unique internal URLs) | ✅ All return 200 |
| Unknown URL | ✅ Custom 404 page |
| Insights: category filter, search, empty state, "Clear filters", URL deep link (`?category=`) | ✅ |
| Home focus rows → filtered Insights | ✅ |
| Contact: enquiry type pre-selected from `?type=` | ✅ |
| Contact (not configured): visible "awaiting setup" notice, submit disabled, working fallback link to KM Growth | ✅ |
| Contact (dummy credentials): client validation, error summary receives focus, field errors linked | ✅ |
| Contact (dummy credentials): delivery failure shows an honest error message | ✅ |
| API: valid request but not configured → 503 `not_configured`; invalid → 422; honeypot/too-fast → silently accepted, nothing sent; rate limit 5 per 10 min per IP | ✅ |
| API: real delivery via Resend | ⚠️ **Not tested.** Needs real credentials (see README §3) |
| Share buttons (LinkedIn, X, WhatsApp, copy link) | ✅ Correct share URLs; copy uses the Clipboard API |
| Marquee pause/play button | ✅ |
| Skip-to-content link is the first Tab stop | ✅ |
| Owner notes appear in dev and never in production | ✅ (2–5 per page in dev, 0 in production) |

## Accessibility

- **axe-core 4 (WCAG 2.0/2.1 A + AA + best practice): 0 violations** on all 8 page types at 1440 and 375 px.
- Fixed during QA: brand placeholder labels over the orange diagonal (now on a solid chip); the "(optional)" form hint; the decorative footer name (now a CSS pseudo-element, so screen readers ignore it).
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, labelled sections, visible focus rings, `aria-current` on nav, `aria-pressed` on filters, `aria-live` result counts.
- `prefers-reduced-motion` disables every animation, transition, scroll reveal and the marquee. Content is never hidden when JavaScript is off.
- Colour contrast is documented in `app/globals.css` and `DESIGN_RATIONALE.md`.

## SEO

| Check | Result |
| --- | --- |
| Unique `<title>` per page | ✅ |
| Meta descriptions | ✅ 121–157 chars on pages; article descriptions use the summary (up to ~186 chars) |
| Canonical URL per page | ✅ Uses `NEXT_PUBLIC_SITE_URL` (shows `localhost` until set) |
| Open Graph / Twitter images | ✅ Site image on every page; unique generated image per article |
| `sitemap.xml` | ✅ 7 pages; drafts excluded until published |
| `robots.txt` | ✅ Allows all, disallows `/api/`, points to sitemap |
| Drafts | ✅ `noindex, follow` plus a visible "Draft" label |
| Structured data | ✅ Person + WebSite (all pages), Article + BreadcrumbList (articles), FAQPage (Work With Me). No ratings or invented social proof |
| Image alt text | ✅ Descriptive; decorative graphics are `aria-hidden` |
| Security headers | ✅ `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`; `X-Powered-By` removed |

## Performance notes

- Nearly every route is pre-rendered static HTML. Client JavaScript is limited to the header/menu, scroll reveals, marquee, Insights filter, share button and contact form.
- Fonts are self-hosted with `next/font/local` (`display: swap`, size-adjusted fallbacks). The mono font is not preloaded.
- Stock photos are pre-resized (87–277 KB) and served through `next/image` as AVIF/WebP, with blur placeholders and responsive `sizes`.
- Paper grain, halftone and insight covers are CSS/SVG with no image downloads.
- Not measured: Lighthouse / Core Web Vitals on a real host. Run PageSpeed Insights after deploying.

## Known limitations / owner inputs

- No authentic photographs yet, so a branded KM panel stands in. The About gallery stays hidden in production until photos exist.
- The contact form is not connected, so real delivery is untested. Newsletter, booking link, email and social URLs are not set.
- The ten articles are **drafts for review**. Service scope and fees are not confirmed, so pages use enquiry-based copy.
- The About bio and the "Based in India" label need owner confirmation.
- The Privacy page needs legal review.
- `NEXT_PUBLIC_SITE_URL` must be set before launch.
- Not deployed: no deployment has been made or claimed.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000 (with owner notes)
npm run build      # production build + type check
npm run start      # serve the production build
npm run typecheck
```
