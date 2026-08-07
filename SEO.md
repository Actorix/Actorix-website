# Actorix — SEO strategy & execution log

_Last updated 2026-08-07_

## Honest expectations first

| Query type | Realistic timeline |
|---|---|
| `Actorix` (brand) | **days to ~3 weeks** once the domain is live and indexed |
| `actorix software` / `actorix mumbai` | 2–4 weeks |
| Long-tail service + geo (`AI automation for small business India`) | 1–3 months |
| Head service terms (`custom software development company India`) | 6–12 months, needs backlinks |

Nothing ranks before the domain resolves and Google can crawl it. **Deploying
actorix.in is prerequisite #1** — every item below depends on it.

### The name collision
There is an existing brand at **actorix.com** with an empty site. That is good
news: Google ranks pages, not names, and an empty domain has almost nothing to
rank. We beat it by having (a) real content, (b) complete `Organization` schema
with `sameAs` links to our socials, (c) consistent name/contact everywhere, and
(d) a Google Business Profile. Expect to share the SERP briefly, then take it.

---

## What has been implemented (code)

### Technical foundation
| Item | File | Notes |
|---|---|---|
| `robots.txt` | `app/robots.ts` | allows all, blocks `/_next/image` + `/api` to save crawl budget, points to sitemap |
| `sitemap.xml` | `app/sitemap.ts` | auto-generated from the services + case-study data; priorities 1.0 / 0.9 / 0.8 |
| Canonical URLs | every page | prevents duplicate-content splits |
| `metadataBase` | `app/layout.tsx` | makes all OG/canonical URLs absolute |
| Title template | `app/layout.tsx` | `%s | Actorix`; service pages override with an absolute keyword-led title |
| OG + Twitter cards | all pages | 1200×630 image, per-page titles/descriptions |
| `lang="en-IN"` | `app/layout.tsx` | regional signal |
| Font `display: swap` | `app/layout.tsx` | avoids invisible text during load (CWV) |
| LCP not JS-gated | service + case-study pages | H1s render immediately via CSS instead of a scroll-triggered JS animation |

### Structured data (`lib/seo.ts` → `components/json-ld.tsx`)
Ships in the server HTML, so crawlers see it without running JavaScript.

- **ProfessionalService** (sitewide) — name, logo, founder, address, `areaServed`,
  `knowsAbout`, `contactPoint`, `hasOfferCatalog` with all three services, and
  `sameAs` → LinkedIn / Instagram / GitHub. This is the knowledge-panel candidate
  and the main weapon for the brand SERP.
- **WebSite** (sitewide)
- **FAQPage** — homepage FAQ + a distinct FAQ per service page. Eligible for
  FAQ rich results.
- **Service** + **OfferCatalog** + price specification — one per service page.
- **BreadcrumbList** — service and case-study pages (also rendered visibly).
- **CreativeWork** — one per case study.

### Content architecture — the big lever
A single-page site can rank for **one** keyword cluster. Three dedicated service
landing pages were created, each ~770 words of unique copy targeting its own
cluster, each with its own FAQ, proof links and internal links:

| URL | Primary target |
|---|---|
| `/services/ai-automation` | AI automation company India · AI automation agency Mumbai · AI chatbot development |
| `/services/custom-software-development` | custom software development company Mumbai · internal tools · CRM development |
| `/services/saas-mvp-development` | SaaS MVP development India · MVP development company · build an MVP |

Plus 4 case-study pages (`/work/*`) which target long-tail industry terms
(FMCG brand site, real-estate lead generation, B2B manufacturing website,
algorithmic trading platform).

Internal linking: homepage service cards → service pages → case studies →
back to contact. Every page is reachable within 2 clicks of the homepage.

---

## Keyword map

**Brand** — `Actorix`, `Actorix India`, `Actorix software studio`, `Actorix Mumbai`
Owned via: Organization schema, socials, GBP, exact-match domain.

**Primary (service + geo)**
- AI automation company India / agency Mumbai
- custom software development company Mumbai
- SaaS MVP development India
- AI chatbot development company India
- workflow automation services India

**Long-tail (fastest wins — write content for these)**
- AI automation for small business India
- WhatsApp automation for business
- custom CRM development Mumbai
- how much does an MVP cost in India
- MVP development in 4 weeks
- hire AI developer India
- invoice data entry automation

**Commercial-intent questions** (already answered on-page, FAQ-schema'd)
- what does custom software cost in India
- how long does it take to build a SaaS MVP
- do I own the code

---

## TODO — off-page, requires Ajinkya

Ordered by impact. Items 1–4 are the difference between "site exists" and
"site ranks".

1. **Deploy actorix.in** (blocks everything).
2. **Google Search Console** — add the property, verify via DNS TXT at Hostinger,
   then **submit `https://actorix.in/sitemap.xml`** and use *URL Inspection →
   Request Indexing* on the homepage and all 3 service pages. This is what makes
   indexing happen in days instead of weeks.
3. **Google Business Profile** — already created; now add the website URL,
   services matching the three service pages, and post updates. GBP is the
   single strongest local-SEO asset for "…in Mumbai" queries.
4. **Bing Webmaster Tools** — free, 2 minutes, imports from GSC. Bing also feeds
   ChatGPT search.
5. **Consistent NAP** (name, address/city, phone) across LinkedIn, Instagram,
   GBP, GitHub — mismatches dilute entity confidence.
6. **Directory + profile links** (each is a real backlink):
   Clutch, GoodFirms, DesignRush, Crunchbase, Product Hunt (for Quant Lab),
   IndiaMART, Justdial, Sulekha, F6S, LinkedIn company page website field.
7. **Client backlinks** — ask Wasro, CakeRush and Max Extrusions for a
   "Website by Actorix" credit linking to actorix.in. These are the most
   valuable links available to you and they cost one WhatsApp message.
8. **Google Analytics 4** — measure before optimising.

## Content roadmap (next, when there's time)

Highest-value first — each targets a real search with buying intent:

1. "What does it cost to build an MVP in India in 2026?" — pricing posts earn links
2. "AI automation examples for Indian small businesses" — targets the long-tail cluster
3. "Custom software vs off-the-shelf: when to switch" — top-of-funnel, links well
4. Case studies for CakeRush (currently the only work item without one)
5. A `/about` page — currently only a homepage section; Google likes an entity page

## Rules for future edits

- Never change a page's `<title>` or slug without a redirect — it resets ranking.
- Every new page needs: unique title, unique description, canonical, and an entry
  reachable by internal link (sitemap is automatic).
- Keep schema in `lib/seo.ts`. Don't inline JSON-LD in components.
- Don't animate H1s with scroll-triggered JS — LCP must not depend on JavaScript.
- Test rich results after deploy: search.google.com/test/rich-results
