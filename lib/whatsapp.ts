/**
 * WhatsApp click-to-chat links.
 *
 * The number comes from NEXT_PUBLIC_WHATSAPP_NUMBER (international format, e.g.
 * 351912345678 — country code, no "+" or spaces; other characters are stripped).
 * It is inlined at build time, so restart `next dev` / rebuild after changing it.
 * Without a number the link falls back to an on-page anchor, so buttons never break.
 */
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

export const WHATSAPP_MESSAGES = {
  landingPage: "Olá! Vim pelo site da Landora e quero uma landing page para o meu negócio.",
  project: "Olá! Vim pelo site da Landora e gostava de começar um projeto.",
  services: "Olá! Vim pelo site da Landora e gostava de perceber que serviços fazem sentido para o meu negócio.",
  process: "Olá! Vim pelo site da Landora e gostava de marcar a conversa inicial sobre a minha landing page.",
} as const;

/** Message for a plan's "Pedir orçamento" button. */
export const planQuoteMessage = (planName: string) =>
  `Olá! Vim pelo site da Landora e gostava de pedir um orçamento para o plano ${planName}.`;

/** Message for a custom quote that doesn't fit any plan. */
export const CUSTOM_QUOTE_MESSAGE =
  "Olá! Vim pelo site da Landora e gostava de pedir um orçamento à medida para o meu projeto.";

/** Message for the "Quero uma assim" button inside a portfolio project. */
export const projectInterestMessage = (projectName: string) =>
  `Olá! Vi o projeto "${projectName}" no site da Landora e quero uma landing page assim para o meu negócio.`;

export type ContactDetails = {
  name: string;
  business: string;
  plan: string;
  message: string;
};

/** Builds the message sent from the #contacto form (WhatsApp renders *bold*). */
export function composeContactMessage({ name, business, plan, message }: ContactDetails): string {
  const lines = [
    `Olá! Sou ${name.trim()} e vim pelo site da Landora.`,
    business.trim() && `*Negócio:* ${business.trim()}`,
    plan && `*Plano de interesse:* ${plan}`,
    message.trim() && `*Mensagem:* ${message.trim()}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export const isWhatsAppConfigured = WHATSAPP_NUMBER.length > 0;

export type WhatsAppLink = {
  /** Spread onto the <a>: new tab only when it really opens WhatsApp. */
  anchorProps: { href: string; target?: "_blank"; rel?: string };
  /** True when the link opens WhatsApp — use it for the screen-reader hint. */
  external: boolean;
};

export function whatsappLink(message: string, fallbackHref = "#contacto"): WhatsAppLink {
  if (!WHATSAPP_NUMBER) return { anchorProps: { href: fallbackHref }, external: false };
  return {
    anchorProps: {
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    external: true,
  };
}
