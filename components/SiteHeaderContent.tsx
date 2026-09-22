import { BrandMark } from "@/components/BrandMark";

export function SiteHeaderContent() {
  return (
    <>
      <a className="brand" href="/" aria-label="Orit home">
        <BrandMark className="brand-mark" />
        <span className="brand-name">Orit</span>
      </a>
      <nav className="header-nav" aria-label="Site navigation">
        <a href="/#features">Features</a>
        <a href="/about">About us</a>
      </nav>
      <div className="header-actions">
        <a className="button button-contact" href="https://tally.so/r/Ek202N" target="_blank" rel="noopener">
          Contact us
        </a>
        <a className="button button-header-waitlist" href="/#waitlist">
          Join waitlist
        </a>
      </div>
    </>
  );
}
