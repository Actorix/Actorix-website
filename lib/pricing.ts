/* Actorix price bands — set 2026-08-06 from 2026 Indian market research
   (basic sites ₹10–50k, standard business ₹50k–2L, agencies $15–60/hr,
   senior full-stack $25–45/hr). Positioned deliberately BELOW established
   agencies to win the first clients, while staying above template shops —
   the work is senior-level, the brand is new.

   Change a number here and it updates the estimator everywhere. */

export type Band = {
  key: string;
  label: string;
  inr: string;
  usd: string;
  timeline: string;
  /** shown under the range on the estimate card */
  note: string;
};

export const BANDS: Record<string, Band> = {
  automation: {
    key: "automation",
    label: "AI automation",
    inr: "₹25,000 – ₹1,00,000",
    usd: "$350 – $1,200",
    timeline: "live in 3–10 days",
    note: "Priced per workflow — most businesses start with one and add more.",
  },
  chatbot: {
    key: "chatbot",
    label: "AI chatbot",
    inr: "₹40,000 – ₹1,50,000",
    usd: "$550 – $1,800",
    timeline: "live in 1–2 weeks",
    note: "Trained on your docs and data, with human handoff built in.",
  },
  website: {
    key: "website",
    label: "Premium website",
    inr: "₹45,000 – ₹1,50,000",
    usd: "$600 – $1,800",
    timeline: "live in 10–14 days",
    note: "Custom-built, not a template. SEO and analytics included.",
  },
  software: {
    key: "software",
    label: "Custom software / internal tool",
    inr: "₹1,50,000 – ₹4,00,000",
    usd: "$1,900 – $5,000",
    timeline: "first release in 3–6 weeks",
    note: "Dashboards, CRMs, admin panels — shaped to how you actually work.",
  },
  saas: {
    key: "saas",
    label: "SaaS MVP",
    inr: "₹2,50,000 – ₹6,00,000",
    usd: "$3,000 – $7,500",
    timeline: "shipped in 4–8 weeks",
    note: "A real product with users, billing, and a dashboard — not a demo.",
  },
};

/** Scope multipliers are expressed as plain guidance, not maths on the page. */
export const SCOPE_HINT: Record<string, string> = {
  simple: "toward the lower end of this range",
  standard: "around the middle of this range",
  complex: "toward the upper end, sometimes beyond",
};

export const CARE_PLAN = {
  inr: "₹8,000 – ₹25,000 / month",
  usd: "$100 – $300 / month",
};
