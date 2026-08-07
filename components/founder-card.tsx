"use client";

import { motion } from "framer-motion";

/* Founder presence without a photo — an aurora-lit monogram card.
   Premium studios do this often; it reads intentional rather than
   "no photo available". Swap in a real portrait later by replacing
   the monogram block with an <Image>. */
export default function FounderCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.2, 0.75, 0.2, 1] }}
      className="relative overflow-hidden rounded-[26px] border border-line bg-white p-8 shadow-[0_1px_2px_rgba(11,11,15,0.04),0_26px_50px_-34px_rgba(11,11,15,0.22)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-16 h-[280px] w-[280px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.14),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-12 h-[240px] w-[240px] rounded-full bg-[radial-gradient(closest-side,rgba(49,46,129,0.10),transparent)]"
      />

      <div className="relative flex items-center gap-5">
        <div className="relative grid h-[86px] w-[86px] flex-none place-items-center rounded-2xl bg-[linear-gradient(140deg,#0B0B0F_0%,#12111F_55%,#15142F_100%)]">
          <span
            aria-hidden
            className="orb-glow absolute -inset-1 -z-10 rounded-2xl bg-[linear-gradient(120deg,#B91C1C,#EF4444)] blur-md"
          />
          <span className="text-gradient-red font-display text-3xl font-medium tracking-tight">
            AD
          </span>
        </div>
        <div>
          <p className="font-display text-xl font-medium">Ajinkya Dhumal</p>
          <p className="mt-1 text-[13px] tracking-[0.14em] text-ink-faint uppercase">
            Founder · Full-stack engineer
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
            Builds every Actorix project personally. Mumbai, working worldwide.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
