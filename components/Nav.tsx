import { sx } from "@/lib/css";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How it works" },
  { href: "#results", label: "Results" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header
      style={sx(
        "position:sticky;top:0;z-index:50;backdrop-filter:blur(14px);background:rgba(6,6,6,.72);border-bottom:1px solid rgba(255,255,255,.07)",
      )}
    >
      <nav
        style={sx(
          "max-width:1240px;margin:0 auto;padding:18px 32px;display:flex;align-items:center;justify-content:space-between",
        )}
      >
        <a href="#top">
          <Logo mark={38} text={20} />
        </a>
        <div
          className="nav-links"
          style={sx("display:flex;align-items:center;gap:38px")}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={sx("font-size:14.5px;color:#ffffffcc;font-weight:500")}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#start"
          style={sx(
            "background:linear-gradient(135deg,#FCA900,#FC5000);color:#060606;font-weight:700;font-size:14.5px;padding:12px 22px;border-radius:999px",
          )}
        >
          Start a recovery
        </a>
      </nav>
    </header>
  );
}
