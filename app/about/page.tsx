import { site, type Photo } from "@/site.config";
import { isDev } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/CtaBand";
import { DevNote } from "@/components/DevNote";
import { PageIntro } from "@/components/PageIntro";
import { Portrait } from "@/components/Portrait";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Kiishann Mullani works where marketing, business, technology and human behaviour meet — helping businesses grow with clearer strategy and stronger execution.",
  path: "/about",
});

const intersection = [
  {
    word: "Marketing",
    text: "How a business is understood, chosen and remembered. Positioning, message, channels and creative — judged by whether they change behaviour.",
  },
  {
    word: "Business",
    text: "The engine underneath: the offer, the economics, the systems and the team. Marketing can't outrun a business model that doesn't work.",
  },
  {
    word: "Technology",
    text: "AI and automation as practical leverage — fewer hours on repetitive work, better information for decisions — not as a new layer of complexity.",
  },
  {
    word: "Behaviour",
    text: "Why customers decide the way they do, and why teams act the way they do. Most strategy succeeds or fails on human behaviour.",
  },
];

const principles = [
  {
    title: "Clarity before activity",
    text: "Doing more is easy. Knowing what to do — and what to stop — is where the value is. I'd rather spend a week getting the question right than a quarter executing the wrong answer.",
  },
  {
    title: "Strategy before tactics",
    text: "Channels, tools and trends change constantly. A clear position, a clear customer and a clear offer don't. Tactics should be chosen by the strategy, not the other way round.",
  },
  {
    title: "Usefulness over noise",
    text: "Whether it's a plan, a piece of content or a recommendation, the test is the same: does it help someone make a better decision or take a better action?",
  },
  {
    title: "Systems over random effort",
    text: "Bursts of motivation fade. Repeatable systems — for marketing, sales, operations and personal work — are what compound over time.",
  },
  {
    title: "Experiment, then learn",
    text: "Treat plans as hypotheses. Test small, measure honestly, keep what works and let go of what doesn't — including your own favourite ideas.",
  },
];

const gallery: { key: keyof typeof site.photos; slot: string; ratio: "portrait" | "landscape" | "square" | "tall" }[] =
  [
    { key: "working", slot: "seated / working portrait", ratio: "tall" },
    { key: "candid", slot: "candid thinking or writing", ratio: "square" },
    { key: "creator", slot: "direct-to-camera creator shot", ratio: "tall" },
    { key: "detail", slot: "desk / notebook detail", ratio: "square" },
    { key: "monochrome", slot: "monochrome editorial portrait (optional)", ratio: "tall" },
  ];

export default function AboutPage() {
  const photos = gallery.filter((g) => isDev || (site.photos[g.key] as Photo).src.trim() !== "");

  return (
    <>
      <PageIntro
        index="01"
        label="About"
        title={
          <>
            I work where strategy, marketing, technology and <span className="text-accent-deep">human behaviour</span>{" "}
            meet.
          </>
        }
      />

      <section className="wrap pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Portrait
              photo={site.photos.heroVertical}
              slot="about portrait, vertical 4:5"
              ratio="portrait"
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              caption={`${site.name} — ${site.role}`}
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel index="02">Introduction</SectionLabel>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/85 md:text-xl">
              {site.about.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-2xl leading-snug text-ink md:text-[1.7rem]" : ""}>
                  {p}
                </p>
              ))}
            </div>
            <DevNote className="mt-8">
              Introduction copy is a draft for Kiishann to approve. Edit it in site.config.ts → about.intro. Add any
              role history you want public in about.experience.
            </DevNote>
            {site.about.experience.length > 0 && (
              <dl className="mt-10 border-t border-ink/15">
                {site.about.experience.map((e) => (
                  <div
                    key={`${e.title}-${e.organisation}`}
                    className="grid gap-1 border-b border-ink/15 py-4 sm:grid-cols-3"
                  >
                    <dt className="kicker text-muted">{e.period}</dt>
                    <dd className="sm:col-span-2">
                      <span className="font-medium">{e.title}</span>, {e.organisation}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* Intersection */}
      <section className="on-dark bg-ink text-paper" aria-labelledby="intersection-title">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="03" tone="dark">
                The intersection
              </SectionLabel>
            </div>
            <div className="lg:col-span-9">
              <h2 id="intersection-title" className="display-lg max-w-[20ch]" data-reveal>
                Growth problems rarely live in one department.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">
                The most useful insights usually sit between disciplines — where a marketing question turns out to be an
                offer question, or a sales problem turns out to be a behaviour problem. That&apos;s where I like to
                work.
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-px bg-paper/15 sm:grid-cols-2">
            {intersection.map((item, i) => (
              <div
                key={item.word}
                className="bg-ink py-10 sm:p-10 sm:first:pl-0 sm:[&:nth-child(3)]:pl-0"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <p className="kicker text-accent">0{i + 1}</p>
                <h3 className="display-lg mt-5">{item.word}</h3>
                <p className="mt-5 max-w-md leading-relaxed text-paper/75">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="04">How I think</SectionLabel>
            </div>
            <h2 id="principles-title" className="display-lg max-w-[18ch] lg:col-span-9" data-reveal>
              Five principles I try to work by.
            </h2>
          </div>
          <ol className="mt-14 border-b border-ink/15 md:mt-20">
            {principles.map((p, i) => (
              <li key={p.title} className="grid gap-4 border-t border-ink/15 py-9 md:grid-cols-12 md:gap-8" data-reveal>
                <span className="kicker text-accent-deep md:col-span-1 md:pt-3">0{i + 1}</span>
                <h3 className="display-md md:col-span-5">{p.title}</h3>
                <p className="max-w-xl text-lg leading-relaxed text-ink/75 md:col-span-6">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      {photos.length > 0 && (
        <section className="border-t border-ink/10" aria-labelledby="gallery-title">
          <div className="wrap py-24 md:py-32">
            <SectionLabel index="05">Behind the work</SectionLabel>
            <h2 id="gallery-title" className="sr-only">
              Photographs
            </h2>
            <DevNote className="mt-6">
              Gallery slots stay hidden in production until real photographs are added in site.config.ts → photos.
            </DevNote>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
              {photos.map((g, i) => (
                <Portrait
                  key={g.key}
                  photo={site.photos[g.key] as Photo}
                  slot={g.slot}
                  ratio={g.ratio}
                  variant={i % 2 ? "stone" : "ink"}
                  sizes="(min-width: 768px) 30vw, 50vw"
                  className={
                    [
                      "md:col-span-4",
                      "md:col-span-3 md:mt-24",
                      "md:col-span-5",
                      "md:col-span-4 md:col-start-2",
                      "md:col-span-4 md:col-start-7 md:-mt-24",
                    ][i] ?? "md:col-span-4"
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Start with the thinking, or start with a conversation."
        text="Read how I approach marketing, AI and growth — or tell me about the challenge in front of your business."
        secondary={{ label: "Explore insights", href: "/insights" }}
      />
    </>
  );
}
