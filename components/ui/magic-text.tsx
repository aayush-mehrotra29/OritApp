"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface MagicTextProps {
  text: string;
  progress: number;
}

function Word({ text, progress, range, revealAll }: {
  text: string;
  progress: number;
  range: [number, number];
  revealAll: boolean;
}) {
  const opacity = Math.min(1, Math.max(0, (progress - range[0]) / (range[1] - range[0])));

  return (
    <span className="magic-word">
      <span className="magic-word-ghost" aria-hidden="true">{text}</span>
      <motion.span className="magic-word-reveal" style={{ opacity: revealAll ? 1 : opacity }}>{text}</motion.span>
    </span>
  );
}

export function MagicText({ text, progress }: MagicTextProps) {
  const revealAll = useReducedMotion() ?? false;
  const words = text.trim().split(/\s+/);

  return (
    <p className="magic-text">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${index}-${word}`}>
            <Word
              text={word}
              progress={progress}
              range={[index / words.length, (index + 1) / words.length]}
              revealAll={revealAll}
            />
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </p>
  );
}
