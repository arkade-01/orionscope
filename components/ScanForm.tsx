"use client";

import { useState, type FormEvent } from "react";
import { sx } from "@/lib/css";
import { ScanReportView, type WireReport } from "./ScanReport";
import { ConnectButton } from "./ConnectButton";
import { ClaimPanel } from "./ClaimPanel";
import { Brief, ScanActivity, type Step } from "./ScanActivity";

type Progress = { done: number; total: number; failed: number };
type BriefData = { text: string; origin: "llm" | "deterministic" };

type State =
  | { status: "idle" }
  | { status: "scanning" }
  | { status: "done"; report: WireReport }
  | { status: "error"; error: string; detail?: string };

interface StreamEvent {
  type: string;
  source?: string;
  status?: "ok" | "failed";
  itemCount?: number;
  message?: string;
  done?: number;
  total?: number;
  failed?: number;
  report?: WireReport;
  text?: string;
  origin?: "llm" | "deterministic";
  error?: string;
  detail?: string;
}

const PILL =
  "background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:16px 22px;color:#fff;font-size:15px;font-family:inherit;outline:none";
const MONO = "font-family:var(--font-mono),ui-monospace,monospace";

export function ScanForm() {
  const [address, setAddress] = useState("");
  const [also, setAlso] = useState("");
  const [deep, setDeep] = useState(false);
  const [state, setState] = useState<State>({ status: "idle" });
  const [steps, setSteps] = useState<Step[]>([]);
  const [progress, setProgress] = useState<Progress | undefined>();
  const [brief, setBrief] = useState<BriefData | undefined>();
  // A long stretch without a progress event is normal on a full scan; a page
  // that looks frozen during it is not.
  const [stalledFor, setStalledFor] = useState(0);

  const alsoList = also
    .split(/[\s,]+/)
    .map((a) => a.trim())
    .filter(Boolean);

  /**
   * One streaming endpoint for both scan depths.
   *
   * Streaming is not about speed. It is so the visitor sees which sources were
   * checked and what each returned, rather than being handed a total and asked
   * to trust it. It also keeps a multi-minute full scan alive through gateway
   * timeouts.
   */
  async function runScan(owner: string) {
    try {
      const res = await fetch("/api/scan/stream", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ address: owner, also: alsoList, deep }),
      });

      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        setState({
          status: "error",
          error: body.error ?? "The scan could not start.",
          detail: body.detail,
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Hold back the trailing partial line until the next chunk completes it.
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const raw of lines) {
          if (!raw.trim()) continue;
          let event: StreamEvent;
          try {
            event = JSON.parse(raw) as StreamEvent;
          } catch {
            continue;
          }

          if (event.type === "heartbeat") {
            setStalledFor((n) => n + 5);
            continue;
          }
          setStalledFor(0);

          switch (event.type) {
            case "step":
              if (event.source && event.status) {
                const step: Step = {
                  source: event.source,
                  status: event.status,
                  ...(event.itemCount === undefined ? {} : { itemCount: event.itemCount }),
                  ...(event.message === undefined ? {} : { message: event.message }),
                };
                setSteps((prev) => [...prev, step]);
              }
              break;
            case "progress":
              setProgress({
                done: event.done ?? 0,
                total: event.total ?? 1,
                failed: event.failed ?? 0,
              });
              break;
            case "report":
              if (event.report) setState({ status: "done", report: event.report });
              break;
            case "brief":
              if (event.text) {
                setBrief({ text: event.text, origin: event.origin ?? "deterministic" });
              }
              break;
            case "error":
              setState({
                status: "error",
                error: event.error ?? "The scan failed.",
                detail: event.detail,
              });
              break;
          }
        }
      }
    } catch {
      setState({
        status: "error",
        error: "The connection dropped during the scan.",
        detail: "Nothing about this wallet was determined. Try again.",
      });
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState({ status: "scanning" });
    setSteps([]);
    setProgress(undefined);
    setBrief(undefined);
    setStalledFor(0);
    await runScan(address.trim());
  }

  const busy = state.status === "scanning";
  const disabled = busy || address.trim().length === 0;

  return (
    <>
      <div
        style={sx(
          "display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:20px",
        )}
      >
        <span style={sx("font-size:13px;color:#ffffff70")}>
          Scanning is read-only. Connect only when you want to claim.
        </span>
        <ConnectButton onConnected={(a) => setAddress((cur) => cur.trim() || a)} />
      </div>

      <form
        onSubmit={onSubmit}
        style={sx("display:flex;flex-direction:column;gap:14px;margin-bottom:36px")}
      >
        <div style={sx("display:flex;gap:12px;flex-wrap:wrap")}>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x… wallet address"
            spellCheck={false}
            style={sx(`flex:1;min-width:260px;${PILL};${MONO}`)}
          />
          <button
            type="submit"
            disabled={disabled}
            style={sx(
              `background:linear-gradient(135deg,#FCA900,#FC5000);color:#060606;font-weight:700;font-size:16px;padding:17px 32px;border-radius:999px;border:none;cursor:pointer;font-family:inherit;box-shadow:0 12px 40px rgba(252,80,0,.35);${
                disabled ? "opacity:.5;cursor:not-allowed" : ""
              }`,
            )}
          >
            {busy ? "Working…" : "Scan →"}
          </button>
        </div>

        <input
          value={also}
          onChange={(e) => setAlso(e.target.value)}
          placeholder="Optional: a Safe or vault you control (positions held by it are invisible otherwise)"
          spellCheck={false}
          style={sx(`${PILL};font-size:14px`)}
        />

        <label
          style={sx(
            "display:flex;gap:12px;align-items:flex-start;cursor:pointer;padding:4px 6px;font-size:14px;color:#ffffffb0",
          )}
        >
          <input
            type="checkbox"
            checked={deep}
            onChange={(e) => setDeep(e.target.checked)}
            disabled={busy}
            style={sx("margin-top:3px;accent-color:#FC5000;width:16px;height:16px;cursor:pointer")}
          />
          <span>
            Full history scan
            <span style={sx("display:block;font-size:13px;color:#ffffff70;margin-top:2px")}>
              Finds fees earned in tokens this wallet never launched, which the quick scan cannot
              see. Reads the fee contract&apos;s entire history, so it takes a few minutes.
            </span>
          </span>
        </label>
      </form>

      <ScanActivity steps={steps} progress={progress} running={busy} />

      {state.status === "error" && (
        // Deliberately not an empty state. A failed read rendered as "nothing
        // found" is the single most damaging thing this page could do.
        <div
          style={sx(
            "border:1px solid rgba(252,80,0,.45);background:rgba(252,80,0,.08);border-radius:18px;padding:20px 22px",
          )}
        >
          <div style={sx("font-weight:700;margin-bottom:8px")}>{state.error}</div>
          <div style={sx("font-size:14px;color:#ffd9c4")}>
            {state.detail ??
              "This is a failure to read the chain, not a finding that the wallet has nothing to claim."}
          </div>
        </div>
      )}

      {state.status === "done" && (
        <>
          {brief && <Brief text={brief.text} origin={brief.origin} />}
          <ScanReportView report={state.report} />
          {state.report.items.length > 0 && (
            <ClaimPanel address={state.report.owner} also={alsoList} />
          )}
        </>
      )}
    </>
  );
}
