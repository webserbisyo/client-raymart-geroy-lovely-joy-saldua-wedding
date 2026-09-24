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
      ? "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-56 xl:h-56 ring-1 ring-[#D4AF37]/40"
      : "w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 ring-1 ring-[#D4AF37]/30";

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
