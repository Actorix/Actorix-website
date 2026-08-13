import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "@/lib/blog";
import Reveal from "@/components/reveal";
import ScrollProgress from "@/components/scroll-progress";
import AssistantOrb from "@/components/assistant-orb";
import JsonLd from "@/components/json-ld";
import { SITE, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Writing on software, AI and pricing — Actorix" },
  description:
    "Honest, specific writing from Actorix on what software actually costs, how AI automation works in practice, and how to scope a build that ships.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE.url}/blog`,
    title: "Writing — Actorix",
    description:
      "Honest, specific writing on what software costs, how AI automation works, and how to scope a build that ships.",
    images: ["/opengraph-image.png"],
  },
};

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.published.localeCompare(a.published));

  return (
    <div className="flex-1">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
        ])}
      />
      <ScrollProgress />

      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5 sm:px-6">
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
          <Link
            href="/#contact"
            className="rounded-full bg-ink px-4 py-2.5 text-[13px] font-medium text-white transition-all hover:-translate-y-0.5 sm:px-5 sm:text-sm"
          >
            Start a project
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-[8%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.11),transparent)]"
        />
        <div className="relative mx-auto max-w-3xl px-5 pt-14 pb-16 sm:px-6">
          <p className="text-[11px] font-medium tracking-[0.16em] text-ink-faint uppercase sm:tracking-[0.28em]">
            Writing
          </p>
          <h1 className="rise rise-1 mt-5 font-display text-[34px] font-medium leading-[1.08] tracking-tight md:text-[52px]">
            Specific answers to expensive questions.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            What software actually costs, how automation works in practice, and how to
            scope a build that ships. No listicles.
          </p>

          <div className="mt-12 flex flex-col gap-4">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block rounded-[22px] border border-line bg-white p-7 shadow-[0_1px_2px_rgba(11,11,15,0.04),0_26px_50px_-34px_rgba(11,11,15,0.22)] transition-all hover:-translate-y-1 hover:border-red-vivid/25"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.14em] text-ink-faint uppercase">
                    <time dateTime={p.published}>
                      {new Date(p.published).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <span>·</span>
                    <span>{p.readingMinutes} min read</span>
                  </div>
                  <h2 className="mt-3 font-display text-[22px] font-medium leading-snug md:text-[26px]">
                    {p.title}
                  </h2>
                  <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-soft">
                    {p.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-red">
                    Read it
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-3xl flex-col justify-between gap-4 px-5 py-10 text-sm text-ink-faint sm:px-6 md:flex-row">
          <p>© 2026 Actorix — Mumbai, India</p>
          <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-ink">
            {SITE.email}
          </a>
        </div>
      </footer>

      <AssistantOrb />
    </div>
  );
}
