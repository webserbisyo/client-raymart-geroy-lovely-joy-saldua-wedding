import type { EventWebsiteRenderModel } from "@/types/public-event";
import { headers } from "next/headers";

/**
 * Static/build-time origin fallback.
 * Safe for synchronous callers like root layout.tsx static metadata.
 */
export function getSiteBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

/**
 * Dynamic request-time origin resolver.
 * Inspects incoming proxy headers (x-forwarded-host) to detect custom subdomains on the fly.
 */
export async function getDynamicSiteOrigin(): Promise<string> {
  // 1. Explicit env override if intentionally set
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }

  // 2. Dynamic host detection from proxy/request headers
  try {
    const hdrs = await headers();
    const forwardedHost = hdrs.get("x-forwarded-host");
    const host = forwardedHost || hdrs.get("host");
    const proto = hdrs.get("x-forwarded-proto") || "https";

    if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
      return `${proto}://${host}`;
    }
  } catch {
    // headers() can throw in static generation contexts; fall through to system env
  }

  // 3. Fallback to Vercel automated system variables
  return getSiteBaseUrl();
}

/**
 * Backward-compatible alias for existing consumers.
 */
export const getSiteUrl = getDynamicSiteOrigin;

export function safePublicCanonicalUrl(candidate?: string | null): string | undefined {
  if (!candidate || typeof candidate !== "string") return undefined;
  const trimmed = candidate.trim().replace(/\/+$/, "");
  if (!trimmed) return undefined;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();

    // 1. Reject localhost, loopback, and LAN IP dev origins
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host.endsWith(".vercel.app") ||
      host.startsWith("192.168.") ||
      host.startsWith("10.") ||
      /^172\.(1[6-9]|2[0-9]|3[01])\./.test(host)
    ) {
      return undefined;
    }

    // 2. Allow client wedding subdomains (*.rsvp.webserbisyo.com)
    if (host.endsWith(".rsvp.webserbisyo.com") && host !== "rsvp.webserbisyo.com") {
      return trimmed;
    }

    // 3. Reject central platform root domains
    if (
      host === "rsvp.webserbisyo.com" ||
      host === "webserbisyo.com" ||
      host.endsWith(".webserbisyo.com")
    ) {
      return undefined;
    }

    // Allow custom subdomains and production hosts
    return trimmed;
  } catch {
    return undefined;
  }
}

export function getMetadataBase(): URL {
  return new URL(getSiteBaseUrl());
}

export function buildPageTitle(event?: EventWebsiteRenderModel): string {
  const displayName = event?.coupleDisplayName || event?.title;
  return displayName ? `${displayName} | Wedding Invitation` : "Wedding Invitation";
}

export function buildPageDescription(event?: EventWebsiteRenderModel): string {
  const displayName = event?.coupleDisplayName || event?.title;
  if (!displayName) {
    return "Join us as we celebrate our wedding. View event details and RSVP online.";
  }
  return `Join ${displayName} as they celebrate their wedding. View event details and RSVP online.`;
}

