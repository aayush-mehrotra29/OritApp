import { CONTACT_URL, RESEARCH_SALES_ENABLED, researchPackages, researchFaqs } from "@/lib/research";

export function PricingSection() {
  return (
    <section className="research-pricing" id="pricing" aria-labelledby="pricing-heading">
      <header className="story-block research-pricing-heading">
        <h2 id="pricing-heading">Real insight. One project at a time.</h2>
        <p>Research from $59 per project. AI-powered analysis and new feedback from real people, included in both packages.</p>
      </header>
      {!RESEARCH_SALES_ENABLED && (
        <p className="research-availability" id="research-availability">Purchases are not open yet. We are confirming participant availability and study scope. <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Contact us about your project.</a></p>
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
      <p className="research-disclosure">Small qualitative studies help test assumptions; they do not represent the entire market or guarantee sales. Participant scope and expected timing are confirmed before purchase. General consumer feedback is distinct from specialist expertise.</p>
      <div className="research-faq" aria-label="Research questions and purchase information">
        {researchFaqs.map(([question, answer]) => (
          <details key={question}><summary>{question}</summary><p>{answer}</p></details>
        ))}
      </div>
    </section>
  );
}
