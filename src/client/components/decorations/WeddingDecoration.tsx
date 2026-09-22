"use client";

import React from "react";
import {
  clientConfig,
  BOTANICAL_COMPONENT_FLORAL_DECORATIONS,
} from "@/client/client.config";

export type DecorationFamily = "card-edge" | "frame-corner" | "crest";
export type DecorationOrientation = "left" | "right" | "center";
export type DecorationPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "bottom-edge-left"
  | "bottom-edge-right"
  | "center";

export type DecorationSize = "small" | "medium" | "large";
export type DecorationTone = "light" | "warm" | "olive" | "dark";

export type DecorationPlacementMode = "inside" | "edge-overlap";

export interface WeddingDecorationProps {
  family: DecorationFamily;
  orientation?: DecorationOrientation;
  position?: DecorationPosition;
  size?: DecorationSize;
  tone?: DecorationTone;
  placementMode?: DecorationPlacementMode;
  className?: string;
  style?: React.CSSProperties;
}

function getCornerTransform(position?: DecorationPosition): string | undefined {
  switch (position) {
    case "top-right":
      return "scaleX(-1)";
    case "bottom-left":
    case "bottom-edge-left":
      return "scaleY(-1)";
    case "bottom-right":
    case "bottom-edge-right":
      return "rotate(180deg)";
    case "top-left":
    default:
      return undefined;
  }
}

export function WeddingDecoration({
  family,
  position = "top-left",
  size = "medium",
  tone = "light",
  placementMode = "edge-overlap",
  className = "",
  style,
}: WeddingDecorationProps) {
  const isCrest = family === "crest";
  const assetSpec = isCrest
    ? (clientConfig.botanicalFlorals?.floralCrest ??
        BOTANICAL_COMPONENT_FLORAL_DECORATIONS.floralCrest)
    : (clientConfig.botanicalFlorals?.cornerSprig ??
        BOTANICAL_COMPONENT_FLORAL_DECORATIONS.cornerSprig);

  if (!assetSpec?.src) return null;

  const cornerTransform = isCrest ? undefined : getCornerTransform(position);
  const inlineStyle: React.CSSProperties | undefined =
    cornerTransform || style
      ? {
          ...(cornerTransform ? { transform: cornerTransform } : {}),
          ...style,
        }
      : undefined;

  const familyClass = `wedding-decoration--family-${family}`;
  const positionClass = position ? `wedding-decoration--pos-${position}` : "";
  const sizeClass = `wedding-decoration--size-${size}`;
  const toneClass = `wedding-decoration--tone-${tone}`;
  const modeClass = `wedding-decoration--mode-${placementMode}`;

  return (
    <img
      src={assetSpec.src}
      alt=""
      aria-hidden="true"
      width={assetSpec.width}
      height={assetSpec.height}
      loading="lazy"
      decoding="async"
      style={inlineStyle}
      className={`wedding-decoration ${familyClass} ${positionClass} ${sizeClass} ${toneClass} ${modeClass} ${className}`.trim()}
    />
  );
}
