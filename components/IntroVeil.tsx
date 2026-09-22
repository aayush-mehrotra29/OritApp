"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TEXT_HOLD_MS = 2000;
const TEXT_FADE_OUT_MS = 650; // matches .intro-veil-text opacity transition
const STAIRS_EXIT_MS = 800 + 315 + 150; // longest stair delay + its transition + buffer

export function IntroVeil() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(true);
  const [textVisible, setTextVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (reducedMotion || window.location.hash) {
      setSkip(true);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const timers: number[] = [];
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setTextVisible(true));
      timers.push(raf2);
    });

    const holdTimer = window.setTimeout(() => {
      setTextVisible(false);
      const fadeTimer = window.setTimeout(() => {
        setExiting(true);
        document.documentElement.style.overflow = "";
        const exitTimer = window.setTimeout(() => setMounted(false), STAIRS_EXIT_MS);
        timers.push(exitTimer);
      }, TEXT_FADE_OUT_MS);
      timers.push(fadeTimer);
    }, TEXT_HOLD_MS);
    timers.push(holdTimer);

    return () => {
      cancelAnimationFrame(raf1);
      timers.forEach((id) => {
        window.clearTimeout(id);
        cancelAnimationFrame(id);
      });
      document.documentElement.style.overflow = "";
    };
  }, [reducedMotion]);

  if (skip || !mounted) return null;

  const classNames = ["intro-veil", textVisible && "is-text-visible", exiting && "is-exiting"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      <div className="intro-veil-stairs">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
      <p className="intro-veil-text">
        <svg className="intro-veil-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <g transform="translate(0 32) scale(1 -1)">
            <path
              d="M16 0C24.837 0 32 7.164 32 16.001C32 17.926 31.659 19.771 31.036 21.48L28.76 19.078L22.278 19.078L28.829 25.563C27.887 26.825 26.763 27.942 25.496 28.878L19.386 22.573L12.905 22.573L21.462 31.043C19.774 31.656 17.955 31.993 16.058 32L9.667 25.444L3.083 25.444C3.049 25.398 3.016 25.353 2.982 25.307C3.312 21.519 2.33 18.868 0 15.922C0.01 13.92 0.387 12.005 1.068 10.24C5.234 14.095 7.41 17.295 6.628 22.573L12.905 22.573C13.513 16.165 10.235 13.01 3.251 6.33C4.148 5.149 5.206 4.097 6.392 3.205C6.421 3.23 6.45 3.257 6.48 3.282C13.151 8.968 17.001 12.318 15.999 19.078L22.278 19.078C22.938 12.118 19.013 8.996 10.733 1.025C10.698 0.992 10.663 0.958 10.628 0.925C12.307 0.326 14.116 0 16 0Z"
              fill="currentColor"
            />
          </g>
        </svg>
        <span>The future of user simulation.</span>
      </p>
    </div>
  );
}
