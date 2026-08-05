import type { Metadata } from "next";
import "./globals.css";

const title = "Orion Scope — Onchain Fund Recovery";
const description =
  "Orion Scope is an onchain research team that helps people and teams trace, reclaim, and recover lost or forgotten funds — from misplaced seed phrases to stranded bridge transfers and unclaimed airdrops.";
const siteUrl = "https://orionscope.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Orion Scope",
  },
  description,
  keywords: [
    "crypto recovery",
    "onchain fund recovery",
    "lost wallet recovery",
    "seed phrase recovery",
    "unclaimed airdrops",
    "stranded bridge transfer",
    "wallet forensics",
    "blockchain investigation",
  ],
  authors: [{ name: "Orion Scope" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Orion Scope",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orion Scope — Onchain Fund Recovery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
