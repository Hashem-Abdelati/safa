import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Sans_Arabic,
  Manrope,
  Noto_Naskh_Arabic,
} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const arabicSans = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic-sans",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

const arabicSerif = Noto_Naskh_Arabic({
  variable: "--font-arabic-serif",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "SAFA صَفاء — Websites with clarity and taste",
    template: "%s — SAFA صَفاء",
  },
  description:
    "A bilingual boutique web design studio creating refined, credible websites for thoughtful businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${cormorant.variable} ${arabicSans.variable} ${arabicSerif.variable} min-h-full antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
