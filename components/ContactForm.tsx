"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { enquiryTypes, type EnquiryType } from "@/site.config";

type Props = {
  configured: boolean;
  fallbackUrl: string;
  fallbackLabel: string;
  email?: string;
};

type Fields = {
  name: string;
  email: string;
  organisation: string;
  type: EnquiryType | "";
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.type) e.type = "Please choose what your enquiry is about.";
  if (f.message.trim().length < 20) e.message = "Please share a little more detail (at least 20 characters).";
  if (f.message.length > 5000) e.message = "Please keep your message under 5,000 characters.";
  if (!f.consent) e.consent = "Please confirm you're happy for your details to be used to reply.";
  return e;
}

export function ContactForm({ configured, fallbackUrl, fallbackLabel, email }: Props) {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    organisation: "",
    type: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStartedAt(Date.now());
    const t = new URLSearchParams(window.location.search).get("type");
    if (t && enquiryTypes.some((x) => x.value === t)) {
      setFields((f) => ({ ...f, type: t as EnquiryType }));
    }
  }, []);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onBlur = (key: keyof Fields) => {
    const e = validate(fields);
    setErrors((prev) => ({ ...prev, [key]: e[key] }));
  };

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    if (Object.values(e).some(Boolean)) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    if (!configured) return;
    setStatus("submitting");
    setServerMessage("");
    try {
      const form = new FormData(ev.currentTarget);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          website: String(form.get("website") ?? ""),
          startedAt,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        requestAnimationFrame(() => resultRef.current?.focus());
      } else {
        setStatus("error");
        setServerMessage(data.error ?? "Something went wrong while sending. Please try again.");
        requestAnimationFrame(() => resultRef.current?.focus());
      }
    } catch {
      setStatus("error");
      setServerMessage("We couldn't reach the server. Please check your connection and try again.");
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} className="border border-ink/15 bg-white/70 p-8 md:p-10" role="status">
        <CheckCircle2 className="size-8 text-accent-deep" aria-hidden />
        <h2 className="display-md mt-6">Thank you — your message is on its way.</h2>
        <p className="mt-4 max-w-lg text-ink/75">
          I read every enquiry personally and will reply to {fields.email} as soon as I can.
        </p>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => Boolean(v)) as [keyof Fields, string][];
  const fieldCls = (key: keyof Fields) =>
    `mt-2 block w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-lg text-ink placeholder:text-ink/35 focus:outline-none focus-visible:outline-none focus:ring-0 ${
      errors[key] ? "border-accent-deep" : "border-ink/30 focus:border-ink"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={configured ? undefined : "form-status-note"}>
      {!configured && (
        <div
          id="form-status-note"
          className="mb-10 flex gap-4 border border-accent-deep/40 bg-accent/10 p-5"
          role="note"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-accent-deep" aria-hidden />
          <div className="text-[0.95rem] leading-relaxed text-ink/85">
            <p className="font-medium text-ink">This form is awaiting setup and can't send messages yet.</p>
            <p className="mt-1">
              {fallbackUrl ? (
                <>
                  Until it&apos;s connected, please use the{" "}
                  <a
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent-deep underline underline-offset-2"
                  >
                    {fallbackLabel}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  {email ? " or email " : "."}
                </>
              ) : email ? (
                <>Until it&apos;s connected, please email </>
              ) : (
                <>Please check back soon.</>
              )}
              {email ? (
                <>
                  <a href={`mailto:${email}`} className="font-medium text-accent-deep underline underline-offset-2">
                    {email}
                  </a>
                  .
                </>
              ) : null}
            </p>
          </div>
        </div>
      )}

      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          className="mb-8 border-l-2 border-accent-deep bg-accent/10 p-5"
          role="alert"
        >
          <p className="font-medium">
            Please check {errorList.length === 1 ? "one field" : `${errorList.length} fields`}:
          </p>
          <ul className="mt-2 list-inside list-disc text-[0.95rem] text-ink/85">
            {errorList.map(([key, msg]) => (
              <li key={key}>
                <a href={`#field-${key}`} className="underline underline-offset-2">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === "error" && (
        <div
          ref={resultRef}
          tabIndex={-1}
          className="mb-8 flex gap-3 border-l-2 border-accent-deep bg-accent/10 p-5"
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-accent-deep" aria-hidden />
          <p>{serverMessage}</p>
        </div>
      )}

      <fieldset>
        <legend className="kicker text-muted">What is this about?</legend>
        <div id="field-type" className="mt-4 grid gap-3 sm:grid-cols-2" tabIndex={-1}>
          {enquiryTypes.map((t) => {
            const checked = fields.type === t.value;
            return (
              <label
                key={t.value}
                className={`flex min-h-14 cursor-pointer items-center gap-3 border px-4 py-3 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-deep ${
                  checked ? "border-ink bg-ink text-paper" : "border-ink/20 bg-white/50 hover:border-ink"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={t.value}
                  checked={checked}
                  onChange={() => set("type", t.value)}
                  className="sr-only"
                  aria-describedby={errors.type ? "err-type" : undefined}
                />
                <span
                  aria-hidden
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${checked ? "border-accent" : "border-ink/40"}`}
                >
                  {checked && <span className="size-2 rounded-full bg-accent" />}
                </span>
                <span className="text-[0.95rem] font-medium">{t.label}</span>
              </label>
            );
          })}
        </div>
        {errors.type && (
          <p id="err-type" className="mt-2 text-sm text-accent-deep">
            {errors.type}
          </p>
        )}
      </fieldset>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="field-name"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => onBlur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-name" : undefined}
            required
            maxLength={100}
            className={fieldCls("name")}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => onBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "err-email" : undefined}
            required
            maxLength={200}
            className={fieldCls("email")}
          />
        </Field>
        <Field id="organisation" label="Organisation" optional error={errors.organisation} className="md:col-span-2">
          <input
            id="field-organisation"
            name="organisation"
            autoComplete="organization"
            value={fields.organisation}
            onChange={(e) => set("organisation", e.target.value)}
            maxLength={150}
            className={fieldCls("organisation")}
          />
        </Field>
        <Field
          id="message"
          label="Message"
          error={errors.message}
          className="md:col-span-2"
          hint="Where is the business today, and what would you like to change?"
        >
          <textarea
            id="field-message"
            name="message"
            rows={6}
            value={fields.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => onBlur("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={`hint-message${errors.message ? " err-message" : ""}`}
            required
            maxLength={5000}
            className={`${fieldCls("message")} resize-y`}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-10">
        <label
          id="field-consent"
          className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-ink/80"
        >
          <input
            type="checkbox"
            name="consent"
            checked={fields.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "err-consent" : undefined}
            className="mt-1 size-4 shrink-0 accent-[#0e1424]"
          />
          <span>
            I&apos;m happy for Kiishann to use these details to reply to my enquiry. See the{" "}
            <a href="/privacy" className="underline underline-offset-2">
              privacy notice
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="err-consent" className="mt-2 text-sm text-accent-deep">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={!configured || status === "submitting"}
          aria-disabled={!configured || status === "submitting"}
          className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-7 py-3 font-medium text-paper transition-colors hover:bg-ink-2 disabled:cursor-not-allowed disabled:bg-ink/40"
        >
          {status === "submitting" ? (
            <>
              Sending
              <Loader2 className="size-4 animate-spin" aria-hidden />
            </>
          ) : configured ? (
            <>
              Send enquiry
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </>
          ) : (
            "Form awaiting setup"
          )}
        </button>
        <p className="text-sm text-muted">No newsletters, no sharing — just a reply.</p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`field-${id}`} className="kicker text-muted">
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal text-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={`hint-${id}`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`err-${id}`} className="mt-2 text-sm text-accent-deep">
          {error}
        </p>
      )}
    </div>
  );
}
