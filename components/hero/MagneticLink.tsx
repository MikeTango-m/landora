"use client";

import { useEffect, useRef, type ComponentProps } from "react";

type MagneticLinkProps = ComponentProps<"a"> & {
  /** Enable the pull effect (off for touch and reduced motion). */
  enabled: boolean;
};

/**
 * Anchor that leans toward the cursor: translate(dx*9px, dy*6px) scale(1.025).
 * Writes transforms straight to the DOM — no React state per mousemove.
 * An element marked `data-magnetic-arrow` inside it nudges 4px on hover.
 */
export function MagneticLink({ enabled, className = "", children, ...rest }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const arrow = el.querySelector<HTMLElement>("[data-magnetic-arrow]");
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const b = el.getBoundingClientRect();
        const dx = (e.clientX - (b.left + b.width / 2)) / b.width;
        const dy = (e.clientY - (b.top + b.height / 2)) / b.height;
        el.style.transform = `translate(${(dx * 9).toFixed(2)}px, ${(dy * 6).toFixed(2)}px) scale(1.025)`;
        if (arrow) arrow.style.transform = "translateX(4px)";
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = "";
      if (arrow) arrow.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, [enabled]);

  return (
    <a
      ref={ref}
      className={`transition-[transform,box-shadow,border-color,background-color] duration-[250ms] ease-expo ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
