/** Placeholder checkout URLs. Live Etsy + Payhip listings land in OLI-11. */
export const STORE_LINKS = {
  etsy: "#placeholder-etsy",
  payhip: "#placeholder-payhip",
} as const;

type BuyCtasProps = {
  layout?: "hero" | "compact";
};

export function BuyCtas({ layout = "hero" }: BuyCtasProps) {
  const stack =
    layout === "hero"
      ? "flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap"
      : "flex w-full flex-col gap-3 sm:flex-row";

  return (
    <div className={stack}>
      <a
        href={STORE_LINKS.etsy}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-sage-deep px-6 text-base font-semibold text-cream shadow-sm transition hover:bg-sage-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
      >
        Buy on Etsy
      </a>
      <a
        href={STORE_LINKS.payhip}
        className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-sage-deep bg-card px-6 text-base font-semibold text-sage-deep shadow-sm transition hover:bg-sage-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
      >
        Buy on Payhip
      </a>
    </div>
  );
}
