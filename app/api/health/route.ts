/**
 * Deployment diagnostics.
 *
 * Reports whether each expected variable is *present* and, for the RPC, only
 * its host — never a value. The RPC URL carries an API key in its path, and an
 * unauthenticated endpoint that echoes configuration is how keys leak.
 *
 * Exists because "the variables are set in the dashboard" and "the running
 * function can see them" turned out to be different things, and there was no
 * way to tell them apart from outside.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function rpcHost(): string | null {
  const url = process.env.BASE_RPC_URL;
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return "unparseable";
  }
}

/**
 * Presence is not health. A configured but rejected key reported `ok: true`
 * here while every scan hung for two minutes retrying a 401 — so this actually
 * calls the RPC and reports what came back.
 */
async function rpcReachable(): Promise<{ reachable: boolean; detail: string | null }> {
  const url = process.env.BASE_RPC_URL;
  if (!url) return { reachable: false, detail: "BASE_RPC_URL is not set" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] }),
      signal: AbortSignal.timeout(8000),
    });
    const body = (await res.json()) as { result?: string; error?: { message?: string } };
    if (body.error) return { reachable: false, detail: body.error.message ?? "RPC returned an error" };
    if (!body.result) return { reachable: false, detail: `RPC replied ${res.status} with no result` };
    return { reachable: true, detail: `block ${parseInt(body.result, 16)}` };
  } catch (err) {
    return { reachable: false, detail: (err as Error).message ?? "could not reach the RPC" };
  }
}

export async function GET() {
  const rpc = await rpcReachable();
  return Response.json(
    {
      // True only when the chain actually answered.
      ok: rpc.reachable,
      rpc,
      env: {
        BASE_RPC_URL: Boolean(process.env.BASE_RPC_URL),
        ORIONSCOPE_ALLOW_DEEP: process.env.ORIONSCOPE_ALLOW_DEEP ?? null,
        ORIONSCOPE_DEEP_CONCURRENCY: process.env.ORIONSCOPE_DEEP_CONCURRENCY ?? null,
        ANTHROPIC_API_KEY: Boolean(process.env.ANTHROPIC_API_KEY),
      },
      rpcHost: rpcHost(),
      // Identifies which build is actually serving this domain, which is the
      // question when a redeploy appears not to have taken effect.
      deployment: {
        commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
        branch: process.env.VERCEL_GIT_COMMIT_REF ?? null,
        env: process.env.VERCEL_ENV ?? null,
        url: process.env.VERCEL_URL ?? null,
      },
    },
    { headers: { "cache-control": "no-store" } },
  );
}
