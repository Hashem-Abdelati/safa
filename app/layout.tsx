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
  title: "Safa صَفاء",
  description: "Safa صَفاء",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
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
