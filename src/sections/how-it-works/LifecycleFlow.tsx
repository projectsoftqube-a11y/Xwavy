"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Archive, CircleX, FilePen, Globe, Hourglass, MessageSquareWarning, Pause, Trash2 } from "lucide-react";
import { useId, useRef } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { CycleToggle } from "@/components/animation/CycleToggle";
import { useAutoCycle } from "@/components/animation/useAutoCycle";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, MEDIA } from "@/lib/motion";

type LifecycleFlowProps = {
  t: (typeof copy)["en"]["lifecycle"];
  /** Pause / play for the states playing in turn. */
  controls: { play: string; pause: string };
};

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
  main: "border-hair-strong bg-night-1 text-fog",
  live: "border-cyan/60 bg-cyan/[0.08] text-fog",
  branch: "border-gold/40 bg-gold/[0.06] text-fog",
  end: "border-dashed border-hair-strong bg-night text-haze",
};

const iconClass: Record<Tone, string> = {
  main: "bg-white/[0.06] text-fog",
  live: "bg-cyan/15 text-cyan",
  branch: "bg-gold/15 text-gold",
  end: "bg-white/[0.04] text-haze",
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
 * The life of an idea as a flowchart on night (wide screens) or a tap grid
 * (everything narrower). Choosing a state shows what it means and who can
 * move it. As the diagram enters the arrows draw themselves and the states
 * light up in turn; a cyan signal then keeps running the main path, from
 * draft to archived. The states play in turn (useAutoCycle), the detail
 * card's line filling with each one's time.
 */
export function LifecycleFlow({ t, controls }: LifecycleFlowProps) {
  const root = useRef<HTMLElement>(null);
  const cycle = useAutoCycle<HTMLDivElement>({ count: t.states.length, seconds: 5 });
  const active = cycle.active;
  const groupId = useId();
  const state = t.states[active] ?? t.states[0];
  const node = NODES[active] ?? NODES[0];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: q("[data-flow-stage]")[0],
            start: "top 75%",
            once: true,
          },
        });
        const nodes = q("[data-flow-node]");
        const tiles = q("[data-flow-tile]");
        const edges = q("[data-flow-edge]");
        if (nodes.length)
          tl.from(
            nodes,
            {
              scale: 0.8,
              autoAlpha: 0,
              duration: 0.6,
              ease: "back.out(1.6)",
              stagger: 0.07,
            },
            0,
          );
        if (edges.length) tl.from(edges, { drawSVG: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.08 }, 0.3);
        if (tiles.length)
          tl.from(
            tiles,
            {
              y: 24,
              autoAlpha: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.05,
            },
            0,
          );

        // A signal running the main path, draft to archived, once the chart has drawn.
        const signal = q("[data-flow-signal]")[0];
        const from = (NODES[0]?.x ?? 0) + NODE_W / 2;
        const to = (NODES[6]?.x ?? W) - NODE_W / 2;
        if (signal) {
          tl.fromTo(
            signal,
            { attr: { cx: from }, autoAlpha: 0 },
            {
              keyframes: [
                { autoAlpha: 1, duration: 0.3 },
                { attr: { cx: to }, duration: 3.4, ease: "none" },
                { autoAlpha: 0, duration: 0.3 },
              ],
              repeat: -1,
              repeatDelay: 0.8,
            },
            ">",
          );
        }
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
        onClick={() => cycle.select(i)}
        className={cn(
          "relative flex w-full items-center gap-2.5 overflow-hidden rounded-2xl border px-3 py-3 text-start transition-[background-color,border-color,box-shadow,color] duration-300",
          selected ? "border-cyan bg-cyan text-night shadow-[0_0_40px_-6px_rgb(0_225_234/0.6)]" : cn(toneClass[n.tone], "hover:border-fog/50"),
          extra,
        )}
      >
        <span className={cn("grid size-8 shrink-0 place-items-center rounded-full transition-colors", selected ? "bg-night/15 text-night" : iconClass[n.tone])}>
          <n.Icon aria-hidden className="size-4" />
        </span>
        <span className="min-w-0 text-base leading-tight font-semibold">{s.name}</span>
        {selected ? (
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-night/15">
            <span className="absolute inset-0 origin-left bg-night/55 rtl:origin-right" style={{ transform: "scaleX(var(--cycle, 0))" }} />
          </span>
        ) : null}
      </button>
    );
  };

  return (
    <section ref={root} aria-labelledby="hiw-lifecycle" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-gold pointer-events-none absolute -top-40 start-[-12rem] size-[40rem] opacity-30" />
      <Container className="relative">
        <CinemaHeading id="hiw-lifecycle" number="03" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} accentTone="gold" description={t.body} />

        <div ref={cycle.root} data-flow-stage className="mt-14 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Wide screens: the flowchart, from 2xl, where each node is wide enough for its label. */}
          <div role="group" aria-label={t.pickLabel} className="lg:col-span-8">
            <div className="relative hidden aspect-[1000/420] rounded-3xl border border-hair bg-night-1 2xl:block rtl:-scale-x-100">
              <span aria-hidden className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle,rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
              <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible text-fog/35">
                <defs>
                  <marker id={`${groupId}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                  </marker>
                  <filter id={`${groupId}-glow`} x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
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
                <circle data-flow-signal cx={(NODES[0]?.x ?? 0) + NODE_W / 2} cy={NODES[0]?.y} r="5" fill="var(--color-cyan)" filter={`url(#${groupId}-glow)`} opacity="0" />
              </svg>
              {NODES.map((n, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${(n.x / W) * 100}%`,
                    top: `${(n.y / H) * 100}%`,
                    width: `${(NODE_W / W) * 100}%`,
                  }}
                >
                  <div data-flow-node className="rtl:-scale-x-100">
                    {button(i)}
                  </div>
                </div>
              ))}
            </div>

            {/* Phones, tablets and laptops: a tap grid. */}
            <div className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 2xl:hidden">
              {t.states.map((s, i) => (
                <div key={s.name} data-flow-tile>
                  {button(i, "h-full")}
                </div>
              ))}
            </div>
          </div>

          {/* Detail of the chosen state. */}
          <div className="lg:col-span-4" aria-live={cycle.running ? "off" : "polite"}>
            <div className="border-glow flex h-full flex-col rounded-3xl [--card-fill:var(--color-night-2)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: DURATION.slow, ease: EASE.brand }}
                  className="flex flex-1 flex-col gap-4 p-7 pb-5 sm:p-8 sm:pb-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-full bg-cyan text-night shadow-[0_0_30px_-4px_rgb(0_225_234/0.6)]">
                      <node.Icon aria-hidden className="size-5" />
                    </span>
                    <span dir="ltr" className="flex items-baseline gap-1.5" data-numeric>
                      <span className="font-display text-[2.25rem] leading-none font-bold stroke-text-fog">{String(active + 1).padStart(2, "0")}</span>
                      <span className="font-display text-base tracking-[0.1em] text-dim">/ {String(t.states.length).padStart(2, "0")}</span>
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-none font-semibold text-fog uppercase">{state.name}</h3>
                  <p className="text-base leading-relaxed text-haze">{state.body}</p>
                  <p className="mt-auto flex flex-wrap items-center gap-2 border-t border-hair pt-5 text-base text-haze">
                    {t.whoLabel}
                    <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-medium text-gold">{state.who}</span>
                  </p>
                </motion.article>
              </AnimatePresence>
              {/* The state's time and the pause control. */}
              <div className="flex items-center gap-4 px-7 pb-6 sm:px-8">
                <span aria-hidden className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span className="absolute inset-0 origin-left bg-cyan rtl:origin-right" style={{ transform: "scaleX(var(--cycle, 0))" }} />
                </span>
                {cycle.autoplay ? <CycleToggle playing={cycle.playing} onToggle={cycle.toggle} labels={controls} /> : null}
              </div>
            </div>
          </div>
        </div>

        <Reveal className="mt-8">
          <p className="flex max-w-3xl items-start gap-3 rounded-2xl border border-hair bg-night-1 p-5 text-base text-haze">
            <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-cyan shadow-[0_0_12px_rgb(0_225_234/0.9)]" />
            {t.editNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
