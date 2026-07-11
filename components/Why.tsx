import { sx } from "@/lib/css";
import { ImageSlot } from "./ImageSlot";

const CHECKS = [
  "No recovery, no fee — you pay from what we return",
  "Non-custodial — we never take control of your keys",
  "Full onchain evidence trail on every case",
];

export function Why() {
  return (
    <section
      className="sec-why"
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:80px 32px",
      )}
    >
      <div
        className="why-grid"
        style={sx(
          "border-radius:28px;overflow:hidden;border:1px solid rgba(255,255,255,.1);display:grid;grid-template-columns:1fr 1fr;background:linear-gradient(120deg,#0c0c0c,#161009)",
        )}
      >
        <div className="why-copy" style={sx("padding:64px 56px")}>
          <p
            style={sx(
              "font-size:13px;letter-spacing:.16em;color:#FCA900;font-weight:600;margin-bottom:20px",
            )}
          >
            DILIGENCE OVER LUCK
          </p>
          <h2
            style={sx(
              "font-size:38px;font-weight:800;letter-spacing:-.03em;line-height:1.1;margin-bottom:24px",
            )}
          >
            Patience is a
            <br />
            recovery strategy.
          </h2>
          <p
            style={sx(
              "font-size:16px;line-height:1.7;color:#ffffffb0;margin-bottom:28px",
            )}
          >
            Lost funds are rarely gone — they&apos;re stranded, mislabeled, or
            buried under a forgotten transaction. Our researchers treat every
            wallet like a cold case: rigorous, evidence-led, and calm under
            pressure.
          </p>
          <div style={sx("display:flex;flex-direction:column;gap:16px")}>
            {CHECKS.map((c) => (
              <div
                key={c}
                style={sx("display:flex;gap:12px;align-items:center")}
              >
                <span style={sx("color:#FCA900;font-weight:800")}>✓</span>
                <span style={sx("font-size:15px;color:#ffffffd0")}>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="why-img" style={sx("position:relative;min-height:440px")}>
          <ImageSlot
            src="/assets/why.jpg"
            alt="Statue render"
            label="Drop a statue render"
            iconSize={30}
            style={sx("position:absolute;inset:0")}
          />
          <div
            style={sx(
              "position:absolute;inset:0;background:linear-gradient(90deg,#161009,transparent 30%);pointer-events:none;z-index:3",
            )}
          />
        </div>
      </div>
    </section>
  );
}
