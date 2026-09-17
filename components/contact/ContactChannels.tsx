import {
  BehanceLogoIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  PhoneIcon,
  TiktokLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { CONTACT, SOCIAL_LABELS, telHref, type SocialNetwork } from "@/content/contact";

export const SOCIAL_ICONS: Record<SocialNetwork, Icon> = {
  instagram: InstagramLogoIcon,
  linkedin: LinkedinLogoIcon,
  facebook: FacebookLogoIcon,
  tiktok: TiktokLogoIcon,
  behance: BehanceLogoIcon,
  youtube: YoutubeLogoIcon,
  x: XLogoIcon,
};

/** Direct contact details from content/contact.ts; empty fields are skipped. */
export function ContactChannels() {
  const { email, phone, hours, socials } = CONTACT;

  return (
    <div className="rounded-[14px] border border-white/[.08] bg-white/[.02] p-5">
      <p className="text-[11.5px] tracking-[.16em] text-muted uppercase">Contactos diretos</p>
      <ul className="mt-4 grid gap-3.5">
        {email && (
          <Channel icon={<EnvelopeSimpleIcon size={18} />} label="Email">
            <a href={`mailto:${email}`} className="break-all text-soft transition-colors hover:text-sky-300">
              {email}
            </a>
          </Channel>
        )}
        {phone && (
          <Channel icon={<PhoneIcon size={18} />} label="Telefone">
            <a href={telHref(phone)} className="text-soft tabular-nums transition-colors hover:text-sky-300">
              {phone}
            </a>
          </Channel>
        )}
        {hours && (
          <Channel icon={<ClockIcon size={18} />} label="Horário">
            <span className="text-soft">{hours}</span>
          </Channel>
        )}
      </ul>

      {socials.length > 0 && <SocialLinks className="mt-5 border-t border-white/[.07] pt-4" />}
    </div>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  if (CONTACT.socials.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Redes sociais">
      {CONTACT.socials.map(({ network, url }) => {
        const SocialIcon = SOCIAL_ICONS[network];
        return (
          <li key={network}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SOCIAL_LABELS[network]} (abre num novo separador)`}
              className="grid size-10 place-items-center rounded-[10px] border border-white/10 bg-white/[.03] text-fg-2 transition-colors hover:border-sky-300/45 hover:text-sky-300"
            >
              <SocialIcon aria-hidden size={19} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function Channel({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-3.5">
      <span aria-hidden className="grid size-9 flex-none place-items-center rounded-[10px] bg-accent/15 text-sky-300">
        {icon}
      </span>
      <span className="min-w-0 text-[14.5px] leading-snug">
        <span className="block text-[12px] text-muted">{label}</span>
        {children}
      </span>
    </li>
  );
}
