export function Star({
  size = 24,
  fill = "#060606",
  style,
}: {
  size?: number;
  fill?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={style}>
      <path d="M12 0c.7 6.2 5.1 10.6 11.3 11.3v1.4C17.1 13.4 12.7 17.8 12 24c-.7-6.2-5.1-10.6-11.3-11.3v-1.4C6.9 10.6 11.3 6.2 12 0Z" />
    </svg>
  );
}

export function MailIcon({
  size = 18,
  color = "currentColor",
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.8 12 13l8.5-6.2" />
    </svg>
  );
}

export function XIcon({
  size = 18,
  fill = "currentColor",
  style,
}: {
  size?: number;
  fill?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={style}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function TelegramIcon({
  size = 18,
  fill = "currentColor",
  style,
}: {
  size?: number;
  fill?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={style}>
      <path d="M20.66 3.6 2.9 10.5c-1.21.49-1.2 1.17-.22 1.47l4.55 1.42 1.76 5.42c.21.6.37.83.75.83.36 0 .53-.16.75-.39l1.83-1.77 4.53 3.35c.83.46 1.43.22 1.64-.77l2.97-14c.31-1.2-.46-1.75-1.8-1.26Zm-3.7 4-8.4 5.86-.34 3.16-1.63-5.02 9.98-6.29c.47-.29.9-.13.55.19Z" />
    </svg>
  );
}
