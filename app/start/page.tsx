import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AudiencePixelScene } from "@/components/AudiencePixelScene";
import { RESEARCH_EMAIL, researchPackages } from "@/lib/research";

export const metadata: Metadata = {
  title: "Your Research Starts Here | Orit",
  description: "Next steps for your Orit research project after Whop checkout.",
  robots: { index: false, follow: true },
};

export default function ResearchStartPage({ searchParams }: { searchParams: { package?: string } }) {
  const selected = researchPackages.find((pkg) => pkg.slug === searchParams.package);
  return (
    <>
      <SiteHeader />
      <main className="about-page">
        <section className="about-page-hero" aria-labelledby="start-heading">
          <AudiencePixelScene />
          <div className="founders-inner">
            <h1 id="start-heading">Your Research Starts Here.</h1>
            <p className="founder-bio">{selected ? `${selected.name} project instructions. ` : "Project instructions. "}If you have purchased, check your Whop payment confirmation. We&apos;ll match your purchase to the product details you emailed.</p>
            <div className="research-intake">
              <h2>What happens next.</h2>
              <ol>
                <li>If you already emailed your product details, you don&apos;t need to send them again. If you used a different checkout email, reply to your original email with your Whop order reference and package name.</li>
                <li>If you haven&apos;t sent your brief yet, email us your product name, description, website, target customers, and research question. Include your checkout email and Whop order reference.</li>
                <li>We check your payment and agree on the work, materials, and timing before starting. Ask us how to share private files or personal information safely.</li>
              </ol>
              <a className="button button-primary" href={`mailto:${RESEARCH_EMAIL}?subject=Research%20order%20follow-up`}>Email Orit</a>
              <p className="founder-bio">This page does not confirm payment or start a project. Check Whop for your payment status and receipt. If payment is pending, failed, or unclear, contact us with your order reference before trying again.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
