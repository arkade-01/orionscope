import { isAddress, getAddress } from "viem";
import {
  createBaseClient,
  scanWallets,
  writeBrief,
  type ScanReport,
} from "@orionscope/engine";

/**
 * A scan, streamed as it happens.
 *
 * The point is not speed — it is that the visitor can see which sources were
 * checked and what each one returned. A single JSON response at the end asks
 * them to trust a total; this shows the work that produced it, and makes a
 * source that failed impossible to miss.
 *
 * Line protocol (NDJSON), one JSON object per line:
 *   {"type":"step","source":"clanker","status":"ok","itemCount":1}
 *   {"type":"progress","done":n,"total":n,"failed":n}      (full scans only)
 *   {"type":"report","report":{…}}
 *   {"type":"brief","text":"…","origin":"llm"|"deterministic"}
 *   {"type":"error","error":"…","detail":"…"}
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const ALLOW_DEEP = process.env.ORIONSCOPE_ALLOW_DEEP === "true";

/**
 * Parallel log requests during a full scan.
 *
 * The engine's default of 12 is tuned for a public RPC. Measured against a paid
 * endpoint that was answering fine, 12 gave ~3.8 windows/sec — an eight-minute
 * scan, which does not fit in a serverless request window. Raise it to match
 * whatever throughput the configured endpoint actually has.
 */
const DEEP_CONCURRENCY = Number(process.env.ORIONSCOPE_DEEP_CONCURRENCY ?? 30);

function serialize(report: ScanReport): unknown {
  return JSON.parse(JSON.stringify(report, (_k, v) => (typeof v === "bigint" ? v.toString() : v)));
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
  const deep = Boolean(body.deep);

  if (deep && !ALLOW_DEEP) {
    return Response.json(
      {
        error: "Full history scans are disabled on this server.",
        detail:
          "A full scan issues around 1900 requests to the chain. Use the quick scan — its " +
          "results are real, just not exhaustive.",
      },
      { status: 403 },
    );
  }

  const rpcUrl = process.env.BASE_RPC_URL;
  if (!rpcUrl) {
    return Response.json({ error: "This server has no Base RPC configured." }, { status: 500 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) => {
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`));
        } catch {
          // Client disconnected; the scan finishes and its result is dropped.
        }
      };

      try {
        const client = createBaseClient(rpcUrl);
        let lastProgress = 0;

        const report = await scanWallets(client, [getAddress(address), ...also], {
          onSourceDone: (event) => send({ type: "step", ...event }),
          clanker: deep
            ? {
                deep: true,
                deepConcurrency: DEEP_CONCURRENCY,
                onDeepProgress: (done, total, failed) => {
                  const now = Date.now();
                  if (done === total || now - lastProgress > 400) {
                    lastProgress = now;
                    send({ type: "progress", done, total, failed });
                  }
                },
              }
            : {},
        });

        send({ type: "report", report: serialize(report) });

        // The brief narrates the report and nothing else: every figure it uses
        // must appear verbatim in the scan, or it is discarded for the plain
        // one. Without an API key it is always the plain one, which is why this
        // never blocks the report — that has already been sent.
        try {
          const brief = await writeBrief(report);
          send({ type: "brief", text: brief.text, origin: brief.origin });
        } catch {
          // A brief is a nicety. The numbers above it are the product.
        }
      } catch (err) {
        send({
          type: "error",
          error: ((err as Error).message ?? "The scan failed.").split("\n")[0],
          detail:
            "This is a failure to read the chain, not a finding that the wallet has nothing " +
            "to claim.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-store, no-transform",
      "x-accel-buffering": "no",
    },
  });
}
