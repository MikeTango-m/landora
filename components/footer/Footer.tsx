import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import { SocialLinks } from "@/components/contact/ContactChannels";
import { CONTACT, telHref } from "@/content/contact";
import { NAV_LINKS } from "@/content/navigation";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/whatsapp";

const footerCta = whatsappLink(WHATSAPP_MESSAGES.project);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[.08] bg-ink-2 px-[clamp(20px,4vw,56px)] pt-14 pb-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-[340px]">
            <a href="#" className="inline-flex items-center gap-2.5 text-[15px] font-bold tracking-[.22em] text-fg uppercase">
              <span
                aria-hidden
                className="size-[9px] rounded-[2px] bg-linear-135 from-sky to-accent shadow-[0_0_14px_rgba(37,99,235,.8)]"
              />
              Landora
            </a>
            <p className="mt-4 text-[14.5px] leading-relaxed text-fg-2">
              Landing pages modernas, rápidas e estratégicas, criadas para transformar visitantes em clientes.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <nav aria-label="Rodapé">
              <p className="text-[11.5px] tracking-[.16em] text-muted uppercase">Navegação</p>
              <ul className="mt-4 grid gap-2.5 text-[14.5px]">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-fg-2 transition-colors hover:text-fg">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-[11.5px] tracking-[.16em] text-muted uppercase">Fala connosco</p>
              <a
                {...footerCta.anchorProps}
                className="mt-4 inline-flex items-center gap-2 rounded-[10px] border border-white/12 bg-white/[.035] px-4 py-2.5 text-[14.5px] font-medium text-soft transition-colors hover:border-sky-300/45 hover:bg-white/[.075]"
              >
                <WhatsappLogoIcon aria-hidden size={18} className="text-sky-300" />
                WhatsApp
                {footerCta.external && <span className="sr-only"> (abre o WhatsApp)</span>}
              </a>
              {(CONTACT.email || CONTACT.phone || CONTACT.hours) && (
                <ul className="mt-4 grid gap-2 text-[14.5px] text-fg-2">
                  {CONTACT.email && (
                    <li>
                      <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-fg">
                        {CONTACT.email}
                      </a>
                    </li>
                  )}
                  {CONTACT.phone && (
                    <li>
                      <a href={telHref(CONTACT.phone)} className="tabular-nums transition-colors hover:text-fg">
                        {CONTACT.phone}
                      </a>
                    </li>
                  )}
                  {CONTACT.hours && <li className="text-muted">{CONTACT.hours}</li>}
                </ul>
              )}
              <SocialLinks className="mt-4" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/[.06] pt-6 text-[13px] text-muted sm:flex-row sm:items-center">
          <p>© {year} Landora. Todos os direitos reservados.</p>
          <a href="#" className="w-fit transition-colors hover:text-fg">
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
