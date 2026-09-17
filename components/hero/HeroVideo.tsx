"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = { paused: boolean };

/**
 * The rotating laptop. React does not render the `muted` attribute, so playback
 * is started from the DOM (not `autoPlay`, which would ignore reduced motion)
 * and retried on `canplay` / tab visibility.
 * The source is an 8s forward+reverse loop (no jump at the loop point).
 */
export function HeroVideo({ paused }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    if (paused) {
      v.pause();
      return;
    }

    const tryPlay = () => {
      if (document.visibilityState === "visible") v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);
    return () => {
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, [paused]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="auto"
      poster="/videos/laptop-rotation-poster.jpg"
      aria-hidden
      tabIndex={-1}
      className="hero-video pointer-events-none absolute top-1/2 left-1/2 h-full w-[128%] max-w-none -translate-x-[46%] -translate-y-1/2 object-cover mix-blend-lighten"
    >
      <source src="/videos/laptop-rotation.webm" type="video/webm" />
      <source src="/videos/laptop-rotation.mp4" type="video/mp4" />
    </video>
  );
}
