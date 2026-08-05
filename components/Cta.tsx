"use client";

import { useState } from "react";
import { sx } from "@/lib/css";

const RECOVER_EMAIL = "recover@orionscope.io";

export function Cta() {
  const [wallet, setWallet] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = [
      wallet && `Wallet address: ${wallet}`,
      email && `Email: ${email}`,
      handle && `X handle: ${handle}`,
    ]
      .filter(Boolean)
      .join("\n");
    const subject = encodeURIComponent("New recovery case submission");
    window.location.href = `mailto:${RECOVER_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
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
          <img
            src="/assets/logo-icon-white.png"
            alt="Orion Scope"
            style={sx("width:34px;height:34px;object-fit:contain;margin-bottom:24px")}
          />
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
              "font-size:18px;color:#ffffffb0;max-width:560px;margin:0 auto 36px",
            )}
          >
            Share a wallet address, email, or X handle — whatever&apos;s
            easiest. The first scan is free and takes 48 hours.
          </p>
          <form
            onSubmit={onSubmit}
            className="cta-form"
            style={sx("display:flex;flex-direction:column;gap:16px;max-width:640px;margin:0 auto")}
          >
            <div
              className="cta-fields"
              style={sx("display:flex;gap:12px;flex-wrap:wrap")}
            >
              <input
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="Wallet address"
                style={sx(
                  "flex:1;min-width:160px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:16px 22px;color:#fff;font-size:15px;font-family:inherit;outline:none",
                )}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                style={sx(
                  "flex:1;min-width:160px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:16px 22px;color:#fff;font-size:15px;font-family:inherit;outline:none",
                )}
              />
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="X handle"
                style={sx(
                  "flex:1;min-width:160px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:16px 22px;color:#fff;font-size:15px;font-family:inherit;outline:none",
                )}
              />
            </div>
            <button
              type="submit"
              style={sx(
                "align-self:center;background:linear-gradient(135deg,#FCA900,#FC5000);color:#060606;font-weight:700;font-size:15px;padding:16px 30px;border-radius:999px;border:none;cursor:pointer;font-family:inherit",
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
