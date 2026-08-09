import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, serviceBySlug } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
import { BANDS } from "@/lib/pricing";
import Reveal from "@/components/reveal";
import TextAnimation from "@/components/ui/staggerText";
import ScrollProgress from "@/components/scroll-progress";
import AssistantOrb from "@/components/assistant-orb";
import JsonLd from "@/components/json-ld";
import { SITE, breadcrumbSchema, faqSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  const url = `${SITE.url}/services/${s.slug}`;
  return {
    // absolute title — these pages lead with the search term, not the brand
    title: { absolute: s.metaTitle },
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      type: "website",
      url,
      title: s.metaTitle,
      description: s.metaDescription,
      images: ["/opengraph-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: s.metaTitle,
      description: s.metaDescription,
    },
  };
}

function serviceSchema(s: NonNullable<ReturnType<typeof serviceBySlug>>) {
  const band = BANDS[s.priceKey];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/services/${s.slug}#service`,
    name: s.metaTitle.split(" — ")[0],
    description: s.metaDescription,
    serviceType: s.eyebrow,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    url: `${SITE.url}/services/${s.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        description: `${band.inr} — ${band.timeline}`,
      },
      availability: "https://schema.org/InStock",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.eyebrow,
      itemListElement: s.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d.title, description: d.line },
      })),
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const band = BANDS[s.priceKey];
  const proof = CASE_STUDIES.filter((c) => s.proof.includes(c.slug));
  const related = SERVICES.filter((r) => s.related.includes(r.slug));

  return (
    <div className="flex-1">
      <JsonLd
        data={[
          serviceSchema(s),
          faqSchema(s.faqs),
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Services", url: `${SITE.url}/#services` },
            { name: s.metaTitle.split(" — ")[0], url: `${SITE.url}/services/${s.slug}` },
          ]),
        ]}
      />
      <ScrollProgress />

      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt="Actorix"
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
        <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-14">
          {/* visible breadcrumb — matches the BreadcrumbList schema */}
          <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#services" className="transition-colors hover:text-ink">
              Services
            </Link>
          </nav>

          <p className="mt-8 text-xs font-medium tracking-[0.28em] text-ink-faint">
            {s.eyebrow}
          </p>
          <h1 className="rise rise-1 mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.06] tracking-tight md:text-6xl">
            {s.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{s.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="btn-gradient rounded-full px-7 py-3.5 font-medium text-white shadow-[0_8px_24px_rgba(220,38,38,0.28)] transition-transform hover:-translate-y-0.5"
            >
              Start a project
            </Link>
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-7 py-3.5 font-medium text-ink transition-colors hover:border-ink-faint"
            >
              Book a free 20-min call
            </a>
          </div>

          <p className="mt-8 text-sm text-ink-faint">
            Typically <span className="font-medium text-ink">{band.inr}</span> ({band.usd}) ·{" "}
            {band.timeline} · fixed price agreed before work starts
          </p>
        </div>
      </section>

      {/* Problems */}
      <section className="border-t border-line bg-[#FCFCFD] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="max-w-2xl font-display text-2xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>Sound familiar?</TextAnimation>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {s.problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="h-0.5 w-[26px] rounded-sm bg-[linear-gradient(90deg,#B91C1C,#EF4444)]" />
                <h3 className="mt-4 font-display text-[19px] font-medium">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>What we build</TextAnimation>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {s.deliverables.map((d, i) => (
              <Reveal
                key={d.title}
                delay={i * 0.05}
                className="rounded-2xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(11,11,15,0.04),0_26px_50px_-34px_rgba(11,11,15,0.22)]"
              >
                <h3 className="font-display text-[19px] font-medium">{d.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{d.line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Concrete examples */}
      <section className="border-y border-line bg-[#FCFCFD] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.28em] text-ink-faint">CONCRETELY</p>
            <h2 className="mt-4 font-display text-2xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>What this looks like in practice</TextAnimation>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {s.examples.map((e, i) => (
              <Reveal key={e} delay={i * 0.04}>
                <div className="flex items-baseline gap-3 text-[15px] leading-relaxed text-ink-soft">
                  <span className="btn-gradient inline-block h-1.5 w-1.5 flex-none translate-y-[-2px] rounded-full" />
                  {e}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>How we work</TextAnimation>
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-7 sm:grid-cols-2 md:grid-cols-4">
            {s.process.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <li className="list-none">
                  <div className="flex items-center gap-3">
                    <span className="text-gradient-red font-display text-[13px] font-medium tracking-[0.06em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">{p}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Proof */}
      {proof.length > 0 && (
        <section className="border-y border-line bg-[#FCFCFD] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <h2 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>We&apos;ve shipped this</TextAnimation>
            </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {proof.map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.06}>
                  <Link
                    href={`/work/${c.slug}`}
                    className="group block rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-red-vivid/25"
                  >
                    <p className="font-display text-[19px] font-medium">{c.title}</p>
                    <p className="mt-1.5 text-[11.5px] tracking-[0.12em] text-ink-faint uppercase">
                      {c.category}
                    </p>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                      {c.summary}
                    </p>
                    <span className="mt-4 inline-block text-sm text-ink-faint transition-colors group-hover:text-red">
                      Read the case study →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>Questions, answered</TextAnimation>
            </h2>
          </Reveal>
          <div className="mt-10 border-t border-line">
            {s.faqs.map((f, i) => (
              <Reveal key={f.question} delay={i * 0.04}>
                {/* plain markup, not an accordion: the answer text is in the
                    HTML for crawlers and for FAQ rich results */}
                <div className="border-b border-line py-7">
                  <h3 className="font-display text-lg font-medium tracking-[-0.015em]">
                    {f.question}
                  </h3>
                  <p className="mt-3 max-w-[70ch] text-[15.5px] leading-[1.66] text-ink-soft">
                    {f.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(140deg,#0B0B0F_0%,#100F1D_52%,#15142F_100%)] px-10 py-16 text-white md:px-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 right-[-8%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.28),transparent)]"
            />
            <div className="relative">
              <h2 className="max-w-lg font-display text-3xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>Tell us what you need built</TextAnimation>
            </h2>
              <p className="mt-4 max-w-md leading-relaxed text-white/70">
                A free 20-minute call, then a fixed proposal in writing. We reply within
                24 hours.
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  href="/#contact"
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
                >
                  Start a project
                </Link>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/50"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Related services — internal linking for crawl depth */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="font-display text-xl font-medium tracking-tight">
              <TextAnimation>Other services</TextAnimation>
            </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/services/${r.slug}`}
              className="group rounded-2xl border border-line p-5 transition-all hover:-translate-y-1 hover:border-red-vivid/25"
            >
              <p className="text-[11.5px] tracking-[0.12em] text-ink-faint uppercase">
                {r.eyebrow}
              </p>
              <p className="mt-2 font-display text-[17px] font-medium">
                {r.metaTitle.split(" — ")[0]}
              </p>
              <span className="mt-3 inline-block text-sm text-ink-faint transition-colors group-hover:text-red">
                Learn more →
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
