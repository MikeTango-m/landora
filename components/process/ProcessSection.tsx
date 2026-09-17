"use client";

import { CheckIcon } from "@phosphor-icons/react/ssr";
import { MotionConfig, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { EASE_EXPO } from "@/components/hero/motion";
import { PROCESS_STEPS } from "@/content/process";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

const processCta = whatsappLink(WHATSAPP_MESSAGES.process);

/** Viewport line (from the top) where the progress fill "reads" the timeline. */
const READ_LINE = "60%";
/** Track inset in px — matches `top-5` / `bottom-5` (half of the size-10 dot). */
const TRACK_INSET = 20;

export function ProcessSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reached, setReached] = useState(0);
  const reduce = useReducedMotion();

  // 0 when the list's top crosses the read line, 1 when its bottom does.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: [`start ${READ_LINE}`, `end ${READ_LINE}`],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.4 });
  const fill = reduce ? scrollYProgress : smooth;

  // A step is reached once the fill passes its dot. The fill runs from TRACK_INSET
  // to height - TRACK_INSET (the track's top-5/bottom-5). State only changes when the count does.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const list = listRef.current;
    if (!list) return;
    const listRect = list.getBoundingClientRect();
    const fillEnd = TRACK_INSET + p * (listRect.height - TRACK_INSET * 2);
    const count = dotRefs.current.filter((dot) => {
      if (!dot) return false;
      const r = dot.getBoundingClientRect();
      return r.top - listRect.top + r.height / 2 <= fillEnd + 1;
    }).length;
    setReached((prev) => (prev === count ? prev : count));
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="processo"
        aria-labelledby="processo-title"
        // overflow-clip (not hidden) so the sticky column keeps working.
        className="relative overflow-clip border-t border-white/[.06] bg-ink px-[clamp(20px,4vw,56px)] py-[clamp(72px,11vh,128px)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_80%_at_15%_0%,rgba(37,99,235,.09),transparent_70%)]"
        />

        <div className="relative mx-auto grid max-w-[1280px] gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="flex items-center gap-3 text-[11.5px] tracking-[.16em] text-muted uppercase">
              <span aria-hidden className="hero-rule h-px w-[clamp(24px,4vw,54px)]" />
              Processo
            </p>
            <h2
              id="processo-title"
              className="mt-4 text-[clamp(30px,4.2vw,52px)] leading-[1.02] font-extrabold tracking-[-.03em] text-balance"
            >
              Do primeiro olá <span className="hero-headline-gradient">à página no ar.</span>
            </h2>
            <p className="mt-4 max-w-[480px] text-[clamp(15px,1.1vw,17px)] leading-[1.62] text-pretty text-fg-2">
              Um processo simples e transparente. Sabes sempre em que passo estamos e o que vem a seguir.
            </p>

            <p className="mt-8 hidden text-sm text-muted lg:block" aria-hidden>
              Passo <span className="font-semibold text-soft tabular-nums">{Math.max(reached, 1)}</span> de{" "}
              {PROCESS_STEPS.length}
            </p>

            <a
              {...processCta.anchorProps}
              className="hero-cta-primary group/cta mt-8 inline-flex items-center gap-2.5 rounded-[10px] border border-sky-300/35 px-5 py-3.5 text-[15px] font-semibold text-fg transition-shadow max-[480px]:w-full max-[480px]:justify-center lg:mt-5"
            >
              Marcar a conversa inicial
              {processCta.external && <span className="sr-only"> (abre o WhatsApp)</span>}
              <span aria-hidden className="transition-transform duration-300 ease-expo group-hover/cta:translate-x-1">
                →
              </span>
            </a>
          </motion.header>

          <ol ref={listRef} className="relative">
            {/* Track + scroll-linked fill, centred on the step dots (size-10 → 20px). */}
            <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px -translate-x-1/2 bg-white/10" />
            <motion.span
              aria-hidden
              style={{ scaleY: fill }}
              className="absolute top-5 bottom-5 left-5 w-px origin-top -translate-x-1/2 bg-[linear-gradient(180deg,#7DD3FC,#2563EB)] shadow-[0_0_12px_rgba(56,189,248,.6)]"
            />

            {PROCESS_STEPS.map((step, i) => {
              const isReached = i < reached;
              return (
                <li key={step.title} className="relative flex gap-5 pb-12 last:pb-0 sm:gap-7">
                  <span
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    aria-hidden
                    className={`relative z-10 grid size-10 flex-none place-items-center rounded-full border text-sm font-semibold tabular-nums transition-[background-color,border-color,color,box-shadow] duration-500 ${
                      isReached
                        ? "border-sky-300/60 bg-[linear-gradient(135deg,#2563EB,#1E3A8A)] text-white shadow-[0_0_0_5px_rgba(37,99,235,.15),0_0_24px_rgba(37,99,235,.5)]"
                        : "border-white/15 bg-ink-2 text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: EASE_EXPO }}
                    className="min-w-0 flex-1 pt-1.5"
                  >
                    <h3
                      className={`text-[clamp(18px,1.6vw,22px)] font-semibold tracking-[-.015em] transition-colors duration-500 ${
                        isReached ? "text-fg" : "text-soft"
                      }`}
                    >
                      <span className="sr-only">Passo {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-fg-2">{step.description}</p>
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] py-1 pr-3.5 pl-1.5 text-[13px] text-badge">
                      <span
                        className={`grid size-5 place-items-center rounded-full transition-colors duration-500 ${
                          isReached ? "bg-accent/30 text-sky-300" : "bg-white/[.06] text-muted"
                        }`}
                      >
                        <CheckIcon aria-hidden size={11} weight="bold" />
                      </span>
                      <span>
                        <span className="text-muted">Recebes: </span>
                        {step.deliverable}
                      </span>
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </MotionConfig>
  );
}
