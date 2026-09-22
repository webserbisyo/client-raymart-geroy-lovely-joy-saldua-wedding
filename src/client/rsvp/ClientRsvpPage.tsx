import type { ClientConfig } from "@/client/client.config";
import { WeddingDecoration } from "@/client/components/decorations/WeddingDecoration";
import { ClientRsvpForm } from "@/client/rsvp/ClientRsvpForm";
import type { EventWebsiteRenderModel } from "@/types/public-event";

type ClientRsvpPageProps = {
  config: ClientConfig;
  event: EventWebsiteRenderModel;
};

export function ClientRsvpPage({ config, event }: ClientRsvpPageProps) {
  const coupleNames = event.coupleDisplayName || event.title || "";
  const delimiter = coupleNames.includes("❤️")
    ? "❤️"
    : coupleNames.includes("&")
      ? "&"
      : coupleNames.includes(" and ")
        ? " and "
        : null;

  const [groomName, brideName] = delimiter
    ? coupleNames.split(delimiter).map((s) => s.trim())
    : ["Raymart Geroy", "Lovely Joy"];

  const displayGroom = groomName || "Raymart Geroy";
  const displayBride = brideName || "Lovely Joy";

  return (
    <div className="wedding-rsvp-shell min-h-[100dvh] pt-28 pb-36 pb-[calc(9rem+env(safe-area-inset-bottom))] px-4 md:px-8 flex items-center justify-center relative overflow-hidden bg-[#DCE6E0]">
      <div className="wedding-rsvp-pattern" aria-hidden="true" />

      {/* 1. Subtle Botanical Ambient Highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(107,142,123,0.18)_0%,transparent_70%)] pointer-events-none -z-10 select-none"
        aria-hidden="true"
      />

      {/* 2. RSVP Card Wrapper */}
      <div className="relative z-10 w-full max-w-[620px] mx-auto px-4 my-8 sm:my-12 flex flex-col items-center">
        {/* 3. Pure White Linen Cardstock Container */}
        <div className="wedding-rsvp-card wedding-paper-card-elevated bg-white border border-[#A8BDB0] relative z-10 w-full p-6 sm:p-8 md:p-12 rounded-3xl flex flex-col items-center animate-fadeIn shadow-[0_12px_40px_rgba(35,56,45,0.12),0_2px_8px_rgba(35,56,45,0.06)]">
          <WeddingDecoration
            family="frame-corner"
            orientation="left"
            position="top-left"
            size="small"
            tone="light"
            placementMode="edge-overlap"
            className="wedding-decoration--target-rsvp"
          />
          <WeddingDecoration
            family="frame-corner"
            orientation="right"
            position="top-right"
            size="small"
            tone="light"
            placementMode="edge-overlap"
            className="wedding-decoration--target-rsvp"
          />
          <WeddingDecoration
            family="card-edge"
            orientation="left"
            position="bottom-left"
            size="small"
            tone="light"
            placementMode="edge-overlap"
            className="wedding-decoration--target-rsvp"
          />
          <WeddingDecoration
            family="card-edge"
            orientation="right"
            position="bottom-right"
            size="small"
            tone="light"
            placementMode="edge-overlap"
            className="wedding-decoration--target-rsvp"
          />

          <div className="wedding-rsvp-content relative z-20 w-full flex flex-col items-center">
            {/* Minimal Top Identity */}
            <div className="text-center mb-8 w-full">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#34483B] mb-2">
                Wedding RSVP
              </p>
              <h1 className="wedding-display wedding-page-title wedding-rsvp-couple-name text-[#1B2B22]">
                <div className="flex flex-col items-center justify-center text-center gap-1 sm:gap-1.5 mb-5 px-2">
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2421] tracking-tight leading-tight">
                    {displayGroom}
                  </span>
                  <span className="text-xl sm:text-2xl text-red-500 select-none py-0.5" aria-hidden="true">
                    ❤️
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2421] tracking-tight leading-tight">
                    {displayBride}
                  </span>
                </div>
              </h1>
              <div
                className="mt-4 flex w-full items-center justify-center select-none"
                aria-hidden="true"
              >
                <span className="h-px w-10 bg-[#B8C7BD]" />
                <span className="mx-2.5 text-xs text-[#C5A059]">
                  ✦
                </span>
                <span className="h-px w-10 bg-[#B8C7BD]" />
              </div>
            </div>

            {/* RSVP Form */}
            <div className="w-full">
              <ClientRsvpForm
                dedicatedPageEnabled={false}
                dedicatedPagePath={config.rsvp.dedicatedPagePath}
                event={event}
                mode="inline-form"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
