import { getAllInsights } from "@/lib/insights";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/CtaBand";
import { DevNote } from "@/components/DevNote";
import { InsightsLibrary } from "@/components/InsightsLibrary";
import { PageIntro } from "@/components/PageIntro";

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Practical articles and videos on marketing, AI and automation, business growth, consumer psychology and execution — by Kiishann Mullani.",
  path: "/insights",
});

export default function InsightsPage() {
  const insights = getAllInsights();
  const drafts = insights.filter((i) => i.status === "draft").length;

  return (
    <>
      <PageIntro
        index="01"
        label="Insights"
        title="Practical thinking on marketing, AI, growth and execution."
        intro={
          <p>
            Articles, frameworks and videos for owners, marketers and anyone who wants to make better decisions. Filter
            by topic or search for something specific.
          </p>
        }
      />
      <section className="wrap pb-24 md:pb-32" aria-label="Insights library">
        {drafts > 0 && site.showDraftContent && (
          <DevNote className="mb-6">
            {drafts} of {insights.length} pieces are drafts awaiting Kiishann&apos;s review. Drafts are labelled on the
            site and marked noindex. Set site.config.ts → showDraftContent to false to hide them before launch.
          </DevNote>
        )}
        <InsightsLibrary insights={insights} />
      </section>
      <CtaBand
        title="Reading about a problem you're living with?"
        text="Articles can only go so far. If you'd like to think through your own situation, start a conversation."
      />
    </>
  );
}
