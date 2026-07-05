import { sx } from "@/lib/css";
import { Logo } from "./Logo";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "SERVICES",
    links: [
      { href: "#services", label: "Seed recovery" },
      { href: "#services", label: "Airdrop reclaims" },
      { href: "#services", label: "Bridge rescue" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { href: "#process", label: "How it works" },
      { href: "#results", label: "Results" },
      { href: "#faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={sx(
        "position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.08);margin-top:80px",
      )}
    >
      <div
        style={sx(
          "max-width:1240px;margin:0 auto;padding:56px 32px 40px;display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap",
        )}
      >
        <div style={sx("max-width:320px")}>
          <div style={sx("margin-bottom:18px")}>
            <Logo mark={36} text={18} />
          </div>
          <p style={sx("font-size:14px;line-height:1.6;color:#ffffff80")}>
            Onchain research for lost and forgotten funds. Evidence-led,
            non-custodial, patient.
          </p>
        </div>
        <div style={sx("display:flex;gap:64px;flex-wrap:wrap")}>
          {COLUMNS.map((col) => (
            <div
              key={col.title}
              style={sx("display:flex;flex-direction:column;gap:12px")}
            >
              <span
                style={sx(
                  "font-size:12px;letter-spacing:.12em;color:#ffffff60;font-weight:600;margin-bottom:4px",
                )}
              >
                {col.title}
              </span>
              {col.links.map((l, i) => (
                <a
                  key={`${l.label}-${i}`}
                  href={l.href}
                  style={sx("font-size:14px;color:#ffffffb0")}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        style={sx(
          "max-width:1240px;margin:0 auto;padding:20px 32px 40px;border-top:1px solid rgba(255,255,255,.06);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px",
        )}
      >
        <span style={sx("font-size:13px;color:#ffffff60")}>
          © 2026 Orion Scope. All rights reserved.
        </span>
        <span style={sx("font-size:13px;color:#ffffff60")}>
          Non-custodial · No recovery, no fee
        </span>
      </div>
    </footer>
  );
}
