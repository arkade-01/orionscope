"use client";

import { useState } from "react";
import { useAccount, useChainId, useSendTransaction, useSwitchChain } from "wagmi";
import { base } from "wagmi/chains";
import { sx } from "@/lib/css";

export interface WireTx {
  to: `0x${string}`;
  data: `0x${string}`;
  value: string;
  chainId: number;
  claimType: "permissionless" | "owner-sign";
  description: string;
  isPrerequisite: boolean;
  from: string;
}

type Plan =
  | { status: "idle" }
  | { status: "building" }
  | { status: "ready"; txs: WireTx[]; builtAt: string }
  | { status: "error"; error: string; detail?: string };

type TxState = Record<number, { status: "sending" | "sent" | "failed"; hash?: string; reason?: string }>;

const BTN =
  "background:linear-gradient(135deg,#FCA900,#FC5000);color:#060606;font-weight:700;font-size:15px;padding:14px 26px;border-radius:999px;border:none;cursor:pointer;font-family:inherit";
const GHOST =
  "border:1px solid rgba(255,255,255,.18);background:none;color:#fff;font-weight:600;font-size:15px;padding:14px 24px;border-radius:999px;cursor:pointer;font-family:inherit";
const MONO = "font-family:var(--font-mono),ui-monospace,monospace";

export function ClaimPanel({ address, also }: { address: string; also: string[] }) {
  const { address: connected, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();

  const [plan, setPlan] = useState<Plan>({ status: "idle" });
  const [txState, setTxState] = useState<TxState>({});

  async function build() {
    setPlan({ status: "building" });
    setTxState({});
    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ address, also }),
      });
      const body = await res.json();
      if (!res.ok) {
        setPlan({ status: "error", error: body.error ?? "Could not build the claim.", detail: body.detail });
        return;
      }
      setPlan({ status: "ready", txs: body.txs, builtAt: body.builtAt });
    } catch {
      setPlan({ status: "error", error: "Could not reach the server. Nothing was signed." });
    }
  }

  /**
   * Sent one at a time and in order: a prerequisite sweep has to land before the
   * claim that reads what it moved.
   */
  async function send(index: number, tx: WireTx) {
    setTxState((s) => ({ ...s, [index]: { status: "sending" } }));
    try {
      const hash = await sendTransactionAsync({
        to: tx.to,
        data: tx.data,
        value: BigInt(tx.value),
      });
      setTxState((s) => ({ ...s, [index]: { status: "sent", hash } }));
    } catch (err) {
      setTxState((s) => ({
        ...s,
        [index]: { status: "failed", reason: (err as Error).message.split("\n")[0] },
      }));
    }
  }

  if (!isConnected) {
    return null; // The connect button lives in the header; nothing to claim with yet.
  }

  const wrongChain = chainId !== base.id;
  const mismatch =
    connected && connected.toLowerCase() !== address.toLowerCase()
      ? connected
      : null;

  return (
    <div
      style={sx(
        "margin-top:36px;padding-top:28px;border-top:1px solid rgba(255,255,255,.1)",
      )}
    >
      <h3 style={sx("font-size:18px;font-weight:700;margin-bottom:6px")}>Claim</h3>
      <p style={sx("font-size:13px;color:#ffffff80;margin-bottom:18px;max-width:620px")}>
        We build the transactions; your wallet signs them. Nothing is signed on our side and we
        never hold your funds.
      </p>

      {wrongChain && (
        <div
          style={sx(
            "border:1px solid rgba(252,169,0,.4);background:rgba(252,169,0,.08);border-radius:14px;padding:14px 16px;margin-bottom:16px;font-size:14px;display:flex;gap:12px;align-items:center;flex-wrap:wrap",
          )}
        >
          <span>Your wallet is on another network. These transactions only work on Base.</span>
          <button onClick={() => switchChain({ chainId: base.id })} style={sx(GHOST)}>
            Switch to Base
          </button>
        </div>
      )}

      {mismatch && (
        // Sending from the wrong account is how someone burns gas on a
        // transaction that reverts, or claims into an address they did not mean.
        <div
          style={sx(
            "border:1px solid rgba(252,80,0,.45);background:rgba(252,80,0,.08);border-radius:14px;padding:14px 16px;margin-bottom:16px;font-size:14px;color:#ffd9c4",
          )}
        >
          You scanned <span style={sx(MONO)}>{address}</span> but your wallet is{" "}
          <span style={sx(MONO)}>{mismatch}</span>. Transactions that only the owner can send will
          fail. Switch accounts, or scan the address you are connected with.
        </div>
      )}

      {plan.status === "idle" && (
        <button onClick={build} style={sx(BTN)}>
          Build claim transactions
        </button>
      )}

      {plan.status === "building" && (
        <div style={sx("display:flex;align-items:center;gap:12px;color:#ffffff90;font-size:15px")}>
          <span
            style={sx(
              "width:14px;height:14px;border:2px solid #FCA900;border-top-color:transparent;border-radius:50%;display:inline-block;animation:os-spin 1s linear infinite",
            )}
          />
          Re-reading balances and fetching fresh proofs…
        </div>
      )}

      {plan.status === "error" && (
        <div
          style={sx(
            "border:1px solid rgba(252,80,0,.45);background:rgba(252,80,0,.08);border-radius:18px;padding:20px 22px",
          )}
        >
          <div style={sx("font-weight:700;margin-bottom:6px")}>{plan.error}</div>
          <div style={sx("font-size:14px;color:#ffd9c4")}>
            {plan.detail ?? "Nothing was sent and nothing was signed."}
          </div>
        </div>
      )}

      {plan.status === "ready" && plan.txs.length === 0 && (
        <p style={sx("font-size:15px;color:#ffffffb0")}>
          Nothing to claim for this address right now.
        </p>
      )}

      {plan.status === "ready" && plan.txs.length > 0 && (
        <>
          <p style={sx("font-size:13px;color:#ffffff80;margin-bottom:16px")}>
            {plan.txs.length} transaction{plan.txs.length === 1 ? "" : "s"}, built{" "}
            {new Date(plan.builtAt).toLocaleTimeString()}. Merkl proofs expire after about four
            hours — rebuild if you leave this open.
          </p>
          <div style={sx("display:flex;flex-direction:column;gap:12px")}>
            {plan.txs.map((tx, i) => {
              const state = txState[i];
              const previousPending = plan.txs
                .slice(0, i)
                .some((_, j) => plan.txs[j]!.isPrerequisite && txState[j]?.status !== "sent");
              return (
                <div
                  key={i}
                  className="os-card"
                  style={sx(
                    "background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:18px 20px",
                  )}
                >
                  <div style={sx("display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap")}>
                    <div style={sx("min-width:0")}>
                      <div style={sx("font-size:14px;font-weight:600")}>
                        {tx.isPrerequisite && (
                          <span style={sx("color:#FCA900")}>Step 1 — required first · </span>
                        )}
                        {tx.description}
                      </div>
                      <div style={sx(`${MONO};font-size:11px;color:#ffffff70;margin-top:6px;word-break:break-all`)}>
                        to {tx.to}
                      </div>
                    </div>
                    <div style={sx("flex:none")}>
                      {state?.status === "sent" ? (
                        <a
                          href={`https://basescan.org/tx/${state.hash}`}
                          target="_blank"
                          rel="noreferrer"
                          style={sx("color:#FCA900;font-size:14px;font-weight:600")}
                        >
                          Sent ↗
                        </a>
                      ) : (
                        <button
                          onClick={() => send(i, tx)}
                          disabled={state?.status === "sending" || wrongChain || previousPending}
                          style={sx(
                            `${BTN};padding:11px 20px;font-size:14px;${
                              state?.status === "sending" || wrongChain || previousPending
                                ? "opacity:.45;cursor:not-allowed"
                                : ""
                            }`,
                          )}
                        >
                          {state?.status === "sending" ? "Confirm in wallet…" : "Sign & send"}
                        </button>
                      )}
                    </div>
                  </div>
                  {previousPending && (
                    <div style={sx("font-size:12px;color:#ffffff70;margin-top:10px")}>
                      Waiting on the step above — it moves the fees this one claims.
                    </div>
                  )}
                  {state?.status === "failed" && (
                    <div style={sx("font-size:12px;color:#ffd9c4;margin-top:10px")}>
                      {state.reason}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
