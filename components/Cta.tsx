"use client";

import { useState } from "react";
import { sx } from "@/lib/css";
import { Star } from "./icons";

export function Cta() {
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thanks — our team will reach out within 48 hours.");
  };

  return (
    <section
      id="start"
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:40px auto 0;padding:0 32px",
      )}
    >
      <div
        className="cta-panel"
        style={sx(
          "position:relative;border-radius:30px;overflow:hidden;border:1px solid rgba(252,169,0,.3);padding:72px 40px;text-align:center;background:radial-gradient(circle at 50% 0%,rgba(252,80,0,.22),transparent 60%),#0a0705",
        )}
      >
        <div
          style={sx(
            "position:absolute;top:-40%;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(252,80,0,.25),transparent 60%);filter:blur(30px);pointer-events:none",
          )}
        />
        <div style={sx("position:relative")}>
          <Star size={34} fill="#FCA900" style={sx("margin-bottom:24px")} />
          <h2
            style={sx(
              "font-size:48px;font-weight:800;letter-spacing:-.03em;line-height:1.05;margin-bottom:18px",
            )}
          >
            Think something&apos;s
            <br />
            lost? Let&apos;s look.
          </h2>
          <p
            style={sx(
              "font-size:18px;color:#ffffffb0;max-width:520px;margin:0 auto 36px",
            )}
          >
            Share a wallet address or the story of what went missing. The first
            scan is free and takes 48 hours.
          </p>
          <form
            onSubmit={onSubmit}
            className="cta-form"
            style={sx(
              "display:flex;gap:12px;max-width:520px;margin:0 auto;flex-wrap:wrap;justify-content:center",
            )}
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Wallet address or email"
              style={sx(
                "flex:1;min-width:240px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:16px 22px;color:#fff;font-size:15px;font-family:inherit;outline:none",
              )}
            />
            <button
              type="submit"
              style={sx(
                "background:linear-gradient(135deg,#FCA900,#FC5000);color:#060606;font-weight:700;font-size:15px;padding:16px 30px;border-radius:999px;border:none;cursor:pointer;font-family:inherit",
              )}
            >
              Start free scan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
