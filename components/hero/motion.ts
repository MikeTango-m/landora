import type { Variants } from "framer-motion";

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/** Per-element entrance timing from the handoff (seconds). */
export type Reveal = { delay: number; duration: number; reduce: boolean };

const timing = ({ delay, duration, reduce }: Reveal) =>
  reduce ? { duration: 0 } : { delay, duration, ease: EASE_EXPO };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (r: Reveal) => ({ opacity: 1, y: 0, transition: timing(r) }),
};

export const lineRise: Variants = {
  hidden: { opacity: 0, y: "105%" },
  show: (r: Reveal) => ({ opacity: 1, y: "0%", transition: timing(r) }),
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.965 },
  show: (r: Reveal) => ({ opacity: 1, scale: 1, transition: timing(r) }),
};
