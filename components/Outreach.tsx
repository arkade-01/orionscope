import { sx } from "@/lib/css";
import { outreach } from "@/lib/data";

export function Outreach() {
  return (
    <section
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:60px 32px",
      )}
    >
      <div style={sx("text-align:center;margin-bottom:48px")}>
        <p
          style={sx(
            "font-size:13px;letter-spacing:.16em;color:#FCA900;font-weight:600;margin-bottom:16px",
          )}
        >
          TWO WAYS WE WORK
        </p>
        <h2
          style={sx(
            "font-size:42px;font-weight:800;letter-spacing:-.03em;line-height:1.06",
          )}
        >
          You find us — or we find you.
        </h2>
      </div>
      <div
        className="two-ways"
        style={sx("display:grid;grid-template-columns:1fr 1fr;gap:20px")}
      >
        <div
          style={sx(
            "border:1px solid rgba(255,255,255,.09);border-radius:22px;padding:38px;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))",
          )}
        >
          <div
            style={sx(
              "display:inline-flex;align-items:center;gap:10px;padding:6px 14px;border:1px solid rgba(255,255,255,.15);border-radius:999px;margin-bottom:22px",
            )}
          >
            <span
              style={sx(
                "font-size:12px;letter-spacing:.1em;color:#ffffffb0;font-weight:600",
              )}
            >
              YOU REACH OUT
            </span>
          </div>
          <h3
            style={sx(
              "font-size:24px;font-weight:700;letter-spacing:-.01em;margin-bottom:12px",
            )}
          >
            Bring us a case
          </h3>
          <p style={sx("font-size:15px;line-height:1.65;color:#ffffffa8")}>
            You know something&apos;s missing — a lost phrase, a stuck transfer,
            a wallet you can&apos;t reach. Share what you have and our
            researchers take it from there.
          </p>
        </div>
        <div
          style={sx(
            "border:1px solid rgba(252,169,0,.35);border-radius:22px;padding:38px;background:radial-gradient(circle at 100% 0%,rgba(252,80,0,.14),transparent 55%),rgba(255,255,255,.02)",
          )}
        >
          <div
            style={sx(
              "display:inline-flex;align-items:center;gap:10px;padding:6px 14px;border:1px solid rgba(252,169,0,.4);border-radius:999px;background:rgba(252,169,0,.08);margin-bottom:22px",
            )}
          >
            <span
              style={sx(
                "width:7px;height:7px;border-radius:50%;background:#FCA900;box-shadow:0 0 10px #FCA900",
              )}
            />
            <span
              style={sx(
                "font-size:12px;letter-spacing:.1em;color:#FCD07a;font-weight:600",
              )}
            >
              WE REACH OUT
            </span>
          </div>
          <h3
            style={sx(
              "font-size:24px;font-weight:700;letter-spacing:-.01em;margin-bottom:12px",
            )}
          >
            We research &amp; come to you
          </h3>
          <p style={sx("font-size:15px;line-height:1.65;color:#ffffffc0")}>
            Most people never learn what they&apos;re owed. We continuously scan
            the chain for unclaimed value — dormant balances, missed airdrops,
            stranded transfers — trace it to its owner, and reach out with a
            verified plan to claim it.
          </p>
        </div>
      </div>
      <div
        className="grid-3"
        style={sx(
          "display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:20px",
        )}
      >
        {outreach.map((o) => (
          <div
            key={o.title}
            style={sx(
              "display:flex;gap:16px;align-items:flex-start;border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:24px;background:rgba(255,255,255,.02)",
            )}
          >
            <span style={sx("font-size:22px;flex:none")}>{o.icon}</span>
            <div>
              <h4 style={sx("font-size:16px;font-weight:700;margin-bottom:6px")}>
                {o.title}
              </h4>
              <p style={sx("font-size:13.5px;line-height:1.55;color:#ffffff90")}>
                {o.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
