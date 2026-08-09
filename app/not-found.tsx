import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

/* Branded 404. Next renders this for any unmatched route, so it is often a
   visitor's first page — treat it as a route back into the site rather than a
   dead end: every link below leads somewhere that can win the project. */

export const metadata: Metadata = {
  title: { absolute: "Page not found — Actorix" },
  robots: { index: false, follow: true },
};

const DESTINATIONS = [
  { href: "/#services", label: "Services", hint: "AI automation, custom software, SaaS" },
  { href: "/#work", label: "Work", hint: "Products we've shipped for clients" },
  { href: "/blog", label: "Writing", hint: "What software actually costs" },
  { href: "/#contact", label: "Contact", hint: "Start a project — we reply in 24h" },
];

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt="Actorix"
              width={36}
              height={30}
              priority
              className="h-[28px] w-auto"
            />
            <span className="font-display text-[17px] font-medium tracking-[0.08em] sm:text-[19px]">
              Actorix
            </span>
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-ink px-4 py-2.5 text-[13px] font-medium text-white transition-all hover:-translate-y-0.5 sm:px-5 sm:text-sm"
          >
            Start a project
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-[6%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.14),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 right-[-8%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(49,46,129,0.10),transparent)]"
        />

        <div className="relative mx-auto w-full max-w-3xl px-5 py-24 sm:px-6 md:py-32">
          <p className="text-xs font-medium tracking-[0.28em] text-ink-faint">
            ERROR 404
          </p>
          <h1 className="mt-5 font-display text-4xl font-medium leading-[1.06] tracking-tight md:text-6xl">
            <span className="text-gradient-red">This page</span> doesn&apos;t exist.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            The link may be old, or we may have moved something. Everything worth
            seeing is one click away.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {DESTINATIONS.map(({ href, label, hint }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-vivid/25 hover:shadow-[0_18px_40px_-28px_rgba(11,11,15,0.35)]"
              >
                <span className="flex items-center justify-between font-display text-[17px] font-medium">
                  {label}
                  <span className="text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-red">
                    →
                  </span>
                </span>
                <span className="mt-1.5 block text-[13.5px] leading-snug text-ink-soft">
                  {hint}
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-sm text-ink-faint">
            Looking for something specific?{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
            >
              {SITE.email}
            </a>
          </p>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-3xl flex-col justify-between gap-4 px-5 py-10 text-sm text-ink-faint sm:px-6 md:flex-row">
          <p>© 2026 Actorix — Mumbai, India</p>
          <Link href="/" className="transition-colors hover:text-ink">
            Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
