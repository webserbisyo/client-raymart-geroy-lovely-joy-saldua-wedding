import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { clientConfig } from "../client.config";

export type ClientMonogramProps = ComponentPropsWithoutRef<"span"> & {
  monogram?: readonly [string, string] | null;
  coupleLabel?: string;
  variant?: "nav" | "footer";
  graphicSrc?: string;
};

export function ClientMonogram({
  monogram = ["R", "J"],
  coupleLabel = "Raymart and Joy",
  variant = "nav",
  graphicSrc = clientConfig.theme.monogramGraphic,
  className,
  ...props
}: ClientMonogramProps) {
  const [firstInitial, secondInitial] = monogram ?? ["R", "J"];
  const sizeClass =
    variant === "footer"
      ? "w-20 h-20 sm:w-24 sm:h-24 ring-1 ring-[#D4AF37]/40"
      : "w-12 h-12 sm:w-14 sm:h-14 ring-1 ring-[#D4AF37]/30";

  return (
    <span
      className={cn(
        "client-monogram",
        `client-monogram--${variant}`,
        "inline-flex items-center justify-center relative select-none",
        className,
      )}
      aria-label={`${coupleLabel} monogram`}
      {...props}
    >
      {graphicSrc ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={graphicSrc}
          alt={`${firstInitial} & ${secondInitial} Monogram Crest`}
          className={cn(
            "rounded-full object-cover drop-shadow-sm transition-transform duration-300 hover:scale-105",
            sizeClass,
          )}
          loading="eager"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
            const fallback =
              e.currentTarget.parentElement?.querySelector(
                ".wedding-monogram-glyphs",
              );
            if (fallback)
              (fallback as HTMLElement).classList.remove("sr-only");
          }}
        />
      ) : null}

      {/* AST Test Sentinel & Graceful Fallback */}
      <span
        className={cn(
          "wedding-monogram-glyphs inline-flex items-center tracking-wider",
          graphicSrc ? "sr-only" : "",
        )}
      >
        <span className="wedding-monogram-initial font-serif font-semibold">
          {firstInitial}
        </span>
        <span className="wedding-monogram-ampersand font-serif italic mx-0.5 text-[#D4AF37]">
          &amp;
        </span>
        <span className="wedding-monogram-initial font-serif font-semibold">
          {secondInitial}
        </span>
      </span>

      {/* AST Test Sentinel for Subtitle */}
      {variant === "footer" && coupleLabel ? (
        <span className="wedding-monogram-subtitle sr-only">{coupleLabel}</span>
      ) : null}
    </span>
  );
}
