import { sx } from "@/lib/css";

export function Logo({ mark = 38, text = 20 }: { mark?: number; text?: number }) {
  return (
    <span style={sx("display:flex;align-items:center;gap:12px")}>
      <img
        src="/assets/logo-mark.png"
        alt="Orion Scope"
        style={{ width: mark, height: mark, objectFit: "contain", flex: "none" }}
      />
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
