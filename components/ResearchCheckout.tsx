"use client";

import { useState } from "react";
import { RESEARCH_EMAIL, researchEmailUrl, researchPackages } from "@/lib/research";

export function ResearchCheckout({ pkg }: { pkg: (typeof researchPackages)[number] }) {
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="research-intake research-order">
      <section aria-labelledby="email-step-heading">
        <p className="research-order-step">Step 1 of 2</p>
        <h2 id="email-step-heading">Email your product details.</h2>
        <p className="founder-bio">Tell us your product name, what it does, who it&apos;s for, and what you want to learn. Include your website or product links and any timeline.</p>
        <a className="button button-primary" href={researchEmailUrl(pkg)}>Open prefilled email</a>
        <p className="research-order-help">This opens a draft in your email app. Fill in your details and send it, then return here. Use the same email address at Whop checkout.</p>
        <p className="research-order-help">Email app didn&apos;t open? Send your details to <a href={`mailto:${RESEARCH_EMAIL}`}>{RESEARCH_EMAIL}</a> from your usual email service. Include <strong>{pkg.name}</strong> in the subject.</p>
      </section>
      <section aria-labelledby="payment-step-heading">
        <p className="research-order-step">Step 2 of 2</p>
        <h2 id="payment-step-heading">Continue to payment.</h2>
        <p className="founder-bio">{pkg.name} · ${pkg.price} USD · one-time purchase. Whop confirms availability and shows any tax before you pay.</p>
        <label className="research-email-confirmation">
          <input type="checkbox" checked={emailSent} onChange={(event) => setEmailSent(event.target.checked)} aria-describedby="email-confirmation-help" />
          <span>I&apos;ve sent my product details to Orit.</span>
        </label>
        <p id="email-confirmation-help" className="research-order-help">We can&apos;t check whether you&apos;ve sent an email from this page. Confirm after sending to unlock checkout.</p>
        {emailSent ? (
          <a className="button button-primary" href={pkg.checkoutUrl}>Continue to Whop payment</a>
        ) : (
          <button className="button button-primary" disabled aria-describedby="email-confirmation-help">Continue to Whop payment</button>
        )}
        <noscript><p className="research-order-help">Enable JavaScript to confirm you&apos;ve emailed your details and continue to payment.</p></noscript>
      </section>
    </div>
  );
}
