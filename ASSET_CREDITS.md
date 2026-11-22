# Asset credits & licensing

Last updated: 22 November 2026

## Owner-supplied brand assets

| Asset | Source | Use |
| --- | --- | --- |
| `public/brand/km-growth-consulting-logo.png` | Supplied by Kiishann Mullani (`KM_Logo_dark.png`) | Reference / downloads |
| `public/brand/km-logo-white.png` | Supplied (`KM_Logo.png`) | Reference |
| `public/brand/km-mark-on-black.jpg` | Supplied (`99332E9F.jpg`) | Reference |
| `public/brand/km-mark.svg`, `components/KmMark.tsx`, `app/icon.svg`, `app/apple-icon.png` | Vector trace of the supplied KM mark, made for this site so the mark stays crisp at every size | Header, footer, favicon, social images, placeholders |

## Stock photography — Envato Elements

Downloaded on 22 November 2026 through the owner's logged-in Envato account (shown as "B2B Designers") using the Envato app. Each item page showed **"Lifetime Commercial License"**. On download, Envato showed **"Automatically licensed"** and recorded the licences under a licence/project entry named **"22/11/2026"**.

**Action for owner:** in Envato (My Library → Licenses), rename that licence entry to *"Kiishann Mullani personal website"* (or the final domain) and keep the licence certificates on file. Check the current Envato Elements licence terms for single-project use.

| Item | Creator | Envato item URL | Original | Placement | Customisation |
| --- | --- | --- | --- | --- | --- |
| Coffee, Notepad and Flower in Golden Hour | isaeva_studio1 | https://app.envato.com/search/photos/663be896-6f20-46d5-9adf-da3f3920bd86 | JPG, 4104 × 2736 | Work With Me — wide image under the intro | Resized to 2200 px, JPEG q82 |
| Abstract Urban Architecture with Geometric Shapes and Lighting | Studio_OMG | https://app.envato.com/search/photos/659ba4a7-334d-4bfb-8ddf-5e890938f7ed | JPG, 3863 × 2887 | Speaking & Collaborations — intro aside | Resized to 2200 px, cropped 4:5 in layout |
| Geometric color elements of colorful building facade in Procida Island, Italy | erika8213 | https://app.envato.com/search/photos/c56bb798-bb2b-4bb5-8de9-1b74449b3ddb | JPG, 3365 × 5048 | Home — "What I believe" section | Resized to 1800 px, cropped 4:5 in layout |

The full-resolution originals are kept in `../envato-assets-originals/`, outside the website project. They are not deployed.

Usage principles applied:

- Stock images only illustrate ideas (light, structure, focus). None shows a person, and none could be mistaken for Kiishann, his workspace or a client project.
- No Envato previews are hotlinked or embedded. Files are served from this site.

## Fonts (self-hosted, no requests to Google)

| Font | Designer | Licence | Files |
| --- | --- | --- | --- |
| Space Grotesk (variable) | Florian Karsten | SIL Open Font License 1.1 | `app/fonts/SpaceGrotesk-Variable.woff2`, `assets/og/SpaceGrotesk-600.woff` |
| Inter (variable) | Rasmus Andersson | SIL Open Font License 1.1 | `app/fonts/Inter-Variable.woff2`, `assets/og/Inter-400.woff` |
| JetBrains Mono (400, 500) | JetBrains | SIL Open Font License 1.1 | `app/fonts/JetBrainsMono-*.woff2` |

Font files were taken from the Fontsource npm packages (v5.3.0), Latin subset.

## Icons

[Lucide](https://lucide.dev) (`lucide-react`) — ISC licence.

## Code-drawn graphics (no external assets)

- Paper grain: inline SVG noise filter in `app/globals.css`
- Halftone pattern, diagonal accents, insight covers (`components/InsightCover.tsx`): CSS/SVG written for this site
- Social preview images: generated at build time (`lib/og.tsx`)

## Envato research — shortlisted, not used

Code templates reviewed on 22 Nov 2026 (searches: "next.js personal portfolio", "editorial portfolio tailwind next.js"):

| Template | Author | Stack noted on listing | Verdict |
| --- | --- | --- | --- |
| Aydem – Personal Portfolio Next.js & Tailwind CSS | Unifato | Next.js 16, Tailwind CSS 4 | Modern stack. Its layout leans on testimonials, skills and resume sections that the brief rules out. |
| Naru – Tailwind NextJS Personal Portfolio | FlaTheme | Next.js 15, Tailwind 3.4 | Lightweight, but a minimal photographer/designer layout. It would need a near-total rewrite. |
| Luique – React Next.js Personal Portfolio | bslthemes | Next.js + Bootstrap 5 | CV/resume structure (skills bars, pricing tables, testimonial carousel). Bootstrap conflicts with the Tailwind stack. |
| Nino / Bentos – Next JS Personal Portfolio | themes_mountain / theme_ocean | Next.js with jQuery | Rejected: jQuery inside Next.js. |

**Decision:** a custom build on Next.js + Tailwind. Every shortlisted template was built around generic portfolio and CV patterns (testimonials, pricing tables, skill bars, client logos) that conflict with the brief's no-fake-proof rules and its editorial direction. Adapting one would have meant removing most of it. A custom build gives a distinctive, lighter, fully accessible result with no template licence to manage.

Other assets searched (paper textures, e.g. "Subtle Paper Textures #12" by Pitchlook and "Subtle Paper Textures" by pixelbuddha_graphic) were not needed: the grain is generated in CSS.
