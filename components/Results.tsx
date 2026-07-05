import { sx } from "@/lib/css";
import { cases } from "@/lib/data";

export function Results() {
  return (
    <section
      id="results"
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:80px 32px 60px",
      )}
    >
      <div style={sx("text-align:center;margin-bottom:48px")}>
        <p
          style={sx(
            "font-size:13px;letter-spacing:.16em;color:#FCA900;font-weight:600;margin-bottom:16px",
          )}
        >
          RECENT RECOVERIES
        </p>
        <h2 style={sx("font-size:42px;font-weight:800;letter-spacing:-.03em")}>
          Cases that came back from the dark.
        </h2>
      </div>
      <div
        className="grid-3"
        style={sx("display:grid;grid-template-columns:repeat(3,1fr);gap:20px")}
      >
        {cases.map((c) => (
          <div
            key={c.tag}
            className="os-card"
            style={sx(
              "border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:30px;background:rgba(255,255,255,.02)",
            )}
          >
            <div
              style={sx(
                "display:flex;justify-content:space-between;align-items:center;margin-bottom:22px",
              )}
            >
              <span
                style={sx(
                  "font-size:12px;letter-spacing:.1em;color:#ffffff70;font-weight:600",
                )}
              >
                {c.tag}
              </span>
              <span
                style={sx(
                  "font-size:11px;font-weight:700;color:#7CE0A0;background:rgba(124,224,160,.12);padding:5px 10px;border-radius:99px",
                )}
              >
                RECOVERED
              </span>
            </div>
            <div
              style={sx(
                "font-size:38px;font-weight:800;letter-spacing:-.02em;background:linear-gradient(135deg,#FCA900,#FC5000);-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:12px",
              )}
            >
              {c.amount}
            </div>
            <p style={sx("font-size:14.5px;line-height:1.6;color:#ffffff98")}>
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
