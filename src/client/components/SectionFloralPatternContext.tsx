import type { ReactNode, CSSProperties } from "react";

export type SectionFloralPatternVariant =
  | "damask"
  | "petals"
  | "foliage"
  | "dense-allover"
  | "open-framed";

type SectionFloralPatternContextProps = {
  variant: SectionFloralPatternVariant;
  children: ReactNode;
};

export const SECTION_FLORAL_PATTERNS: Record<SectionFloralPatternVariant, string> = {
  // Cadence A (Damask) & legacy alias
  damask: 'url("/template-assets/backgrounds/pattern-01-damask.webp")',
  "dense-allover": 'url("/template-assets/backgrounds/pattern-01-damask.webp")',

  // Cadence B (Petals) & legacy alias
  petals: 'url("/template-assets/backgrounds/pattern-02-petals.webp")',
  "open-framed": 'url("/template-assets/backgrounds/pattern-02-petals.webp")',

  // Cadence C (Foliage)
  foliage: 'url("/template-assets/backgrounds/pattern-03-foliage.webp")',
};

/**
 * SectionFloralPatternContext
 *
 * Wraps eligible content sections with display: contents so no extra layout
 * element is created. Exposes the CSS custom property `--wedding-section-pattern-image`
 * to child .wedding-section elements for layered floral background rendering.
 */
export function SectionFloralPatternContext({
  variant,
  children,
}: SectionFloralPatternContextProps) {
  const image =
    SECTION_FLORAL_PATTERNS[variant] ||
    'url("/template-assets/backgrounds/pattern-01-damask.webp")';

  return (
    <div
      className="contents wedding-section-pattern-context"
      data-floral-pattern={variant}
      style={
        {
          "--wedding-section-pattern-image": image,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
