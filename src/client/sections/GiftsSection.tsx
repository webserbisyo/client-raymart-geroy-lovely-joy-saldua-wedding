"use client";

/**
 * GiftsSection
 *
 * Gift registry section with elegant glassmorphism cards,
 * solid white QR plates to guarantee phone scan contrast, and
 * romantic beach floral corner framing (16.png and 17.png) at z-0.
 */

import { SectionHeading } from "@/client/components/SectionHeading";
import { AnimatedContent } from "@/client/libs/reactbits";
import type { ClientGiftOption } from "@/client/types/client-view-model";
import type { SectionSurface } from "@/client/client-section-registry";
import { WeddingDecoration } from "@/client/components/decorations/WeddingDecoration";

import { WeddingButton } from "@/client/components/ui/WeddingButton";

type GiftsSectionProps = {
  giftDetails: {
    sectionIntro?: string;
    giftNote?: string;
    options: ClientGiftOption[];
  };
  surface: SectionSurface;
};

export function GiftsSection({ giftDetails, surface }: GiftsSectionProps) {
  if (!giftDetails) return null;

  const validOptions = (giftDetails.options || []).filter(
    (opt) =>
      Boolean(
        opt.image?.url ||
          opt.linkUrl ||
          opt.description ||
          (opt.title && opt.title.trim() !== "" && opt.title.trim() !== "."),
      ),
  );
  const hasOptions = validOptions.length > 0;
  const hasIntro = !!giftDetails.sectionIntro;
  const hasNote = !!giftDetails.giftNote;

  // If there is no content at all, hide the section entirely
  if (!hasOptions && !hasIntro && !hasNote) return null;

  return (
    <section
      id="gifts"
      data-tone={surface}
      className="wedding-section relative overflow-x-clip py-24 px-4"
    >
      <div className="relative z-30 max-w-5xl mx-auto">
        <SectionHeading label="Gifts" title="Gift Registry" />

        <AnimatedContent>
          {giftDetails.sectionIntro && (
            <p className="mt-5 mx-auto max-w-xl text-center font-serif text-xl md:text-2xl font-medium leading-relaxed text-cocoa text-balance">
              {giftDetails.sectionIntro}
            </p>
          )}

          {giftDetails.giftNote && (
            <p className="mt-8 md:mt-10 mx-auto max-w-2xl text-center text-base md:text-lg leading-relaxed text-[#34483B] font-medium text-balance">
              {giftDetails.giftNote}
            </p>
          )}

          {hasOptions && (
            <div
              className={
                validOptions.length === 1
                  ? "flex justify-center mt-12 w-full"
                  : "grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 w-full"
              }
            >
              {validOptions.map((opt, i) => (
                <div
                  key={i}
                  className={
                    validOptions.length === 1
                      ? "max-w-md w-full"
                      : "w-full"
                  }
                >
                  <div className="relative overflow-visible">
                    <div className="wedding-paper-card bg-white border border-[#B8C7BD] rounded-3xl p-7 sm:p-8 text-center relative z-10 flex flex-col justify-between h-full">
                      {/* Top Section — Text details */}
                      <div className="mb-6 relative z-20">
                        <h4 className="font-serif text-xl md:text-2xl text-[#1B2B22] font-bold mb-2">
                          {opt.title}
                        </h4>
                        {opt.description && (
                          <p className="text-[#34483B] text-sm max-w-xs mx-auto text-balance font-medium">
                            {opt.description}
                          </p>
                        )}
                      </div>

                      {/* Bottom Section — Functional QR plate and actions */}
                      <div className="flex flex-col items-center justify-end mt-auto relative z-20">
                        {opt.image?.url && (
                          <div className="w-full">
                            {/* Solid White QR Plate for phone scan contrast */}
                            <div className="bg-white border border-[#B8C7BD] rounded-2xl p-4 shadow-sm flex items-center justify-center mx-auto w-full max-w-[260px]">
                              <img
                                src={opt.image.url}
                                alt={opt.image.alt || opt.title}
                                decoding="async"
                                className="w-full max-w-[220px] h-auto object-contain pointer-events-none select-none opacity-100"
                              />
                            </div>
                            <p className="mt-4 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#34483B] font-bold select-none">
                              SCAN TO SEND YOUR GIFT
                            </p>
                          </div>
                        )}

                        {opt.linkUrl && (
                          <div className="mt-4">
                            <WeddingButton asChild variant="ghost" size="sm">
                              <a
                                href={opt.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {opt.linkLabel || "View Details"} ✦
                              </a>
                            </WeddingButton>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Top-left native sprig */}
                    <WeddingDecoration
                      family="frame-corner"
                      orientation="left"
                      position="top-left"
                      size="small"
                      tone="light"
                      placementMode="edge-overlap"
                      className="wedding-decoration--target-gifts"
                    />
                    {/* Top-right native sprig */}
                    <WeddingDecoration
                      family="frame-corner"
                      orientation="right"
                      position="top-right"
                      size="small"
                      tone="light"
                      placementMode="edge-overlap"
                      className="wedding-decoration--target-gifts"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatedContent>
      </div>
    </section>
  );
}
