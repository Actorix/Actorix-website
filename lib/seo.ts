/* Single source of truth for SEO constants and structured data.
   Keeping these in one file means titles, descriptions, socials and schema
   can never drift apart across pages. */

export const SITE = {
  name: "Actorix",
  legalName: "Actorix",
  url: "https://actorix.in",
  // Used in <title> as "Page — Actorix"
  tagline: "AI Automation & Custom Software Studio",
  email: "hello@actorix.in",
  phone: "+91-90049-33771",
  whatsapp: "https://wa.me/919004933771",
  booking: "https://cal.com/actorix-9b0leh",
  city: "Mumbai",
  region: "Maharashtra",
  country: "IN",
  founder: "Ajinkya Dhumal",
  founded: "2025",
} as const;

/** Every profile we control — these power schema.org sameAs, which is the
    strongest signal for winning a brand SERP against a same-name domain. */
export const PROFILES = [
  "https://www.linkedin.com/company/actorix/",
  "https://www.instagram.com/actorix.in/",
  "https://github.com/Actorix",
] as const;

export const DEFAULT_DESCRIPTION =
  "Actorix builds AI automation, custom software and SaaS products for growing businesses. Fixed pricing, weekly demos, launches in weeks. Based in Mumbai, working worldwide.";

/** Keyword clusters the site is written to rank for. Documented here so copy
    edits stay aligned with the strategy (see SEO.md). */
export const KEYWORD_FOCUS = {
  brand: ["Actorix", "Actorix India", "Actorix software studio"],
  primary: [
    "AI automation company India",
    "AI automation agency Mumbai",
    "custom software development company Mumbai",
    "SaaS MVP development India",
    "AI chatbot development company India",
  ],
  longTail: [
    "AI automation for small business India",
    "WhatsApp automation for business",
    "custom CRM development Mumbai",
    "MVP development in 4 weeks",
    "hire AI developer India",
  ],
} as const;

/* ── Structured data ──────────────────────────────────────────────────── */

/** ProfessionalService extends LocalBusiness — the right type for a
    service-area software studio, and it can earn a knowledge panel. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: "Actorix Studio",
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/logo-lockup.png`,
      caption: "Actorix logo",
    },
    image: `${SITE.url}/opengraph-image.png`,
    description: DEFAULT_DESCRIPTION,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.founded,
    founder: {
      "@type": "Person",
      name: SITE.founder,
      jobTitle: "Founder & Full-stack Engineer",
      url: "https://www.linkedin.com/in/ajinkya842004/",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Place", name: "Worldwide" },
    ],
    priceRange: "₹₹",
    sameAs: [...PROFILES],
    knowsAbout: [
      "AI automation",
      "AI chatbots",
      "Custom software development",
      "SaaS product development",
      "MVP development",
      "Workflow automation",
      "Web application development",
      "API integration",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      telephone: SITE.phone,
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software & AI services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Automation & Chatbots",
            description:
              "Workflow and process automation, AI support and sales chatbots, document and data processing, API integrations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software & Web Apps",
            description:
              "Internal tools, dashboards, CRMs and business systems, premium websites and web applications.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SaaS & MVP Development",
            description:
              "Product scoping, MVP builds measured in weeks, full SaaS engineering and UI/UX design.",
          },
        },
      ],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-IN",
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function caseStudySchema(cs: {
  slug: string;
  title: string;
  summary: string;
  client: string;
  category: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE.url}/work/${cs.slug}#casestudy`,
    name: `${cs.title} — ${cs.category}`,
    headline: cs.title,
    description: cs.summary,
    url: `${SITE.url}/work/${cs.slug}`,
    ...(cs.image ? { image: `${SITE.url}${cs.image}` } : {}),
    creator: { "@id": `${SITE.url}/#organization` },
    about: cs.category,
    inLanguage: "en-IN",
  };
}
