import { NextResponse } from "next/server";
import { enquiryTypes } from "@/site.config";
import { getContactDelivery } from "@/lib/site";

/**
 * Contact form endpoint.
 * - Validates and sanitises everything on the server.
 * - Spam protection: honeypot field, minimum fill time, per-IP rate limit.
 * - Delivers via Resend's REST API to the site's contact email (see
 *   getContactDelivery) once RESEND_API_KEY is set. Otherwise it answers 503
 *   "not configured" — it never pretends a message was sent.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // simple memory guard
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages in a short time. Please try again later." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot and timing checks: quietly accept so bots learn nothing.
  const startedAt = Number(body.startedAt ?? 0);
  if (clean(body.website, 200) !== "" || !startedAt || Date.now() - startedAt < 3000) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const organisation = clean(body.organisation, 150);
  const type = clean(body.type, 40);
  const message = clean(body.message, 5000);
  const consent = body.consent === true;

  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!EMAIL_RE.test(email)) errors.push("email");
  if (!enquiryTypes.some((t) => t.value === type)) errors.push("enquiry type");
  if (message.length < 20) errors.push("message");
  if (!consent) errors.push("consent");
  if (errors.length) {
    return NextResponse.json({ ok: false, error: `Please check: ${errors.join(", ")}.` }, { status: 422 });
  }

  const { apiKey, to, from, configured } = getContactDelivery();
  if (!configured) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        error: "The contact form isn't connected yet, so your message was not sent.",
      },
      { status: 503 },
    );
  }

  const typeLabel = enquiryTypes.find((t) => t.value === type)?.label ?? type;
  const text = [
    `New enquiry from the website`,
    ``,
    `Type: ${typeLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Organisation: ${organisation || "—"}`,
    ``,
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry — ${typeLabel} — ${name}`.slice(0, 150),
        text,
      }),
    });
    if (!res.ok) {
      console.error("Contact delivery failed", res.status, await res.text().catch(() => ""));
      return NextResponse.json(
        { ok: false, error: "Your message couldn't be delivered. Please try again shortly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Contact delivery error", err);
    return NextResponse.json(
      { ok: false, error: "Your message couldn't be delivered. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
