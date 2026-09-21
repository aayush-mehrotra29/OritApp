"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FooterPanelVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) video.pause();
    else video.play().catch(() => {});
  }, [reducedMotion]);

  return (
    <video className="footer-panel-bg" ref={videoRef} autoPlay muted loop playsInline aria-hidden="true">
      <source src="/assets/cloudscape-loop.webm" type="video/webm" />
      <source src="/assets/cloudscape-loop.mp4" type="video/mp4" />
    </video>
  );
}
