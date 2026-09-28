"use client";

import { useEffect, useRef } from "react";

/**
 * A short looping clip that behaves like an animated GIF: muted, autoplaying
 * and inline. For readers who prefer reduced motion it stays paused and shows
 * the player controls instead, so they can choose to play it.
 */
type Source = { src: string; type: string };

export default function PostVideo({ sources, label }: { sources: Source[]; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.pause();
    video.controls = true;
  }, []);

  return (
    <video
      ref={ref}
      aria-label={label || undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="mt-6 w-full rounded-xl border border-rule"
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
