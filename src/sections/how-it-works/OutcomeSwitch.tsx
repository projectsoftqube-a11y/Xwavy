"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Lightbulb, Lock, RotateCcw, Ticket, TrendingUp, X } from "lucide-react";
import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion";

type OutcomeSwitchProps = {
  t: (typeof copy)["en"]["simulator"];
  /** Contact-block labels, shared with the home page's opt-in panel. */
  labels: { investor: string; innovator: string; contact: string; sealed: string; revealed: string };
  /** Shown when the request is accepted: both contact cards, confirmed. */
  photo: { src: string; alt: string };
};

const OUTCOMES = ["accept", "decline", "silence"] as const;
type Outcome = (typeof OUTCOMES)[number];

const OPTIONS = {
  accept: { Icon: Check, thumb: "bg-cyan", tile: "bg-cyan/15 text-cyan" },
  decline: { Icon: X, thumb: "bg-white", tile: "bg-white/10 text-white" },
  silence: { Icon: Clock, thumb: "bg-gold", tile: "bg-gold/15 text-gold" },
} as const;

/**
 * The three ways a request can end, as vertical tabs: choose what the
 * innovator does, and the card beside it shows what happens to both sides'
 * contact details (revealed together, or sealed) and to the investor's quota.
 * Every result is rendered in the same grid cell, so the card never changes
 * height as the choice changes.
 */
export function OutcomeSwitch({ t, labels, photo }: OutcomeSwitchProps) {
  const [outcome, setOutcome] = useState<Outcome>("accept");
  const tabsId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const shared = outcome === "accept";

  const select = (index: number) => {
    const next = (index + OUTCOMES.length) % OUTCOMES.length;
    setOutcome(OUTCOMES[next] ?? "accept");
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: OUTCOMES.length - 1 };
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
    <div key={role} className="min-w-0 rounded-2xl border border-white/10 bg-abyss p-4 sm:p-5">
      <p className={cn("flex items-center gap-2 font-mono text-eyebrow uppercase", tone)}>
        <Icon aria-hidden className="size-3.5 shrink-0" />
        {role}
      </p>
      <p className="mt-3 text-xs text-mist">{labels.contact}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white">
        <Lock aria-hidden className="size-3.5 shrink-0 text-mist" />
        {labels.sealed}
      </p>
      <span aria-hidden className="mt-3 hidden flex-col gap-1.5 sm:flex">
        <span className="h-2 w-4/5 rounded-full bg-white/10" />
        <span className="h-2 w-3/5 rounded-full bg-white/10" />
      </span>
    </div>
  );

  return (
    <section aria-labelledby="hiw-optin" className="surface-abyss panel py-section">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading id="hiw-optin" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.body} tone="dark" />

            <div>
              <p id={`${tabsId}-label`} className="font-mono text-eyebrow text-mist uppercase">
                {t.choose}
              </p>
              <div role="tablist" aria-labelledby={`${tabsId}-label`} aria-orientation="vertical" className="mt-4 flex flex-col gap-2">
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
                      onClick={() => setOutcome(key)}
                      onKeyDown={(event) => onKeyDown(event, i)}
                      className={cn(
                        "relative flex items-center gap-4 rounded-2xl border p-3 pe-5 text-start transition-colors duration-300",
                        selected ? "border-transparent text-abyss" : "border-white/10 bg-white/5 text-white hover:border-white/30",
                      )}
                    >
                      {selected ? (
                        <motion.span layoutId={`${tabsId}-thumb`} transition={{ duration: DURATION.slow, ease: EASE.brand }} className={cn("absolute inset-0 rounded-2xl", thumb)} />
                      ) : null}
                      <span className={cn("relative grid size-11 shrink-0 place-items-center rounded-xl transition-colors", selected ? "bg-abyss/10" : tile)}>
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block text-h4">{t[key]}</span>
                        <span className={cn("mt-0.5 block text-sm transition-colors", selected ? "text-abyss/70" : "text-mist")}>{t.outcomes[key].title}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${outcome}`} className="min-w-0 lg:col-span-7">
            <div className="overflow-hidden rounded-4xl bg-white text-ink shadow-elevated">
              {/* The contact details: revealed to both, or sealed on both sides. */}
              <div className="relative aspect-square bg-navy sm:aspect-2/1">
                <AnimatePresence initial={false}>
                  {shared ? (
                    <motion.div
                      key="shared"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DURATION.slow, ease: EASE.brand }}
                      className="absolute inset-0"
                    >
                      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                      <span className="absolute inset-s-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-cyan px-3 py-1.5 text-xs font-semibold text-abyss sm:inset-s-5 sm:bottom-5">
                        <Check aria-hidden className="size-3.5" />
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
                      <span className="grid size-10 place-items-center self-center rounded-full border border-white/15 bg-navy">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={outcome}
                            initial={{ scale: 0.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.4, opacity: 0 }}
                            transition={{ duration: DURATION.base, ease: EASE.brand }}
                          >
                            {outcome === "silence" ? <Clock aria-hidden className="size-4 text-gold" /> : <X aria-hidden className="size-4 text-white" />}
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
                      animate={active ? { opacity: 1, y: 0, visibility: "visible" } : { opacity: 0, y: 12, transitionEnd: { visibility: "hidden" } }}
                      transition={{ duration: DURATION.slow, ease: EASE.brand }}
                      className="[grid-area:1/1]"
                    >
                      <h3 className="text-h3">{result.title}</h3>
                      <p className="mt-3 text-body">{result.body}</p>
                      <p className="mt-5 flex items-start gap-3 rounded-2xl bg-gold/10 p-4 text-sm text-ink">
                        <QuotaIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-ink" />
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
