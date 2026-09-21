import { CustomAgentBuilderDemo } from "@/components/interactive/OritDemos";

export function TaskSection() {
  return (
    <section className="article-section feature-detail-section" aria-labelledby="task-heading">
      <h2 id="task-heading">Give agents a goal, not a script</h2>

      <div className="feature-detail-grid">
        <article className="detail-card">
          <div className="detail-card__copy">
            <h3>Describe what done looks like</h3>
            <p>Ask an agent to book a ride, finish onboarding, or change a payment method. It works through the interface without a tap-by-tap script.</p>
          </div>
          <div className="detail-card__visual tone-mist">
            <CustomAgentBuilderDemo />
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-card__copy">
            <h3>Let the agent find its way</h3>
            <p>If the app takes an unexpected turn, the agent can pause, choose another path, and keep working toward the same outcome.</p>
          </div>
          <div className="detail-card__visual tone-lichen">
            <div className="task-path" aria-hidden="true">
              <span>Open checkout</span><i />
              <span>Choose a card</span><i />
              <span className="is-shifted">Find another route</span><i />
              <span>Finish payment</span>
            </div>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-card__copy">
            <h3>Rerun the task under new conditions</h3>
            <p>Change the language, text size, experience level, or device state. The goal stays the same while the person using the app changes.</p>
          </div>
          <div className="detail-card__visual tone-stone">
            <div className="task-conditions" aria-hidden="true">
              <span>First-time user</span>
              <span>German</span>
              <span>Larger text</span>
              <span>Low bandwidth</span>
              <strong>One goal.<br />Four different conditions.</strong>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
