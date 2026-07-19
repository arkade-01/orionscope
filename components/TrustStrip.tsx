import { sx } from "@/lib/css";

const CHAINS = [
  { name: "Ethereum", src: "/assets/svgs/ethereum-eth-logo.svg", size: 18 },
  { name: "Bitcoin", src: "/assets/svgs/bitcoin-btc-logo.svg", size: 24 },
  { name: "Solana", src: "/assets/svgs/solana-sol-logo-horizontal.svg", size: 24 },
  { name: "Base", src: "/assets/svgs/base.svg", size: 24 },
  { name: "Arbitrum", src: "/assets/svgs/arbitrum-arb-logo.svg", size: 26 },
  { name: "Polygon", src: "/assets/svgs/polygon-matic-logo.svg", size: 20 },
];

export function TrustStrip() {
  return (
    <section
      style={sx(
        "position:relative;z-index:1;background:#0a0a0f;border-top:1px solid rgba(255,255,255,.07);border-bottom:1px solid rgba(255,255,255,.07)",
      )}
    >
      <div
        style={sx("max-width:1240px;margin:0 auto;padding:44px 32px;text-align:center")}
      >
        <h3
          style={sx(
            "font-size:22px;font-weight:700;letter-spacing:-.01em;color:#fff;margin-bottom:28px",
          )}
        >
          Tracing across <span style={sx("color:#FCA900")}>+40 chains</span>
        </h3>
        <div
          style={sx(
            "display:flex;justify-content:center;align-items:center;gap:18px;flex-wrap:wrap",
          )}
        >
          {CHAINS.map((c) => (
            <span
              key={c.name}
              title={c.name}
              style={sx(
                "width:44px;height:44px;border-radius:50%;background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center",
              )}
            >
              <img
                src={c.src}
                alt={c.name}
                style={{ width: c.size, height: c.size, objectFit: "contain" }}
              />
            </span>
          ))}
          <span
            style={sx(
              "height:44px;padding:0 18px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:13.5px;font-weight:700;color:#ffffffa0",
            )}
          >
            +40
          </span>
        </div>
      </div>
    </section>
  );
}
