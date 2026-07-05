import { sx } from "@/lib/css";
import { Star } from "./icons";

export function Logo({ mark = 38, text = 20 }: { mark?: number; text?: number }) {
  return (
    <span style={sx("display:flex;align-items:center;gap:12px")}>
      <span
        style={sx(
          `position:relative;width:${mark}px;height:${mark}px;border-radius:50%;background:linear-gradient(150deg,#FCA900,#FC5000);display:flex;align-items:center;justify-content:center;flex:none`,
        )}
      >
        <Star size={Math.round(mark / 2)} fill="#060606" />
      </span>
      <span
        style={sx(
          `font-weight:800;font-size:${text}px;letter-spacing:-.02em;line-height:.95`,
        )}
      >
        ORION
        <br />
        <span style={sx("letter-spacing:.02em")}>SCOPE</span>
      </span>
    </span>
  );
}
