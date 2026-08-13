import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";
import { toSlug } from "@/lib/verify";

/* Lookup form, for someone who has the number on paper but not the link.

   Indexable, unlike the result pages: "actorix verify invoice" is a plausible
   thing to search, and a real page beats a dead end. */

export const metadata: Metadata = {
  title: { absolute: "Verify an Actorix document" },
  description:
    "Check that an invoice or letter is genuinely from Actorix. Enter the document number printed on it to confirm its date and status.",
  alternates: { canonical: "/verify" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE.url}/verify`,
    title: "Verify an Actorix document",
    description:
      "Check that an invoice or letter is genuinely from Actorix using the number printed on it.",
    images: ["/opengraph-image.png"],
  },
};

async function verify(formData: FormData) {
  "use server";
  const raw = String(formData.get("number") ?? "").trim();
  if (!raw) return;
  // people type either form — the slug and the printed number both work
  redirect(`/verify/${toSlug(raw.replace(/\s+/g, ""))}`);
}

export default function VerifyIndex() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt="Actorix — AI automation and custom software studio, Mumbai"
              width={36}
              height={30}
              priority
              className="h-[28px] w-auto"
            />
            <span className="font-display text-[17px] font-medium tracking-[0.08em] sm:text-[19px]">
              Actorix
            </span>
          </Link>
          <span className="text-xs font-medium tracking-[0.22em] text-ink-faint">
            VERIFICATION
          </span>
        </div>
      </header>

      <main className="relative flex flex-1 items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-[10%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.10),transparent)]"
        />

        <div className="relative mx-auto w-full max-w-2xl px-5 py-20 sm:px-6 md:py-28">
          <p className="text-xs font-medium tracking-[0.24em] text-ink-faint">
            DOCUMENT CHECK
          </p>
          <h1 className="mt-5 font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            Verify an <span className="text-gradient-red">Actorix document</span>.
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-soft">
            Every invoice and letter we issue carries a number in its footer.
            Enter it here to confirm the document is genuinely ours.
          </p>

          <form action={verify} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <input
              name="number"
              required
              placeholder="ACT/2026-27/001"
              aria-label="Document number"
              autoComplete="off"
              spellCheck={false}
              className="flex-1 rounded-full border border-line bg-white px-5 py-3.5 text-[15px] outline-none transition-colors focus:border-ink/30"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-3.5 text-[14px] font-medium text-white transition-all hover:-translate-y-0.5"
            >
              Verify
            </button>
          </form>

          <p className="mt-4 text-[13.5px] leading-relaxed text-ink-faint">
            Invoices look like ACT/2026-27/001, letters like ACT-LH/2026-27/001.
          </p>

          <div className="mt-12 rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-[17px] font-medium">
              What this page will and won&apos;t tell you
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
              It confirms the document number, its date, its type and whether an
              invoice has been settled. It never shows amounts, line items or who
              the document was addressed to — those belong to the client it was
              issued to, and this page is public.
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
              If something doesn&apos;t match, email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-ink underline underline-offset-4"
              >
                {SITE.email}
              </a>{" "}
              before paying anything.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-2xl flex-col justify-between gap-3 px-5 py-8 text-sm text-ink-faint sm:flex-row sm:px-6">
          <p>© 2026 Actorix — Mumbai, India</p>
          <Link href="/" className="transition-colors hover:text-ink">
            actorix.in
          </Link>
        </div>
      </footer>
    </div>
  );
}
