/* Case-study content — every fact here comes from the project repos or the
   live sites. No invented metrics, no fabricated client quotes. Outcome lines
   describe what the software DOES, not results we haven't measured.
   When Ajinkya supplies client-confirmed numbers/quotes, add them here. */

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  /** hero one-liner */
  summary: string;
  problem: string[];
  solution: string[];
  features: { title: string; line: string }[];
  stack: string[];
  outcome: string[];
  timeline: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "wasro",
    title: "Wasro",
    client: "Madhav Industries, Assam",
    category: "FMCG brand site + no-code CMS",
    year: "2026",
    liveUrl: "https://www.wasro.in",
    repoUrl: "https://github.com/Ajinkyaa2004/Wasro-Detergent-Brand",
    image: "/work/wasro-banner.jpg",
    summary:
      "A value-tier home-care brand needed a real digital presence — and an owner who could run it without ever calling a developer.",
    problem: [
      "Wasro manufactures detergent powders, dishwash bars and clothwash bars in Assam and sells through 121+ retail stores across Northeast India — but had no website customers or distributors could point to.",
      "Prices, offers and featured products change constantly in FMCG. Any site that required a developer for every update would be stale within a month.",
      "Bulk enquiries from shops, hostels, hotels and NGOs were arriving informally, with nothing capturing or routing them.",
    ],
    solution: [
      "A fully server-rendered Next.js 16 brand site with the entire catalogue — 14 SKUs across four categories, each with per-pack pricing and free-gift badges.",
      "A no-code admin CMS backed by Upstash Redis: eight editable sections (offers, pricing, hero copy, featured products, headlines, why-us, FAQs, reviews). Saves go live instantly through Redis and revalidation — no redeploy, no developer.",
      "A distributor locator covering 121+ stores, filterable by state, with one-tap call and WhatsApp on every entry.",
      "A validated bulk-order pipeline that emails enquiries straight to the brand inbox.",
    ],
    features: [
      {
        title: "No-code admin CMS",
        line: "Eight sections the owner edits directly; changes appear on the live site immediately.",
      },
      {
        title: "Store locator",
        line: "121+ distributors, filter by state, call or WhatsApp in one tap.",
      },
      {
        title: "Stain guide",
        line: "An Indian-household stain-removal guide, each entry marked up with HowTo structured data.",
      },
      {
        title: "Reviews as swipe cards",
        line: "Admin-managed testimonials in a draggable deck, feeding AggregateRating schema.",
      },
      {
        title: "SEO-complete",
        line: "JSON-LD for Organization, LocalBusiness, Product, FAQ and Breadcrumb, plus a dynamic sitemap with image entries.",
      },
      {
        title: "Hardened by default",
        line: "DPDP-compliant cookie consent and a full security-header set (CSP, HSTS, X-Frame-Options).",
      },
    ],
    stack: ["Next.js 16", "TypeScript", "React 19", "Tailwind 4", "Upstash Redis", "Nodemailer", "Vercel"],
    outcome: [
      "The brand owner updates prices, offers, hero copy and reviews himself — zero developer involvement, no deploy step.",
      "Every distributor is reachable from the site in one tap, turning the store list into a working sales channel.",
      "Bulk enquiries now arrive structured and validated in the brand inbox instead of scattered across chats.",
    ],
    timeline: "Designed, built and shipped as a complete brand platform.",
  },
  {
    slug: "cakerush",
    title: "CakeRush",
    client: "Cake Rush, Bandra West",
    category: "Commerce site + WhatsApp ordering",
    year: "2026",
    liveUrl: "https://www.cakerush.in",
    image: "/work/cakerush.jpg",
    summary:
      "A six-year-old home bakery in Bandra had a following on Instagram and nowhere to send it. We built the storefront — and made ordering a message, not a checkout.",
    problem: [
      "Cake Rush began in 2020 with a single red velvet cake iced on a kitchen counter on Carter Road. Six years later the orders were real and regular, but the entire business lived inside Instagram DMs.",
      "Customers had no way to browse the range or see prices without asking. Every enquiry started from zero — what flavours, what sizes, how much — and each one cost the owner a conversation before it became a sale.",
      "A conventional e-commerce checkout would have been the wrong tool. Every cake is made to order, most need a conversation about the occasion, and a 24-hour minimum makes an instant-buy button misleading.",
      "The brand also deserved better than a template. This is a bakery whose customers name the cake after the child it was made for — a generic shop layout would have flattened exactly what makes it worth paying for.",
    ],
    solution: [
      "An editorial storefront built around the brand rather than a product grid: the site reads as chapters — Story, La Carte, Lookbook, Correspondence, Reserve — closer to a magazine than a catalogue.",
      "The full menu published with real prices: 31 cakes across four sections (Signature, Seasonal, Smalls & gifting, Bespoke), each with per-size pricing and eggless noted as available on request.",
      "Ordering routed to WhatsApp, not a cart. Every cake has a Reserve action that opens a message with the cake already named, so the customer starts the conversation halfway through instead of at the beginning.",
      "A lookbook of past work, each photographed piece captioned with the occasion it was made for, so new customers see bespoke work rather than stock photography.",
      "Owner-managed imagery: hero, gallery and lookbook photos upload through an admin area, so a new bake can be on the site the day it leaves the kitchen.",
    ],
    features: [
      {
        title: "Order on WhatsApp",
        line: "Every cake and the site-wide CTA open a pre-filled WhatsApp message — the channel the bakery already runs on.",
      },
      {
        title: "Priced menu, 31 cakes",
        line: "Four sections with per-size pricing, so customers self-qualify before they message.",
      },
      {
        title: "Editorial art direction",
        line: "Chaptered layout, plate numbering and serif display type — built to match a brand that calls itself an atelier.",
      },
      {
        title: "Lookbook",
        line: "Past cakes as portraits, each captioned with its occasion, doubling as proof of bespoke work.",
      },
      {
        title: "Owner-updatable photos",
        line: "Hero, gallery and lookbook images are uploaded through an admin area — no developer in the loop.",
      },
      {
        title: "Built for the phone",
        line: "Nearly all traffic arrives from an Instagram bio link, so the mobile layout is the primary design, not an adaptation.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "WhatsApp deep links", "Vercel"],
    outcome: [
      "The Instagram bio now points somewhere that sells: visitors can browse the full range and prices before they ever message.",
      "Enquiries arrive with the cake already named, so the owner spends her time confirming details instead of listing flavours.",
      "New bakes go up the same day they are made — the site stays current without a developer.",
    ],
    timeline: "Designed and shipped as a complete brand storefront.",
  },
  {
    slug: "quant-lab",
    title: "Quant Lab",
    image: "/images/actorix-quant-lab-trading-analytics-platform.jpg",
    client: "Product build",
    category: "Algorithmic trading platform",
    year: "2026",
    liveUrl: "https://back-testing-engine.vercel.app",
    repoUrl: "https://github.com/Ajinkyaa2004/Quant-lab-BackTesting-Engine",
    summary:
      "A full-stack backtesting engine that lets traders test strategies on real market data — without writing code.",
    problem: [
      "Retail traders and analysts want to validate a strategy before risking capital, but serious backtesting tools assume you can program.",
      "The alternatives are spreadsheets that can't model real execution, or institutional platforms priced far out of reach.",
      "Results are meaningless without proper risk analytics — a strategy that looks profitable can hide unacceptable drawdown.",
    ],
    solution: [
      "A FastAPI backend running the backtest engine against historical and real-time market data, with a Next.js front end for configuration and analysis.",
      "Pre-built strategy templates configured visually, so a trader with no Python can define, run and iterate on a strategy.",
      "Multi-broker connectivity — Binance and Zerodha — so tests run against the data traders actually trade on.",
      "A risk analytics layer computing Sharpe ratio, drawdown, win rate and related measures for every run.",
      "JWT-authenticated accounts on PostgreSQL so strategies and results persist per user.",
    ],
    features: [
      {
        title: "No coding required",
        line: "Strategy templates configured through the UI, not a script file.",
      },
      {
        title: "Multi-broker data",
        line: "Binance and Zerodha integrations, extensible to more.",
      },
      {
        title: "Historical + real-time",
        line: "Test against past data or watch a strategy run on live feeds.",
      },
      {
        title: "Risk analytics",
        line: "Sharpe, drawdown, win rate and more computed per backtest.",
      },
      {
        title: "Secure accounts",
        line: "JWT auth over PostgreSQL — strategies and runs saved per user.",
      },
    ],
    stack: ["FastAPI", "Python 3.13", "Next.js 16", "TypeScript", "PostgreSQL", "JWT"],
    outcome: [
      "Non-programmers can build and test an algorithmic strategy end to end.",
      "Every run returns institutional-style risk metrics, not just a profit number.",
      "Built on a production architecture — the same engine scales from one user to many.",
    ],
    timeline: "Full-stack product build, front end and engine.",
  },
  {
    slug: "max-extrusions",
    title: "Max Extrusions",
    client: "Max Extrusions Pvt Ltd",
    category: "B2B manufacturing platform",
    year: "2026",
    liveUrl: "https://www.maxextrusions.com",
    repoUrl: "https://github.com/Ajinkyaa2004/Max-Extrusions",
    image: "/work/maxext.jpg",
    summary:
      "A plastic-products manufacturer needed digital credibility with architects, OEMs and industrial buyers — and a lead pipeline that didn't leak.",
    problem: [
      "Industrial buyers research online before they ever call. Without a credible site, a capable manufacturer loses to competitors who simply look more established.",
      "Product capability, infrastructure and client history existed on paper but nowhere a buyer could evaluate them.",
      "Enquiries had no structured path from the website into the sales process.",
    ],
    solution: [
      "A corporate platform built for B2B evaluation: product catalogue, client portfolio, and an infrastructure showcase that demonstrates manufacturing capability.",
      "A professional interface aimed at architects, OEMs, contractors and industrial buyers — industrial in tone, modern in execution.",
      "Formspree-backed contact forms wired into Google Sheets automation, so every enquiry lands in a structured, trackable place.",
      "Next.js App Router with SEO and Core Web Vitals treated as requirements, not afterthoughts.",
    ],
    features: [
      {
        title: "Product catalogue",
        line: "Full range presented for technical evaluation by industrial buyers.",
      },
      {
        title: "Infrastructure showcase",
        line: "Manufacturing capability shown, not just claimed.",
      },
      {
        title: "Automated lead capture",
        line: "Contact forms feed Google Sheets automatically — no manual re-entry.",
      },
      {
        title: "Performance-first",
        line: "Optimised loading, SEO and Core Web Vitals across the site.",
      },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Framer Motion", "Formspree", "Sheets automation"],
    outcome: [
      "A manufacturer that now presents online at the level its engineering deserves.",
      "Every website enquiry lands in a spreadsheet the sales side actually works from.",
      "Live on its own domain at maxextrusions.com.",
    ],
    timeline: "Production corporate platform, shipped and live.",
  },
  {
    slug: "godrej-reserve",
    title: "Godrej Reserve Platform",
    client: "Premium residential project, Kandivali East",
    category: "Real-estate lead generation",
    year: "2026",
    liveUrl: "https://godrejproperties.vercel.app/",
    repoUrl: "https://github.com/Ajinkyaa2004/Godrej-Properties",
    image: "/work/godrej.jpg",
    summary:
      "A luxury property platform built for one job: turn interest in 3 & 4 BHK apartments into qualified, instantly-notified leads.",
    problem: [
      "Premium real-estate buyers judge a development by its digital presentation — a slow or ordinary site undercuts a luxury proposition immediately.",
      "In property sales, response speed decides the deal. A lead that sits unseen for hours is usually lost.",
      "Without analytics, there's no way to know which pages and campaigns actually produce enquiries.",
    ],
    solution: [
      "A conversion-focused Next.js platform showcasing 3 & 4 BHK apartments, with a luxury visual language — gold gradients, glassmorphism, and considered motion.",
      "Automated lead workflows over Gmail SMTP OAuth2: an enquiry triggers instant notification to the sales side and confirmation to the buyer.",
      "MongoDB Atlas storing every lead, with content managed rather than hard-coded.",
      "Google Analytics 4 with custom event tracking, so conversion paths are measurable.",
      "Aggressive performance work — WebP/AVIF images, lazy loading, mobile-first interactions.",
    ],
    features: [
      {
        title: "Instant lead notification",
        line: "Automated email workflows the moment an enquiry is submitted.",
      },
      {
        title: "Luxury UI",
        line: "Gold gradients, glassmorphism and smooth motion matched to a premium development.",
      },
      {
        title: "GA4 conversion tracking",
        line: "Custom events showing which content produces enquiries.",
      },
      {
        title: "Mobile-first",
        line: "Optimised touch interactions — where most property browsing happens.",
      },
    ],
    stack: ["Next.js 14", "React 18", "MongoDB Atlas", "Tailwind", "Gmail SMTP OAuth2", "GA4", "Vercel"],
    outcome: [
      "Enquiries reach the sales side instantly instead of waiting in an inbox.",
      "Every lead is stored and every conversion path is measurable.",
      "A presentation that matches the price bracket of the property itself.",
    ],
    timeline: "Conversion-focused platform, built and deployed.",
  },
];

export const bySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
