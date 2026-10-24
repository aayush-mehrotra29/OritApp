import { researchPackages } from "@/lib/research";

export function ResearchCheckout({ pkg }: { pkg: (typeof researchPackages)[number] }) {
  return (
    <div className="research-intake research-order">
      <section aria-labelledby="payment-step-heading">
        <p className="research-order-step">Step 1 of 2</p>
        <h2 id="payment-step-heading">Pay securely through Whop.</h2>
        <p className="founder-bio">{pkg.name} · ${pkg.price} USD · one-time purchase. Whop confirms availability and shows any tax before you pay. Use the email address you&apos;ll send your project brief from.</p>
        <a className="button button-primary" href={pkg.checkoutUrl}>Continue to Whop payment</a>
      </section>
      <section aria-labelledby="email-step-heading">
        <p className="research-order-step">Step 2 of 2</p>
        <h2 id="email-step-heading">Receive your private brief template.</h2>
        <p className="founder-bio">After Whop confirms payment, Orit sends a private intake email to your checkout address. Fill in your product details and send the template from that same address.</p>
        <p className="research-order-help">Your intake includes your payment reference and a private token. Keep both unchanged. One verified payment starts one project at the level you purchased. A receipt screenshot or a forwarded email cannot authorize another project.</p>
      </section>
    </div>
  );
}
