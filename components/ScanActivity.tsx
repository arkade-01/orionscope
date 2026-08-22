"use client";

import { sx } from "@/lib/css";

export interface Step {
  source: string;
  status: "ok" | "failed";
  itemCount?: number;
  message?: string;
}

/** Source ids are internal. The visitor sees what was actually looked at. */
const SOURCE_LABEL: Record<string, string> = {
  clanker: "Creator fees",
  merkl: "Incentive rewards",
  "uniswap-v3": "Liquidity fees",
};

const MONO = "font-family:var(--font-mono),ui-monospace,monospace";

function line(step: Step): string {
  const label = SOURCE_LABEL[step.source] ?? step.source;
  if (step.status === "failed") return `${label} — could not be read`;
  if (!step.itemCount) return `${label} — nothing found`;
  return `${label} — ${step.itemCount} balance${step.itemCount === 1 ? "" : "s"} found`;
}

/**
 * The work, shown as it happens.
 *
 * A source that failed reads very differently from a source that found nothing,
 * and a single total at the end hides that difference completely. Here they are
 * different colours and different words.
 */
export function ScanActivity({
  steps,
  progress,
  running,
}: {
  steps: Step[];
  progress?: { done: number; total: number; failed: number };
  running: boolean;
}) {
  if (steps.length === 0 && !progress && !running) return null;

  return (
    <div
      style={sx(
        "border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:18px 20px;margin-bottom:28px;background:rgba(255,255,255,.02)",
      )}
    >
      <div
        style={sx(
          `${MONO};font-size:11px;letter-spacing:.1em;color:#ffffff70;margin-bottom:14px;display:flex;align-items:center;gap:10px`,
        )}
      >
        {running && (
          <span
            style={sx(
              "width:9px;height:9px;border:2px solid #FCA900;border-top-color:transparent;border-radius:50%;display:inline-block;animation:os-spin 1s linear infinite",
            )}
          />
        )}
        {running ? "WORKING" : "WHAT WAS CHECKED"}
      </div>

      <div style={sx("display:flex;flex-direction:column;gap:9px")}>
        {steps.map((step, i) => (
          <div
            key={`${step.source}-${i}`}
            style={sx(
              `display:flex;gap:10px;align-items:baseline;font-size:14px;${
                step.status === "failed" ? "color:#ffd9c4" : "color:#ffffffb0"
              }`,
            )}
          >
            <span style={sx(step.status === "failed" ? "color:#FC5000" : "color:#FCA900")}>
              {step.status === "failed" ? "!" : "✓"}
            </span>
            <span>{line(step)}</span>
          </div>
        ))}

        {progress && (
          <div style={sx("margin-top:6px")}>
            <div style={sx("font-size:14px;color:#ffffffb0;margin-bottom:8px")}>
              Reading fee history — {progress.done.toLocaleString()} of{" "}
              {progress.total.toLocaleString()} ranges
              {progress.failed > 0
                ? ` · ${progress.failed.toLocaleString()} still failing, being retried`
                : ""}
            </div>
            <div
              style={sx(
                "height:4px;border-radius:999px;background:rgba(255,255,255,.1);overflow:hidden",
              )}
            >
              <div
                style={{
                  ...sx("height:100%;background:linear-gradient(90deg,#FCA900,#FC5000)"),
                  width: `${Math.min(100, Math.round((progress.done / progress.total) * 100))}%`,
                  transition: "width .3s",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * The narrated summary.
 *
 * Worth labelling honestly: when a model wrote it, every figure in the text was
 * checked against the scan and the whole thing discarded if anything did not
 * match. That guarantee is the reason it is safe to show at all, so it is said
 * out loud rather than assumed.
 */
export function Brief({ text, origin }: { text: string; origin: "llm" | "deterministic" }) {
  return (
    <div
      style={sx(
        "border:1px solid rgba(252,169,0,.3);border-radius:18px;padding:22px 24px;margin-bottom:28px;background:radial-gradient(circle at 0% 0%,rgba(252,80,0,.1),transparent 60%)",
      )}
    >
      <div style={sx("font-size:15px;line-height:1.65;color:#ffffffd0;white-space:pre-wrap")}>
        {text}
      </div>
      <div
        style={sx(
          `${MONO};font-size:10.5px;letter-spacing:.06em;color:#ffffff60;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)`,
        )}
      >
        {origin === "llm"
          ? "WRITTEN FROM THE SCAN ABOVE. EVERY FIGURE WAS CHECKED AGAINST IT — A NUMBER NOT IN THE DATA WOULD HAVE REJECTED THIS SUMMARY."
          : "GENERATED DIRECTLY FROM THE SCAN DATA. NO MODEL INVOLVED."}
      </div>
    </div>
  );
}
