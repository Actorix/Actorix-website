# Testimonial approvals — send these, then flip the flags

Three drafts are written and the section is built. It renders **nothing** until
each client has approved their exact wording and you've added their name.

Why the extra step: the clients said "write it yourself", which makes drafting
fine — but a quote published under a real person's name that they never saw is a
fake testimonial under India's Consumer Protection Act 2019 and the FTC's 2024
review rule (relevant because you market to US/UK clients). One message each
removes that entirely, and it takes them ten seconds to reply "yes".

Keep their reply — a WhatsApp screenshot in a folder is enough.

---

## 1 → Wasro (Madhav Industries)

> Hi [name], hope you're well!
>
> I've put our project up as a case study on my company site, actorix.in. You'd
> mentioned I could write the review myself — so I've drafted something below.
> Could you read it and tell me if it's fair? Change anything you like, or send
> your own version if you'd prefer.
>
> _"We had never had a website, and what we needed most was to stop depending on
> someone else every time a price or an offer changed. Ajinkya built us exactly
> that — I update the site myself now, and every one of our stockists is
> reachable from it. He understood the business before he wrote any code."_
>
> If that's okay, just reply "approved" and let me know the exact name and title
> you'd like shown (e.g. "Rajesh Sharma, Owner, Madhav Industries").
>
> Also — would you mind adding a small "Website by Actorix" credit in your site
> footer linking to actorix.in? Happy to add it for you.

---

## 2 → Cake Rush

> Hi [name], hope you're doing well!
>
> I've featured Cake Rush as a case study on my company site, actorix.in. You'd
> said I could write the review — here's my draft. Does this sound like you?
> Please change anything that doesn't.
>
> _"Everything used to happen in my Instagram messages, and I was answering the
> same questions about flavours and prices twenty times a day. Now people arrive
> already knowing what they want, and the order comes straight to my WhatsApp.
> It also looks like our brand, which nobody else managed to get right."_
>
> If you're happy with it, reply "approved" and tell me the name and title to
> show (e.g. "Priya Menon, Founder, Cake Rush").
>
> One more small favour — could you add a "Website by Actorix" credit in your
> footer, linking to actorix.in?

---

## 3 → Max Extrusions

> Hi [name], hope all's well!
>
> I've written up our project as a case study on actorix.in. You mentioned I
> could draft the review myself, so here it is — please tell me if it's accurate
> or change whatever you'd like.
>
> _"Buyers in our industry check you online before they ever pick up the phone,
> and we had nothing to show them. Actorix gave us a site that matches the scale
> we actually operate at, and enquiries now reach us in one place instead of
> scattered across inboxes. Straightforward to work with, and delivered when he
> said he would."_
>
> If that works, reply "approved" along with the name and designation to display
> (e.g. "Suresh Patel, Director, Max Extrusions").
>
> Also — would a "Website by Actorix" credit in your website footer be alright?
> It links back to actorix.in and helps us a lot.

---

## Then, for each approval

In `lib/testimonials.ts`:

1. Fill `name` with the person's real name (the section skips any entry with an
   empty name — company attribution alone is weak proof and reads as invented).
2. Adjust `role` if they gave a different title.
3. Update `quote` if they edited the wording — **use their version, not yours**.
4. Set `approved: true`.

Commit and push. The section appears automatically, sized for however many are
live (1, 2 or 3 across).

## Godrej

Deliberately excluded — no testimonial was offered for that project, so there is
nothing to draft. The case study stands on its own.
