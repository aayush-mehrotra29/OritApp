"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ROWS = 5;
const COLS = 8;
const PAGES = 8;
const DURATION = 2.8;
const RADIUS = 130;
const FAST_DURATION = 0.2;

const CHARS = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  "Ä", "Ñ", "Ø", "Å", "Ç", "Œ",
  "Я", "Ж", "Ф", "Щ", "Б",
  "あ", "ん", "中", "田", "日",
  "한", "글", "안", "녕", "가",
  "Ω", "Σ", "Δ", "Φ",
];
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export function FlapBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    board.innerHTML = "";
    const tiles: HTMLDivElement[] = [];
    const fragment = document.createDocumentFragment();
    for (let t = 0; t < ROWS * COLS; t++) {
      const tile = document.createElement("div");
      tile.className = "flap-tile";
      const tileOffset = -(Math.random() * DURATION);
      for (let p = 0; p < PAGES; p++) {
        const page = document.createElement("span");
        page.className = "flap-page";
        page.textContent = randomChar();
        page.style.animationDelay = `${tileOffset + p * (DURATION / PAGES)}s`;
        tile.appendChild(page);
      }
      fragment.appendChild(tile);
      tiles.push(tile);
    }
    board.appendChild(fragment);

    if (reducedMotion) return;

    // Tiles near the cursor flip fast; the effect fades out over RADIUS px and
    // resets once the mouse leaves. Centers are cached and only re-measured on
    // resize, so mousemove itself does no layout work beyond the board's own rect.
    let centers: { x: number; y: number }[] = [];

    function measure() {
      if (!board) return;
      const boardRect = board.getBoundingClientRect();
      centers = tiles.map((tile) => {
        const r = tile.getBoundingClientRect();
        return { x: r.left - boardRect.left + r.width / 2, y: r.top - boardRect.top + r.height / 2 };
      });
    }
    measure();
    window.addEventListener("resize", measure);

    let pendingEvent: MouseEvent | null = null;
    let ticking = false;

    function applyProximity() {
      ticking = false;
      if (!pendingEvent || !board) return;
      const boardRect = board.getBoundingClientRect();
      const mx = pendingEvent.clientX - boardRect.left;
      const my = pendingEvent.clientY - boardRect.top;
      tiles.forEach((tile, i) => {
        const c = centers[i];
        const dist = Math.hypot(mx - c.x, my - c.y);
        if (dist < RADIUS) {
          const t = 1 - dist / RADIUS;
          tile.style.setProperty("--flap-duration", `${DURATION - t * (DURATION - FAST_DURATION)}s`);
        } else {
          tile.style.removeProperty("--flap-duration");
        }
      });
    }

    function onMouseMove(event: MouseEvent) {
      pendingEvent = event;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyProximity);
      }
    }

    function onMouseLeave() {
      tiles.forEach((tile) => tile.style.removeProperty("--flap-duration"));
    }

    board.addEventListener("mousemove", onMouseMove);
    board.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", measure);
      board.removeEventListener("mousemove", onMouseMove);
      board.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [reducedMotion]);

  return <div className="flap-board" ref={boardRef} aria-hidden="true" />;
}
