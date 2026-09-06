import { NextResponse } from "next/server";
import { isAnalyticsEventName } from "@/lib/analytics";
import { UTM_PARAM_KEYS, type UtmParams } from "@/lib/utm";

type EventBody = {
  name?: unknown;
  label?: unknown;
  href?: unknown;
  path?: unknown;
  utm?: unknown;
};

function asOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function readUtm(value: unknown): UtmParams | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const utm: UtmParams = {};
  for (const key of UTM_PARAM_KEYS) {
    const entry = asOptionalString(record[key]);
    if (entry) {
      utm[key] = entry;
    }
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}

export async function POST(request: Request) {
  let body: EventBody;

  try {
    body = (await request.json()) as EventBody;
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  if (!isAnalyticsEventName(body.name)) {
    return new NextResponse(null, { status: 204 });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", {
      name: body.name,
      label: asOptionalString(body.label),
      href: asOptionalString(body.href),
      path: asOptionalString(body.path),
      utm: readUtm(body.utm),
    });
  }

  // v1: no persistence, no third-party forward. Swap this hook later if needed.
  return new NextResponse(null, { status: 204 });
}
