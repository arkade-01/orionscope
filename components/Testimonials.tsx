"use client";

import { useEffect, useRef, useState } from "react";
import { sx } from "@/lib/css";
import { testimonials } from "@/lib/data";

const arrowBtn = sx(
  "position:absolute;top:50%;transform:translateY(-50%);z-index:3;width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:rgba(12,12,12,.82);backdrop-filter:blur(10px);color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center",
);

export function Testimonials() {
  const [open, setOpen] = useState(-1);
  const rail = useRef<HTMLDivElement>(null);
  const n = testimonials.length;

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(-1);
      if (e.key === "ArrowRight") setOpen((i) => (i + 1) % n);
      if (e.key === "ArrowLeft") setOpen((i) => (i - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, n]);

  const scroll = (dir: number) =>
    rail.current?.scrollBy({
      left: dir * rail.current.clientWidth * 0.75,
      behavior: "smooth",
    });

  return (
    <section
      id="testimonials"
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:80px 32px 60px",
      )}
    >
      <div style={sx("text-align:center;margin-bottom:44px")}>
        <p
          style={sx(
            "font-size:13px;letter-spacing:.16em;color:#FCA900;font-weight:600;margin-bottom:16px",
          )}
        >
          FROM THE CASE FILES
        </p>
        <h2 style={sx("font-size:42px;font-weight:800;letter-spacing:-.03em")}>
          People who got their funds back.
        </h2>
        <p
          style={sx(
            "font-size:15.5px;color:#ffffff90;margin-top:14px;max-width:520px;margin-left:auto;margin-right:auto",
          )}
        >
          Real conversations from recovery and outreach cases. Tap any card to
          read the full exchange.
        </p>
      </div>

      <div style={sx("position:relative")}>
        <button
          className="testi-arrow"
          aria-label="Scroll testimonials left"
          onClick={() => scroll(-1)}
          style={{ ...arrowBtn, left: "-8px" }}
        >
          ←
        </button>
        <button
          className="testi-arrow"
          aria-label="Scroll testimonials right"
          onClick={() => scroll(1)}
          style={{ ...arrowBtn, right: "-8px" }}
        >
          →
        </button>
        <div
          ref={rail}
          className="testi-rail"
          style={sx(
            "display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 4px 16px",
          )}
        >
          {testimonials.map((t, i) => (
            <button
              key={t.src}
              className="os-card testi-card"
              aria-label={`Expand case conversation ${i + 1}`}
              onClick={() => setOpen(i)}
              style={{
                ...sx(
                  "flex:none;height:420px;padding:0;border:1px solid rgba(255,255,255,.09);border-radius:18px;overflow:hidden;background:#0b0b0b;cursor:zoom-in;scroll-snap-align:start",
                ),
                aspectRatio: `${t.w}/${t.h}`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.src}
                alt={`Case conversation ${i + 1}`}
                loading="lazy"
                style={sx(
                  "width:100%;height:100%;object-fit:cover;display:block",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {open >= 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded case conversation"
          onClick={() => setOpen(-1)}
          style={sx(
            "position:fixed;inset:0;z-index:100;background:rgba(6,6,6,.88);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:28px;animation:os-fade .18s ease-out",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={testimonials[open].src}
            alt={`Case conversation ${open + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={sx(
              "max-width:min(92vw,560px);max-height:86vh;width:auto;height:auto;border-radius:20px;border:1px solid rgba(255,255,255,.14);box-shadow:0 24px 80px rgba(0,0,0,.6);animation:os-zoom .18s ease-out",
            )}
          />
          <button
            aria-label="Close"
            onClick={() => setOpen(-1)}
            style={{
              ...arrowBtn,
              top: "24px",
              right: "24px",
              transform: "none",
              position: "fixed",
            }}
          >
            ✕
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => (i - 1 + n) % n);
            }}
            style={{ ...arrowBtn, left: "20px", position: "fixed" }}
          >
            ←
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => (i + 1) % n);
            }}
            style={{ ...arrowBtn, right: "20px", position: "fixed" }}
          >
            →
          </button>
          <div
            style={sx(
              "position:fixed;bottom:22px;left:50%;transform:translateX(-50%);font-family:var(--font-mono),monospace;font-size:12.5px;letter-spacing:.08em;color:#ffffff90",
            )}
          >
            {open + 1} / {n}
          </div>
        </div>
      )}
    </section>
  );
}
