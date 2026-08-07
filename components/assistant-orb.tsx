"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_URL =
  "https://wa.me/919004933771?text=Hi%20Actorix%2C%20I%20want%20to%20discuss%20a%20project";

/* The Actorix assistant orb — the logo mark, alive in the corner.
   Honest v1: opens a panel that routes to email while the real
   AI assistant is being built. */
export default function AssistantOrb() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.27, 1] }}
            className="w-[320px] rounded-2xl border border-line bg-white p-5 shadow-[0_24px_60px_-24px_rgba(11,11,15,0.35)]"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo-mark.png"
                alt=""
                width={30}
                height={25}
                className="h-[25px] w-auto"
              />
              <div>
                <p className="font-display text-[15px] font-medium">Actorix Assistant</p>
                <p className="text-[11px] tracking-[0.14em] text-ink-faint uppercase">
                  Coming soon
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              We&apos;re training an AI assistant on everything Actorix builds. Until
              it&apos;s live, reach us directly — we reply within 24 hours.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                <FaWhatsapp className="text-base" />
                Chat on WhatsApp
              </a>
              <a
                href="mailto:hello@actorix.in"
                className="btn-gradient rounded-full px-5 py-2.5 text-center text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                hello@actorix.in
              </a>
              <a
                href="https://cal.com/actorix-9b0leh"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-5 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:border-ink-faint"
              >
                Book a free 20-min call
              </a>
              <a
                href="#services"
                onClick={() => setOpen(false)}
                className="rounded-full border border-line px-5 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:border-ink-faint"
              >
                See what we build
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? "Close Actorix assistant" : "Open Actorix assistant"}
        className="relative grid h-14 w-14 cursor-pointer place-items-center rounded-full border border-line bg-white shadow-[0_12px_32px_-12px_rgba(11,11,15,0.35)]"
      >
        <span
          aria-hidden
          className="btn-gradient orb-glow absolute -inset-1 -z-10 rounded-full blur-lg"
        />
        <Image
          src="/logo-mark.png"
          alt=""
          width={34}
          height={29}
          className="h-[26px] w-auto"
        />
      </motion.button>
    </div>
  );
}
