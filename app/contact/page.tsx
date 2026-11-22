import { site } from "@/site.config";
import { activeSocials, contactFormConfigured, visibleVentures } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { DevNote } from "@/components/DevNote";
import { SectionLabel } from "@/components/SectionLabel";

// Read contact-form credentials at request time, so adding them in the host's
// secrets panel turns the form on without a rebuild.
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Kiishann Mullani about business growth and advisory work, speaking and workshops, brand collaborations or anything else.",
  path: "/contact",
});

const reasons = [
  {
    title: "Business growth & advisory",
    text: "A growth challenge, a strategy question or an engagement you'd like to explore.",
  },
  { title: "Speaking & workshops", text: "Podcasts, panels, talks and hands-on sessions for teams and communities." },
  { title: "Brand collaboration", text: "Partnerships relevant to people interested in marketing, AI and growth." },
  { title: "General", text: "A question, a thought on something I wrote, or a hello." },
];

export default function ContactPage() {
  return (
    <>
      <section className="wrap pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel index="01">Contact</SectionLabel>
            <h1 className="display-xl mt-8">Let&apos;s talk.</h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/80 md:text-xl">
              Tell me a little about what you&apos;re working on. I read every message personally and reply as soon as I
              can.
            </p>

            <ul className="mt-12 border-t border-ink/15">
              {reasons.map((r) => (
                <li key={r.title} className="border-b border-ink/15 py-5">
                  <p className="font-medium">{r.title}</p>
                  <p className="mt-1 text-[0.95rem] text-ink/70">{r.text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 space-y-6">
              {site.contact.bookingUrl && (
                <p>
                  <span className="kicker block text-muted">Prefer to book directly?</span>
                  <a
                    href={site.contact.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-lg font-medium underline underline-offset-4"
                  >
                    Book a call<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              )}
              {site.contact.email && (
                <p>
                  <span className="kicker block text-muted">Email</span>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="mt-2 inline-block break-all text-lg font-medium underline underline-offset-4"
                  >
                    {site.contact.email}
                  </a>
                </p>
              )}
              {activeSocials.length > 0 && (
                <div>
                  <span className="kicker block text-muted">Elsewhere</span>
                  <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {activeSocials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className="link-underline font-medium"
                        >
                          {s.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {visibleVentures
                .filter((v) => v.primary)
                .map((v) => (
                  <p key={v.name}>
                    <span className="kicker block text-muted">Consulting practice</span>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-2 inline-block text-lg font-medium"
                    >
                      {v.name} ↗<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                ))}
              <DevNote>
                Add a public email, booking link and social URLs in site.config.ts → contact / socials. Connect the form
                by setting RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL (see README).
              </DevNote>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-ink/10 bg-white/70 p-6 sm:p-10">
              <ContactForm
                configured={contactFormConfigured}
                fallbackUrl={site.contact.fallbackEnquiryUrl}
                fallbackLabel={site.contact.fallbackEnquiryLabel}
                email={site.contact.email || undefined}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
