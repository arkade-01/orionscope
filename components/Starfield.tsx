import { sx } from "@/lib/css";

const STARS =
  "position:fixed;inset:0;pointer-events:none;z-index:0;background:" +
  "radial-gradient(1.5px 1.5px at 12% 18%, #fff9, transparent)," +
  "radial-gradient(1.5px 1.5px at 27% 62%, #fff7, transparent)," +
  "radial-gradient(1px 1px at 44% 30%, #fff8, transparent)," +
  "radial-gradient(1.5px 1.5px at 63% 12%, #fff6, transparent)," +
  "radial-gradient(1px 1px at 78% 48%, #fff7, transparent)," +
  "radial-gradient(1.5px 1.5px at 88% 22%, #fff8, transparent)," +
  "radial-gradient(1px 1px at 55% 78%, #fff6, transparent)," +
  "radial-gradient(1px 1px at 33% 88%, #fff5, transparent)," +
  "radial-gradient(1.5px 1.5px at 92% 70%, #fff6, transparent)," +
  "radial-gradient(1px 1px at 7% 82%, #fff6, transparent)";

export function Starfield() {
  return <div style={sx(STARS)} />;
}
