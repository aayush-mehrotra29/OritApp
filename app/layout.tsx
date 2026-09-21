import type { Metadata } from "next";
import "./globals.css";
import { StickyHeader } from "@/components/StickyHeader";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Orit — AI agents for iOS app testing",
  description: "Orit uses AI agents to simulate how different users experience your iOS app before you ship it.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/lateef-200.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/geist-500.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@600&family=Noto+Sans+JP:wght@600&family=Noto+Sans+KR:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="site-shell" id="top">
          {children}
        </div>
        <StickyHeader />
        <ScrollReveal />
      </body>
    </html>
  );
}
