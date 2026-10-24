import { CONTACT_URL, RESEARCH_SALES_ENABLED, researchPackages, researchFaqs } from "@/lib/research";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <section className="research-pricing" id="pricing" aria-labelledby="pricing-heading">
      <header className="research-pricing-heading">
        <h2 id="pricing-heading">Real insight. One project at a time.</h2>
        <p>Choose the scope that fits your decision. Both fixed-price simulations include AI research and fresh feedback from real people. Pay through Whop, then receive a private email template for your product details.</p>
      </header>
      {RESEARCH_SALES_ENABLED ? (
        <p className="research-availability" id="research-availability">Limited launch: one project per fixed-price package. Availability is confirmed at checkout. <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Ask us about your project.</a></p>
      ) : (
        <p className="research-availability" id="research-availability">Purchases are not open yet. We are connecting verified Whop payments to private project intake. <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Contact us about your project.</a></p>
      )}
      <div className="research-pricing-grid">
        {researchPackages.map((pkg, index) => (
          <article className={`research-package${index === 1 ? " research-package--featured" : ""}`} key={pkg.slug} aria-labelledby={`${pkg.slug}-heading`}>
            <div className="research-package-heading">
              <h3 id={`${pkg.slug}-heading`}>{pkg.name}</h3>
              {index === 1 && <span className="research-package-badge">Deeper study</span>}
            </div>
            <p className="research-package-tagline">{pkg.tagline}</p>
            <p className="research-price">${pkg.price} <span>USD · one-time purchase</span></p>
            <p className="research-package-description">{pkg.description}</p>
            <div className="research-package-rule" aria-hidden="true" />
            <ul>{pkg.features.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
            {RESEARCH_SALES_ENABLED ? (
              <a className="button button-primary" href={`/order?package=${pkg.slug}`}>Choose {pkg.name}</a>
            ) : (
              <button className="button button-primary" type="button" disabled aria-describedby="research-availability">Choose {pkg.name}</button>
            )}
          </article>
        ))}
        <article className="research-package research-package--custom" aria-labelledby="custom-simulation-heading">
          <div className="research-package-heading">
            <h3 id="custom-simulation-heading">Custom Simulation</h3>
          </div>
          <p className="research-package-tagline">For research that needs its own scope.</p>
          <p className="research-price">Custom <span>quote</span></p>
          <p className="research-package-description">Tell us about the product, market, and decision you want to explore. We&apos;ll shape a plan and price around your project.</p>
          <div className="research-package-rule" aria-hidden="true" />
          <ul>
            <li><Check size={16} aria-hidden="true" /><span>Research questions shaped around your product</span></li>
            <li><Check size={16} aria-hidden="true" /><span>Audience, study size, and timing agreed together</span></li>
            <li><Check size={16} aria-hidden="true" /><span>AI research and real human feedback in a tailored plan</span></li>
            <li><Check size={16} aria-hidden="true" /><span>Custom quote before the project begins</span></li>
          </ul>
          <div className="research-custom-actions">
            <a className="button button-contact" href="tel:+15714644236">Call us</a>
            <a className="button button-contact" href="mailto:oritsoftware@gmail.com?subject=Custom%20product%20research">Email us</a>
          </div>
        </article>
      </div>
      <p className="research-disclosure"><span className="research-disclosure-star" aria-hidden="true">*</span><span className="sr-only">Note: </span>Small studies help test ideas, but do not represent the whole market or guarantee sales. Contact us before buying if you need a specific audience, study size, or deadline. The fixed-price packages include consumer feedback; specialist experts need a separate quote.</p>
      <div className="research-faq" aria-label="Research questions and purchase information">
        {researchFaqs.map(([question, answer]) => (
          <details key={question}><summary>{question}</summary><p>{answer}</p></details>
        ))}
      </div>
    </section>
  );
}
