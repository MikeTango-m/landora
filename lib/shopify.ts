/**
 * Optional Shopify Storefront API integration for the "Comprar plano" buttons.
 *
 * Disabled by default: it only activates once NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
 * NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN and a plan's variant ID are all set — see
 * .env.example. Values are inlined at build time, so restart `next dev` / rebuild
 * after changing them. "Pedir orçamento" (WhatsApp) always stays available
 * regardless of this configuration.
 *
 * Flow: cartCreate (Storefront API, one line item) → redirect to the returned
 * checkoutUrl, Shopify's own hosted checkout. No cart UI and no Buy Button
 * script to keep — each click just creates a fresh one-item cart for that
 * plan's variant and hands off to Shopify.
 */

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";

/** https://shopify.dev/docs/api/storefront — bump alongside Shopify's release cadence. */
const API_VERSION = "2026-07";

export const isShopifyConfigured = Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);

/** Maps a plan's `slug` (content/pricing.ts) to its Shopify variant ID env var. */
const PLAN_VARIANT_ENV: Record<string, string | undefined> = {
  essencial: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_ESSENCIAL,
  profissional: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_PROFISSIONAL,
  crescimento: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_CRESCIMENTO,
};

/** Whether a plan can be bought directly (Shopify configured + that plan's variant set). */
export function isPlanPurchasable(slug: string): boolean {
  return isShopifyConfigured && Boolean(PLAN_VARIANT_ENV[slug]);
}

const variantGid = (rawId: string) => (rawId.startsWith("gid://") ? rawId : `gid://shopify/ProductVariant/${rawId}`);

const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { message }
    }
  }
`;

type CartCreateResponse = {
  data?: { cartCreate?: { cart?: { checkoutUrl?: string }; userErrors?: { message: string }[] } };
  errors?: { message: string }[];
};

/** Creates a one-item Shopify cart for a plan and returns its hosted checkout URL. */
export async function createPlanCheckoutUrl(slug: string): Promise<string> {
  const rawId = PLAN_VARIANT_ENV[slug];
  if (!isShopifyConfigured || !rawId) {
    throw new Error("A compra online não está disponível para este plano.");
  }

  let res: Response;
  try {
    res = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: CART_CREATE_MUTATION,
        variables: { lines: [{ merchandiseId: variantGid(rawId), quantity: 1 }] },
      }),
    });
  } catch {
    throw new Error("Não foi possível ligar à loja. Verifica a tua ligação e tenta novamente.");
  }

  if (!res.ok) throw new Error("A loja não respondeu como esperado. Tenta novamente.");

  const { data, errors }: CartCreateResponse = await res.json();
  const userError = errors?.[0]?.message ?? data?.cartCreate?.userErrors?.[0]?.message;
  if (userError) throw new Error(userError);

  const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl;
  if (!checkoutUrl) throw new Error("Não foi possível preparar o checkout. Tenta novamente.");

  return checkoutUrl;
}
