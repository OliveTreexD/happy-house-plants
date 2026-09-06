"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { BONUS_PRINTABLES, type BonusPrintable } from "@/lib/bonuses";

type BonusPrintablesProps = {
  heading?: string;
  intro?: string;
  layout?: "cards" | "links";
};

const DEFAULT_INTRO =
  "Two one-page checklists to keep beside the watering can. Free to download — no email needed.";

const DOWNLOAD_LINK_CLASS =
  "inline-flex min-h-12 items-center justify-center rounded-full border-2 border-sage-deep bg-card px-6 text-base font-semibold text-sage-deep shadow-sm transition hover:bg-sage-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep";

export function BonusPrintables({
  heading = "Bonus printables",
  intro = DEFAULT_INTRO,
  layout = "cards",
}: BonusPrintablesProps) {
  switch (layout) {
    case "cards":
      return (
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">
            Included extras
          </p>
          <h2 className="mt-3 font-serif text-3xl text-sage-deep sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-sage-ink/85">
            {intro}
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {BONUS_PRINTABLES.map((bonus) => (
              <li
                key={bonus.id}
                className="flex flex-col rounded-3xl bg-card p-6 shadow-sm ring-1 ring-sage-deep/10"
              >
                <h3 className="font-serif text-xl text-sage-deep">
                  {bonus.title}
                </h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-sage-ink/85">
                  {bonus.body}
                </p>
                <BonusDownloadLink bonus={bonus} className="mt-5">
                  Download {bonus.title.toLowerCase()}
                </BonusDownloadLink>
              </li>
            ))}
          </ul>
        </div>
      );
    case "links":
      return (
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">
            {heading}
          </p>
          <p className="mt-2 text-base leading-relaxed text-sage-ink/85">
            {intro}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {BONUS_PRINTABLES.map((bonus) => (
              <BonusDownloadLink key={bonus.id} bonus={bonus}>
                {bonus.title}
              </BonusDownloadLink>
            ))}
          </div>
        </div>
      );
    default: {
      const _exhaustive: never = layout;
      return _exhaustive;
    }
  }
}

function BonusDownloadLink({
  bonus,
  className,
  children,
}: {
  bonus: BonusPrintable;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={bonus.href}
      download={bonus.filename}
      data-event="bonus_download"
      data-event-label={bonus.id}
      onClick={() => {
        trackEvent({
          name: "bonus_download",
          label: bonus.id,
          href: bonus.href,
        });
      }}
      className={
        className ? `${DOWNLOAD_LINK_CLASS} ${className}` : DOWNLOAD_LINK_CLASS
      }
    >
      {children}
    </a>
  );
}
