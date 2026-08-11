import Image from "next/image";
import TextAnimation from "@/components/ui/staggerText";
import FlipFadeText from "@/components/ui/flip-fade-text";
import LogoSlider from "@/components/ui/logo-slider";
import LightLines from "@/components/ui/light-lines";
import FaqAccordion from "@/components/ui/faq-accordion";
import LineHoverLink from "@/components/ui/line-hover-link";
import Reveal from "@/components/reveal";
import ScrollProgress from "@/components/scroll-progress";
import HeroAurora from "@/components/hero-aurora";
import HeroSparkles from "@/components/hero-sparkles";
import SpotlightCard from "@/components/spotlight-card";
import ContactForm from "@/components/contact-form";
import HeroParallax from "@/components/hero-parallax";
import VelocityTilt from "@/components/velocity-tilt";
import ScaleIn from "@/components/scale-in";
import StatsStrip from "@/components/stats-strip";
import AssistantOrb from "@/components/assistant-orb";
import ContactSocials from "@/components/contact-socials";
import Link from "next/link";
import Estimator from "@/components/estimator";
import FounderCard from "@/components/founder-card";
import { QuantLabShot } from "@/components/work-visuals";
import GithubCard from "@/components/github-card";
import Testimonials from "@/components/testimonials";
import WorkStack from "@/components/work-stack";
import ProcessTimeline from "@/components/process-timeline";
import LaunchNotice from "@/components/launch-notice";
import SiteHeader from "@/components/site-header";
import { FaWhatsapp } from "react-icons/fa";
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { faqSchema, SITE, DEFAULT_DESCRIPTION, WHATSAPP_INTRO } from "@/lib/seo";

const WHATSAPP_URL = WHATSAPP_INTRO;

const CAL_URL = "https://cal.com/actorix-9b0leh";

/* Form renders only once the Formspree ID exists — no dead forms shipped. */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const techs = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Claude API",
  "OpenAI",
];

const services = [
  {
    slug: "ai-automation",
    number: "01",
    title: "AI Automation & Chatbots",
    tagline: "Cut manual work with AI that handles it for you.",
    items: [
      "Workflow & process automation",
      "AI support and sales chatbots",
      "Document and data processing",
      "API integrations",
    ],
  },
  {
    slug: "custom-software-development",
    number: "02",
    title: "Custom Software & Web Apps",
    tagline: "Software shaped exactly to how your business runs.",
    items: [
      "Internal tools and dashboards",
      "CRMs and business systems",
      "Premium websites and web apps",
      "Integrations that talk to everything you use",
    ],
  },
  {
    slug: "saas-mvp-development",
    number: "03",
    title: "SaaS & MVP Development",
    tagline: "From idea to launched product, fast.",
    items: [
      "Product scoping and strategy",
      "MVP builds measured in weeks",
      "Full SaaS engineering",
      "UI/UX design",
    ],
  },
];

const reasons = [
  {
    title: "Senior attention, every time.",
    line: "The engineer who scopes your system is the one who builds it. Nothing gets passed down.",
  },
  {
    title: "AI-accelerated delivery.",
    line: "We use AI inside our own workflow, so you get product-company velocity at studio scale.",
  },
  {
    title: "Fixed scope, weekly demos.",
    line: "You know the price before we start, and you see the software every week while we build it.",
  },
  {
    title: "We stay after launch.",
    line: "Monitoring, iteration, and support continue long after the final invoice clears.",
  },
];

const work: {
  caseSlug?: string;
  title: string;
  category: string;
  line: string;
  stack: string[];
  href: string;
  image?: string;
  Shot?: React.ComponentType;
}[] = [
  {
    caseSlug: "wasro",
    title: "Wasro",
    category: "Brand site + no-code CMS · wasro.in",
    line: "Brand website for an FMCG manufacturer with a Redis-backed admin CMS — the owner updates prices, offers, and reviews live, with zero developer involvement.",
    stack: ["Next.js", "TypeScript", "Upstash Redis"],
    href: "https://www.wasro.in",
    image: "/work/wasro-banner.jpg",
  },
  {
    caseSlug: "quant-lab",
    title: "Quant Lab",
    category: "Trading platform",
    line: "Full-stack backtesting engine where traders test strategies on real market data — visual strategy templates, multi-broker connect, Sharpe and drawdown analytics.",
    stack: ["FastAPI", "Next.js", "PostgreSQL"],
    href: "https://back-testing-engine.vercel.app",
    Shot: QuantLabShot,
  },
  {
    caseSlug: "cakerush",
    title: "CakeRush",
    category: "Commerce · cakerush.in",
    line: "An editorial storefront for a Bandra cake atelier — 31 cakes with real prices, and every order routed to WhatsApp instead of a checkout.",
    stack: ["Next.js", "WhatsApp ordering", "Editorial design"],
    href: "https://www.cakerush.in",
    image: "/work/cakerush.jpg",
  },
  {
    caseSlug: "godrej-reserve",
    title: "Godrej Reserve Platform",
    category: "Real-estate lead generation",
    line: "Conversion-focused platform for a premium Kandivali development — automated lead workflows, email notifications, and analytics behind a luxury UI.",
    stack: ["Next.js", "MongoDB", "GA4"],
    href: "https://godrejproperties.vercel.app/",
    image: "/work/godrej.jpg",
  },
  {
    caseSlug: "max-extrusions",
    title: "Max Extrusions",
    category: "B2B manufacturing · maxextrusions.com",
    line: "Corporate site for a plastic-extrusions manufacturer — product catalogue, enquiry pipeline, and lead capture automated into Google Sheets.",
    stack: ["Next.js", "Tailwind", "Sheets automation"],
    href: "https://www.maxextrusions.com",
    image: "/work/maxext.jpg",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    line: "A free 20-minute call. We understand the problem before proposing anything.",
  },
  {
    number: "02",
    title: "Scope",
    line: "A fixed proposal with timeline and price.",
  },
  {
    number: "03",
    title: "Build",
    line: "Weekly demos, direct communication, no black box.",
  },
  {
    number: "04",
    title: "Launch & support",
    line: "We deploy, monitor, and keep improving it with you.",
  },
];

const faqs = [
  {
    question: "How do we start?",
    answer:
      "A free 20-minute call. You describe the problem; we tell you honestly whether we are the right build partner and what a solution would actually look like.",
  },
  {
    question: "What does a project cost?",
    answer:
      "Automations start around ₹25,000, premium websites around ₹45,000, custom software from ₹1,50,000, and SaaS MVPs from ₹2,50,000. Use the estimator above for the range on your project. Everything is quoted as fixed scope, agreed in writing before work begins — no hourly billing.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Automations go live in 3–10 days, chatbots and premium websites in 1–2 weeks, custom software in 3–6 weeks, and SaaS MVPs in 4–8 weeks. Either way you see working software every week, not a status report.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. We are based in Mumbai and work with teams across the US, UK, Europe, and the Gulf. Calls are scheduled in your timezone.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We deploy, monitor, and stay on for iteration and support. You own the code and the infrastructure — nothing is handed over as a black box.",
  },
  {
    question: "What's your stack?",
    answer:
      "Next.js, TypeScript, React and Node on the front; Python and PostgreSQL behind it; Claude and OpenAI models where real intelligence is required.",
  },
];

export const metadata: Metadata = {
  title: "Actorix — AI Automation & Custom Software Company in India",
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
};

const navLinks = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["Process", "#process"],
  ["Contact", "#contact"],
] as const;

export default function Home() {
  return (
    <div className="flex-1">
      <JsonLd data={faqSchema(faqs)} />
      <LaunchNotice />
      <ScrollProgress />

      <SiteHeader />

      {/* ── Hero ────────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden">
        <HeroAurora />
        <HeroSparkles />
        <HeroParallax>
          <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-24 sm:px-6 md:pt-40 md:pb-36">
            <p className="rise rise-1 shimmer text-[11px] font-medium tracking-[0.16em] sm:text-xs sm:tracking-[0.28em]">
              AI · AUTOMATION · CUSTOM SOFTWARE
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.04] tracking-tight md:text-7xl">
              <span className="block">
                <TextAnimation className="text-gradient-red" delay={0.05}>
                  Intelligent
                </TextAnimation>{" "}
                <FlipFadeText
                  words={["software", "automation", "chatbots", "products"]}
                  interval={2600}
                  className="inline-flex min-h-0 justify-start align-baseline"
                  textClassName="gap-0 text-5xl font-medium normal-case tracking-tight text-ink md:text-7xl dark:text-ink"
                />
              </span>
              <span className="block">
                <TextAnimation delay={0.12}>for modern businesses.</TextAnimation>
              </span>
            </h1>
            <p className="rise rise-3 mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
              Actorix designs and builds custom software, AI automation, and SaaS
              products for companies that want to operate faster and smarter.
            </p>
            <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="btn-gradient rounded-full px-7 py-3.5 font-medium text-white shadow-[0_8px_24px_rgba(220,38,38,0.28)] transition-transform hover:-translate-y-0.5"
              >
                Start a project
              </a>
              <LineHoverLink
                href="#work"
                variant="double"
                className="py-3.5 font-medium text-ink"
              >
                See what we build →
              </LineHoverLink>
            </div>
            <p className="rise rise-4 mt-12 text-sm text-ink-faint">
              {SITE.email} · Mumbai, India · Working worldwide
            </p>
          </div>
        </HeroParallax>
      </section>

      {/* ── Tech marquee ────────────────────────────────── */}
      <section aria-label="Technologies we build with" className="border-y border-line/70 py-5">
        <VelocityTilt>
          <LogoSlider
            speed={32}
            logos={techs.map((t) => (
              <span
                key={t}
                className="flex items-center text-xs font-semibold tracking-[0.25em] text-ink-faint"
              >
                {t.toUpperCase()}
                <span className="btn-gradient mx-8 inline-block h-1 w-1 rounded-full" />
              </span>
            ))}
          />
          <LogoSlider
            speed={40}
            direction="right"
            className="mt-3 opacity-50"
            logos={[
              "Zerodha & Binance APIs",
              "Upstash Redis",
              "MongoDB",
              "Framer Motion",
              "Tailwind CSS",
              "FastAPI",
              "Vercel",
              "WhatsApp Business",
            ].map((t) => (
              <span
                key={t}
                className="flex items-center text-[11px] font-medium tracking-[0.22em] text-ink-faint"
              >
                {t.toUpperCase()}
                <span className="mx-7 inline-block h-1 w-1 rounded-full bg-ink-faint/50" />
              </span>
            ))}
          />
        </VelocityTilt>
      </section>

      {/* ── Services ────────────────────────────────────── */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <p className="shimmer text-[11px] font-medium tracking-[0.16em] sm:text-xs sm:tracking-[0.28em]">WHAT WE DO</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight md:text-5xl">
            <TextAnimation>Three ways we move your business.</TextAnimation>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.number} delay={i * 0.07}>
              <SpotlightCard className="group h-full rounded-3xl border border-line bg-white p-8 shadow-[0_1px_2px_rgba(11,11,15,0.04),0_26px_50px_-34px_rgba(11,11,15,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-red-vivid/25 hover:shadow-[0_1px_2px_rgba(11,11,15,0.04),0_34px_60px_-32px_rgba(11,11,15,0.26)]">
              <span className="text-gradient-red inline-block origin-left font-display text-3xl font-medium tracking-tight transition-transform duration-300 group-hover:scale-110">
                {s.number}
              </span>
              <h3 className="mt-5 font-display text-[22px] font-medium">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{s.tagline}</p>
              <div className="my-6 h-px bg-line" />
              <ul className="space-y-3 text-sm text-ink-soft">
                {s.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-2.5">
                    <span className="bg-red inline-block h-1 w-1 flex-none translate-y-[-3px] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${s.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-red"
              >
                Learn more
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Automation, concretely ──────────────────────── */}
      <section aria-label="Automation examples" className="border-y border-line bg-[#FCFCFD] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.16em] sm:text-xs sm:tracking-[0.28em] text-ink-faint">
              CONCRETELY
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight md:text-4xl">
              <TextAnimation>What automation actually looks like.</TextAnimation>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {[
              "Invoice PDFs land in email → data entered into your sheet, automatically.",
              "WhatsApp enquiries → instant reply, logged, and assigned to a person.",
              "New order → customer updates sent at every stage, hands-free.",
              "Support questions → AI answers from your docs; humans get only the hard ones.",
              "Daily sales summary → in your inbox at 9 am, every day.",
              "Website leads → scored, added to your CRM, follow-up drafted.",
            ].map((line, i) => (
              <Reveal key={line} delay={i * 0.04}>
                <div className="flex items-baseline gap-3 text-[15px] leading-relaxed text-ink-soft">
                  <span className="btn-gradient inline-block h-1.5 w-1.5 flex-none translate-y-[-2px] rounded-full" />
                  {line}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Estimator ───────────────────────────────────── */}
      <section id="estimate" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.16em] sm:text-xs sm:tracking-[0.28em] text-ink-faint">
            INSTANT ESTIMATE
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight md:text-5xl">
            <TextAnimation>What would yours take?</TextAnimation>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            Three taps, honest answer — typical timeline now, fixed quote after a free
            20-minute call.
          </p>
        </Reveal>
        <div className="mt-10">
          <Estimator />
        </div>
      </section>

      {/* ── Why Actorix ─────────────────────────────────── */}
      <section className="border-y border-line bg-[#FCFCFD] py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[72px]">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight md:sticky md:top-28 md:text-[46px]">
              <TextAnimation>Built like a product company, not an agency.</TextAnimation>
            </h2>
          </Reveal>
          <div className="grid gap-x-11 gap-y-10 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <div className="h-0.5 w-[26px] rounded-sm bg-[linear-gradient(90deg,#B91C1C,#EF4444)]" />
                <h3 className="mt-4 font-display text-[19px] font-medium">{r.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{r.line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────── */}
      <section aria-label="Track record" className="mx-auto max-w-6xl px-6 py-20">
        <StatsStrip />
        <Reveal delay={0.1}>
          <div className="mt-16 border-t border-line pt-10">
            <p className="text-[11px] font-medium tracking-[0.16em] sm:text-xs sm:tracking-[0.28em] text-ink-faint">
              TRUSTED BY
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-5">
              {[
                { name: "Wasro", sub: "Madhav Industries", href: "https://www.wasro.in" },
                { name: "Max Extrusions", sub: "Pvt Ltd", href: "https://www.maxextrusions.com" },
                { name: "CakeRush", sub: "Bakery", href: "https://www.cakerush.in" },
                { name: "Godrej Reserve", sub: "Kandivali East", href: "https://godrejproperties.vercel.app/" },
              ].map((c) => (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grayscale transition-all duration-300 hover:grayscale-0"
                >
                  <span className="block font-display text-xl font-medium text-ink-soft transition-colors group-hover:text-ink">
                    {c.name}
                  </span>
                  <span className="mt-0.5 block text-[11px] tracking-[0.12em] text-ink-faint uppercase">
                    {c.sub}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Selected work ───────────────────────────────── */}
      <section id="work" className="mx-auto max-w-6xl px-6 pb-24 md:pb-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
            <TextAnimation>Selected work.</TextAnimation>
          </h2>
          <p className="pb-2 text-[12.5px] text-ink-faint">
            Shipped client work — live, in production, in use.
          </p>
        </Reveal>
        <WorkStack items={work} />

        {/* GitHub tile sits after the stack, in normal flow */}
        <div className="mt-8">
          <Reveal>
            <GithubCard />
          </Reveal>
        </div>
      </section>

      <Testimonials />

      {/* ── Process ─────────────────────────────────────── */}
      <section id="process" className="border-y border-line bg-[#FCFCFD] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
              <TextAnimation>How we work.</TextAnimation>
            </h2>
          </Reveal>
          <ProcessTimeline steps={steps} />
        </div>
      </section>

      {/* ── About ───────────────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[72px] md:py-28">
        <Reveal>
          <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight md:text-[46px]">
            <TextAnimation>A studio, deliberately small.</TextAnimation>
          </h2>
          <div className="mt-10">
            <FounderCard />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-[60ch] text-lg leading-[1.68] text-ink-soft">
            Actorix was founded by{" "}
            <span className="font-medium text-ink">Ajinkya Dhumal</span>, a full-stack
            engineer who has been building AI products since 2022, including platforms
            serving more than 1,000 daily users. The studio stays small on purpose — no
            account managers, no handoffs, no layers between you and the person writing
            the code. Every project gets senior attention, from the first call to long
            after launch.
          </p>
          <p className="mt-6 text-[14.5px] text-ink-faint">
            Product thinking, in public:{" "}
            <LineHoverLink
              href="https://github.com/Ajinkyaa2004/Case-Study"
              target="_blank"
              rel="noopener noreferrer"
              variant="slide"
              className="text-ink-soft"
            >
              a 30-day product-strategy case study series →
            </LineHoverLink>
            {"  ·  "}
            <LineHoverLink
              href="https://www.linkedin.com/in/ajinkya842004/"
              target="_blank"
              rel="noopener noreferrer"
              variant="slide"
              className="text-ink-soft"
            >
              connect with Ajinkya on LinkedIn →
            </LineHoverLink>
          </p>
        </Reveal>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-28 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[72px]">
        <Reveal>
          <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight md:text-[46px]">
            <TextAnimation>Questions, answered.</TextAnimation>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <FaqAccordion items={faqs} />
        </Reveal>
      </section>

      {/* ── Contact band ────────────────────────────────── */}
      <section id="contact" className="mx-auto max-w-6xl px-6 pb-24">
        <ScaleIn>
          <div className="relative overflow-hidden rounded-[32px] text-white">
            <LightLines
              gradientFrom="#0b0b0f"
              gradientTo="#15142f"
              lineColor="#9d9db0"
              lightColor="#c7d2fe"
              linesOpacity={0.05}
              lightsOpacity={0.4}
              speedMultiplier={0.6}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-[-10%] z-[5] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.25),transparent)]"
            />
            <div className="relative z-10 px-10 py-16 md:px-16 md:py-24">
              <h2 className="max-w-xl font-display text-3xl font-medium tracking-tight md:text-5xl">
                <TextAnimation>Have something to build?</TextAnimation>
              </h2>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/70">
                Tell us what your business needs — a first version, an automation, a
                rebuild. We reply within 24 hours with a clear next step.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-block rounded-full bg-white px-7 py-3.5 font-medium text-ink transition-transform hover:-translate-y-0.5"
                >
                  {SITE.email}
                </a>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient inline-block rounded-full px-7 py-3.5 font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  Book a free 20-min call
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-7 py-3.5 font-medium text-white transition-all hover:-translate-y-0.5 hover:border-white/50"
                >
                  <FaWhatsapp className="text-lg text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </div>
              {FORMSPREE_ID && <ContactForm formId={FORMSPREE_ID} />}
              <div className="mt-10">
                <ContactSocials />
              </div>
            </div>
          </div>
        </ScaleIn>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 py-10 text-sm text-ink-faint md:flex-row">
          <p>© 2026 Actorix — Mumbai, India</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <LineHoverLink
              href="/blog"
              variant="slide"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              Writing
            </LineHoverLink>
            <LineHoverLink
              href={`mailto:${SITE.email}`}
              variant="slide"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              {SITE.email}
            </LineHoverLink>
            <LineHoverLink
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="slide"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              WhatsApp
            </LineHoverLink>
            <LineHoverLink
              href="https://www.linkedin.com/company/actorix/"
              target="_blank"
              rel="noopener noreferrer"
              variant="slide"
              className="text-ink-soft"
            >
              LinkedIn
            </LineHoverLink>
            <LineHoverLink
              href="https://www.instagram.com/actorix.in/"
              target="_blank"
              rel="noopener noreferrer"
              variant="slide"
              className="text-ink-soft"
            >
              Instagram
            </LineHoverLink>
            <LineHoverLink
              href="https://github.com/Actorix"
              target="_blank"
              rel="noopener noreferrer"
              variant="slide"
              className="text-ink-soft"
            >
              GitHub
            </LineHoverLink>
          </div>
        </div>
      </footer>

      <AssistantOrb />
    </div>
  );
}
