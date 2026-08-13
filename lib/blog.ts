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
  /* Branded card shown above the post and used as og:image. Descriptive
     filenames on purpose — the filename is one of the few signals Google
     Images has about what a picture shows. */
  cover: string;
  coverAlt: string;
};

export const POSTS: Post[] = [
  {
    slug: "ai-automation-small-business-india",
    title: "What should a small business automate first?",
    metaTitle: "AI Automation for Small Businesses in India — What to Automate First",
    description:
      "A practical guide to AI automation for Indian small businesses: the eight jobs worth automating first, what each costs, what to leave alone, and how to tell a real automation from an expensive toy.",
    published: "2026-08-09",
    readingMinutes: 9,
    tags: ["Automation", "Small business", "AI"],
    cover: "/images/actorix-what-to-automate-first-small-business.jpg",
    coverAlt:
      "What a small business should automate first — the highest-volume task, the task with clear rules, and the follow-ups that get forgotten",
    intro:
      "Most automation advice is written for companies with an operations team. This is written for the businesses we actually work with — a manufacturer in Assam, a bakery in Bandra, an extrusions company outside Mumbai — where the person considering automation is also the person answering the phone.",
    body: [
      { t: "h2", text: "Start with the job you do most, not the one that sounds most impressive" },
      {
        t: "p",
        text: "The instinct is to automate something clever. The money is almost always in something boring: the task you or your staff repeat every single day without thinking about it. Copying numbers between two screens. Replying to the same enquiry. Checking whether an order went out.",
      },
      {
        t: "p",
        text: "A useful test — for one week, note every task you do more than five times. The top of that list is your first automation, whatever it is. It will feel too mundane to be worth automating. That is exactly why it is costing you.",
      },

      { t: "h2", text: "Eight things worth automating first" },
      {
        t: "p",
        text: "These are ordered roughly by how quickly they pay for themselves for a small Indian business.",
      },
      { t: "h3", text: "1. Enquiries that arrive on WhatsApp" },
      {
        t: "p",
        text: "For most Indian SMBs, WhatsApp is the real front door. An automation can reply instantly with the information people always ask for, capture the enquiry into a list you can actually work from, and pass anything genuine to a human. The point is not to replace the conversation — it is to make sure a message at 10pm is not still sitting there at 10am.",
      },
      { t: "h3", text: "2. Invoice and document data entry" },
      {
        t: "p",
        text: "Invoices, purchase orders and delivery notes arriving as PDFs or photos, then being retyped into a sheet or accounting tool. This is the single most common automation we build. Modern models read a scanned invoice reliably, and the output goes straight into whatever you already use.",
      },
      { t: "h3", text: "3. Content that goes stale without a developer" },
      {
        t: "p",
        text: "Prices, offers, product lists. If changing a number on your own website means messaging someone and waiting, the site will drift out of date within a month. We built exactly this for Wasro — an admin panel where the owner updates prices, offers and featured products himself, live.",
      },
      { t: "h3", text: "4. Lead capture into one place" },
      {
        t: "p",
        text: "Enquiries arriving by form, WhatsApp, phone and Instagram, each living somewhere different. Routing them all into a single sheet or CRM costs very little and immediately tells you something you probably do not know: where your business actually comes from.",
      },
      { t: "h3", text: "5. The status update customers ask for" },
      {
        t: "p",
        text: "\"Has it shipped?\" \"Is it ready?\" Every one of those messages is a task you did not plan for. Automatic updates at each stage remove most of them, and customers prefer being told over having to ask.",
      },
      { t: "h3", text: "6. The daily summary you keep meaning to look at" },
      {
        t: "p",
        text: "Yesterday's orders, enquiries and payments in your inbox at 9am. Cheap to build, and it changes behaviour — you notice a bad week on Tuesday instead of at month end.",
      },
      { t: "h3", text: "7. Answering the same twenty questions" },
      {
        t: "p",
        text: "If your team answers the same questions all day, a chatbot trained on your own documents handles the repeats and hands the unusual ones to a person. The value is not the questions it answers; it is the attention freed up for the ones it cannot.",
      },
      { t: "h3", text: "8. Following up" },
      {
        t: "p",
        text: "Most small businesses lose more revenue to enquiries nobody followed up than to enquiries they never received. An automation that reminds you — or drafts the follow-up for you — is usually the highest-return thing on this list, and the least exciting.",
      },

      { t: "h2", text: "What it costs" },
      {
        t: "p",
        text: "For context, our own pricing: a single automation typically runs ₹25,000 to ₹1,00,000 and goes live in three to ten days. A chatbot trained on your documents is ₹40,000 to ₹1,50,000 and takes one to two weeks. Most businesses start with one workflow and add more once they trust it.",
      },
      {
        t: "p",
        text: "The number that matters is not the price — it is the payback. If a task takes an hour a day and you value that hour at ₹300, it is costing roughly ₹90,000 a year. Against that, a ₹40,000 automation pays for itself in about five months and then keeps paying.",
      },

      { t: "h2", text: "What not to automate" },
      {
        t: "ul",
        items: [
          "Anything you do rarely. Automating a monthly task usually costs more than the task ever will.",
          "A process you are about to change. Automate a bad workflow and you have an efficient bad workflow. Fix it on paper first.",
          "Judgement calls. Pricing a difficult job, handling an upset customer, deciding what to make next — these need a person, and customers can tell when they did not get one.",
          "The final word to a customer, unsupervised. AI is good at drafting and triage. Let it prepare; let a human send anything that matters.",
        ],
      },
      {
        t: "quote",
        text: "Automation multiplies whatever process you already have. If the process is broken, you get more broken, faster.",
      },

      { t: "h2", text: "How to tell a real automation from an expensive toy" },
      {
        t: "ul",
        items: [
          "It runs without anyone remembering to run it. If it needs a person to trigger it, you have moved the work, not removed it.",
          "It fails loudly. Silent failure is worse than no automation — you will trust output that stopped being true weeks ago.",
          "It works with the tools you already use. Replacing working software to enable an automation is usually a bad trade.",
          "You can see what it did. A log or a sheet you can check beats a black box, every time.",
          "You own it. If it lives in someone else's account and dies when you stop paying them, it is not yours.",
        ],
      },

      { t: "h2", text: "A sensible first step" },
      {
        t: "p",
        text: "Pick the one task from your week that you would most like to never do again. Not the most impressive one — the most repetitive one. That single automation, done properly and running unattended, teaches you more about what is worth automating in your business than any amount of planning.",
      },
      {
        t: "cta",
        text: "We build automations on fixed scope, usually live within a week or two. If you want an honest read on whether a task is worth automating — including when the answer is no — a 20-minute call is free.",
      },
    ],
  },
  {
    slug: "mvp-cost-india",
    title: "What does it cost to build an MVP in India in 2026?",
    metaTitle: "What Does It Cost to Build an MVP in India? (2026 Guide)",
    description:
      "Real MVP price ranges in India for 2026 — ₹2.5L–₹6L for a launchable SaaS MVP, what changes the number, where quotes go wrong, and how to scope so you pay less.",
    published: "2026-08-08",
    readingMinutes: 8,
    tags: ["Pricing", "MVP", "SaaS"],
    cover: "/images/actorix-mvp-cost-india-2026.jpg",
    coverAlt:
      "What it costs to build an MVP in India in 2026 — a real SaaS MVP starts around 2.5 lakh rupees",
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
