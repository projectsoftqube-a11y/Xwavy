"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

import { OPEN_COOKIE_SETTINGS } from "@/components/analytics/Analytics";

/** Reopens the analytics consent banner, so a choice can be changed later. */
export function CookieSettings({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
      className="inline-flex min-h-10 items-center rounded-(--radius-control) border border-hair-strong px-4 text-base text-haze transition-colors hover:border-white/40 hover:text-fog"
    >
      {label}
    </button>
  );
}

/** Circumference of the progress ring (r = 22 in a 48 × 48 box). */
const RING = 2 * Math.PI * 22;

/**
 * Floating back-to-top button, fixed at the bottom of the end edge (right in
 * English, left in Arabic). It appears once the first screen has scrolled
 * away; a ring around it fills as the page is read. Scrolls back through
 * Lenis (instant when motion is reduced). Sits under the header and the
 * mobile menu.
 */
export function ScrollTopButton({ label }: { label: string }) {
  const lenis = useLenis();
  const button = useRef<HTMLButtonElement>(null);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      ring.current?.style.setProperty("stroke-dashoffset", String(RING * (1 - progress)));
      button.current?.toggleAttribute("data-shown", window.scrollY > window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      ref={button}
      type="button"
      aria-label={label}
      title={label}
      onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0 }))}
      className="group fixed end-4 bottom-4 z-30 grid size-12 translate-y-4 place-items-center rounded-full bg-night/80 text-fog opacity-0 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)] backdrop-blur-md transition-[opacity,translate,background-color,color] duration-500 ease-brand pointer-events-none hover:bg-cyan hover:text-night data-shown:pointer-events-auto data-shown:translate-y-0 data-shown:opacity-100 sm:end-6 sm:bottom-6 sm:size-14"
    >
      {/* Reading progress. */}
      <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
        <circle cx="24" cy="24" r="22" fill="none" strokeWidth="1.5" className="stroke-white/15" />
        <circle
          ref={ring}
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={RING}
          strokeDashoffset={RING}
          className="stroke-cyan transition-[stroke] duration-500 group-hover:stroke-night"
        />
      </svg>
      <ArrowUp aria-hidden className="relative size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
