"use client";

import { useEffect, useRef, type PointerEvent } from "react";

/**
 * Delegated pointer handler for `.spotlight` cards (see globals.css): put the
 * returned handler on a container and the hovered card's glow follows the mouse
 * through --mx/--my. One rAF write per frame, no React state.
 */
export function useSpotlight<T extends HTMLElement>() {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (e: PointerEvent<T>) => {
    if (e.pointerType !== "mouse") return;
    const card = (e.target as HTMLElement).closest<HTMLElement>(".spotlight");
    if (!card) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${clientX - r.left}px`);
      card.style.setProperty("--my", `${clientY - r.top}px`);
    });
  };
}
