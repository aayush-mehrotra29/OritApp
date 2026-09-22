import { PhoneLandscape } from "@/components/PhoneLandscape";
import { FeatureIcon } from "@/components/FeatureIcon";

export function StorySection() {
  return (
    <section className="story" id="features" data-feature-story aria-label="Ways to use Orit">
      <div className="story-inner">
        <div className="story-copy">
          <article className="story-block">
            <div className="feature-heading"><FeatureIcon kind="search" /><h2>Find friction</h2></div>
            <p>A build can pass every automated check and still lose someone halfway through a task. Send Orit&apos;s AI agents through first launch, permissions, checkout, settings, and App Review sensitive flows in the iOS simulator. See the exact screen and step where an agent hesitates, loops, or gets stuck, so your team knows what to revisit before release.</p>
          </article>
          <article className="story-block">
            <div className="feature-heading"><FeatureIcon kind="people" /><h3>Every perspective</h3></div>
            <p>The same flow can feel effortless to one person and impossible to another. Run it again with different languages, larger text, accessibility needs, device settings, or levels of familiarity with your app. Compare the paths agents take to find copy that does not translate, controls that become hard to reach, and assumptions in your design that only work for some users.</p>
          </article>
          <article className="story-block">
            <div className="feature-heading"><FeatureIcon kind="replay" /><h3>Replay the journey</h3></div>
            <p>When something goes wrong, a vague failure label is not enough. Orit shows the screens, taps, pauses, and decisions that led to the outcome. Product, design, and engineering can review the same journey, understand why it broke for that kind of user, and make a focused change before putting the app in real people&apos;s hands.</p>
          </article>
        </div>
        <aside className="phone-stage" aria-label="Two Orit agents testing an iOS app">
          <PhoneLandscape />
          <object className="phone-object" data="/assets/orit-two-phones-v10.svg?v=straight-white-2" type="image/svg+xml">
            <img src="/assets/paper-phone.png" alt="An iPhone app flow tested by Orit." />
          </object>
        </aside>
      </div>
    </section>
  );
}
