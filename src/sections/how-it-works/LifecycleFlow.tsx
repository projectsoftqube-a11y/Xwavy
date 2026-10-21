"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Archive, CircleX, FilePen, Globe, Hourglass, MessageSquareWarning, Pause, Trash2 } from "lucide-react";
import { useId, useRef, useState } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, MEDIA } from "@/lib/motion";

type LifecycleFlowProps = { t: (typeof copy)["en"]["lifecycle"] };

type Tone = "main" | "live" | "branch" | "end";

/**
 * Node layout in a 1000 × 420 diagram, in the order of t.states:
 * draft, in review, changes requested, rejected, published, paused,
 * archived, removed. The main path runs across the middle; recoverable
 * detours sit above and below it.
 */
const W = 1000;
const H = 420;
const NODE_W = 190;
const NODE_H = 64;
const NODES: { x: number; y: number; Icon: typeof FilePen; tone: Tone }[] = [
  { x: 120, y: 210, Icon: FilePen, tone: "main" },
  { x: 375, y: 210, Icon: Hourglass, tone: "main" },
  { x: 375, y: 52, Icon: MessageSquareWarning, tone: "branch" },
  { x: 375, y: 368, Icon: CircleX, tone: "branch" },
  { x: 625, y: 210, Icon: Globe, tone: "live" },
  { x: 625, y: 52, Icon: Pause, tone: "branch" },
  { x: 880, y: 210, Icon: Archive, tone: "main" },
  { x: 625, y: 368, Icon: Trash2, tone: "end" },
];
/** [from, to, two-way] */
const EDGES: [number, number, boolean][] = [
  [0, 1, false],
  [1, 4, false],
  [4, 6, false],
  [1, 2, true],
  [1, 3, true],
  [4, 5, true],
  [4, 7, false],
];

const toneClass: Record<Tone, string> = {
  main: "border-line bg-white text-ink",
  live: "border-cyan bg-cyan/10 text-ink",
  branch: "border-gold/50 bg-gold/10 text-ink",
  end: "border-line bg-surface text-muted",
};

function edgePath([from, to]: [number, number, boolean]) {
  const a = NODES[from];
  const b = NODES[to];
  if (!a || !b) return "";
  const gap = 10;
  if (a.y === b.y) {
    const dir = Math.sign(b.x - a.x);
    return `M ${a.x + dir * (NODE_W / 2 + gap)} ${a.y} L ${b.x - dir * (NODE_W / 2 + gap)} ${b.y}`;
  }
  const dir = Math.sign(b.y - a.y);
  return `M ${a.x} ${a.y + dir * (NODE_H / 2 + gap)} L ${b.x} ${b.y - dir * (NODE_H / 2 + gap)}`;
}

/**
 * The life of an idea as an interactive flowchart (desktop) or a tap grid
 * (phones). Choosing a state shows what it means and who can move it.
 * The arrows draw in and the states pop in once, as the diagram enters.
 */
export function LifecycleFlow({ t }: LifecycleFlowProps) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(4);
  const groupId = useId();
  const state = t.states[active] ?? t.states[0];
  const node = NODES[active] ?? NODES[0];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const trigger = { trigger: q("[data-flow]")[0], start: "top 75%", once: true };
        gsap.from(q("[data-flow-node]"), { scale: 0.7, autoAlpha: 0, duration: 0.5, ease: "back.out(1.8)", stagger: 0.07, scrollTrigger: trigger });
        gsap.from(q("[data-flow-edge]"), { autoAlpha: 0, duration: 0.5, stagger: 0.06, delay: 0.35, scrollTrigger: trigger });
      });
    },
    { scope: root },
  );

  if (!state || !node) return null;

  const button = (i: number, extra?: string) => {
    const s = t.states[i];
    const n = NODES[i];
    if (!s || !n) return null;
    const selected = i === active;
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => setActive(i)}
        className={cn(
          "flex w-full items-center gap-2 rounded-2xl border-2 px-2.5 py-2.5 text-start transition-[background-color,border-color,box-shadow,color] duration-300 sm:gap-2.5 sm:px-3",
          selected ? "border-abyss bg-abyss text-white shadow-elevated" : cn(toneClass[n.tone], "hover:border-ink/40"),
          extra,
        )}
      >
        <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg sm:size-8", selected ? "bg-cyan text-abyss" : "bg-white/70 text-current")}>
          <n.Icon aria-hidden className="size-4" />
        </span>
        <span className="min-w-0 text-sm leading-tight font-semibold">{s.name}</span>
      </button>
    );
  };

  return (
    <section ref={root} aria-labelledby="hiw-lifecycle" className="panel bg-white py-section">
      <Container>
        <SectionHeading id="hiw-lifecycle" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.body} />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Desktop flowchart: from xl, where each node is wide enough for its label. */}
          <div role="group" aria-label={t.pickLabel} className="lg:col-span-8">
            <div data-flow className="relative hidden aspect-[1000/420] rounded-3xl border border-line bg-surface xl:block rtl:-scale-x-100">
              <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full text-field">
                <defs>
                  <marker id={`${groupId}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                  </marker>
                </defs>
                {EDGES.map((edge) => (
                  <path
                    key={`${edge[0]}-${edge[1]}`}
                    data-flow-edge
                    d={edgePath(edge)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    markerEnd={`url(#${groupId}-arrow)`}
                    markerStart={edge[2] ? `url(#${groupId}-arrow)` : undefined}
                  />
                ))}
              </svg>
              {NODES.map((n, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%`, width: `${(NODE_W / W) * 100}%` }}
                >
                  <div data-flow-node className="rtl:-scale-x-100">
                    {button(i)}
                  </div>
                </div>
              ))}
            </div>

            {/* Phones, tablets and small laptops: a tap grid. */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:hidden">
              {t.states.map((s, i) => (
                <div key={s.name}>{button(i, "h-full")}</div>
              ))}
            </div>
          </div>

          {/* Detail of the chosen state. */}
          <div className="lg:col-span-4" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: DURATION.slow, ease: EASE.brand }}
                className="surface-abyss flex h-full flex-col gap-4 rounded-3xl p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-cyan text-abyss">
                    <node.Icon aria-hidden className="size-5" />
                  </span>
                  <span dir="ltr" className="font-mono text-sm text-mist" data-numeric>
                    {String(active + 1).padStart(2, "0")} / {String(t.states.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-h3 text-white">{state.name}</h3>
                <p className="text-mist">{state.body}</p>
                <p className="mt-auto flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-sm text-mist">
                  {t.whoLabel}
                  <span className="rounded-full bg-white/10 px-3 py-1 font-medium text-white">{state.who}</span>
                </p>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <Reveal className="mt-6">
          <p className="max-w-2xl border-s-2 border-cyan-ink ps-4 text-body">{t.editNote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
