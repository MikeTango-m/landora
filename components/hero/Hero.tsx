"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { HeroVideo } from "./HeroVideo";
import { MagneticLink } from "./MagneticLink";
import { fadeScale, fadeUp, lineRise, type Reveal } from "./motion";
import { Navbar } from "./Navbar";
import { FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "./use-media-query";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";
import LiveOrb from "@/components/ui/live-orb";

const primaryCta = whatsappLink(WHATSAPP_MESSAGES.landingPage);

export type HeroProps = {
  showGrid?: boolean;
  showParticles?: boolean;
  cursorGlow?: boolean;
};

const COPY = {
  badge: "Landing pages • Design • Desenvolvimento",
  headline: ["A tua marca merece", "uma página que vende."],
  paragraph:
    "Landing pages modernas, rápidas e estratégicas, criadas para transformar visitantes em clientes.",
  primaryCta: "Quero a minha landing page",
  secondaryCta: "Ver projetos",
  trust: "Design • Desenvolvimento • Performance",
};

const PARTICLES = [
  { left: "12%", top: "28%", size: 2, color: "#38BDF8", duration: 14, delay: 0 },
  { left: "24%", top: "68%", size: 3, color: "#2563EB", duration: 19, delay: 1.4 },
  { left: "41%", top: "16%", size: 2, color: "#38BDF8", duration: 17, delay: 0.7 },
  { left: "57%", top: "78%", size: 2, color: "#7DD3FC", duration: 21, delay: 2.2 },
  { left: "72%", top: "22%", size: 3, color: "#2563EB", duration: 16, delay: 1.1 },
  { left: "86%", top: "58%", size: 2, color: "#38BDF8", duration: 20, delay: 3 },
  { left: "93%", top: "34%", size: 2, color: "#7DD3FC", duration: 15, delay: 1.8 },
];

/** Laptop stage parallax depth, in px at the hero edge. */
const STAGE_DEPTH = 16;

export function Hero({ showGrid = true, showParticles = true, cursorGlow = true }: HeroProps) {
  // Entrance timing is read by Framer when the animation starts (never rendered),
  // so its own hook is fine. Anything that changes markup goes through
  // useMediaQuery, which renders the server value during hydration.
  const reduceEntrance = useReducedMotion() ?? false;
  const reduce = useMediaQuery(REDUCED_MOTION);
  const finePointer = useMediaQuery(FINE_POINTER);
  const pointerFx = finePointer && !reduce;

  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Scroll parallax
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 100], { clamp: true });

  // Cursor glow + parallax: refs and rAF only, never React state per mousemove.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pointerFx) return;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = root.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const glow = glowRef.current;
        if (glow) {
          glow.style.opacity = "1";
          glow.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
        }
        const stage = stageRef.current;
        if (stage) {
          const nx = x / r.width - 0.5;
          const ny = y / r.height - 0.5;
          stage.style.transform = `translate3d(${(-nx * STAGE_DEPTH).toFixed(2)}px, ${(-ny * STAGE_DEPTH * 0.6).toFixed(2)}px, 0)`;
        }
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      if (glowRef.current) glowRef.current.style.opacity = "0";
      if (stageRef.current) stageRef.current.style.transform = "translate3d(0, 0, 0)";
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, [pointerFx]);

  const at = (delay: number, duration: number): Reveal => ({ delay, duration, reduce: reduceEntrance });

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-title"
      className="relative min-h-svh overflow-hidden bg-ink font-sans text-fg"
    >
      {/* ── Background layers ─────────────────────────────────────────── */}
      <div aria-hidden className="hero-base pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-drift animate-drift pointer-events-none absolute -inset-[15%]" />
      {showGrid && <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />}
      {cursorGlow && pointerFx && (
        <div
          ref={glowRef}
          aria-hidden
          className="hero-cursor-glow pointer-events-none absolute top-0 left-0 size-[600px] rounded-full opacity-0 blur-[30px] transition-opacity duration-[600ms] will-change-transform"
        />
      )}
      {showParticles && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="animate-float absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                background: p.color,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <Navbar />

      {/* ── Content row ───────────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="show"
        className="relative z-10 box-border flex min-h-svh flex-wrap items-center gap-[clamp(28px,4vw,40px)] pt-[clamp(84px,11vh,140px)] pb-[clamp(32px,5vh,72px)]"
      >
        {/* Text column — small flex-basis on purpose so the row does not wrap early. */}
        <div className="@container min-w-0 max-w-[820px] flex-[1.3_1_330px] pr-[clamp(12px,1.4vw,24px)] pl-[clamp(20px,4vw,56px)]">
          <motion.div variants={fadeUp} custom={at(0.15, 0.8)}>
            {/* Single-line pill; on very narrow phones it wraps instead of clipping. */}
            <div className="hero-badge inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/10 py-[7px] pr-3.5 pl-3 max-[400px]:rounded-2xl">
              <span aria-hidden className="animate-pulse-dot size-1.5 flex-none rounded-full bg-sky" />
              <span className="text-[clamp(9px,0.78vw,10.5px)] font-semibold tracking-[.18em] whitespace-nowrap text-badge uppercase max-[400px]:leading-[1.6] max-[400px]:tracking-[.14em] max-[400px]:whitespace-normal">
                {COPY.badge}
              </span>
            </div>
          </motion.div>

          {/* 9.2cqw, not the prototype's 11.2cqw: the longer line measures 10.75em in
              Inter 800, so 11.2cqw (8.9em of column) always broke it into 4 lines. */}
          <h1
            id="hero-title"
            className="mt-[clamp(20px,2.6vh,30px)] text-[clamp(38px,min(9.2cqw,5.9vw),100px)] leading-[.98] font-extrabold tracking-[-.035em] text-balance"
          >
            <span className="block overflow-hidden pb-[.06em]">
              <motion.span className="block" variants={lineRise} custom={at(0.3, 1)}>
                {COPY.headline[0]}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[.06em]">
              <motion.span className="hero-headline-gradient block" variants={lineRise} custom={at(0.44, 1)}>
                {COPY.headline[1]}
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            custom={at(0.66, 0.9)}
            className="mt-[clamp(18px,2.4vh,26px)] max-w-[600px] text-[clamp(15px,1.15vw,18px)] leading-[1.62] text-pretty text-fg-2"
          >
            {COPY.paragraph}
          </motion.p>

          <motion.div
            variants={fadeScale}
            custom={at(0.84, 0.8)}
            className="mt-[clamp(26px,3.4vh,38px)] flex flex-wrap items-center gap-3.5 max-[480px]:flex-col max-[480px]:items-stretch"
          >
            <MagneticLink
              {...primaryCta.anchorProps}
              enabled={pointerFx}
              className="hero-cta-primary inline-flex items-center justify-center gap-2.5 rounded-[10px] border border-sky-300/35 px-[22px] py-[15px] text-[clamp(14px,1.05vw,15.5px)] font-semibold tracking-[-.01em] text-fg"
            >
              <span className="whitespace-nowrap">{COPY.primaryCta}</span>
              {primaryCta.external && <span className="sr-only"> (abre o WhatsApp)</span>}
              <span
                aria-hidden
                data-magnetic-arrow
                className="inline-block transition-transform duration-300 ease-expo"
              >
                →
              </span>
            </MagneticLink>
            <MagneticLink
              href="#projetos"
              enabled={pointerFx}
              className="inline-flex items-center justify-center gap-2.5 rounded-[10px] border border-white/12 bg-white/[.035] px-5 py-[15px] text-[clamp(14px,1.05vw,15.5px)] font-medium whitespace-nowrap text-soft backdrop-blur-[10px] hover:border-sky-300/45 hover:bg-white/[.075]"
            >
              {COPY.secondaryCta}
            </MagneticLink>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={at(1.05, 0.9)}
            className="mt-[clamp(28px,3.6vh,42px)] flex items-center gap-3 text-[11.5px] leading-[1.6] tracking-[.16em] text-muted uppercase max-[480px]:items-start"
          >
            <span aria-hidden className="hero-rule h-px w-[clamp(24px,4vw,54px)] flex-none max-[480px]:mt-[.8em]" />
            <span>{COPY.trust}</span>
          </motion.div>
        </div>

        {/* Video/Orb column */}
        <motion.div
          variants={fadeScale}
          custom={at(0.5, 1.4)}
          className="relative min-w-0 flex-[1_1_300px] self-center"
          style={{ y: reduce ? 0 : parallaxY }}
        >
          <div ref={stageRef} className="relative h-[clamp(300px,44vw,660px)] will-change-transform">
            <div aria-hidden className="hero-video-glow pointer-events-none absolute top-[12%] right-[-6%] bottom-[8%] left-[8%] blur-[26px]" />

            {/* Toggle between HeroVideo and LiveOrb - using LiveOrb by default */}
            <div className="absolute inset-0 flex items-center justify-center">
              <LiveOrb
                variant="webgl"
                size={380}
                colors={["#0EA5E9", "#2563EB", "#7DD3FC"]}
                interactive={pointerFx}
              />
            </div>

            <div aria-hidden className="hero-floor-shadow pointer-events-none absolute right-[2%] bottom-[6%] left-[14%] h-[14%] blur-[18px]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade — above the video when side by side, behind content when stacked. */}
      <div
        aria-hidden
        className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[18vh] min-[700px]:z-[12]"
      />
    </section>
  );
}
