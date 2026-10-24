import type { Metadata } from "next";
import "./globals.css";
import { StickyHeader } from "@/components/StickyHeader";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://orit.dev"),
  title: "Orit — AI-Powered Market Research With Real Human Insight",
  description: "Orit combines AI-powered market research with real human feedback to help consumer brands test ideas, evaluate products, and make better launch decisions.",
  keywords: ["market research", "human consumer insights", "product concept testing", "AI-powered market research", "customer feedback", "competitor analysis", "product launch research", "e-commerce research"],
  openGraph: {
    type: "website", siteName: "Orit",
    title: "Orit — AI-Powered Market Research With Real Human Insight",
    description: "AI-powered research. Grounded in real people. Practical research briefs for better-informed launch decisions.",
    images: [{ url: "/assets/orit-city-hero.png", alt: "Orit — AI-powered research grounded in real people" }],
  },
  twitter: { card: "summary_large_image", title: "Orit — Real Human Insight. Smarter Launches.", description: "AI-powered market research and real participant feedback for consumer brands.", images: ["/assets/orit-city-hero.png"] },
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
