"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/seo";

/* Contact form for the dark band — posts to Formspree.
   Rendered only when NEXT_PUBLIC_FORMSPREE_ID is set (see page.tsx),
   so the site never ships a dead form. */

const NEEDS = [
  "AI automation / chatbot",
  "Custom software / web app",
  "SaaS MVP",
  "Website",
  "Something else",
];

const BUDGETS = [
  "Under ₹50k / $600",
  "₹50k–2L / $600–2.4k",
  "₹2L–5L / $2.4k–6k",
  "₹5L+ / $6k+",
  "Not sure yet",
];

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 [&>option]:text-ink";

export default function ContactForm({ formId }: { formId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // The estimator widget pre-fills the message with the visitor's selections.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (messageRef.current && detail) messageRef.current.value = detail;
    };
    window.addEventListener("actorix:prefill", onPrefill);
    return () => window.removeEventListener("actorix:prefill", onPrefill);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-10 max-w-lg rounded-2xl border border-white/15 bg-white/5 p-6">
        <p className="font-display text-lg font-medium text-white">
          Got it — we&apos;ll reply within 24 hours.
        </p>
        <p className="mt-2 text-sm text-white/60">
          Faster answer? WhatsApp us — the button is right above.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 grid max-w-xl gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required name="name" placeholder="Your name" className={inputCls} />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className={inputCls}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <select required name="need" defaultValue="" className={inputCls}>
          <option value="" disabled>
            What do you need?
          </option>
          {NEEDS.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
        <select required name="budget" defaultValue="" className={inputCls}>
          <option value="" disabled>
            Budget range
          </option>
          {BUDGETS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      <textarea
        required
        ref={messageRef}
        name="message"
        rows={4}
        placeholder="Tell us about the project…"
        className={inputCls}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-gradient cursor-pointer rounded-full px-7 py-3.5 font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-[#F5A3A3]">
          Something broke — email us directly at {SITE.email}
        </p>
      )}
    </form>
  );
}
