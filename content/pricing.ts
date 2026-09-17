/**
 * Plans for the #precos section. Prices are reference values in EUR, excluding
 * VAT ("sem IVA"), one-off payment — all confirmed by the client, range 250–1000 €; the final quote depends on scope,
 * so every plan still leads to "Pedir orçamento". Scope per plan is proposed copy —
 * adjust to what is actually offered.
 */

export type Plan = {
  slug: string;
  name: string;
  /** Reference price in whole euros. */
  price: number;
  tagline: string;
  /** Short label shown on the highlighted plan. */
  badge?: string;
  highlighted?: boolean;
  /** Line above the feature list, e.g. "Tudo do Essencial, mais:". */
  includesLead?: string;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    slug: "essencial",
    name: "Essencial",
    price: 250,
    tagline: "Para lançar depressa uma página simples e bem feita.",
    features: [
      "Landing page com estrutura base",
      "Design adaptado a telemóvel e desktop",
      "Botão de WhatsApp ou formulário simples",
      "Publicação no teu domínio",
    ],
  },
  {
    slug: "profissional",
    name: "Profissional",
    price: 500,
    tagline: "Para quem quer uma página pensada de raiz para converter.",
    badge: "Recomendado",
    highlighted: true,
    includesLead: "Tudo do Essencial, mais:",
    features: [
      "Estratégia e copywriting",
      "Design à medida da tua marca",
      "Medição de conversões",
      "SEO técnico e otimização de velocidade",
    ],
  },
  {
    slug: "crescimento",
    name: "Crescimento",
    price: 1000,
    tagline: "Para negócios que querem melhorar resultados de forma contínua.",
    includesLead: "Tudo do Profissional, mais:",
    features: [
      "Variações da página para campanhas",
      "Relatórios e recomendações de melhoria",
      "Manutenção e atualizações contínuas",
      "Apoio prioritário",
    ],
  },
];

const EUR = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/** "250 €", "1000 €" — pt-PT formatting. */
export const formatPrice = (euros: number) => EUR.format(euros);
