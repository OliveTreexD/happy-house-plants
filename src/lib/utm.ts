/** First-party UTM helpers for Pinterest (and other) campaign links. */

export const UTM_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_PARAM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const UTM_STORAGE_KEY = "hhp.utm";

export function readUtmFromSearch(search: string): UtmParams {
  const query = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(query);
  const utm: UtmParams = {};

  for (const key of UTM_PARAM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) {
      utm[key] = value;
    }
  }

  return utm;
}

export function hasUtmParams(utm: UtmParams): boolean {
  return UTM_PARAM_KEYS.some((key) => Boolean(utm[key]));
}

export function persistUtmParams(utm: UtmParams): void {
  if (typeof window === "undefined" || !hasUtmParams(utm)) {
    return;
  }

  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
}

export function loadPersistedUtmParams(): UtmParams {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    const utm: UtmParams = {};
    const record = parsed as Record<string, unknown>;
    for (const key of UTM_PARAM_KEYS) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) {
        utm[key] = value.trim();
      }
    }
    return utm;
  } catch {
    return {};
  }
}

export function resolveUtmParams(search: string): UtmParams {
  const fromUrl = readUtmFromSearch(search);
  if (hasUtmParams(fromUrl)) {
    persistUtmParams(fromUrl);
    return fromUrl;
  }
  return loadPersistedUtmParams();
}

export function appendUtmToUrl(url: string, utm: UtmParams): string {
  if (!hasUtmParams(utm) || url.startsWith("#") || url.length === 0) {
    return url;
  }

  try {
    const base =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://placeholder.local";
    const parsed = new URL(url, base);

    for (const key of UTM_PARAM_KEYS) {
      const value = utm[key];
      if (value && !parsed.searchParams.has(key)) {
        parsed.searchParams.set(key, value);
      }
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return parsed.toString();
    }

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
}
