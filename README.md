# Orion Scope

Onchain fund recovery on **Base**. A marketing site plus a working scanner: enter
a wallet address, see what it is owed across creator fees, incentive rewards and
liquidity fees, and claim it with your own wallet.

Live at **[orionscope.io](https://www.orionscope.io)**.

The scanning engine lives in a separate repo,
[`orionagent`](https://github.com/arkade-01/orionagent), and is installed here as
a git dependency. It also ships a CLI and an MCP server; this app is one of three
front-ends over the same capability registry.

## Run it

```bash
npm install
cp .env.example .env.local     # set BASE_RPC_URL
npm run dev                    # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

`/scan` is the product. `/api/health` reports whether a deployment can see its
configuration, without echoing any of it.

## Environment

| Variable | |
|---|---|
| `BASE_RPC_URL` | **Required.** Base mainnet (chainId 8453). The public endpoint works for quick scans but rate-limits hard; a full history scan needs a paid one. |
| `ORIONSCOPE_ALLOW_DEEP` | `true` to allow full history scans from the web. Each is ~1900 RPC requests, so on a public deployment this is an unauthenticated way to spend your RPC budget. Off unless set. |
| `ORIONSCOPE_DEEP_CONCURRENCY` | Parallel log requests during a full scan. Default 30. Measured: 12 took ~8 minutes, 30 takes ~2½. |
| `ANTHROPIC_API_KEY` | Optional. Without it the narrated summary is generated deterministically from the scan data, with no model involved, and the page says so. |

## How a scan works

`POST /api/scan/stream` returns NDJSON, one JSON object per line:

```
{"type":"step","source":"clanker","status":"ok","itemCount":1}
{"type":"progress","done":841,"total":1885,"failed":0}
{"type":"heartbeat"}
{"type":"report","report":{…}}
{"type":"brief","text":"…","origin":"deterministic"}
```

Streaming is not for speed. It shows which sources were checked and what each
returned, so a total is never presented without the work behind it — and it keeps
a multi-minute full scan alive through gateway timeouts. The heartbeat exists
because a silent stream is indistinguishable from a hung one: a dense stretch of
history fans out into many requests and reports only when all of them land.

`POST /api/claim` returns **unsigned** transactions. There is no signer in this
deployment and no private key in its environment — the browser wallet signs. A
compromised server can lie about what you are owed; it cannot move anything.

## What the UI is careful about

The engine's guarantees are worth nothing if the page flattens them, so:

- **Unpriced renders as the word**, never `$0.00`. A thin token with no reliable
  price is not a token worth nothing.
- **A read failure is never an empty state.** It renders as an error saying it is
  a failure to read, not a finding that the wallet is empty. This is the single
  most damaging thing the page could get wrong.
- **Amounts print at full precision.** No rounding anywhere in the display path.
- **Every item expands** to the contract read behind it — address, function,
  block, and the raw base-unit amount.
- **Colliding token symbols show addresses.** Anyone can name a token anything;
  two different tokens called `ikaros` are not a duplicate row.
- **Notes are rewritten for this surface.** The engine words them for its CLI and
  names flags a visitor cannot type; the page substitutes its own copy, and falls
  back to the original for anything it does not recognise.

## Structure

```
app/
  page.tsx           The marketing page
  scan/              The scanner. Wallet providers are scoped here so the
                     marketing pages never load wagmi.
  api/scan/stream/   Streaming scan (NDJSON)
  api/claim/         Builds unsigned claim transactions
  api/health/        Deployment diagnostics — presence, never values
components/          One component per section, plus ScanForm / ScanReport /
                     ScanActivity / ClaimPanel / ConnectButton
lib/
  css.ts             sx() — parses the design's inline CSS into style objects
  data.ts            Copy, and the hero figures (one place per number)
public/assets/       Imagery from the design handoff
reference/           Original design prototype, kept for reference
```

Interactive pieces are client components; everything else renders on the server.

## Deploying

The engine is a git dependency, so a host builds it on install via that
package's `prepare` script. **Pushing a change to the engine repo is what makes
it reach this app** — editing a local sibling checkout does nothing.

`vercel.json` raises `maxDuration` to 300s for the streaming scan; the default
would kill a full scan partway. That ceiling needs a Vercel plan that allows it.

After changing environment variables, redeploy — Vercel bakes them per
deployment, and an existing one will not pick them up. `/api/health` reports the
commit actually serving the domain, which is the fastest way to tell whether a
deploy landed.
