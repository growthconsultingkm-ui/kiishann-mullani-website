import { ButtonLink } from "./ButtonLink";

type Props = {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Closing call to action; sits directly above the footer on the dark ink. */
export function CtaBand({
  title = "Have a growth challenge worth thinking through?",
  text = "Tell me where the business is, where you want it to go and what seems to be in the way. I'll tell you honestly whether I can help.",
  primary = { label: "Discuss a growth challenge", href: "/contact?type=growth" },
  secondary = { label: "Invite me to speak or collaborate", href: "/speaking-collaborations" },
}: Props) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-paper" aria-labelledby="cta-title">
      <div className="wrap grid gap-10 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-9" data-reveal>
          <p className="kicker text-accent">Next step</p>
          <h2 id="cta-title" className="display-xl mt-6 max-w-[16ch]">
            {title}
          </h2>
        </div>
        <div
          className="flex flex-col justify-end gap-8 lg:col-span-3"
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
        >
          <p className="text-lg leading-relaxed text-paper/80">{text}</p>
          <div className="flex flex-col items-start gap-3">
            <ButtonLink href={primary.href} variant="accent">
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="ghost-light">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
