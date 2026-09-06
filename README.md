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

Buy CTAs currently use placeholder Etsy and Payhip hashes (`#placeholder-etsy`, `#placeholder-payhip`) until listings go live.

## Free sample download (OLI-10)

The landing page includes an email form that unlocks the B1 sample PDF at
`/Happy-House-Plants-Free-Sample.pdf` (served from `public/`).

v1 does **not** persist emails. Submit posts to `POST /api/sample-download`,
which validates the address and returns the static PDF URL. In development the
route logs the address to the server console (`lead (not stored)`). There is no
database and no ESP yet.

`FUTURE ESP:` hook the provider in `src/app/api/sample-download/route.ts` after
validation, then keep returning the same `pdfUrl`.
