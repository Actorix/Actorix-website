import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_STUDIES, bySlug } from "@/lib/case-studies";
import Reveal from "@/components/reveal";
import TextAnimation from "@/components/ui/staggerText";
import ScrollProgress from "@/components/scroll-progress";
import AssistantOrb from "@/components/assistant-orb";
import LineHoverLink from "@/components/ui/line-hover-link";
import JsonLd from "@/components/json-ld";
import SpotlightCard from "@/components/spotlight-card";
import ScaleIn from "@/components/scale-in";
import { BorderBeam } from "@/components/ui/border-beam";
import { breadcrumbSchema, caseStudySchema, SITE } from "@/lib/seo";

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = bySlug(slug);
  if (!cs) return {};
  const url = `${SITE.url}/work/${cs.slug}`;
  return {
    title: `${cs.title} — ${cs.category} case study`,
    description: cs.summary,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${cs.title} — ${cs.category}`,
      description: cs.summary,
      images: [cs.image ?? "/opengraph-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} — ${cs.category}`,
      description: cs.summary,
      images: [cs.image ?? "/opengraph-image.png"],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = bySlug(slug);
  if (!cs) notFound();

  const others = CASE_STUDIES.filter((c) => c.slug !== cs.slug).slice(0, 3);

  return (
    <div className="flex-1">
      <JsonLd
        data={[
          caseStudySchema(cs),
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Work", url: `${SITE.url}/#work` },
            { name: cs.title, url: `${SITE.url}/work/${cs.slug}` },
          ]),
        ]}
      />
      <ScrollProgress />

      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt="Actorix — AI automation and custom software studio, Mumbai"
              width={36}
              height={30}
              priority
              className="h-[30px] w-auto"
            />
            <span className="font-display text-[19px] font-medium tracking-[0.08em]">
              Actorix
            </span>
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5"
          >
            Start a project
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-[6%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.13),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-[-8%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(closest-side,rgba(49,46,129,0.10),transparent)]"
        />
        <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-14">
          <Link
            href="/#work"
            className="text-sm text-ink-faint transition-colors hover:text-ink"
          >
            ← All work
          </Link>
          <p className="mt-8 text-xs font-medium tracking-[0.28em] text-ink-faint uppercase">
            {cs.category} · {cs.year}
          </p>
          <h1 className="rise rise-1 mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.06] tracking-tight md:text-6xl">
            {cs.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {cs.summary}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <span className="text-ink-faint">
              Client · <span className="text-ink">{cs.client}</span>
            </span>
            {cs.liveUrl && (
              <LineHoverLink
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="double"
                className="font-medium text-ink"
              >
                Visit live site ↗
              </LineHoverLink>
            )}
            {cs.repoUrl && (
              <LineHoverLink
                href={cs.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="slide"
                className="text-ink-soft"
              >
                Source ↗
              </LineHoverLink>
            )}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {cs.image && (
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[26px] border border-line bg-[#0B0B0F]">
              <Image
                src={cs.image}
                alt={`${cs.title} — ${cs.category}`}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* Problem */}
      <section className="border-t border-line bg-[#FCFCFD] py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight md:sticky md:top-28 md:text-4xl">
              <TextAnimation>The problem</TextAnimation>
            </h2>
          </Reveal>
          <div className="space-y-5">
            {cs.problem.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-[16.5px] leading-[1.7] text-ink-soft">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight md:sticky md:top-28 md:text-4xl">
              <TextAnimation>What we built</TextAnimation>
            </h2>
          </Reveal>
          <div className="space-y-5">
            {cs.solution.map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex items-baseline gap-3.5">
                  <span className="btn-gradient inline-block h-1.5 w-1.5 flex-none translate-y-[-3px] rounded-full" />
                  <p className="text-[16.5px] leading-[1.7] text-ink-soft">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-line bg-[#FCFCFD] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>Inside the build</TextAnimation>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {cs.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <SpotlightCard className="h-full rounded-2xl border border-line bg-white p-7">
                  <div className="h-0.5 w-[26px] rounded-sm bg-[linear-gradient(90deg,#B91C1C,#EF4444)]" />
                  <h3 className="mt-4 font-display text-[19px] font-medium">{f.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{f.line}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stack + outcome */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>The result</TextAnimation>
            </h2>
          </Reveal>
          <div className="mt-10 space-y-5">
            {cs.outcome.map((o, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex items-baseline gap-3.5">
                  <span className="text-gradient-red font-display text-sm font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16.5px] leading-[1.7] text-ink-soft">{o}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12 border-t border-line pt-8">
              <p className="text-xs font-medium tracking-[0.24em] text-ink-faint uppercase">
                Built with
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cs.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1.5 text-[12px] font-medium text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <ScaleIn>
          <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(140deg,#0B0B0F_0%,#100F1D_52%,#15142F_100%)] px-10 py-16 text-white md:px-14">
            <BorderBeam size={340} duration={12} borderWidth={2} />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 right-[-8%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.28),transparent)]"
            />
            <div className="relative">
              <h2 className="max-w-lg font-display text-3xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>Want something like this?</TextAnimation>
            </h2>
              <p className="mt-4 max-w-md leading-relaxed text-white/70">
                Tell us what your business needs. We reply within 24 hours with a
                clear next step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  href="/#contact"
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
                >
                  Start a project
                </Link>
                <Link
                  href="/#estimate"
                  className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/50"
                >
                  Get an instant estimate
                </Link>
              </div>
            </div>
          </div>
        </ScaleIn>
      </section>

      {/* More work */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="font-display text-xl font-medium tracking-tight">
              <TextAnimation>More work</TextAnimation>
            </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/work/${o.slug}`}
              className="group rounded-2xl border border-line p-5 transition-all hover:-translate-y-1 hover:border-red-vivid/25"
            >
              <p className="font-display text-[17px] font-medium">{o.title}</p>
              <p className="mt-1.5 text-[12px] tracking-[0.1em] text-ink-faint uppercase">
                {o.category}
              </p>
              <span className="mt-4 inline-block text-sm text-ink-faint transition-colors group-hover:text-red">
                Read case study →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-4 px-6 py-10 text-sm text-ink-faint md:flex-row">
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
