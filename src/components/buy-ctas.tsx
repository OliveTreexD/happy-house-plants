"use client";

import { trackEvent } from "@/lib/analytics";
import {
  STORE_LINKS,
  isPlaceholderStoreUrl,
  storeLinksArePlaceholders,
  type StoreChannel,
} from "@/lib/store";
import { appendUtmToUrl, resolveUtmParams } from "@/lib/utm";

type BuyCtasProps = {
  layout?: "hero" | "compact";
  showPlaceholderNote?: boolean;
};

const CHANNEL_LABEL: Record<StoreChannel, string> = {
  etsy: "Buy on Etsy",
  payhip: "Buy on Payhip",
};

function storeHref(channel: StoreChannel): string {
  const url = STORE_LINKS[channel];
  if (typeof window === "undefined" || isPlaceholderStoreUrl(url)) {
    return url;
  }
  return appendUtmToUrl(url, resolveUtmParams(window.location.search));
}

export function BuyCtas({
  layout = "hero",
  showPlaceholderNote = false,
}: BuyCtasProps) {
  const placeholders = storeLinksArePlaceholders();
  const stack =
    layout === "hero"
      ? "flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap"
      : "flex w-full flex-col gap-3 sm:flex-row";

  return (
    <div className="flex flex-col gap-3">
      <div className={stack}>
        <StoreLink channel="etsy" />
        <StoreLink channel="payhip" variant="secondary" />
      </div>
      {showPlaceholderNote && placeholders ? (
        <p className="text-sm text-cream/80">
          Etsy and Payhip links are placeholders until the listings go live.{" "}
          <a
            href="#free-sample"
            className="underline decoration-cream/50 underline-offset-4 transition hover:text-cream"
          >
            Or try a free sample first
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}

function StoreLink({
  channel,
  variant = "primary",
}: {
  channel: StoreChannel;
  variant?: "primary" | "secondary";
}) {
  const href = STORE_LINKS[channel];
  const placeholder = isPlaceholderStoreUrl(href);
  const className =
    variant === "primary"
      ? "inline-flex min-h-12 items-center justify-center rounded-full bg-sage-deep px-6 text-base font-semibold text-cream shadow-sm transition hover:bg-sage-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
      : "inline-flex min-h-12 items-center justify-center rounded-full border-2 border-sage-deep bg-card px-6 text-base font-semibold text-sage-deep shadow-sm transition hover:bg-sage-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep";

  return (
    <a
      href={href}
      data-event="buy_cta_click"
      data-event-label={channel}
      data-store-placeholder={placeholder ? "true" : "false"}
      aria-disabled={placeholder || undefined}
      title={
        placeholder
          ? `${CHANNEL_LABEL[channel]} (placeholder until the listing is published)`
          : CHANNEL_LABEL[channel]
      }
      onClick={(event) => {
        const nextHref = storeHref(channel);
        trackEvent({
          name: "buy_cta_click",
          label: channel,
          href: nextHref,
        });

        if (placeholder) {
          event.preventDefault();
          return;
        }

        if (nextHref !== href) {
          event.preventDefault();
          window.location.assign(nextHref);
        }
      }}
      className={className}
    >
      {CHANNEL_LABEL[channel]}
      {placeholder ? (
        <span className="ml-2 text-xs font-semibold uppercase tracking-wide opacity-80">
          Soon
        </span>
      ) : null}
    </a>
  );
}
