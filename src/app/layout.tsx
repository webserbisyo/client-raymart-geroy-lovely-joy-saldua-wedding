import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Manrope } from "next/font/google";
import { PwaRegister } from "@/components/pwa-register";
import { WEDDING_BROWSER_THEME_COLOR } from "@/config/browser-theme";
import { getMetadataBase } from "@/lib/metadata";
import "@/styles/globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: WEDDING_BROWSER_THEME_COLOR,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "WebSerbisyo RSVP Event",
  description: "A public event website powered by WebSerbisyo RSVP.",
  icons: {
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "1024x1024", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    images: [
      {
        url: "/opengraph-image?v=rj-2026-final",
        width: 1200,
        height: 630,
        alt: "Wedding Celebration Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image?v=rj-2026-final"],
  },
};

import { clientConfig } from "@/client/client.config";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${cormorant.variable} ${manrope.variable}`}
      data-wedding-theme={clientConfig.theme.id}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      style={
        {
          "--wedding-browser-surface": WEDDING_BROWSER_THEME_COLOR,
          backgroundColor: WEDDING_BROWSER_THEME_COLOR,
        } as React.CSSProperties
      }
    >
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
