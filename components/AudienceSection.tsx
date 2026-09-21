import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";

export function AudienceSection() {
  return (
    <section className="article-section article-section--audience" aria-labelledby="audience-heading">
      <div className="audience-copy">
        <h2 id="audience-heading">Test with the people your app is for</h2>
        <p>Your users do not all move through the app the same way. Define agents by language, accessibility needs, experience, device settings, and the job they came to do.</p>
        <p>Run the same flow as a first-time customer, a daily commuter, or someone using larger text. Orit shows where those paths split, which users finish, and who gets left behind.</p>
      </div>
      <div className="audience-visual">
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
      </div>
    </section>
  );
}
