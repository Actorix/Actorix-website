/* Client testimonials.

   ⚠️ PUBLISHING RULE — read before flipping any `approved` flag.

   These quotes were DRAFTED by Actorix because the clients said "write it
   yourself". That is fine as a starting point, but a testimonial may only go
   live once the named client has seen the exact wording and confirmed it.
   Keep their "yes" (a WhatsApp screenshot is enough).

   Publishing an invented quote under a real person's name is a fake
   testimonial under India's Consumer Protection Act 2019 and the FTC's 2024
   Rule on Consumer Reviews — the latter matters because Actorix markets to US
   and UK clients. It is also the single easiest way to lose a client's trust.

   `approved: false` means the component skips it entirely. Nothing renders
   until it is genuinely signed off.

   STATUS 2026-08-07: Ajinkya confirmed all three clients approved this exact
   wording, so `approved` is true and all three render.

   STATUS 2026-08-16: Cake Rush replaced with the client's OWN words, submitted
   through the feedback form (5/5, "Definitely" would recommend). That is the
   strongest kind of testimonial there is — as the other clients return real
   reviews, swap theirs in the same way rather than keeping the drafted text. */

export type Testimonial = {
  id: string;
  /** the exact words to be approved */
  quote: string;
  /** person's name — REQUIRED before approval; company alone is weak proof */
  name: string;
  role: string;
  company: string;
  /** case study this relates to, for the "read more" link */
  caseSlug?: string;
  /** flip to true ONLY after the client confirms this exact text */
  approved: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "wasro",
    quote:
      "We had never had a website, and what we needed most was to stop depending on someone else every time a price or an offer changed. Ajinkya built us exactly that — I update the site myself now, and every one of our stockists is reachable from it. He understood the business before he wrote any code.",
    name: "Harshit Agarwal",
    role: "Owner",
    company: "Madhav Industries (Wasro)",
    caseSlug: "wasro",
    approved: true,
  },
  {
    id: "cakerush",
    /* The client's own words, submitted via the feedback form on 2026-08-16.
       Only copy-edited for grammar ("design quality were" → "was") and
       readability — no meaning changed, nothing added. */
    quote:
      "It was a great experience working with you. Every detail I wanted in my website was addressed and developed far better than I expected. All the elements were extremely creative and innovative. The design quality was exactly what I had in mind, and the whole shopping journey was designed keeping the customers in mind.",
    name: "Sanaya Wadkar",
    role: "Owner",
    company: "Cake Rush, Bandra West",
    caseSlug: "cakerush",
    approved: true,
  },
  {
    id: "max-extrusions",
    quote:
      "Buyers in our industry check you online before they ever pick up the phone, and we had nothing to show them. Actorix gave us a site that matches the scale we actually operate at, and enquiries now reach us in one place instead of scattered across inboxes. Straightforward to work with, and delivered when he said he would.",
    name: "Bhavya Mistry",
    role: "Director",
    company: "Max Extrusions Pvt Ltd",
    caseSlug: "max-extrusions",
    approved: true,
  },
];

/** Only approved, attributed testimonials ever reach the page. */
export const publishedTestimonials = () =>
  TESTIMONIALS.filter((t) => t.approved && t.name.trim().length > 0);
