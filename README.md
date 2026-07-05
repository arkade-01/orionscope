# Orion Scope

Onchain fund-recovery landing page — a Next.js (App Router + TypeScript)
implementation of the `Orionscope.dc.html` design.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

## Structure

```
app/
  layout.tsx      Root layout, fonts (next/font), metadata
  page.tsx        Composes the page sections
  globals.css     Resets, keyframes, image-slot + responsive rules
components/        One component per section (Hero, Services, Faq, …)
lib/
  css.ts          sx() — parses the design's inline CSS into style objects
  data.ts         Copy for services, steps, cases, outreach, FAQ
public/assets/    Statue imagery (hero.jpg, why.jpg) from the design handoff
reference/         Original design prototype, kept for reference
design_handoff_orionscope_site/   Source spec + original assets
```

Interactive pieces (`Hero` stat count-up, `Faq` accordion, `Cta` form) are
client components; everything else renders on the server.
