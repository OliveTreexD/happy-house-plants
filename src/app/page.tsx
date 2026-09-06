import { BonusPrintables } from "@/components/bonus-printables";
import { BuyCtas } from "@/components/buy-ctas";
import { SampleDownloadForm } from "@/components/sample-download-form";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-sage-deep/10 bg-cream/90">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <p className="font-serif text-lg text-sage-deep">Happy House Plants</p>
          <p className="text-sm text-leaf">Digital ebook</p>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-sage px-5 py-16 text-cream sm:px-8 sm:py-24">
          <LeafAccent className="pointer-events-none absolute -left-8 top-8 hidden h-40 w-28 text-sage-deep/25 sm:block" />
          <LeafAccent className="pointer-events-none absolute -right-6 bottom-6 hidden h-36 w-24 rotate-180 text-sage-deep/25 md:block" />

          <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="max-w-xl">
              <p className="mb-4 inline-flex rounded-full bg-cream/20 px-3 py-1 text-sm font-semibold tracking-wide text-cream">
                Instant download · AU$12.95
              </p>
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl md:text-6xl">
                Happy House Plants
              </h1>
              <p className="mt-3 text-lg font-semibold tracking-wide text-cream/90 sm:text-xl">
                A guide to caring for indoor plants
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-cream/90 sm:text-lg">
                A short starter handbook — not an encyclopedia. Use the care
                cards when you bring a plant home, and keep it beside the
                watering can.
              </p>
              <div className="mt-8">
                <BuyCtas showPlaceholderNote />
              </div>
            </div>

            <aside className="mx-auto w-full max-w-sm rounded-[2rem] bg-card p-6 text-sage-ink shadow-lg shadow-sage-deep/15 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">
                What&apos;s inside
              </p>
              <ul className="mt-4 space-y-3 text-base leading-relaxed">
                <li>Care cards for light, water, mix, feed, and pets</li>
                <li>A calm first look at common pests</li>
                <li>Mistakes that actually kill plants</li>
                <li>Getting started with pots, light, and placement</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid w-full max-w-5xl gap-5 sm:grid-cols-3">
            <ValueCard
              title="Tuesday-night care cards"
              body="Skip to the chapter you need. Light, water, mix, feed, pets, and the usual way that plant dies."
            />
            <ValueCard
              title="Starter-friendly"
              body="Written for the plants you already love — and the ones you are about to bring home."
            />
            <ValueCard
              title="Take it with you"
              body="Instant digital download. Open it on your phone while you stand at the potting bench."
            />
          </div>
        </section>

        <section
          id="bonus-printables"
          className="px-5 pb-16 sm:px-8 sm:pb-20"
        >
          <div className="mx-auto w-full max-w-5xl">
            <BonusPrintables />
          </div>
        </section>

        <section
          id="free-sample"
          className="px-5 pb-16 sm:px-8 sm:pb-20"
        >
          <div className="mx-auto w-full max-w-5xl rounded-[2rem] bg-sage-mist/70 p-6 shadow-sm ring-1 ring-sage-deep/10 sm:p-10">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">
                Free sample
              </p>
              <h2 className="mt-3 font-serif text-3xl text-sage-deep sm:text-4xl">
                Peek at a care card first
              </h2>
              <p className="mt-3 text-base leading-relaxed text-sage-ink/85">
                Leave your email and we&apos;ll unlock a short excerpt from
                Happy House Plants. No checkout.
              </p>
            </div>
            <div className="mt-6 max-w-xl">
              <SampleDownloadForm />
            </div>
          </div>
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

function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-sage-deep/10">
      <h2 className="font-serif text-xl text-sage-deep">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-sage-ink/85">{body}</p>
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
