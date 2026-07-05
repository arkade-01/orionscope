"use client";

import { useState } from "react";
import { sx } from "@/lib/css";
import { faqs } from "@/lib/data";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      style={sx(
        "position:relative;z-index:1;max-width:820px;margin:0 auto;padding:100px 32px 40px",
      )}
    >
      <h2
        style={sx(
          "font-size:40px;font-weight:800;letter-spacing:-.03em;text-align:center;margin-bottom:48px",
        )}
      >
        Questions, answered.
      </h2>
      <div style={sx("display:flex;flex-direction:column;gap:12px")}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className="faq-item"
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={sx(
                "border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px 26px;cursor:pointer;background:rgba(255,255,255,.02)",
              )}
            >
              <div
                style={sx(
                  "display:flex;justify-content:space-between;align-items:center;gap:20px",
                )}
              >
                <span style={sx("font-size:17px;font-weight:600")}>{f.q}</span>
                <span
                  style={sx(
                    "font-size:24px;color:#FCA900;font-weight:400;flex:none",
                  )}
                >
                  {isOpen ? "–" : "+"}
                </span>
              </div>
              {isOpen && (
                <p
                  style={sx(
                    "font-size:15px;line-height:1.65;color:#ffffffa8;margin-top:14px",
                  )}
                >
                  {f.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
