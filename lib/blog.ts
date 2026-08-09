/* Blog posts.

   Topic chosen deliberately: "what does an MVP cost in India" is a high
   commercial-intent query that almost every agency answers with "it depends,
   contact us". Publishing real numbers is both genuinely useful and the kind
   of page that earns links — which is what a new domain needs most.

   Body is a small block format rather than MDX so posts stay typed, are
   trivially renderable, and can't break the build with bad markup. */

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "quote"; text: string }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "cta"; text: string };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  /** ISO date */
  published: string;
  readingMinutes: number;
  tags: string[];
  intro: string;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "mvp-cost-india",
    title: "What does it cost to build an MVP in India in 2026?",
    metaTitle: "What Does It Cost to Build an MVP in India? (2026 Guide)",
    description:
      "Real MVP price ranges in India for 2026 — ₹2.5L–₹6L for a launchable SaaS MVP, what changes the number, where quotes go wrong, and how to scope so you pay less.",
    published: "2026-08-08",
    readingMinutes: 8,
    tags: ["Pricing", "MVP", "SaaS"],
    intro:
      "Almost every agency answers this with \"it depends — book a call\". That's true and useless. Here are the actual numbers we quote in 2026, what moves them, and how to scope a build so you pay less without ending up with something you have to throw away.",
    body: [
      { t: "h2", text: "The short answer" },
      {
        t: "p",
        text: "In India in 2026, a genuinely launchable SaaS MVP — real accounts, real data, real billing — typically costs between ₹2,50,000 and ₹6,00,000 and takes four to eight weeks. A smaller product with one core workflow and no billing can land closer to ₹1,50,000. Anything quoted under ₹75,000 is either a template, a prototype that can't take real users, or a number that will grow later.",
      },
      {
        t: "table",
        head: ["What you're building", "Typical range", "Timeline"],
        rows: [
          ["Single workflow, no billing", "₹1,50,000 – ₹2,50,000", "3–4 weeks"],
          ["Standard SaaS MVP (accounts, dashboard, billing)", "₹2,50,000 – ₹4,50,000", "4–6 weeks"],
          ["Multi-user or AI-powered product", "₹4,00,000 – ₹6,00,000+", "6–8 weeks"],
          ["Internal tool for one company", "₹1,50,000 – ₹4,00,000", "3–6 weeks"],
        ],
      },
      {
        t: "p",
        text: "These are Indian studio rates for senior work. A freelancer will quote less and a large agency will quote three times more; the difference is rarely the code and almost always the number of people the fee has to feed.",
      },

      { t: "h2", text: "What actually moves the number" },
      {
        t: "p",
        text: "In our experience the price is driven by four things, roughly in this order:",
      },
      {
        t: "ul",
        items: [
          "How many user roles exist. One kind of user is simple. The moment you have a customer, an admin and a partner who each see different data, you have three products sharing a database — and permissions to test in every combination.",
          "Whether money moves through it. Payments mean a gateway, webhooks, failure states, refunds, invoices and reconciliation. It is the single most under-estimated line item in every MVP quote we have seen.",
          "How many external systems it must talk to. Each integration is someone else's API, someone else's downtime and someone else's rate limits.",
          "Whether the data is yours. If the product depends on scraping, importing or cleaning data from elsewhere, that pipeline is often bigger than the app on top of it.",
        ],
      },
      {
        t: "p",
        text: "Notice that none of those are visual. Design affects the number far less than founders expect. Screens are cheap; state is expensive.",
      },

      { t: "h2", text: "Where MVP quotes go wrong" },
      { t: "h3", text: "Scoping the finished product instead of the first honest version" },
      {
        t: "p",
        text: "Most founders arrive with the two-year vision, and most agencies price exactly that — which is how a six-week idea becomes a nine-month quote nobody signs. The job of an MVP is not to be small; it is to test the riskiest assumption before you spend the rest of the money.",
      },
      {
        t: "p",
        text: "A useful exercise: write down the one belief that, if wrong, makes the whole business pointless. Build only what tests that. Everything else is version two, and version two should be paid for by version one's users.",
      },
      { t: "h3", text: "Hourly billing" },
      {
        t: "p",
        text: "Hourly rates transfer all estimation risk to you. If the build takes longer than expected — and it usually does — you pay for the surprise. Fixed scope agreed in writing before work starts puts that risk where it belongs: on the people doing the estimating. Ask for it.",
      },
      { t: "h3", text: "The no-code prototype that can't grow up" },
      {
        t: "p",
        text: "No-code is genuinely excellent for proving demand. It becomes expensive the moment real users, real data or real billing arrive, because the rebuild costs more than building properly would have. Use no-code to validate that people want it. Use code once they do.",
      },
      {
        t: "quote",
        text: "The cheapest MVP is not the one with the lowest quote. It is the one you don't have to build twice.",
      },

      { t: "h2", text: "How to pay less without regretting it" },
      {
        t: "ul",
        items: [
          "Cut features, not quality. Two features built properly beat eight built carelessly, and the eight will cost you again in six months.",
          "Launch with one user role. Add the admin panel when you have enough customers to need one.",
          "Delay billing if you can charge manually at first. Ten early customers can be invoiced by hand; a payment integration can wait until eleven is annoying.",
          "Use boring, proven technology. Novel stacks cost more to build, more to hire for and more to maintain.",
          "Bring real content early. Waiting on copy and images is one of the most common causes of a timeline slipping — and slipped timelines cost money.",
        ],
      },

      { t: "h2", text: "What you should get for the money" },
      {
        t: "p",
        text: "Whoever you hire, these are reasonable things to insist on, and their absence is a warning sign:",
      },
      {
        t: "ul",
        items: [
          "A fixed price and scope in writing before any work starts.",
          "Working software demonstrated weekly — not status reports or percentages.",
          "Ownership of your code and your infrastructure, in your own accounts.",
          "A production setup from day one: real database, real authentication, real deployment. Not a demo that has to be rebuilt when it works.",
          "A named person who is actually building it, not an account manager relaying messages.",
        ],
      },

      { t: "h2", text: "So what should you budget?" },
      {
        t: "p",
        text: "If you are a founder in India testing a new product idea in 2026, budget ₹3,00,000 to ₹4,00,000 and six weeks for a first version that real users can pay for. If that number is out of reach, the right move is not a cheaper builder — it is a smaller first version. A tightly scoped ₹1,50,000 build that answers your riskiest question is worth more than a ₹5,00,000 build of the wrong thing.",
      },
      {
        t: "cta",
        text: "We build MVPs on fixed scope in four to eight weeks. If you want an honest read on what your idea should cost — including whether it's ready to build at all — a 20-minute call is free.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
