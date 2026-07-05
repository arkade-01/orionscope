import { sx } from "@/lib/css";
import { steps } from "@/lib/data";

export function Process() {
  return (
    <section
      id="process"
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:100px 32px 60px",
      )}
    >
      <div
        className="process-grid"
        style={sx(
          "display:grid;grid-template-columns:.8fr 1.2fr;gap:60px;align-items:start",
        )}
      >
        <div className="sticky" style={sx("position:sticky;top:120px")}>
          <p
            style={sx(
              "font-size:13px;letter-spacing:.16em;color:#FCA900;font-weight:600;margin-bottom:16px",
            )}
          >
            HOW IT WORKS
          </p>
          <h2
            style={sx(
              "font-size:42px;font-weight:800;letter-spacing:-.03em;line-height:1.06;margin-bottom:20px",
            )}
          >
            A methodical hunt,
            <br />
            not a hopeful guess.
          </h2>
          <p
            style={sx(
              "font-size:16px;line-height:1.65;color:#ffffffa8;margin-bottom:28px",
            )}
          >
            Every case is run by researchers, not scripts. We map the trail,
            verify it onchain, and only move when the funds are real and
            reachable.
          </p>
          <a
            href="#start"
            style={sx(
              "display:inline-block;background:linear-gradient(135deg,#FCA900,#FC5000);color:#060606;font-weight:700;font-size:15px;padding:14px 26px;border-radius:999px",
            )}
          >
            Open a case →
          </a>
        </div>
        <div style={sx("display:flex;flex-direction:column;gap:16px")}>
          {steps.map((st) => (
            <div
              key={st.n}
              style={sx(
                "display:flex;gap:22px;border:1px solid rgba(255,255,255,.09);border-radius:18px;padding:26px 28px;background:rgba(255,255,255,.02)",
              )}
            >
              <div
                style={sx(
                  "font-size:14px;font-weight:800;color:#FC5000;font-family:var(--font-mono),monospace;padding-top:3px",
                )}
              >
                {st.n}
              </div>
              <div>
                <h3
                  style={sx("font-size:19px;font-weight:700;margin-bottom:8px")}
                >
                  {st.title}
                </h3>
                <p
                  style={sx("font-size:14.5px;line-height:1.6;color:#ffffff98")}
                >
                  {st.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
