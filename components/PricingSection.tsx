import { CONTACT_URL, RESEARCH_SALES_ENABLED, researchPackages, researchFaqs } from "@/lib/research";

export function PricingSection() {
  return (
    <section className="research-pricing" id="pricing" aria-labelledby="pricing-heading">
      <header className="story-block research-pricing-heading">
        <h2 id="pricing-heading">Real insight. One project at a time.</h2>
        <p>From $59 per project. Both packages include AI research and fresh feedback from real people.</p>
      </header>
      {RESEARCH_SALES_ENABLED ? (
        <p className="research-availability" id="research-availability">Limited launch: one project per package. Availability is confirmed at checkout. <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Ask us about your project.</a></p>
      ) : (
        <p className="research-availability" id="research-availability">Purchases are not open yet. We are checking who can take part and what each study can cover. <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Contact us about your project.</a></p>
      )}
      <div className="research-pricing-grid">
        {researchPackages.map((pkg) => (
          <article className="story-block research-package" key={pkg.slug} aria-labelledby={`${pkg.slug}-heading`}>
            <h3 id={`${pkg.slug}-heading`}>{pkg.name}</h3>
            <p className="research-price">${pkg.price} <span>USD · one-time purchase</span></p>
            <p>{pkg.tagline}</p>
            <p>{pkg.description}</p>
            <ul>{pkg.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            {RESEARCH_SALES_ENABLED ? (
              <a className="button button-primary" href={pkg.checkoutUrl}>Get {pkg.name}</a>
            ) : (
              <button className="button button-primary" type="button" disabled aria-describedby="research-availability">Get {pkg.name}</button>
            )}
          </article>
        ))}
      </div>
      <p className="research-disclosure">Small studies help test ideas, but do not represent the whole market or guarantee sales. Contact us before buying if you need a specific audience, study size, or deadline. These packages include consumer feedback; specialist experts need a separate quote.</p>
      <div className="research-faq" aria-label="Research questions and purchase information">
        {researchFaqs.map(([question, answer]) => (
          <details key={question}><summary>{question}</summary><p>{answer}</p></details>
        ))}
      </div>
    </section>
  );
}
