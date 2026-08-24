import { sx } from "@/lib/css";

/**
 * Introduces the self-serve scanner on a page that otherwise sells the manual
 * recovery service.
 *
 * Deliberately does not name a figure. Everything below the fold on this page is
 * a real recovery; inventing a "typical amount" here would undercut the one
 * claim the product actually makes, which is that its numbers are checkable.
 */
const POINTS: { title: string; body: string }[] = [
  {
    title: "Reads the chain, not an index",
    body:
      "Every amount comes from a contract call at a specific block. Open any result and it shows " +
      "you the address, the function and the raw value it read.",
  },
  {
    title: "Says when it does not know",
    body:
      "No reliable price means the word “unpriced”, never $0.00. A source it could not read is " +
      "reported as unread — not as an empty wallet.",
  },
  {
    title: "Never holds your funds",
    body:
      "It builds the transactions; your wallet signs them. There is no key on our side, so the " +
      "worst it can do is be wrong out loud.",
  },
];

export function Scanner() {
  return (
    <section
      id="scanner"
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:80px 32px 40px",
      )}
    >
      <div
        style={sx(
          "border:1px solid rgba(252,169,0,.28);border-radius:30px;padding:56px 40px;background:radial-gradient(circle at 15% 0%,rgba(252,80,0,.16),transparent 55%),#0a0705",
        )}
      >
        <span
          style={sx(
            "display:inline-block;font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;letter-spacing:.14em;color:#FCA900;border:1px solid rgba(252,169,0,.35);border-radius:999px;padding:7px 14px;margin-bottom:24px",
          )}
        >
          NEW · SELF-SERVE
        </span>

        <h2
          style={sx(
            "font-size:44px;font-weight:800;letter-spacing:-.03em;line-height:1.08;margin-bottom:18px;max-width:720px",
          )}
        >
          Check a wallet yourself, in seconds
        </h2>

        <p
          style={sx(
            "font-size:18px;color:#ffffffb0;max-width:640px;line-height:1.6;margin-bottom:14px",
          )}
        >
          We built the tooling we use on Base into something you can run. Paste an address and it
          checks creator fees, incentive rewards and liquidity fees, then hands you the
          transactions to claim what it finds.
        </p>
        <p
          style={sx(
            "font-size:15px;color:#ffffff85;max-width:640px;line-height:1.6;margin-bottom:36px",
          )}
        >
          Free, read-only, and no wallet connection needed to look.
        </p>

        <div
          className="grid-3"
          style={sx("display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px")}
        >
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="os-card"
              style={sx(
                "border:1px solid rgba(255,255,255,.09);border-radius:18px;padding:24px;background:rgba(255,255,255,.025)",
              )}
            >
              <h3 style={sx("font-size:16px;font-weight:700;margin-bottom:10px")}>{p.title}</h3>
              <p style={sx("font-size:14px;line-height:1.6;color:#ffffff95")}>{p.body}</p>
            </div>
          ))}
        </div>

        <div style={sx("display:flex;gap:16px;flex-wrap:wrap;align-items:center")}>
          <a
            href="/scan"
            style={sx(
              "background:linear-gradient(135deg,#FCA900,#FC5000);color:#060606;font-weight:700;font-size:16px;padding:17px 32px;border-radius:999px;box-shadow:0 12px 40px rgba(252,80,0,.35)",
            )}
          >
            Scan a wallet →
          </a>
          <span style={sx("font-size:14px;color:#ffffff80")}>
            Still want us to do it? The recovery service is below.
          </span>
        </div>
      </div>
    </section>
  );
}
