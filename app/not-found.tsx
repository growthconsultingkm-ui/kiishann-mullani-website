import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col justify-center py-24">
      <p className="kicker text-accent-deep">404</p>
      <h1 className="display-xl mt-6 max-w-[16ch]">This page took a wrong turn.</h1>
      <p className="mt-6 max-w-lg text-lg text-ink/75">
        The page you were looking for doesn&apos;t exist or has moved. Here are better places to start.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/insights" variant="secondary">
          Explore insights
        </ButtonLink>
      </div>
    </section>
  );
}
