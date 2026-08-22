"use client";

import { useState } from "react";
import { sx } from "@/lib/css";

/** Mirrors the engine's ScanReport, with bigints as strings over the wire. */
export interface WireProvenance {
  kind: string;
  target: string;
  call: string;
  blockNumber?: string;
  fetchedAt: string;
}
export interface WireItem {
  id: string;
  source: string;
  owner: string;
  token: { address: string; symbol: string | null; decimals: number };
  rawAmount: string;
  usdValue: number | null;
  claimType: "permissionless" | "owner-sign";
  label: string;
  provenance: WireProvenance[];
}
export interface WireUnreachable {
  holder: string;
  looksControlledByOwner: boolean;
  label: string;
  amounts: { token: { symbol: string | null; decimals: number }; rawAmount: string; usdValue: number | null }[];
}
/**
 * Notes arrive worded for the CLI, naming flags like --also and --deep that do
 * not exist here. Surfaces own their own copy; anything unrecognised falls
 * through to the engine's wording rather than being dropped, because a note we
 * cannot rewrite is still a note the reader needs.
 */
const NOTE_COPY: Record<string, string> = {
  "uniswap-scope":
    "This covers liquidity positions held directly by the address you scanned. " +
    "Positions moved into a Safe, vault, or automation contract belong to that contract — " +
    "add it in the second field above to include it.",
  "clanker-fast-scan":
    "Quick scan. Creator fees can also accrue in tokens this wallet never launched, which this " +
    "pass cannot see. A full history scan finds those.",
  "clanker-untraced":
    "Some balances could not be traced back to a specific launch. The amounts are real reads and " +
    "fully claimable — only their origin is unknown.",
  "clanker-harvested-only":
    "Shows fees already swept into the fee contract. Fees still accruing in the pool are not " +
    "included.",
  "pricing-unavailable":
    "Some amounts show as unpriced because the price service could not be reached — not because " +
    "they are worthless. The amounts themselves are unaffected.",
};

export interface WireReport {
  owner: string;
  blockNumber: string;
  generatedAt: string;
  items: WireItem[];
  totals: { pricedUsd: number; pricedCount: number; unpricedCount: number; itemCount: number };
  errors: { source: string; message: string }[];
  notes: { source: string; message: string; code?: string }[];
  unreachable: WireUnreachable[];
}

/** Exact decimal rendering. Never rounds — the raw amount is the real number. */
function formatAmount(raw: string, decimals: number): string {
  const base = 10n ** BigInt(decimals);
  const value = BigInt(raw);
  const whole = value / base;
  const frac = (value % base).toString().padStart(decimals, "0").replace(/0+$/, "");
  return frac ? `${whole}.${frac}` : whole.toString();
}

function usd(v: number | null): string {
  return v === null ? "unpriced" : `$${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const CARD =
  "background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:20px 22px";
const MONO = "font-family:var(--font-mono),ui-monospace,monospace";

function Group({ title, hint, items }: { title: string; hint: string; items: WireItem[] }) {
  if (items.length === 0) return null;
  return (
    <div style={sx("margin-bottom:28px")}>
      <div style={sx("display:flex;align-items:baseline;gap:12px;margin-bottom:14px;flex-wrap:wrap")}>
        <h3 style={sx("font-size:18px;font-weight:700;letter-spacing:-.01em")}>{title}</h3>
        <span style={sx("font-size:13px;color:#ffffff80")}>{hint}</span>
      </div>
      <div style={sx("display:flex;flex-direction:column;gap:12px")}>
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function ItemRow({ item }: { item: WireItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="os-card" style={sx(CARD)}>
      <div style={sx("display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap")}>
        <div style={sx("min-width:0")}>
          <div style={sx(`${MONO};font-size:16px;font-weight:600;word-break:break-all`)}>
            {formatAmount(item.rawAmount, item.token.decimals)}{" "}
            <span style={sx("color:#FCA900")}>{item.token.symbol ?? "token"}</span>
          </div>
          <div style={sx("font-size:13px;color:#ffffff90;margin-top:6px")}>{item.label}</div>
        </div>
        <div style={sx("text-align:right;flex:none")}>
          <div
            style={sx(
              `font-size:18px;font-weight:700;${item.usdValue === null ? "color:#ffffff60;font-size:14px" : ""}`,
            )}
          >
            {usd(item.usdValue)}
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        style={sx(
          "margin-top:14px;background:none;border:none;padding:0;cursor:pointer;font:inherit;font-size:12px;color:#FCA900;letter-spacing:.04em",
        )}
      >
        {open ? "hide" : "how do we know?"}
      </button>

      {open && (
        <div
          style={sx(
            `margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,.1);${MONO};font-size:11px;color:#ffffff85;line-height:1.7;word-break:break-all`,
          )}
        >
          {item.provenance.map((p, i) => (
            <div key={i} style={sx("margin-bottom:8px")}>
              <span style={sx("color:#FCA900")}>{p.kind}</span> {p.target}
              <br />
              {p.call}
              {p.blockNumber ? ` @ block ${p.blockNumber}` : ""}
            </div>
          ))}
          <div style={sx("color:#ffffff55")}>
            Raw amount: {item.rawAmount} (base units). Claims use this number, never the USD value.
          </div>
        </div>
      )}
    </div>
  );
}

export function ScanReportView({ report }: { report: WireReport }) {
  const auto = report.items.filter((i) => i.claimType === "permissionless");
  const sign = report.items.filter((i) => i.claimType === "owner-sign");
  const nothingClaimable = report.items.length === 0;

  return (
    <div>
      <div
        style={sx(
          "display:flex;gap:28px;flex-wrap:wrap;align-items:baseline;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,.1)",
        )}
      >
        <div>
          <div style={sx("font-size:40px;font-weight:800;letter-spacing:-.03em")}>
            {usd(report.totals.pricedUsd)}
          </div>
          <div style={sx("font-size:13px;color:#ffffff80;margin-top:4px")}>
            across {report.totals.pricedCount} priced item
            {report.totals.pricedCount === 1 ? "" : "s"}
            {report.totals.unpricedCount > 0
              ? ` · ${report.totals.unpricedCount} unpriced (real balances, no trustworthy price)`
              : ""}
          </div>
        </div>
        <div style={sx(`${MONO};font-size:11px;color:#ffffff60;margin-left:auto`)}>
          block {report.blockNumber}
        </div>
      </div>

      {nothingClaimable && (
        <p style={sx("font-size:16px;color:#ffffffb0;margin-bottom:28px")}>
          {report.unreachable.length > 0
            ? "Nothing claimable from the address you scanned — but see below."
            : "No unclaimed value found for this address."}
        </p>
      )}

      <Group
        title="Auto-claimable now"
        hint="anyone can submit these; the funds still go to you"
        items={auto}
      />
      <Group
        title="Needs your signature"
        hint="only you can authorise these"
        items={sign}
      />

      {report.unreachable.length > 0 && (
        <div style={sx("margin-bottom:28px")}>
          <h3 style={sx("font-size:18px;font-weight:700;margin-bottom:6px")}>
            Found, but not claimable from here
          </h3>
          <p style={sx("font-size:13px;color:#ffffff80;margin-bottom:14px")}>
            Excluded from the total above — these sit in a contract that has to collect them.
          </p>
          <div style={sx("display:flex;flex-direction:column;gap:12px")}>
            {report.unreachable.map((u, i) => (
              <div key={i} className="os-card" style={sx(CARD)}>
                {u.amounts.map((a, j) => (
                  <div key={j} style={sx(`${MONO};font-size:15px;font-weight:600`)}>
                    {formatAmount(a.rawAmount, a.token.decimals)}{" "}
                    <span style={sx("color:#FCA900")}>{a.token.symbol ?? "token"}</span>
                    <span style={sx("color:#ffffff70;font-weight:400")}> · {usd(a.usdValue)}</span>
                  </div>
                ))}
                <div style={sx(`${MONO};font-size:11px;color:#ffffff80;margin-top:8px;word-break:break-all`)}>
                  held by {u.holder}
                </div>
                <div style={sx("font-size:12px;color:#ffffff90;margin-top:6px")}>
                  {u.looksControlledByOwner
                    ? "That contract reports you as its owner — collect through it."
                    : "Only that contract can collect these; they may not be yours."}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes and errors are not decoration: a partial scan that looks complete
          is the failure mode this whole product exists to avoid. */}
      {report.errors.map((e, i) => (
        <div
          key={`err-${i}`}
          style={sx(
            "border:1px solid rgba(252,80,0,.4);background:rgba(252,80,0,.08);border-radius:14px;padding:14px 16px;margin-bottom:10px;font-size:13px;color:#ffd9c4",
          )}
        >
          <strong>One source could not be read.</strong> {e.message} — this is a failure to
          read, not a finding that you have nothing there. Anything held there is missing from
          the total above.
        </div>
      ))}
      {report.notes.map((n, i) => (
        <div
          key={`note-${i}`}
          style={sx(
            "border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:14px 16px;margin-bottom:10px;font-size:13px;color:#ffffff90",
          )}
        >
          {(n.code && NOTE_COPY[n.code]) ?? n.message}
        </div>
      ))}
    </div>
  );
}
