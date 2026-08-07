/* Service landing pages — the SEO engine of the site.
   A single-page site can only rank for one keyword cluster. Each of these
   targets its own cluster with genuinely useful, unique copy (no spun filler),
   its own FAQ, and links into the case studies that prove it. */

import { BANDS } from "./pricing";

export type Service = {
  slug: string;
  /** <title> — leads with the keyword people actually search */
  metaTitle: string;
  metaDescription: string;
  /** on-page H1 */
  h1: string;
  eyebrow: string;
  intro: string;
  /** the searcher's problem, in their words */
  problems: { title: string; line: string }[];
  /** what we actually deliver */
  deliverables: { title: string; line: string }[];
  /** concrete, imaginable examples — this is what converts SMB buyers */
  examples: string[];
  process: string[];
  priceKey: keyof typeof BANDS;
  faqs: { question: string; answer: string }[];
  /** case-study slugs that prove this service */
  proof: string[];
  related: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "ai-automation",
    metaTitle: "AI Automation Company in India — Actorix",
    metaDescription:
      "Actorix builds AI automation for Indian and global businesses — invoice processing, WhatsApp enquiry handling, AI chatbots and workflow automation. Live in 3–10 days, fixed price.",
    h1: "AI automation that does the work you keep doing by hand",
    eyebrow: "AI AUTOMATION & CHATBOTS",
    intro:
      "Most businesses lose hours every week to work a computer should be doing — copying invoice data into spreadsheets, answering the same enquiry for the hundredth time, chasing updates between apps that don't talk to each other. We build the automation that removes it, then stay on to keep it running.",
    problems: [
      {
        title: "Data gets retyped between systems",
        line: "Invoices, orders and forms arrive as PDFs and emails, then somebody keys them into a sheet or accounting tool. Every retype is a chance for an error.",
      },
      {
        title: "Enquiries wait for a human",
        line: "A WhatsApp message at 9pm sits unanswered until morning. In most industries, the business that replies first wins the customer.",
      },
      {
        title: "The same questions, endlessly",
        line: "Support teams answer the same twenty questions all day, so the genuinely hard problems get the least attention.",
      },
      {
        title: "Nobody knows what happened",
        line: "Work moves through chats and inboxes with no record, so there's no way to see what's pending or what it cost.",
      },
    ],
    deliverables: [
      {
        title: "Workflow & process automation",
        line: "Multi-step processes that run without supervision — triggered by an email, a form, a message or a schedule.",
      },
      {
        title: "AI chatbots trained on your business",
        line: "Answers drawn from your own documents and data, with a clean handoff to a human the moment it matters.",
      },
      {
        title: "Document & data processing",
        line: "Invoices, receipts, purchase orders and forms read automatically and written into the system you already use.",
      },
      {
        title: "API integrations",
        line: "Your website, CRM, accounting tool, sheets and WhatsApp connected so information moves once and moves correctly.",
      },
    ],
    examples: [
      "Invoice PDFs arrive by email → data extracted and written into your accounting sheet, automatically.",
      "WhatsApp enquiry comes in → instant reply, logged, and assigned to the right person.",
      "New order placed → customer gets status updates at every stage, hands-free.",
      "Support question asked → AI answers from your docs; only the hard ones reach a human.",
      "Every morning at 9am → yesterday's sales summary in your inbox.",
      "Website lead submitted → scored, added to your CRM, and a follow-up drafted for you.",
    ],
    process: [
      "A free 20-minute call to find the one process costing you the most time.",
      "A fixed proposal — exact scope, timeline and price, written down.",
      "We build and demo it running on your real data.",
      "We deploy, monitor it, and add the next automation when you're ready.",
    ],
    priceKey: "automation",
    faqs: [
      {
        question: "How long does an AI automation take to build?",
        answer:
          "Most single automations go live in 3–10 days. Larger multi-step systems that touch several tools take two to three weeks. You see it working on your real data before it goes live.",
      },
      {
        question: "What does AI automation cost in India?",
        answer:
          "Our automations start around ₹25,000 and most land between ₹25,000 and ₹1,00,000 depending on how many systems are involved. Everything is fixed price, agreed in writing before work starts — no hourly billing.",
      },
      {
        question: "Do I need to replace the software I already use?",
        answer:
          "No. We automate around the tools you already run — Google Sheets, Tally, your CRM, WhatsApp, your existing website. Replacing working software is expensive and rarely necessary.",
      },
      {
        question: "Is my business data safe with an AI chatbot?",
        answer:
          "Yes. We scope exactly what data the system can read, keep credentials in your own accounts wherever possible, and you own the code and infrastructure at the end.",
      },
      {
        question: "What happens if the automation breaks?",
        answer:
          "Every build includes a support window, and most clients keep us on a monthly plan for monitoring and fixes. Automations that run unwatched are how businesses get hurt.",
      },
    ],
    proof: ["wasro", "max-extrusions"],
    related: ["custom-software-development", "saas-mvp-development"],
  },
  {
    slug: "custom-software-development",
    metaTitle: "Custom Software Development Company in Mumbai — Actorix",
    metaDescription:
      "Custom software, internal tools, dashboards and CRMs built around how your business actually works. Mumbai-based, working worldwide. Fixed scope, weekly demos, first release in 3–6 weeks.",
    h1: "Custom software shaped around how your business actually works",
    eyebrow: "CUSTOM SOFTWARE & WEB APPS",
    intro:
      "Off-the-shelf software forces your business to work its way. Past a certain size that stops being a saving and starts being a tax — on your team's time, on your data, and on what you can offer customers. We build the system that fits the business you actually run.",
    problems: [
      {
        title: "The business runs on spreadsheets",
        line: "They worked at ten customers. At a few hundred, versions multiply, formulas break silently, and nobody trusts the numbers.",
      },
      {
        title: "The tool almost fits",
        line: "You pay for software every month and still keep a parallel sheet for the parts it can't do.",
      },
      {
        title: "Nothing talks to anything",
        line: "Sales, delivery and accounts each hold a piece of the truth, and reconciling them is somebody's whole job.",
      },
      {
        title: "You can't see what's happening",
        line: "Answering a simple question — what's pending, what's profitable — takes a day of digging.",
      },
    ],
    deliverables: [
      {
        title: "Internal tools & dashboards",
        line: "One screen that shows the state of the business, built on your real data instead of a monthly export.",
      },
      {
        title: "CRMs & business systems",
        line: "Pipeline, customers, jobs and follow-ups modelled the way your team already thinks about them.",
      },
      {
        title: "Premium websites & web apps",
        line: "Fast, custom-built, and designed to convert — not a template with your logo dropped in.",
      },
      {
        title: "Admin panels your team can actually use",
        line: "Non-technical staff update content, prices and records themselves, with no developer in the loop.",
      },
    ],
    examples: [
      "A no-code admin panel so the owner updates prices and offers live, without a developer.",
      "A dashboard showing pipeline, revenue and pending jobs in one place.",
      "A CRM that logs every enquiry from website, WhatsApp and phone into one list.",
      "An inventory system that warns you before stock runs out.",
      "A distributor locator customers can call or WhatsApp in one tap.",
      "Role-based access so staff see exactly what they should and nothing more.",
    ],
    process: [
      "A free 20-minute call to understand the workflow before proposing anything.",
      "A fixed proposal with scope, timeline and price agreed up front.",
      "Weekly demos of working software — never a status report.",
      "Launch, monitoring, and ongoing improvement with you.",
    ],
    priceKey: "software",
    faqs: [
      {
        question: "How much does custom software cost in India?",
        answer:
          "Custom software and internal tools typically run ₹1,50,000 to ₹4,00,000 depending on the number of user roles, integrations and screens. We quote fixed scope in writing before starting, so the number doesn't move.",
      },
      {
        question: "How long does it take to build custom software?",
        answer:
          "First working release in 3–6 weeks for most systems. You see progress in a weekly demo throughout, so nothing arrives as a surprise at the end.",
      },
      {
        question: "Do I own the code?",
        answer:
          "Yes. You own the code and the infrastructure. Nothing is handed over as a black box, and you are never locked into us to keep it running.",
      },
      {
        question: "Can you work with our existing systems?",
        answer:
          "Usually yes. We integrate with the tools you already run rather than replacing them, unless replacing one is genuinely cheaper than working around it.",
      },
      {
        question: "Do you work with businesses outside Mumbai?",
        answer:
          "Yes. We're based in Mumbai and work remotely with clients across India and internationally, scheduling calls in your timezone.",
      },
    ],
    proof: ["wasro", "godrej-reserve", "max-extrusions"],
    related: ["ai-automation", "saas-mvp-development"],
  },
  {
    slug: "saas-mvp-development",
    metaTitle: "SaaS & MVP Development Company in India — Actorix",
    metaDescription:
      "Turn your product idea into a launched SaaS MVP in 4–8 weeks. Real users, real billing, production architecture. Fixed price, weekly demos. Built in India, shipping worldwide.",
    h1: "From product idea to launched MVP, in weeks",
    eyebrow: "SAAS & MVP DEVELOPMENT",
    intro:
      "The point of an MVP is not to build less software — it's to learn the truth about your idea sooner. We build the smallest version that real users can actually pay for and use, on architecture that won't have to be thrown away when it works.",
    problems: [
      {
        title: "The idea has never met a user",
        line: "Months of planning produce confidence but no evidence. The only real test is whether someone uses it and pays.",
      },
      {
        title: "Quotes come back at a year and a fortune",
        line: "Agencies scope the finished product instead of the first honest version, so nothing ever launches.",
      },
      {
        title: "The prototype can't grow up",
        line: "A no-code demo proves interest, then collapses the moment real users, real data or real billing arrive.",
      },
      {
        title: "No technical co-founder",
        line: "You know the market and the customer, but you need someone who can actually build and ship it.",
      },
    ],
    deliverables: [
      {
        title: "Product scoping",
        line: "We cut the idea down to the version that tests the riskiest assumption first — and say honestly what should wait.",
      },
      {
        title: "A real MVP, not a demo",
        line: "Accounts, permissions, billing and a working dashboard. Something you can put in front of paying users.",
      },
      {
        title: "Production architecture",
        line: "Built so that success doesn't mean a rewrite — proper database, auth and deployment from day one.",
      },
      {
        title: "UI/UX design",
        line: "An interface people can use without a manual, because a confusing MVP tests the wrong thing.",
      },
    ],
    examples: [
      "A subscription product with signup, plans and a customer dashboard.",
      "A marketplace matching two sides with messaging and payments.",
      "An analytics tool that ingests customer data and reports on it.",
      "An internal product you plan to sell to others in your industry.",
      "An AI-powered tool built on Claude or GPT with your own data.",
      "A trading or analytics platform with real-time data and secure accounts.",
    ],
    process: [
      "A free 20-minute call — we tell you honestly whether the idea is ready to build.",
      "Scoping down to a launchable first version, with a fixed price and date.",
      "Weekly demos of working software you can click through.",
      "Launch to real users, then iterate on what they actually do.",
    ],
    priceKey: "saas",
    faqs: [
      {
        question: "How long does it take to build a SaaS MVP?",
        answer:
          "Most MVPs ship in 4–8 weeks. The timeline depends far more on how tightly the first version is scoped than on how fast anyone types — which is why scoping is where we start.",
      },
      {
        question: "How much does it cost to build an MVP in India?",
        answer:
          "SaaS MVPs typically run ₹2,50,000 to ₹6,00,000 depending on features, integrations and whether AI is involved. Fixed price, agreed before we begin.",
      },
      {
        question: "Will the MVP have to be rebuilt if it succeeds?",
        answer:
          "No. We build on production architecture — proper database, authentication and deployment — so growth means adding to it, not starting over.",
      },
      {
        question: "Can you build an AI-powered product?",
        answer:
          "Yes. We work with Claude and GPT models daily and build AI directly into products — assistants, document understanding, and generation features grounded in your own data.",
      },
      {
        question: "Do you take equity instead of payment?",
        answer:
          "No. We work on fixed-price engagements. It keeps the relationship simple and means our incentive is to ship your product well, not to negotiate ownership.",
      },
    ],
    proof: ["quant-lab", "wasro"],
    related: ["ai-automation", "custom-software-development"],
  },
];

export const serviceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
