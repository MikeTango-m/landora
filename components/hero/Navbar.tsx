"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { NAV_LINKS } from "@/content/navigation";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";
import { EASE_EXPO } from "./motion";

const projectCta = whatsappLink(WHATSAPP_MESSAGES.project);

const SCROLL_THRESHOLD = 24;

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Scrolled state is a data attribute toggled via ref — no re-render on scroll.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const update = () => {
      nav.dataset.scrolled = String(window.scrollY > SCROLL_THRESHOLD);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Scroll-spy: the link of the section crossing the middle of the viewport is current.
  const [activeHref, setActiveHref] = useState<string | null>(null);
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector<HTMLElement>(l.href)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActiveHref(`#${hit.target.id}`);
        // Above the first section (hero) nothing is current.
        else if (sections[0] && sections[0].getBoundingClientRect().top > window.innerHeight / 2) setActiveHref(null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mql = window.matchMedia("(min-width: 860px)");
    const onResize = () => mql.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mql.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      data-scrolled="false"
      data-open={open}
      aria-label="Principal"
      className="group fixed inset-x-0 top-0 z-40 border-b border-white/0 bg-ink/0 backdrop-blur-[8px] transition-[background-color,border-color,backdrop-filter] duration-[350ms] ease-out data-[open=true]:border-white/10 data-[open=true]:bg-ink/90 data-[open=true]:backdrop-blur-[18px] data-[scrolled=true]:border-white/10 data-[scrolled=true]:bg-ink/[.74] data-[scrolled=true]:backdrop-blur-[18px]"
    >
      <div className="flex items-center justify-between gap-6 px-[clamp(20px,4vw,56px)] py-[18px]">
        <a href="#" className="flex items-center gap-2.5 text-[15px] font-bold uppercase tracking-[.22em] text-fg">
          <span
            aria-hidden
            className="size-[9px] rounded-[2px] bg-linear-135 from-sky to-accent shadow-[0_0_14px_rgba(37,99,235,.8)]"
          />
          Landora
        </a>

        <ul className="hidden items-center gap-[clamp(16px,2.2vw,34px)] text-sm min-[860px]:flex">
          {NAV_LINKS.map((l) => {
            const current = activeHref === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={current ? "location" : undefined}
                  className={`relative py-1 transition-colors duration-[250ms] hover:text-fg ${current ? "text-fg" : "text-fg-2"}`}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-1 mx-auto h-px bg-linear-to-r from-transparent via-sky to-transparent transition-opacity duration-300 ${
                      current ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            {...projectCta.anchorProps}
            className="hidden flex-none whitespace-nowrap rounded-lg border border-white/[.14] bg-white/[.03] px-[18px] py-2.5 text-[13.5px] font-medium text-fg transition-colors duration-[250ms] hover:border-sky/55 hover:bg-accent/[.14] min-[480px]:inline-flex"
          >
            Começar um projeto
            {projectCta.external && <span className="sr-only"> (abre o WhatsApp)</span>}
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((o) => !o)}
            className="relative grid size-10 place-items-center rounded-lg border border-white/[.14] bg-white/[.03] text-fg transition-colors hover:border-sky/55 min-[860px]:hidden"
          >
            <span aria-hidden className="relative block h-3 w-[18px]">
              <span className="absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ease-expo group-data-[open=true]:translate-y-[5.5px] group-data-[open=true]:rotate-45" />
              <span className="absolute inset-x-0 top-[5.5px] h-px bg-current transition-opacity duration-200 group-data-[open=true]:opacity-0" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 ease-expo group-data-[open=true]:-translate-y-[5.5px] group-data-[open=true]:-rotate-45" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            key="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
            className="overflow-hidden min-[860px]:hidden"
          >
            <ul className="flex flex-col gap-1 px-[clamp(20px,4vw,56px)] pb-5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={activeHref === l.href ? "location" : undefined}
                    className="block rounded-lg px-2 py-3 text-base text-fg-2 transition-colors hover:bg-white/[.04] hover:text-fg aria-[current=location]:bg-white/[.04] aria-[current=location]:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 min-[480px]:hidden">
                <a
                  {...projectCta.anchorProps}
                  onClick={() => setOpen(false)}
                  className="flex justify-center rounded-lg border border-white/[.14] bg-white/[.03] px-[18px] py-3 text-sm font-medium text-fg transition-colors hover:border-sky/55 hover:bg-accent/[.14]"
                >
                  Começar um projeto
                  {projectCta.external && <span className="sr-only"> (abre o WhatsApp)</span>}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
