# Design rationale

## Reference study (22 Nov 2026)

Both references were opened and scrolled in a browser. They are used for **craft and ambition, not layout**. No text, identity, code or page structure was copied.

**johnbolster.design**
- Warm off-white canvas, condensed all-caps display type at a huge scale, small monospace labels.
- One electric-blue accent: a continuous line that draws itself as you scroll and ties the sections together.
- A numbered section index on the right edge ("01 Home, 02 About, 03 By the numbers…") gives a sense of chapters.
- Halftone cut-out portrait. Outlined type that fills on scroll. A dark "by the numbers" section as a high-contrast moment. Playful personal details ("Beyond design").
- *What makes it memorable:* one strong visual thread (the line), confident scale and personality in the details.

**abhayrohit.com**
- Bold full-bleed red hero, giant condensed letters that animate individually, a serif accent line ("Creative mind. Engineer by craft.").
- Monospace micro-labels pinned to the corners ("Available to be hired", "Based in India · Working worldwide").
- Work presented as a film strip, then as scroll-driven case-study "rooms" with honest captions about what each image is.
- A visible "Pause motion" control, a good accessibility instinct.
- *What makes it memorable:* a committed colour, storytelling structure and candour about the work.

**What we took as principles:** a warm paper canvas; oversized but controlled type; mono micro-labels; a single accent colour used as a thread; numbered sections; one or two dark high-contrast moments; scroll-aware motion that respects reduced-motion; honesty in captions.

## Direction for Kiishann

*"The home of a thoughtful practitioner with a clear point of view."* It is editorial and typography-led, and the design gets out of the way of the thinking.

- **Signature thread:** the **diagonal cut inside the KM mark** becomes the visual motif: a thin orange diagonal crosses the hero, the photo placeholders and the social images. The diagonal-light stock photos were chosen to echo it.
- **Numbered rhythm:** every section opens with a mono label, e.g. `(02) — What I believe`, so the page reads like chapters.
- **Asymmetric grid:** labels sit in a narrow left column (3/12) and statements in the wide right column (9/12). Lists are editorial index rows with rules, not rounded cards.
- **Dark moments:** the areas-of-work strip, the Approach framework, the "Fit" section and the closing CTA and footer.
- **Motion:** headline lines rise in on load, sections fade up on scroll, the Approach line draws across, there is a scroll progress bar and a slow marquee with a pause button. All of it is disabled under `prefers-reduced-motion`.

### Palette

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#0E1424` | Text, dark sections. Tuned toward the KM logo navy rather than pure black, so the logo and site feel like one system |
| Paper | `#F5F2EC` | Main background, with subtle CSS grain |
| Stone | `#D8D2C8` | Rules, secondary panels |
| Accent | `#F26A3D` | Orange thread: full stops in the hero, diagonals, active states, CTA on dark |
| Accent deep | `#A93D17` | Orange for small text on light backgrounds (5.6:1 contrast) |
| Muted | `#5A5F6B` | Secondary text (5.7:1 on paper) |

Orange is never used as a wall-to-wall fill (except one insight cover), and never with white text (3:1 fails AA).

### Typography

- **Space Grotesk** (display): a contemporary grotesk with character, set tight (−0.05em) at large sizes.
- **Inter** (body): highly readable, with a comfortable 1.7 line height in articles and a ~68-character line length.
- **JetBrains Mono** (labels): the "notebook" voice for kickers, metadata and indices.
- All three are self-hosted (OFL) via `next/font/local`, with no third-party requests.

## Site map and audience paths

```
/                         Home
/work-with-me             Growth Strategy Sprint · Growth Advisory · Marketing & Brand Strategy
/about                    Introduction · intersection · principles · photos
/insights                 Library (filters + search) → /insights/[slug]
/speaking-collaborations  Topics · formats · enquiry checklist
/contact                  Enquiry form (type pre-selected via ?type=)
/privacy                  Placeholder notice for legal review
```

| Audience | Path |
| --- | --- |
| Business owners / founders (primary) | Home hero → *Work with me* → service detail → *Discuss a growth challenge* → Contact (type = growth) |
| Marketing & business professionals | Home → Focus areas → Insights (filtered) → article → related articles / newsletter |
| Ambitious individuals | Insights (Mindset & Execution) → articles. A Clarity & Direction Session can be switched on later. |
| Event organisers / brands | Speaking & Collaborations → *Invite me to speak* / *Propose a collaboration* → Contact (type pre-selected) |

### CTA hierarchy

1. **Primary:** *Discuss a growth challenge* / *Work with me* (header, hero, services, every closing band)
2. **Secondary:** *Explore insights* (hero, About, article footers)
3. **Tertiary:** *Invite me to speak / collaborate* (closing band, Speaking page)

## Page wireframe notes

**Home:** (01) hero: mono kicker row → three-line headline (line 2 indented, orange full stops) → support copy + two CTAs | portrait (horizontal on desktop, vertical on mobile) · areas-of-work marquee (ink) · (02) point of view: large statement + photo + three short paragraphs · (03) five focus areas as index rows linking to filtered Insights · (04) latest insights, 1 feature + 2 · (05) three service paths · (06) Diagnose → Prioritise → Build → Learn (ink, drawn line) · (07) KM Growth venture block · newsletter (only when connected) · closing CTA → footer.

**Work With Me:** intro + offer index → wide image → one section per service (sticky title and CTA on the left; who it's for / problems / how it works / scope / not included on the right) → fit vs not-fit (ink) → three steps before work begins → FAQ → CTA.

**Insights:** intro → count + search → category chips → feature + 2 cards → "More insights" rows. Filtering switches to rows. Filters are reflected in the URL. Empty state included.

**Article:** breadcrumbs → draft notice → title, summary, meta grid → cover → share rail + body → author bio with CTAs → related articles.

## Honesty rules built into the system

- No invented metrics, clients, testimonials, awards, years or speaking history.
- Empty config values hide their element in production. Development shows owner notes instead.
- The contact form is visibly "awaiting setup" until credentials exist, with a working fallback route.
- Drafts are labelled, `noindex` and excluded from the sitemap.
- Numerology, astrology and manifestation are kept out of the launch navigation and services, as the brief requires.
