"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/* First-visit notice: the site is live but still being built out.
   Shows once per browser session (sessionStorage), never blocks the page. */

const KEY = "actorix:launch-notice-seen";

export default function LaunchNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(t);
  }, []);

  function close() {
    sessionStorage.setItem(KEY, "1");
    setOpen(false);
  }

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/35 backdrop-blur-[3px]"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="launch-notice-title"
            className="relative w-full max-w-[430px] overflow-hidden rounded-[26px] border border-line bg-white p-8 shadow-[0_30px_80px_-24px_rgba(11,11,15,0.45)]"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-16 h-[260px] w-[260px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.16),transparent)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-[240px] w-[240px] rounded-full bg-[radial-gradient(closest-side,rgba(49,46,129,0.12),transparent)]"
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={38}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[10.5px] font-medium tracking-[0.16em] text-ink-faint uppercase">
                  <motion.span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-red-vivid"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  Building in progress
                </span>
              </div>

              <h2
                id="launch-notice-title"
                className="mt-5 font-display text-2xl font-medium tracking-tight"
              >
                Welcome — we&apos;re still building.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                Actorix is live, but the site is still growing. Everything you see
                works — our services, real client work, case studies, and the project
                estimator. More is on the way.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                Have a project in mind? We&apos;re already taking them on.
              </p>

              <div className="mt-7 flex flex-col gap-2.5">
                <button
                  onClick={close}
                  className="btn-gradient cursor-pointer rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  Have a look around
                </button>
                <a
                  href="#contact"
                  onClick={close}
                  className="rounded-full border border-line px-6 py-3 text-center text-sm font-medium text-ink transition-colors hover:border-ink-faint"
                >
                  Start a project
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
