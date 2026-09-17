/**
 * Public contact details shown in #contacto and in the footer.
 *
 * Fill in the real values — anything left empty is simply not rendered.
 * The WhatsApp number is configured separately in .env.local
 * (NEXT_PUBLIC_WHATSAPP_NUMBER), see .env.example.
 */

export type SocialNetwork = "instagram" | "linkedin" | "facebook" | "tiktok" | "behance" | "youtube" | "x";

export type ContactInfo = {
  /** e.g. "ola@landora.pt" */
  email: string;
  /** As it should be displayed, e.g. "+351 912 345 678". */
  phone: string;
  /** e.g. "Segunda a sexta, 9h–18h" */
  hours: string;
  socials: { network: SocialNetwork; url: string }[];
};

export const CONTACT: ContactInfo = {
  email: "",
  phone: "+351 939 191 507",
  hours: "",
  socials: [
    // { network: "instagram", url: "https://instagram.com/..." },
  ],
};

export const SOCIAL_LABELS: Record<SocialNetwork, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  tiktok: "TikTok",
  behance: "Behance",
  youtube: "YouTube",
  x: "X",
};

/** "+351 912 345 678" → "tel:+351912345678" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const hasContactChannels = Boolean(CONTACT.email || CONTACT.phone || CONTACT.hours || CONTACT.socials.length);
