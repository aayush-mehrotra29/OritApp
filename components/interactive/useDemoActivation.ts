"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

let stopActiveTouchDemo: (() => void) | null = null;

export function useDemoActivation() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let resetTimer = 0;

    if (finePointer) {
      const play = () => {
        window.clearTimeout(resetTimer);
        setActive(true);
      };
      const reset = () => {
        resetTimer = window.setTimeout(() => setActive(false), 180);
      };
      const onFocusOut = (event: FocusEvent) => {
        if (!node.contains(event.relatedTarget as Node | null)) reset();
      };

      node.addEventListener("pointerenter", play);
      node.addEventListener("pointerleave", reset);
      node.addEventListener("focusin", play);
      node.addEventListener("focusout", onFocusOut);

      return () => {
        window.clearTimeout(resetTimer);
        node.removeEventListener("pointerenter", play);
        node.removeEventListener("pointerleave", reset);
        node.removeEventListener("focusin", play);
        node.removeEventListener("focusout", onFocusOut);
      };
    }

    let hasPlayed = false;
    const stopThisDemo = () => setActive(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.65 && !hasPlayed) {
          stopActiveTouchDemo?.();
          stopActiveTouchDemo = stopThisDemo;
          hasPlayed = true;
          setActive(true);
        } else if (entry.intersectionRatio < 0.4) {
          setActive(false);
          hasPlayed = false;
          if (stopActiveTouchDemo === stopThisDemo) stopActiveTouchDemo = null;
        }
      },
      { threshold: [0, 0.4, 0.65, 1] },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (stopActiveTouchDemo === stopThisDemo) stopActiveTouchDemo = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) setActive(false);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return { ref, active: active && !reducedMotion, reducedMotion };
}
