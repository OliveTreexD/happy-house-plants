# Happy House Plants

Sales landing page for the Happy House Plants ebook — a sage, cute starter guide to indoor plants.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

## Buy CTAs (placeholders until listings go live)

Buy buttons read `NEXT_PUBLIC_ETSY_URL` and `NEXT_PUBLIC_PAYHIP_URL` from the
environment (see `.env.example`). Until those are set, they stay labeled
placeholders (`#placeholder-etsy`, `#placeholder-payhip`) and do not invent
live store URLs.

## Bonus printables (OLI-11)

The landing page and the post-sample thank-you area link the B2 checklists
already in `public/`:

- `/Happy-House-Plants-Watering-Checklist.pdf`
- `/Happy-House-Plants-Potting-Checklist.pdf`

## Light analytics / UTM (OLI-11)

No third-party suite. Arrival `utm_*` query params (useful for Pinterest) are
read and stored in `sessionStorage`, then appended to live store URLs once
listings exist. Clicks and sample unlocks ping first-party `POST /api/event`
(allowlisted event names only). In development the route logs to the server
console; nothing is persisted.

## Free sample download (OLI-10)

The landing page includes an email form that unlocks the B1 sample PDF at
`/Happy-House-Plants-Free-Sample.pdf` (served from `public/`).

v1 does **not** persist emails. Submit posts to `POST /api/sample-download`,
which validates the address and returns the static PDF URL. In development the
route logs the address to the server console (`lead (not stored)`). There is no
database and no ESP yet.

`FUTURE ESP:` hook the provider in `src/app/api/sample-download/route.ts` after
validation, then keep returning the same `pdfUrl`.
