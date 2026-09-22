import { WaitlistForm } from "@/components/WaitlistForm";
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
        <h1 className="hero-title" id="hero-heading">Orit uses AI agents to simulate how different users experience your iOS app before you ship it.</h1>
        <div className="hero-waitlist">
          <WaitlistForm idPrefix="hero-" />
        </div>
      </div>
    </section>
  );
}
