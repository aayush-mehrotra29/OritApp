import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AudiencePixelScene } from "@/components/AudiencePixelScene";
import { CONTACT_URL, researchPackages } from "@/lib/research";

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
            <p className="founder-bio">{selected ? `${selected.name} project instructions. ` : "Project instructions. "}If you have purchased, check your Whop payment confirmation. Your payment will be checked before Orit sends your private intake email.</p>
            <div className="research-intake">
              <h2>What happens next.</h2>
              <ol>
                <li>Check the inbox and spam folder for the email address you used at checkout. Whop sends your receipt; Orit sends a separate private brief template after verifying payment.</li>
                <li>Fill in the product name, description, audience, and research question in the Orit template. Keep its payment reference and private intake token unchanged, and send it from your checkout email address.</li>
                <li>We verify your payment, sender, and purchased package before starting one project. Refunded, disputed, or reused payments cannot start another analysis. Contact us if your intake email is missing or you need help.</li>
              </ol>
              <a className="button button-primary" href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Get help with your order</a>
              <p className="founder-bio">This page does not confirm payment or start a project. Check Whop for your payment status and receipt. If payment is pending, failed, or unclear, contact us with your order reference before trying again.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
