"use client";

import { Check, Eye, Lock } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

/**
 * The idea form as five steps on one track (a row on desktop, a column on
 * smaller screens). Each step is a small form card whose details are marked
 * public or subscribers-only, and its node gets a "saved" check once the
 * step is done. The markup is the final state, so reduced motion simply
 * shows the finished track.
 */
export function ComposerSteps({ t, image }: ComposerStepsProps) {
  const track = useRef<HTMLDivElement>(null);
  const fields = t.steps.flatMap((step) => step.fields);
  const publicCount = fields.filter((field) => field.layer === "public").length;
  const legend = [
    { label: t.publicLabel, count: publicCount, Icon: Eye, tone: "bg-cyan/15 text-cyan-ink" },
    { label: t.paidLabel, count: fields.length - publicCount, Icon: Lock, tone: "bg-gold/20 text-gold-ink" },
  ];

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", track.current);
      const mm = gsap.matchMedia();
      mm.add({ wide: "(min-width: 1280px)", motionOk: MEDIA.motionOk }, (context) => {
        const { wide, motionOk } = context.conditions as { wide: boolean; motionOk: boolean };
        if (!motionOk) return;

        const play = (timeline: gsap.core.Timeline, step: HTMLElement, at: number) => {
          const q = gsap.utils.selector(step);
          timeline
            .from(q("[data-node]"), { scale: 0.5, autoAlpha: 0, duration: 0.5, ease: "back.out(1.8)" }, at)
            .from(q("[data-card]"), { y: 28, autoAlpha: 0, duration: 0.7 }, at + 0.05)
            .from(q("[data-field]"), { y: 10, autoAlpha: 0, duration: 0.45, stagger: 0.07 }, at + 0.2)
            .from(q("[data-saved]"), { scale: 0, duration: 0.35, ease: "back.out(2.4)" }, at + 0.3);
          // The last step has no link onward.
          const link = q("[data-link]");
          if (link.length) {
            timeline.from(link, wide ? { scaleX: 0, duration: STEP_GAP - 0.2, ease: "none" } : { scaleY: 0, duration: 0.6, ease: "power2.inOut" }, at + 0.2);
          }
        };

        if (wide) {
          // One pass along the row: each link reaches the next node as it appears.
          const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: track.current, start: "top 78%", once: true } });
          steps.forEach((step, i) => play(timeline, step, i * STEP_GAP));
        } else {
          // The column is taller than the screen, so each step plays as it arrives.
          steps.forEach((step) => {
            play(gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: step, start: "top 85%", once: true } }), step, 0);
          });
        }
      });
    },
    { scope: track },
  );

  return (
    <Section tone="surface" aria-labelledby="fi-composer">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <SectionHeading id="fi-composer" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.body} />
          <Reveal>
            <p className="font-mono text-eyebrow text-muted uppercase">{t.accessLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {legend.map(({ label, count, Icon, tone }) => (
                <li key={label} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 ps-1.5 pe-4 text-sm text-ink">
                  <span className={cn("grid size-7 place-items-center rounded-full", tone)}>
                    <Icon aria-hidden className="size-3.5" />
                  </span>
                  {label}
                  <span className="font-mono text-xs text-muted" data-numeric>
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal variant="image" className="relative aspect-16/10 overflow-hidden rounded-3xl bg-navy lg:col-span-5">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </Reveal>
      </div>

      <div ref={track} className="mt-12 lg:mt-16">
        <ol className="grid grid-cols-1 gap-4 xl:grid-cols-5 xl:gap-5">
          {t.steps.map((step, i) => (
            <li key={step.name} data-step className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 xl:flex xl:flex-col xl:items-center xl:gap-6">
              <span data-node className="relative grid size-11 place-items-center rounded-full bg-abyss font-mono text-sm text-white">
                <span className="sr-only">{t.stepLabel} </span>
                <span dir="ltr" data-numeric>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span data-saved className="absolute -inset-e-1 -top-1 grid size-5 place-items-center rounded-full bg-cyan text-abyss ring-2 ring-surface">
                  <Check role="img" aria-label={t.savedLabel} strokeWidth={3} className="size-3" />
                </span>
              </span>

              {/* Link to the next step: down the column, or across the row on desktop. */}
              {i < t.steps.length - 1 ? (
                <span
                  aria-hidden
                  data-link
                  className="absolute inset-s-5.5 top-13 -bottom-2 w-px origin-top bg-field xl:inset-s-[calc(50%+1.875rem)] xl:top-5.5 xl:bottom-auto xl:h-px xl:w-[calc(100%-2.5rem)] xl:origin-left xl:rtl:origin-right"
                />
              ) : null}

              <div data-card className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-4 sm:p-5 xl:w-full xl:flex-1">
                <h3 className="text-h4 text-ink">{step.name}</h3>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
                  {step.fields.map((field) => {
                    const paid = field.layer === "paid";
                    return (
                      <li
                        key={field.label}
                        data-field
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm text-ink",
                          paid ? "border-dashed border-gold/50 bg-gold/5" : "border-line bg-surface",
                        )}
                      >
                        <span className="min-w-0">{field.label}</span>
                        <span className={cn("grid size-6 shrink-0 place-items-center rounded-full", paid ? "bg-gold/20 text-gold-ink" : "bg-cyan/15 text-cyan-ink")}>
                          {paid ? (
                            <Lock role="img" aria-label={t.paidLabel} className="size-3.5" />
                          ) : (
                            <Eye role="img" aria-label={t.publicLabel} className="size-3.5" />
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
