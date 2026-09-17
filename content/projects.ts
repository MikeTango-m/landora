/**
 * Portfolio entries for the #projetos section.
 *
 * These are DEMONSTRATION designs (fictitious brands, provided by the client as
 * examples of the work) — the UI labels them "Demonstração" and shows no invented
 * results/metrics. When real client work exists, add it with `concept: false`.
 */

export type PreviewLayout = "split" | "centered" | "stacked";

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  challenge: string;
  approach: string;
  sections: string[];
  features: string[];
  concept: boolean;
  /** Real screenshot/mockup in /public. When absent, the code-drawn preview is used. */
  image?: { src: string; width: number; height: number; alt: string };
  /** Drives the code-drawn page preview (fallback when there is no image). */
  preview: {
    layout: PreviewLayout;
    /** Background, surface, accent. */
    colors: [string, string, string];
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "vidasaudavel",
    name: "VidaSaudável",
    category: "Saúde",
    summary: "Hero luminosa para uma clínica de medicina geral e especialidades, focada na marcação de consultas.",
    challenge: "Transmitir confiança e proximidade logo no primeiro ecrã e levar o visitante a marcar consulta.",
    approach:
      "Tema claro em azul, fotografia da médica em destaque, botão \"Agendar Consulta\" no topo e no hero, e atalhos diretos para as especialidades.",
    sections: ["Hero com marcação", "Especialidades", "Sobre nós", "Equipa", "Contactos"],
    features: ["Tema claro", "Atalhos para especialidades", "Marcação sempre visível"],
    concept: true,
    image: {
      src: "/projects/vidasaudavel.jpg",
      width: 1536,
      height: 1024,
      alt: "Landing page da clínica VidaSaudável: título \"A sua saúde, a nossa prioridade\", médica sorridente e cartões de especialidades.",
    },
    preview: { layout: "split", colors: ["#EEF4FF", "#FFFFFF", "#2563EB"] },
  },
  {
    slug: "vida-plus",
    name: "Vida+",
    category: "Saúde",
    summary: "Versão escura e premium para uma clínica médica, com as vantagens e indicadores em destaque.",
    challenge: "Diferenciar a clínica com uma imagem mais moderna e sofisticada do que a concorrência.",
    approach:
      "Tema escuro com azul elétrico, título grande em três linhas, vantagens em quatro colunas e um bloco de indicadores junto à fotografia.",
    sections: ["Hero com marcação", "Especialidades", "Sobre nós", "Equipa", "Contactos"],
    features: ["Tema escuro", "Bloco de indicadores", "Convite ao scroll"],
    concept: true,
    image: {
      src: "/projects/vida-plus.jpg",
      width: 1672,
      height: 941,
      alt: "Landing page escura da clínica Vida+: título \"Cuidamos de si, em todas as fases da vida\" e médico a consultar um tablet.",
    },
    preview: { layout: "split", colors: ["#060B18", "#0E1830", "#3B82F6"] },
  },
  {
    slug: "burger-house",
    name: "Burger House",
    category: "Restauração",
    summary: "Página de impacto para uma hamburgueria artesanal, pensada para abrir o apetite e levar ao menu.",
    challenge: "Destacar a qualidade do produto e levar quem chega ao site a ver o menu e encomendar.",
    approach:
      "Fotografia de produto dramática, tipografia pincelada em amarelo, vantagens da casa em ícones e botão direto para o menu.",
    sections: ["Hero de produto", "Menu", "Sobre nós", "Avaliações", "Contacto"],
    features: ["Fotografia de produto", "Tipografia de marca", "Botão de encomenda"],
    concept: true,
    image: {
      src: "/projects/burger-house.jpg",
      width: 1536,
      height: 1024,
      alt: "Landing page da Burger House: título \"Hambúrgueres de verdade\" em amarelo e hambúrguer em grande plano sobre fundo escuro.",
    },
    preview: { layout: "split", colors: ["#0B0704", "#1C130A", "#F5A300"] },
  },
  {
    slug: "ironforge",
    name: "IronForge Fitness",
    category: "Fitness",
    summary: "Hero motivacional para um ginásio, com foco na primeira inscrição.",
    challenge: "Passar energia e ambição num só ecrã e converter visitas em novas inscrições.",
    approach:
      "Ambiente escuro de alto contraste com amarelo, frase de impacto, vantagens como planos flexíveis e botão \"Quero treinar\".",
    sections: ["Hero motivacional", "Planos", "Sobre nós", "Horários", "Contacto"],
    features: ["Alto contraste", "Planos em destaque", "Botão de inscrição"],
    concept: true,
    image: {
      src: "/projects/ironforge.jpg",
      width: 1536,
      height: 1024,
      alt: "Landing page do ginásio IronForge Fitness: título \"É o seu próximo nível\" e atleta de costas num ginásio escuro.",
    },
    preview: { layout: "split", colors: ["#070707", "#161616", "#FACC15"] },
  },
];

export const PROJECT_CATEGORIES = ["Todos", ...new Set(PROJECTS.map((p) => p.category))];
