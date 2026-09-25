"use client";

import { useEffect, useRef } from "react";

const SPACING = 28;
const SEGMENT = 7;
const RADIUS = 260;
const LAG = 0.07;

type Theme = { r: number; g: number; b: number; base: number; peak: number; glow: number };

const LIGHT: Theme = { r: 31, g: 78, b: 121, base: 0.06, peak: 0.55, glow: 0.07 };
const DARK: Theme = { r: 143, g: 180, b: 220, base: 0.08, peak: 0.7, glow: 0.1 };

export default function CursorField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduceMotion.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let theme = document.documentElement.classList.contains("dark") ? DARK : LIGHT;
    const target = { x: -9999, y: -9999 };
    const cursor = { x: -9999, y: -9999 };
    let active = false;
    let frame = 0;
    let idleFrames = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      cursor.x += (target.x - cursor.x) * LAG;
      cursor.y += (target.y - cursor.y) * LAG;

      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, RADIUS);
      glow.addColorStop(0, `rgba(${theme.r},${theme.g},${theme.b},${theme.glow})`);
      glow.addColorStop(1, `rgba(${theme.r},${theme.g},${theme.b},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(cursor.x - RADIUS, cursor.y - RADIUS, RADIUS * 2, RADIUS * 2);

      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      const offsetX = (width % SPACING) / 2;
      const offsetY = (height % SPACING) / 2;
      for (let y = offsetY; y < height; y += SPACING) {
        for (let x = offsetX; x < width; x += SPACING) {
          const dx = cursor.x - x;
          const dy = cursor.y - y;
          const dist = Math.hypot(dx, dy);
          const proximity = Math.max(0, 1 - dist / RADIUS);
          const alpha = theme.base + (theme.peak - theme.base) * proximity * proximity;
          const angle = Math.atan2(dy, dx);
          const half = (SEGMENT / 2) * (1 + proximity * 0.6);
          const cos = Math.cos(angle) * half;
          const sin = Math.sin(angle) * half;
          ctx.strokeStyle = `rgba(${theme.r},${theme.g},${theme.b},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(x - cos, y - sin);
          ctx.lineTo(x + cos, y + sin);
          ctx.stroke();
        }
      }

      const settled = Math.abs(target.x - cursor.x) < 0.2 && Math.abs(target.y - cursor.y) < 0.2;
      idleFrames = settled ? idleFrames + 1 : 0;
      if (idleFrames > 30) {
        active = false;
        return;
      }
      frame = requestAnimationFrame(draw);
    };

    const wake = () => {
      idleFrames = 0;
      if (!active) {
        active = true;
        frame = requestAnimationFrame(draw);
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      wake();
    };
    const onLeave = () => {
      target.x = -RADIUS * 2;
      target.y = -RADIUS * 2;
      wake();
    };
    const onResize = () => {
      resize();
      wake();
    };

    const observer = new MutationObserver(() => {
      theme = document.documentElement.classList.contains("dark") ? DARK : LIGHT;
      wake();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    resize();
    wake();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
