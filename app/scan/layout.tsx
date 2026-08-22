import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";

/**
 * Wallet providers live here rather than in the root layout so the marketing
 * pages never pay for the wagmi bundle.
 */
export default function ScanLayout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}
