/**
 * Steps for the #processo section. Proposed copy — no durations or deadlines on
 * purpose, so the page never promises timings the agency hasn't defined.
 */

export type ProcessStep = {
  title: string;
  description: string;
  /** What the client has in hand at the end of the step. */
  deliverable: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Conversa inicial",
    description:
      "Falamos sobre o teu negócio, o público e o que a página tem de conseguir. Sem compromisso e sem jargão.",
    deliverable: "Objetivo e público definidos",
  },
  {
    title: "Estratégia & estrutura",
    description:
      "Desenhamos o percurso do visitante: que secções, por que ordem e com que mensagem, até ao botão de ação.",
    deliverable: "Estrutura da página e textos",
  },
  {
    title: "Design",
    description:
      "Criamos o visual da página para telemóvel e desktop, com a tua identidade. Revês e ajustamos contigo.",
    deliverable: "Design aprovado",
  },
  {
    title: "Desenvolvimento",
    description:
      "Construímos a página, ligamos formulários ou WhatsApp e testamos em vários dispositivos e browsers.",
    deliverable: "Página pronta para rever online",
  },
  {
    title: "Lançamento",
    description:
      "Publicamos no teu domínio, configuramos a medição de conversões e verificamos a velocidade de carregamento.",
    deliverable: "Página publicada",
  },
  {
    title: "Acompanhamento",
    description:
      "Olhamos para os dados das primeiras semanas e sugerimos melhorias para a página converter cada vez mais.",
    deliverable: "Recomendações de melhoria",
  },
];
