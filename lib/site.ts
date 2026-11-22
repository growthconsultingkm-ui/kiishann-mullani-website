import { site } from "@/site.config";

/** Resolve the public site URL without ever inventing a domain. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  // Production fallback: the live domain (override with NEXT_PUBLIC_SITE_URL).
  return process.env.NODE_ENV === "production" ? "https://kmgrowth.in" : "http://localhost:3000";
}

export const isDev = process.env.NODE_ENV !== "production";

export function absoluteUrl(path = "/"): string {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export const activeSocials = site.socials.filter((s) => s.url.trim() !== "");

export const visibleVentures = site.ventures.filter((v) => v.show);

/**
 * Contact-form delivery settings. Only RESEND_API_KEY is required:
 * - Enquiries go to CONTACT_TO_EMAIL, or the public email in site.config.ts.
 * - The sender defaults to Resend's shared address, which delivers only to the
 *   email the Resend account was created with — so sign up to Resend with the
 *   same Gmail address. Once kmgrowth.in is verified in Resend, set
 *   CONTACT_FROM_EMAIL (e.g. "KM Growth <hello@kmgrowth.in>") for better deliverability.
 */
export function getContactDelivery() {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "KM Growth Website <onboarding@resend.dev>";
  return { apiKey, to, from, configured: Boolean(apiKey && to) };
}

export const contactFormConfigured = getContactDelivery().configured;

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
