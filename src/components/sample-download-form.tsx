"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  isValidEmail,
  normalizeEmail,
  SAMPLE_PDF_FILENAME,
  SAMPLE_PDF_PATH,
} from "@/lib/sample";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "ready"; pdfUrl: string }
  | { status: "error"; message: string };

const UNLOCK_STORAGE_KEY = "hhp-sample-unlocked";

function readUnlockedPdfUrl(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = sessionStorage.getItem(UNLOCK_STORAGE_KEY);
    return stored === SAMPLE_PDF_PATH ? stored : null;
  } catch {
    return null;
  }
}

function rememberUnlock(pdfUrl: string) {
  try {
    sessionStorage.setItem(UNLOCK_STORAGE_KEY, pdfUrl);
  } catch {
    // Private mode can block storage; the download link still works this visit.
  }
}

function startDownload(pdfUrl: string) {
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = SAMPLE_PDF_FILENAME;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function SampleDownloadForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>({ status: "idle" });

  useEffect(() => {
    const unlocked = readUnlockedPdfUrl();
    if (unlocked) {
      setState({ status: "ready", pdfUrl: unlocked });
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setState({
        status: "error",
        message: "Please enter a valid email so we can unlock the sample.",
      });
      return;
    }

    setState({ status: "submitting" });

    try {
      const response = await fetch("/api/sample-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized }),
      });

      const payload = (await response.json()) as {
        pdfUrl?: string;
        error?: string;
      };

      if (!response.ok || !payload.pdfUrl) {
        setState({
          status: "error",
          message: payload.error ?? "Something went sideways. Please try again.",
        });
        return;
      }

      rememberUnlock(payload.pdfUrl);
      startDownload(payload.pdfUrl);
      setState({ status: "ready", pdfUrl: payload.pdfUrl });
    } catch {
      setState({
        status: "error",
        message: "We could not send that just now. Please try again.",
      });
    }
  }

  switch (state.status) {
    case "ready":
      return (
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-sage-ink/85">
            Your sample is ready — a short excerpt from the ebook.
          </p>
          <a
            href={state.pdfUrl}
            download={SAMPLE_PDF_FILENAME}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sage-deep px-6 text-base font-semibold text-cream shadow-sm transition hover:bg-sage-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep sm:w-auto"
          >
            Download the free sample
          </a>
        </div>
      );
    case "idle":
    case "submitting":
    case "error":
      return (
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="sample-email">
              Email
            </label>
            <input
              id="sample-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (state.status === "error") {
                  setState({ status: "idle" });
                }
              }}
              placeholder="you@example.com"
              disabled={state.status === "submitting"}
              aria-invalid={state.status === "error"}
              aria-describedby="sample-privacy sample-status"
              className="min-h-12 w-full rounded-full border border-sage-deep/20 bg-cream px-5 text-base text-sage-ink placeholder:text-sage-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={state.status === "submitting"}
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-sage-deep px-6 text-base font-semibold text-cream shadow-sm transition hover:bg-sage-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep disabled:opacity-70"
            >
              {state.status === "submitting"
                ? "Sending…"
                : "Send me the sample"}
            </button>
          </div>
          <p
            id="sample-privacy"
            className="text-sm leading-relaxed text-sage-ink/70"
          >
            We use this to unlock the sample and, now and then, share a plant
            tip. No lists sold — and you can ignore us anytime.
          </p>
          <p
            id="sample-status"
            role="status"
            aria-live="polite"
            className="min-h-5 text-sm text-sage-deep"
          >
            {state.status === "error" ? state.message : ""}
          </p>
        </form>
      );
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}
