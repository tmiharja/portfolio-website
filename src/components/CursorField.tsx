"use client";

import { useEffect, useRef } from "react";

const LAG = 0.08;
const SPARKS = 6;
const SPARK_MIN = 50;
const SPARK_MAX = 150;
const JITTER = 0.22;
const DEPTH = 4;
const FADE = 0.06;

type Theme = { r: number; g: number; b: number; core: number; halo: number };

const LIGHT: Theme = { r: 31, g: 78, b: 121, core: 0.55, halo: 0.12 };
const DARK: Theme = { r: 160, g: 200, b: 240, core: 0.85, halo: 0.2 };

type Point = { x: number; y: number };

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
    let theme = document.documentElement.classList.contains("dark") ? DARK : LIGHT;
    const target: Point = { x: -9999, y: -9999 };
    const cursor: Point = { x: -9999, y: -9999 };
    let energy = 0;
    let frame = 0;
    let running = false;
    let seed = 1;

    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const bolt = (a: Point, b: Point, depth: number, out: Point[]) => {
      if (depth === 0) {
        out.push(b);
        return;
      }
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      const nx = -(b.y - a.y) / (len || 1);
      const ny = (b.x - a.x) / (len || 1);
      const off = (rand() - 0.5) * len * JITTER * 2;
      const m = { x: mx + nx * off, y: my + ny * off };
      bolt(a, m, depth - 1, out);
      bolt(m, b, depth - 1, out);
    };

    const stroke = (points: Point[], alpha: number, lineWidth: number) => {
      ctx.strokeStyle = `rgba(${theme.r},${theme.g},${theme.b},${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
    };

    const drawBolt = (a: Point, b: Point, strength: number) => {
      const points: Point[] = [a];
      bolt(a, b, DEPTH, points);
      stroke(points, theme.halo * strength, 3);
      stroke(points, theme.core * strength, 1);
      if (rand() < 0.5 * strength) {
        const i = 2 + Math.floor(rand() * (points.length - 4));
        const p = points[i];
        const q = points[i + 1];
        const ang = Math.atan2(q.y - p.y, q.x - p.x) + (rand() - 0.5) * 1.6;
        const len = Math.hypot(b.x - a.x, b.y - a.y) * (0.25 + rand() * 0.3);
        const tip = { x: p.x + Math.cos(ang) * len, y: p.y + Math.sin(ang) * len };
        const branch: Point[] = [p];
        bolt(p, tip, DEPTH - 1, branch);
        stroke(branch, theme.core * strength * 0.6, 1);
      }
    };

    const draw = () => {
      const dx = target.x - cursor.x;
      const dy = target.y - cursor.y;
      cursor.x += dx * LAG;
      cursor.y += dy * LAG;
      const gap = Math.hypot(dx, dy);

      const moving = gap > 1.5;
      energy = moving ? Math.min(1, energy + 0.25) : Math.max(0, energy - FADE);

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (energy > 0.01) {
        seed = (Math.random() * 4294967296) >>> 0;
        const flicker = 0.7 + rand() * 0.3;
        const strength = energy * flicker;

        if (gap > 6) {
          drawBolt(cursor, target, Math.min(1, gap / 80) * strength);
        }

        const n = Math.round(SPARKS * (0.5 + 0.5 * Math.min(1, gap / 120)));
        for (let i = 0; i < n; i++) {
          const ang = rand() * Math.PI * 2;
          const len = SPARK_MIN + rand() * (SPARK_MAX - SPARK_MIN);
          const tip = {
            x: cursor.x + Math.cos(ang) * len,
            y: cursor.y + Math.sin(ang) * len,
          };
          drawBolt(cursor, tip, strength * (0.4 + rand() * 0.6));
        }
      }

      if (energy <= 0.01 && !moving) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (cursor.x < -1000) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }
      target.x = e.clientX;
      target.y = e.clientY;
      wake();
    };

    const onLeave = () => {
      target.x = cursor.x;
      target.y = cursor.y;
    };

    const onResize = () => {
      resize();
      wake();
    };

    const onMotionChange = () => {
      if (!reduceMotion.matches) return;
      cancelAnimationFrame(frame);
      running = false;
      energy = 0;
      ctx.clearRect(0, 0, width, height);
      window.removeEventListener("pointermove", onMove);
    };

    const observer = new MutationObserver(() => {
      theme = document.documentElement.classList.contains("dark") ? DARK : LIGHT;
      wake();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      reduceMotion.removeEventListener("change", onMotionChange);
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
