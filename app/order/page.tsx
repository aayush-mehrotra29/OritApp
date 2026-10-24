import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AudiencePixelScene } from "@/components/AudiencePixelScene";
import { ResearchCheckout } from "@/components/ResearchCheckout";
import { RESEARCH_SALES_ENABLED, researchPackages } from "@/lib/research";

export const metadata: Metadata = {
  title: "Start Your Research | Orit",
  description: "Pay through Whop, then receive your private Orit project-brief email.",
  robots: { index: false, follow: true },
};

export default function ResearchOrderPage({ searchParams }: { searchParams: { package?: string } }) {
  const selected = researchPackages.find((pkg) => pkg.slug === searchParams.package);
  return (
    <>
      <SiteHeader />
      <main className="about-page">
        <section className="about-page-hero" aria-labelledby="order-heading">
          <AudiencePixelScene />
          <div className="founders-inner">
            <h1 id="order-heading">Let&apos;s meet your product.</h1>
            {selected && RESEARCH_SALES_ENABLED ? (
              <>
                <p className="founder-bio">You&apos;ve chosen {selected.name}. Pay securely through Whop, then receive your private project-brief email.</p>
                <ResearchCheckout key={selected.slug} pkg={selected} />
              </>
            ) : (
              <p className="founder-bio">{RESEARCH_SALES_ENABLED ? "Choose a research package to continue to payment." : "Purchases are not open yet. Check our pricing page for availability."}</p>
            )}
            <a className="research-order-back" href="/#pricing">Back to packages</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
