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
        <h2 id="abstract-heading" className="abstract-heading">The Power of AI. The Perspective of People.</h2>
        <MagicText
          progress={progress}
          text="Better decisions start with real insight. Before investing in products, packaging, or marketing, understand how people might respond. Orit combines AI-powered market intelligence with new feedback from real participants. AI explores competitors, public reviews, and possible objections. People bring their own preferences and experiences, challenging the assumptions behind the analysis. Every research package brings both together in a practical brief, helping small consumer brands compare options, uncover weaknesses, and decide what to test next. Small studies reveal perspectives, not guaranteed demand."
        />
      </div>
    </section>
  );
}
