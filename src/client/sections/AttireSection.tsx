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

  // 1. Retrieve client-local attire configuration
  const attireConfig = (
    clientConfig.sections as {
      attire?: {
        sectionIntro?: string;
        dressCodeNote?: string;
        colorMotifNote?: string;
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

  // 2. Section Intro (data.sectionIntro)
  let displayIntro =
    attireDressCode?.sectionIntro?.trim() ||
    attireConfig?.sectionIntro?.trim() ||
    "We would love to see you dressed up in our wedding colors!";

  if (displayIntro.endsWith("reserved for")) {
    displayIntro = `${displayIntro} the bride.`;
  }

  // 3. Guest Dress Code Note (data.dressCodeNote)
  let displayDressCodeNote =
    attireDressCode?.dressCodeNote?.trim() ||
    attireConfig?.dressCodeNote?.trim() ||
    "Formal attire is preferred.\nLadies: Long gowns or formal dresses (strictly no pants).\nGentlemen: Black suit or Barong Tagalog.\nReminder: Strictly no shorts or t-shirts for all guests.";

  if (displayDressCodeNote.endsWith("for all g")) {
    displayDressCodeNote = displayDressCodeNote.replace(/for all g$/, "for all guests.");
  }

  // 4. Color Motif & Sponsor Note (data.colorMotifNote)
  const displayColorMotifNote =
    attireDressCode?.colorMotifNote?.trim() ||
    attireConfig?.colorMotifNote?.trim() ||
    "Ninong: Black suit or Barong Tagalog.\nNinang: Champagne gold long gown with sleeves.";

  const hasPalette = Boolean(palette && palette.length > 0);
  const hasDressCodeNote = Boolean(displayDressCodeNote);
  const hasColorMotifNote = Boolean(displayColorMotifNote);
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
          <div className="w-full max-w-[850px] mx-auto mt-4 mb-6 sm:mt-6 sm:mb-8 px-2 flex justify-center">
            <Image
              alt={illustration.alt}
              className="h-auto w-full object-contain pointer-events-none select-none"
              height={illustration.height}
              priority
              src={illustration.src}
              unoptimized={true}
              width={illustration.width}
            />
          </div>
        )}

        {/* Standalone Guideline Paragraph */}
        {displayIntro && (
          <p className="text-[#34483B] text-center text-sm md:text-base leading-relaxed max-w-2xl mt-0 mb-6 sm:mb-8 px-4 relative z-10 transition-opacity duration-300 font-medium">
            {displayIntro}
          </p>
        )}

        {/* Compact Warm Ivory Dress Code Card */}
        {shouldRenderCard && (
          <AnimatedContent className="w-full max-w-4xl mx-auto">
            <div className="relative overflow-visible">
              <div className="w-full relative z-10 overflow-hidden wedding-paper-card bg-white border border-[#B8C7BD] p-6 sm:p-8 rounded-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto text-left">
                  {/* Column 1 — Guest Dress Code */}
                  <div className="flex flex-col">
                    <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#3D604C] mb-2">
                      GUEST DRESS CODE
                    </h4>
                    <div className="text-sm sm:text-[15px] leading-relaxed text-[#1F2421] font-medium space-y-2 whitespace-pre-line">
                      {displayDressCodeNote.split("\n").map((line, idx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        const match = trimmed.match(/^([^:]+):\s*(.*)$/);
                        if (match) {
                          const isReminder = /^(reminder|please note|note)/i.test(match[1]);
                          return (
                            <p
                              key={idx}
                              className={
                                isReminder
                                  ? "text-xs sm:text-sm text-[#8A3A35] font-semibold mt-2 pt-1 border-t border-[#B8C7BD]/40"
                                  : ""
                              }
                            >
                              <strong className="font-semibold text-[#1B2B22]">{match[1]}:</strong>{" "}
                              {match[2]}
                            </p>
                          );
                        }
                        return <p key={idx}>{trimmed}</p>;
                      })}
                    </div>
                  </div>

                  {/* Column 2 — Principal Sponsors & Color Palette */}
                  <div className="flex flex-col">
                    <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#3D604C] mb-2">
                      PRINCIPAL SPONSORS
                    </h4>
                    <div className="text-sm sm:text-[15px] leading-relaxed text-[#1F2421] font-medium space-y-1.5 whitespace-pre-line">
                      {displayColorMotifNote.split("\n").map((line, idx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        const match = trimmed.match(/^([^:]+):\s*(.*)$/);
                        if (match) {
                          return (
                            <p key={idx}>
                              <strong className="font-semibold text-[#1B2B22]">{match[1]}:</strong>{" "}
                              {match[2]}
                            </p>
                          );
                        }
                        return <p key={idx}>{trimmed}</p>;
                      })}
                    </div>

                    {/* Subhead: SUGGESTED GUEST COLORS & Swatches Block */}
                    {hasPalette && palette && (
                      <div className="mt-4 pt-3 border-t border-[#B8C7BD]/40">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#3D604C] mt-1 mb-2.5">
                          SUGGESTED GUEST COLORS
                        </p>
                        {/* Color Palette Swatches (One horizontal row of equal columns) */}
                        <div className="relative z-20 grid grid-cols-5 gap-1 sm:gap-2 w-full items-start">
                          {palette.map((item) => (
                            <AttireColorSwatch
                              key={item.label}
                              label={item.label}
                              color={item.color}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
