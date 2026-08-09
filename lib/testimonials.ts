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
   wording, so `approved` is now true. They still do not render — the filter
   also requires a real `name`, and the component prints that name as the
   headline of the quote. Fill the three names in and they go live. */

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
    quote:
      "Everything used to happen in my Instagram messages, and I was answering the same questions about flavours and prices twenty times a day. Now people arrive already knowing what they want, and the order comes straight to my WhatsApp. It also looks like our brand, which nobody else managed to get right.",
    name: "Sanaya Wadkar",
    role: "Founder",
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
