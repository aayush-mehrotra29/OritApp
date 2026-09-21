export function StorySection() {
  return (
    <section className="story" id="about" data-feature-story aria-label="What Orit is and how teams use it">
      <div className="story-ambient" aria-hidden="true"><div className="story-orbit" /></div>
      <div className="story-inner">
        <div className="story-copy">
          <article className="story-block">
            <h2>Abstract</h2>
            <p>Orit is a Mac app that sends AI agents through your iOS app in the simulator. They check App Review issues, accessibility, localization, security, and whatever else matters to your product. You can use the agents that come with Orit or define your own around the people who use your app.</p>
            <p>A build can work and still confuse people. Orit shows you where an agent got stuck, who a flow works for, and what deserves another pass before you hand the app to real users.</p>
          </article>
          <article className="story-block">
            <span className="story-index">01 / Find the friction</span>
            <h3>Test the paths that decide whether you ship.</h3>
            <p>Send agents through onboarding, permissions, checkout, settings, and App Review flows. Orit catches dead ends, unclear copy, clipped layouts, and broken states before your build reaches real people.</p>
            <div className="story-usecases" aria-label="Example use cases">
              <span>First-run onboarding</span><span>Payments</span><span>App Review</span><span>Permissions</span>
            </div>
          </article>
          <article className="story-block">
            <span className="story-index">02 / Change the person</span>
            <h3>One goal. Many kinds of user.</h3>
            <p>Re-run the same task with a new language, larger text, different device settings, or less product experience. See where the journey changes—and who your current design leaves behind.</p>
            <div className="story-usecases" aria-label="Example user conditions">
              <span>Accessibility</span><span>Localization</span><span>First-time users</span><span>Device states</span>
            </div>
          </article>
          <article className="story-block">
            <span className="story-index">03 / Hand off the evidence</span>
            <h3>See the miss. Replay it. Fix it.</h3>
            <p>Every run comes back with the screens, taps, pauses, and decisions that led there. Your team gets the context to reproduce the issue, understand it, and send a focused fix to the coding tools you already use.</p>
          </article>
        </div>
        <aside className="phone-stage" aria-label="Two Orit agents testing an iOS app">
          <div className="phone-halo" aria-hidden="true" />
          <object className="phone-object" data="/assets/orit-two-phones-v10.svg" type="image/svg+xml">
            <img src="/assets/paper-phone.png" alt="An iPhone app flow tested by Orit." />
          </object>
          <span className="phone-caption">Two agents · One goal · Different paths</span>
        </aside>
      </div>
    </section>
  );
}
