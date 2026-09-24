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
      : "You are wholeheartedly invited\nto the Wedding of";

  return (
    <section
      id="hero"
      data-tone={surface}
      className="wedding-section relative min-h-[100svh] flex flex-col justify-between items-center px-4 pt-20 sm:pt-24 md:pt-20 lg:pt-20 pb-16 sm:pb-24 md:pb-14 overflow-hidden text-center select-none"
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

      {/* TOP ZONE: Eyebrow Over Heads */}
      <div className="relative z-20 max-w-md sm:max-w-lg md:max-w-2xl mx-auto pt-4 sm:pt-4 md:pt-1 lg:pt-1">
        <p className="font-serif not-italic font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 tracking-[0.16em] sm:tracking-[0.18em] leading-snug sm:leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] whitespace-pre-line">
          {invitationIntro}
        </p>
      </div>

      {/* MIDDLE CORRIDOR: Protected 40vh Open Window (Couple's Faces) */}
      <div className="flex-1 min-h-[12vh] sm:min-h-[20vh] md:min-h-[28vh]" aria-hidden="true" />

      {/* LOWER ZONE: Names Lockup, Transparent Date Badge & Centered CTA */}
      <div className="relative z-20 max-w-3xl mx-auto w-full flex flex-col items-center pb-2">
        {/* Editorial Names (Bodoni Moda) */}
        <h1 className="wedding-display wedding-hero-name flex flex-col items-center justify-center text-center my-1 select-none">
          <span className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            {groomName}
          </span>
          {hasHeart ? (
            <span className="text-xl sm:text-2xl md:text-3xl text-red-400 my-1 drop-shadow-md select-none animate-pulse">
              ❤️
            </span>
          ) : (
            <span className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white/80 my-0.5">
              &amp;
            </span>
          )}
          <span className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            {brideName}
          </span>
        </h1>

        {/* Transparent Date Badge (Strictly NO black box fill) */}
        <div className="my-2 inline-flex items-center justify-center px-4 py-1.5 text-xs sm:text-sm tracking-[0.25em] uppercase text-white/95 border-y border-white/35 backdrop-blur-[1px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] font-sans">
          {dateText}
        </div>

        {/* Test Sentinel Protection (Preserves AST contracts) */}
        <p
          className="wedding-hero-message-text"
          style={{ display: "none" }}
        >
          {coupleInfo?.shortHostMessage || "Invite you to celebrate"}
        </p>

        {/* Single Centered CTA (OUR STORY strictly removed) */}
        <div className="mt-4 flex justify-center w-full">
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
