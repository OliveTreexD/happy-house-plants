/**
 * Checkout URLs for Buy CTAs.
 *
 * Leave NEXT_PUBLIC_ETSY_URL / NEXT_PUBLIC_PAYHIP_URL empty until listings
 * are published. Do not invent live store URLs — placeholders stay hashes
 * so a later env swap is the only change needed.
 */

const PLACEHOLDER_ETSY = "#placeholder-etsy";
const PLACEHOLDER_PAYHIP = "#placeholder-payhip";

function readPublicUrl(
  value: string | undefined,
  placeholder: string,
): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : placeholder;
}

export const STORE_LINKS = {
  etsy: readPublicUrl(process.env.NEXT_PUBLIC_ETSY_URL, PLACEHOLDER_ETSY),
  payhip: readPublicUrl(process.env.NEXT_PUBLIC_PAYHIP_URL, PLACEHOLDER_PAYHIP),
} as const;

export type StoreChannel = keyof typeof STORE_LINKS;

export function isPlaceholderStoreUrl(url: string): boolean {
  return url.startsWith("#placeholder-") || url.length === 0;
}

export function storeLinksArePlaceholders(): boolean {
  return (
    isPlaceholderStoreUrl(STORE_LINKS.etsy) ||
    isPlaceholderStoreUrl(STORE_LINKS.payhip)
  );
}
