/** Marketing-v3 printables under `public/marketing/`. Do not point the homepage here. */

export const MARKETING_PRINTABLES = [
  {
    id: "sample",
    title: "Free sample",
    body: "A short excerpt from the ebook. Cover, contents, and a couple of care cards.",
    href: "/marketing/Happy-House-Plants-Free-Sample-Marketing-v3.pdf",
    filename: "Happy-House-Plants-Free-Sample-Marketing-v3.pdf",
  },
  {
    id: "watering",
    title: "Watering checklist",
    body: "A one-week watering pass (when to water, when to wait).",
    href: "/marketing/Happy-House-Plants-Watering-Checklist-Marketing-v3.pdf",
    filename: "Happy-House-Plants-Watering-Checklist-Marketing-v3.pdf",
  },
  {
    id: "potting",
    title: "Potting checklist",
    body: "Drainage hole, cachepot, and skip the gravel layer.",
    href: "/marketing/Happy-House-Plants-Potting-Checklist-Marketing-v3.pdf",
    filename: "Happy-House-Plants-Potting-Checklist-Marketing-v3.pdf",
  },
] as const;

export type MarketingPrintable = (typeof MARKETING_PRINTABLES)[number];
