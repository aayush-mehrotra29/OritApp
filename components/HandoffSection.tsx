import { RunReplayDemo } from "@/components/interactive/OritDemos";

const REVIEW_FEATURES = [
  {
    tone: "tone-stone",
    title: "Replay every step",
    copy: "Watch the exact sequence of screens, taps, pauses, and decisions. When a run fails, you can see the moment it went wrong.",
    visual: <RunReplayDemo />,
  },
  {
    tone: "tone-lilac",
    title: "Compare the same flow across users",
    copy: "Put two runs side by side and see where language, accessibility settings, or product experience changed the result.",
    visual: (
      <div className="run-compare" aria-hidden="true">
        <div className="run-compare__column">
          <span>New user</span><b>Finished</b>
          <i style={{ width: "86%" }} /><i style={{ width: "64%" }} /><i style={{ width: "74%" }} />
        </div>
        <div className="run-compare__column">
          <span>Large text</span><b>Blocked</b>
          <i style={{ width: "86%" }} /><i style={{ width: "43%" }} /><i className="is-blocked" style={{ width: "28%" }} />
        </div>
      </div>
    ),
  },
  {
    tone: "tone-lichen",
    title: "Send the fix with context",
    copy: "Every issue includes the screen, steps to reproduce, and nearby code. Your coding agent can start with the evidence already attached.",
    visual: (
      <div className="issue-brief" aria-hidden="true">
        <span className="issue-brief__label">Ready to fix</span>
        <strong>Payment sheet cannot be dismissed</strong>
        <p>Reproduced in 3 of 4 runs</p>
        <div><span>Screen recording</span><span>Steps</span><span>Files</span></div>
      </div>
    ),
  },
];

export function HandoffSection() {
  return (
    <section className="article-section feature-detail-section" aria-labelledby="handoff-heading">
      <h2 id="handoff-heading">See the run from the agent's side</h2>
      <div className="feature-detail-grid">
        {REVIEW_FEATURES.map((feature) => (
          <article className="detail-card" key={feature.title}>
            <div className="detail-card__copy">
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </div>
            <div className={`detail-card__visual ${feature.tone}`}>{feature.visual}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
