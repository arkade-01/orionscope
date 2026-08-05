import { sx } from "@/lib/css";
import { Logo } from "./Logo";
import { MailIcon, XIcon, TelegramIcon } from "./icons";

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

const CONTACTS: {
  href: string;
  label: string;
  Icon: typeof MailIcon;
}[] = [
  { href: "mailto:recover@orionscope.io", label: "Email", Icon: MailIcon },
  { href: "https://x.com/Orion_Scope", label: "X (Twitter)", Icon: XIcon },
  // TODO: placeholder until the real Telegram handle is supplied
  { href: "https://t.me/orionscope", label: "Telegram", Icon: TelegramIcon },
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
          "max-width:1240px;margin:0 auto;padding:20px 32px 40px;border-top:1px solid rgba(255,255,255,.06);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px",
        )}
      >
        <span style={sx("font-size:13px;color:#ffffff60")}>
          © 2026 Orion Scope. All rights reserved.
        </span>
        <div style={sx("display:flex;gap:16px;align-items:center")}>
          {CONTACTS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              title={label}
              className="contact-icon"
              style={sx(
                "display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.14);color:#ffffff90",
              )}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <span style={sx("font-size:13px;color:#ffffff60")}>
          Non-custodial · No recovery, no fee
        </span>
      </div>
    </footer>
  );
}
