# Landora — Hero

Secção hero da Landora (agência de landing pages), implementada a partir do
handoff de design `design_handoff_landora_hero`.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · Framer Motion 13

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Estrutura

| Ficheiro | Papel |
| --- | --- |
| `app/globals.css` | Tokens (`@theme`: cores, easing, keyframes), foco, gradientes da hero, reduced motion |
| `app/layout.tsx` | Inter via `next/font/google` (400–800), `lang="pt-PT"` |
| `app/page.tsx` | Página: Hero → Projetos → Serviços → Processo → Preços → Contacto → Rodapé |
| `components/hero/Hero.tsx` | Composição, camadas de fundo, glow do cursor, parallax, textos (`COPY`) |
| `components/hero/Navbar.tsx` | Navbar fixa com estado de scroll e menu mobile |
| `components/hero/HeroVideo.tsx` | Vídeo do portátil (autoplay forçado via DOM) |
| `components/hero/MagneticLink.tsx` | Botões magnéticos |
| `components/hero/motion.ts` | Variants de entrada (timings do handoff) |
| `public/videos/` | `laptop-rotation.{webm,mp4}` + poster |
| `components/projects/ProjectsSection.tsx` | Secção `#projetos`: filtros por setor e grelha de cartões |
| `components/projects/ProjectDialog.tsx` | Detalhe do projeto (`<dialog>` nativo) com CTA de WhatsApp |
| `components/projects/ProjectMedia.tsx` | Imagem do projeto (`next/image`) ou, sem imagem, a pré-visualização em código |
| `components/projects/ProjectPreview.tsx` | Pré-visualização da página desenhada em código (fallback) |
| `public/projects/` | Imagens dos projetos (JPG otimizados) |
| `content/projects.ts` | Dados do portefólio |
| `components/services/ServicesSection.tsx` | Secção `#servicos`: serviço em destaque, 6 serviços e CTA final (cartões com spotlight) |
| `content/services.ts` | Textos dos serviços (proposta, sem prazos nem preços) |
| `components/process/ProcessSection.tsx` | Secção `#processo`: linha do tempo com progresso ligado ao scroll e coluna fixa (desktop) |
| `content/process.ts` | Os 6 passos do processo (sem prazos) |
| `components/pricing/PricingSection.tsx` | Secção `#precos`: 3 planos com preço de referência + faixa de orçamento à medida |
| `content/pricing.ts` | Planos, preços (`price`, em euros) e o que cada um inclui |
| `components/contact/ContactSection.tsx` | Secção `#contacto`: formulário que prepara a mensagem e abre o WhatsApp |
| `components/footer/Footer.tsx` | Rodapé (Server Component): marca, navegação, WhatsApp, © |
| `content/navigation.ts` | Links de secção (incl. Contacto) partilhados pela navbar e pelo rodapé |
| `components/contact/ContactChannels.tsx` | Cartão "Contactos diretos" e ícones de redes sociais |
| `content/contact.ts` | **Email, telefone, horário e redes sociais** — campos vazios não aparecem |
| `lib/use-spotlight.ts` | Hook partilhado do brilho que segue o rato (`.spotlight`) |
| `lib/whatsapp.ts` | Links e mensagens de WhatsApp |

`<Hero showGrid showParticles cursorGlow />` — as três props são `true` por defeito.

## Botões

| Botão | Ação |
| --- | --- |
| **Quero a minha landing page** (hero) | Abre o WhatsApp com "Olá! Vim pelo site da Landora e quero uma landing page para o meu negócio." |
| **Começar um projeto** (navbar e menu mobile) | Abre o WhatsApp com "Olá! Vim pelo site da Landora e gostava de começar um projeto." |
| **Ver projetos** (hero) · **Projetos** (navbar) | Scroll para a secção `#projetos` |
| Cartão de projeto → **Quero uma assim** | Abre o WhatsApp com o nome do projeto na mensagem |
| **Serviços** (navbar) | Scroll para a secção `#servicos` |
| Serviços → **Quero a minha landing page** | WhatsApp (mesma mensagem do botão da hero) |
| Serviços → **Falar connosco** | WhatsApp: "…gostava de perceber que serviços fazem sentido para o meu negócio." |
| **Processo** (navbar) | Scroll para a secção `#processo` |
| Processo → **Marcar a conversa inicial** | WhatsApp: "…gostava de marcar a conversa inicial sobre a minha landing page." |
| **Preços** (navbar) | Scroll para a secção `#precos` |
| Plano → **Pedir orçamento** | WhatsApp: "…gostava de pedir um orçamento para o plano {nome} ({preço})." |
| Preços → **Pedir orçamento à medida** | WhatsApp: "…gostava de pedir um orçamento à medida para o meu projeto." |
| Contacto → **Enviar pelo WhatsApp** | Valida nome e mensagem (mín. 10 caracteres) e abre o WhatsApp com nome, negócio, plano e mensagem. Nada é guardado. Sem número configurado, o botão fica desativado com aviso |
| Rodapé → links e **WhatsApp** | Âncoras das secções · WhatsApp com a mensagem "começar um projeto" · email/telefone/redes (se preenchidos) |
| Navbar → separadores | Âncoras das 5 secções; o separador da secção visível fica destacado (`aria-current`) |

Preços de referência (pagamento único, sem IVA, intervalo 250–1000 € definido pelo cliente): Essencial 250 €,
Profissional 500 €, Crescimento 1000 €. Mudar em `content/pricing.ts` → `price`; o texto do cabeçalho
da secção menciona o intervalo e deve acompanhar se os limites mudarem.

Ícones: [Phosphor Icons](https://phosphoricons.com) (regra do Nocturne), importados de
`@phosphor-icons/react/ssr` com os nomes `*Icon`.

### Portefólio

Os 4 projetos em `content/projects.ts` (VidaSaudável, Vida+, Burger House, IronForge Fitness) são
**designs de demonstração** fornecidos pelo cliente, com imagens em `public/projects/` e a etiqueta
"Demonstração". Para acrescentar trabalho real: coloca a imagem em `public/projects/`, cria a entrada
com `image` (src, largura, altura, texto alternativo) e `concept: false`. Sem `image`, é usada a
pré-visualização desenhada em código (`preview`). As categorias dos filtros são geradas a partir dos projetos.

Configuração: copia `.env.example` para `.env.local` e define `NEXT_PUBLIC_WHATSAPP_NUMBER`
(formato internacional só com dígitos, ex.: `351912345678`). Reinicia o `npm run dev` depois de
mudar, porque o valor é embutido no build. Sem número, os botões levam para `#contacto`.
Mensagens e lógica em `lib/whatsapp.ts`.

## Diferenças em relação ao handoff (correções)

- **Título:** `9.2cqw` em vez de `11.2cqw`. A linha "uma página que vende." mede 10,75em em
  Inter 800; com 11.2cqw partia sempre em 4 linhas, contra a especificação de 2.
- **Menu mobile** (< 860px) — o protótipo não tinha e a navbar transbordava.
- **Badge em pt-PT:** "Landing pages • Design • Desenvolvimento" (era "development").
- **Vídeo:** áudio removido, WebM (0,6 MB) + MP4 (1,4 MB) + poster, e loop ida-e-volta de 8 s
  (o original saltava da vista frontal para a traseira a cada 4 s).
- **Reduced motion:** sem drift/partículas/pulse, sem parallax/magnético/glow, entrada instantânea, vídeo em pausa.
- **`:focus-visible`** com anel `#38BDF8`.
- **Efeitos de ponteiro** só com rato (`hover: hover` + `pointer: fine`) e limitados a um update por frame (rAF).
- **Degradê inferior** fica atrás do conteúdo quando as colunas empilham (< 700px).
- O CSS do Nocturne **não** é importado (o accent roxo e os títulos a 500 chocavam com o brief).

## SEO e metadados

| Ficheiro | Papel |
| --- | --- |
| `app/icon.tsx` / `app/apple-icon.tsx` | Favicon e ícone iOS gerados por código (`next/og`), quadrado com o gradiente da marca (`#38BDF8` → `#2563EB`) |
| `app/opengraph-image.tsx` | Imagem de partilha (1200×630) com o título da hero, fonte Inter obtida da Google Fonts em build (só os glifos usados) |
| `app/layout.tsx` | `metadata.openGraph` / `metadata.twitter` e `metadataBase` (usa `NEXT_PUBLIC_SITE_URL`) |
| `app/robots.ts` / `app/sitemap.ts` | Gerados a partir de `lib/site.ts` (`NEXT_PUBLIC_SITE_URL`); o sitemap tem uma única URL — página única, as secções são âncoras |
| `app/page.tsx` | JSON-LD (`ProfessionalService`) com nome, telefone, gama de preços e os 3 planos — só campos com dados reais |
| `lib/site.ts` | `SITE_URL`: lê `NEXT_PUBLIC_SITE_URL`, sem valor usa `http://localhost:3000` (nunca um domínio inventado) |

Define `NEXT_PUBLIC_SITE_URL` em `.env.local` (e na plataforma de alojamento ao publicar) assim que o domínio final for conhecido — ver `.env.example`. Sem essa variável os metadados, o robots.txt e o sitemap.xml apontam para `localhost`, o que é inofensivo mas não deve ir para produção.

## Compra online (Shopify, opcional)

| Ficheiro | Papel |
| --- | --- |
| `lib/shopify.ts` | Cliente Storefront API (`cartCreate` → `checkoutUrl`); `isShopifyConfigured` / `isPlanPurchasable` ficam `false` sem configuração |
| `components/pricing/PricingSection.tsx` | Botão **Comprar plano** por plano, só visível quando esse plano tem variante Shopify configurada; estados de carregamento/erro em pt-PT |

Desligado por defeito — sem as variáveis `NEXT_PUBLIC_SHOPIFY_*` em `.env.local` (ver `.env.example`), o botão não aparece e o site funciona exatamente como antes. **Pedir orçamento** (WhatsApp) mantém-se sempre disponível, com ou sem Shopify. Cada clique em "Comprar plano" cria um carrinho novo com 1 unidade da variante desse plano e redireciona para o checkout alojado pela Shopify — não há carrinho nem UI própria a manter.

## Nota sobre o vídeo

O README do handoff diz que o vídeo tem fundo quase preto, mas o clip tem fundo **azul**
(`#0058E9`, perto do accent `#2563EB`). Com a máscara radial isso dá o "spotlight" azul atrás
do portátil, que é o visual do protótipo. O clip tem marca d'água **KlingAI 3.0** no canto
inferior direito; a máscara torna essa zona transparente, mas para produção convém exportar
a versão sem marca d'água a partir do Kling.
