import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Check, Minus } from "lucide-react";
import { site } from "@/site.config";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { DevNote } from "@/components/DevNote";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { SectionLabel } from "@/components/SectionLabel";
import desk from "@/public/images/stock/desk-golden-hour.jpg";

export const metadata = pageMetadata({
  title: "Work With Me",
  description:
    "Growth Strategy Sprint, Growth Advisory and Marketing & Brand Strategy — strategic support for founders and owners who want clarity on what to do next.",
  path: "/work-with-me",
});

const detailLabels: Record<string, string> = {
  duration: "Duration",
  format: "Format",
  cadence: "Cadence",
  scope: "Scope",
  availability: "Availability",
  implementation: "Implementation",
  fee: "Fee",
  deliverables: "Deliverables",
};

function filledDetails(details: Record<string, string | readonly string[]>) {
  return Object.entries(details).filter(([, v]) => (Array.isArray(v) ? v.length > 0 : String(v).trim() !== ""));
}

const goodFit = [
  "You own or run the business, or can make decisions about its direction",
  "You're willing to look honestly at what isn't working",
  "You want a plan you can act on, not a report that sits in a folder",
  "You value clear thinking as much as new ideas",
];

const notFit = [
  "You're looking for guaranteed results or a quick hack",
  "You only need someone to run ads or post content without a strategy",
  "You need regulated advice — legal, tax, accounting or investment",
  "The decision-maker won't be part of the conversation",
];

const faqs = [
  {
    q: "Do you guarantee results?",
    a: "No — and you should be wary of anyone who does. Growth depends on many things outside any adviser's control. What I commit to is rigorous thinking, honest recommendations and a plan that's realistic for your business.",
  },
  {
    q: "What does an engagement cost?",
    a: "It depends on scope. After an initial conversation you receive a written proposal with timing and fee before any work begins, so there are no surprises.",
  },
  {
    q: "Do you implement as well as advise?",
    a: "Strategy and advisory are the core. Where implementation support makes sense, its scope is agreed separately for each project.",
  },
  {
    q: "How do you use AI in your work?",
    a: "As a practical tool — for research, analysis, drafting and workflow design — and always with human judgement on top. If AI can genuinely save your team time, we'll look at where and how.",
  },
  {
    q: "Where do engagements run?",
    a: "Strategy and advisory engagements are delivered through KM Growth Consulting. Start with an enquiry here and we'll take it from there.",
  },
];

export default function WorkWithMePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    url: absoluteUrl("/work-with-me"),
  };

  return (
    <>
      <PageIntro
        label="Work with me"
        title="Clear thinking for businesses that are ready to grow on purpose."
        intro={
          <p>
            I work with founders and business owners who need an outside strategic view: someone to diagnose what&apos;s
            really holding growth back, help choose what to do next and keep the plan honest. Every engagement starts
            with a conversation, not a package.
          </p>
        }
        aside={
          <nav aria-label="Ways to work together" className="border-t border-ink/15 lg:mt-3">
            {site.services.map((s) => (
              <Link
                key={s.slug}
                href={`#${s.slug}`}
                className="group flex items-center justify-between gap-4 border-b border-ink/15 py-4"
              >
                <span className="flex items-baseline gap-4">
                  <span className="kicker text-accent-deep">{s.number}</span>
                  <span className="text-lg font-medium group-hover:text-accent-deep">{s.name}</span>
                </span>
                <ArrowDown
                  aria-hidden
                  className="size-4 text-ink/40 transition-transform group-hover:translate-y-0.5 group-hover:text-accent-deep"
                />
              </Link>
            ))}
          </nav>
        }
      />

      <div className="wrap">
        <Image
          src={desk}
          alt="Coffee cup, notebook and pencil on a table, crossed by a band of late-afternoon light"
          sizes="(min-width: 1440px) 1344px, 100vw"
          placeholder="blur"
          priority
          className="aspect-[16/9] w-full object-cover md:aspect-[21/8]"
        />
      </div>

      {/* Services */}
      {site.services.map((s, idx) => {
        const details = filledDetails(s.details as Record<string, string | readonly string[]>);
        const missing = Object.keys(s.details).filter((k) => !details.some(([d]) => d === k));
        return (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className={idx === 0 ? "" : "border-t border-ink/10"}
          >
            <div className="wrap grid gap-12 py-24 md:py-28 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <SectionLabel index={s.number}>Service</SectionLabel>
                  <h2 id={`${s.slug}-title`} className="display-lg mt-6">
                    {s.name}
                  </h2>
                  <p className="mt-6 max-w-md text-xl leading-snug text-ink/80">{s.summary}</p>
                  <div className="mt-8">
                    <ButtonLink href="/contact?type=growth">{s.cta}</ButtonLink>
                  </div>
                </div>
              </div>

              <div className="grid gap-12 lg:col-span-6 lg:col-start-7">
                <Block title="Who it's for">
                  <List items={s.forWho} />
                </Block>
                <Block title="Problems it addresses">
                  <List items={s.problems} />
                </Block>
                <Block title="How it works">
                  <p className="text-lg leading-relaxed text-ink/80">{s.approach}</p>
                </Block>
                <Block title="Scope, timing & fee">
                  {details.length > 0 ? (
                    <dl className="border-t border-ink/15">
                      {details.map(([k, v]) => (
                        <div key={k} className="grid gap-1 border-b border-ink/15 py-3 sm:grid-cols-3">
                          <dt className="kicker pt-1 text-muted">{detailLabels[k] ?? k}</dt>
                          <dd className="sm:col-span-2">
                            {Array.isArray(v) ? <List items={v as readonly string[]} /> : String(v)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-lg leading-relaxed text-ink/80">
                      Scope, timing and fee are agreed together after our first conversation, and confirmed in writing
                      before any work begins.
                    </p>
                  )}
                  {missing.length > 0 && (
                    <DevNote className="mt-4">
                      Not yet confirmed for this service: {missing.join(", ")}. Fill these in site.config.ts → services
                      only when final.
                    </DevNote>
                  )}
                </Block>
                <Block title="What it doesn't include">
                  <List items={s.notIncluded} negative />
                </Block>
              </div>
            </div>
          </section>
        );
      })}

      {/* Secondary pathway for individuals (only when approved) */}
      {site.claritySession.enabled ? (
        <section className="border-t border-ink/10" aria-labelledby="clarity-title">
          <div className="wrap grid gap-10 py-20 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel>For individuals</SectionLabel>
              <h2 id="clarity-title" className="display-md mt-6">
                {site.claritySession.name}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed text-ink/80">{site.claritySession.summary}</p>
              <p className="mt-4 border-l-2 border-accent pl-4 text-ink/80">{site.claritySession.disclaimer}</p>
              <div className="mt-8">
                <ButtonLink href="/contact?type=general" variant="secondary">
                  Ask about a session
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="wrap">
          <DevNote>
            The optional “Clarity &amp; Direction Session” for individuals is switched off. Enable it in site.config.ts
            → claritySession once scope and wording are approved.
          </DevNote>
        </div>
      )}

      {/* Fit */}
      <section className="on-dark bg-ink text-paper" aria-labelledby="fit-title">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel tone="dark" index="04">
                Fit
              </SectionLabel>
            </div>
            <h2 id="fit-title" className="display-lg max-w-[18ch] lg:col-span-9" data-reveal>
              Honest about who this is for.
            </h2>
          </div>
          <div className="mt-14 grid gap-px bg-paper/15 md:grid-cols-2">
            <div className="bg-ink py-8 md:pr-10">
              <h3 className="kicker text-accent">A good fit if</h3>
              <ul className="mt-6 space-y-4">
                {goodFit.map((g) => (
                  <li key={g} className="flex gap-3 text-lg leading-snug text-paper/85">
                    <Check aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ink py-8 md:pl-10">
              <h3 className="kicker text-mist">Probably not a fit if</h3>
              <ul className="mt-6 space-y-4">
                {notFit.map((g) => (
                  <li key={g} className="flex gap-3 text-lg leading-snug text-paper/70">
                    <Minus aria-hidden className="mt-1 size-5 shrink-0 text-mist" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it starts */}
      <section aria-labelledby="process-title">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="05">How it starts</SectionLabel>
            </div>
            <h2 id="process-title" className="display-lg max-w-[18ch] lg:col-span-9" data-reveal>
              Three steps before any work begins.
            </h2>
          </div>
          <ol className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
            {site.engagementSteps.map((step, i) => (
              <li
                key={step.title}
                className="border-t-2 border-ink pt-6"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
              >
                <span className="display-lg text-accent">{i + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-ink/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/10" aria-labelledby="faq-title">
        <div className="wrap grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="06">Questions</SectionLabel>
            <h2 id="faq-title" className="display-lg mt-6">
              Common questions
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {faqs.map((f) => (
              <details key={f.q} className="group border-t border-ink/15 py-6 last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="relative size-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-ink" />
                    <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-ink transition-transform group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={faqSchema} />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div data-reveal>
      <h3 className="kicker mb-5 text-muted">{title}</h3>
      {children}
    </div>
  );
}

function List({ items, negative }: { items: readonly string[]; negative?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-lg leading-snug text-ink/85">
          <span aria-hidden className={`mt-[0.7em] h-[1.5px] w-4 shrink-0 ${negative ? "bg-ink/35" : "bg-accent"}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}
