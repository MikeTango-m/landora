/**
 * Public site URL, used for absolute metadata (Open Graph images, canonical
 * URLs, robots.txt, sitemap.xml, JSON-LD). Set NEXT_PUBLIC_SITE_URL once the
 * final domain is known — see .env.example. Falls back to localhost so local
 * builds don't fail; never a guessed production domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
