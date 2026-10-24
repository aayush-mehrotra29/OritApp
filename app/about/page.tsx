import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { AudiencePixelScene } from "@/components/AudiencePixelScene";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "About us | Orit",
  description: "Orit combines AI-powered market intelligence with real human perspectives to make practical research more accessible to growing brands.",
};

const founders = [
  {
    name: "Aayush Mehrotra",
    slug: "aayush",
    image: "/assets/aayush-mehrotra.jpg",
    bio: "Aayush has built multiple apps and AI products, including NodeLab, Inside, and Tesseract. He was the youngest 2026 Swift Student Challenge Distinguished Winner and demonstrated NodeLab to Tim Cook, John Ternus, and Apple engineers at WWDC 2026.",
    website: "https://aayushmehrotra.com/",
    websiteLabel: "aayushmehrotra.com",
    instagram: "https://www.instagram.com/buildwaayush/?hl=en",
    linkedin: "https://www.linkedin.com/in/aayush-mehrotra29/",
  },
  {
    name: "Ishaan Gulati",
    slug: "ishaan",
    image: "/assets/ishaan-gulati.jpg",
    bio: "Ishaan is a 15-year-old developer who has independently shipped three apps, including Pulse, a social paper-trading app on the App Store, and Lumis, a voice-first AI action agent. He co-founded Orit to make practical, human-informed market research accessible to growing brands.",
    website: "https://ishaangulati.com/",
    websiteLabel: "ishaangulati.com",
    instagram: "https://www.instagram.com/builds.ishaan/?hl=en",
    linkedin: "https://www.linkedin.com/in/ishaan-gulati-834a25286/",
  },
] as const;

function InstagramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.8" cy="6.3" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.2 3.1a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM2.5 9h3.4v12H2.5V9Zm5.6 0h3.25v1.65h.05A3.56 3.56 0 0 1 14.6 8.8c3.45 0 4.1 2.25 4.1 5.2v7h-3.4v-6.2c0-1.5-.03-3.4-2.08-3.4-2.1 0-2.42 1.62-2.42 3.3V21H8.1V9Z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="about-page">
        <section className="about-page-hero" aria-labelledby="founders-heading">
          <AudiencePixelScene />
          <div className="founders-inner">
            <h1 id="founders-heading">Intelligence Powered by AI. Grounded in People.</h1>
            <p className="founder-bio">Orit helps small consumer and e-commerce brands evaluate ideas, uncover weaknesses, and move forward with greater clarity. AI accelerates market analysis; real participants bring the perspectives that challenge it. Our goal is to make meaningful customer insight part of more business decisions.</p>
            <div className="founders-list">
              {founders.map((founder) => (
                <article className="founder-profile" key={founder.slug}>
                  <div className="founder-photo">
                    <img className={`founder-portrait founder-portrait--${founder.slug}`} src={founder.image} alt={founder.name} loading="lazy" decoding="async" />
                  </div>
                  <div className="founder-details">
                    <div className="founder-heading-row">
                      <div>
                        <h3>{founder.name}</h3>
                        <p className="founder-role">Co-founder</p>
                      </div>
                      <div className="founder-socials" aria-label={`${founder.name} social profiles`}>
                        <a href={founder.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${founder.name} on Instagram`}><InstagramIcon /></a>
                        <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${founder.name} on LinkedIn`}><LinkedInIcon /></a>
                      </div>
                    </div>
                    <p className="founder-bio">{founder.bio}</p>
                    <a className="founder-website" href={founder.website} target="_blank" rel="noopener noreferrer">{founder.websiteLabel}<ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
