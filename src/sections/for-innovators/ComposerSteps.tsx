"use client";

import { Check, Eye, Lock } from "lucide-react";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";

import { CARD_LIGHT } from "@/components/animation/CardStage";
import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";
import type copy from "@/i18n/pages/for-innovators";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type ComposerStepsProps = {
  t: (typeof copy)["en"]["composer"];
  image: { src: string; alt: string };
};

/** Seconds between one step and the next on the desktop track. */
const STEP_GAP = 0.4;

/** Lets a card's light follow the pointer (CARD_LIGHT reads --x / --y). */
function followPointer(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const box = card.getBoundingClientRect();
  card.style.setProperty("--x", `${event.clientX - box.left}px`);
  card.style.setProperty("--y", `${event.clientY - box.top}px`);
}

/**
 * The idea form as five steps on one glowing track (a row on desktop, a
 * column on smaller screens). Each step is a card whose details are marked
 * public (cyan) or subscribers-only (gold), and its node gets a "saved"
 * check once the step is done. The track's line fills from cyan to gold as
 * the steps play in. The markup is the final state, so reduced motion simply
 * shows the finished track.
 */
export function ComposerSteps({ t, image }: ComposerStepsProps) {
  const track = useRef<HTMLDivElement>(null);
  const fields = t.steps.flatMap((step) => step.fields);
  const publicCount = fields.filter((field) => field.layer === "public").length;
  const legend = [
    {
      label: t.publicLabel,
      count: publicCount,
      Icon: Eye,
      tone: "border-cyan/40 text-cyan",
      bar: "bg-cyan",
    },
    {
      label: t.paidLabel,
      count: fields.length - publicCount,
      Icon: Lock,
      tone: "border-gold/40 text-gold",
      bar: "bg-gold",
    },
  ];

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", track.current);
      const mm = gsap.matchMedia();
      mm.add({ wide: "(min-width: 1280px)", motionOk: MEDIA.motionOk }, (context) => {
        const { wide, motionOk } = context.conditions as {
          wide: boolean;
          motionOk: boolean;
        };
        if (!motionOk) return;

        const play = (timeline: gsap.core.Timeline, step: HTMLElement, at: number) => {
          const q = gsap.utils.selector(step);
          timeline
            .from(
              q("[data-node]"),
              {
                scale: 0.4,
                autoAlpha: 0,
                duration: 0.6,
                ease: "back.out(1.8)",
              },
              at,
            )
            .from(q("[data-card]"), { y: 40, autoAlpha: 0, duration: 0.9, ease: "expo.out" }, at + 0.05)
            .from(q("[data-field]"), { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.06 }, at + 0.2)
            .from(q("[data-saved]"), { scale: 0, duration: 0.35, ease: "back.out(2.4)" }, at + 0.35);
          // The last step has no link onward.
          const link = q("[data-link]");
          if (link.length) {
            timeline.from(link, wide ? { scaleX: 0, duration: STEP_GAP, ease: "none" } : { scaleY: 0, duration: 0.6, ease: "power2.inOut" }, at + 0.2);
          }
        };

        if (wide) {
          // One pass along the row: each link reaches the next node as it appears.
          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: track.current,
              start: "top 78%",
              once: true,
            },
          });
          steps.forEach((step, i) => play(timeline, step, i * STEP_GAP));
        } else {
          // The column is taller than the screen, so each step plays as it arrives.
          steps.forEach((step) => {
            play(
              gsap.timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: {
                  trigger: step,
                  start: "top 85%",
                  once: true,
                },
              }),
              step,
              0,
            );
          });
        }
      });
    },
    { scope: track },
  );

  return (
    <section aria-labelledby="fi-composer" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-cyan pointer-events-none absolute -top-56 end-[-10rem] size-[44rem] opacity-30" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <CinemaHeading id="fi-composer" number="01" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.body} size="md" />
            <Reveal>
              <p className="font-display text-base tracking-[0.16em] text-dim uppercase">{t.accessLabel}</p>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {legend.map(({ label, count, Icon, tone, bar }) => (
                  <li key={label} className="relative overflow-hidden rounded-2xl border border-hair bg-night-1 p-4">
                    <span aria-hidden className={cn("absolute inset-y-0 start-0 w-0.5", bar)} />
                    <span className="flex items-center gap-3">
                      <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border", tone)}>
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1 text-base text-fog">{label}</span>
                      <span className="font-display text-[2rem] leading-none font-bold stroke-text-fog" data-numeric>
                        {String(count).padStart(2, "0")}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal variant="image" className="relative aspect-16/10 overflow-hidden rounded-3xl border border-hair bg-night-1 lg:col-span-5">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            <span aria-hidden className="absolute inset-0 bg-linear-to-t from-night/60 via-transparent to-transparent" />
          </Reveal>
        </div>

        <div ref={track} className="mt-14 lg:mt-20">
          <ol className="grid grid-cols-1 gap-5 xl:grid-cols-5 xl:gap-5">
            {t.steps.map((step, i) => {
              const last = i === t.steps.length - 1;
              return (
                <li key={step.name} data-step className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-4 xl:flex xl:flex-col xl:items-center xl:gap-7">
                  <span
                    data-node
                    className={cn(
                      "relative z-1 grid size-12 place-items-center rounded-full border bg-night font-display text-[1.125rem] font-semibold",
                      last ? "border-gold/60 text-gold shadow-[0_0_30px_-6px_rgb(255_181_71/0.7)]" : "border-cyan/50 text-cyan shadow-[0_0_30px_-6px_rgb(0_225_234/0.6)]",
                    )}
                  >
                    <span className="sr-only">{t.stepLabel} </span>
                    <span dir="ltr" data-numeric>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span data-saved className="absolute -inset-e-1 -top-1 grid size-5 place-items-center rounded-full bg-cyan text-night ring-2 ring-night">
                      <Check role="img" aria-label={t.savedLabel} strokeWidth={3} className="size-3" />
                    </span>
                  </span>

                  {/* Link to the next step: down the column, or across the row on desktop. */}
                  {!last ? (
                    <span
                      aria-hidden
                      data-link
                      className="absolute inset-s-6 top-14 -bottom-3 w-px origin-top bg-linear-to-b from-cyan/70 to-gold/50 xl:inset-s-[calc(50%+2rem)] xl:top-6 xl:bottom-auto xl:h-px xl:w-[calc(100%-2.75rem)] xl:origin-left xl:bg-linear-to-r xl:rtl:origin-right xl:rtl:bg-linear-to-l"
                    />
                  ) : null}

                  <div
                    data-card
                    onPointerMove={followPointer}
                    className="group/card relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-hair bg-night-1 p-5 transition-colors duration-500 hover:border-hair-strong xl:w-full xl:flex-1"
                  >
                    <span aria-hidden className={CARD_LIGHT} />
                    <h3 className="relative font-display text-[1.375rem] leading-tight font-semibold text-fog uppercase">{step.name}</h3>
                    <ul className="relative grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
                      {step.fields.map((field) => {
                        const paid = field.layer === "paid";
                        return (
                          <li
                            key={field.label}
                            data-field
                            className={cn(
                              "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-base",
                              paid ? "border-dashed border-gold/35 bg-gold/[0.05] text-fog" : "border-hair bg-white/[0.03] text-fog",
                            )}
                          >
                            <span className="min-w-0">{field.label}</span>
                            <span className={cn("grid size-6 shrink-0 place-items-center rounded-full", paid ? "bg-gold/15 text-gold" : "bg-cyan/15 text-cyan")}>
                              {paid ? <Lock role="img" aria-label={t.paidLabel} className="size-3.5" /> : <Eye role="img" aria-label={t.publicLabel} className="size-3.5" />}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
