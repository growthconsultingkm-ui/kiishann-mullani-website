import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { categories, site } from "@/site.config";
import { getAllInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { InsightCard } from "@/components/InsightCard";
import { Marquee } from "@/components/Marquee";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { Portrait } from "@/components/Portrait";
import { SectionLabel } from "@/components/SectionLabel";
import facade from "@/public/images/stock/facade-orange-shadow.jpg";

export const metadata = pageMetadata({
  title: `${site.name} — Growth strategist`,
  description: site.metaDescription,
  path: "/",
  absoluteTitle: true,
});

const areas = [
  "Marketing Strategy",
  "Business Growth",
  "AI & Systems",
  "Consumer Psychology",
  "Brand Positioning",
  "Execution",
] as const;

const approach = [
  {
    title: "Diagnose",
    text: "Understand the business as it really is — customers, offer, market, numbers and capacity. Find the real constraint before prescribing anything.",
  },
  {
    title: "Prioritise",
    text: "Choose the few moves that matter most, in the right order. Saying no to good ideas is part of the strategy.",
  },
  {
    title: "Build",
    text: "Turn priorities into systems, assets and habits the team can run — including AI, where it genuinely earns its place.",
  },
  {
    title: "Learn",
    text: "Measure what happened, keep what works, cut what doesn't and feed the lessons into the next decision.",
  },
];

export default function HomePage() {
  const insights = getAllInsights();
  const [lead, ...others] = insights;

  return (
    <>
      {/* ── (01) Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute right-[-6%] top-[22%] hidden h-[2px] w-[34vw] origin-right -rotate-[38deg] bg-accent md:block"
        />
        <div className="wrap relative pb-16 pt-10 md:pb-24 md:pt-14">
          <div className="kicker flex flex-wrap items-center justify-between gap-4 text-muted">
            <span className="flex items-center gap-3">
              <span className="text-accent-deep">(01)</span>
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {site.role} — Marketing · AI · Business growth
            </span>
            {site.location && <span className="hidden sm:inline">Based in {site.location}</span>}
          </div>

          <h1 className="display-hero mt-10 md:mt-14">
            <span className="line-mask">
              <span style={{ ["--d" as string]: "60ms" }}>
                Think better<span className="text-accent">.</span>
              </span>
            </span>
            <span className="line-mask">
              <span style={{ ["--d" as string]: "170ms" }} className="md:pl-[11%]">
                Grow smarter<span className="text-accent">.</span>
              </span>
            </span>
            <span className="line-mask">
              <span style={{ ["--d" as string]: "280ms" }}>
                Build what matters<span className="text-accent">.</span>
              </span>
            </span>
          </h1>

          <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-10 lg:col-span-5">
              <div>
                <p className="max-w-[32ch] text-xl leading-snug text-ink/85 md:text-2xl">{site.heroSupport}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <ButtonLink href="/work-with-me">Work with me</ButtonLink>
                  <ButtonLink href="/insights" variant="secondary">
                    Explore insights
                  </ButtonLink>
                </div>
              </div>
              <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">
                For founders and owners who want an outside strategic view — and for anyone who wants to think more
                clearly about growth.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Portrait
                photo={site.photos.heroVertical}
                slot="hero portrait, vertical 4:5"
                ratio="portrait"
                priority
                sizes="100vw"
                className="lg:hidden"
              />
              <Portrait
                photo={site.photos.heroHorizontal}
                slot="hero portrait, horizontal 3:2"
                ratio="landscape"
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="hidden lg:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Areas of work ─────────────────────────────────────── */}
      <Marquee items={areas} />

      {/* ── (02) Point of view ────────────────────────────────── */}
      <section className="wrap py-24 md:py-36" aria-labelledby="pov-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="02">What I believe</SectionLabel>
          </div>
          <h2 id="pov-title" className="display-lg max-w-[20ch] lg:col-span-9" data-reveal>
            Most businesses don&apos;t have a marketing problem. They have a{" "}
            <span className="relative whitespace-nowrap">
              clarity problem
              <span aria-hidden className="absolute inset-x-0 bottom-[0.06em] -z-10 h-[0.28em] bg-accent/70" />
            </span>{" "}
            that shows up in their marketing.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:col-start-4" data-reveal>
            <Image
              src={facade}
              alt="Sunlit orange wall cut by a sharp diagonal shadow"
              sizes="(min-width: 1024px) 30vw, 100vw"
              placeholder="blur"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div
            className="flex flex-col justify-end gap-6 text-lg leading-relaxed text-ink/80 lg:col-span-4 lg:col-start-9"
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <p>
              Growth rarely stalls for one dramatic reason. It stalls because positioning is fuzzy, effort is scattered
              across too many channels, and decisions get made on instinct when they should be made on evidence.
            </p>
            <p>
              Better tactics won&apos;t fix that on their own. What helps is stepping back — understanding the customer,
              the numbers and the team&apos;s real capacity — then choosing the few things that matter most and doing
              them properly.
            </p>
            <p className="font-medium text-ink">
              Marketing, AI and strategy are tools. Clear thinking is what makes them useful.
            </p>
          </div>
        </div>
      </section>

      {/* ── (03) Focus areas ──────────────────────────────────── */}
      <section className="border-t border-ink/10" aria-labelledby="focus-title">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="03">Focus</SectionLabel>
            </div>
            <h2 id="focus-title" className="display-lg max-w-[18ch] lg:col-span-9" data-reveal>
              Five areas I think about, write about and work on.
            </h2>
          </div>

          <ol className="mt-14 border-b border-ink/15 md:mt-20">
            {categories.map((c, i) => (
              <li
                key={c.slug}
                className="group relative border-t border-ink/15"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              >
                <div className="grid items-baseline gap-3 py-8 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-10">
                  <span className="kicker text-accent-deep md:col-span-1">0{i + 1}</span>
                  <h3 className="display-md md:col-span-5">
                    <Link
                      href={`/insights?category=${c.slug}`}
                      className="after:absolute after:inset-0 group-hover:text-accent-deep"
                    >
                      {c.name}
                    </Link>
                  </h3>
                  <p className="max-w-md text-ink/75 md:col-span-5">{c.description}</p>
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="hidden size-7 justify-self-end text-ink/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-deep md:col-span-1 md:block"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── (04) Featured insights ────────────────────────────── */}
      {lead && (
        <section className="bg-white/70" aria-labelledby="insights-title">
          <div className="wrap py-24 md:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel index="04">Insights</SectionLabel>
                <h2 id="insights-title" className="display-lg mt-6 max-w-[16ch]">
                  Field notes on growth.
                </h2>
              </div>
              <Link href="/insights" className="group inline-flex items-center gap-2 font-medium">
                <span className="link-underline">All insights</span>
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7" data-reveal>
                <InsightCard insight={lead} variant="feature" />
              </div>
              <div className="flex flex-col gap-12 lg:col-span-5">
                {others.slice(0, 2).map((i, idx) => (
                  <div key={i.slug} data-reveal style={{ ["--reveal-delay" as string]: `${(idx + 1) * 100}ms` }}>
                    <InsightCard insight={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── (05) How I help ───────────────────────────────────── */}
      <section aria-labelledby="help-title">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="05">How I help</SectionLabel>
            </div>
            <div className="lg:col-span-9">
              <h2 id="help-title" className="display-lg max-w-[18ch]" data-reveal>
                Three ways to work together.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
                Every engagement starts with a conversation about your business — not a package. Scope is agreed before
                any work begins.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-px bg-ink/15 md:mt-20 md:grid-cols-3">
            {site.services.map((s, i) => (
              <article
                key={s.slug}
                className="group relative flex flex-col bg-paper pb-10 pt-8 md:px-8 md:first:pl-0 md:last:pr-0"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <span className="kicker text-accent-deep">{s.number}</span>
                <h3 className="mt-6 text-[1.75rem] font-semibold leading-tight">{s.name}</h3>
                <p className="mt-4 flex-1 text-ink/75">{s.summary}</p>
                <p className="mt-6 border-t border-ink/10 pt-4 text-sm text-muted">
                  <span className="kicker mr-2 text-ink">Best for</span>
                  {s.forWho[0].toLowerCase()}
                </p>
                <Link
                  href={`/work-with-me#${s.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-medium after:absolute after:inset-0 group-hover:text-accent-deep"
                >
                  Explore<span className="sr-only"> {s.name}</span>
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/contact?type=growth">Discuss a growth challenge</ButtonLink>
            <ButtonLink href="/work-with-me" variant="secondary">
              How engagements work
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── (06) Approach ─────────────────────────────────────── */}
      <section className="on-dark bg-ink text-paper" aria-labelledby="approach-title">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="06" tone="dark">
                Approach
              </SectionLabel>
            </div>
            <h2 id="approach-title" className="display-lg max-w-[20ch] lg:col-span-9" data-reveal>
              A simple way of working, applied with discipline.
            </h2>
          </div>

          <div className="relative mt-16 md:mt-24">
            <div aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-paper/15 md:block" />
            <div
              aria-hidden
              data-draw
              className="absolute left-0 right-0 top-[1.15rem] hidden h-[2px] bg-accent md:block"
            />
            <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
              {approach.map((step, i) => (
                <li
                  key={step.title}
                  className="relative"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${200 + i * 140}ms` }}
                >
                  <span className="relative z-10 inline-flex size-9 items-center justify-center rounded-full border border-accent bg-ink font-mono text-xs text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-8 flex items-center gap-3 text-[2rem] font-semibold leading-none">
                    {step.title}
                    {i < approach.length - 1 && (
                      <ArrowRight aria-hidden className="size-6 text-accent md:hidden" strokeWidth={1.5} />
                    )}
                  </h3>
                  <p className="mt-5 max-w-xs leading-relaxed text-paper/75">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <NewsletterBlock />

      <CtaBand />
    </>
  );
}
