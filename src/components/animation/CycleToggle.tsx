"use client";

import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/cn";

type CycleToggleProps = {
  playing: boolean;
  onToggle: () => void;
  labels: { play: string; pause: string };
  /** Ring colour: the tab set's accent. */
  tone?: "cyan" | "gold";
  className?: string;
};

const RING = { cyan: "var(--color-cyan)", gold: "var(--color-gold)" } as const;

/**
 * Pause / play for a tab set that advances on its own (useAutoCycle). A ring
 * around the button fills with the active tab's time, read from the
 * `--cycle` custom property the cycle writes on its root.
 */
export function CycleToggle({ playing, onToggle, labels, tone = "cyan", className }: CycleToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? labels.pause : labels.play}
      className={cn("group/cycle relative grid size-11 shrink-0 place-items-center rounded-full text-fog transition-colors hover:text-night", className)}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full p-0.5 [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        style={{ background: `conic-gradient(${RING[tone]} calc(var(--cycle, 0) * 1turn), rgb(255 255 255 / 0.14) 0)` }}
      />
      <span aria-hidden className={cn("absolute inset-1 rounded-full bg-night-1 transition-colors duration-300", tone === "gold" ? "group-hover/cycle:bg-gold" : "group-hover/cycle:bg-cyan")} />
      {playing ? <Pause aria-hidden className="relative size-4" /> : <Play aria-hidden className="relative size-4 translate-x-px" />}
    </button>
  );
}
