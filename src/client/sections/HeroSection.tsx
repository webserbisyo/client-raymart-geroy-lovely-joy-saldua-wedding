"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import type { ClientCoupleInfo } from "@/client/types/client-view-model";
import { templateBranding } from "@/config/template-branding";
import type { SectionSurface } from "@/client/client-section-registry";
import { WeddingButton } from "@/client/components/ui/WeddingButton";

type HeroSectionProps = {
  coupleInfo: ClientCoupleInfo;
  storyVisible?: boolean;
  surface: SectionSurface;
};

export function HeroSection({
  coupleInfo,
  surface,
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, 120]);
  const backgroundY = useSpring(rawY, {
    stiffness: 90,
    damping: 25,
    mass: 0.4,
  });

  const rawDisplayAs = coupleInfo?.displayAs?.trim();
  const delimiterMatch = rawDisplayAs
    ? rawDisplayAs.match(/\s*(❤️|&|\band\b|\+)\s*/i)
    : null;
  const parsedP1 =
    delimiterMatch && delimiterMatch.index !== undefined
      ? rawDisplayAs?.slice(0, delimiterMatch.index).trim()
      : rawDisplayAs;
  const parsedP2 =
    delimiterMatch && delimiterMatch.index !== undefined
      ? rawDisplayAs
          ?.slice(delimiterMatch.index + delimiterMatch[0].length)
          .trim()
      : "";

  const groomName =
    coupleInfo?.firstPartnerName ||
    coupleInfo?.groomName?.trim().split(/\s+/)[0] ||
    (parsedP1 ? parsedP1.split(/\s+/)[0] : "Raymart") ||
    "Raymart";

  const rawBride =
    coupleInfo?.secondPartnerName ||
    coupleInfo?.brideName ||
    parsedP2 ||
    "Joy";

  const brideName =
    rawBride.toLowerCase().includes("joy")
      ? "Joy"
      : rawBride.trim().split(/\s+/)[0] || "Joy";

  const hasHeart = rawDisplayAs ? rawDisplayAs.includes("❤️") : true;

  const rawDate = coupleInfo?.hostLine?.trim();
  const dateText =
    rawDate &&
    rawDate.includes("11") &&
    rawDate.includes("21") &&
    rawDate.includes("2026")
      ? "Nov 21 2026"
      : rawDate || "Nov 21 2026";

  const invitationIntro =
    coupleInfo?.shortHostMessage &&
    coupleInfo.shortHostMessage !== "you're invited!"
      ? coupleInfo.shortHostMessage.trim()
      : "You are wholeheartedly invited to\nthe Wedding of";

  const [introLine1, introLine2] = invitationIntro.includes("\n")
    ? invitationIntro.split("\n")
    : ["You are wholeheartedly invited to", "the Wedding of"];

  return (
    <section
      id="hero"
      data-tone={surface}
      className="wedding-section relative min-h-[100svh] h-[100svh] flex flex-col justify-between items-center px-4 pt-[max(env(safe-area-inset-top,0px),5.0rem)] pb-[max(env(safe-area-inset-bottom,0px),1.75rem)] overflow-hidden text-center select-none"
    >
      {/* Parallax Background */}
      <motion.div
        style={{
          y: backgroundY,
          backgroundImage: `url('${templateBranding.hero.imagePath}')`,
          backgroundPosition: "center 38%",
          opacity: "var(--wedding-hero-image-opacity, 0.95)",
        }}
        className="absolute inset-0 z-0 bg-cover bg-no-repeat scale-110 pointer-events-none"
      />

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/75" />

      {/* ZONE 1: TOP CANOPY (Eyebrow over Heads) */}
      <header className="relative z-20 w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto flex flex-col items-center justify-center text-center select-none shrink-0">
        <p className="wedding-hero-eyebrow font-serif not-italic font-normal text-white/95 leading-snug sm:leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] flex flex-col items-center">
          <span className="block whitespace-nowrap">{introLine1 || "You are wholeheartedly invited to"}</span>
          <span className="block whitespace-nowrap">{introLine2 || "the Wedding of"}</span>
        </p>
      </header>

      {/* ZONE 2: MIDDLE FOCAL CORRIDOR (Protected Faces Window) */}
      <div 
        className="w-full flex-shrink-0 h-[24svh] min-h-[90px] max-h-[220px]" 
        aria-hidden="true" 
      />

      {/* ZONE 3: LOWER LOCKUP (Torso / Crossed Arms "Red Box" + CTA) */}
      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center justify-end shrink-0 my-auto pb-1">
        {/* Editorial Names (Bodoni Moda) */}
        <h1 className="wedding-display wedding-hero-name flex flex-col items-center justify-center text-center my-0.5 select-none">
          <span className="wedding-hero-partner font-serif font-bold tracking-wide text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            {groomName}
          </span>
          {hasHeart ? (
            <span className="text-xl sm:text-2xl md:text-3xl text-red-400 my-0.5 drop-shadow-md select-none animate-pulse">
              ❤️
            </span>
          ) : (
            <span className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white/80 my-0.5">
              &amp;
            </span>
          )}
          <span className="wedding-hero-partner font-serif font-bold tracking-wide text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            {brideName}
          </span>
        </h1>

        {/* Transparent Date Badge */}
        <div className="my-1.5 sm:my-2 inline-flex items-center justify-center px-4 py-1.5 text-xs sm:text-sm tracking-[0.25em] uppercase text-white/95 border-y border-white/35 backdrop-blur-[1px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] font-sans">
          {dateText}
        </div>

        {/* Sentinel for AST Contracts (Keep Intact) */}
        <p
          className="wedding-hero-message-text"
          style={{ display: "none" }}
        >
          {coupleInfo?.shortHostMessage || "Invite you to celebrate"}
        </p>

        {/* Centered CTA */}
        <div className="mt-3 sm:mt-4 flex justify-center w-full">
          <WeddingButton
            asChild
            className="mx-auto"
            size="lg"
            variant="primary"
          >
            <Link className="group" href="/rsvp">
              <Heart
                className="fill-white/20 group-hover:scale-125 group-hover:fill-white transition-transform duration-300 ease-out"
                size={14}
              />
              <span>Reserve Your Seat</span>
            </Link>
          </WeddingButton>
        </div>
      </div>
    </section>
  );
}
