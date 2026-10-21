"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, Handshake, KeyRound, Lock, LockOpen, UserRound } from "lucide-react";
import { useId, useState } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion";

type LayerViewerProps = { t: (typeof copy)["en"]["layers"] };

const VIEWER_ICONS = [UserRound, Eye, Handshake] as const;
const LAYER_ICONS = [Eye, Lock, KeyRound] as const;
const LAYER_TONES = [
  { open: "border-cyan/50 bg-cyan/5", badge: "bg-cyan text-abyss", icon: "bg-cyan/15 text-cyan-ink" },
  { open: "border-gold/60 bg-gold/5", badge: "bg-gold text-abyss", icon: "bg-gold/20 text-gold-ink" },
  { open: "border-abyss bg-abyss text-white", badge: "bg-cyan text-abyss", icon: "bg-white/10 text-cyan" },
] as const;

/**
 * Who sees what, tried rather than told: choose who is looking (anyone, a
 * subscriber, or someone the innovator said yes to) and the idea card beside
 * it unlocks exactly the layers that viewer receives. Each layer unlocks one
 * step later than the one above it.
 */
export function LayerViewer({ t }: LayerViewerProps) {
  const [viewer, setViewer] = useState(0);
  const groupId = useId();

  return (
    <Section tone="surface" aria-labelledby="hiw-layers">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading id="hiw-layers" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.description} />

          <Reveal>
            <p id={`${groupId}-label`} className="font-mono text-eyebrow text-muted uppercase">
              {t.viewLabel}
            </p>
            <div role="radiogroup" aria-labelledby={`${groupId}-label`} className="mt-4 flex flex-col gap-2">
              {t.viewers.map((label, i) => {
                const Icon = VIEWER_ICONS[i] ?? UserRound;
                const selected = viewer === i;
                return (
                  <button
                    key={label}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setViewer(i)}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border-2 p-4 text-start transition-colors duration-300",
                      selected ? "border-abyss bg-abyss text-white" : "border-line bg-white text-ink hover:border-ink/40",
                    )}
                  >
                    <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl transition-colors", selected ? "bg-cyan text-abyss" : "bg-surface text-ink")}>
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="flex-1 text-h4">{label}</span>
                    <span dir="ltr" className={cn("font-mono text-xs", selected ? "text-cyan" : "text-muted")} data-numeric>
                      {i + 1} / 3
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* The idea card, as the chosen viewer receives it. */}
        <Reveal className="min-w-0 lg:col-span-7">
          <div className="flex flex-col gap-3 rounded-[2rem] border border-line bg-white p-3 shadow-elevated sm:p-4" aria-live="polite">
            {t.cards.map((card, i) => {
              const open = i <= viewer;
              const tone = LAYER_TONES[i] ?? LAYER_TONES[0];
              const Icon = LAYER_ICONS[i] ?? Eye;
              const dark = open && i === 2;
              return (
                <motion.article
                  key={card.title}
                  layout
                  transition={{ duration: DURATION.slow, ease: EASE.brand }}
                  className={cn("rounded-3xl border-2 p-5 transition-colors duration-500 sm:p-6", open ? tone.open : "border-dashed border-line bg-surface")}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", open ? tone.icon : "bg-white text-muted")}>
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <div>
                        <p className={cn("font-mono text-eyebrow uppercase", dark ? "text-cyan" : "text-muted")}>{card.kicker}</p>
                        <h3 className={cn("text-h4", dark ? "text-white" : "text-ink")}>{card.title}</h3>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.6875rem] uppercase transition-colors",
                        open ? tone.badge : "bg-white text-muted",
                      )}
                    >
                      {open ? <LockOpen aria-hidden className="size-3" /> : <Lock aria-hidden className="size-3" />}
                      {open ? t.visibleLabel : t.lockedLabel}
                    </span>
                  </div>
                  <p className={cn("mt-3 text-sm", dark ? "text-mist" : "text-body")}>{card.body}</p>

                  <AnimatePresence initial={false} mode="wait">
                    {open ? (
                      <motion.ul
                        key="open"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: DURATION.slow, ease: EASE.brand }}
                        className="grid grid-cols-1 gap-2 overflow-hidden pt-4 sm:grid-cols-2"
                      >
                        {card.points.map((point) => (
                          <li key={point} className={cn("flex items-start gap-2 text-sm", dark ? "text-mist" : "text-body")}>
                            <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", dark ? "text-cyan" : "text-cyan-ink")} />
                            {point}
                          </li>
                        ))}
                      </motion.ul>
                    ) : (
                      <motion.div
                        key="locked"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: DURATION.slow, ease: EASE.brand }}
                        aria-hidden
                        className="grid grid-cols-1 gap-2 overflow-hidden pt-4 sm:grid-cols-2"
                      >
                        {card.points.map((point, p) => (
                          <span key={point} className={cn("h-3 rounded-full bg-line", p % 2 ? "w-2/3" : "w-4/5")} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
