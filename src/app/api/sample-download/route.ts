import { NextResponse } from "next/server";
import {
  isValidEmail,
  normalizeEmail,
  SAMPLE_PDF_PATH,
} from "@/lib/sample";

type SampleDownloadBody = {
  email?: unknown;
};

export async function POST(request: Request) {
  let body: SampleDownloadBody;

  try {
    body = (await request.json()) as SampleDownloadBody;
  } catch {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  const email =
    typeof body.email === "string" ? normalizeEmail(body.email) : "";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  // v1: validate only — emails are not persisted.
  // FUTURE ESP: forward `email` to the list provider, then return pdfUrl.
  if (process.env.NODE_ENV !== "production") {
    console.info("[sample-download] lead (not stored):", email);
  }

  return NextResponse.json({ pdfUrl: SAMPLE_PDF_PATH });
}
