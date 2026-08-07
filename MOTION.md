# Actorix — Motion & Component Library Decisions

## Sources

| Library | Status | Verdict |
|---|---|---|
| **Vengeance UI** (vengenceui.com) | Free, shadcn registry (`npx shadcn@latest add https://www.vengenceui.com/r/<slug>.json`) | ✅ Primary ingredient source |
| **Skiper UI** (skiper-ui.com) | Mostly **paid** ($129+); a few free components; registry `@skiper-ui/<name>` | ⚠️ Free components only, case-by-case |
| **Animmaster Lib** | Paid, WebGL/GSAP-heavy | ❌ Rejected (lean rule + page weight) |

## The rule

**Borrow mechanics, never looks.** Every component gets restyled to Actorix tokens
(red gradient `#B91C1C→#EF4444`, indigo `#312E81`, glint `#C7D2FE`, ink/paper,
Space Grotesk/Inter) and its motion timing tuned to our feel. Max one showpiece
per section. First paint is never blocked — no preloaders.

## Installed & integrated (v1)

| Component | Source | Where it lives | Used for | Adaptations |
|---|---|---|---|---|
| `staggerText.tsx` (TextAnimation) | Vengeance | `components/ui/` | Hero H1 word-by-word mask rise | Added `className` pass-through (gradient word), container `inline-block → inline` so the headline wraps naturally |
| `flip-fade-text.tsx` (FlipFadeText) | Vengeance | `components/ui/` | Hero H1 rotating word — software / automation / chatbots / products | Restyled via `textClassName` (size/case/tracking/color match the H1, incl. `dark:text-ink` guard) |
| `logo-slider.tsx` (LogoSlider) | Vengeance | `components/ui/` | Tech marquee strip between hero and services | Rewritten to track-duplication marquee (registry shipped no animation CSS); edge fade via CSS mask; keyframes in `globals.css` |
| `light-lines.tsx` (LightLines) | Vengeance | `components/ui/` | Contact band background — vertical light streaks | Recolored: ink→deep-indigo bg, glint-cyan lights (echoes the logo's light streaks), slowed to 0.6× |
| `faq-accordion.tsx` (FaqAccordion) | Vengeance | `components/ui/` | "Questions, answered." section | Fully reskinned to Actorix (hairline rows, Space Grotesk, rotating +); kept the grid-rows expand mechanic |
| `line-hover-link.tsx` (LineHoverLink) | Vengeance | `components/ui/` | Nav links, hero ghost link, footer links | Used as-is (`slide` + `double` variants); currentColor keeps it on-token |
| `social-flip-button.tsx` (SocialFlipButton) | Vengeance | `components/ui/` | Contact band socials — front letters spell A·C·T·X | Wired via `components/contact-socials.tsx` (client wrapper; react-icons dep installed) |
| `reveal.tsx` (custom) | — | `components/` | All section scroll reveals | Hand-built framer-motion `whileInView`, mirrors the approved concept's reveal timing |
| `scroll-progress.tsx` (custom) | — | `components/` | Brand-gradient scroll progress bar above the nav | framer `useScroll` + `useSpring` |
| `hero-aurora.tsx` (custom) | — | `components/` | Pointer-reactive aurora field in the hero | framer springs own translate; CSS `.aurora-pulse` owns breathing (layers never conflict) |
| `assistant-orb.tsx` (custom) | — | `components/` | Floating logo-mark orb, bottom-right — opens honest "coming soon" panel with contact CTAs | The signature widget; becomes the real AI assistant later |
| `work-visuals.tsx` (custom) | — | `components/` | Abstract dark-frame visuals for Quant Lab + Godrej work cards (no usable live image) | Label-only skeletons — no invented metrics on real client work |
| `animated-number.tsx` (AnimatedNumber) | Vengeance | `components/ui/` | Stats strip — odometer roll on real numbers (5 products, 121+ stores, 1,000+ DAU, 4 yrs) | Named export (no default); triggered 0→target via `useInView` in `components/stats-strip.tsx` |
| `hero-parallax.tsx` (custom) | — | `components/` | Hero recedes/fades as you scroll past — wearebrand-style depth | framer `useScroll` + transforms |
| `velocity-tilt.tsx` (custom) | — | `components/` | Marquee skews with scroll velocity — leans into your scroll | framer `useVelocity` + spring |
| `parallax-y.tsx` (custom) | — | `components/` | Work-card visuals drift against scroll | per-element `useScroll` target |
| `scale-in.tsx` (custom) | — | `components/` | Contact band zooms softly to full size on entry | scroll-linked scale/opacity |
| `work-mockups.tsx` (custom) | — | `components/` | UNUSED on page since real client work landed | Kept on disk — reusable for future concept/lab sections |

**Scroll-drama layer (2026-08-06):** every section h2 now uses TextAnimation word-rise;
hero parallax + velocity marquee + card parallax + band scale-in make scrolling itself
the show. Skiper UI remains paid-only for everything relevant — Vengeance carries the
site (8 components in production).

**Completion pass (2026-08-06, pre-deploy):**
| Piece | File | Notes |
|---|---|---|
| Lenis smooth scroll | `components/smooth-scroll.tsx` | Finally activated (was installed day one); reduced-motion users skip it |
| Cursor spotlight | `components/spotlight-card.tsx` | Service cards; CSS-var radial, no re-renders |
| Hero sparkles | `components/hero-sparkles.tsx` | 12 precomputed CSS motes (red + glint), zero JS |
| Shimmer labels | `.shimmer` in globals | Hero + services eyebrows |
| Border beam | `.border-beam` in globals | Featured (first) work card — @property conic light |
| Contact form | `components/contact-form.tsx` | Formspree; renders ONLY when NEXT_PUBLIC_FORMSPREE_ID is set — no dead form shipped |

Mobile pass verified at 375px: no horizontal overflow, single-column stacks, orb clear.

**Evaluated & rejected:** `glow-border-card` (Vengeance) — its `.glow-conic` animation CSS
isn't shipped by the registry, and a rotating rainbow border is banned-list territory.

## Custom (no library)

- Aurora glow fields (hero + contact) — plain CSS radial gradients
- `rise` CSS entrance for eyebrow/sub/CTAs — zero-JS
- `.text-gradient-red`, `.btn-gradient` — brand tokens in `globals.css`

## Backlog (verified available, install when the section is built)

| Need | Candidate | Slug |
|---|---|---|
| Stats/counters (only when real numbers exist) | Vengeance Animated Number / Stats Counter | `animated-number`, `stats-counter` |
| Section heading reveals on scroll | Vengeance Flip Fade Text | `flip-fade-text` |
| Navbar upgrade | Vengeance Spotlight Navbar | `spotlight-navbar` |
| Assistant chat UI | Skiper AI Chat Input | **verify it's on the free tier first** |
| Magnetic CTA hover, assistant orb pulse | Hand-built (framer-motion) | — |

## Banned patterns

Solar systems, creepy buttons, liquid metal, image trails, 3D displacement text —
showpiece clutter that reads "template site", the opposite of premium.


## Polish pass — 2026-08-07

**Work-card imagery (all real now):**
| Card | Source |
|---|---|
| Wasro | Real brand banner, **padded** to 16:10 (`pad_to_ratio` extends its own edge colours) instead of cover-cropped — the 1200×630 original was losing its logo, "150+" stat and wasro.in on the sides. Renamed `wasro-banner.jpg` to bust Next's image cache. |
| Quant Lab | No static asset exists (UI is fully rendered), so `work-visuals.tsx` was rebuilt as a faithful recreation of the live backtest screen — real indigo `#635BFF` palette, real metric row, SVG equity curve that draws itself on scroll (`pathLength`). |
| CakeRush | Real product photo pulled from the live site's hero (`playful-cake-for-a-special-milestone`), cropped 16:10 on the cake. |
| Godrej | Real `hero.png` pulled from the live deployment. |
| Max Extrusions | Real OG hero. |
All normalised to 1600×1000 progressive JPEG, 130–240 KB each.

**New motion components:**
- `github-card.tsx` — fills the previously blank 6th tile: animated commit-graph grid (deterministic pseudo-random levels so SSR/client markup match), two counter-drifting glows, pulsing "Building in public" dot.
- `process-timeline.tsx` — scroll-driven "How we work": a brand-gradient rail draws across (horizontal on desktop, vertical on mobile) and each node's dot, number and text light up as the spring-smoothed progress passes its threshold.
- `launch-notice.tsx` — first-visit modal ("we're still building"), once per session via sessionStorage, Escape/backdrop closable, never blocks content.

**Tuning:** assistant-orb glow reduced from 0.45→0.85 opacity to 0.16→0.34 with a wider soft blur (was reading neon). Estimator gained an explicit "this is an approximation, not a quote" panel and now leads with **Book a free call** over the form.

**Fixed:** `staggerText` mask clipped large display headings (case-study H1s were cut in half) — added `pb-[0.08em]`.


## Performance pass — 2026-08-07

Measured in-browser before changing anything (element counts, animated-filter
usage, will-change layers, backdrop-filter cost). What actually hurt:

| Problem found | Fix | Result |
|---|---|---|
| `LightLines` ran a **permanent `requestAnimationFrame` loop** writing `style.transform` on 17 SVG paths every frame — and never stopped, even with the contact band far off-screen | Rewrote as pure CSS keyframes (`.ll-down` / `.ll-up`) with per-element duration/delay; deterministic values, no JS | **Zero JS per frame**; browser auto-pauses when not rendered |
| GitHub card mounted **88 individual `motion.span`** cells = 88 viewport observers | One `motion.div` wrapper + CSS-staggered `.gh-cell` (delay via inline `animationDelay`) | 88 motion instances → 1 |
| `aurora-pulse` animated `transform: scale` on a `blur(40px)` layer — blurred layers repaint every frame when scaled | Opacity-only keyframes; dropped the redundant filter (the radial gradient already falls off softly) | Compositor-only |
| `staggerText` set a **permanent `will-change: transform`** on every word → 42 always-live layers | Removed; framer promotes/releases during the animation itself | 42 → **0** |
| Sticky header used `backdrop-blur-xl` (24px), repainting every scroll frame under Lenis | `backdrop-blur-md` (12px) + `bg-white/90` — visually near-identical on a white page | ~half the blur cost |
| 5× `ParallaxY` on work cards = 5 more rect-measuring scroll systems | Removed (cards already have reveal + hover zoom) | 5 scroll systems gone |

Verified after: `will-change` elements 42→0, animated blurred elements 3→2 (only
the small orb halo), one 12px backdrop-filter, `tsc --noEmit` clean, production
build clean, all 4 case studies still prerender.

**Checked and deliberately NOT changed:** `react-icons/fa` is already in Next 16's
default `optimizePackageImports` list (verified in `next/dist/server/config.js`),
so the barrel import is tree-shaken — no config change needed.

**Caveat:** true FPS could not be sampled — `requestAnimationFrame` is throttled
while the preview pane is hidden, so the numbers above are structural
(measurable) rather than frame-timing.

## Skiper UI — earlier claim CORRECTED

Previously logged as "paid-only for anything relevant". That was wrong: the
**`/r/<name>.json` path is gated (401), but `/registry/skiper<N>.json` is open**.
A scan of 1–75 found **31 freely installable components**:
`3 4 16 17 19 25 26 28 30 31 34 37 39 40 41 47 48 49 50 51 52 53 54 58 61 62 63 64 65 66 67`

Install: `npx shadcn@latest add https://skiper-ui.com/registry/skiper16.json`

Identified so far — 16: sticky stacking cards on scroll · 17: GSAP ScrollTrigger
sticky cards · 19 & 28: scroll-linked / horizontal-scroll sections · 31:
character scatter-assemble text · 47 & 50: Swiper carousels (coverflow /
creative) · 61: spring mouse-follower · 3: toggle interaction · 25: sound-enabled
interaction (needs `use-sound`).

Note: several pull **GSAP** or **Swiper**; only adopt those if the section
justifies the extra weight.


## Sticky stacking work cards — 2026-08-07

`components/work-stack.tsx` replaces the 2-column work grid. Pattern adapted from
**Skiper UI skiper16 / StickyCard_001** (https://skiper-ui.com, @gurvinder-singh02).

Two changes were required before it was safe to ship:
1. **Removed its `<ReactLenis root>` wrapper.** The site already runs one global
   Lenis instance (`components/smooth-scroll.tsx`); two Lenis roots fight over
   the scroll. Never paste a Skiper scroll component in without checking this.
2. **Reduced-motion path** — `useReducedMotion()` disables the sticky offset and
   the scale transform, degrading to a plain stacked list.

Cost: **one** `useScroll` for the section + one `useTransform` (scale) per card.
Sticky positioning and scale stay on the compositor. Verified after: 5 sticky
cards, `will-change` elements still **0**, tsc clean, production build clean.

### ⚠️ Licensing — Skiper UI free tier
> "Attribution to Skiper UI is required when using the free version.
> No attribution required with Skiper UI Pro."

The attribution block is retained in `work-stack.tsx`. If Actorix wants zero
third-party credit in its source (or a visible credit is unacceptable for a
client-facing brand site), the options are: buy Skiper Pro, or reimplement the
sticky-stack from scratch — the technique itself (position:sticky + scroll-linked
scale) is generic and not owned by anyone. **Flagged to Ajinkya 2026-08-07.**

## Per-component cost verdicts (before adopting any more)

| Component | Verdict | Why |
|---|---|---|
| skiper16 sticky stack | ✅ **shipped** | 1 scroll system + N scale transforms |
| Vengeance spotlight-navbar | ✅ safe | hover-scoped mousemove, contained |
| Vengeance stacked-logos | ✅ safe | static layout |
| skiper61 mouse-follower | ⚠️ guard it | global mousemove; must be gated to `pointer:fine` + reduced-motion, and we already have 2 mousemove listeners (hero aurora, spotlight cards) |
| Vengeance animated-tooltip | ⚠️ wrong target | fine as a component, but attaching tooltips to the *moving* marquee is bad UX — use on static chips instead |
| skiper47 / skiper50 carousels | ⏸ defer | pulls in **Swiper** (~150 KB) for a testimonials section that has no content yet; a framer-only carousel would be lighter |
| skiper31 scatter text | ⏸ short text only | one motion element **per character** — the same pattern that made the GitHub card expensive at 88 nodes |
| skiper28 horizontal scroll | ❌ skip | scroll-hijacking; janky on trackpads, hostile on mobile |
| skiper17 sticky cards (GSAP) | ❌ skip | duplicates skiper16 but adds GSAP + ScrollTrigger |
| Vengeance reveal-loader | ❌ skip | violates our own no-preloader rule — blocking first paint costs conversions (the exact thing criticised on the Weblance reference) |


## Lag between "Built like a product company" and "Selected work" — 2026-08-07

User reported a specific stutter in that band. Two causes, both measured:

**1. Vengeance `AnimatedNumber` (the stats strip) — removed.**
It renders a full **0–9 digit strip for every digit position**, and wraps two
spans per digit in framer's `layout` animation. `layout` is the single most
expensive framer primitive: it measures the DOM (`getBoundingClientRect`) to
compute the animation. Our four stats (5 · 121 · 1,000 · 4) = 9 digit positions
→ ~90 spans and **18 layout-measured elements all animating at once**, triggered
exactly when this band scrolls into view. It also called `getComputedStyle()` in
an effect per digit (forced style recalc).
Replaced with a single framer `animate()` motion value per stat writing to one
text node — no layout animation, no DOM churn, stops when the count ends, and a
cleanup that snaps to the final value so a backgrounded tab can't leave a
half-counted number.

**2. Work-stack images were over-fetched.**
Measured: browser chose the **1920px** candidate for slots rendered at **579px
CSS** (≈1160px needed at DPR 2). Five ~1920×1200 bitmaps decoded simultaneously
inside sticky compositor layers. Tightened `sizes` to
`(min-width: 1280px) 560px, (min-width: 768px) 45vw, 100vw` + `quality={78}`,
which lands on the 1200px candidate — **~2.5× fewer decoded pixels per card**.
(A browser that already cached 1920 keeps it; fresh visitors get 1200.)

### Environment caveat, worth remembering
`requestAnimationFrame` **never fires** while the preview pane is hidden — a rAF
probe here times out rather than returning slow frames. So FPS cannot be sampled
in this setup and JS-driven animations (framer `animate`, springs) appear frozen
at their initial value in screenshots. CSS keyframe animations still render.
Verify JS animations by reading code/DOM state, not by screenshot.
