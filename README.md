# Kiishann Mullani — personal brand website

The personal website for **Kiishann Mullani**, growth strategist. It's built to establish authority, grow an owned audience through the Insights library, and turn the right visitors into enquiries for KM Growth.

**Think better. Grow smarter. Build what matters.**

- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Markdown content collection · Lucide icons
- **Pages:** Home · About · Work With Me · Insights (filterable, searchable library + article pages) · Speaking & Collaborations · Contact · Privacy · 404
- **SEO:** unique titles/descriptions, canonical URLs, Open Graph + Twitter images (generated), `sitemap.xml`, `robots.txt`, JSON-LD (Person, WebSite, Article, BreadcrumbList, FAQPage)

---

## 1. Run it on your computer

You need **Node.js 20.9 or newer** (LTS recommended). On Windows, install it from <https://nodejs.org> and accept the defaults.

Open a terminal in this folder (in File Explorer: click the address bar, type `cmd`, press Enter) and run:

```bash
npm install        # first time only — downloads dependencies (~1–2 minutes)
npm run dev        # starts the site at http://localhost:3000
```

Open <http://localhost:3000> in your browser. Edits to files update the page automatically.

> **Owner notes:** while running `npm run dev`, dashed orange boxes labelled *"Owner note (dev only)"* show every slot that still needs real content (photos, socials, service fees, etc.). They never appear in a production build.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with live reload and owner notes |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serves the production build at http://localhost:3000 |
| `npm run typecheck` | TypeScript check only |

---

## 2. Where to edit things

| You want to change… | Edit this |
| --- | --- |
| Name, tagline, location, email, phone, booking link, social links | `site.config.ts` |
| Photos | Put files in `public/images/`, then set `site.config.ts → photos` |
| About page introduction / role history | `site.config.ts → about` |
| Services (scope, duration, fee, what's included) | `site.config.ts → services` |
| Show NuraFlow Digital or Kirvon | `site.config.ts → ventures` (set `show: true` and add a description) |
| Enable the *Clarity & Direction Session* | `site.config.ts → claritySession.enabled` |
| Hide all draft articles before launch | `site.config.ts → showDraftContent: false` |
| Articles | `content/insights/*.md` (see below) |
| Page copy | `app/<page>/page.tsx` |
| Colours, fonts, spacing | `app/globals.css` (the `@theme` block) |

**Rule of thumb:** an empty value in `site.config.ts` hides that element. Nothing fake or broken is shown publicly.

### Writing an article

1. Copy `content/insights/_TEMPLATE.md` and rename it — the file name becomes the URL (e.g. `pricing-for-growth.md` → `/insights/pricing-for-growth`).
2. Fill in the frontmatter (title, summary, category, date) and write the article in Markdown.
3. Keep `status: draft` while reviewing. Change it to `status: published` when it's ready.
   - Drafts are labelled **Draft** on the site, marked `noindex`, and left out of the sitemap.
4. For a video post, add `format: video` and `video: <YouTube URL>` — it embeds privacy-enhanced YouTube.

Categories: `marketing-branding`, `ai-automation`, `business-growth`, `consumer-psychology`, `mindset-execution`.

The ten seeded articles are **drafts written for Kiishann's review** — please read, edit and approve each one before publishing.

### Adding photographs

Use authentic photographs only (never AI likenesses). Recommended set:

| Config key | Shot | Crop |
| --- | --- | --- |
| `heroVertical` | Confident, natural portrait (home on mobile, About page) | 4:5 vertical |
| `heroHorizontal` | Same session, horizontal crop (home on desktop) | 3:2 horizontal |
| `working` | Seated / working in a real workspace | 3:4 |
| `candid` | Thinking or writing | square |
| `creator` | Direct-to-camera | 3:4 |
| `detail` | Notebook, desk or equipment close-up | square |
| `monochrome` | Optional black-and-white editorial portrait | 3:4 |

Export JPGs around 2000–2400 px on the long edge. Next.js automatically serves resized AVIF/WebP versions. Until a photo is set, a branded KM panel appears in its place.

---

## 3. Environment variables

Copy `.env.example` to `.env.local` for local use, and add the same variables in your host (e.g. Vercel → Project → Settings → Environment Variables). Never commit real values.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Final domain, e.g. `https://www.yourdomain.com`. Used for canonical URLs, sitemap and social previews. **Set this before launch.** |
| `RESEND_API_KEY` | **Required for the contact form.** Resend API key (server-side only) |
| `CONTACT_TO_EMAIL` | Optional. Inbox for enquiries — defaults to `site.config.ts → contact.email` |
| `CONTACT_FROM_EMAIL` | Optional. Sender on a domain verified in Resend, e.g. `KM Growth <hello@kmgrowth.in>` — defaults to `onboarding@resend.dev` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics 4 ID (`G-…`). No analytics load if empty. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional Google Search Console HTML-tag token |

### Contact form — how to connect it

The form validates input in the browser **and** on the server, has spam protection (hidden honeypot, minimum fill time, per-IP rate limit), and is **clearly marked "awaiting setup"** until delivery is configured. It never pretends to send.

Every enquiry is emailed to `site.config.ts → contact.email` (growthconsultingkm@gmail.com), with the visitor's address as reply-to, so you can answer straight from Gmail.

1. Create a free account at <https://resend.com> **signed up with growthconsultingkm@gmail.com**. Until a domain is verified, Resend's shared sender only delivers to the account's own email.
2. Create an API key (API Keys → Create, "Sending access").
3. Add `RESEND_API_KEY` in your host's environment variables, then restart or redeploy.
4. Send a test enquiry from the live site and check Gmail, including Spam the first time (mark it "Not spam").

Recommended later: verify `kmgrowth.in` in Resend (Domains → add its DNS records in GoDaddy), then set `CONTACT_FROM_EMAIL="KM Growth <hello@kmgrowth.in>"` for better inbox placement.

Until the key is set, the form is marked "awaiting setup" and points visitors to the email address instead.

### Newsletter

Hidden in production until connected. When you pick a provider (Buttondown, Kit/ConvertKit, Mailchimp, etc.), paste its embedded-form `action` URL into `site.config.ts → newsletter.actionUrl` (and the email field name if it isn't `email`).

### Analytics

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to enable GA4. Before you do, update the Privacy page and consider a consent banner: review India's DPDP Act 2023 and the laws of other regions where you have visitors.

---

## 4. Deploy (recommended: Vercel)

1. Create a GitHub repository and upload this folder (without `node_modules` and `.next`, which `.gitignore` already excludes).
2. Go to <https://vercel.com>, choose **Add New → Project** and import the repository. Vercel detects Next.js automatically.
3. Add the environment variables from section 3.
4. Deploy, then add your domain under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to it. Redeploy.
5. In Google Search Console, add the property and submit `https://yourdomain.com/sitemap.xml`.

Any Node.js host that runs `npm run build && npm run start` also works (Netlify, Render, a VPS).

---

## 5. Project structure

```
app/                     Pages (App Router), API route, sitemap, robots, OG images, icons
  api/contact/route.ts   Contact form endpoint (validation, spam protection, Resend delivery)
  insights/[slug]/       Article template + per-article social image
components/              Reusable UI (Header, Footer, Portrait, InsightsLibrary, ContactForm…)
content/insights/        Articles in Markdown (_TEMPLATE.md shows the format)
lib/                     Content loading, SEO helpers, site URL, OG artwork
public/brand/            KM logo files (original PNGs + traced SVG mark)
public/images/stock/     Licensed Envato stock photos (see ASSET_CREDITS.md)
site.config.ts           ← Owner-editable details live here
```

Also in this folder: `DESIGN_RATIONALE.md` (creative strategy and reference notes), `ASSET_CREDITS.md` (sources and licences) and `QA_REPORT.md` (what was tested).

---

## 6. Before public launch — owner checklist

- [ ] Approve or edit the About introduction (`site.config.ts → about.intro`) and add any role history
- [ ] Add authentic portrait photographs
- [ ] Confirm the location label ("Based in India") or clear it
- [ ] Add public email, social profile URLs and booking link (if any)
- [ ] Confirm service scope, duration, fee and availability (or keep them enquiry-based)
- [ ] Review, edit and publish (or hide) each draft article
- [ ] Decide whether NuraFlow Digital and Kirvon appear, and how the relationship is described
- [ ] Connect the contact form (Resend) and send a test enquiry
- [ ] Connect a newsletter provider (optional)
- [ ] Have the Privacy page reviewed; update it for analytics or newsletter tools
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final domain
- [ ] Add real case studies and testimonials **only** with client permission
- [ ] Rename the Envato licence project to this website (see ASSET_CREDITS.md)
