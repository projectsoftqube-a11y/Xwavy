"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Lightbulb, Lock, RotateCcw, Ticket, TrendingUp, X } from "lucide-react";
import Image from "next/image";
import { useId, useRef, type KeyboardEvent } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { CycleToggle } from "@/components/animation/CycleToggle";
import { useAutoCycle } from "@/components/animation/useAutoCycle";
import { Container } from "@/components/layout/Container";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion";

type OutcomeSwitchProps = {
  t: (typeof copy)["en"]["simulator"];
  /** Contact-block labels, shared with the home page's opt-in panel. */
  labels: {
    investor: string;
    innovator: string;
    contact: string;
    sealed: string;
    revealed: string;
  };
  /** Shown when the request is accepted: both contact cards, confirmed. */
  photo: { src: string; alt: string };
  /** Pause / play for the outcomes playing in turn. */
  controls: { play: string; pause: string };
};

const OUTCOMES = ["accept", "decline", "silence"] as const;

const OPTIONS = {
  accept: {
    Icon: Check,
    thumb: "bg-cyan",
    tile: "border-cyan/40 text-cyan",
    glow: "shadow-[0_0_0_1px_rgb(0_225_234/0.4),0_40px_120px_-30px_rgb(0_225_234/0.5)]",
  },
  decline: {
    Icon: X,
    thumb: "bg-fog",
    tile: "border-white/25 text-fog",
    glow: "shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_40px_120px_-30px_rgb(255_255_255/0.2)]",
  },
  silence: {
    Icon: Clock,
    thumb: "bg-gold",
    tile: "border-gold/40 text-gold",
    glow: "shadow-[0_0_0_1px_rgb(255_181_71/0.4),0_40px_120px_-30px_rgb(255_181_71/0.5)]",
  },
} as const;

/**
 * The three ways a request can end, as vertical tabs on night: choose what
 * the innovator does and the panel beside it shows what happens to both
 * sides' contact details (revealed together, or sealed) and to the
 * investor's quota. The highlight slides between tabs; the panel's glow takes
 * the outcome's colour. Every result shares one grid cell, so the panel
 * never changes height as the choice changes. The outcomes play in turn
 * (useAutoCycle); the chosen tab's line fills with its time.
 */
export function OutcomeSwitch({ t, labels, photo, controls }: OutcomeSwitchProps) {
  const cycle = useAutoCycle<HTMLDivElement>({ count: OUTCOMES.length, seconds: 6 });
  const outcome = OUTCOMES[cycle.active] ?? "accept";
  const tabsId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const shared = outcome === "accept";

  const select = (index: number) => {
    const next = (index + OUTCOMES.length) % OUTCOMES.length;
    cycle.select(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: OUTCOMES.length - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
  };

  const blocks = [
    { role: labels.investor, Icon: TrendingUp, tone: "text-gold" },
    { role: labels.innovator, Icon: Lightbulb, tone: "text-cyan" },
  ];

  const block = ({ role, Icon, tone }: (typeof blocks)[number]) => (
    <div key={role} className="min-w-0 rounded-2xl border border-hair-strong bg-night-1 p-4 sm:p-5">
      <p className={cn("flex items-center gap-2 font-display text-base tracking-[0.14em] uppercase", tone)}>
        <Icon aria-hidden className="size-4 shrink-0" />
        {role}
      </p>
      <p className="mt-3 text-base text-haze">{labels.contact}</p>
      <p className="mt-1 flex items-center gap-1.5 text-base font-medium text-fog">
        <Lock aria-hidden className="size-4 shrink-0 text-haze" />
        {labels.sealed}
      </p>
      <span aria-hidden className="mt-3 hidden flex-col gap-1.5 sm:flex">
        <span className="h-2 w-4/5 rounded-full bg-white/10" />
        <span className="h-2 w-3/5 rounded-full bg-white/10" />
      </span>
    </div>
  );

  return (
    <section aria-labelledby="hiw-optin" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-cyan pointer-events-none absolute top-1/3 end-[-14rem] size-[48rem] opacity-40" />
      <Container className="relative">
        <div ref={cycle.root} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="flex flex-col gap-9 lg:col-span-5">
            <CinemaHeading id="hiw-optin" number="02" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} size="md" />
            <p className="-mt-4 text-lead text-haze">{t.body}</p>

            <div>
              <div className="flex items-center justify-between gap-4">
                <p id={`${tabsId}-label`} className="font-display text-base tracking-[0.16em] text-dim uppercase">
                  {t.choose}
                </p>
                {cycle.autoplay ? <CycleToggle playing={cycle.playing} onToggle={cycle.toggle} labels={controls} tone={outcome === "silence" ? "gold" : "cyan"} /> : null}
              </div>
              <div role="tablist" aria-labelledby={`${tabsId}-label`} aria-orientation="vertical" className="mt-4 flex flex-col gap-2.5">
                {OUTCOMES.map((key, i) => {
                  const { Icon, thumb, tile } = OPTIONS[key];
                  const selected = outcome === key;
                  return (
                    <button
                      key={key}
                      ref={(node) => {
                        tabs.current[i] = node;
                      }}
                      id={`${tabsId}-${key}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={`${tabsId}-panel`}
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
                          layoutId={`${tabsId}-thumb`}
                          transition={{
                            duration: DURATION.slow,
                            ease: EASE.brand,
                          }}
                          className={cn("absolute inset-0 rounded-2xl", thumb)}
                        />
                      ) : null}
                      <span className={cn("relative grid size-12 shrink-0 place-items-center rounded-full border transition-colors", selected ? "border-night/20 bg-night/10" : tile)}>
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block font-display text-[1.375rem] leading-tight font-semibold uppercase">{t[key]}</span>
                        <span className={cn("mt-0.5 block text-base transition-colors", selected ? "text-night/70" : "text-haze")}>{t.outcomes[key].title}</span>
                      </span>
                      {/* The outcome's time, filling while it plays. */}
                      {selected ? (
                        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-night/15">
                          <span className="absolute inset-0 origin-left bg-night/55 rtl:origin-right" style={{ transform: "scaleX(var(--cycle, 0))" }} />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${outcome}`} className="min-w-0 lg:col-span-7">
            <div className={cn("overflow-hidden rounded-3xl border border-hair bg-night-2 transition-shadow duration-700", OPTIONS[outcome].glow)}>
              {/* The contact details: revealed to both, or sealed on both sides. */}
              <div className="relative aspect-square bg-night-1 sm:aspect-[2/1]">
                <AnimatePresence initial={false}>
                  {shared ? (
                    <motion.div
                      key="shared"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: DURATION.slow * 1.6,
                        ease: EASE.brand,
                      }}
                      className="absolute inset-0"
                    >
                      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                      <span className="absolute inset-0 bg-linear-to-t from-night/70 to-transparent" />
                      <span className="absolute inset-s-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-cyan px-3.5 py-1.5 text-base font-semibold text-night sm:inset-s-6 sm:bottom-6">
                        <Check aria-hidden className="size-4" />
                        {labels.revealed}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sealed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DURATION.slow, ease: EASE.brand }}
                      className="bg-grid absolute inset-0 flex flex-col justify-center gap-3 p-5 sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-5 sm:p-8"
                    >
                      {block(blocks[0]!)}
                      <span className="grid size-12 place-items-center self-center rounded-full border border-hair-strong bg-night">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={outcome}
                            initial={{ scale: 0.4, opacity: 0, rotate: -90 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.4, opacity: 0 }}
                            transition={{
                              duration: DURATION.base * 1.6,
                              ease: EASE.brand,
                            }}
                          >
                            {outcome === "silence" ? <Clock aria-hidden className="size-5 text-gold" /> : <X aria-hidden className="size-5 text-fog" />}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      {block(blocks[1]!)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* All three results share one cell; only the chosen one shows. */}
              <div className="grid grid-cols-1 p-6 sm:p-8">
                {OUTCOMES.map((key) => {
                  const result = t.outcomes[key];
                  const active = key === outcome;
                  const QuotaIcon = key === "silence" ? RotateCcw : Ticket;
                  return (
                    <motion.div
                      key={key}
                      aria-hidden={!active}
                      initial={false}
                      animate={
                        active
                          ? { opacity: 1, y: 0, visibility: "visible" }
                          : {
                              opacity: 0,
                              y: 14,
                              transitionEnd: { visibility: "hidden" },
                            }
                      }
                      transition={{ duration: DURATION.slow, ease: EASE.brand }}
                      className="[grid-area:1/1]"
                    >
                      <h3 className="font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-none font-semibold text-fog uppercase">{result.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-haze">{result.body}</p>
                      <p className="mt-5 flex items-start gap-3 rounded-2xl border border-gold/25 bg-gold/[0.06] p-4 text-base text-fog">
                        <QuotaIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                        {result.quota}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
