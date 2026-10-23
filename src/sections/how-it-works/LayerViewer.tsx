"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, Handshake, KeyRound, Lock, LockOpen, UserRound } from "lucide-react";
import { useId, useRef, type KeyboardEvent } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { CycleToggle } from "@/components/animation/CycleToggle";
import { useAutoCycle } from "@/components/animation/useAutoCycle";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion";

type LayerViewerProps = {
  t: (typeof copy)["en"]["layers"];
  /** Pause / play for the viewers playing in turn. */
  controls: { play: string; pause: string };
};

const VIEWER_ICONS = [UserRound, Eye, Handshake] as const;
const LAYER_ICONS = [Eye, Lock, KeyRound] as const;
const LAYER_TONES = [
  {
    open: "border-cyan/45 bg-cyan/[0.06]",
    badge: "bg-cyan text-night",
    icon: "border-cyan/40 text-cyan",
    tick: "text-cyan",
    sweep: "via-cyan/25",
  },
  {
    open: "border-gold/45 bg-gold/[0.06]",
    badge: "bg-gold text-night",
    icon: "border-gold/40 text-gold",
    tick: "text-gold",
    sweep: "via-gold/25",
  },
  {
    open: "border-fog/40 bg-white/[0.06]",
    badge: "bg-fog text-night",
    icon: "border-fog/40 text-fog",
    tick: "text-fog",
    sweep: "via-white/20",
  },
] as const;

/**
 * Who sees what, tried rather than told: choose who is looking (anyone, a
 * subscriber, or someone the innovator said yes to) and the idea beside it
 * unlocks exactly the layers that viewer receives. A light sweeps across each
 * layer as it unlocks; locked layers show redacted bars, never the text. The
 * viewers play in turn (useAutoCycle), the chosen tab's line filling with its
 * time.
 */
export function LayerViewer({ t, controls }: LayerViewerProps) {
  const cycle = useAutoCycle<HTMLDivElement>({ count: t.viewers.length, seconds: 6 });
  const viewer = cycle.active;
  const groupId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: t.viewers.length - 1 };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = (target + t.viewers.length) % t.viewers.length;
    cycle.select(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="hiw-layers" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-cyan pointer-events-none absolute -bottom-60 start-1/3 size-[44rem] opacity-30" />
      <Container className="relative">
        <div ref={cycle.root} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-9 lg:col-span-5 lg:self-center">
            <CinemaHeading id="hiw-layers" number="04" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.description} size="md" />

            <Reveal>
              <div className="flex items-center justify-between gap-4">
                <p id={`${groupId}-label`} className="font-display text-base tracking-[0.16em] text-dim uppercase">
                  {t.viewLabel}
                </p>
                {cycle.autoplay ? <CycleToggle playing={cycle.playing} onToggle={cycle.toggle} labels={controls} /> : null}
              </div>
              <div role="tablist" aria-labelledby={`${groupId}-label`} aria-orientation="vertical" className="mt-4 flex flex-col gap-2.5">
                {t.viewers.map((label, i) => {
                  const Icon = VIEWER_ICONS[i] ?? UserRound;
                  const selected = viewer === i;
                  return (
                    <button
                      key={label}
                      ref={(node) => {
                        tabs.current[i] = node;
                      }}
                      id={`${groupId}-tab-${i}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={`${groupId}-panel`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => cycle.select(i)}
                      onKeyDown={(event) => onKeyDown(event, i)}
                      className={cn(
                        "relative flex items-center gap-4 overflow-hidden rounded-2xl border p-3 pe-5 text-start transition-colors duration-300",
                        selected ? "border-transparent text-night" : "border-hair bg-night-1 text-fog hover:border-hair-strong",
                      )}
                    >
                      {selected ? (
                        <motion.span
                          layoutId={`${groupId}-thumb`}
                          transition={{
                            duration: DURATION.slow,
                            ease: EASE.brand,
                          }}
                          className="absolute inset-0 rounded-2xl bg-cyan"
                        />
                      ) : null}
                      <span className={cn("relative grid size-11 shrink-0 place-items-center rounded-full border transition-colors", selected ? "border-night/20 bg-night/10" : "border-hair-strong")}>
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span className="relative flex-1 font-display text-[1.25rem] leading-tight font-semibold uppercase">{label}</span>
                      <span dir="ltr" className={cn("relative font-display text-base tracking-[0.1em]", selected ? "text-night/70" : "text-dim")} data-numeric>
                        {i + 1} / {t.viewers.length}
                      </span>
                      {/* The viewer's time, filling while it plays. */}
                      {selected ? (
                        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-night/15">
                          <span className="absolute inset-0 origin-left bg-night/55 rtl:origin-right" style={{ transform: "scaleX(var(--cycle, 0))" }} />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* The idea, as the chosen viewer receives it. */}
          <Reveal className="min-w-0 lg:col-span-7">
            <div
              id={`${groupId}-panel`}
              role="tabpanel"
              aria-labelledby={`${groupId}-tab-${viewer}`}
              aria-live={cycle.running ? "off" : "polite"}
              className="relative rounded-[2rem] border border-hair bg-night-1 p-3 shadow-[0_60px_140px_-60px_rgb(0_0_0/0.9)] sm:p-4"
            >
              <div className="flex items-center justify-between gap-3 px-3 pt-2 pb-4 sm:px-4">
                <span className="flex items-center gap-2" aria-hidden>
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                </span>
                <span className="flex items-center gap-1.5" aria-hidden>
                  {t.cards.map((card, i) => (
                    <span key={card.title} className={cn("h-1.5 w-8 rounded-full transition-colors duration-500", i <= viewer ? (LAYER_TONES[i]?.badge.split(" ")[0] ?? "bg-cyan") : "bg-white/10")} />
                  ))}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {t.cards.map((card, i) => {
                  const open = i <= viewer;
                  const tone = LAYER_TONES[i] ?? LAYER_TONES[0];
                  const Icon = LAYER_ICONS[i] ?? Eye;
                  return (
                    <motion.article
                      key={card.title}
                      layout
                      transition={{ duration: DURATION.slow, ease: EASE.brand }}
                      className={cn("relative overflow-hidden rounded-3xl border p-5 transition-colors duration-500 sm:p-6", open ? tone.open : "border-dashed border-hair-strong bg-night")}
                    >
                      {/* The unlock sweep: plays each time this layer opens. */}
                      <AnimatePresence>
                        {open ? (
                          <motion.span
                            key={`sweep-${viewer}`}
                            aria-hidden
                            initial={{ x: "-110%" }}
                            animate={{ x: "110%" }}
                            transition={{
                              duration: 1.1,
                              ease: EASE.brand,
                              delay: i * 0.08,
                            }}
                            className={cn("pointer-events-none absolute inset-0 bg-linear-to-r from-transparent to-transparent rtl:-scale-x-100", tone.sweep)}
                          />
                        ) : null}
                      </AnimatePresence>

                      <div className="relative flex flex-wrap items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3.5">
                          <span className={cn("grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-500", open ? tone.icon : "border-hair-strong text-dim")}>
                            <Icon aria-hidden className="size-5" />
                          </span>
                          <div className="min-w-0">
                            <p className={cn("font-display text-base tracking-[0.14em] uppercase transition-colors", open ? tone.tick : "text-dim")}>{card.kicker}</p>
                            <h3 className={cn("font-display text-[1.5rem] leading-tight font-semibold uppercase transition-colors", open ? "text-fog" : "text-fog/50")}>{card.title}</h3>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 font-display text-base tracking-[0.08em] uppercase transition-colors duration-500",
                            open ? tone.badge : "border border-hair-strong text-dim",
                          )}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                              key={open ? "open" : "locked"}
                              initial={{ rotate: -40, scale: 0.4, opacity: 0 }}
                              animate={{ rotate: 0, scale: 1, opacity: 1 }}
                              exit={{ scale: 0.4, opacity: 0 }}
                              transition={{
                                duration: DURATION.base * 1.4,
                                ease: EASE.brand,
                              }}
                              className="grid"
                            >
                              {open ? <LockOpen aria-hidden className="size-3.5" /> : <Lock aria-hidden className="size-3.5" />}
                            </motion.span>
                          </AnimatePresence>
                          {open ? t.visibleLabel : t.lockedLabel}
                        </span>
                      </div>
                      <p className={cn("relative mt-3 text-base leading-relaxed transition-colors", open ? "text-haze" : "text-dim")}>{card.body}</p>

                      <AnimatePresence initial={false} mode="wait">
                        {open ? (
                          <motion.ul
                            key="open"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: DURATION.slow,
                              ease: EASE.brand,
                            }}
                            className="relative grid grid-cols-1 gap-2.5 overflow-hidden pt-4 sm:grid-cols-2"
                          >
                            {card.points.map((point, p) => (
                              <motion.li
                                key={point}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: DURATION.slow,
                                  ease: EASE.brand,
                                  delay: 0.15 + p * 0.06,
                                }}
                                className="flex items-start gap-2 text-base text-fog"
                              >
                                <Check aria-hidden className={cn("mt-1 size-4 shrink-0", tone.tick)} />
                                {point}
                              </motion.li>
                            ))}
                          </motion.ul>
                        ) : (
                          <motion.div
                            key="locked"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: DURATION.slow,
                              ease: EASE.brand,
                            }}
                            aria-hidden
                            className="relative grid grid-cols-1 gap-2.5 overflow-hidden pt-4 sm:grid-cols-2"
                          >
                            {card.points.map((point, p) => (
                              <span key={point} className="flex items-center gap-2">
                                <span className="size-4 shrink-0 rounded-full border border-hair-strong" />
                                <span className={cn("h-3 rounded-full bg-white/[0.07]", p % 2 === 1 ? "w-2/3" : "w-4/5")} />
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
