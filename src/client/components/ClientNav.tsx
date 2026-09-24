"use client";

import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "@/client/libs/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  clientSectionRegistry,
  type ClientSectionKey,
} from "@/client/config/navigation";
import { SitemapDrawer } from "@/client/components/SitemapDrawer";
import { ClientMonogram } from "@/client/components/ClientMonogram";
import type { ClientConfig } from "@/client/client.config";
import type { ClientBrandingData } from "@/client/types/client-view-model";
import { deriveCoupleBranding } from "@/client/utils/derive-couple-branding";
import { scrollToHash } from "@/client/utils/navigation";

export function ClientNav({
  coupleDisplayName,
  visibleSectionKeys = [],
  branding,
}: {
  config?: ClientConfig;
  coupleDisplayName?: string;
  visibleSectionKeys?: ClientSectionKey[];
  branding?: ClientBrandingData;
} = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isRsvpPage = pathname === "/rsvp";

  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isScrolled = !isHomePage || hasScrolled;

  const resolvedBranding =
    branding ?? deriveCoupleBranding({ displayAs: coupleDisplayName });

  useEffect(() => {
    if (isHomePage && window.scrollY > 48) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasScrolled(true);
    }
  }, [isHomePage]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isHomePage) return;

    const shouldBeScrolled = latest > 48;
    setHasScrolled((current) =>
      current === shouldBeScrolled ? current : shouldBeScrolled
    );
  });

  const defaultNavKeys: ClientSectionKey[] = [
    "countdown",
    "gallery",
    "timeline_program",
    "extra_info",
    "story_message",
  ];
  const resolvedKeys =
    visibleSectionKeys.length > 0 ? visibleSectionKeys : defaultNavKeys;
  const visibleSections = resolvedKeys
    .map((key) => clientSectionRegistry[key])
    .filter(Boolean);
  const topNavItems = visibleSections.filter((section) => section?.topNav);

  const getResolvedHref = (href: string) => {
    if (href.startsWith("#")) {
      return isRsvpPage ? `/${href}` : href;
    }
    return href;
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      if (isRsvpPage) {
        return;
      }
      e.preventDefault();
      scrollToHash(href);
    }
  };

  const homeLabel = resolvedBranding.coupleLabel
    ? `${resolvedBranding.coupleLabel} wedding website`
    : "Wedding website home";

  return (
    <>
      <nav
        aria-label="Client navigation"
        data-scrolled={isScrolled ? "true" : "false"}
        className="wedding-nav fixed top-0 z-50 w-full h-14 sm:h-16 overflow-visible"
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-visible">
          {/* Left: Brand Monogram (Hanging Seal Pattern) */}
          <div className="relative z-30 flex items-center shrink-0 overflow-visible">
            <Link
              href={isRsvpPage ? "/" : "#hero"}
              onClick={(e) => {
                if (!isRsvpPage) {
                  e.preventDefault();
                  scrollToHash("#hero");
                }
              }}
              aria-label={homeLabel}
              className="wedding-nav-monogram relative block shrink-0 overflow-visible group"
            >
              {/* Overflowing Seal: Anchored near top, hangs past bottom border */}
              <div className="absolute top-1 sm:top-1.5 left-0 flex items-center justify-center pointer-events-auto">
                <ClientMonogram
                  variant="nav"
                  monogram={resolvedBranding.monogram}
                  coupleLabel={resolvedBranding.coupleLabel}
                />
              </div>

              {/* Layout spacer so sibling links keep proper clearance without stretching height */}
              <div className="w-16 sm:w-20 h-10 pointer-events-none" />
            </Link>
          </div>

          {/* Center: Desktop Links (Secondary Browsing Only) */}
          <ul className="wedding-nav-links hidden md:flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 text-xs font-bold uppercase tracking-[0.2em]">
            {topNavItems.map((link) => {
              const resolvedHref = getResolvedHref(link.anchor);
              return (
                <li key={link.key}>
                  <Link
                    href={resolvedHref}
                    onClick={(e) => handleLinkClick(e, link.anchor)}
                    className="transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: Burger Menu Trigger (Visible on Desktop & Mobile) */}
          <div className="flex items-center justify-end min-w-[120px]">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="wedding-nav-menu group inline-flex items-center gap-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 rounded-lg py-2.5 px-3.5 -mr-2.5 min-h-[46px] min-w-[46px]"
              aria-label="Open navigation menu"
            >
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-[0.2em] transition-colors mt-0.5">
                More
              </span>
              <Menu className="h-[26px] w-[26px] stroke-[2.4] transition-transform group-hover:scale-105" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sitemap Drawer */}
      <SitemapDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        visibleSectionKeys={visibleSectionKeys}
      />
    </>
  );
}

export default ClientNav;
