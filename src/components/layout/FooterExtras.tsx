"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

import { OPEN_COOKIE_SETTINGS } from "@/components/analytics/Analytics";

/** Reopens the analytics consent banner, so a choice can be changed later. */
export function CookieSettings({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
      className="inline-flex min-h-10 items-center rounded-full border border-white/12 px-4 text-sm text-mist transition-colors hover:border-white/40 hover:text-white"
    >
      {label}
    </button>
  );
}

/** Scrolls back to the top through Lenis (instant when motion is reduced). */
export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0 }))}
      className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 ps-4 pe-1.5 text-sm text-mist transition-colors hover:border-white/40 hover:text-white"
    >
      {label}
      <span className="grid size-7 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-cyan group-hover:text-abyss">
        <ArrowUp aria-hidden className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
}
