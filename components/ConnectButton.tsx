"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { sx } from "@/lib/css";

const GHOST =
  "border:1px solid rgba(255,255,255,.18);background:none;color:#fff;font-weight:600;font-size:14px;padding:12px 22px;border-radius:999px;cursor:pointer;font-family:inherit;white-space:nowrap";

function short(a: string) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

export function ConnectButton({ onConnected }: { onConnected?: (address: string) => void }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect({
    mutation: {
      onSuccess: (data) => {
        // An account entry is either the address or an object carrying it,
        // depending on whether the connector reports capabilities.
        const first = data.accounts[0];
        const value = typeof first === "string" ? first : first?.address;
        if (value) onConnected?.(value);
      },
    },
  });
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div style={sx("display:flex;align-items:center;gap:10px;flex-wrap:wrap")}>
        <span
          style={sx(
            "font-family:var(--font-mono),ui-monospace,monospace;font-size:13px;color:#ffffff90",
          )}
        >
          {short(address)}
        </span>
        <button onClick={() => disconnect()} style={sx(`${GHOST};padding:8px 16px;font-size:13px`)}>
          Disconnect
        </button>
      </div>
    );
  }

  const injectedConnector = connectors.find((c) => c.type === "injected") ?? connectors[0];
  if (!injectedConnector) {
    return (
      <span style={sx("font-size:13px;color:#ffffff80")}>
        No browser wallet detected. You can still scan any address.
      </span>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injectedConnector })}
      disabled={isPending}
      style={sx(`${GHOST}${isPending ? ";opacity:.5" : ""}`)}
    >
      {isPending ? "Check your wallet…" : "Connect wallet"}
    </button>
  );
}
