import Link from "next/link";
import { publishedTestimonials } from "@/lib/testimonials";
import Reveal from "@/components/reveal";

/* Renders nothing at all until at least one testimonial is client-approved
   AND attributed to a named person. An empty section is better than a
   fabricated one — and an unattributed quote ("a happy client") reads as
   invented to anyone evaluating you seriously. */

export default function Testimonials() {
  const items = publishedTestimonials();
  if (items.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-label="What clients say"
      className="border-y border-line bg-[#FCFCFD] py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.16em] text-ink-faint uppercase sm:text-xs sm:tracking-[0.28em]">
            In their words
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight md:text-5xl">
            What clients say.
          </h2>
        </Reveal>

        <div
          className={`mt-14 grid gap-6 ${
            items.length === 1
              ? "max-w-2xl"
              : items.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3"
          }`}
        >
          {items.map((t, i) => (
            <Reveal
              key={t.id}
              delay={i * 0.07}
              className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-[0_1px_2px_rgba(11,11,15,0.04),0_26px_50px_-34px_rgba(11,11,15,0.22)]"
            >
              <span
                aria-hidden
                className="text-gradient-red font-display text-4xl leading-none"
              >
                &ldquo;
              </span>

              <blockquote className="mt-4 flex-1 text-[15.5px] leading-relaxed text-ink-soft">
                {t.quote}
              </blockquote>

              <figcaption className="mt-7 border-t border-line pt-5">
                <p className="font-display text-[15px] font-medium text-ink">{t.name}</p>
                <p className="mt-1 text-[13px] text-ink-faint">
                  {t.role}, {t.company}
                </p>
                {t.caseSlug && (
                  <Link
                    href={`/work/${t.caseSlug}`}
                    className="group mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink transition-colors hover:text-red"
                  >
                    Read the case study
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                )}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
