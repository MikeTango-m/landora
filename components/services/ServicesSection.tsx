"use client";

import {
  BrowserIcon,
  ChartLineIcon,
  CheckIcon,
  CodeIcon,
  LightningIcon,
  PenNibIcon,
  TargetIcon,
  WrenchIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_EXPO } from "@/components/hero/motion";
import { FEATURED_SERVICE, SERVICES, type ServiceIcon } from "@/content/services";
import { useSpotlight } from "@/lib/use-spotlight";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

const ICONS: Record<ServiceIcon, Icon> = {
  browser: BrowserIcon,
  target: TargetIcon,
  pen: PenNibIcon,
  code: CodeIcon,
  lightning: LightningIcon,
  chart: ChartLineIcon,
  wrench: WrenchIcon,
};

const featuredCta = whatsappLink(WHATSAPP_MESSAGES.landingPage);
const servicesCta = whatsappLink(WHATSAPP_MESSAGES.services);

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE_EXPO, delay: (i % 3) * 0.08 },
});

export function ServicesSection() {
  const onPointerMove = useSpotlight<HTMLUListElement>();

  const Featured = ICONS[FEATURED_SERVICE.icon];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="servicos"
        aria-labelledby="servicos-title"
        className="relative overflow-hidden border-t border-white/[.06] bg-ink px-[clamp(20px,4vw,56px)] py-[clamp(72px,11vh,128px)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_80%_at_85%_0%,rgba(56,189,248,.08),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[1280px]">
          <motion.header {...reveal(0)} className="max-w-[680px]">
            <p className="flex items-center gap-3 text-[11.5px] tracking-[.16em] text-muted uppercase">
              <span aria-hidden className="hero-rule h-px w-[clamp(24px,4vw,54px)]" />
              Serviços
            </p>
            <h2
              id="servicos-title"
              className="mt-4 text-[clamp(30px,4.2vw,52px)] leading-[1.02] font-extrabold tracking-[-.03em] text-balance"
            >
              Tudo o que a tua página precisa, <span className="hero-headline-gradient">num só sítio.</span>
            </h2>
            <p className="mt-4 max-w-[560px] text-[clamp(15px,1.1vw,17px)] leading-[1.62] text-pretty text-fg-2">
              Tratamos da landing page do princípio ao fim, ou só da parte que te falta.
            </p>
          </motion.header>

          <ul
            onPointerMove={onPointerMove}
            className="mt-[clamp(36px,5vh,56px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Featured service */}
            <motion.li {...reveal(0)} className="sm:col-span-2">
              <Card className="h-full border-sky/20 bg-[linear-gradient(135deg,rgba(37,99,235,.10),rgba(255,255,255,.02)_55%)]">
                <div className="flex h-full flex-col gap-7 md:flex-row md:gap-10">
                  <div className="flex flex-col md:w-[46%]">
                    <IconTile icon={Featured} accent />
                    <p className="mt-6 text-[11px] tracking-[.16em] text-sky-300 uppercase">{FEATURED_SERVICE.eyebrow}</p>
                    <h3 className="mt-2 text-[clamp(22px,2.2vw,28px)] leading-tight font-bold tracking-[-.02em]">
                      {FEATURED_SERVICE.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{FEATURED_SERVICE.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Ideal para">
                      {FEATURED_SERVICE.idealFor.map((t) => (
                        <li key={t} className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1 text-[12.5px] text-badge">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <a
                      {...featuredCta.anchorProps}
                      className="hero-cta-primary group/cta mt-7 inline-flex w-fit items-center gap-2.5 rounded-[10px] border border-sky-300/35 px-5 py-3.5 text-[15px] font-semibold text-fg transition-shadow max-[480px]:w-full max-[480px]:justify-center md:mt-auto"
                    >
                      Quero a minha landing page
                      {featuredCta.external && <span className="sr-only"> (abre o WhatsApp)</span>}
                      <span aria-hidden className="transition-transform duration-300 ease-expo group-hover/cta:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>

                  <div className="rounded-xl border border-white/[.07] bg-ink/60 p-5 md:flex-1 md:p-6">
                    <p className="text-sm font-semibold text-soft">O que está incluído</p>
                    <ul className="mt-4 grid gap-3">
                      {FEATURED_SERVICE.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-fg-2">
                          <span className="mt-px grid size-5 flex-none place-items-center rounded-full bg-accent/20 text-sky-300">
                            <CheckIcon aria-hidden size={12} weight="bold" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.li>

            {SERVICES.map((service, i) => {
              const ServiceIconComponent = ICONS[service.icon];
              return (
                <motion.li key={service.slug} {...reveal(i + 2)}>
                  <Card className="h-full">
                    <IconTile icon={ServiceIconComponent} />
                    <h3 className="mt-5 text-lg font-semibold tracking-[-.01em]">{service.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{service.description}</p>
                  </Card>
                </motion.li>
              );
            })}

            {/* Closing CTA fills the last grid slot */}
            <motion.li {...reveal(8)}>
              <Card className="flex h-full flex-col border-dashed border-white/15 bg-transparent">
                <h3 className="text-lg font-semibold tracking-[-.01em]">Não sabes por onde começar?</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">
                  Conta-nos o que precisas e dizemos-te, sem compromisso, o que faz sentido para o teu negócio.
                </p>
                <a
                  {...servicesCta.anchorProps}
                  className="group/cta mt-6 inline-flex w-fit items-center gap-2 rounded-[10px] border border-white/12 bg-white/[.035] px-4 py-3 text-[14.5px] font-medium text-soft transition-colors hover:border-sky-300/45 hover:bg-white/[.075] max-[480px]:w-full max-[480px]:justify-center sm:mt-auto"
                >
                  Falar connosco
                  {servicesCta.external && <span className="sr-only"> (abre o WhatsApp)</span>}
                  <span aria-hidden className="transition-transform duration-300 ease-expo group-hover/cta:translate-x-1">
                    →
                  </span>
                </a>
              </Card>
            </motion.li>
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`spotlight rounded-[14px] border border-white/[.08] bg-white/[.02] p-[clamp(20px,2.2vw,28px)] transition-colors duration-300 hover:border-sky/30 ${className}`}
    >
      {children}
    </div>
  );
}

function IconTile({ icon: IconComponent, accent = false }: { icon: Icon; accent?: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid size-11 place-items-center rounded-[10px] border ${
        accent
          ? "border-sky-300/35 bg-[linear-gradient(135deg,#2563EB,#1E3A8A)] text-white shadow-[0_8px_26px_rgba(37,99,235,.35)]"
          : "border-white/10 bg-white/[.04] text-sky-300"
      }`}
    >
      <IconComponent size={22} weight={accent ? "regular" : "light"} />
    </span>
  );
}
