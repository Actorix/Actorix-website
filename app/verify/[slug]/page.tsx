import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";
import { fromSlug, lookup, statusLabel } from "@/lib/verify";

/* Document verification result.

   noindex: these pages exist for one person holding one document. They have no
   search value, and document numbers should not accumulate in an index. They
   stay crawlable (follow) so the links back into the site still count. */

export const metadata: Metadata = {
  title: { absolute: "Verify a document — Actorix" },
  robots: { index: false, follow: true },
};

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const number = fromSlug(slug);
  if (!number) notFound();

  const doc = await lookup(number);

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3.5 sm:px-6">
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
          {doc ? (
            <>
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/12 text-[13px] text-emerald-600">
                  ✓
                </span>
                <p className="text-xs font-medium tracking-[0.24em] text-emerald-700">
                  GENUINE DOCUMENT
                </p>
              </div>

              <h1 className="mt-5 font-display text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
                {doc.type} <span className="text-gradient-red">{doc.number}</span>
              </h1>
              <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-ink-soft">
                This document was issued by Actorix and is recorded in our books.
              </p>

              <dl className="mt-9 divide-y divide-line rounded-2xl border border-line bg-white">
                {[
                  ["Document number", doc.number],
                  ["Type", doc.type],
                  ["Date of issue", doc.issueDate],
                  ["Status", statusLabel(doc.type, doc.status)],
                  ["Issued by", "Actorix — Mumbai, India"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <dt className="text-[12.5px] font-medium tracking-[0.1em] text-ink-faint uppercase">
                      {label}
                    </dt>
                    <dd className="text-[15px] text-ink sm:text-right">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-[13.5px] leading-relaxed text-ink-faint">
                For privacy, amounts and client details are never shown here — this
                page confirms only that the document is ours. If the copy you are
                holding shows a different date or number, it did not come from us:
                write to{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
                >
                  {SITE.email}
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-medium tracking-[0.24em] text-ink-faint">
                NOT FOUND
              </p>
              <h1 className="mt-5 font-display text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
                We can&apos;t confirm <span className="text-gradient-red">{number}</span>.
              </h1>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-soft">
                No document with this number appears in our records. That usually
                means the number was mistyped — check it against the printed copy,
                character for character.
              </p>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                If it matches and this page still can&apos;t find it, do not act on
                the document. Email{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ink underline underline-offset-4"
                >
                  {SITE.email}
                </a>{" "}
                and we will confirm directly.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/verify"
                  className="rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-white transition-all hover:-translate-y-0.5"
                >
                  Try another number
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-line px-5 py-3 text-[14px] font-medium transition-colors hover:border-ink/25"
                >
                  Go to actorix.in
                </Link>
              </div>
            </>
          )}
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
