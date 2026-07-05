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
