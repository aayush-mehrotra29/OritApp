import type { Metadata } from "next";
import { BrandMark } from "@/components/BrandMark";
import { ErrorEmbers } from "@/components/ErrorEmbers";

export const metadata: Metadata = {
  title: "Page not found | Orit",
  description: "This page doesn't exist. Head back to Orit.",
  robots: "noindex",
};

export default function NotFound() {
  return (
    <>
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Orit home">
          <BrandMark className="brand-mark" />
          <span className="brand-name">Orit</span>
        </a>
        <div className="header-actions">
          <a className="button button-contact" href="https://tally.so/r/Ek202N" target="_blank" rel="noopener">
            Contact Us
          </a>
          <a className="button button-header-waitlist" href="/#waitlist">
            Waitlist
          </a>
        </div>
      </header>

      <main>
        <section className="error-page" aria-labelledby="error-heading">
          <ErrorEmbers />
          <p className="error-code" aria-hidden="true">404</p>
          <h1 id="error-heading" className="error-title">This page took a wrong turn.</h1>
          <p className="error-copy">The link might be broken, or the page may have moved.</p>
          <div className="error-actions">
            <a className="button button-contact error-home" href="/">Back to Orit</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-chrome">
          <div className="footer-content">
            <a className="footer-logo" href="/" aria-label="Orit home">
              <BrandMark />
            </a>
            <nav className="footer-links" aria-label="Footer navigation">
              <div>
                <span>Product</span>
                <a href="/#features">Features</a>
                <a href="/#waitlist">Waitlist</a>
              </div>
              <div>
                <span>Company</span>
                <a href="/about">About us</a>
                <a href="https://tally.so/r/Ek202N" target="_blank" rel="noopener">
                  Contact
                </a>
              </div>
            </nav>
            <p className="footer-copyright">© 2026 Orit</p>
          </div>
        </div>
      </footer>
    </>
  );
}
