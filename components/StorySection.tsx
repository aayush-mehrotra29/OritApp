import { ResearchSimulation } from "@/components/ResearchSimulation";
import { PhoneLandscape } from "@/components/PhoneLandscape";
import { FeatureIcon } from "@/components/FeatureIcon";

export function StorySection() {
  return (
    <section className="story" id="features" data-feature-story aria-label="Research built around real decisions">
      <div className="story-inner">
        <div className="story-copy">
          <article className="story-block">
            <div className="feature-heading"><FeatureIcon kind="search" /><h2>Know what to improve</h2></div>
            <p>Compare product ideas, packaging, prices, or messages before you invest more. Orit uses AI to study competitors, customer reviews, and market information. We find possible weak spots and questions to put to real people.</p>
          </article>
          <article className="story-block">
            <div className="feature-heading"><FeatureIcon kind="people" /><h3>Real people. Real perspectives.</h3></div>
            <p>Every package includes fresh feedback from real people selected for your audience and research question. They review your actual idea or offer and explain what they like, what confuses them, and what puts them off. Their answers help check the AI analysis. A small study can reveal useful problems, but cannot predict the whole market or guarantee sales.</p>
          </article>
          <article className="story-block" id="how-it-works">
            <div className="feature-heading"><FeatureIcon kind="replay" /><h3>From ideas to real insight</h3></div>
            <p>Tell us what you want to decide, who your customers are, and what you want to test. We research the market, gather real feedback, and send a clear report with suggested improvements and next steps.</p>
            <p>Your report keeps market facts, AI assumptions, and human answers separate. It shows who took part, how they were selected, what we asked, where answers differed, and what remains uncertain.</p>
          </article>
        </div>
        <aside className="phone-stage" aria-label="Illustrative research animation">
          <PhoneLandscape />
          <ResearchSimulation />
        </aside>
      </div>
    </section>
  );
}
