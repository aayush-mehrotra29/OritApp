"use client";

import { useEffect, useRef } from "react";

const IMAGE_SRC = "/assets/orit-city-hero.png";
const DOT_SPACING = 4;
const FIELD_SPACING = 18;

export function HeroPixelScene({ imageSrc = IMAGE_SRC, focusY = 0.48, zoom = 1 }: { imageSrc?: string; focusY?: number; zoom?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>(".hero, .footer-art");
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !hero || !context) return;
    const image = new Image();
    const base = document.createElement("canvas");
    const baseContext = base.getContext("2d", { willReadFrequently: true });
    const samples = document.createElement("canvas");
    const sampleContext = samples.getContext("2d", { willReadFrequently: true });
    if (!baseContext || !sampleContext) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ready = false;
    let inView = false;
    let frame = 0;
    let lastFrame = 0;
    let ratio = 1;
    let fieldStep = FIELD_SPACING;
    let columns = 0;
    let rows = 0;
    let displacementX = new Float32Array();
    let displacementY = new Float32Array();
    let source: Uint8ClampedArray = new Uint8ClampedArray();
    let previousPointer: { x: number; y: number } | null = null;

    const rest = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
      previousPointer = null;
      displacementX.fill(0);
      displacementY.fill(0);
      if (ready) context.drawImage(base, 0, 0);
    };

    const animate = (time: number) => {
      frame = 0;
      if (!ready || !inView || document.hidden || motionPreference.matches) return;
      const elapsed = lastFrame ? Math.min(time - lastFrame, 40) : 16.7;
      lastFrame = time;
      const recovery = Math.exp(-elapsed / 210);
      let minColumn = columns, maxColumn = -1, minRow = rows, maxRow = -1;
      // Only pointer movement adds displacement; the field gently settles back.
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const index = row * columns + column;
          displacementX[index] *= recovery;
          displacementY[index] *= recovery;
          if (Math.abs(displacementX[index]) + Math.abs(displacementY[index]) < 0.035) {
            displacementX[index] = displacementY[index] = 0;
            continue;
          }
          minColumn = Math.min(minColumn, column);
          maxColumn = Math.max(maxColumn, column);
          minRow = Math.min(minRow, row);
          maxRow = Math.max(maxRow, row);
        }
      }
      context.drawImage(base, 0, 0);
      if (maxColumn < 0) { lastFrame = 0; return; }
      const left = Math.max(0, Math.floor((minColumn - 1) * fieldStep));
      const top = Math.max(0, Math.floor((minRow - 1) * fieldStep));
      const right = Math.min(canvas.width, Math.ceil((maxColumn + 1) * fieldStep));
      const bottom = Math.min(canvas.height, Math.ceil((maxRow + 1) * fieldStep));
      if (right <= left || bottom <= top) { rest(); return; }
      const patch = context.createImageData(right - left, bottom - top);
      const output = patch.data;
      let destination = 0;
      const tile = Math.max(1, Math.round(DOT_SPACING * ratio));
      // Sample on a fixed square lattice: displacement changes cell colors,
      // never bends the pixel grid or the halftone dots.
      for (let y = top; y < bottom; y++) {
        const gridY = (Math.floor(y / tile) * tile + tile / 2) / fieldStep, row = Math.floor(gridY), fy = gridY - row;
        for (let x = left; x < right; x++) {
          const gridX = (Math.floor(x / tile) * tile + tile / 2) / fieldStep, column = Math.floor(gridX), fx = gridX - column;
          const i = row * columns + column;
          const a = (1 - fx) * (1 - fy), b = fx * (1 - fy), c = (1 - fx) * fy, d = fx * fy;
          const dx = displacementX[i] * a + displacementX[i + 1] * b + displacementX[i + columns] * c + displacementX[i + columns + 1] * d;
          const dy = displacementY[i] * a + displacementY[i + 1] * b + displacementY[i + columns] * c + displacementY[i + columns + 1] * d;
          const sx = Math.max(0, Math.min(canvas.width - 1.001, x - Math.round(dx / tile) * tile));
          const sy = Math.max(0, Math.min(canvas.height - 1.001, y - Math.round(dy / tile) * tile));
          const ix = Math.floor(sx), iy = Math.floor(sy), tx = sx - ix, ty = sy - iy;
          const sourceIndex = (iy * canvas.width + ix) * 4;
          const nextRow = sourceIndex + canvas.width * 4;
          for (let channel = 0; channel < 3; channel++) {
            output[destination + channel] =
              (source[sourceIndex + channel] * (1 - tx) + source[sourceIndex + 4 + channel] * tx) * (1 - ty) +
              (source[nextRow + channel] * (1 - tx) + source[nextRow + 4 + channel] * tx) * ty;
          }
          output[destination + 3] = 255;
          destination += 4;
        }
      }
      context.putImageData(patch, left, top);
      frame = window.requestAnimationFrame(animate);
    };
    const start = () => {
      if (!frame && ready && inView && !document.hidden && !motionPreference.matches) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const resize = () => {
      if (!image.complete || !image.naturalWidth) return;
      const width = canvas.clientWidth, height = canvas.clientHeight;
      if (!width || !height) return;
      rest();
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = base.width = Math.ceil(width * ratio);
      canvas.height = base.height = Math.ceil(height * ratio);
      fieldStep = FIELD_SPACING * ratio;
      columns = Math.ceil(canvas.width / fieldStep) + 2;
      rows = Math.ceil(canvas.height / fieldStep) + 2;
      displacementX = new Float32Array(columns * rows);
      displacementY = new Float32Array(columns * rows);
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const sourceWidth = width / scale / zoom, sourceHeight = height / scale / zoom;
      const sourceX = (image.naturalWidth - sourceWidth) / 2;
      const sourceY = (image.naturalHeight - sourceHeight) * focusY;
      baseContext.imageSmoothingEnabled = true;
      baseContext.imageSmoothingQuality = "high";
      baseContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, base.width, base.height);
      const dotColumns = samples.width = Math.ceil(width / DOT_SPACING);
      const dotRows = samples.height = Math.ceil(height / DOT_SPACING);
      sampleContext.drawImage(base, 0, 0, dotColumns, dotRows);
      const colors = sampleContext.getImageData(0, 0, dotColumns, dotRows).data;
      baseContext.imageSmoothingEnabled = false;
      baseContext.drawImage(samples, 0, 0, base.width, base.height);
      const spacingX = base.width / dotColumns, spacingY = base.height / dotRows;
      for (let row = 0; row < dotRows; row++) {
        for (let column = 0; column < dotColumns; column++) {
          const i = (row * dotColumns + column) * 4;
          const darkness = 1 - (colors[i] * 0.2126 + colors[i + 1] * 0.7152 + colors[i + 2] * 0.0722) / 255;
          const shadowWeight = darkness ** 2.8;
          const size = (0.5 + 1.5 * shadowWeight) * ratio;
          baseContext.fillStyle = `rgba(0, 0, 0, ${0.32 + 0.64 * shadowWeight})`;
          baseContext.fillRect((column + 0.5) * spacingX - size / 2, (row + 0.5) * spacingY - size / 2, size, size);
        }
      }
      source = baseContext.getImageData(0, 0, base.width, base.height).data;
      ready = true;
      canvas.classList.add("is-ready");
      context.drawImage(base, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!ready || !inView || motionPreference.matches || event.pointerType === "touch") return;
      const bounds = canvas.getBoundingClientRect();
      const x = (event.clientX - bounds.left) * canvas.width / bounds.width;
      const y = (event.clientY - bounds.top) * canvas.height / bounds.height;
      const previous = previousPointer;
      previousPointer = { x, y };
      if (!previous) return;
      const dx = x - previous.x, dy = y - previous.y;
      const lengthSquared = dx * dx + dy * dy;
      if (lengthSquared < 0.1) return;
      const force = Math.min(1, 45 * ratio / Math.sqrt(lengthSquared)) * 0.3;
      const radius = 90 * ratio;
      const firstColumn = Math.max(0, Math.floor((Math.min(x, previous.x) - radius) / fieldStep));
      const lastColumn = Math.min(columns - 1, Math.ceil((Math.max(x, previous.x) + radius) / fieldStep));
      const firstRow = Math.max(0, Math.floor((Math.min(y, previous.y) - radius) / fieldStep));
      const lastRow = Math.min(rows - 1, Math.ceil((Math.max(y, previous.y) + radius) / fieldStep));
      for (let row = firstRow; row <= lastRow; row++) {
        for (let column = firstColumn; column <= lastColumn; column++) {
          const px = column * fieldStep - previous.x, py = row * fieldStep - previous.y;
          const along = Math.max(0, Math.min(1, (px * dx + py * dy) / lengthSquared));
          const distance = Math.hypot(px - along * dx, py - along * dy);
          if (distance >= radius) continue;
          const weight = (1 - (distance / radius) ** 2) ** 3;
          const index = row * columns + column;
          displacementX[index] += dx * force * weight;
          displacementY[index] += dy * force * weight;
          const magnitude = Math.hypot(displacementX[index], displacementY[index]);
          const limit = 20 * ratio;
          if (magnitude > limit) {
            displacementX[index] *= limit / magnitude;
            displacementY[index] *= limit / magnitude;
          }
        }
      }
      start();
    };
    const onPointerLeave = () => { previousPointer = null; };
    const onVisibilityChange = () => { if (document.hidden) rest(); };
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView) rest();
    });
    const resizeObserver = new ResizeObserver(resize);
    visibility.observe(hero);
    resizeObserver.observe(canvas);
    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionPreference.addEventListener("change", rest);
    image.onload = resize;
    image.src = imageSrc;
    if (image.complete) resize();

    return () => {
      window.cancelAnimationFrame(frame);
      visibility.disconnect();
      resizeObserver.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", rest);
      image.onload = null;
    };
  }, [imageSrc, focusY, zoom]);

  return <canvas ref={canvasRef} className="hero-pixel-scene" aria-hidden="true" />;
}
