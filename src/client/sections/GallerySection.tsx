"use client";

/**
 * GallerySection
 *
 * Polaroid-style photo gallery with ScrollStack, decorative sea elements,
 * and sticky side groups.
 * Extracted from ClientEventRenderer.tsx lines 470–626.
 *
 * GALLERY_PHOTOS and GALLERY_ROTATIONS are kept in this file
 * (Phase 6 will centralize them into client.config.ts).
 *
 * All classNames, styles, and layout are identical.
 */

import { useState, useEffect } from "react";
import { ScrollStack, ScrollStackItem } from "@/client/libs/reactbits";
import type { SectionSurface } from "@/client/client-section-registry";
import { WeddingDecoration } from "@/client/components/decorations/WeddingDecoration";

const GALLERY_PHOTOS = [
  {
    id: "gallery-01",
    src: "/template-assets/photos/gallery/gallery-01.webp",
    alt: "Raymart Geroy and Lovely Joy Saldua by the historic stone wall",
    caption: "At the Heritage Grounds",
    aspectRatio: "1.50",
    orientation: "landscape",
  },
  {
    id: "gallery-02",
    src: "/template-assets/photos/gallery/gallery-02.webp",
    alt: "Raymart and Lovely Joy sitting peacefully on the lawn",
    caption: "Golden Afternoon",
    aspectRatio: "0.67",
    orientation: "portrait",
  },
  {
    id: "gallery-03",
    src: "/template-assets/photos/gallery/gallery-03.webp",
    alt: "Raymart laughing with Lovely Joy holding the bridal bouquet",
    caption: "Shared Joy",
    aspectRatio: "0.67",
    orientation: "portrait",
  },
  {
    id: "gallery-04",
    src: "/template-assets/photos/gallery/gallery-04.webp",
    alt: "Raymart and Lovely Joy under the stone archway",
    caption: "Under the Archway",
    aspectRatio: "0.67",
    orientation: "portrait",
  },
  {
    id: "gallery-05",
    src: "/template-assets/photos/gallery/gallery-05.webp",
    alt: "Intimate candid portrait of Raymart and Lovely Joy",
    caption: "Pure Devotion",
    aspectRatio: "0.67",
    orientation: "portrait",
  },
  {
    id: "gallery-06",
    src: "/template-assets/photos/gallery/gallery-06.webp",
    alt: "Romantic garden embrace and veil dip",
    caption: "Forever Begins",
    aspectRatio: "0.67",
    orientation: "portrait",
  },
];

const GALLERY_ROTATIONS = [
  "-1.5deg",
  "1.2deg",
  "-0.8deg",
  "1.5deg",
  "-1.2deg",
  "0.8deg",
  "-1.8deg",
  "1deg",
  "-0.5deg",
];

export function GallerySection({ surface }: { surface: SectionSurface }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section
      id="gallery"
      data-tone={surface}
      className="wedding-section relative overflow-x-clip pt-20 pb-20 px-4"
    >
      <div className="max-w-2xl mx-auto relative z-30">
        <div className="text-center mb-14">
          <p className="wedding-section-label text-xs font-bold tracking-[0.25em] uppercase mb-3 text-[color:var(--wedding-label-on-light)]">
            Our Memories
          </p>
          <h2 className="wedding-display wedding-section-title wedding-section-title--compact mb-3">
            A Story in Frames
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5 text-[color:var(--wedding-accent-line)] opacity-60">
            <div className="h-px w-12 bg-[color:var(--wedding-accent-line)] opacity-40" />
            <span className="text-[color:var(--wedding-label-on-light)]">
              ✦
            </span>
            <div className="h-px w-12 bg-[color:var(--wedding-accent-line)] opacity-40" />
          </div>
        </div>

        <ScrollStack>
          {GALLERY_PHOTOS.map((photo, i) => {
            const isPortrait = photo.orientation === "portrait";

            return (
              <ScrollStackItem key={i}>
                <div className="relative overflow-visible mx-auto" style={{ maxWidth: isPortrait ? "390px" : "520px" }}>
                  <div
                    className="wedding-paper-collage bg-white border-2 border-white rounded p-3 relative transition-[border-color,box-shadow] duration-300 overflow-visible z-10"
                    style={{
                      transform: `rotate(${GALLERY_ROTATIONS[i % GALLERY_ROTATIONS.length]})`,
                    }}
                  >
                    <div
                      className={`w-full ${isPortrait ? "aspect-[3/4]" : "aspect-[4/3]"} rounded-sm bg-gradient-to-br from-[color:var(--wedding-surface-champagne)] via-[color:var(--wedding-surface-olive)] to-[color:var(--wedding-panel-border)] overflow-hidden`}
                    >
                      {mounted && (
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          decoding="async"
                          className="w-full h-full object-cover rounded-sm hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>

                    {/* Diagonal pair: top-left sprig + bottom-right flourish - anchored to rotated white frame */}
                    <WeddingDecoration
                      family="frame-corner"
                      orientation="left"
                      position="top-left"
                      size="small"
                      tone="light"
                      placementMode="edge-overlap"
                      className="wedding-decoration--target-gallery"
                    />
                    <WeddingDecoration
                      family="card-edge"
                      orientation="right"
                      position="bottom-right"
                      size="small"
                      tone="light"
                      placementMode="edge-overlap"
                      className="wedding-decoration--target-gallery"
                    />
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}
