"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Handshake, Lightbulb, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useId, useRef, type PointerEvent } from "react";

import { CARD_LIGHT } from "@/components/animation/CardStage";
import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { CycleToggle } from "@/components/animation/CycleToggle";
import { useAutoCycle } from "@/components/animation/useAutoCycle";
import { Container } from "@/components/layout/Container";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, MEDIA } from "@/lib/motion";

type PathTimelinesProps = {
  t: (typeof copy)["en"]["tracks"];
  /** Alt text for the two portraits. */
  alts: { innovator: string; investor: string };
  labels: { step: string; of: string; shared: string; play: string; pause: string };
};

type Side = "innovator" | "investor";

/** The journey in the order it plays: the two sides take turns, then meet. */
const BEATS = [
  { side: "innovator", step: 0 },
  { side: "investor", step: 0 },
  { side: "innovator", step: 1 },
  { side: "investor", step: 1 },
  { side: "innovator", step: 2 },
  { side: "investor", step: 2 },
  { side: "connect", step: 0 },
] as const;
const CONNECT = BEATS.length - 1;
const beatOf = (side: Side, step: number) => step * 2 + (side === "investor" ? 1 : 0);

const SIDES = {
  innovator: {
    Icon: Lightbulb,
    photo: { src: "/images/site/hiw-path-innovator.webp", position: "object-[50%_35%]" },
    text: "text-cyan",
    fill: "bg-cyan",
    outline: "stroke-text-cyan",
    border: "border-cyan/50",
    tint: "bg-cyan/[0.07]",
    ring: "ring-cyan/60",
    glow: "shadow-[0_0_0_1px_rgb(0_225_234/0.35),0_50px_140px_-50px_rgb(0_225_234/0.55)]",
    from: -40,
  },
  investor: {
    Icon: TrendingUp,
    photo: { src: "/images/site/hiw-path-investor.webp", position: "object-[60%_40%]" },
    text: "text-gold",
    fill: "bg-gold",
    outline: "stroke-text-gold",
    border: "border-gold/50",
    tint: "bg-gold/[0.07]",
    ring: "ring-gold/60",
    glow: "shadow-[0_0_0_1px_rgb(255_181_71/0.35),0_50px_140px_-50px_rgb(255_181_71/0.55)]",
    from: 40,
  },
} as const;

const CONNECT_GLOW = "shadow-[0_0_0_1px_rgb(255_255_255/0.22),-40px_50px_140px_-60px_rgb(0_225_234/0.6),40px_50px_140px_-60px_rgb(255_181_71/0.6)]";

/** Seconds each beat stays on the stage. */
const BEAT_SECONDS = 5;

/** Moves a card's light to the pointer. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - box.top}px`);
}

/**
 * Two paths, one meeting point, as a journey that plays itself: the
 * innovator's lane on one side, the investor's on the other, and a stage
 * between them. The sides take turns (innovator 1, investor 1, innovator 2…)
 * and the stage shows each step with that side's photograph, then the two
 * photographs meet for the introduction. A bar along the stage shows the
 * whole journey; the active step's line fills as its time runs. Any step can
 * be chosen and the journey carries on from there; it can be paused, holds
 * for keyboard focus and only plays on screen. Reduced motion: no autoplay.
 */
export function PathTimelines({ t, alts, labels }: PathTimelinesProps) {
  const section = useRef<HTMLElement>(null);
  const panelId = useId();
  const cycle = useAutoCycle<HTMLDivElement>({ count: BEATS.length, seconds: BEAT_SECONDS, threshold: 0.25 });
  const { active, select } = cycle;
  const beat = BEATS[active] ?? BEATS[0];
  const connected = beat.side === "connect";

  useGSAP(
    () => {
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const once = { trigger: q("[data-journey]")[0], start: "top 75%", once: true };
        gsap.fromTo(
          q("[data-stage]"),
          { clipPath: "inset(12% 12% 12% 12% round 1.5rem)", autoAlpha: 0 },
          { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", autoAlpha: 1, duration: 1.5, ease: "expo.out", clearProps: "clipPath", scrollTrigger: once },
        );
        q("[data-lane]").forEach((lane) => {
          const from = Number(lane.getAttribute("data-lane"));
          gsap.from(lane.querySelectorAll("[data-lane-item]"), { x: from, autoAlpha: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: 0.25, scrollTrigger: once });
        });
        gsap.from(q("[data-beat-seg]"), { scaleX: 0, duration: 0.8, ease: "power3.out", stagger: 0.06, delay: 0.5, scrollTrigger: once });
        gsap.from(q("[data-connect-tab]"), { y: 30, autoAlpha: 0, duration: 1, ease: "expo.out", delay: 0.6, scrollTrigger: once });
      });
    },
    { scope: section },
  );

  const lane = (side: Side) => {
    const s = SIDES[side];
    const steps = t[side].steps;
    return (
      <div data-lane={s.from} className={cn("flex flex-col gap-3 xl:col-span-3 xl:self-center", side === "innovator" ? "xl:order-1" : "xl:order-3")}>
        <div data-lane-item className="mb-1 flex items-center gap-3.5">
          <span className={cn("relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-night", s.ring)}>
            <Image src={s.photo.src} alt="" fill sizes="56px" className={cn("object-cover", s.photo.position)} />
          </span>
          <span className="min-w-0">
            <span className={cn("flex items-center gap-2 font-display text-[1.375rem] leading-tight font-semibold uppercase", s.text)}>
              <s.Icon aria-hidden className="size-4.5" />
              {t[side].label}
            </span>
            <span dir="ltr" className="block font-display text-base tracking-[0.14em] text-dim">
              01–{String(steps.length).padStart(2, "0")}
            </span>
          </span>
        </div>

        {steps.map((step, i) => {
          const index = beatOf(side, i);
          const selected = index === active;
          const done = index < active;
          return (
            <button
              key={step.title}
              data-lane-item
              type="button"
              aria-current={selected ? "step" : undefined}
              aria-controls={panelId}
              onClick={() => select(index)}
              onPointerMove={trackPointer}
              className={cn(
                "group/card relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border p-4 text-start transition-[border-color,background-color] duration-500 sm:p-5",
                selected ? cn(s.border, s.tint) : "border-hair bg-night-1 hover:border-hair-strong",
              )}
            >
              <span aria-hidden className={CARD_LIGHT} />
              <span
                dir="ltr"
                className={cn(
                  "relative w-11 shrink-0 font-display text-[2rem] leading-none font-bold transition-colors duration-500",
                  selected ? s.text : done ? cn(s.outline, "opacity-70") : "stroke-text-hair-strong",
                )}
                data-numeric
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative min-w-0 flex-1">
                <span
                  className={cn(
                    "block font-display text-[1.25rem] leading-tight font-semibold uppercase transition-colors duration-500",
                    selected ? "text-fog" : "text-fog/70 group-hover/card:text-fog",
                  )}
                >
                  {step.title}
                </span>
                {/* Always shown, dimmed when not playing, so the lane never changes height as the journey moves. */}
                <span className={cn("block pt-2 text-base leading-relaxed transition-colors duration-500", selected ? "text-haze" : "text-dim/70")}>{step.body}</span>
              </span>
              {done ? (
                <span className={cn("relative grid size-6 shrink-0 place-items-center rounded-full text-night", s.fill)}>
                  <Check aria-hidden strokeWidth={3} className="size-3.5" />
                </span>
              ) : null}
              {/* The step's time, filling while it plays. */}
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5">
                <span className={cn("absolute inset-0 origin-left rtl:origin-right", s.fill)} style={{ transform: selected ? "scaleX(var(--cycle, 0))" : "scaleX(0)" }} />
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  const stepNumber = beat.step;
  const sideCopy = beat.side === "connect" ? null : t[beat.side];
  const sideStyle = beat.side === "connect" ? null : SIDES[beat.side];

  return (
    <section ref={section} aria-labelledby="hiw-paths" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-cyan pointer-events-none absolute top-1/3 start-[-16rem] size-[46rem] opacity-40" />
      <span aria-hidden className="glow-gold pointer-events-none absolute top-1/2 end-[-16rem] size-[46rem] opacity-40" />

      <Container className="relative">
        <CinemaHeading id="hiw-paths" number="01" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} align="center" />

        <div ref={cycle.root} data-journey role="group" aria-label={t.eyebrow} className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-20 xl:grid-cols-12 xl:gap-8">
          {/* The stage. */}
          <div
            data-stage
            className={cn(
              "relative overflow-hidden rounded-3xl border border-hair bg-night-1 transition-shadow duration-700 md:col-span-2 xl:order-2 xl:col-span-6",
              connected ? CONNECT_GLOW : sideStyle?.glow,
            )}
          >
            <div className="relative aspect-[4/5] min-[480px]:aspect-[4/3] md:aspect-[16/10] xl:aspect-auto xl:h-[36rem]">
              {/* One photograph per side, crossfading. */}
              {(["innovator", "investor"] as const).map((side) => {
                const on = beat.side === side;
                return (
                  <Image
                    key={side}
                    src={SIDES[side].photo.src}
                    alt={on ? alts[side] : ""}
                    aria-hidden={!on}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={cn("object-cover transition-[opacity,scale] duration-1000 ease-brand", SIDES[side].photo.position, on ? "scale-100 opacity-100" : "scale-110 opacity-0")}
                  />
                );
              })}

              {/* The meeting: both photographs side by side, a seam of light between them. */}
              <div aria-hidden className={cn("absolute inset-0 grid grid-cols-2 transition-opacity duration-700", connected ? "opacity-100" : "opacity-0")}>
                {(["innovator", "investor"] as const).map((side) => (
                  <div key={side} className="relative overflow-hidden">
                    <Image
                      src={SIDES[side].photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className={cn(
                        "object-cover transition-transform duration-1000 ease-brand",
                        SIDES[side].photo.position,
                        connected ? "translate-x-0" : side === "innovator" ? "-translate-x-1/4 rtl:translate-x-1/4" : "translate-x-1/4 rtl:-translate-x-1/4",
                      )}
                    />
                  </div>
                ))}
                <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-linear-to-b from-cyan via-fog to-gold shadow-[0_0_24px_rgb(255_255_255/0.8)]" />
              </div>

              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-night via-night/45 to-night/30" />

              {/* The journey bar, the count and the pause control. */}
              <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-4 p-4 sm:p-5">
                <ol aria-hidden className="flex flex-1 gap-1.5">
                  {BEATS.map((b, i) => (
                    <li key={i} data-beat-seg className="relative h-1 flex-1 origin-left overflow-hidden rounded-full bg-white/15 rtl:origin-right">
                      <span
                        className={cn("absolute inset-0 origin-left rtl:origin-right", b.side === "connect" ? "bg-linear-to-r from-cyan to-gold" : SIDES[b.side].fill)}
                        style={{ transform: i < active ? "scaleX(1)" : i === active ? "scaleX(var(--cycle, 0))" : "scaleX(0)" }}
                      />
                    </li>
                  ))}
                </ol>
                <span dir="ltr" className="font-display text-base tracking-[0.12em] text-fog" data-numeric>
                  {String(active + 1).padStart(2, "0")} <span className="text-dim">/ {String(BEATS.length).padStart(2, "0")}</span>
                </span>
                {cycle.autoplay ? <CycleToggle playing={cycle.playing} onToggle={cycle.toggle} labels={labels} tone={beat.side === "investor" ? "gold" : "cyan"} /> : null}
              </div>

              {/* The meeting coin. */}
              <div
                aria-hidden
                className={cn(
                  "absolute top-[42%] left-1/2 grid size-24 -translate-1/2 place-items-center transition-[opacity,scale] duration-700 ease-brand",
                  connected ? "scale-100 opacity-100" : "scale-50 opacity-0",
                )}
              >
                <span className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--color-cyan),transparent_35%,var(--color-gold)_50%,transparent_85%,var(--color-cyan))] p-0.5 [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]" />
                <span className="grid size-20 place-items-center rounded-full border border-white/15 bg-night/80 text-fog backdrop-blur-md">
                  <Handshake className="size-8" strokeWidth={1.5} />
                </span>
              </div>

              {/* The big outlined step number. */}
              {!connected && sideStyle ? (
                <span aria-hidden dir="ltr" className={cn("absolute end-5 top-16 font-display text-[5rem] leading-none font-bold opacity-80 sm:end-7 sm:top-20", sideStyle.outline)} data-numeric>
                  {String(stepNumber + 1).padStart(2, "0")}
                </span>
              ) : null}

              {/* The beat's words. */}
              <div id={panelId} aria-live={cycle.running ? "off" : "polite"} className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: DURATION.slow, ease: EASE.brand }}
                    className={cn("flex flex-col gap-3", connected && "items-center text-center")}
                  >
                    {connected ? (
                      <p className="flex flex-wrap items-center justify-center gap-2">
                        {(["innovator", "investor"] as const).map((side) => (
                          <span key={side} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-night/60 py-1 ps-1 pe-3 text-base text-fog backdrop-blur-md">
                            <span className={cn("grid size-6 place-items-center rounded-full text-night", SIDES[side].fill)}>
                              <Check aria-hidden strokeWidth={3} className="size-3.5" />
                            </span>
                            {t[side].label}
                          </span>
                        ))}
                      </p>
                    ) : sideCopy && sideStyle ? (
                      <p
                        className={cn(
                          "inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-night/60 px-3.5 py-1.5 font-display text-base tracking-[0.12em] uppercase backdrop-blur-md",
                          sideStyle.text,
                        )}
                      >
                        <sideStyle.Icon aria-hidden className="size-4" />
                        {sideCopy.label} · {labels.step} {stepNumber + 1} {labels.of} {sideCopy.steps.length}
                      </p>
                    ) : null}
                    <h3 className="font-display text-[clamp(2rem,1.5rem+2vw,3.5rem)] leading-none font-bold text-fog uppercase">{connected ? t.meeting.title : sideCopy?.steps[stepNumber]?.title}</h3>
                    <p className="max-w-xl text-base leading-relaxed text-fog/80 sm:text-lead">{connected ? t.meeting.body : sideCopy?.steps[stepNumber]?.body}</p>
                    {connected ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-cyan to-gold px-4 py-1.5 text-base font-semibold text-night">
                        <Check aria-hidden className="size-4" strokeWidth={3} />
                        {labels.shared}
                      </span>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {lane("innovator")}
          {lane("investor")}

          {/* The meeting, chosen like any step. */}
          <button
            data-connect-tab
            type="button"
            aria-current={connected ? "step" : undefined}
            aria-controls={panelId}
            onClick={() => select(CONNECT)}
            className={cn(
              "group relative flex items-center justify-center gap-4 overflow-hidden rounded-2xl border p-4 transition-colors duration-500 md:col-span-2 xl:order-4 xl:col-span-6 xl:col-start-4",
              connected ? "border-white/30 bg-white/[0.06]" : "border-hair bg-night-1 hover:border-hair-strong",
            )}
          >
            <span aria-hidden className={cn("absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-fog to-gold transition-opacity duration-500", connected ? "opacity-100" : "opacity-40")} />
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-fog">
              <Handshake aria-hidden className="size-5" strokeWidth={1.6} />
            </span>
            <span className="font-display text-[1.5rem] leading-none font-semibold text-fog uppercase">{t.meeting.title}</span>
            <span dir="ltr" className="font-display text-base tracking-[0.12em] text-dim" data-numeric>
              07
            </span>
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5">
              <span className="absolute inset-0 origin-left bg-linear-to-r from-cyan to-gold rtl:origin-right" style={{ transform: connected ? "scaleX(var(--cycle, 0))" : "scaleX(0)" }} />
            </span>
          </button>
        </div>
      </Container>
    </section>
  );
}
