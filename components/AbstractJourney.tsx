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
        <h2 id="abstract-heading" className="abstract-heading">AI research. Human insight.</h2>
        <MagicText
          progress={progress}
          text="Orit helps brands test ideas before launch. AI researches your market. Real people respond to your product, packaging, or offer. We bring both together in a clear report showing what to improve and what to test next."
        />
      </div>
    </section>
  );
}
