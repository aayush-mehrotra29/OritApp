import { BrandMark } from "@/components/BrandMark";
import { ResearchActions } from "@/components/ResearchActions";
import { HeroPixelScene } from "@/components/HeroPixelScene";

export function SiteFooter() {
  return (
    <div className="footer-reveal">
      <div className="footer-art" aria-label="Pixelated city view">
        <div className="footer-backdrop" aria-hidden="true">
          <img src="/assets/orit-footer-city.png" alt="" />
          <HeroPixelScene imageSrc="/assets/orit-footer-city.png" focusY={1} zoom={1.12} />
        </div>
      </div>
      <footer className="site-footer">
        <section className="footer-panel" id="contact" aria-labelledby="contact-heading">
          <div className="footer-panel-content">
            <div className="footer-copy">
              <h2 id="contact-heading">Test your idea before launch.</h2>
            </div>
            <ResearchActions />
          </div>
        </section>
        <div className="footer-chrome">
          <a className="footer-logo" href="/" aria-label="Orit home"><BrandMark className="brand-mark" /><span>Orit</span></a>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="/about">About Orit</a>
            <a href="https://tally.so/r/Ek202N" target="_blank" rel="noopener">Contact</a>
          </nav>
          <p className="footer-copyright">© 2026 Orit</p>
        </div>
      </footer>
      <div className="footer-reveal-spacer" aria-hidden="true" />
    </div>
  );
}
