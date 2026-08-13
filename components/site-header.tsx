"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LineHoverLink from "@/components/ui/line-hover-link";

/* Site header with a real mobile menu.
   Previously the nav links were `hidden md:flex` with no fallback, so phone
   visitors had no way to reach Services / Work / Process / Contact at all. */

const NAV = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["Process", "#process"],
  ["Contact", "#contact"],
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // close on Escape, and never leave the menu open if the viewport grows
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5 sm:px-6">
        <a href="#top" className="flex flex-none items-center gap-2.5">
          <Image
            src="/logo-mark.png"
            alt="Actorix — AI automation and custom software studio, Mumbai"
            width={36}
            height={30}
            priority
            className="h-[28px] w-auto sm:h-[30px]"
          />
          <span className="font-display text-[17px] font-medium tracking-[0.08em] sm:text-[19px]">
            Actorix
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {NAV.map(([label, href]) => (
            <LineHoverLink
              key={href}
              href={href}
              variant="slide"
              className="transition-colors hover:text-ink"
            >
              {label}
            </LineHoverLink>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-2">
          <a
            href="#contact"
            className="rounded-full bg-ink px-4 py-2.5 text-[13px] font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(11,11,15,0.55)] sm:px-5 sm:text-sm"
          >
            Start a project
          </a>

          {/* hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 flex-none cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink-faint md:hidden"
          >
            <span className="relative block h-3.5 w-4">
              <motion.span
                className="absolute left-0 block h-[1.5px] w-4 rounded-full bg-ink"
                animate={open ? { top: 6, rotate: 45 } : { top: 1, rotate: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="absolute left-0 block h-[1.5px] w-4 rounded-full bg-ink"
                animate={open ? { opacity: 0 } : { opacity: 1, top: 6 }}
                transition={{ duration: 0.2 }}
                style={{ top: 6 }}
              />
              <motion.span
                className="absolute left-0 block h-[1.5px] w-4 rounded-full bg-ink"
                animate={open ? { top: 6, rotate: -45 } : { top: 11, rotate: 0 }}
                transition={{ duration: 0.25 }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.27, 1] }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[48px] items-center justify-between border-b border-line/70 text-[15px] font-medium text-ink last:border-b-0"
                  >
                    {label}
                    <span className="text-ink-faint">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
