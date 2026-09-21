import { ChatbotHandoffDemo, MacAgentDemo, MultiAgentMissionControlDemo } from "@/components/interactive/OritDemos";

const WORKFLOW_FEATURES = [
  {
    tone: "tone-mist",
    title: "Run from your Mac",
    copy: "Choose a project, launch a focused test, and review the result without leaving your desktop.",
    visual: <MacAgentDemo />,
  },
  {
    tone: "tone-stone",
    title: "Test in parallel",
    copy: "Send agents through different flows at the same time. Follow every run from one view and open the ones that need attention.",
    visual: <MultiAgentMissionControlDemo />,
  },
  {
    tone: "tone-lilac",
    title: "Hand issues to your coding agent",
    copy: "Start a run with a plain-language request, follow the work, and send the complete issue back to the tool where you build.",
    visual: <ChatbotHandoffDemo />,
  },
];

export function WorkflowSection() {
  return (
    <section className="article-section feature-detail-section feature-detail-section--workflow" aria-labelledby="workflow-heading">
      <h2 id="workflow-heading">Built for the way you already work</h2>
      <div className="workflow-grid">
        {WORKFLOW_FEATURES.map((feature) => (
          <article className="detail-card" key={feature.title}>
            <div className="detail-card__copy">
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </div>
            <div className={`detail-card__visual ${feature.tone}`}>
              {feature.visual}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
