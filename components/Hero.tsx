import { ResearchActions } from "@/components/ResearchActions";
import { HeroPixelScene } from "@/components/HeroPixelScene";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-backdrop" aria-hidden="true">
        <img className="hero-landscape" src="/assets/orit-city-hero.png" alt="" />
        <HeroPixelScene />
      </div>
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-content">
        <h1 className="hero-title" id="hero-heading">Real Human Insight. Smarter Launches.</h1>
        <div className="hero-waitlist">
          <p className="research-intro">AI-powered research and real human feedback to help your brand decide what to launch and what to improve.</p>
          <ResearchActions secondary="process" />
        </div>
      </div>
    </section>
  );
}
