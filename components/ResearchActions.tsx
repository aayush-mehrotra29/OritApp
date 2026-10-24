import { CONTACT_URL } from "@/lib/research";

export function ResearchActions({ secondary = "contact" }: { secondary?: "contact" | "process" }) {
  return (
    <div className="waitlist-form research-actions">
      <a className="button button-primary" href="/#pricing">Get Started</a>
      {secondary === "process" ? (
        <a className="button button-contact" href="/#how-it-works">How It Works</a>
      ) : (
        <a className="button button-contact" href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Contact Us</a>
      )}
    </div>
  );
}
