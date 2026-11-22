import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { DevNote } from "@/components/DevNote";

export const metadata = pageMetadata({
  title: "Privacy",
  description: `How ${site.name}'s website handles personal information submitted through forms and collected through analytics.`,
  path: "/privacy",
});

const updated = "22 November 2026";

export default function PrivacyPage() {
  return (
    <section className="wrap pb-24 pt-14 md:pb-32 md:pt-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="kicker text-muted">Legal</p>
          <h1 className="display-xl mt-6">Privacy</h1>
          <p className="kicker mt-6 text-muted">Last updated {updated}</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="mb-10 border-l-2 border-accent bg-accent/10 p-4 text-[0.95rem] text-ink/85" role="note">
            This notice is a plain-language starting point and is awaiting review. It should be checked against
            applicable law — including India&apos;s Digital Personal Data Protection Act, 2023 — before public launch.
          </p>
          <DevNote className="mb-10">
            Have this page reviewed by a qualified adviser. Update it if you enable analytics, a newsletter or a booking
            tool, and name the actual providers used.
          </DevNote>
          <div className="prose-km">
            <h2>Who this covers</h2>
            <p>
              This notice explains how personal information is handled on {site.name}&apos;s personal website. It does
              not cover other websites linked from here, which have their own policies.
            </p>
            <h2>What is collected</h2>
            <ul>
              <li>
                <strong>Enquiries.</strong> When you use the contact form, you share your name, email address,
                organisation (optional), enquiry type and message.
              </li>
              <li>
                <strong>Analytics.</strong> This website uses Google Analytics 4 to understand how it is used — for
                example which pages are viewed, how visitors arrived, their device and browser type, and their
                approximate location (country or city). Google Analytics sets cookies to do this. You can opt out with
                Google&apos;s{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                  Analytics opt-out browser add-on
                </a>{" "}
                or by blocking cookies in your browser.
              </li>
            </ul>
            <h2>How it is used</h2>
            <p>
              Enquiry details are used only to read and reply to your message and to follow up on the conversation you
              started. They are not sold, and they are not added to any mailing list without your separate consent.
            </p>
            <h2>Service providers</h2>
            <p>
              The website uses trusted providers that process data on the site owner&apos;s behalf: GoDaddy (website
              hosting), Resend (delivering contact-form messages by email, once enabled) and Google Analytics (measuring
              site usage).
            </p>
            <h2>How long it is kept</h2>
            <p>
              Enquiries are kept for as long as needed to respond and to maintain a record of the conversation, and are
              then deleted. [Retention period to be confirmed.]
            </p>
            <h2>Your choices</h2>
            <p>
              You can ask to see, correct or delete the personal information you have shared, or withdraw consent, by
              getting in touch through the contact page.
            </p>
            <h2>Changes</h2>
            <p>This notice may be updated as the website changes. The date at the top shows the latest version.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
