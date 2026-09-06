import {
  resolveUtmParams,
  type UtmParams,
} from "@/lib/utm";

export const ANALYTICS_EVENT_NAMES = [
  "page_view",
  "buy_cta_click",
  "bonus_download",
  "sample_unlock",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  label?: string;
  href?: string;
  utm?: UtmParams;
};

export function isAnalyticsEventName(
  value: unknown,
): value is AnalyticsEventName {
  return (
    typeof value === "string" &&
    (ANALYTICS_EVENT_NAMES as readonly string[]).includes(value)
  );
}

/** Privacy-light first-party ping. No cookies, no third-party pixels. */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    name: event.name,
    label: event.label,
    href: event.href,
    path: window.location.pathname,
    utm: event.utm ?? resolveUtmParams(window.location.search),
  };

  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/event",
        new Blob([body], { type: "application/json" }),
      );
      return;
    }

    void fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Analytics must never break the page.
  }
}
