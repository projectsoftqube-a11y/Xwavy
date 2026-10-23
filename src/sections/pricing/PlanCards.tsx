"use client";

import { Check, Lightbulb, TrendingUp } from "lucide-react";
import { useRef, type PointerEvent } from "react";

import { CARD_LIGHT } from "@/components/animation/CardStage";
import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type copy from "@/i18n/pages/pricing";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type PlanCardsProps = {
  t: (typeof copy)["en"]["plans"];
  /** Links for the innovator card and the investor cards. */
  hrefs: { innovator: string; investor: string };
};

/** Lets a card's light follow the pointer (CARD_LIGHT reads --x / --y). */
function followPointer(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const box = card.getBoundingClientRect();
  card.style.setProperty("--x", `${event.clientX - box.left}px`);
  card.style.setProperty("--y", `${event.clientY - box.top}px`);
}

/**
 * The plans as three passes: innovators (free, always), then the investor
 * subscription billed monthly or yearly. Investor prices are not fixed yet
 * (SOW §5), so they read "announced at launch" instead of a number. The
 * passes rise in one after another and a sheen crosses each as it lands;
 * the plan names rise out of a mask; the lists follow.
 */
export function PlanCards({ t, hrefs }: PlanCardsProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: q("[data-passes]")[0],
            start: "top 78%",
            once: true,
          },
        });
        tl.from(q("[data-pass]"), {
          y: 90,
          autoAlpha: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.14,
        })
          .fromTo(
            q("[data-pass-sheen]"),
            { xPercent: -120 },
            {
              xPercent: 120,
              duration: 1.4,
              ease: "power2.inOut",
              stagger: 0.14,
            },
            0.35,
          )
          .from(q("[data-pass-name]"), { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.14 }, 0.3)
          .from(
            q("[data-pass-point]"),
            {
              x: -20,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.04,
            },
            0.6,
          );
      });
    },
    { scope: root },
  );

  const passes = t.cards.map((card, i) => ({
    card,
    investor: i > 0,
    href: i === 0 ? hrefs.innovator : hrefs.investor,
  }));

  return (
    <section ref={root} aria-labelledby="plans-title" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-gold pointer-events-none absolute -bottom-52 end-[-8rem] size-[50rem] opacity-40" />
      <span aria-hidden className="glow-cyan pointer-events-none absolute -top-52 start-[-12rem] size-[40rem] opacity-30" />
      <Container className="relative">
        <CinemaHeading id="plans-title" number="01" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} accentTone="gold" description={t.description} align="center" />

        <div data-passes className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-20 xl:grid-cols-3 xl:gap-6">
          {passes.map(({ card, investor, href }, i) => {
            const Icon = investor ? TrendingUp : Lightbulb;
            return (
              <article
                key={card.name}
                data-pass
                onPointerMove={followPointer}
                className={cn(
                  "group/card relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-9",
                  investor ? "border-glow [--card-fill:var(--color-night-2)]" : "border border-hair bg-night-1 md:col-span-2 xl:col-span-1",
                )}
              >
                <span aria-hidden className={CARD_LIGHT} />
                <span aria-hidden className={cn("absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent", investor ? "via-gold" : "via-cyan")} />
                <span
                  aria-hidden
                  data-pass-sheen
                  className="pointer-events-none absolute inset-y-0 -inset-x-1/2 -translate-x-[120%] skew-x-[-18deg] bg-linear-to-r from-transparent via-white/[0.07] to-transparent motion-reduce:hidden"
                />

                <div className="relative flex flex-wrap items-center justify-between gap-3">
                  <p className={cn("flex items-center gap-2.5 font-display text-base tracking-[0.2em] uppercase", investor ? "text-gold" : "text-cyan")}>
                    <Icon aria-hidden className="size-4" />
                    {card.audience}
                  </p>
                  <span dir="ltr" className="font-display text-[1.75rem] leading-none font-bold stroke-text-hair-strong" data-numeric>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-10 overflow-hidden">
                  <h3 data-pass-name className="font-display text-[clamp(2.75rem,2.2rem+2vw,4rem)] leading-none font-bold text-fog uppercase">
                    {card.name}
                  </h3>
                </div>
                <p className={cn("relative mt-4 font-display text-[1.5rem] leading-tight font-semibold uppercase", investor ? "text-gold" : "text-cyan")}>{investor ? t.priceSoon : card.cadence}</p>
                {investor ? <p className="relative mt-1 text-base text-haze">{card.cadence}</p> : null}
                <p className="relative mt-4 text-base leading-relaxed text-haze">{card.body}</p>

                <ul className="relative mt-8 border-t border-hair">
                  {card.points.map((point) => (
                    <li key={point} data-pass-point className="flex items-start gap-3 border-b border-hair py-3.5 text-base text-fog/90">
                      <Check aria-hidden className={cn("mt-1 size-4 shrink-0", investor ? "text-gold" : "text-cyan")} />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto pt-9">
                  <Button href={href} variant={investor ? "accent" : "primary"} size="lg" arrow className="w-full sm:w-fit">
                    {card.cta}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
