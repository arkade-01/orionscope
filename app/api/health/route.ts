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

export async function GET() {
  return Response.json(
    {
      ok: Boolean(process.env.BASE_RPC_URL),
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
