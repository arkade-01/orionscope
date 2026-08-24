"use client";

import { useEffect, useState } from "react";
import { sx } from "@/lib/css";
import { heroStats, type HeroStat } from "@/lib/data";
import { ImageSlot } from "./ImageSlot";

const FORMAT: Record<HeroStat["format"], (v: number) => string> = {
  usdMillions: (v) => "$" + (v / 1e6).toFixed(1) + "M",
  count: (v) => v.toLocaleString(),
  percent: (v) => v + "%",
};

export function Hero() {
  // Seeded with the FINAL values so they never render as 0 when JS is absent or
  // motion is reduced (per the design handoff spec). The figures themselves
  // live in lib/data.ts — one place per number, so editing one cannot leave a
  // counter animating towards a different value than it started at.
  const [shown, setShown] = useState<string[]>(() =>
    heroStats.map((s) => FORMAT[s.format](s.value)),
  );

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      const e = 1 - Math.pow(1 - p, 3);
      setShown(heroStats.map((s) => FORMAT[s.format](Math.round(s.value * e))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const stats: [string, string][] = heroStats.map((s, i) => [
    shown[i] ?? FORMAT[s.format](s.value),
    s.label,
  ]);

  return (
    <section
      id="top"
      className="hero-grid"
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:96px 32px 80px;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center",
      )}
    >
      <div
        style={sx(
          "position:absolute;left:-120px;top:120px;width:520px;height:520px;background:radial-gradient(circle,rgba(252,80,0,.28),transparent 62%);filter:blur(20px);pointer-events:none;z-index:-1",
        )}
      />
      <div>
        <div
          style={sx(
            "display:inline-flex;align-items:center;gap:10px;padding:8px 16px;border:1px solid rgba(252,169,0,.35);border-radius:999px;background:rgba(252,169,0,.06);margin-bottom:28px",
          )}
        >
          <span
            style={sx(
              "width:7px;height:7px;border-radius:50%;background:#FCA900;box-shadow:0 0 10px #FCA900",
            )}
          />
          <span
            style={sx(
              "font-size:12.5px;letter-spacing:.14em;font-weight:600;color:#FCD07a",
            )}
          >
            ONCHAIN FUND RECOVERY
          </span>
        </div>
        <h1
          style={sx(
            "font-size:68px;line-height:1.02;font-weight:800;letter-spacing:-.03em;margin-bottom:24px",
          )}
        >
          Recover what you
          <br />
          forgot{" "}
          <span
            style={sx(
              "font-style:italic;background:linear-gradient(135deg,#FCA900,#FC5000);-webkit-background-clip:text;background-clip:text;color:transparent",
            )}
          >
            onchain.
          </span>
        </h1>
        <p
          className="hero-sub"
          style={sx(
            "font-size:19px;line-height:1.6;color:#ffffffb0;max-width:520px;margin-bottom:40px",
          )}
        >
          Orion Scope is an onchain research team that helps people and teams
          trace, reclaim, and recover lost or forgotten funds — from 
           stranded bridge transfers and unclaimed airdrops. We
          also research the chain proactively and reach out when we find value
          that&apos;s yours to claim.
        </p>
        <div
          className="hero-btns"
          style={sx("display:flex;gap:16px;flex-wrap:wrap;margin-bottom:48px")}
        >
          <a
            href="/scan"
            style={sx(
              "background:linear-gradient(135deg,#FCA900,#FC5000);color:#060606;font-weight:700;font-size:16px;padding:17px 32px;border-radius:999px;box-shadow:0 12px 40px rgba(252,80,0,.35)",
            )}
          >
            Start a free scan →
          </a>
          <a
            href="#process"
            style={sx(
              "border:1px solid rgba(255,255,255,.18);color:#fff;font-weight:600;font-size:16px;padding:17px 30px;border-radius:999px",
            )}
          >
            See how it works
          </a>
        </div>
        <div className="hero-stats" style={sx("display:flex;gap:40px")}>
          {stats.map(([value, label], i) => (
            <div
              key={label}
              className="hero-stat"
              style={sx("display:flex;gap:40px;align-items:flex-start")}
            >
              {i > 0 && (
                <div
                  style={sx(
                    "width:1px;align-self:stretch;background:rgba(255,255,255,.1)",
                  )}
                />
              )}
              <div>
                <div
                  className="stat-fig"
                  style={sx(
                    "font-size:30px;font-weight:800;letter-spacing:-.02em",
                  )}
                >
                  {value}
                </div>
                <div style={sx("font-size:13px;color:#ffffff80;margin-top:4px")}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* hero visual */}
      <div style={sx("position:relative")}>
        <div
          style={sx(
            "position:absolute;inset:-8% -4%;background:radial-gradient(circle at 60% 40%,rgba(252,80,0,.35),transparent 60%);filter:blur(30px);z-index:0",
          )}
        />
        <div
          style={sx(
            "position:relative;z-index:1;border-radius:26px;overflow:hidden;border:1px solid rgba(255,255,255,.1)",
          )}
        >
          <ImageSlot
            src="/assets/hero.jpg"
            alt="Orion Scope hero render"
            label="Drop a statue / hero render"
            iconSize={34}
            style={sx("width:100%;height:520px;display:block")}
          />
          <div
            style={sx(
              "position:absolute;inset:0;background:linear-gradient(160deg,transparent 40%,rgba(6,6,6,.65));pointer-events:none",
            )}
          />
        </div>
        {/* floating scan card */}
        <div
          className="scan-card"
          style={sx(
            "position:absolute;left:-34px;bottom:44px;z-index:2;width:290px;background:rgba(12,12,12,.86);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:18px;box-shadow:0 24px 60px rgba(0,0,0,.5);animation:os-float 6s ease-in-out infinite",
          )}
        >
          <div
            style={sx(
              "display:flex;align-items:center;justify-content:space-between;margin-bottom:14px",
            )}
          >
            <span
              style={sx(
                "font-size:12px;letter-spacing:.1em;color:#ffffff80;font-weight:600",
              )}
            >
              DEEP SCAN
            </span>
            <span
              style={sx(
                "display:flex;align-items:center;gap:6px;font-size:11px;color:#FCA900;font-weight:600",
              )}
            >
              <span
                style={sx(
                  "width:8px;height:8px;border:2px solid #FCA900;border-top-color:transparent;border-radius:50%;display:inline-block;animation:os-spin 1s linear infinite",
                )}
              />
              Live
            </span>
          </div>
          <div
            style={sx(
              "font-family:var(--font-mono),monospace;font-size:12px;color:#ffffff70;margin-bottom:14px",
            )}
          >
            0x7a3f…c9e1
          </div>
          <div
            style={sx(
              "height:1px;background:rgba(255,255,255,.09);margin-bottom:14px",
            )}
          />
          <div
            style={sx(
              "display:flex;justify-content:space-between;align-items:baseline",
            )}
          >
            <span style={sx("font-size:13px;color:#ffffffa0")}>Recoverable</span>
            <span
              style={sx(
                "font-size:22px;font-weight:800;background:linear-gradient(135deg,#FCA900,#FC5000);-webkit-background-clip:text;background-clip:text;color:transparent",
              )}
            >
              $48,210
            </span>
          </div>
          <div
            style={sx(
              "margin-top:12px;height:6px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;position:relative",
            )}
          >
            <span
              style={sx(
                "position:absolute;inset:0;width:72%;background:linear-gradient(90deg,#FCA900,#FC5000)",
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
