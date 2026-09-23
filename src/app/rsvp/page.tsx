import type { Metadata } from "next";
import { ClientPageFrame } from "@/client/components";
import { clientConfig } from "@/client/client.config";
import { ClientRsvpPage } from "@/client/rsvp";
import { loadPublicEvent } from "@/app/public-event-loader";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  buildPageDescription,
  buildPageTitle,
  getDynamicSiteOrigin,
  safePublicCanonicalUrl,
} from "@/lib/metadata";
import { type PreviewQuery } from "@/lib/preview-context";

type PageProps = {
  searchParams?: Promise<PreviewQuery>;
};

export async function generateMetadata({ searchParams }: PageProps = {}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const result = await loadPublicEvent(resolvedSearchParams);

  if (result.status !== "available") {
    return {
      title: "RSVP | Event Unavailable",
      description: "This event RSVP page is not currently available.",
    };
  }

  const apiPublicUrl = safePublicCanonicalUrl(
    result.status === "available" ? result.event.publicUrl : undefined
  );
  const dynamicOrigin = await getDynamicSiteOrigin();
  const activeBaseUrl = apiPublicUrl || dynamicOrigin;

  const shouldNoIndex =
    result.event.previewMode === "dashboard" || result.event.raw.visibility === "private";

  const title = `RSVP | ${buildPageTitle(result.event)}`;
  const description = buildPageDescription(result.event);

  return {
    metadataBase: new URL(activeBaseUrl),
    title,
    description,
    alternates: shouldNoIndex ? undefined : { canonical: `${activeBaseUrl}/rsvp` },
    robots: shouldNoIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: `${activeBaseUrl}/rsvp`,
      type: "website",
      siteName: "WebSerbisyo RSVP",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function RsvpPage({ searchParams }: PageProps) {
  const result = await loadPublicEvent(await searchParams);

  if (result.status === "setup_error") {
    return <EmptyState title="Website setup required" message={result.message} />;
  }

  if (result.status !== "available") {
    return <EmptyState title="Event unavailable" message={result.message} />;
  }

  return (
    <ClientPageFrame config={clientConfig} event={result.event}>
      <ClientRsvpPage config={clientConfig} event={result.event} />
    </ClientPageFrame>
  );
}
