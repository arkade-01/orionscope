import type { Metadata } from "next";
import { sx } from "@/lib/css";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScanForm } from "@/components/ScanForm";

export const metadata: Metadata = {
  title: "Scan a wallet — Orion Scope",
  description:
    "Find unclaimed creator fees, incentive rewards and liquidity fees on Base. " +
    "Every figure traces to an on-chain read.",
};

export default function ScanPage() {
  return (
    <div style={sx("background:#060606;color:#fff;overflow:hidden;position:relative;min-height:100vh")}>
      <Starfield />
      <Nav />
      <main
        style={sx(
          "position:relative;z-index:1;max-width:900px;margin:0 auto;padding:120px 32px 80px",
        )}
      >
        <h1
          style={sx(
            "font-size:52px;font-weight:800;letter-spacing:-.03em;line-height:1.05;margin-bottom:18px",
          )}
        >
          Scan a wallet
        </h1>
        <p style={sx("font-size:18px;color:#ffffffb0;max-width:620px;margin-bottom:16px")}>
          Creator fees, incentive rewards and liquidity fees on Base. Read-only — nothing is
          signed and nothing moves.
        </p>
        <p style={sx("font-size:14px;color:#ffffff70;max-width:620px;margin-bottom:44px")}>
          Every amount comes from a real on-chain read you can check yourself. Where there is no
          trustworthy price, we say <em>unpriced</em> rather than guessing.
        </p>
        <ScanForm />
      </main>
      <Footer />
    </div>
  );
}
