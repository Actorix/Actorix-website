import { MODEL, systemPrompt, isInjection, INJECTION_REPLY } from "@/lib/assistant";

/* Server-side proxy to Groq.

   SECURITY: GROQ_API_KEY is read here, on the server, and never sent to the
   browser. The client only ever talks to this route — it cannot see the key.
   Never move this call into a client component, and never prefix the key with
   NEXT_PUBLIC_ (that would publish it in the JS bundle). */

export const runtime = "edge";

type Msg = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_CHARS = 1200;

/* Crude per-IP rate limit. In-memory, so it resets on redeploy and is per
   instance — enough to stop casual abuse of the key without adding a database.
   Move to Upstash/KV if the site ever gets real traffic. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // bound memory
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return Response.json(
      { error: "Assistant is not configured." },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many messages — give me a moment, or just email hello@actorix.in." },
      { status: 429 }
    );
  }

  let messages: Msg[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  // sanitise: only the shapes we expect, bounded length, recent turns only
  const clean = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (clean.length === 0) {
    return Response.json({ error: "No message." }, { status: 400 });
  }

  // refuse obvious prompt-extraction attempts without calling the model
  const latest = clean[clean.length - 1];
  if (latest.role === "user" && isInjection(latest.content)) {
    return new Response(INJECTION_REPLY, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: systemPrompt() }, ...clean],
        temperature: 0.55,
        max_tokens: 500,
        stream: true,
      }),
    });
  } catch {
    return Response.json(
      { error: "Could not reach the assistant." },
      { status: 502 }
    );
  }

  if (!upstream.ok || !upstream.body) {
    return Response.json(
      { error: "The assistant is unavailable right now." },
      { status: 502 }
    );
  }

  /* Re-stream Groq's SSE as plain text chunks — simpler for the client than
     parsing SSE in the browser, and it keeps the response streaming so the
     first words appear immediately. */
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const json = JSON.parse(payload);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              /* partial JSON across chunks — the next read completes it */
            }
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode("\n\nSorry — I lost that connection. Email hello@actorix.in and Ajinkya will reply within 24 hours.")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
