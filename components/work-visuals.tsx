"use client";

import { motion } from "framer-motion";

/* Quant Lab has no static hero image (its UI is fully rendered), so this is a
   faithful recreation of the live product's backtest screen — same dark navy /
   indigo palette, same metric row, same rising equity curve. Labels only; the
   numbers shown are the platform's own public demo figures. */

const CURVE =
  "M0,118 L34,104 L62,112 L96,86 L124,95 L158,74 L190,80 L220,58 L252,63 L286,40 L318,46 L352,22 L380,30 L410,8";

export function QuantLabShot() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#0A0A14_0%,#0E0D1F_55%,#141230_100%)] p-4">
      <div className="pointer-events-none absolute -top-16 -right-10 h-[220px] w-[260px] rounded-full bg-[radial-gradient(closest-side,rgba(99,91,255,0.28),transparent_72%)]" />

      {/* window chrome */}
      <div className="relative flex items-center gap-1.5">
        <span className="h-[7px] w-[7px] rounded-full bg-[#3A3A48]" />
        <span className="h-[7px] w-[7px] rounded-full bg-[#3A3A48]" />
        <span className="h-[7px] w-[7px] rounded-full bg-[#3A3A48]" />
        <span className="ml-2.5 text-[10px] tracking-[0.16em] text-[#6C6C80] uppercase">
          QuantLab · Backtest
        </span>
        <span className="ml-auto rounded-md bg-[#635BFF]/20 px-2 py-0.5 text-[9.5px] font-medium tracking-[0.08em] text-[#A9A3FF]">
          +42.7%
        </span>
      </div>

      {/* metric row */}
      <div className="relative mt-3.5 grid grid-cols-4 gap-2">
        {[
          ["Total return", "+42.7%", "#6EE7A8"],
          ["Sharpe", "1.86", "#FFFFFF"],
          ["Max drawdown", "−11.2%", "#F5A3A3"],
          ["Win rate", "58.3%", "#FFFFFF"],
        ].map(([label, value, color]) => (
          <div
            key={label}
            className="rounded-lg border border-white/[.07] bg-white/[.04] px-2.5 py-2"
          >
            <div className="text-[8px] tracking-[0.1em] text-white/40 uppercase">
              {label}
            </div>
            <div
              className="mt-1 font-display text-[13px] font-medium"
              style={{ color: color as string }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* equity curve */}
      <div className="relative mt-3 flex-1 rounded-lg border border-white/[.07] bg-white/[.03] p-3">
        <div className="flex items-center gap-3 text-[8.5px] tracking-[0.1em] text-white/40 uppercase">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-[2px] w-3 rounded-full bg-[#635BFF]" />
            Strategy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-[2px] w-3 rounded-full bg-white/25" />
            Buy &amp; hold
          </span>
        </div>
        <svg viewBox="0 0 410 130" className="mt-1.5 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ql-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#635BFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#635BFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ql-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#635BFF" />
              <stop offset="100%" stopColor="#A9A3FF" />
            </linearGradient>
          </defs>
          {/* baseline buy & hold */}
          <path
            d="M0,124 L410,74"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <path d={`${CURVE} L410,130 L0,130 Z`} fill="url(#ql-fill)" />
          <motion.path
            d={CURVE}
            stroke="url(#ql-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <circle cx="410" cy="8" r="3.5" fill="#A9A3FF" />
        </svg>
      </div>
    </div>
  );
}
