"use client";

import { FormEvent, useState } from "react";
import { BonusPrintables } from "@/components/bonus-printables";
import { BuyCtas } from "@/components/buy-ctas";
import { trackEvent } from "@/lib/analytics";
import {
  isValidEmail,
  normalizeEmail,
  SAMPLE_PDF_FILENAME,
} from "@/lib/sample";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "ready"; pdfUrl: string }
  | { status: "error"; message: string };

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

      startDownload(payload.pdfUrl);
      trackEvent({
        name: "sample_unlock",
        href: payload.pdfUrl,
      });
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
        <div className="space-y-6">
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
          <BonusPrintables
            layout="links"
            intro="The watering and potting checklists are yours too — no extra step."
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">
              Want the full guide?
            </p>
            <div className="mt-3">
              <BuyCtas layout="compact" />
            </div>
          </div>
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
