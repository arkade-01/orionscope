import type { CSSProperties } from "react";

/**
 * Parse a plain CSS declaration string into a React style object.
 *
 * The source design is expressed as pixel-exact inline CSS. Rather than
 * hand-translate every declaration to a camelCased key (tedious and
 * error-prone), we parse the original strings once so the components stay a
 * faithful 1:1 of the design. Values never contain `;` or `:`, so a simple
 * split is safe here.
 */
export function sx(css: string): CSSProperties {
  const out: Record<string, string> = {};
  for (const decl of css.split(";")) {
    const idx = decl.indexOf(":");
    if (idx === -1) continue;
    const prop = decl.slice(0, idx).trim();
    const value = decl.slice(idx + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith("--")
      ? prop
      : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[key] = value;
  }
  return out as CSSProperties;
}
