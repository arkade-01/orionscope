import { sx } from "@/lib/css";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:80px 32px 60px",
      )}
    >
      <div style={sx("text-align:center;margin-bottom:48px")}>
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
      </div>
      <div
        className="testi-grid"
        style={sx("display:grid;grid-template-columns:repeat(2,1fr);gap:20px")}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="os-card"
            style={sx(
              "border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:28px;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))",
            )}
          >
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="#FCA900"
              style={sx("margin-bottom:16px;opacity:.7")}
            >
              <path d="M0 16V9.6C0 3.6 3.4 0 9 0v3.6c-3 0-4.6 1.8-4.8 5.2H9V16H0Zm13 0V9.6c0-6 3.4-9.6 9-9.6v3.6c-3 0-4.6 1.8-4.8 5.2H22V16h-9Z" />
            </svg>
            <p
              className="testi-quote"
              style={sx(
                "font-size:14px;line-height:1.6;color:#ffffffd0;margin-bottom:22px",
              )}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <div style={sx("font-size:13.5px;font-weight:700;color:#fff")}>
              {t.name}
            </div>
            <div style={sx("font-size:12px;color:#FCD07a;margin-top:2px")}>
              {t.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
