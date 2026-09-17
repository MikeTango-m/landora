"use client";

import { CheckIcon, SpinnerGapIcon } from "@phosphor-icons/react/ssr";
import { MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import { EASE_EXPO } from "@/components/hero/motion";
import { formatPrice, PLANS, type Plan } from "@/content/pricing";
import { createPlanCheckoutUrl, isPlanPurchasable } from "@/lib/shopify";
import { useSpotlight } from "@/lib/use-spotlight";
import { CUSTOM_QUOTE_MESSAGE, planQuoteMessage, whatsappLink } from "@/lib/whatsapp";

const customCta = whatsappLink(CUSTOM_QUOTE_MESSAGE);

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE_EXPO, delay },
});

export function PricingSection() {
  const onPointerMove = useSpotlight<HTMLUListElement>();

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="precos"
        aria-labelledby="precos-title"
        className="relative overflow-hidden border-t border-white/[.06] bg-ink px-[clamp(20px,4vw,56px)] py-[clamp(72px,11vh,128px)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[20%] mx-auto h-[620px] max-w-[1100px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(37,99,235,.12),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[1180px]">
          <motion.header {...reveal()} className="mx-auto max-w-[680px] text-center">
            <p className="flex items-center justify-center gap-3 text-[11.5px] tracking-[.16em] text-muted uppercase">
              <span aria-hidden className="hero-rule h-px w-[clamp(24px,4vw,54px)] rotate-180" />
              Preços
              <span aria-hidden className="hero-rule h-px w-[clamp(24px,4vw,54px)]" />
            </p>
            <h2
              id="precos-title"
              className="mt-4 text-[clamp(30px,4.2vw,52px)] leading-[1.02] font-extrabold tracking-[-.03em] text-balance"
            >
              Um plano para cada fase <span className="hero-headline-gradient">do teu negócio.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[540px] text-[clamp(15px,1.1vw,17px)] leading-[1.62] text-pretty text-fg-2">
              Valores de referência entre 250 € e 1000 € (sem IVA), com pagamento único. Escolhe o plano que mais se aproxima do que precisas e
              enviamos-te uma proposta à medida.
            </p>
          </motion.header>

          <ul
            onPointerMove={onPointerMove}
            className="mt-[clamp(40px,6vh,64px)] grid items-stretch gap-5 md:grid-cols-3 md:gap-4 lg:gap-5"
          >
            {PLANS.map((plan, i) => (
              <motion.li key={plan.slug} {...reveal(i * 0.08)} className={plan.highlighted ? "md:-my-3" : ""}>
                <PlanCard plan={plan} />
              </motion.li>
            ))}
          </ul>

          <motion.div
            {...reveal(0.1)}
            className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[14px] border border-dashed border-white/15 px-[clamp(20px,2.4vw,28px)] py-5 sm:flex-row sm:items-center"
          >
            <div>
              <p className="font-semibold text-soft">Precisas de algo diferente?</p>
              <p className="mt-1 text-[14.5px] text-fg-2">
                Várias páginas, um site completo ou uma integração específica: conta-nos e fazemos uma proposta.
              </p>
            </div>
            <a
              {...customCta.anchorProps}
              className="group/cta inline-flex flex-none items-center justify-center gap-2 rounded-[10px] border border-white/12 bg-white/[.035] px-4 py-3 text-[14.5px] font-medium whitespace-nowrap text-soft transition-colors hover:border-sky-300/45 hover:bg-white/[.075] max-sm:w-full"
            >
              Pedir orçamento à medida
              {customCta.external && <span className="sr-only"> (abre o WhatsApp)</span>}
              <span aria-hidden className="transition-transform duration-300 ease-expo group-hover/cta:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const cta = whatsappLink(planQuoteMessage(`${plan.name} (${formatPrice(plan.price)})`));
  const purchasable = isPlanPurchasable(plan.slug);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleBuy() {
    setStatus("loading");
    setError("");
    try {
      const url = await createPlanCheckoutUrl(plan.slug);
      window.location.href = url;
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Não foi possível preparar o checkout. Tenta novamente.");
    }
  }

  return (
    <article
      aria-labelledby={`plano-${plan.slug}`}
      className={`spotlight flex h-full flex-col rounded-[16px] border p-[clamp(22px,2.4vw,32px)] transition-colors duration-300 ${
        plan.highlighted
          ? "border-sky-300/35 bg-[linear-gradient(180deg,rgba(37,99,235,.16),rgba(8,11,20,.9)_45%)] shadow-[0_24px_80px_rgba(2,3,8,.6),0_0_0_1px_rgba(37,99,235,.2),0_0_60px_rgba(37,99,235,.14)]"
          : "border-white/[.08] bg-white/[.02] hover:border-sky/30"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id={`plano-${plan.slug}`} className="text-xl font-bold tracking-[-.015em]">
          {plan.name}
        </h3>
        {plan.badge && (
          <span className="rounded-full border border-sky-300/40 bg-accent/25 px-2.5 py-1 text-[10.5px] font-semibold tracking-[.12em] text-sky-300 uppercase">
            {plan.badge}
          </span>
        )}
      </div>
      <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{plan.tagline}</p>

      <div className="mt-6 border-y border-white/[.07] py-5">
        <p
          className={`w-fit text-[clamp(34px,3.4vw,44px)] leading-none font-extrabold tracking-[-.03em] tabular-nums ${
            plan.highlighted ? "hero-headline-gradient" : "text-fg"
          }`}
        >
          {formatPrice(plan.price)}
        </p>
        <p className="mt-2 text-[13px] text-muted">Pagamento único · sem IVA</p>
      </div>

      {plan.includesLead && <p className="mt-5 text-[13.5px] font-medium text-soft">{plan.includesLead}</p>}
      <ul className={`grid gap-3 ${plan.includesLead ? "mt-3" : "mt-5"}`}>
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[14.5px] leading-snug text-fg-2">
            <span
              className={`mt-px grid size-5 flex-none place-items-center rounded-full ${
                plan.highlighted ? "bg-accent/35 text-sky-300" : "bg-white/[.06] text-sky-300"
              }`}
            >
              <CheckIcon aria-hidden size={11} weight="bold" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a
        {...cta.anchorProps}
        aria-describedby={`plano-${plan.slug}`}
        className={`group/cta mt-8 inline-flex items-center justify-center gap-2.5 rounded-[10px] border px-5 py-3.5 text-[15px] font-semibold transition-[box-shadow,border-color,background-color] md:mt-auto ${
          plan.highlighted
            ? "hero-cta-primary border-sky-300/35 text-fg"
            : "border-white/12 bg-white/[.035] text-soft hover:border-sky-300/45 hover:bg-white/[.075]"
        }`}
      >
        Pedir orçamento
        {cta.external && <span className="sr-only"> (abre o WhatsApp)</span>}
        <span aria-hidden className="transition-transform duration-300 ease-expo group-hover/cta:translate-x-1">
          →
        </span>
      </a>

      {purchasable && (
        <div className="mt-3">
          <button
            type="button"
            onClick={handleBuy}
            disabled={status === "loading"}
            aria-describedby={`plano-${plan.slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-white/12 bg-transparent px-5 py-3 text-[14px] font-medium text-fg-2 transition-colors hover:border-sky-300/45 hover:text-soft disabled:cursor-wait disabled:opacity-60"
          >
            {status === "loading" && <SpinnerGapIcon aria-hidden size={15} className="animate-spin" />}
            {status === "loading" ? "A preparar checkout…" : "Comprar plano"}
          </button>
          {status === "error" && (
            <p role="alert" className="mt-2 text-[13px] text-red-400">
              {error}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
