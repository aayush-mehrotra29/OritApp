"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollReveal() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".hero-title, .hero-waitlist, .hero-how-it-works", { y: 30, opacity: 0, duration: 1.15, stagger: .09, delay: .15, ease: "power3.out" });
      gsap.to(".hero-landscape", { yPercent: 12, scale: 1.12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".hero-content", { yPercent: 18, opacity: .12, ease: "none", scrollTrigger: { trigger: ".hero", start: "35% top", end: "bottom top", scrub: 1 } });
      gsap.to(".story-orbit", { yPercent: 70, rotate: 50, ease: "none", scrollTrigger: { trigger: ".story", start: "top bottom", end: "bottom top", scrub: 1.3 } });
      gsap.to(".phone-object", { yPercent: -8, rotate: 2.5, ease: "none", scrollTrigger: { trigger: ".story", start: "top bottom", end: "bottom top", scrub: 1.2 } });
      document.querySelectorAll<HTMLElement>(".story-block").forEach((block) => {
        gsap.from(block.children, { y: 34, opacity: 0, duration: .85, stagger: .075, ease: "power3.out", scrollTrigger: { trigger: block, start: "top 74%", once: true } });
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return null;
}
