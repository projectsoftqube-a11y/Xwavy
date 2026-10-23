"use client";

import { Check, Lightbulb, TrendingUp } from "lucide-react";
import { useId, useRef, type KeyboardEvent } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { CycleToggle } from "@/components/animation/CycleToggle";
import { useAutoCycle } from "@/components/animation/useAutoCycle";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/get-dictionary";
import type pricingCopy from "@/i18n/pages/pricing";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type Plans = (typeof pricingCopy)["en"]["plans"];

type PlanShowcaseProps = {
  pricing: Dictionary["home"]["pricing"];
  access: Dictionary["home"]["access"];
  /** The Pricing page's plans: the free plan, then monthly and annual. */
  plans: Plans;
  innovatorHref: string;
  pricingHref: string;
  /** Pause / play for the billing periods playing in turn. */
  controls: { play: string; pause: string };
};

/**
 * Pricing as two plan cards. Innovators: free, always, with what that
 * includes. Investors: the subscription, with a Monthly / Annual switch,
 * price "announced at launch" (Wavy Solutions has not fixed prices), and a
 * light circling its border. Cards rise in, their lists after them. The two
 * billing periods play in turn (useAutoCycle); the ring around the pause
 * button fills with each one's time.
 */
export function PlanShowcase({ pricing, access, plans, innovatorHref, pricingHref, controls }: PlanShowcaseProps) {
  const root = useRef<HTMLElement>(null);
  const switchId = useId();
  const [free, monthly, annual] = plans.cards;
  const periods = [monthly, annual].filter((plan): plan is NonNullable<typeof plan> => Boolean(plan));
  const cycle = useAutoCycle<HTMLElement>({ count: Math.max(periods.length, 1), seconds: 5 });
  const period = cycle.active;
  const investor = periods[period] ?? periods[0];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: periods.length - 1 };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = (target + periods.length) % periods.length;
    cycle.select(next);
    tabs.current[next]?.focus();
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const once = { trigger: q("[data-plans]")[0], start: "top 78%", once: true };
        gsap.from(q("[data-plan-card]"), { y: 80, autoAlpha: 0, duration: 1.3, ease: "expo.out", stagger: 0.15, scrollTrigger: once });
        gsap.from(q("[data-plan-point]"), { x: -24, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.05, delay: 0.45, scrollTrigger: once });
        gsap.from(q("[data-plan-price]"), { yPercent: 60, autoAlpha: 0, duration: 1.2, ease: "expo.out", stagger: 0.15, delay: 0.3, scrollTrigger: once });
      });
    },
    { scope: root },
  );

  if (!free || !investor) return null;

  return (
    <section ref={root} aria-labelledby="plans-title" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-gold pointer-events-none absolute -bottom-40 end-[-10rem] size-[48rem] opacity-50" />
      <Container className="relative">
        <CinemaHeading id="plans-title" number="04" eyebrow={pricing.eyebrow} title={pricing.headingLead} accent={pricing.headingAccent} description={plans.description} />

        <div data-plans className="mt-16 grid grid-cols-1 gap-6 lg:mt-24 lg:grid-cols-2">
          {/* Innovators. */}
          <article data-plan-card className="relative flex flex-col overflow-hidden rounded-3xl border border-hair bg-night-1 p-7 sm:p-10">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan to-transparent" />
            <div className="flex items-center justify-between gap-4">
              <p className="flex items-center gap-3 font-display text-base tracking-[0.2em] text-cyan uppercase">
                <Lightbulb aria-hidden className="size-4" />
                {free.audience}
              </p>
              <span className="rounded-full border border-cyan/30 px-3 py-1 text-base text-cyan">{free.cadence}</span>
            </div>
            <div className="mt-10 overflow-hidden">
              <p data-plan-price className="font-display text-[clamp(3.5rem,2.5rem+4vw,5rem)] leading-none font-bold text-fog uppercase">
                {free.name}
              </p>
            </div>
            <p className="mt-6 text-lead text-haze">{pricing.body}</p>

            <ul className="mt-10 border-t border-hair">
              {free.points.map((point) => (
                <li key={point} data-plan-point className="flex items-start gap-3 border-b border-hair py-4 text-fog/90">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-cyan" />
                  {point}
                </li>
              ))}
            </ul>

            <Button href={innovatorHref} size="lg" variant="primary" arrow className="mt-10 w-full sm:w-fit">
              {free.cta}
            </Button>
          </article>

          {/* Investors. */}
          <article ref={cycle.root} data-plan-card className="border-glow relative flex flex-col overflow-hidden rounded-3xl p-7 [--card-fill:var(--color-night-2)] sm:p-10">
            <span aria-hidden className="glow-gold pointer-events-none absolute -top-40 end-[-8rem] size-[30rem] opacity-60" />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-3 font-display text-base tracking-[0.2em] text-gold uppercase">
                <TrendingUp aria-hidden className="size-4" />
                {investor.audience}
              </p>

              {/* Monthly / Annual, playing in turn. */}
              <div className="flex items-center gap-2">
                <div
                  role="tablist"
                  aria-labelledby={`${switchId}-label`}
                  className="relative grid grid-cols-2 rounded-full border border-hair-strong bg-night p-1 [--switch-shift:100%] rtl:[--switch-shift:-100%]"
                >
                  <span id={`${switchId}-label`} className="sr-only">
                    {plans.periodLabel}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-y-1 start-1 w-[calc(50%-0.25rem)] rounded-full bg-gold transition-transform duration-500 ease-brand"
                    style={{ transform: `translateX(${period === 0 ? "0%" : "var(--switch-shift)"})` }}
                  />
                  {periods.map((plan, i) => (
                    <button
                      key={plan.name}
                      ref={(node) => {
                        tabs.current[i] = node;
                      }}
                      id={`${switchId}-tab-${i}`}
                      type="button"
                      role="tab"
                      aria-selected={period === i}
                      aria-controls={`${switchId}-panel`}
                      tabIndex={period === i ? 0 : -1}
                      onClick={() => cycle.select(i)}
                      onKeyDown={(event) => onKeyDown(event, i)}
                      className={cn("relative z-10 min-h-9 min-w-24 rounded-full px-4 text-base font-medium transition-colors duration-300", period === i ? "text-night" : "text-haze hover:text-fog")}
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>
                {cycle.autoplay ? <CycleToggle playing={cycle.playing} onToggle={cycle.toggle} labels={controls} tone="gold" /> : null}
              </div>
            </div>

            <div id={`${switchId}-panel`} role="tabpanel" aria-labelledby={`${switchId}-tab-${period}`} aria-live={cycle.running ? "off" : "polite"} className="relative">
              <div className="relative mt-10 overflow-hidden">
                <p data-plan-price className="font-display text-[clamp(2.75rem,2rem+3vw,4.75rem)] leading-none font-bold text-gold uppercase">
                  {plans.priceSoon}
                </p>
              </div>
              <p className="relative mt-4 text-base tracking-wide text-haze">
                <span key={investor.cadence} className="inline-block animate-[fade-up_0.5s_var(--ease-brand)]">
                  {investor.cadence}
                </span>
              </p>
              <p key={investor.body} className="relative mt-3 animate-[fade-up_0.5s_var(--ease-brand)] text-lead text-haze">
                {investor.body}
              </p>

              <ul className="relative mt-10 border-t border-hair">
                {investor.points.map((point) => (
                  <li key={point} data-plan-point className="flex items-start gap-3 border-b border-hair py-4 text-fog/90">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-gold" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start 2xl:flex-row 2xl:items-center">
              <Button href={pricingHref} size="lg" variant="accent" arrow className="w-full sm:w-fit">
                {access.cta}
              </Button>
              <p className="max-w-xs text-base text-dim">{access.note}</p>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
