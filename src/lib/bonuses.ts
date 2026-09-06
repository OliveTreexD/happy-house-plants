/** B2 bonus printables already committed under `public/`. Do not invent files. */

export const BONUS_PRINTABLES = [
  {
    id: "watering",
    title: "Watering checklist",
    body: "A one-week watering pass — when to water, when to wait.",
    href: "/Happy-House-Plants-Watering-Checklist.pdf",
    filename: "Happy-House-Plants-Watering-Checklist.pdf",
  },
  {
    id: "potting",
    title: "Potting checklist",
    body: "Drainage hole, cachepot, and skip the gravel layer.",
    href: "/Happy-House-Plants-Potting-Checklist.pdf",
    filename: "Happy-House-Plants-Potting-Checklist.pdf",
  },
] as const;

export type BonusPrintable = (typeof BONUS_PRINTABLES)[number];
