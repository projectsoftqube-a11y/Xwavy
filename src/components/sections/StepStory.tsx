"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { DURATION, EASE, MEDIA } from "@/lib/motion";

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
  id: string;
  sectionId?: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  description?: string;
  steps: readonly StoryStep[];
  labels: { step: string; of: string; play: string; pause: string };
  tone?: "white" | "surface";
};

/** Seconds each step stays on screen while the story plays. */
const STEP_SECONDS = 6;

/**
 * A step-by-step story: the steps as a list on one side, a large photograph
 * with a live status card on the other. While the section is in view the
 * steps advance on their own; hover, focus or the pause button holds them
 * (WCAG 2.2.2). Choosing a step jumps to it. Reduced motion: no auto-advance;
 * the steps still switch.
 */
export function StepStory({ id, sectionId, eyebrow, titleLead, titleAccent, description, steps, labels, tone = "white" }: StepStoryProps) {
  const root = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const tabsId = useId();

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MEDIA.motionOk);
    const sync = () => setMotionOk(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // One timer per active step; it advances the story when it ends.
  useEffect(() => {
    if (!motionOk) return;
    tween.current = gsap.to({}, { duration: STEP_SECONDS, paused: true, onComplete: () => setActive((i) => (i + 1) % steps.length) });
    return () => {
      tween.current?.kill();
      tween.current = null;
    };
  }, [active, motionOk, steps.length]);

  const running = playing && !held && inView && motionOk;
  useEffect(() => {
    tween.current?.paused(!running);
  }, [running, active]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!next) return;
    event.preventDefault();
    const target = (active + next + steps.length) % steps.length;
    setActive(target);
    document.getElementById(`${tabsId}-tab-${target}`)?.focus();
  }

  const current = steps[active] ?? steps[0];
  if (!current) return null;

  return (
    <Section id={sectionId} tone={tone} className={tone === "white" ? "panel" : undefined} aria-labelledby={id}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} />
        {motionOk ? (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? labels.pause : labels.play}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
          >
            {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          </button>
        ) : null}
      </div>

      <div
        ref={root}
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
        }}
        className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10"
      >
        {/* The stage: one photograph per step, crossfading, with a live status card. */}
        <Reveal className="lg:order-2 lg:col-span-7">
          <div
            id={`${tabsId}-panel`}
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-${active}`}
            className="relative aspect-4/3 overflow-hidden rounded-3xl bg-navy lg:aspect-auto lg:h-full lg:min-h-[32rem]"
          >
            {steps.map((step, i) => (
              <Image
                key={step.image.src}
                src={step.image.src}
                alt={i === active ? step.image.alt : ""}
                aria-hidden={i !== active}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={cn(
                  "object-cover transition-[opacity,transform] duration-1000 ease-brand",
                  i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
                )}
              />
            ))}

            <span
              aria-hidden
              dir="ltr"
              className="absolute top-4 inset-s-4 rounded-full bg-abyss/80 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-sm sm:top-6 sm:inset-s-6"
              data-numeric
            >
              {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>

            <div className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-6 sm:inset-s-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: DURATION.slow, ease: EASE.brand }}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3 pe-5 shadow-elevated"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cyan text-abyss">
                    {current.icon}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{current.status}</span>
                    <span className="block text-xs text-muted">
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
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    "group relative flex gap-4 border-t border-line py-5 text-start transition-colors",
                    selected ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full border font-mono text-sm transition-colors",
                      selected ? "border-abyss bg-abyss text-white" : "border-line text-muted group-hover:border-ink",
                    )}
                    data-numeric
                  >
                    {i + 1}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-mono text-eyebrow uppercase">{step.name}</span>
                    <span className={cn("mt-1 text-h4 transition-colors", selected ? "text-ink" : "text-body")}>{step.title}</span>
                    <span className={cn("grid transition-[grid-template-rows] duration-500 ease-brand", selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-[0.9375rem] text-body">{step.body}</span>
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
