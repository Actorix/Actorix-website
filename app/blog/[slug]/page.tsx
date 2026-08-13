import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { POSTS, postBySlug, type Block } from "@/lib/blog";
import Reveal from "@/components/reveal";
import ScrollProgress from "@/components/scroll-progress";
import AssistantOrb from "@/components/assistant-orb";
import JsonLd from "@/components/json-ld";
import ScaleIn from "@/components/scale-in";
import { BorderBeam } from "@/components/ui/border-beam";
import { SITE, breadcrumbSchema } from "@/lib/seo";
import Toc, { type TocItem } from "@/components/toc";

/* stable, readable anchor ids — used by both the headings and the TOC */
const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  const url = `${SITE.url}/blog/${post.slug}`;
  return {
    title: { absolute: post.metaTitle },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.metaTitle,
      description: post.description,
      publishedTime: post.published,
      authors: [SITE.founder],
      images: [post.cover],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.description,
      images: [post.cover],
    },
  };
}

function articleSchema(post: NonNullable<ReturnType<typeof postBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.published,
    author: {
      "@type": "Person",
      name: SITE.founder,
      url: "https://www.linkedin.com/in/ajinkya842004/",
    },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    image: `${SITE.url}${post.cover}`,
    inLanguage: "en-IN",
    keywords: post.tags.join(", "),
  };
}

function renderBlock(b: Block, i: number) {
  switch (b.t) {
    case "h2":
      return (
        <h2
          key={i}
          id={slugify(b.text)}
          /* scroll-mt clears the sticky header when jumping from the TOC */
          className="mt-14 scroll-mt-24 font-display text-2xl font-medium tracking-tight md:text-[32px]"
        >
          {b.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="mt-9 font-display text-lg font-medium md:text-xl">
          {b.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mt-5 text-[16.5px] leading-[1.75] text-ink-soft">
          {b.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mt-5 flex flex-col gap-3.5">
          {b.items.map((item) => (
            <li key={item} className="flex items-baseline gap-3">
              <span className="btn-gradient mt-[9px] inline-block h-1.5 w-1.5 flex-none rounded-full" />
              <span className="text-[16.5px] leading-[1.75] text-ink-soft">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-10 border-l-2 border-red pl-6 font-display text-xl leading-relaxed font-medium tracking-tight text-ink md:text-2xl"
        >
          {b.text}
        </blockquote>
      );
    case "table":
      return (
        <div key={i} className="mt-7 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-line">
                {b.head.map((h) => (
                  <th key={h} className="py-3 pr-4 font-medium text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row) => (
                <tr key={row[0]} className="border-b border-line/70">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`py-3.5 pr-4 ${ci === 0 ? "text-ink" : "text-ink-soft"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cta":
      return (
        <div
          key={i}
          className="relative mt-12 overflow-hidden rounded-2xl border border-line bg-[#FCFCFD] p-7"
        >
          {/* the one moving element in a long read — it marks the point where
              the article stops explaining and starts asking */}
          <BorderBeam duration={16} />
          <p className="text-[16px] leading-relaxed text-ink-soft">{b.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Book a free 20-min call
            </a>
            <Link
              href="/services/saas-mvp-development"
              className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink-faint"
            >
              How we build MVPs
            </Link>
          </div>
        </div>
      );
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const toc: TocItem[] = post.body
    .filter((b): b is { t: "h2"; text: string } => b.t === "h2")
    .map((b) => ({ id: slugify(b.text), text: b.text }));

  const date = new Date(post.published).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex-1">
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Blog", url: `${SITE.url}/blog` },
            { name: post.title, url: `${SITE.url}/blog/${post.slug}` },
          ]),
        ]}
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

      <article className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.10),transparent)]"
        />
        <div className="relative mx-auto max-w-3xl px-5 pt-12 pb-20 sm:px-6 lg:max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
            <Link href="/blog" className="transition-colors hover:text-ink">
              ← All writing
            </Link>
          </nav>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.16em] text-ink-faint uppercase">
            <time dateTime={post.published}>{date}</time>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
            <span>·</span>
            <span>{post.tags.join(" / ")}</span>
          </div>

          <h1 className="rise rise-1 mt-5 max-w-4xl font-display text-[34px] font-medium leading-[1.08] tracking-tight md:text-[52px]">
            {post.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">{post.intro}</p>

          <ScaleIn className="mt-10 block overflow-hidden rounded-[22px] border border-line">
            <Image
              src={post.cover}
              alt={post.coverAlt}
              width={1680}
              height={882}
              sizes="(min-width: 1024px) 820px, 100vw"
              priority
              className="h-auto w-full"
            />
          </ScaleIn>

          <div className="mt-8 flex items-center gap-3 border-y border-line py-4">
            <Image
              src="/logo-mark.png"
              alt=""
              width={32}
              height={27}
              className="h-7 w-auto"
            />
            <p className="text-sm text-ink-soft">
              By <span className="font-medium text-ink">{SITE.founder}</span>, founder of
              Actorix
            </p>
          </div>

          {/* article + sticky TOC. The article keeps its readable measure;
              the TOC only appears on lg and up, where there is room for it. */}
          <div className="mt-2 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
            <div className="lg:max-w-[65ch]">{post.body.map(renderBlock)}</div>
            <aside className="hidden lg:block">
              <Toc items={toc} />
            </aside>
          </div>

          {others.length > 0 && (
            <div className="mt-16 border-t border-line pt-8">
              <h2 className="font-display text-lg font-medium">More writing</h2>
              <div className="mt-4 flex flex-col gap-3">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/blog/${o.slug}`}
                    className="group rounded-2xl border border-line p-5 transition-all hover:-translate-y-0.5 hover:border-red-vivid/25"
                  >
                    <p className="font-display text-[17px] font-medium">{o.title}</p>
                    <p className="mt-1.5 text-sm text-ink-soft">{o.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

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
