"use client";

import { ArrowLeftRight, AtSign, CalendarDays, Check, Handshake, Lightbulb, Link2, Lock, LockOpen, Mail, Phone, TrendingUp, X } from "lucide-react";
import { useRef } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Container } from "@/components/layout/Container";
import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";
import { ConsentRules } from "@/sections/home/ConsentRules";

type HandshakeStoryProps = { t: Dictionary["home"]["consent"] };

/** One icon per contact field, in the order of t.fields: email, phone, LinkedIn, calendar link. */
const FIELD_ICONS = [Mail, Phone, AtSign, CalendarDays] as const;

/**
 * The double opt-in as a handshake diagram. On desktop the investor (gold)
 * and the innovator (cyan) face each other across a sealed lock; under the
 * lock, the introduction both are waiting for. On phones the same pieces
 * stack in story order, joined by short rails.
 *
 * Scrolling plays it: the investor's card arrives and a gold light travels
 * to the lock; the innovator's card arrives, Accept is pressed and a cyan
 * light travels in from the other side; the lock opens with a flash, a beam
 * drops to the introduction and every contact field flips from sealed to
 * shared. The markup is the final state, so reduced motion shows the outcome.
 */
export function HandshakeStory({ t }: HandshakeStoryProps) {
  const root = useRef<HTMLElement>(null);
  const [asks, decides, introduced] = t.stages;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ wide: `(min-width: 1024px) and ${MEDIA.motionOk}`, narrow: `(max-width: 1023.98px) and ${MEDIA.motionOk}` }, (context) => {
        const wide = Boolean(context.conditions?.wide);
        const rtl = document.documentElement.dir === "rtl";
        const startSide = rtl ? 1 : -1;

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: wide
            ? { trigger: q("[data-diagram]")[0], start: "top 75%", end: "bottom 70%", scrub: 1 }
            : { trigger: q("[data-diagram]")[0], start: "top 70%", once: true },
        });

        timeline
          // The investor asks.
          .from(q("[data-party='investor']"), { x: wide ? startSide * 80 : 0, y: wide ? 0 : 40, autoAlpha: 0, duration: 0.8 }, 0)
          .from(q("[data-note-line]"), { scaleX: 0, duration: 0.5, stagger: 0.1 }, 0.4)
          .from(q("[data-wire='investor']"), { scaleX: 0, scaleY: 0, duration: 0.8, ease: "none" }, 0.7)
          .from(q("[data-orb]"), { scale: 0.6, autoAlpha: 0, duration: 0.8, ease: "back.out(1.8)" }, 0.5)
          // The innovator decides.
          .from(q("[data-party='innovator']"), { x: wide ? -startSide * 80 : 0, y: wide ? 0 : 40, autoAlpha: 0, duration: 0.8 }, 1.3)
          .fromTo(q("[data-accept]"), { scale: 1 }, { scale: 0.9, duration: 0.15, yoyo: true, repeat: 1 }, 2)
          .to(q("[data-decline]"), { autoAlpha: 0.35, duration: 0.3 }, 2.2)
          .from(q("[data-wire='innovator']"), { scaleX: 0, scaleY: 0, duration: 0.8, ease: "none" }, 2.1)
          // The lock opens.
          .fromTo(q("[data-sealed]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, 2.9)
          .from(q("[data-open]"), { autoAlpha: 0, scale: 0.6, duration: 0.4, ease: "back.out(2)" }, 2.95)
          .from(q("[data-orb-flash]"), { scale: 0.5, autoAlpha: 0, duration: 0.6, ease: "expo.out" }, 2.95)
          // Both are introduced.
          .from(q("[data-wire='result']"), { scaleY: 0, duration: 0.6, ease: "none" }, 3.3)
          .from(q("[data-party='result']"), { y: 50, autoAlpha: 0, duration: 0.8 }, 3.6)
          .from(q("[data-exchange-line]"), { scaleX: 0, duration: 0.7, ease: "power2.inOut" }, 3.8)
          .fromTo(q("[data-result-sealed]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, 4)
          .from(q("[data-result-open]"), { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: "back.out(2)" }, 4.05)
          .fromTo(q("[data-field-sealed]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2, stagger: 0.1 }, 4.1)
          .from(q("[data-field-open]"), { autoAlpha: 0, scale: 0.4, duration: 0.4, stagger: 0.1, ease: "back.out(2.5)" }, 4.15);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="optin-title" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-cyan pointer-events-none absolute top-1/2 left-1/2 size-[60rem] -translate-1/2 opacity-40" />

      <Container className="relative">
        <CinemaHeading id="optin-title" number="03" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} align="center" />
        <p className="mx-auto mt-8 max-w-2xl text-center text-lead text-haze">{t.body}</p>

        {/* The diagram. Illustrative; the stage titles and details carry its meaning in text. */}
        <div data-diagram className="relative mt-20 grid grid-cols-1 justify-items-center gap-12 lg:mt-28 lg:grid-cols-[1fr_20rem_1fr] lg:items-stretch lg:gap-0">
          {/* The investor asks. */}
          <article data-party="investor" className="panel-night relative w-full max-w-xl rounded-3xl p-6 sm:p-7 lg:max-w-none">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-gold text-night shadow-[0_0_30px_rgb(255_181_71/0.4)]">
                <TrendingUp aria-hidden className="size-5" />
              </span>
              <p className="font-display text-base tracking-[0.2em] text-gold uppercase">{t.investorRole}</p>
            </div>
            <h3 className="mt-5 font-display text-[1.75rem] leading-none font-semibold text-fog uppercase">{asks?.label}</h3>
            <p className="mt-3 text-base text-haze">{asks?.detail}</p>
            <div aria-hidden className="mt-5 flex flex-col gap-2 rounded-2xl border border-hair bg-night-1 p-4">
              <span data-note-line className="h-2 w-11/12 origin-left rounded-full bg-white/15 rtl:origin-right" />
              <span data-note-line className="h-2 w-3/4 origin-left rounded-full bg-white/15 rtl:origin-right" />
              <span data-note-line className="h-2 w-1/2 origin-left rounded-full bg-white/15 rtl:origin-right" />
            </div>
          </article>

          {/* The lock, between them. Below lg it sits after the innovator, in story order. */}
          <div className="relative flex w-full items-center justify-center max-lg:order-3 lg:h-full">
            {/* Desktop wires: gold from the investor, cyan from the innovator. */}
            <span aria-hidden className="absolute top-1/2 start-0 hidden h-px w-[calc(50%-5.5rem)] bg-hair-strong lg:block" />
            <span aria-hidden data-wire="investor" className="absolute top-1/2 start-0 hidden h-0.5 w-[calc(50%-5.5rem)] origin-left bg-gold shadow-[0_0_12px_rgb(255_181_71/0.8)] lg:block rtl:origin-right" />
            <span aria-hidden className="absolute top-1/2 end-0 hidden h-px w-[calc(50%-5.5rem)] bg-hair-strong lg:block" />
            <span aria-hidden data-wire="innovator" className="absolute top-1/2 end-0 hidden h-0.5 w-[calc(50%-5.5rem)] origin-right bg-cyan shadow-[0_0_12px_rgb(0_225_234/0.8)] lg:block rtl:origin-left" />

            <div data-orb className="relative grid size-44 place-items-center">
              {/* A slowly turning ring of both colours. */}
              <span aria-hidden className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--color-gold),transparent_30%,var(--color-cyan)_50%,transparent_80%,var(--color-gold))] p-0.5 [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]" />
              <span aria-hidden data-orb-flash className="absolute inset-3 rounded-full bg-cyan/20 blur-xl" />
              <span className="relative grid size-36 place-items-center rounded-full border border-hair-strong bg-night-1 text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]">
                <span className="flex flex-col items-center gap-2">
                  <span className="relative grid size-14 place-items-center rounded-full bg-white/[0.06]">
                    <Lock aria-hidden data-sealed className="absolute size-6 text-haze opacity-0" />
                    <LockOpen aria-hidden data-open className="size-6 text-cyan" />
                  </span>
                  <span className="grid max-w-28 text-base leading-tight font-medium">
                    <span data-sealed className="col-start-1 row-start-1 text-haze opacity-0">
                      {t.sealed}
                    </span>
                    <span data-open className="col-start-1 row-start-1 text-cyan">
                      {t.revealed}
                    </span>
                  </span>
                </span>
              </span>
            </div>

            {/* Beam down to the introduction (desktop). */}
            <span aria-hidden className="absolute top-[calc(50%+5.5rem)] -bottom-36 left-1/2 hidden w-px -translate-x-1/2 bg-hair-strong lg:block" />
            <span aria-hidden data-wire="result" className="absolute top-[calc(50%+5.5rem)] -bottom-36 left-1/2 hidden w-0.5 -translate-x-1/2 origin-top bg-linear-to-b from-cyan to-gold shadow-[0_0_12px_rgb(0_225_234/0.8)] lg:block" />
          </div>

          {/* The innovator decides. */}
          <article data-party="innovator" className="panel-night relative w-full max-w-xl rounded-3xl p-6 max-lg:order-2 sm:p-7 lg:max-w-none">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-cyan text-night shadow-[0_0_30px_rgb(0_225_234/0.4)]">
                <Lightbulb aria-hidden className="size-5" />
              </span>
              <p className="font-display text-base tracking-[0.2em] text-cyan uppercase">{t.innovatorRole}</p>
            </div>
            <h3 className="mt-5 font-display text-[1.75rem] leading-none font-semibold text-fog uppercase">{decides?.label}</h3>
            <p className="mt-3 text-base text-haze">{decides?.detail}</p>
            <div aria-hidden className="mt-5 flex flex-wrap gap-2">
              <span data-accept className="inline-flex items-center gap-1.5 rounded-(--radius-control) bg-cyan px-4 py-2.5 text-base font-semibold text-night shadow-[0_0_0_6px_rgb(0_225_234/0.16)]">
                <Check className="size-4" />
                {t.accept}
              </span>
              <span data-decline className="inline-flex items-center gap-1.5 rounded-(--radius-control) border border-hair-strong px-4 py-2.5 text-base text-haze">
                <X className="size-4" />
                {t.decline}
              </span>
            </div>
          </article>

          {/* Both are introduced: one status for the card, the exchange, and the four details as single-line chips. */}
          <article
            data-party="result"
            className="panel-night relative w-full max-w-5xl overflow-hidden rounded-3xl p-6 max-lg:order-4 sm:p-8 lg:col-span-3 lg:mt-36"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-gold via-cyan to-gold opacity-70" />
            <span aria-hidden className="glow-cyan pointer-events-none absolute -top-40 left-1/2 size-[30rem] -translate-x-1/2 opacity-50" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-fog text-night shadow-[0_0_0_6px_rgb(0_225_234/0.12),0_0_40px_rgb(0_225_234/0.35)]">
                  <Handshake aria-hidden className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.75rem,1.5rem+1vw,2.25rem)] leading-none font-semibold text-fog uppercase">{introduced?.label}</h3>
                  <p className="mt-2 max-w-md text-base text-haze">{introduced?.detail}</p>
                </div>
              </div>
              <span className="grid shrink-0 self-start">
                <span data-result-sealed className="col-start-1 row-start-1 inline-flex items-center gap-2 rounded-full border border-hair-strong px-4 py-2 text-base whitespace-nowrap text-haze opacity-0">
                  <Lock aria-hidden className="size-4" />
                  {t.sealed}
                </span>
                <span data-result-open className="col-start-1 row-start-1 inline-flex items-center gap-2 rounded-full bg-cyan px-4 py-2 text-base font-semibold whitespace-nowrap text-night">
                  <LockOpen aria-hidden className="size-4" />
                  {t.revealed}
                </span>
              </span>
            </div>

            {/* The exchange: both directions at once. Decorative; left out on the narrowest phones. */}
            <div aria-hidden className="relative mt-7 hidden items-center gap-3 min-[420px]:flex">
              <span className="inline-flex shrink-0 items-center gap-2 font-display text-base tracking-[0.16em] text-gold uppercase">
                <span className="size-2 rounded-full bg-gold" />
                {t.investorRole}
              </span>
              <span className="relative h-px flex-1 bg-hair-strong">
                <span data-exchange-line className="absolute inset-0 origin-left bg-linear-to-r from-gold to-cyan rtl:origin-right rtl:bg-linear-to-l" />
              </span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-hair-strong text-fog">
                <ArrowLeftRight className="size-4" />
              </span>
              <span className="relative h-px flex-1 bg-hair-strong">
                <span data-exchange-line className="absolute inset-0 origin-right bg-linear-to-r from-gold to-cyan rtl:origin-left rtl:bg-linear-to-l" />
              </span>
              <span className="inline-flex shrink-0 items-center gap-2 font-display text-base tracking-[0.16em] text-cyan uppercase">
                {t.innovatorRole}
                <span className="size-2 rounded-full bg-cyan" />
              </span>
            </div>

            <ul className="relative mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
              {t.fields.map((field, i) => {
                const Icon = FIELD_ICONS[i] ?? Link2;
                return (
                  <li key={field} className="flex items-center gap-3 rounded-2xl border border-hair-strong bg-night-1/80 px-3.5 py-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan">
                      <Icon aria-hidden className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-base text-fog">{field}</span>
                    {/* Sealed, then shared: the lock becomes a tick. */}
                    <span className="grid shrink-0">
                      <Lock aria-hidden data-field-sealed className="col-start-1 row-start-1 size-4 text-dim opacity-0" />
                      <span data-field-open className="col-start-1 row-start-1 grid size-5 place-items-center rounded-full bg-cyan text-night">
                        <Check aria-hidden className="size-3.5" strokeWidth={3} />
                        <span className="sr-only">{t.revealed}</span>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </article>
        </div>

        {/* The rules that keep it fair. */}
        <div className="mt-20 lg:mt-28">
          <ConsentRules rules={t.rules} />
        </div>
      </Container>
    </section>
  );
}
