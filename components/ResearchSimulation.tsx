"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./ResearchSimulation.module.css";

const PHASES = ["Explore the market", "Hear different perspectives", "Compare the evidence"];
const LABELS = ["Market evidence", "AI assumptions", "Human feedback"];
const PARTICLES = Array.from({ length: 540 }, (_, index) => ({
  group: index % 3,
  position: Math.floor(index / 3) / 179,
  angle: index * 2.399963229728653,
  radius: Math.sqrt(((index * 73) % 181) / 181),
}));
const PHASE_DURATION = 7000;
const smooth = (value: number) => value * value * (3 - 2 * value);

export function ResearchSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduce = reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const palette = getComputedStyle(canvas);
    const paper = palette.getPropertyValue("--paper").trim();
    const muted = palette.getPropertyValue("--muted").trim();
    const ember = palette.getPropertyValue("--ember").trim();
    const colors = [paper, muted, ember];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    let previous = 0;
    let lastPhase = -1;

    function point(index: number, step: number, time: number): [number, number] {
      const particle = PARTICLES[index];
      const { group, position, angle, radius } = particle;
      if (step === 0) {
        // A perspective field of market signals, with a slow travelling wave.
        const column = index % 30;
        const row = Math.floor(index / 30);
        const depth = row / 17;
        return [
          width * (.5 + (column / 29 - .5) * (.52 + depth * .42)),
          height * (.29 + depth * .41) + Math.sin(column * .22 + row * .25 + time * .00045) * height * .022,
        ];
      }
      if (step === 1) {
        // Conceptual groups, not a count of actual research participants.
        const turn = angle + time * .00006 * (group === 1 ? -1 : 1);
        const centers = [[.3, .44], [.7, .44], [.5, .65]];
        const spread = Math.min(width * .2, height * .15);
        return [width * centers[group][0] + Math.cos(turn) * radius * spread,
          height * centers[group][1] + Math.sin(turn) * radius * spread * .65];
      }
      // Three illustrative traces preserve differences between evidence sources.
      return [width * (.12 + position * .76), height * (.38 + group * .1)
        + Math.sin(position * 8 + group * 1.4) * height * .042
        + Math.cos(position * 15 + group) * height * .012];
    }

    function draw() {
      if (!canvas || !context || !width || !height) return;
      const time = reduce ? PHASE_DURATION * 2 + 2500 : elapsedRef.current;
      const step = Math.floor(time / PHASE_DURATION) % 3;
      const fraction = time % PHASE_DURATION / PHASE_DURATION;
      const blend = smooth(Math.min(1, fraction / .3));
      const from = (step + 2) % 3;
      if (lastPhase !== step) { lastPhase = step; setPhase(step); }
      context.clearRect(0, 0, width, height);

      // A quiet plotting grid stays inside the replacement media panel.
      context.strokeStyle = paper;
      context.lineWidth = .7;
      context.globalAlpha = .07;
      for (let row = 0; row < 7; row++) {
        const y = height * (.28 + row * .075);
        context.beginPath(); context.moveTo(width * .08, y); context.lineTo(width * .92, y); context.stroke();
      }
      for (let column = 0; column < 9; column++) {
        const x = width * (.08 + column * .105);
        context.beginPath(); context.moveTo(x, height * .28); context.lineTo(x, height * .73); context.stroke();
      }

      const traceOpacity = step === 2 ? blend : from === 2 ? 1 - blend : 0;
      if (traceOpacity > 0) {
        for (let group = 0; group < 3; group++) {
          context.beginPath();
          for (let index = group; index < PARTICLES.length; index += 3) {
            const [x, y] = point(index, 2, time);
            if (index === group) context.moveTo(x, y); else context.lineTo(x, y);
          }
          context.strokeStyle = colors[group];
          context.lineWidth = 1.25;
          context.globalAlpha = .6 * traceOpacity;
          context.setLineDash(group === 1 ? [4, 5] : []);
          context.stroke();
        }
        context.setLineDash([]);
      }

      PARTICLES.forEach((particle, index) => {
        const start = point(index, from, time);
        const end = point(index, step, time);
        const x = start[0] + (end[0] - start[0]) * blend;
        const y = start[1] + (end[1] - start[1]) * blend;
        const scatterOpacity = step === 2 ? 1 - blend * .65 : from === 2 ? .35 + blend * .65 : 1;
        context.globalAlpha = (.3 + particle.radius * .55) * scatterOpacity;
        context.fillStyle = colors[particle.group];
        context.strokeStyle = colors[particle.group];
        const size = Math.max(.9, Math.min(width / 310, 2));
        context.beginPath();
        context.arc(x, y, particle.group === 2 ? size * 1.2 : size, 0, Math.PI * 2);
        if (particle.group === 2) { context.lineWidth = .85; context.stroke(); } else context.fill();
      });
      context.globalAlpha = 1;
    }

    function tick(now: number) {
      frame = 0;
      if (previous) elapsedRef.current += Math.min(now - previous, 80);
      previous = now;
      draw();
      if (visible && !paused && !reduce && !document.hidden) frame = requestAnimationFrame(tick);
    }
    function syncPlayback() {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
      draw();
      if (visible && !paused && !reduce && !document.hidden) frame = requestAnimationFrame(tick);
    }
    const resize = new ResizeObserver(() => {
      width = canvas.clientWidth; height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncPlayback(); }, { threshold: .05 });
    resize.observe(canvas);
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect(); intersection.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [paused, reducedMotion]);

  return (
    <figure className={styles.simulation} aria-label="Illustration of market signals forming groups and comparison graphs. No actual participant data or results are shown.">
      <canvas className={styles.canvas} ref={canvasRef} aria-hidden="true" />
      <div className={styles.heading}>
        <p className={styles.eyebrow}>AI research. Human insight.</p>
        <p className={styles.title}>A clearer picture.</p>
      </div>
      {!reducedMotion && <button className={`button button-contact ${styles.pause}`} type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play research animation" : "Pause research animation"}>
        {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
      </button>}
      <div className={styles.legend} aria-hidden="true">
        {LABELS.map((label, index) => <span key={label}><i data-group={index} />{label}</span>)}
      </div>
      <figcaption className={styles.caption}>
        <div className={styles.phase}><span className={styles.step}>{String(phase + 1).padStart(2, "0")}</span><span>{PHASES[phase]}</span></div>
        <p>Illustrative animation · no study data</p>
      </figcaption>
    </figure>
  );
}
