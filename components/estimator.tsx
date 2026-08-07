"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { BANDS, SCOPE_HINT, type Band } from "@/lib/pricing";

/* Project estimator — interactive lead-capture widget.
   Ranges live in lib/pricing.ts (set from 2026 market research). Every range
   is explicitly indicative; the exact number comes from the free call. */

const NEEDS: Band[] = [
  BANDS.automation,
  BANDS.chatbot,
  BANDS.software,
  BANDS.website,
  BANDS.saas,
];

const SIZES = [
  { key: "simple", label: "Simple", hint: "One workflow or a few pages" },
  { key: "standard", label: "Standard", hint: "Several features or integrations" },
  { key: "complex", label: "Complex", hint: "Multi-user, dashboards, AI inside" },
] as const;

const TIMINGS = ["ASAP", "2–4 weeks", "1–2 months", "Flexible"] as const;

const WHATSAPP_BASE = "https://wa.me/919004933771?text=";

const stepVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

function Chip({
  active,
  onClick,
  children,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`cursor-pointer rounded-2xl border px-5 py-3.5 text-left transition-all duration-200 ${
        active
          ? "border-red-vivid/60 bg-red-vivid/[0.06] shadow-[0_8px_24px_-12px_rgba(220,38,38,0.35)]"
          : "border-line bg-white hover:-translate-y-0.5 hover:border-ink-faint/60"
      }`}
    >
      <span className={`block text-[15px] font-medium ${active ? "text-red-deep" : "text-ink"}`}>
        {children}
      </span>
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </motion.button>
  );
}

export default function Estimator() {
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<Band | null>(null);
  const [size, setSize] = useState<(typeof SIZES)[number] | null>(null);
  const [timing, setTiming] = useState<string | null>(null);

  const summary =
    need && size && timing
      ? `${need.label} · ${size.label.toLowerCase()} scope · needed ${timing.toLowerCase()}`
      : "";

  const whatsappHref =
    WHATSAPP_BASE +
    encodeURIComponent(`Hi Actorix — I used the estimator: ${summary}. What would this cost?`);

  function prefillContactForm() {
    window.dispatchEvent(
      new CustomEvent("actorix:prefill", {
        detail: `Estimator selections — ${summary}. Please send me an exact quote.`,
      })
    );
  }

  return (
    <div className="rounded-[26px] border border-line bg-white p-8 shadow-[0_1px_2px_rgba(11,11,15,0.04),0_30px_60px_-38px_rgba(11,11,15,0.28)] md:p-10">
      {/* progress dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            animate={{
              width: i === step ? 22 : 7,
              backgroundColor: i <= step ? "#DC2626" : "#ECECF0",
            }}
            className="h-[7px] rounded-full"
          />
        ))}
        <span className="ml-3 text-xs tracking-[0.18em] text-ink-faint uppercase">
          {step < 3 ? `Step ${step + 1} of 3` : "Your estimate"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="s0"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="mt-7"
          >
            <h3 className="font-display text-xl font-medium md:text-2xl">
              What are you building?
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {NEEDS.map((n) => (
                <Chip
                  key={n.key}
                  active={need?.key === n.key}
                  onClick={() => {
                    setNeed(n);
                    setStep(1);
                  }}
                >
                  {n.label}
                </Chip>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="s1"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="mt-7"
          >
            <h3 className="font-display text-xl font-medium md:text-2xl">How big is it?</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {SIZES.map((s) => (
                <Chip
                  key={s.key}
                  active={size?.key === s.key}
                  hint={s.hint}
                  onClick={() => {
                    setSize(s);
                    setStep(2);
                  }}
                >
                  {s.label}
                </Chip>
              ))}
            </div>
            <button
              onClick={() => setStep(0)}
              className="mt-5 cursor-pointer text-sm text-ink-faint transition-colors hover:text-ink"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="s2"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="mt-7"
          >
            <h3 className="font-display text-xl font-medium md:text-2xl">
              When do you need it?
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {TIMINGS.map((t) => (
                <Chip
                  key={t}
                  active={timing === t}
                  onClick={() => {
                    setTiming(t);
                    setStep(3);
                  }}
                >
                  {t}
                </Chip>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-5 cursor-pointer text-sm text-ink-faint transition-colors hover:text-ink"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {step === 3 && need && size && timing && (
          <motion.div
            key="s3"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="mt-7"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-ink-faint uppercase">
              {summary}
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1"
            >
              <span className="text-gradient-red font-display text-3xl font-medium tracking-tight md:text-4xl">
                {need.inr}
              </span>
              <span className="text-lg text-ink-faint">/ {need.usd}</span>
            </motion.div>
            <p className="mt-2 text-[13.5px] text-ink-faint">
              Approximate range · {size.label.toLowerCase()} scope sits{" "}
              {SCOPE_HINT[size.key]} · {need.timeline}
            </p>

            <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
              {need.note}
            </p>

            <div className="mt-5 flex max-w-[54ch] gap-3 rounded-2xl border border-line bg-[#FCFCFD] p-4">
              <span className="btn-gradient mt-[7px] inline-block h-1.5 w-1.5 flex-none rounded-full" />
              <p className="text-[14px] leading-relaxed text-ink-soft">
                <span className="font-medium text-ink">
                  This is an approximation, not a quote.
                </span>{" "}
                Real pricing depends on the exact features, integrations and scale you
                need — it can land below or above this range. The honest way to find
                out is a free 20-minute call, after which you get a fixed price in
                writing.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <a
                href="https://cal.com/actorix-9b0leh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Book a free call for the exact price →
              </a>
              <a
                href="#contact"
                onClick={prefillContactForm}
                className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink-faint"
              >
                Send project details
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink-faint"
              >
                <FaWhatsapp className="text-base text-[#25D366]" />
                WhatsApp us this
              </a>
              <button
                onClick={() => {
                  setStep(0);
                  setNeed(null);
                  setSize(null);
                  setTiming(null);
                }}
                className="cursor-pointer text-sm text-ink-faint transition-colors hover:text-ink"
              >
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
