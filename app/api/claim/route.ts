import { isAddress, getAddress } from "viem";
import { buildClaimPlan, createBaseClient, scanWallets } from "@orionscope/engine";

/**
 * Builds the transactions that claim what a wallet is owed.
 *
 * Returns UNSIGNED calldata. There is no signer on this server and no private
 * key in the environment — the user's own wallet signs in their browser. A
 * compromised server can lie about what you are owed; it cannot move anything.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { address?: string; also?: string[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body with an address." }, { status: 400 });
  }

  const address = body.address?.trim();
  if (!address || !isAddress(address)) {
    return Response.json({ error: "That does not look like a wallet address." }, { status: 400 });
  }
  const also = (body.also ?? []).filter((a) => isAddress(a)).map((a) => getAddress(a));

  const rpcUrl = process.env.BASE_RPC_URL;
  if (!rpcUrl) {
    return Response.json(
      { error: "This server is not configured with a Base RPC endpoint." },
      { status: 500 },
    );
  }

  try {
    const client = createBaseClient(rpcUrl);
    // Rescanned here rather than reusing the page's earlier scan: Merkl proofs
    // rotate roughly every four hours and balances move, so a plan built from a
    // stale report would produce transactions that revert.
    const owners = [getAddress(address), ...also];
    const report = await scanWallets(client, owners);
    const { txs, errors } = await buildClaimPlan(client, report);

    return Response.json({
      builtAt: new Date().toISOString(),
      blockNumber: report.blockNumber.toString(),
      txs: txs.map((tx) => ({
        to: tx.to,
        data: tx.data,
        value: tx.value.toString(),
        chainId: tx.chainId,
        claimType: tx.claimType,
        description: tx.description,
        isPrerequisite: tx.isPrerequisite ?? false,
        // Who has to send it. For a Safe-held position that is not the visitor.
        from: report.items.find((i) => tx.itemIds.includes(i.id))?.owner ?? getAddress(address),
      })),
      errors,
    });
  } catch (err) {
    const message = (err as Error).message ?? "Could not build the claim.";
    return Response.json(
      {
        error: message.split("\n")[0],
        detail: "The claim could not be built. Nothing was sent and nothing was signed.",
      },
      { status: 502 },
    );
  }
}
