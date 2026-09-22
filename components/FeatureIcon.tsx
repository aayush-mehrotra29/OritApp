"use client";

import { useEffect, useRef } from "react";

type IconKind = "search" | "people" | "replay";
type Point = [number, number, number];
type Outline = [number, number][];
type Face = { loops: Point[][]; normal: Point };
type Drawing = { path: string; fill: string; depth: number };

const TAU = Math.PI * 2;

function circle(x: number, y: number, radius: number, reverse = false): Outline {
  return Array.from({ length: 48 }, (_, i) => {
    const angle = (reverse ? -1 : 1) * i / 48 * TAU;
    return [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius];
  });
}

// Each icon has front/back outlines and solid side walls. Every animation
// frame projects those surfaces into ordinary SVG paths, with no CSS 3D flip.
function extrude(outlines: Outline[], depth: number, z = 0): Face[] {
  const front = outlines.map(loop => loop.map(([x, y]): Point => [x, y, z + depth / 2]));
  const back = outlines.map(loop => loop.map(([x, y]): Point => [x, y, z - depth / 2]));
  const faces: Face[] = [
    { loops: front, normal: [0, 0, 1] },
    { loops: back, normal: [0, 0, -1] },
  ];
  outlines.forEach((loop, contour) => loop.forEach(([x, y], i) => {
    const next = (i + 1) % loop.length;
    const dx = loop[next][0] - x, dy = loop[next][1] - y;
    const length = Math.hypot(dx, dy);
    faces.push({
      loops: [[back[contour][i], back[contour][next], front[contour][next], front[contour][i]]],
      normal: [dy / length, -dx / length, 0],
    });
  }));
  return faces;
}

function capsule(ax: number, ay: number, bx: number, by: number, radius: number): Outline {
  const angle = Math.atan2(by - ay, bx - ax);
  return [
    ...Array.from({ length: 17 }, (_, i): [number, number] => {
      const t = angle - Math.PI / 2 + i / 16 * Math.PI;
      return [bx + Math.cos(t) * radius, by + Math.sin(t) * radius];
    }),
    ...Array.from({ length: 17 }, (_, i): [number, number] => {
      const t = angle + Math.PI / 2 + i / 16 * Math.PI;
      return [ax + Math.cos(t) * radius, ay + Math.sin(t) * radius];
    }),
  ];
}

function person(x: number, y: number, scale: number, z: number): Face[] {
  const shoulders: Outline = Array.from({ length: 25 }, (_, i) => {
    const t = Math.PI + i / 24 * Math.PI;
    return [x + Math.cos(t) * 10 * scale, y + 13 * scale + Math.sin(t) * 10 * scale];
  });
  shoulders.push([x + 10 * scale, y + 19 * scale], [x - 10 * scale, y + 19 * scale]);
  return [
    ...extrude([circle(x, y - 7 * scale, 6.5 * scale)], 9 * scale, z),
    ...extrude([shoulders], 10 * scale, z),
  ];
}

function replay(): Face[] {
  const start = 40 * Math.PI / 180, end = 320 * Math.PI / 180;
  const radial = [Math.cos(end), Math.sin(end)];
  const tangent = [-Math.sin(end), Math.cos(end)];
  const outline: Outline = Array.from({ length: 49 }, (_, i) => {
    const t = start + i / 48 * (end - start);
    return [Math.cos(t) * 24, Math.sin(t) * 24];
  });
  outline.push(
    [radial[0] * 29, radial[1] * 29],
    [radial[0] * 20.5 + tangent[0] * 12, radial[1] * 20.5 + tangent[1] * 12],
    [radial[0] * 12, radial[1] * 12],
  );
  for (let i = 48; i >= 0; i--) {
    const t = start + i / 48 * (end - start);
    outline.push([Math.cos(t) * 17, Math.sin(t) * 17]);
  }
  return extrude([outline], 11);
}

const meshes: Record<IconKind, Face[]> = {
  search: [
    ...extrude([capsule(5, 5, 23, 23, 3.7)], 10),
    ...extrude([circle(-6, -6, 17), circle(-6, -6, 11.5, true)], 10),
  ],
  people: [...person(-17, -2, .74, -7), ...person(17, -2, .74, -7), ...person(0, 1, 1, 7)],
  replay: replay(),
};

function rotate([x, y, z]: Point, angle: number): Point {
  const rx = x * Math.cos(angle) + z * Math.sin(angle);
  const rz = -x * Math.sin(angle) + z * Math.cos(angle);
  const pitch = -.18;
  return [rx, y * Math.cos(pitch) - rz * Math.sin(pitch), y * Math.sin(pitch) + rz * Math.cos(pitch)];
}

function draw(mesh: Face[], angle: number): Drawing[] {
  return mesh.flatMap(face => {
    const normal = rotate(face.normal, angle);
    if (normal[2] <= .001) return [];
    const loops = face.loops.map(loop => loop.map(point => rotate(point, angle)));
    const points = loops.flat();
    const light = Math.max(0, -.36 * normal[0] - .48 * normal[1] + .8 * normal[2]);
    const shade = Math.round(95 + 143 * light);
    return [{
      path: loops.map(loop => loop.map(([x, y, z], i) => {
        const perspective = 240 / (240 - z);
        return `${i ? "L" : "M"}${(48 + x * perspective * 1.35).toFixed(2)},${(48 + y * perspective * 1.35).toFixed(2)}`;
      }).join(" ") + "Z").join(" "),
      fill: `rgb(${shade},${shade},${shade})`,
      depth: points.reduce((sum, p) => sum + p[2], 0) / points.length,
    }];
  }).sort((a, b) => a.depth - b.depth);
}

const PIXEL_RESOLUTION = 28;
const DITHER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// A binary pixel pass: light becomes white coverage, shade becomes holes.
// The visible SVG contains only opaque white rectangles and transparency.
function pixelShader(context: CanvasRenderingContext2D, drawing: Drawing[]): string {
  context.clearRect(0, 0, PIXEL_RESOLUTION, PIXEL_RESOLUTION);
  context.save();
  context.scale(PIXEL_RESOLUTION / 96, PIXEL_RESOLUTION / 96);
  context.lineWidth = .3;
  for (const face of drawing) {
    const path = new Path2D(face.path);
    context.fillStyle = context.strokeStyle = face.fill;
    context.fill(path, "evenodd");
    context.stroke(path);
  }
  context.restore();

  const pixels = context.getImageData(0, 0, PIXEL_RESOLUTION, PIXEL_RESOLUTION).data;
  let path = "";
  for (let y = 0; y < PIXEL_RESOLUTION; y++) {
    let run = -1;
    for (let x = 0; x <= PIXEL_RESOLUTION; x++) {
      const index = (y * PIXEL_RESOLUTION + x) * 4;
      const coverage = Math.max(0, Math.min(1, (pixels[index] - 65) / 155));
      const threshold = (DITHER[(y % 4) * 4 + x % 4] + .5) / 16;
      const white = x < PIXEL_RESOLUTION && pixels[index + 3] >= 128 && coverage > threshold;
      if (white && run < 0) run = x;
      if (!white && run >= 0) {
        path += `M${run} ${y}h${x - run}v1H${run}Z`;
        run = -1;
      }
    }
  }
  return path;
}

export function FeatureIcon({ kind }: { kind: IconKind }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const pixels = svg.querySelector("path");
    const buffer = document.createElement("canvas");
    buffer.width = buffer.height = PIXEL_RESOLUTION;
    const context = buffer.getContext("2d", { willReadFrequently: true });
    if (!pixels || !context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false, frame = 0, lastTime = 0, elapsed = 0;
    const phase = kind === "search" ? 0 : kind === "people" ? 1300 : 2600;

    const paint = (angle: number) => {
      pixels.setAttribute("d", pixelShader(context, draw(meshes[kind], angle)));
    };
    paint(-.32);
    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (lastTime && time - lastTime < 1000 / 30) return;
      elapsed += lastTime ? Math.min(time - lastTime, 80) : 0;
      lastTime = time;
      const progress = ((elapsed + phase) % 7200) / 7200;
      paint(-.32 + progress * TAU);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (reducedMotion.matches) paint(-.32);
      else if (inView && !document.hidden) frame = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    observer.observe(svg);
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, [kind]);

  return (
    <span className="feature-icon-frame" aria-hidden="true">
      <svg ref={svgRef} className="feature-solid-icon" viewBox={`0 0 ${PIXEL_RESOLUTION} ${PIXEL_RESOLUTION}`} shapeRendering="crispEdges">
        <path fill="#fff" />
      </svg>
    </span>
  );
}
