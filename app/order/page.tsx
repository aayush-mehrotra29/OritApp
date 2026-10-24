import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AudiencePixelScene } from "@/components/AudiencePixelScene";
import { ResearchCheckout } from "@/components/ResearchCheckout";
import { RESEARCH_SALES_ENABLED, researchPackages } from "@/lib/research";

export const metadata: Metadata = {
  title: "Share Your Product Details | Orit",
  description: "Email Orit your product details, then continue to Whop payment for your selected research package.",
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
                <p className="founder-bio">You&apos;ve chosen {selected.name}. Send us your brief first, then pay securely through Whop.</p>
                <ResearchCheckout key={selected.slug} pkg={selected} />
              </>
            ) : (
              <p className="founder-bio">{RESEARCH_SALES_ENABLED ? "Choose a research package to send your product details and continue to payment." : "Purchases are not open yet. Check our pricing page for availability."}</p>
            )}
            <a className="research-order-back" href="/#pricing">Back to packages</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
