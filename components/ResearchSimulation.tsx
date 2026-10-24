"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./ResearchSimulation.module.css";

const PHASE_DURATION = 4800;
const PIXEL_SIZE = 4;
const PARTICLE_COUNT = 720;
const FRAME_INTERVAL = 1000 / 30;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const hash = (value: number) => {
  const result = Math.sin(value * 127.1 + 78.233) * 43758.5453;
  return result - Math.floor(result);
};
const ease = (value: number) => value * value * (3 - 2 * value);

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
  const y = 1 - (index + 0.5) * 2 / PARTICLE_COUNT;
  const circle = Math.sqrt(1 - y * y);
  const angle = index * GOLDEN_ANGLE;
  return {
    x: Math.cos(angle) * circle,
    y,
    z: Math.sin(angle) * circle,
    u: hash(index + 1),
    v: hash(index + 1337),
    glint: hash(index + 7117),
  };
});

type Point = { x: number; y: number; depth: number };

function particlePosition(index: number, phase: number, time: number, width: number, height: number): Point {
  const particle = PARTICLES[index];
  const centerX = width * 0.5;
  const centerY = height * 0.51;

  if (phase === 0) {
    // A rotating model made of pixels. Its points are purely illustrative.
    const turn = time * 0.00031;
    const tilt = -0.28 + Math.sin(time * 0.00016) * 0.22;
    const x = particle.x * Math.cos(turn) + particle.z * Math.sin(turn);
    const z = particle.z * Math.cos(turn) - particle.x * Math.sin(turn);
    const y = particle.y * Math.cos(tilt) - z * Math.sin(tilt);
    const depth = particle.y * Math.sin(tilt) + z * Math.cos(tilt);
    const radius = Math.min(width * 0.29, height * 0.43);
    return { x: centerX + x * radius, y: centerY + y * radius * 0.89, depth };
  }

  if (phase === 1) {
    // Three distinct strands compare imagined signals without suggesting results.
    const strand = index % 3;
    const progress = Math.floor(index / 3) / (PARTICLE_COUNT / 3 - 1);
    const wave = Math.sin(progress * Math.PI * 5.2 + time * 0.00075 + strand * 1.65);
    const detail = Math.sin(progress * Math.PI * 16 - time * 0.00038 + strand) * 0.3;
    return {
      x: width * (0.12 + progress * 0.76),
      y: height * (0.34 + strand * 0.17) + (wave + detail) * height * 0.052,
      depth: 0.45 + (1 - strand) * 0.22,
    };
  }

  // A searching field: separate pixels sweep across an abstract market space.
  const drift = Math.sin(time * 0.00067 + particle.v * 10) * width * 0.012;
  return {
    x: width * (0.085 + particle.u * 0.83) + drift,
    y: height * (0.15 + particle.v * 0.7) + Math.sin(particle.u * 14 + time * 0.0008) * height * 0.024,
    depth: particle.glint * 0.6 - 0.1,
  };
}

function pixel(context: CanvasRenderingContext2D, x: number, y: number, size = 1) {
  context.fillRect(Math.round(x), Math.round(y), size, size);
}

export function ResearchSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(PHASE_DURATION * 0.42);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !context) return;

    const reduce = reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let visible = false;
    let frame = 0;
    let previous = 0;
    let lastDraw = 0;
    let lastPhase = -1;

    function draw() {
      if (!context || !width || !height) return;
      const time = reduce ? PHASE_DURATION * 0.42 : elapsedRef.current;
      const current = Math.floor(time / PHASE_DURATION) % 3;
      const prior = (current + 2) % 3;
      const fraction = (time % PHASE_DURATION) / PHASE_DURATION;
      const blend = ease(Math.min(1, fraction / 0.27));
      const sphereStrength = current === 0 ? blend : prior === 0 ? 1 - blend : 0;
      const waveStrength = current === 1 ? blend : prior === 1 ? 1 - blend : 0;
      const fieldStrength = current === 2 ? blend : prior === 2 ? 1 - blend : 0;
      if (current !== lastPhase) { lastPhase = current; setPhase(current); }

      context.fillStyle = "#050505";
      context.fillRect(0, 0, width, height);

      // Sparse pixel dust gives the composition depth without competing with the model.
      context.fillStyle = "#242424";
      for (let index = 0; index < 105; index++) {
        const x = hash(index + 991) * width;
        const y = hash(index + 1571) * height;
        pixel(context, x, y);
      }

      const centerX = width * 0.5;
      const centerY = height * 0.51;
      const radius = Math.min(width * 0.29, height * 0.43);

      if (sphereStrength > 0.08) {
        // Broken orbital tracks are drawn as individual pixels, never smooth strokes.
        context.fillStyle = sphereStrength > 0.6 ? "#555555" : "#303030";
        for (let index = 0; index < 168; index++) {
          if (index % 4 === 0) continue;
          const angle = index / 168 * Math.PI * 2 + time * 0.00012;
          const x = centerX + Math.cos(angle) * radius * 1.37;
          const y = centerY + Math.sin(angle) * radius * 0.34 + Math.cos(angle) * radius * 0.16;
          pixel(context, x, y);
        }
        context.fillStyle = "#292929";
        for (let index = 0; index < 118; index += 2) {
          const angle = index / 118 * Math.PI * 2 - time * 0.00009;
          pixel(context, centerX + Math.cos(angle) * radius * 1.11,
            centerY + Math.sin(angle) * radius * 0.31 - Math.cos(angle) * radius * 0.18);
        }
      }

      if (waveStrength > 0.08) {
        context.fillStyle = "#292929";
        for (let column = 0; column < 9; column++) {
          const x = width * (0.12 + column * 0.095);
          for (let y = height * 0.23; y < height * 0.79; y += 4) pixel(context, x, y);
        }
      }

      if (fieldStrength > 0.08) {
        const scanX = width * (0.08 + ((time * 0.000095) % 1) * 0.84);
        context.fillStyle = "#555555";
        for (let y = height * 0.15; y < height * 0.85; y += 3) pixel(context, scanX, y);
      }

      for (let index = 0; index < PARTICLE_COUNT; index++) {
        const start = particlePosition(index, prior, time, width, height);
        const end = particlePosition(index, current, time, width, height);
        const x = start.x + (end.x - start.x) * blend;
        const y = start.y + (end.y - start.y) * blend;
        const depth = start.depth + (end.depth - start.depth) * blend;
        const glint = PARTICLES[index].glint;

        if (current === 2 && glint < 0.16) continue;
        const sweep = Math.sin(time * 0.0014 + x * 0.12) > 0.94;
        context.fillStyle = sweep || (depth > 0.3 && glint > 0.18)
          ? "#f7f7f7" : depth > -0.15 ? "#b2b2b2" : "#555555";
        pixel(context, x, y, depth > 0.62 && glint > 0.9 ? 2 : 1);
      }

      if (sphereStrength > 0.6) {
        // A moving pixel scan cuts across the model, emphasizing its changing depth.
        const scanY = centerY - radius + ((time * 0.000105) % 1) * radius * 2;
        context.fillStyle = "#777777";
        for (let x = centerX - radius * 1.2; x < centerX + radius * 1.2; x += 3) {
          const distance = Math.abs(x - centerX) / (radius * 1.2);
          if (distance < 0.87) pixel(context, x, scanY);
        }
      }
    }

    function tick(now: number) {
      frame = 0;
      if (previous) elapsedRef.current += Math.min(now - previous, 80);
      previous = now;
      if (now - lastDraw >= FRAME_INTERVAL) { lastDraw = now; draw(); }
      if (visible && !paused && !reduce && !document.hidden) frame = requestAnimationFrame(tick);
    }

    function syncPlayback() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      draw();
      if (visible && !paused && !reduce && !document.hidden) frame = requestAnimationFrame(tick);
    }

    const resize = new ResizeObserver(() => {
      width = Math.max(1, Math.round(canvas.clientWidth / PIXEL_SIZE));
      height = Math.max(1, Math.round(canvas.clientHeight / PIXEL_SIZE));
      canvas.width = width;
      canvas.height = height;
      draw();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.05 });
    resize.observe(canvas);
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [paused, reducedMotion]);

  return (
    <figure className={styles.simulation} aria-label="Abstract monochrome pixel illustration of market signals moving from a model to comparison waves and a scan field. No participant data or study results are shown.">
      <canvas className={styles.canvas} ref={canvasRef} aria-hidden="true" />
      <span className={styles.label} aria-hidden="true">Simulation</span>
      {!reducedMotion && (
        <button className={styles.playback} type="button" onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play illustration animation" : "Pause illustration animation"}>
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        </button>
      )}
      <div className={styles.progress} aria-hidden="true">
        {[0, 1, 2].map((index) => <span className={phase === index ? styles.active : ""} key={index} />)}
      </div>
      <figcaption className={styles.caption}>Illustration only · no study data</figcaption>
    </figure>
  );
}
