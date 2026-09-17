/**
 * Services for the #servicos section. Proposed copy — adjust to what the agency
 * actually offers. Deliberately no deadlines, prices or numeric promises here;
 * those belong in #precos once they are defined.
 */

export type ServiceIcon = "browser" | "target" | "pen" | "code" | "lightning" | "chart" | "wrench";

export type Service = {
  slug: string;
  icon: ServiceIcon;
  title: string;
  description: string;
};

export const FEATURED_SERVICE = {
  icon: "browser" as ServiceIcon,
  eyebrow: "Serviço principal",
  title: "Landing page à medida",
  description:
    "Da estratégia ao lançamento: uma página focada num único objetivo, pensada para o teu público e construída para converter.",
  includes: [
    "Sessão para definir objetivo e público",
    "Estrutura e copywriting",
    "Design para telemóvel e desktop",
    "Desenvolvimento e publicação",
    "Formulários ou WhatsApp integrados",
    "Revisões antes do lançamento",
  ],
  idealFor: ["Lançamentos", "Campanhas", "Captação de contactos"],
};

export const SERVICES: Service[] = [
  {
    slug: "estrategia",
    icon: "target",
    title: "Estratégia & copy",
    description:
      "Mensagem clara, estrutura pensada para a decisão e textos que respondem às dúvidas do teu cliente.",
  },
  {
    slug: "design",
    icon: "pen",
    title: "Design UI",
    description: "A tua identidade aplicada à página, com um layout desenhado primeiro para o telemóvel.",
  },
  {
    slug: "desenvolvimento",
    icon: "code",
    title: "Desenvolvimento",
    description: "Código leve e moderno em Next.js, fácil de atualizar e pronto para crescer contigo.",
  },
  {
    slug: "performance",
    icon: "lightning",
    title: "Performance & SEO",
    description: "Carregamento rápido, SEO técnico e boas práticas de acessibilidade desde o primeiro dia.",
  },
  {
    slug: "medicao",
    icon: "chart",
    title: "Medição & otimização",
    description: "Analytics e eventos de conversão configurados, para saberes o que funciona e o que melhorar.",
  },
  {
    slug: "manutencao",
    icon: "wrench",
    title: "Manutenção",
    description: "Atualizações de conteúdo, pequenas melhorias e apoio técnico depois do lançamento.",
  },
];
