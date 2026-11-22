import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { DevNote } from "@/components/DevNote";
import { PageIntro } from "@/components/PageIntro";
import { SectionLabel } from "@/components/SectionLabel";
import architecture from "@/public/images/stock/architecture-diagonal.jpg";

export const metadata = pageMetadata({
  title: "Speaking & Collaborations",
  description:
    "Invite Kiishann Mullani to speak, run a workshop or join a podcast or panel on practical AI, marketing, consumer psychology and business growth.",
  path: "/speaking-collaborations",
});

const topics = [
  {
    title: "Practical AI for business and marketing teams",
    text: "Where AI genuinely saves time, where it doesn't, and how to adopt it without adding complexity. Grounded in real workflows rather than hype.",
    audience: "Marketing teams, business owners, industry associations",
  },
  {
    title: "Modern marketing and consumer psychology",
    text: "Why people notice, trust and choose — and how to build marketing around real buyer behaviour instead of whatever the latest channel trend is.",
    audience: "Marketers, founders, creative and brand teams",
  },
  {
    title: "Business growth and strategic clarity",
    text: "How to diagnose what's really holding a business back, prioritise ruthlessly and turn a strategy into consistent execution.",
    audience: "Founders, leadership teams, entrepreneur communities",
  },
  {
    title: "Creator-led personal branding",
    text: "Building a personal brand around useful expertise: what to share, where to share it, and how attention turns into trust and opportunity.",
    audience: "Professionals, consultants, student and early-career groups",
  },
];

const formats = [
  {
    name: "Podcasts",
    text: "Long-form conversations about growth, marketing, AI and the thinking behind good decisions.",
  },
  {
    name: "Panels",
    text: "A practical, grounded voice alongside other perspectives — happy to disagree constructively.",
  },
  { name: "Workshops", text: "Hands-on sessions where teams leave with a framework, a worked example and next steps." },
  {
    name: "Talks & events",
    text: "Focused talks tailored to your audience, from internal team sessions to community events.",
  },
  {
    name: "Brand partnerships",
    text: "Considered case by case, for products relevant to the audience. Sponsored content is always disclosed.",
  },
];

const checklist = [
  "The event, show or brand — and who the audience is",
  "Date, location or online format, and session length",
  "The topic or angle you have in mind",
  "Whether the opportunity is paid, and any budget",
];

export default function SpeakingPage() {
  return (
    <>
      <PageIntro
        index="01"
        label="Speaking & collaborations"
        title="Conversations about growth, marketing and practical AI."
        intro={
          <p>
            I&apos;m open to podcasts, panels, workshops, events and brand partnerships where the audience wants
            practical ideas they can use — not motivation for its own sake.
          </p>
        }
        aside={
          <Image
            src={architecture}
            alt="Abstract building facade forming a bright diagonal against a deep blue sky"
            placeholder="blur"
            priority
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="aspect-[4/5] w-full object-cover lg:-mt-4"
          />
        }
      />

      <section className="border-t border-ink/10" aria-labelledby="topics-title">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="02">Topics</SectionLabel>
            </div>
            <h2 id="topics-title" className="display-lg max-w-[18ch] lg:col-span-9" data-reveal>
              Four subjects I can speak about with depth.
            </h2>
          </div>
          <div className="mt-14 grid gap-px bg-ink/15 md:mt-20 md:grid-cols-2">
            {topics.map((t, i) => (
              <article
                key={t.title}
                className="bg-paper py-10 md:p-10 md:[&:nth-child(odd)]:pl-0"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <span className="kicker text-accent-deep">0{i + 1}</span>
                <h3 className="mt-5 text-[1.9rem] font-semibold leading-[1.1]">{t.title}</h3>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/75">{t.text}</p>
                <p className="mt-6 text-sm text-muted">
                  <span className="kicker mr-2 text-ink">Suits</span>
                  {t.audience}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark bg-ink text-paper" aria-labelledby="formats-title">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="03" tone="dark">
                Formats
              </SectionLabel>
            </div>
            <h2 id="formats-title" className="display-lg max-w-[18ch] lg:col-span-9" data-reveal>
              Ways we could work together.
            </h2>
          </div>
          <ul className="mt-14 border-b border-paper/15">
            {formats.map((f) => (
              <li
                key={f.name}
                className="grid gap-3 border-t border-paper/15 py-7 md:grid-cols-12 md:gap-8"
                data-reveal
              >
                <h3 className="display-md md:col-span-5">{f.name}</h3>
                <p className="max-w-xl text-lg leading-relaxed text-paper/75 md:col-span-7">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="enquire-title">
        <div className="wrap grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="04">Enquiries</SectionLabel>
            <h2 id="enquire-title" className="display-lg mt-6">
              What to include
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
              A few details up front make it much quicker to give you a clear yes or no.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="border-t border-ink/15">
              {checklist.map((c, i) => (
                <li key={c} className="flex gap-6 border-b border-ink/15 py-5 text-lg">
                  <span className="kicker pt-1.5 text-accent-deep">0{i + 1}</span>
                  {c}
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact?type=speaking">Invite me to speak</ButtonLink>
              <ButtonLink href="/contact?type=collaboration" variant="secondary">
                Propose a collaboration
              </ButtonLink>
            </div>
            <DevNote className="mt-8">
              Add past talks, podcast appearances or a media kit here only when they are real and approved.
            </DevNote>
          </div>
        </div>
      </section>

      <CtaBand
        title="Planning a session your audience will actually use?"
        text="Share the event, the audience and the date. I'll reply with whether it's a fit and how I'd approach it."
        primary={{ label: "Invite me to speak", href: "/contact?type=speaking" }}
        secondary={{ label: "Discuss a growth challenge", href: "/contact?type=growth" }}
      />
    </>
  );
}
