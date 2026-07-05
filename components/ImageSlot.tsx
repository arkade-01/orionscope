"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Star } from "./icons";

/**
 * Renders a real image if it loads, otherwise falls back to a styled
 * placeholder — mirrors the prototype's <image-slot> element. Drop the real
 * assets into /public/scraps/ to replace the placeholders.
 */
export function ImageSlot({
  src,
  alt,
  label,
  iconSize = 34,
  style,
}: {
  src: string;
  alt: string;
  label: string;
  iconSize?: number;
  style?: CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="img-slot" style={style}>
      <div className="img-ph">
        <Star size={iconSize} fill="#FCA900" />
        <span>{label}</span>
      </div>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
