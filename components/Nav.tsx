"use client";

import { useState } from "react";
import { sx } from "@/lib/css";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How it works" },
  { href: "#results", label: "Results" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={sx(
        "position:sticky;top:0;z-index:50;backdrop-filter:blur(14px);background:rgba(6,6,6,.72);border-bottom:1px solid rgba(255,255,255,.07)",
      )}
    >
      <nav
        className="nav-inner"
        style={sx(
          "max-width:1240px;margin:0 auto;padding:18px 32px;display:flex;align-items:center;justify-content:space-between;gap:12px",
        )}
      >
        <a href="#top" style={sx("flex:none")}>
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
        <div style={sx("display:flex;align-items:center;gap:12px;flex:none")}>
          <a
            href="#start"
            className="nav-cta"
            style={sx(
              "background:linear-gradient(135deg,#FCA900,#FC5000);color:#060606;font-weight:700;font-size:14.5px;padding:12px 22px;border-radius:999px;white-space:nowrap",
            )}
          >
            Start a recovery
          </a>
          <button
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={sx(
              "width:38px;height:38px;flex:none;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.18);border-radius:10px;background:transparent;color:#fff;cursor:pointer;display:none",
            )}
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M0 1H16M0 6H16M0 11H16" stroke="#fff" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div
          className="nav-menu"
          style={sx("flex-direction:column;gap:2px;padding:0 20px 18px;display:none")}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={sx(
                "font-size:15.5px;color:#ffffffd0;font-weight:500;padding:12px 0;border-top:1px solid rgba(255,255,255,.07)",
              )}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
