"use client";

import { useEffect, useRef } from "react";

export function AudiencePixelScene({ progress = 0 }: { progress?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  void progress;
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const scene = document.createElement("canvas");
    const ctx = scene.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1, height = 1, frame = 0, last = 0, time = 0, visible = false;
    const people = Array.from({ length: 48 }, (_, i) => ({
      x: (i * 0.61803398875) % 1, y: (i * 0.381966 + 0.17) % 1,
      direction: i % 2 ? 1 : -1, speed: 0.013 + (i % 5) * 0.002,
      phase: i * 1.7, tone: 48 + (i * 17) % 42,
      build: 1 + (i % 4) * 0.1, coat: i % 4 === 0, bag: i % 5 === 0,
    }));
    const rect = (x: number, y: number, w: number, h: number, tone: number) => {
      ctx.fillStyle = `rgb(${tone},${tone},${tone})`;
      ctx.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
    };
    const render = () => {
      ctx.fillStyle = "#070707";
      ctx.fillRect(0, 0, width, height);
      for (let y = 0; y < height; y += 12) {
        for (let x = (y % 24 ? 6 : 0); x < width; x += 12) rect(x, y, 1, 1, 16);
      }
      const ordered = people.map(person => {
        const x = ((person.x + person.direction * time * person.speed) % 1 + 1) % 1;
        return { ...person, px: x * (width + 28) - 14, py: height * (0.17 + person.y * 0.72) + x * 12 };
      }).sort((a, b) => a.py - b.py);
      for (const person of ordered) {
        const { px: x, py: y, direction: dir, tone } = person;
        const scale = 0.72 + person.y * 0.4;
        const phase = time * (4.3 + person.speed * 25) + person.phase;
        const stride = Math.sin(phase);
        const bob = Math.cos(phase * 2) * 0.45;
        const polygon = (points: number[][], shade: number) => {
          ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
          ctx.beginPath();
          points.forEach(([px, py], index) => {
            const sx = Math.round(x + px * scale * dir * 1.22);
            const sy = Math.round(y + py * scale);
            if (index === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
          });
          ctx.closePath();
          ctx.fill();
        };
        const limb = (ax: number, ay: number, bx: number, by: number, thickness: number, shade: number) => {
          const length = Math.hypot(bx - ax, by - ay) || 1;
          const nx = -(by - ay) / length * thickness / 2;
          const ny = (bx - ax) / length * thickness / 2;
          polygon([[ax + nx, ay + ny], [bx + nx, by + ny], [bx - nx, by - ny], [ax - nx, ay - ny]], shade);
        };
        // Narrow heads, tapered clothing and articulated knees/heels give the
        // tiny silhouettes a human gait at this viewing distance.
        polygon([[-3, 0], [2, -1], [21, 7], [18, 9], [7, 5]], 14);
        const leg = (swing: number, far: boolean) => {
          const hipX = far ? -1.2 : 1.2;
          const kneeX = hipX + swing * 3.3;
          const footX = hipX + swing * 6;
          const lift = Math.max(0, -swing) * 2.4;
          const shade = tone * (far ? 0.46 : 0.65);
          limb(hipX, -16 + bob, kneeX, -8, 2.8, shade);
          limb(kneeX, -8, footX, -1.4 - lift, 2.1, shade);
          polygon([[footX - 1, -2 - lift], [footX + 1, -2 - lift], [footX + 3, -lift], [footX - 1, -lift]], tone * 0.4);
        };
        const arm = (swing: number, far: boolean) => {
          const shoulder = far ? -2 : 2;
          const elbow = shoulder - swing * 3;
          const hand = shoulder - swing * 5 + 1;
          const shade = tone * (far ? 0.56 : 0.87);
          limb(shoulder, -28 + bob, elbow, -22 + bob, 2.3, shade);
          limb(elbow, -22 + bob, hand, -18 + bob - Math.abs(swing), 1.7, shade);
          limb(hand, -18 + bob - Math.abs(swing), hand + 0.4, -16.7 + bob - Math.abs(swing), 1.6, tone * 0.92);
        };
        leg(-stride, true);
        arm(-stride, true);
        leg(stride, false);
        const shoulder = 3.5 * person.build;
        const hem = person.coat ? -12 : -17;
        polygon([[-2, -30 + bob], [-shoulder, -27 + bob], [-2.8, -21 + bob], [-3.2, hem + bob], [3.5, hem + bob], [2.7, -22 + bob], [shoulder, -27 + bob], [1.5, -30 + bob]], tone);
        polygon([[-shoulder, -27 + bob], [-2.8, -21 + bob], [-3.2, hem + bob], [-0.8, hem + bob], [-1, -28 + bob]], tone * 0.73);
        limb(0, -32 + bob, 0.4, -29 + bob, 2, tone * 0.86);
        polygon([[-2, -37 + bob], [1, -38 + bob], [2.5, -36 + bob], [2.5, -34 + bob], [3.3, -33.5 + bob], [2, -32 + bob], [-0.5, -31.5 + bob], [-2, -34 + bob]], tone * 0.95);
        polygon([[-2, -37 + bob], [0, -38 + bob], [2, -37 + bob], [2.5, -35.5 + bob], [0, -36 + bob], [-1, -33.5 + bob], [-2, -34 + bob]], tone * 0.43);
        if (person.bag) polygon([[-4, -26 + bob], [-6, -24 + bob], [-5.5, -18 + bob], [-3, -18 + bob], [-2.5, -24 + bob]], tone * 0.48);
        arm(stride, false);
      }
      const shade = ctx.createRadialGradient(width / 2, height * 0.46, width * 0.08, width / 2, height * 0.46, Math.max(width, height) * 0.66);
      shade.addColorStop(0, "rgba(0,0,0,.68)");
      shade.addColorStop(0.6, "rgba(0,0,0,.12)");
      shade.addColorStop(1, "rgba(0,0,0,.75)");
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, width, height);
      context.imageSmoothingEnabled = false;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(scene, 0, 0, canvas.width, canvas.height);
    };
    const tick = (now: number) => {
      if (!visible || document.hidden || reduced.matches) { frame = 0; return; }
      if (now - last >= 1000 / 24) {
        time += last ? Math.min((now - last) / 1000, 0.1) : 0;
        last = now;
        render();
      }
      frame = requestAnimationFrame(tick);
    };
    const resume = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      render();
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      width = scene.width = Math.max(1, Math.round(canvas.clientWidth / 1.4));
      height = scene.height = Math.max(1, Math.round(canvas.clientHeight / 1.4));
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    resize();
    resizeObserver.observe(canvas);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", resume);
    reduced.addEventListener("change", resume);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", resume);
      reduced.removeEventListener("change", resume);
    };
  }, []);
  return <canvas ref={canvasRef} className="audience-pixel-scene" aria-hidden="true" />;
}
