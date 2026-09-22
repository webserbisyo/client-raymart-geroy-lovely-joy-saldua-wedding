"use client";

/**
 * AttireSection
 *
 * Dress code and color motif display.
 */

import Image from "next/image";
import { SectionHeading } from "@/client/components/SectionHeading";
import { AnimatedContent } from "@/client/libs/reactbits";
import { AttireColorSwatch } from "@/client/components/attire/AttireColorSwatch";
import { clientConfig } from "@/client/client.config";
import type { ClientAttireData } from "@/client/types/client-view-model";
import type { SectionSurface } from "@/client/client-section-registry";
import { WeddingDecoration } from "@/client/components/decorations/WeddingDecoration";

type AttireSectionProps = {
  attireDressCode: ClientAttireData;
  surface: SectionSurface;
};

export function AttireSection({
  attireDressCode,
  surface,
}: AttireSectionProps) {
  if (!attireDressCode) return null;

  // Complete cut-off intro text if present
  let displayIntro = attireDressCode.sectionIntro || "";
  if (displayIntro.trim().endsWith("reserved for")) {
    displayIntro = `${displayIntro.trim()} the bride.`;
  }

  // Retrieve client-local attire configuration
  const attireConfig = (
    clientConfig.sections as {
      attire?: {
        illustration?: {
          src: string;
          alt: string;
          width: number;
          height: number;
        };
        palette?: Array<{ label: string; color: string }>;
      };
    }
  )?.attire;

  const illustration = attireConfig?.illustration;
  const configuredPalette = attireConfig?.palette;
  const palette =
    configuredPalette && configuredPalette.length > 0
      ? configuredPalette
      : undefined;

  // Clean up trailing truncated text if present
  let displayDressCodeNote = attireDressCode.dressCodeNote?.trim() || "";
  if (displayDressCodeNote.endsWith("for all g")) {
    displayDressCodeNote = displayDressCodeNote.replace(/for all g$/, "for all guests.");
  }

  const hasPalette = Boolean(palette && palette.length > 0);
  const hasDressCodeNote = Boolean(displayDressCodeNote);
  const hasColorMotifNote = Boolean(attireDressCode.colorMotifNote?.trim());
  const shouldRenderCard = hasDressCodeNote || hasPalette || hasColorMotifNote;

  return (
    <section
      id="attire"
      data-tone={surface}
      className="wedding-section pt-24 pb-28 md:pb-32 px-4 relative overflow-x-clip"
    >
      {/* Content Layer (z-30) */}
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-30">
        {/* Heading */}
        <SectionHeading
          label="Dress Code"
          title={attireDressCode.title || "Attire"}
          subtitle={attireDressCode.shortNote}
        />

        {/* Four-Model Fashion Illustration */}
        {illustration && illustration.src && (
          <div className="w-full max-w-[760px] md:max-w-[900px] mt-4 mb-6 sm:mt-6 sm:mb-8 px-2 flex justify-center">
            <Image
              src={illustration.src}
              alt={illustration.alt}
              width={illustration.width}
              height={illustration.height}
              sizes="(max-width: 768px) calc(100vw - 32px), 900px"
              className="h-auto w-full object-contain select-none pointer-events-none"
            />
          </div>
        )}

        {/* Standalone Guideline Paragraph */}
        {displayIntro && (
          <p className="text-[#34483B] text-center text-sm md:text-base leading-relaxed max-w-2xl mt-0 mb-8 sm:mb-10 px-4 relative z-10 transition-opacity duration-300 font-medium">
            {displayIntro}
          </p>
        )}

        {/* Compact Warm Ivory Dress Code Card */}
        {shouldRenderCard && (
          <AnimatedContent className="w-full max-w-2xl mx-auto">
            <div className="relative overflow-visible">
              <div className="w-full relative z-10 overflow-hidden wedding-paper-card bg-white border border-[#B8C7BD] p-5 sm:p-8 rounded-3xl text-center">
                {/* Dress Code Title / Note */}
                {hasDressCodeNote && (
                  <h3 className="relative z-20 font-serif text-xl sm:text-2xl md:text-3xl text-[#1B2B22] font-bold mb-2 whitespace-pre-line leading-snug">
                    {displayDressCodeNote}
                  </h3>
                )}

                {/* Color Motif & Ninong / Ninang Guidance Note */}
                {hasColorMotifNote && (
                  <div className="relative z-20 my-4 px-4 py-4 rounded-2xl bg-[#FAF7F2] border border-[#B8C7BD]/50 text-center">
                    <p className="text-[#C5A059] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold mb-2">
                      SPONSORS &amp; ATTIRE GUIDELINES
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-[#1B2B22] whitespace-pre-line leading-[1.7] max-w-lg mx-auto font-sans font-medium">
                      {attireDressCode.colorMotifNote}
                    </p>
                  </div>
                )}

                {/* Swatches Block */}
                {hasPalette && palette && (
                  <>
                    {/* Clean Category Subtitle */}
                    <p className="relative z-20 text-[#C5A059] text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-3 mt-2">
                      SUGGESTED GUEST COLORS
                    </p>

                    {/* Subtle Divider */}
                    <div className="h-px w-16 sm:w-20 bg-[#B8C7BD]/60 mx-auto mb-4" />

                    {/* Color Palette Swatches (One horizontal row of equal columns) */}
                    <div className="relative z-20 grid grid-cols-5 gap-1 sm:gap-3 w-full max-w-xl mx-auto items-start">
                      {palette.map((item) => (
                        <AttireColorSwatch
                          key={item.label}
                          label={item.label}
                          color={item.color}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Paired top-corner framing: top-left sprig + top-right sprig */}
              <WeddingDecoration
                family="frame-corner"
                orientation="left"
                position="top-left"
                size="small"
                tone="light"
                placementMode="edge-overlap"
                className="wedding-decoration--target-attire"
              />
              <WeddingDecoration
                family="frame-corner"
                orientation="right"
                position="top-right"
                size="small"
                tone="light"
                placementMode="edge-overlap"
                className="wedding-decoration--target-attire"
              />
            </div>
          </AnimatedContent>
        )}
      </div>
    </section>
  );
}
