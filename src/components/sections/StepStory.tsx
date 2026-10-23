"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useId, type KeyboardEvent, type ReactNode } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { CycleToggle } from "@/components/animation/CycleToggle";
import { Reveal } from "@/components/animation/Reveal";
import { useAutoCycle } from "@/components/animation/useAutoCycle";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion";

export type StoryStep = {
  name: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
  /** Short status shown on the photo, e.g. "Published". */
  status: string;
  /** Icon element for the status card (an element, so server pages can pass it). */
  icon: ReactNode;
};

type StepStoryProps = {
  /** Section number shown before the eyebrow, e.g. "02". */
  number?: string;
  id: string;
  sectionId?: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  description?: string;
  steps: readonly StoryStep[];
  labels: { step: string; of: string; play: string; pause: string };
  /** Kept for compatibility: the section sits on night. */
  tone?: "white" | "surface";
};

/** Seconds each step stays on screen while the story plays. */
const STEP_SECONDS = 6;

/**
 * A step-by-step story on night: the steps as a list on the start side, a
 * large photograph with a live status card on the end side. While the
 * section is on screen the steps play in turn (useAutoCycle), the active
 * step's line filling gold as its time runs; the pause button or keyboard
 * focus holds them (WCAG 2.2.2). Choosing a step jumps to it and the story
 * carries on from there. Reduced motion: no auto-advance; the steps still
 * switch.
 */
export function StepStory({ id, sectionId, number, eyebrow, titleLead, titleAccent, description, steps, labels }: StepStoryProps) {
  const cycle = useAutoCycle<HTMLElement>({ count: steps.length, seconds: STEP_SECONDS, threshold: 0.25 });
  const { active } = cycle;
  const tabsId = useId();

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!next) return;
    event.preventDefault();
    const target = (active + next + steps.length) % steps.length;
    cycle.select(target);
    document.getElementById(`${tabsId}-tab-${target}`)?.focus();
  }

  const current = steps[active] ?? steps[0];
  if (!current) return null;

  return (
    <section ref={cycle.root} id={sectionId} aria-labelledby={id} className="relative overflow-hidden border-t border-hair bg-night py-section">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <CinemaHeading id={id} number={number} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} className="flex-1" />
          {cycle.autoplay ? <CycleToggle playing={cycle.playing} onToggle={cycle.toggle} labels={labels} tone="gold" /> : null}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* The stage: one photograph per step, crossfading, with a live status card. */}
          <Reveal className="lg:order-2 lg:col-span-7">
            <div
              id={`${tabsId}-panel`}
              role="tabpanel"
              aria-labelledby={`${tabsId}-tab-${active}`}
              aria-live={cycle.running ? "off" : "polite"}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-hair bg-night-1 lg:aspect-auto lg:h-full lg:min-h-[36rem]"
            >
              {steps.map((step, i) => (
                <Image
                  key={step.image.src}
                  src={step.image.src}
                  alt={i === active ? step.image.alt : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className={cn("object-cover transition-[opacity,scale] duration-1000 ease-brand", i === active ? "scale-100 opacity-100" : "scale-110 opacity-0")}
                />
              ))}
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-night/85 via-night/10 to-night/30" />

              <span aria-hidden dir="ltr" className="absolute top-5 inset-s-5 font-display text-[3.5rem] leading-none font-bold stroke-text-fog sm:top-7 sm:inset-s-7" data-numeric>
                {String(active + 1).padStart(2, "0")}
              </span>

              <div className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-7 sm:inset-s-7">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: DURATION.slow, ease: EASE.brand }}
                    className="flex items-center gap-4 rounded-2xl border border-white/15 bg-night/70 p-3.5 pe-6 backdrop-blur-xl"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-night">{current.icon}</span>
                    <span>
                      <span className="block font-display text-[1.25rem] leading-tight font-semibold text-fog uppercase">{current.status}</span>
                      <span className="block text-base text-haze">
                        {labels.step} {active + 1} {labels.of} {steps.length} · {current.name}
                      </span>
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* The steps. */}
          <Reveal className="lg:order-1 lg:col-span-5">
            <div role="tablist" aria-orientation="vertical" aria-label={titleLead} className="flex flex-col">
              {steps.map((step, i) => {
                const selected = i === active;
                return (
                  <button
                    key={step.name}
                    id={`${tabsId}-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${tabsId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => cycle.select(i)}
                    onKeyDown={onKeyDown}
                    className="group relative flex gap-5 py-6 text-start"
                  >
                    {/* The step line: a hairline, filling gold while the step plays (full when motion is reduced). */}
                    <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-hair-strong" />
                    <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gold rtl:origin-right" style={{ transform: selected ? "scaleX(var(--cycle, 0))" : "scaleX(0)" }} />
                    <span
                      dir="ltr"
                      className={cn(
                        "w-12 shrink-0 font-display text-[2rem] leading-none font-bold transition-colors duration-500",
                        selected ? "text-gold" : "stroke-text-hair-strong group-hover:[-webkit-text-stroke-color:var(--color-gold)]",
                      )}
                      data-numeric
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className={cn("font-display text-base tracking-[0.16em] uppercase transition-colors", selected ? "text-gold" : "text-dim")}>{step.name}</span>
                      <span className={cn("mt-1.5 font-display text-[1.5rem] leading-tight font-semibold uppercase transition-colors", selected ? "text-fog" : "text-fog/60 group-hover:text-fog")}>
                        {step.title}
                      </span>
                      <span className={cn("grid transition-[grid-template-rows] duration-500 ease-brand", selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                        <span className="overflow-hidden">
                          <span className="block pt-3 text-base leading-relaxed text-haze">{step.body}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
