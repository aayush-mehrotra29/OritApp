import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AudiencePixelScene } from "@/components/AudiencePixelScene";
import { CONTACT_URL, researchPackages } from "@/lib/research";

export const metadata: Metadata = {
  title: "Your Research Starts Here | Orit",
  description: "How to share your project details with Orit after Whop confirms your purchase.",
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
            <p className="founder-bio">{selected ? `${selected.name} project instructions. ` : "Project instructions. "}If you have purchased, check your Whop payment confirmation, then send us your project details.</p>
            <div className="research-intake">
              <h2>Tell us what you want to decide.</h2>
              <ol>
                <li>Use your checkout email in the contact form. Include your Whop order reference and package name.</li>
                <li>Add your business name, website, target customers, and research question. Include public links to your product or idea, if you have them.</li>
                <li>We check your payment and agree on the work, materials, and timing before starting. Ask us how to share private files or personal information safely.</li>
              </ol>
              <a className="button button-primary" href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Send Project Details</a>
              <p className="founder-bio">This page does not confirm payment or start a project. Check Whop for your payment status and receipt. If payment is pending, failed, or unclear, contact us with your order reference before trying again.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
