import { sx } from "@/lib/css";

const CHAINS = [
  "Ethereum",
  "Bitcoin",
  "Solana",
  "Base",
  "Arbitrum",
  "Polygon",
  "+ 40 chains",
];

export function TrustStrip() {
  return (
    <section
      style={sx(
        "position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.07);border-bottom:1px solid rgba(255,255,255,.07)",
      )}
    >
      <div
        style={sx(
          "max-width:1240px;margin:0 auto;padding:26px 32px;display:flex;align-items:center;gap:34px;flex-wrap:wrap",
        )}
      >
        <span
          style={sx(
            "font-size:12.5px;letter-spacing:.14em;color:#ffffff70;font-weight:600;white-space:nowrap",
          )}
        >
          TRACING ACROSS
        </span>
        <div
          style={sx(
            "display:flex;gap:36px;flex-wrap:wrap;align-items:center;font-weight:700;font-size:17px;color:#ffffff9c",
          )}
        >
          {CHAINS.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
