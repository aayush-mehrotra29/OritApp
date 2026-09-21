import { FlapBoard } from "@/components/FlapBoard";
import { MobileAgentDemo } from "@/components/interactive/OritDemos";

export function AgentsSection() {
  return (
    <section className="product-section product-section--agents" aria-labelledby="agents-heading">
      <div className="agents-intro">
        <h2 id="agents-heading">Test the parts that decide whether you ship</h2>
      </div>

      <div className="agents-grid">
        <article className="agent-card agent-card--review">
          <div className="agent-copy">
            <h3>Be ready for App Review</h3>
            <p>Orit follows the paths Apple is likely to inspect and finds crashes, dead ends, missing details, and permission prompts that arrive without context.</p>
          </div>
          <div className="agent-visual">
            <MobileAgentDemo />
          </div>
        </article>

        <article className="agent-card agent-card--a11y">
          <div className="agent-copy">
            <h3>See whether the app is actually accessible</h3>
            <p>Agents change text size and accessibility settings, then finish real tasks. You see where the experience breaks, not just whether a checklist passes.</p>
          </div>
          <div className="agent-visual">
            <svg className="agent-svg agent-svg--a11y" viewBox="0 0 280 200" aria-hidden="true">
              <circle cx="140" cy="100" r="80" fill="none" stroke="var(--ink)" strokeOpacity=".1" strokeDasharray="1 7" />
              <circle cx="140" cy="100" r="62" fill="none" stroke="var(--ink)" strokeOpacity=".14" />
              <circle cx="140" cy="100" r="46" fill="none" stroke="var(--ink)" strokeOpacity=".22" />
              <circle className="ping" cx="140" cy="100" r="30" fill="none" stroke="var(--ember)" strokeWidth="1.5" />
              <circle cx="140" cy="100" r="30" fill="none" stroke="var(--ink)" strokeOpacity=".5" />
              <ellipse cx="140" cy="100" rx="17" ry="9.5" fill="none" stroke="var(--ink)" strokeWidth="2" />
              <circle cx="140" cy="100" r="5" fill="var(--ink)" />
              <circle cx="143" cy="97" r="1.6" fill="var(--surface)" />
              <g className="orbit" style={{ transformOrigin: "140px 100px" }}>
                <rect x="134" y="14" width="12" height="12" rx="3" fill="var(--ember)" />
                <circle cx="220" cy="100" r="6" fill="#7c9d6f" />
                <rect x="134" y="174" width="12" height="12" rx="3" fill="#6f90ad" />
                <circle cx="60" cy="100" r="6" fill="#d98a95" />
              </g>
            </svg>
          </div>
        </article>

        <article className="agent-card agent-card--locale">
          <div className="agent-copy">
            <h3>Test every language inside the app</h3>
            <p>Run the product in different languages and regions to find clipped text, missing translations, unexpected formatting, and layouts that no longer fit.</p>
          </div>
          <div className="agent-visual">
            <FlapBoard />
          </div>
        </article>

        <article className="agent-card agent-card--security">
          <div className="agent-copy">
            <h3>Catch security mistakes during the run</h3>
            <p>Orit reads the project while the agent works, looking for exposed secrets, weak authentication, unsafe data handling, and permissions that ask for too much.</p>
          </div>
          <div className="agent-visual">
            <svg className="agent-svg agent-svg--security" viewBox="0 0 280 200" aria-hidden="true">
              <circle cx="140" cy="100" r="72" fill="none" stroke="var(--ink)" strokeOpacity=".14" />
              <circle cx="140" cy="100" r="52" fill="none" stroke="var(--ink)" strokeOpacity=".2" />
              <circle cx="140" cy="100" r="32" fill="none" stroke="var(--ink)" strokeOpacity=".28" />
              <g className="sweep" style={{ transformOrigin: "140px 100px" }}>
                <path d="M140 100 L140 28 A72 72 0 0 1 202 64 Z" fill="var(--ember)" opacity=".16" />
              </g>
              <g className="nodes">
                <circle cx="140" cy="28" r="5" fill="var(--ember)" />
                <circle cx="202" cy="64" r="5" fill="#7c9d6f" />
                <circle cx="202" cy="136" r="5" fill="#6f90ad" />
                <circle cx="140" cy="172" r="5" fill="#d98a95" />
                <circle cx="78" cy="136" r="5" fill="var(--ink)" fillOpacity=".5" />
                <circle cx="78" cy="64" r="5" fill="var(--ink)" fillOpacity=".3" />
              </g>
              <rect x="128" y="94" width="24" height="18" rx="3" fill="var(--ink)" />
              <path d="M132 94v-8a8 8 0 0 1 16 0v8" fill="none" stroke="var(--ink)" strokeWidth="2.4" />
              <circle cx="140" cy="102" r="2" fill="var(--surface)" />
            </svg>
          </div>
        </article>
      </div>
    </section>
  );
}
