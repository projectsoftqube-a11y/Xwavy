# Xwavy website

Public marketing website for Xwavy, "Where ideas meet investment": a
marketplace where innovators post ideas free and investors subscribe to see the
full picture and request introductions (double opt-in).

**Scope: website only.** The portal (sign-up, dashboards, admin, payments) is a
separate product. This site links into it through `portalLinks` in
`src/config/site.ts`.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, GSAP +
ScrollTrigger + SplitText, Lenis and Framer Motion. Arabic and English with
full RTL.

## Commands

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Development server on http://localhost:3000         |
| `npm run build`     | Production build                                    |
| `npm start`         | Serve the production build                          |
| `npm run lint`      | ESLint (flat config; `next lint` no longer exists)  |
| `npm run typecheck` | Generate route types, then `tsc --noEmit`           |

## Environment

| Variable   | Purpose                                                                       |
| ---------- | ----------------------------------------------------------------------------- |
| `SITE_URL` | Production origin; enables absolute canonical/hreflang URLs (`metadataBase`). |

Portal addresses (sign in, sign up, idea directory) are set in
`src/config/site.ts`. They point at the current xwavy.com until the new
portal's addresses are confirmed.

## Pages

`/en/...` and `/ar/...` for each of: home, how-it-works, for-innovators,
for-investors, pricing, about, contact, ideas, legal and `legal/[slug]`
(terms, privacy, cookies, acceptable-use, no-advice-disclaimer). Short legal
URLs (`/en/terms` …) and the old sign-in/sign-up paths are redirects in
`next.config.ts`.

## Languages

- Every page lives under `src/app/[lang]/` and is served at `/en/...` and `/ar/...`.
- `src/proxy.ts` redirects un-prefixed URLs: saved choice (cookie) → Saudi
  visitors to Arabic (hosting geo header) → browser language → English.
- Shared copy (header, footer, home) lives in `src/i18n/dictionaries/en.ts`
  and `ar.ts`. Each inner page has its own copy file in `src/i18n/pages/`
  exporting `{ en, ar }`, read with `pageCopy(copy)`.
- Arabic is always typed against English (`Dictionary` / `typeof en`), so a
  missing key fails the type check. **The Arabic and the legal texts are
  drafts** pending Wavy Solutions' approval and legal review.
- Keep "Xwavy" and "Wavy Solutions" in Latin script in Arabic copy.
- Use logical utilities (`ps-`, `pe-`, `ms-`, `inset-s-`, `border-s`, `text-start`)
  and add `rtl:-scale-x-100` to directional icons.

## Where things live

```
src/
  app/[lang]/        root layout (fonts, metadata, providers, header/footer) and pages
  app/globals.css    design tokens and base styles
  app/*.png|ico      favicon, app icon and Apple touch icon (Next file conventions)
  proxy.ts           locale redirect
  i18n/              locale config, dictionaries (en, ar), per-page copy (pages/)
  components/
    animation/       SmoothScrollProvider (Lenis), MotionProvider, Reveal
    layout/          Container (1520px cap, 90% from 1600px), Section, SiteFooter
    navigation/      SiteHeader, MobileMenu, LanguageSwitcher
    sections/        shared page sections: PageHero, CardGrid, StepRow,
                     SplitFeature, CompareTable, DetailTable, Statement,
                     FaqSection, CtaPanel
    ui/              Button, Eyebrow, SectionHeading
  sections/          page-specific sections (home, pricing, contact, legal)
  config/site.ts     name, email, logo, portal links
  lib/               gsap (single import point), motion constants, href and
                     metadata helpers, cn
public/
  brand/             logo
  images/people/     all photography (male Emirati cast)
docs/
  client/            Scope of Work (original .docx and text) and clarifications letter
  image-brief.md     prompts and placement for every photograph (v2)
```

## Design system

- **Colours (solid only, no gradients):** abyss/navy dark surfaces, wave cyan
  (matches the logo, innovator actions) and capital gold (investor actions).
  Use `cyan-ink` / `gold-ink` for text on light backgrounds.
- **Type:** Kalam headings (accent words in the same face, set apart by
  colour), Google Sans for descriptions, body and UI text, Geist Mono labels.
  Arabic falls through to Alexandria (headings) and IBM Plex Sans Arabic
  (text) automatically.
- **House style:** soft tinted page, sections as inset rounded panels
  (`.panel`, with a gap between neighbours), eyebrows with a leading rule
  (`Eyebrow`), pill buttons with an arrow chip (`<Button arrow>`), floating
  dark header.
- **Container:** content max 1520px (90% of the width from 1600px) with fluid 16–64px gutters.

## Animation

Simple and calm by design: entrances only, plus a gentle photo drift.

- `Reveal` (scroll-triggered, once): `stagger` for lists and grids,
  `variant="image"` for photos (soft wipe, settle, slight drift).
  `SectionHeading` animates itself.
- Heroes animate on load; elements marked `data-intro` are hidden by CSS
  before hydration (no flash) with a 2.5s safety fallback.
- Transform, opacity and clip only. GSAP owns scroll animation; Framer Motion
  owns local UI state (menu, accordion). Import from `@/lib/gsap`, animate in
  `useGSAP({ scope })` and gate with `gsap.matchMedia()` + `MEDIA.motionOk`.
- Lenis runs on the GSAP ticker; `useLenis()` to stop/start (the mobile menu does).
- Reduced motion: no animation, native-feel scrolling.

## Content rules

- Copy comes from the client documents in `docs/client/`. The old xwavy.com
  content is dummy data (clarifications §6.1): no figures, people,
  testimonials or listings from it.
- Do not invent statistics, prices, testimonials, team members or category
  names. Plan prices, quotas and the twelve categories are pending from Wavy
  Solutions; live counters and featured ideas need real platform data.
- Don't name the payment provider or claim certifications; figures supplied by
  innovators are "as reported by the innovator".
