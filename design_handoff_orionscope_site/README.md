# Handoff: Orion Scope Marketing Site

## Overview
A single-page marketing website for **Orion Scope**, an onchain research team that helps
people and teams recover lost or forgotten funds — and also proactively researches the
chain and reaches out to help people claim value they didn't know they had. The page
sells trust, diligence, and results, with a dark "celestial / stoic" aesthetic drawn from
the brand guide.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the
intended look and behavior, not production code to ship directly. The task is to **recreate
this design in the target codebase's environment** (React, Next.js, Vue, Astro, etc.) using
its established patterns, component library, and conventions. If no environment exists yet,
pick the most appropriate stack for a marketing site (Next.js/React or Astro are good fits)
and implement there.

The prototype is authored as a "Design Component" (`.dc.html`) that uses a small custom
runtime for templating and state. **Ignore the runtime** — read it for structure, layout,
copy, and styling values, then rebuild with normal components. All styling is inline; every
value you need is in this README.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all
intentional. Recreate pixel-closely, then adapt to the target design system where it makes
sense (e.g. map to existing Button/Input primitives).

## Design Tokens

### Colors (from the brand guide)
- **Aerospace Orange (primary):** `#FC5000`
- **Orange [Web] (secondary):** `#FCA900`
- **Chrysler Blue (accent, used sparingly):** `#5106B4`
- **White:** `#FFFFFF`
- **Page background (near-black):** `#060606`
- **CTA band background:** `#0A0705`
- **Success green (RECOVERED badge text):** `#7CE0A0` on `rgba(124,224,160,.12)`
- **Warm eyebrow text:** `#FCD07A`

Common alpha-on-white values used throughout:
- Body text muted: `rgba(255,255,255,0.69)`–`rgba(255,255,255,0.72)` (written `#ffffffb0`)
- Secondary/dim text: `#ffffff98`, `#ffffff90`, `#ffffff80`, `#ffffff60`
- Hairline borders: `rgba(255,255,255,0.07)`–`rgba(255,255,255,0.12)`
- Card surfaces: `rgba(255,255,255,0.02)`–`rgba(255,255,255,0.03)`

### Signature gradient
`linear-gradient(135deg, #FCA900, #FC5000)` — used on the logo mark, primary buttons,
big numeric figures (as a text clip), and progress bars.
Text-clip pattern: `-webkit-background-clip:text; background-clip:text; color:transparent`.

### Typography
- **Brand font:** *Polin Sans* (Mateusz Machalski, Ben Nathan) — geometric sans. Not a free
  web font; if licensed, embed it via `@font-face` and use for headings + body.
- **Web substitute used in the prototype:** **Sora** (Google Fonts), weights 300/400/500/600/700/800.
- **Mono (wallet addresses, step numbers):** **JetBrains Mono**, 400/500.
- Headings: weight 800, `letter-spacing:-0.03em`, line-height ~1.02–1.1.
- The word "forgot." in the H1 is *italic* + gradient text clip.

Type scale (px) actually used:
- H1 hero: 68 / weight 800
- Section H2: 40–48 / 800
- Card H3: 19–24 / 700
- Eyebrow labels: 12–13, `letter-spacing:0.14–0.16em`, weight 600, uppercase
- Body: 15–19 / 400–500, line-height 1.55–1.7
- Stat figures: 30 (hero) / 38 (case cards)

### Spacing / radius / effects
- Content max-width: **1240px**, side padding **32px**.
- Section vertical padding: ~80–100px top-level.
- Border radius: pills/buttons `999px`; cards `16–22px`; large panels/CTA `26–30px`.
- Primary button shadow: `0 12px 40px rgba(252,80,0,0.35)`.
- Floating card shadow: `0 24px 60px rgba(0,0,0,0.5)`.
- Glows: radial-gradient orange blooms behind hero + CTA, `filter:blur(20–30px)`.

## Screens / Views
Single scrolling page. Sections top to bottom:

### 1. Sticky Nav
- Sticky top, `backdrop-filter:blur(14px)`, bg `rgba(6,6,6,0.72)`, bottom hairline.
- Left: logo lockup = 38px circle with the gradient + a 4-point star glyph in `#060606`,
  next to a two-line "ORION / SCOPE" wordmark (weight 800, 20px, tight leading).
- Center links: Services, How it works, Results, FAQ (14.5px, `#ffffffcc`).
- Right: pill CTA "Start a recovery" (gradient bg, `#060606` text, weight 700).

### 2. Hero  (2-col grid `1.05fr .95fr`, gap 56px)
- Left column:
  - Eyebrow pill "ONCHAIN FUND RECOVERY" with a glowing 7px dot.
  - H1: "Recover what the chain **forgot.**" ("forgot." italic + gradient).
  - Sub: intro paragraph (see Copy).
  - Two buttons: primary "Start a free scan →" (gradient), secondary "See how it works"
    (outline `rgba(255,255,255,.18)`).
  - Stat row (3 items, divided by 1px rules): **$62.4M** Assets recovered · **8,420**
    Wallets investigated · **91%** Recovery rate.
- Right column:
  - Rounded 26px image card (statue render), height 520px, with a bottom-left→top gradient scrim.
  - Floating "DEEP SCAN" card, absolutely positioned bottom-left, translucent (`rgba(12,12,12,.86)`,
    blur 12px), showing a mono wallet `0x7a3f…c9e1`, "Recoverable **$48,210**" (gradient text),
    a 72%-filled gradient progress bar, and a spinning ring "Live" indicator. Gentle float animation.
- Behind the left column: a large blurred orange radial glow.

### 3. Trust strip
- Full-width band, top+bottom hairlines. Label "TRACING ACROSS" + chain names:
  Ethereum, Bitcoin, Solana, Base, Arbitrum, Polygon, "+ 40 chains" (weight 700, 17px, dim).

### 4. Problem statement (centered)
- Eyebrow "AN ESTIMATED $200B+ SITS UNCLAIMED" (orange).
- H2: "Crypto doesn't lose your money. / It just stops showing you where it went."

### 5. Services (3-col grid, 6 cards)
Each card: hairline border, 20px radius, subtle top-lit gradient surface, 30px padding.
- 50px rounded icon tile (`rgba(252,80,0,.12)` bg, `rgba(252,80,0,.3)` border) with an emoji.
- H3 title + muted body.
- Hover: border color → `rgba(252,169,0,0.45)`.
Cards (icon · title · body):
1. 🔑 **Lost seed & key recovery** — Partial phrases, corrupted keystores, forgotten passwords — we reconstruct access paths with cryptographic tooling.
2. 🎁 **Forgotten airdrops** — Unclaimed token allocations, staking rewards, and eligibility you never knew you had — surfaced and claimed.
3. 🌉 **Stranded bridge transfers** — Funds stuck mid-bridge, sent to the wrong chain, or lost to a failed relayer — traced and released.
4. 📄 **Failed tx & contract dust** — Value locked in reverted transactions, dead contracts, and unwithdrawn balances across protocols.
5. 📜 **Inheritance & dormant wallets** — Recovering access to a wallet left behind — with the discretion and care the situation deserves.
6. 🔎 **Scam & theft tracing** — Following stolen funds across mixers and chains to build an evidence trail for recovery or law enforcement.

### 6. Process  (2-col `.8fr 1.2fr`, gap 60px)
- Left (sticky): eyebrow "HOW IT WORKS", H2 "A methodical hunt, / not a hopeful guess.",
  paragraph, pill CTA "Open a case →".
- Right: 4 stacked step cards, each with a mono step number in `#FC5000`, title, body:
  1. **Tell us what went missing** — Share a wallet address, a transaction, or just the story. The first scan is free and confidential.
  2. **We trace it onchain** — Our researchers map every hop, contract, and balance — building a verifiable picture of where the value sits.
  3. **You approve the plan** — We show you exactly what is recoverable, how, and what it costs. Nothing moves without your sign-off.
  4. **Recover & reclaim** — Funds are returned to a wallet you control. You only pay a share of what we successfully recover.

### 7. Two ways we work  (proactive outreach)
- Centered eyebrow "TWO WAYS WE WORK" + H2 "You find us — or we find you."
- 2 cards:
  - **YOU REACH OUT → Bring us a case** (neutral card) — You know something's missing — a lost phrase, a stuck transfer, a wallet you can't reach. Share what you have and our researchers take it from there.
  - **WE REACH OUT → We research & come to you** (highlighted: orange border, orange radial tint) — Most people never learn what they're owed. We continuously scan the chain for unclaimed value — dormant balances, missed airdrops, stranded transfers — trace it to its owner, and reach out with a verified plan to claim it.
- Below: 3 small icon+text tiles:
  - 📡 **Continuous scanning** — We monitor chains around the clock for unclaimed and forgotten value the market has overlooked.
  - 🧭 **Owner attribution** — We trace stranded funds back to the rightful owner using verifiable onchain evidence.
  - 🤝 **Verified outreach** — We reach out directly with a clear, no-obligation plan to help you claim what is yours.

### 8. Stoic / Why (split panel)
- Rounded 28px panel, 2-col. Left copy on a `linear-gradient(120deg,#0c0c0c,#161009)`:
  - Eyebrow "DILIGENCE OVER LUCK", H2 "Patience is a / recovery strategy.", paragraph,
    3 checkmark lines (orange ✓):
    - No recovery, no fee — you pay from what we return
    - Non-custodial — we never take control of your keys
    - Full onchain evidence trail on every case
- Right: full-bleed statue image with a left→right dark scrim.

### 9. Results (3 case cards, centered heading)
- Eyebrow "RECENT RECOVERIES", H2 "Cases that came back from the dark."
- Each card: small tag label + green "RECOVERED" badge; big gradient figure; body.
  1. **FORGOTTEN AIRDROP · $127K** — Three years of unclaimed governance tokens across four protocols, surfaced from a dormant 2021 wallet.
  2. **BRIDGE FAILURE · $48.2K** — A stablecoin transfer stranded by a defunct bridge relayer, traced and released to the original owner.
  3. **LOST KEYSTORE · $310K** — A partial seed phrase and an old encrypted file — reconstructed into full access after six weeks of work.

### 10. CTA / Start  (`id="start"`)
- Rounded 30px panel, orange-tinted border, centered. Big blurred orange bloom top-center.
- 4-point star glyph (34px, `#FCA900`), H2 "Think something's / lost? Let's look.", paragraph,
  and an inline form: rounded input "Wallet address or email" + gradient button "Start free scan".

### 11. FAQ  (max-width 820px, centered)
- H2 "Questions, answered." + accordion of 4 items. Each: hairline card, click to toggle,
  orange `+`/`–` sign, answer expands below.
  - How much does recovery cost? — The initial scan is always free. If we recover funds, we take an agreed percentage of what is returned — you never pay out of pocket.
  - Do you ever hold my keys or funds? — Never. Orion Scope is fully non-custodial. Recovered funds go directly to a wallet you control, and we guide you through every signature.
  - What can realistically be recovered? — Forgotten airdrops, stranded bridge transfers, failed-transaction balances, dormant wallets, and many partial-key situations. If it is truly unrecoverable, we tell you upfront — for free.
  - How long does a case take? — A first-pass scan takes about 48 hours. Full recoveries range from days to several weeks depending on complexity — you get progress updates throughout.

### 12. Footer
- Logo lockup + tagline "Onchain research for lost and forgotten funds. Evidence-led,
  non-custodial, patient."
- Two link columns: SERVICES (Seed recovery, Airdrop reclaims, Bridge rescue) and
  COMPANY (How it works, Results, FAQ).
- Bottom bar: "© 2026 Orion Scope. All rights reserved." · "Non-custodial · No recovery, no fee".

## Copy (exact)
- Hero intro: "Orion Scope is an onchain research team that helps people and teams trace,
  reclaim, and recover lost or forgotten funds — from misplaced seed phrases to stranded
  bridge transfers and unclaimed airdrops. We also research the chain proactively and reach
  out when we find value that's yours to claim."
- Process left sub: "Every case is run by researchers, not scripts. We map the trail,
  verify it onchain, and only move when the funds are real and reachable."
- CTA sub: "Share a wallet address or the story of what went missing. The first scan is free
  and takes 48 hours."

## Interactions & Behavior
- **Smooth scroll** on anchor links (nav → sections; `scroll-behavior:smooth`).
- **Hero stat count-up:** on mount, animate from 0 to final values over ~1400ms with an
  ease-out-cubic (`1 - (1-t)^3`). **Important:** initialize the displayed values at their
  FINAL numbers ($62.4M / 8,420 / 91%) so they never render as 0 if the animation doesn't
  run (backgrounded tab, reduced-motion). Format: `$` + millions with one decimal + `M`;
  thousands with locale separators; integer + `%`.
- **Floating scan card:** 6s ease-in-out vertical float (`translateY 0 → -14px → 0`).
- **Live ring:** 1s linear infinite spin.
- **FAQ accordion:** single-open; clicking an open item closes it. Toggle `+`/`–`.
- **CTA form submit:** `preventDefault` + confirmation ("Thanks — our team will reach out
  within 48 hours."). Wire to a real endpoint in production.
- **Hover:** service cards lighten border to `rgba(252,169,0,.45)`; buttons/links may add
  subtle transitions.
- Respect `prefers-reduced-motion` (skip count-up/float/spin, show final states).

## State Management
- `openFaq` (index, -1 = all closed).
- Hero stat values (only if animating) — seed with final values.
- CTA input value.
Everything else is static content — model as data arrays (services, steps, cases, faqs,
outreach) and map to components.

## Assets
- **Statue imagery:** two 1300×1300 JPEGs in `assets/` (`hero.jpg`, `why.jpg`), downscaled
  from the brand-guide poster renders. These carry a baked-in Orion Scope logo and blend on
  the dark background. **Replace with clean, licensed statue renders** for production
  (ideally without baked branding). In the prototype these are drag-and-drop image slots.
- **Logo mark:** recreated in-code as a 4-point star SVG inside a gradient circle
  (`<path d="M12 0c.7 6.2 5.1 10.6 11.3 11.3v1.4C17.1 13.4 12.7 17.8 12 24c-.7-6.2-5.1-10.6-11.3-11.3v-1.4C6.9 10.6 11.3 6.2 12 0Z"/>`).
  The real primary logo (spartan helmet in a circle) from the brand guide should be used in
  production — export it as SVG/PNG from the brand assets.
- **Fonts:** Sora + JetBrains Mono via Google Fonts (swap to licensed Polin Sans if available).
- No icon library — emojis are placeholders; swap for a proper icon set (Lucide, etc.) in production.

## Files
- `Orionscope.dc.html` — the full design prototype (all sections, inline-styled).
- `assets/hero.jpg`, `assets/why.jpg` — statue images used in the prototype.
- The prototype's custom runtime (`support.js`, `image-slot.js`) is **not** included — it is
  irrelevant to reimplementation. Read `Orionscope.dc.html` for markup, copy, and style values.
