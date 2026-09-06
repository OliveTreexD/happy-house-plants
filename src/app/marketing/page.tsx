import type { Metadata } from "next";
import Link from "next/link";
import {
  MARKETING_PRINTABLES,
  type MarketingPrintable,
} from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Marketing printables, Happy House Plants",
  description:
    "Free sample and watering and potting checklists from the Happy House Plants marketing pack.",
};

export default function MarketingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-sage-deep/10 bg-cream/90">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <p className="font-serif text-lg text-sage-deep">Happy House Plants</p>
          <Link
            href="/"
            className="text-sm font-semibold text-leaf underline decoration-leaf/40 underline-offset-4 transition hover:text-sage-deep"
          >
            Back to the guide
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-sage px-5 py-16 text-cream sm:px-8 sm:py-20">
          <LeafAccent className="pointer-events-none absolute -left-8 top-8 hidden h-40 w-28 text-sage-deep/25 sm:block" />
          <LeafAccent className="pointer-events-none absolute -right-6 bottom-6 hidden h-36 w-24 rotate-180 text-sage-deep/25 md:block" />

          <div className="relative mx-auto w-full max-w-5xl">
            <p className="mb-4 inline-flex rounded-full bg-cream/20 px-3 py-1 text-sm font-semibold tracking-wide text-cream">
              Marketing printables
            </p>
            <h1 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
              Shareable sample and checklists
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
              Three printables from the Happy House Plants marketing pack. Open
              them here. No email and no checkout.
            </p>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <ul className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-3">
            {MARKETING_PRINTABLES.map((printable) => (
              <li key={printable.id}>
                <PrintableCard printable={printable} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-sage-deep/10 bg-sage-mist/60 px-5 py-8 sm:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-serif text-sage-deep">Happy House Plants</p>
          <p className="text-sm text-sage-ink/80">
            A cozy digital ebook from OliveTree
          </p>
        </div>
      </footer>
    </div>
  );
}

function PrintableCard({ printable }: { printable: MarketingPrintable }) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-card p-6 shadow-sm ring-1 ring-sage-deep/10">
      <h2 className="font-serif text-xl text-sage-deep">{printable.title}</h2>
      <p className="mt-3 flex-1 text-base leading-relaxed text-sage-ink/85">
        {printable.body}
      </p>
      <a
        href={printable.href}
        download={printable.filename}
        className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-sage-deep bg-card px-6 text-center text-base font-semibold text-sage-deep shadow-sm transition hover:bg-sage-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
      >
        Download {printable.title.toLowerCase()}
      </a>
    </article>
  );
}

function LeafAccent({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 120"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M40 8c18 18 28 40 28 58 0 22-12 42-28 50C24 108 12 88 12 66 12 48 22 26 40 8Z" />
      <path
        d="M40 20v78"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="3"
      />
    </svg>
  );
}
