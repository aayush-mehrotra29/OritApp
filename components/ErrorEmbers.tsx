"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
  color: string;
}

export function ErrorEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest(".error-page") as HTMLElement | null;
    if (!canvas || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    const colors = ["#ff5924", "#ff8a5c", "#ffb37a"];

    function resize() {
      canvas!.width = section!.clientWidth * dpr;
      canvas!.height = section!.clientHeight * dpr;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawn(x: number, y: number) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.35 - Math.random() * 0.5,
        r: 1.4 + Math.random() * 2.4,
        life: 0,
        maxLife: 650 + Math.random() * 450,
        color: colors[(Math.random() * colors.length) | 0],
      });
      if (particles.length > 160) particles.splice(0, particles.length - 160);
    }

    let lastSpawn = 0;
    function onPointerMove(event: PointerEvent) {
      const now = performance.now();
      if (now - lastSpawn < 18) return;
      lastSpawn = now;
      const rect = section!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      spawn(x + (Math.random() - 0.5) * 8, y + (Math.random() - 0.5) * 8);
      if (Math.random() < 0.35) spawn(x + (Math.random() - 0.5) * 12, y + (Math.random() - 0.5) * 12);
    }
    section.addEventListener("pointermove", onPointerMove);

    let last = performance.now();
    let frameId = 0;
    function frame(now: number) {
      const dt = Math.min(now - last, 48);
      last = now;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, section!.clientWidth, section!.clientHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        const t = p.life / p.maxLife;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.vy -= 0.0005 * dt;
        ctx!.beginPath();
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = (1 - t) * 0.85;
        ctx!.shadowColor = p.color;
        ctx!.shadowBlur = 8;
        ctx!.arc(p.x, p.y, p.r * (1 - t * 0.4), 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.shadowBlur = 0;
      frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      section.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frameId);
      particles = [];
    };
  }, []);

  return <canvas className="error-embers" ref={canvasRef} aria-hidden="true" />;
}
