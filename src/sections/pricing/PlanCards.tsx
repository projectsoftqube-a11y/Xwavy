"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Lightbulb, TrendingUp } from "lucide-react";
import { useId, useState } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/pricing";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion";

type PlanCardsProps = {
  t: (typeof copy)["en"]["plans"];
  /** Links for the innovator card and the investor card. */
  hrefs: { innovator: string; investor: string };
};

/**
 * Two plans side by side: innovators (free, always) and one investor
 * subscription with a Monthly / Annual switch, instead of two near-identical
 * cards. Investor prices are not fixed yet (SOW §5), so they read "announced
 * at launch" instead of a number.
 */
export function PlanCards({ t, hrefs }: PlanCardsProps) {
  const [free, monthly, annual] = t.cards;
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");
  const groupId = useId();
  if (!free || !monthly || !annual) return null;
  const plan = period === "monthly" ? monthly : annual;

  return (
    <Section tone="surface" aria-labelledby="plans-title">
      <SectionHeading id="plans-title" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.description} />

      <Reveal stagger className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[2fr_3fr]">
        {/* Innovators: free, always. */}
        <article className="flex flex-col gap-6 rounded-3xl border border-line bg-white p-7 sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3 py-1.5 font-mono text-eyebrow text-cyan-ink uppercase">
              <Lightbulb aria-hidden className="size-3.5" />
              {free.audience}
            </p>
            <p className="text-sm text-muted">{free.cadence}</p>
          </div>
          <div>
            <h3 className="text-h3 text-ink">{free.name}</h3>
            <p className="mt-2 font-heading text-[clamp(3.5rem,7vw,5rem)] leading-none font-bold tracking-tighter text-cyan-ink" data-numeric>
              {free.price}
            </p>
            <p className="mt-3 text-body">{free.body}</p>
          </div>
          <ul className="flex flex-col gap-3 border-t border-line pt-6">
            {free.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[0.9375rem] text-body">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-cyan-ink" />
                {point}
              </li>
            ))}
          </ul>
          <Button href={hrefs.innovator} variant="primary" size="lg" arrow className="mt-auto w-fit">
            {free.cta}
          </Button>
        </article>

        {/* Investors: one subscription, billed monthly or yearly. */}
        <article className="surface-abyss bg-grid flex flex-col gap-6 rounded-3xl p-7 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 font-mono text-eyebrow text-gold uppercase">
              <TrendingUp aria-hidden className="size-3.5" />
              {monthly.audience}
            </p>
            <div role="radiogroup" aria-label={t.periodLabel} className="inline-flex rounded-full border border-white/12 bg-white/5 p-1">
              {(["monthly", "annual"] as const).map((key) => {
                const option = key === "monthly" ? monthly : annual;
                const selected = period === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setPeriod(key)}
                    className={cn("relative min-h-9 rounded-full px-4 text-sm font-medium transition-colors", selected ? "text-abyss" : "text-mist hover:text-white")}
                  >
                    {selected ? (
                      <motion.span layoutId={`${groupId}-thumb`} transition={{ duration: DURATION.slow, ease: EASE.brand }} className="absolute inset-0 rounded-full bg-gold" />
                    ) : null}
                    <span className="relative">{option.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={period}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: DURATION.base, ease: EASE.brand }}
              >
                <h3 className="text-h3 text-white">{plan.name}</h3>
                <p className="mt-2 font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold tracking-[-0.03em] text-gold">{t.priceSoon}</p>
                <p className="mt-1 text-sm text-mist">{plan.cadence}</p>
                <p className="mt-3 text-mist">{plan.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <ul className="grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
            {plan.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[0.9375rem] text-mist">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-gold" />
                {point}
              </li>
            ))}
          </ul>
          <Button href={hrefs.investor} variant="accent" size="lg" arrow className="mt-auto w-fit">
            {plan.cta}
          </Button>
        </article>
      </Reveal>
    </Section>
  );
}
