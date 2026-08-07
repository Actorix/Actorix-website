"use client";

import { motion } from "framer-motion";

/* Fills the sixth work tile with movement: a drifting commit-graph grid,
   an orbiting glow, and a live-looking activity ticker. */

const CELLS = 7 * 12; // rows x cols

// deterministic pseudo-random so server and client markup match
function level(i: number) {
  const n = (Math.sin(i * 12.9898) * 43758.5453) % 1;
  const v = Math.abs(n);
  if (v > 0.86) return 3;
  if (v > 0.66) return 2;
  if (v > 0.4) return 1;
  return 0;
}

const LEVEL_BG = [
  "rgba(255,255,255,0.05)",
  "rgba(239,68,68,0.28)",
  "rgba(239,68,68,0.55)",
  "rgba(239,68,68,0.85)",
];

export default function GithubCard() {
  return (
    <a
      href="https://github.com/Actorix"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] border border-line bg-[linear-gradient(155deg,#0B0B0F_0%,#12111F_58%,#15142F_100%)] p-8 text-white transition-all duration-300 hover:-translate-y-1"
    >
      {/* orbiting glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-[-12%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.32),transparent)]"
        animate={{ x: [0, -26, 0], y: [0, 20, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[-10%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(closest-side,rgba(49,46,129,0.5),transparent)]"
        animate={{ x: [0, 22, 0], y: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative">
        <h3 className="font-display text-[22px] font-medium">
          More on GitHub{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </h3>
        <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-white/65">
          Open-source work, experiments, and everything we build in public.
        </p>
      </div>

      {/* commit graph — one motion wrapper, CSS-staggered cells.
          (88 individual motion elements meant 88 viewport observers; this is
          the same effect for a fraction of the cost.) */}
      <motion.div
        className="relative my-7"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="grid grid-flow-col grid-rows-7 gap-[5px]">
          {Array.from({ length: CELLS }).map((_, i) => (
            <span
              key={i}
              className="gh-cell h-[9px] w-[9px] rounded-[2px]"
              style={{
                background: LEVEL_BG[level(i)],
                animationDelay: `${(i % 12) * 0.03 + Math.floor(i / 12) * 0.015}s`,
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="relative flex items-center justify-between">
        <span className="text-[11.5px] font-medium tracking-[0.14em] text-glint uppercase">
          github.com/Actorix
        </span>
        <span className="flex items-center gap-2 text-[11px] text-white/45">
          <motion.span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#6EE7A8]"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          Building in public
        </span>
      </div>
    </a>
  );
}
