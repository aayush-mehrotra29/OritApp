"use client";

import { useEffect, useRef } from "react";

const IMAGE = "/assets/orit-phone-landscape.png";

export function PhoneLandscape() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const image = new Image();
    const sample = document.createElement("canvas");
    const sampleContext = sample.getContext("2d", { willReadFrequently: true });
    if (!sampleContext) return;
    let disposed = false;

    const draw = () => {
      if (disposed || !image.naturalWidth || !canvas.clientWidth || !canvas.clientHeight) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const sourceWidth = width / scale;
      const sourceHeight = height / scale;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(image, (image.naturalWidth - sourceWidth) / 2, (image.naturalHeight - sourceHeight) / 2, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);

      const spacing = 4;
      sample.width = Math.ceil(width / spacing);
      sample.height = Math.ceil(height / spacing);
      sampleContext.drawImage(canvas, 0, 0, sample.width, sample.height);
      const pixels = sampleContext.getImageData(0, 0, sample.width, sample.height).data;
      const stepX = canvas.width / sample.width;
      const stepY = canvas.height / sample.height;
      for (let row = 0; row < sample.height; row++) {
        for (let column = 0; column < sample.width; column++) {
          const index = (row * sample.width + column) * 4;
          const darkness = 1 - (pixels[index] * .2126 + pixels[index + 1] * .7152 + pixels[index + 2] * .0722) / 255;
          const weight = darkness ** 2.8;
          const dot = (.5 + 1.5 * weight) * ratio;
          context.fillStyle = `rgba(0,0,0,${.32 + .64 * weight})`;
          context.fillRect((column + .5) * stepX - dot / 2, (row + .5) * stepY - dot / 2, dot, dot);
        }
      }
    };

    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);
    image.onload = draw;
    image.src = IMAGE;
    if (image.complete) draw();
    return () => {
      disposed = true;
      resizeObserver.disconnect();
      image.onload = null;
    };
  }, []);

  return <canvas className="phone-landscape" ref={canvasRef} aria-hidden="true" />;
}
