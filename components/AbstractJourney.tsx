"use client";

import { useEffect, useRef, useState } from "react";
import { MagicText } from "@/components/ui/magic-text";
import { AudiencePixelScene } from "@/components/AudiencePixelScene";

export function AbstractJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const { top, height } = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -top / scrollDistance)));
    };
    const queueUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="abstract-journey" id="about" aria-labelledby="abstract-heading">
      <div className="abstract-inner">
        <AudiencePixelScene progress={progress} />
        <h2 id="abstract-heading" className="abstract-heading">Abstract</h2>
        <MagicText
          progress={progress}
          text="Orit is a Mac app that sends AI agents through your iOS app in the simulator. They check App Review issues, accessibility, localization, security, and whatever else matters to your product. You can use the agents that come with Orit or define your own around the people who use your app. A build can work and still confuse people. Orit shows you where an agent got stuck, who a flow works for, and what deserves another pass before you hand the app to real users."
        />
      </div>
    </section>
  );
}
