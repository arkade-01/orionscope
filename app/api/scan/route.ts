import { isAddress, getAddress } from "viem";
import { createBaseClient, scanWallets, type ScanReport } from "@orionscope/engine";

/**
 * Server-side scan.
 *
 * The RPC URL stays on the server — the browser never sees it, and there is no
 * signer here at all. This route only reads; claiming is a separate step where
 * the user's own wallet signs calldata we hand back.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** A deep scan is ~1900 RPC requests. Opt-in, so a public URL cannot drain the budget. */
const ALLOW_DEEP = process.env.ORIONSCOPE_ALLOW_DEEP === "true";

/** bigints are not JSON. */
function serialize(report: ScanReport): unknown {
  return JSON.parse(
    JSON.stringify(report, (_k, v) => (typeof v === "bigint" ? v.toString() : v)),
  );
}

export async function POST(request: Request) {
  let body: { address?: string; also?: string[]; deep?: boolean };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body with an address." }, { status: 400 });
  }

  const address = body.address?.trim();
  if (!address || !isAddress(address)) {
    return Response.json(
      { error: "That does not look like a wallet address. It should start with 0x." },
      { status: 400 },
    );
  }

  const also = (body.also ?? []).filter((a) => isAddress(a)).map((a) => getAddress(a));

  if (body.deep && !ALLOW_DEEP) {
    return Response.json(
      {
        error: "Deep scans are disabled on this server.",
        detail:
          "A deep scan issues around 1900 RPC requests. Results here cover the baseline " +
          "currencies only and may be incomplete.",
      },
      { status: 403 },
    );
  }

  const rpcUrl = process.env.BASE_RPC_URL;
  if (!rpcUrl) {
    return Response.json(
      { error: "This server is not configured with a Base RPC endpoint." },
      { status: 500 },
    );
  }

  try {
    const client = createBaseClient(rpcUrl);
    const report = await scanWallets(client, [getAddress(address), ...also], {
      clanker: body.deep ? { deep: true } : {},
    });
    return Response.json(serialize(report));
  } catch (err) {
    // Never answer a failed read with an empty report: the UI would render it
    // as "you are owed nothing", which is the one thing this product must not
    // get wrong.
    const message = (err as Error).message ?? "The scan could not complete.";
    return Response.json(
      {
        error: message.split("\n")[0],
        detail:
          "The scan could not complete. This is a failure to read the chain, not a finding " +
          "that this wallet has nothing to claim.",
      },
      { status: 502 },
    );
  }
}
