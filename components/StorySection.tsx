import { PhoneLandscape } from "@/components/PhoneLandscape";
import { FeatureIcon } from "@/components/FeatureIcon";

export function StorySection() {
  return (
    <section className="story" id="features" data-feature-story aria-label="Research built around real decisions">
      <div className="story-inner">
        <div className="story-copy">
          <article className="story-block">
            <div className="feature-heading"><FeatureIcon kind="search" /><h2>Research real decisions</h2></div>
            <p>Which concept should you launch? Is your pricing clear? What makes a competitor compelling? Orit brings together public market evidence, competitor positioning, customer reviews, and AI-assisted analysis to explore your options. From products and packaging to messaging and offers, we identify the assumptions worth testing before you invest more.</p>
          </article>
          <article className="story-block">
            <div className="feature-heading"><FeatureIcon kind="people" /><h3>Real people. Real perspectives.</h3></div>
            <p>Every package includes new feedback from real participants, screened for your research question and responding to your actual concept or offer. Their preferences, experiences, and objections can support or challenge AI-generated hypotheses. These are actual human responses, clearly separated from simulations. Small qualitative studies reveal useful perspectives; they do not represent the whole market or guarantee sales.</p>
          </article>
          <article className="story-block" id="how-it-works">
            <div className="feature-heading"><FeatureIcon kind="replay" /><h3>From ideas to real insight</h3></div>
            <p>Share your decision, audience, and concept. AI investigates the market and identifies assumptions. Relevant people respond to your materials. You receive an actionable research brief connecting the evidence to improvements and your next test.</p>
            <p>Your brief separates market sources, AI hypotheses, and observed human responses. It explains participant numbers, screening, questions, disagreements, and limitations, so you can see what supports each recommendation.</p>
          </article>
        </div>
        <aside className="phone-stage" aria-label="Illustrative offer screens, not participant responses or research results">
          <PhoneLandscape />
          <object className="phone-object" data="/assets/orit-two-phones-v10.svg?v=research-1" type="image/svg+xml" aria-label="Illustrative offer comparison">
            <img src="/assets/paper-phone.png" alt="Illustrative product screens; no participant results are shown." />
          </object>
        </aside>
      </div>
    </section>
  );
}
