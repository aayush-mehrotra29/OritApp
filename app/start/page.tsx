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
            <p className="founder-bio">{selected ? `${selected.name} project instructions. ` : "Project instructions. "}Thank you for choosing Orit. If you have purchased, check your Whop payment confirmation before sending your project details.</p>
            <div className="research-intake">
              <h2>Share the decision you want to investigate.</h2>
              <ol>
                <li>Use the contact form with the same email you used at checkout. Include your Whop order reference and purchased package.</li>
                <li>In the message, add your business name, website, intended audience, and the decision you need to make. Share public concept or product links if available.</li>
                <li>Orit will verify the purchase and confirm scope, materials, and expected timing before research begins. Ask for an appropriate transfer method before sharing confidential files or personal participant information.</li>
              </ol>
              <a className="button button-primary" href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Send Project Details</a>
              <p className="founder-bio">This page does not confirm payment or start a project. Whop is the source of payment status and receipts. For a pending, failed, or uncertain payment, check your Whop account or contact Orit with the reference before trying again.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
