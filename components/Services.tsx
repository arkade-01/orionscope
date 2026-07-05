import { sx } from "@/lib/css";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section
      id="services"
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:70px 32px 40px",
      )}
    >
      <div
        className="grid-3"
        style={sx("display:grid;grid-template-columns:repeat(3,1fr);gap:20px")}
      >
        {services.map((s) => (
          <div
            key={s.title}
            className="os-card"
            style={sx(
              "border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:30px;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))",
            )}
          >
            <div
              style={sx(
                "width:50px;height:50px;border-radius:14px;background:rgba(252,80,0,.12);border:1px solid rgba(252,80,0,.3);display:flex;align-items:center;justify-content:center;margin-bottom:22px;font-size:24px",
              )}
            >
              {s.icon}
            </div>
            <h3
              style={sx(
                "font-size:20px;font-weight:700;letter-spacing:-.01em;margin-bottom:10px",
              )}
            >
              {s.title}
            </h3>
            <p style={sx("font-size:14.5px;line-height:1.6;color:#ffffff98")}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
