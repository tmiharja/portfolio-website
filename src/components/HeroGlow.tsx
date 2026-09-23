"use client";

import { useEffect, useRef } from "react";

// Resting focal point, as a fraction of the glow layer's box.
const REST = { x: 0.42, y: 0.34 };
// How far the focal point travels toward the cursor (0 = never, 1 = all the way).
// Kept well under 1 so the light leans toward the pointer rather than chasing it.
const FOLLOW = 0.55;
// Easing time constants (ms). Returning home is slower than following, so the
// light drifts back rather than snapping when the cursor leaves.
const TAU_FOLLOW = 420;
const TAU_RETURN = 900;
const EPSILON = 0.0005;

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * A soft radial light behind the hero whose focal point eases toward the
 * mouse. Purely decorative: it never receives pointer events and sits behind
 * the hero content. On touch devices or with reduced motion it stays at rest.
 */
export default function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = matchMedia(FINE_POINTER);
    const reduced = matchMedia(REDUCED_MOTION);

    const pos = { ...REST };
    const target = { ...REST };
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let last = 0;

    const paint = () => {
      el.style.setProperty("--glow-x", `${(pos.x * 100).toFixed(2)}%`);
      el.style.setProperty("--glow-y", `${(pos.y * 100).toFixed(2)}%`);
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16;
      last = now;

      target.x = REST.x;
      target.y = REST.y;
      if (pointer) {
        const r = el.getBoundingClientRect();
        const px = (pointer.x - r.left) / r.width;
        const py = (pointer.y - r.top) / r.height;
        if (px >= 0 && px <= 1 && py >= 0 && py <= 1) {
          target.x = REST.x + (px - REST.x) * FOLLOW;
          target.y = REST.y + (py - REST.y) * FOLLOW;
        }
      }

      const inside = target.x !== REST.x || target.y !== REST.y;
      const k = 1 - Math.exp(-dt / (inside ? TAU_FOLLOW : TAU_RETURN));
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      paint();

      const settled =
        Math.abs(target.x - pos.x) < EPSILON && Math.abs(target.y - pos.y) < EPSILON;
      if (settled) {
        frame = 0;
        last = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      pointer = { x: e.clientX, y: e.clientY };
      wake();
    };
    const onLeave = () => {
      pointer = null;
      wake();
    };

    let listening = false;
    const listen = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", wake, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
    };
    const unlisten = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", wake);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };

    const sync = () => {
      if (fine.matches && !reduced.matches) {
        listen();
      } else {
        // Touch or reduced motion: hold the light still at its resting point.
        unlisten();
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
        pointer = null;
        pos.x = REST.x;
        pos.y = REST.y;
        paint();
      }
    };

    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      unlisten();
      cancelAnimationFrame(frame);
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="hero-glow" />;
}
