"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
// The dedicated entry point, not the `wagmi/connectors` barrel: that barrel
// re-exports a Tempo connector whose own dependency is missing, and importing it
// fails the production build.
import { injected } from "wagmi/connectors/injected";

/**
 * Wallet wiring, scoped to the routes that need it.
 *
 * Base only — this product does not read any other chain, and offering a wallet
 * a network it cannot use here is a way to lose someone's transaction.
 *
 * The public RPC is fine for the browser: it only ever reads chain id and sends
 * signed transactions. Every scan goes through the server, which uses the
 * configured endpoint and keeps it out of the client bundle.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [config] = useState(() =>
    createConfig({
      chains: [base],
      connectors: [injected()],
      transports: { [base.id]: http("https://mainnet.base.org") },
      ssr: true,
    }),
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
