"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { ASSISTANT, looksLikeIntent } from "@/lib/assistant";

/* Ari — the Actorix assistant.
   The logo mark itself is the launcher: click the orb and it becomes the chat.
   Talks only to /api/assistant (our server), never to Groq directly, so the
   API key stays server-side. */

const WHATSAPP_URL =
  "https://wa.me/919004933771?text=Hi%20Actorix%2C%20I%20want%20to%20discuss%20a%20project";
const CAL_URL = "https://cal.com/actorix-9b0leh";

type Msg = { role: "user" | "assistant"; content: string };

export default function AssistantOrb() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // keep the latest message in view as tokens stream in
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    // don't steal focus on touch — it yanks the keyboard open
    if (window.matchMedia("(pointer: fine)").matches) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    setInput("");
    setShowActions(false);
    const next: Msg[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const { error } = await res.json().catch(() => ({ error: null }));
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              error ??
              "I'm having trouble right now. Email hello@actorix.in — Ajinkya replies within 24 hours.",
          },
        ]);
        setShowActions(true);
        return;
      }

      // append an empty assistant turn, then fill it as tokens arrive
      setMessages([...next, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }

      if (looksLikeIntent(question)) setShowActions(true);
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              "Something went wrong on my end. You can reach Ajinkya directly at hello@actorix.in.",
          },
        ]);
        setShowActions(true);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* backdrop — mobile only, so the sheet reads as a layer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px] sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        <AnimatePresence>
          {open && (
            <motion.div
              role="dialog"
              aria-label="Actorix assistant"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.27, 1] }}
              className="flex h-[min(70vh,560px)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_-24px_rgba(11,11,15,0.45)] sm:w-[380px]"
            >
              {/* header */}
              <div className="relative flex items-center gap-3 border-b border-line px-5 py-4">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-10 h-[180px] w-[180px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.14),transparent)]"
                />
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={34}
                  height={28}
                  className="relative h-7 w-auto"
                />
                <div className="relative flex-1">
                  <p className="font-display text-[15px] font-medium leading-none">
                    {ASSISTANT.name}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-faint">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                    {ASSISTANT.role}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="relative grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-faint transition-colors hover:bg-line/60 hover:text-ink"
                >
                  ✕
                </button>
              </div>

              {/* transcript */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4">
                {messages.length === 0 ? (
                  <div>
                    <p className="text-[15px] leading-relaxed text-ink-soft">
                      {ASSISTANT.greeting}
                    </p>
                    <div className="mt-4 flex flex-col gap-2">
                      {ASSISTANT.starters.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="cursor-pointer rounded-xl border border-line px-3.5 py-2.5 text-left text-[13.5px] text-ink transition-all hover:-translate-y-0.5 hover:border-red-vivid/40"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3.5">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={
                          m.role === "user"
                            ? "btn-gradient max-w-[85%] self-end rounded-2xl rounded-br-md px-3.5 py-2.5 text-[14px] leading-relaxed text-white"
                            : "max-w-[90%] self-start rounded-2xl rounded-bl-md bg-[#F5F5F7] px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap text-ink"
                        }
                      >
                        {m.content ||
                          (busy && i === messages.length - 1 ? (
                            <span className="flex gap-1 py-1">
                              {[0, 1, 2].map((d) => (
                                <motion.span
                                  key={d}
                                  className="inline-block h-1.5 w-1.5 rounded-full bg-ink-faint"
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{
                                    duration: 1.1,
                                    repeat: Infinity,
                                    delay: d * 0.18,
                                  }}
                                />
                              ))}
                            </span>
                          ) : null)}
                      </div>
                    ))}

                    {showActions && !busy && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2 pt-1"
                      >
                        <a
                          href={CAL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gradient rounded-full px-3.5 py-2 text-[12.5px] font-medium text-white"
                        >
                          Book a free call
                        </a>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[12.5px] font-medium text-ink"
                        >
                          <FaWhatsapp className="text-[#25D366]" />
                          WhatsApp
                        </a>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* composer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-line px-3 py-3"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your project…"
                  maxLength={1000}
                  className="min-h-11 flex-1 rounded-full bg-[#F5F5F7] px-4 text-[14px] text-ink outline-none placeholder:text-ink-faint"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className="btn-gradient grid h-11 w-11 flex-none cursor-pointer place-items-center rounded-full text-white transition-opacity disabled:opacity-40"
                >
                  ↑
                </button>
              </form>

              <p className="border-t border-line px-5 py-2 text-center text-[10.5px] text-ink-faint">
                AI assistant — can make mistakes. For anything binding, book a call.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* the orb — the logo mark, alive */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label={open ? "Close Actorix assistant" : "Chat with Ari, the Actorix assistant"}
          className="relative grid h-14 w-14 cursor-pointer place-items-center rounded-full border border-line bg-white shadow-[0_12px_32px_-12px_rgba(11,11,15,0.35)]"
        >
          <span
            aria-hidden
            className="btn-gradient orb-glow absolute -inset-1 -z-10 rounded-full blur-lg"
          />
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                className="text-lg text-ink"
              >
                ✕
              </motion.span>
            ) : (
              <motion.span
                key="orb"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={34}
                  height={29}
                  className="h-[26px] w-auto"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
