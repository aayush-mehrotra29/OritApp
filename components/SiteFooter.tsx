import { BrandMark } from "@/components/BrandMark";
import { WaitlistForm } from "@/components/WaitlistForm";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="footer-panel" id="funding" aria-labelledby="waitlist-heading">
        <span id="waitlist" className="anchor-target" aria-hidden="true" />
        <div className="footer-panel-content">
          <div className="footer-copy">
            <h2 id="waitlist-heading">Build with intelligent feedback on your iOS applications.</h2>
          </div>
          <WaitlistForm />
        </div>
      </section>
      <div className="footer-chrome">
        <a className="footer-logo" href="#top" aria-label="Orit home"><BrandMark className="brand-mark" /><span>Orit</span></a>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#about">About Orit</a>
          <a href="https://tally.so/r/Ek202N" target="_blank" rel="noopener">Contact</a>
        </nav>
        <p className="footer-copyright">© 2026 Orit</p>
      </div>
    </footer>
  );
}
