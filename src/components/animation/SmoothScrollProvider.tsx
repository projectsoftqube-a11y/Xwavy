"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis wraps the browser's native scroll, so keyboard scrolling, sticky
 * positioning, find-in-page and assistive tech keep working.
 *
 * Reduced motion: Lenis reads `prefers-reduced-motion` itself and, when set,
 * tracks input 1:1 and jumps instantly to anchors, i.e. native behavior.
 *
 * Defined at module level so the options identity never changes; ReactLenis
 * recreates the instance whenever its options change.
 */
const LENIS_OPTIONS: LenisOptions = {
  // Driven by the GSAP ticker below, so there is exactly one rAF loop.
  autoRaf: false,
  lerp: 0.1,
  // Smooth in-page anchor links; offset comes from CSS `scroll-padding-top`.
  anchors: true,
  // Let scrollable children (menus, code blocks, tables) scroll natively.
  allowNestedScroll: true,
  stopInertiaOnNavigate: true,
  // Touch devices keep native momentum scrolling.
  syncTouch: false,
};

/** Feeds Lenis scroll events into ScrollTrigger in the same frame. */
function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Read the instance on every tick: ReactLenis creates it after mount and
    // recreates it under Strict Mode, so it must not be captured once.
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    // Lag smoothing would make scroll-linked animation stutter behind Lenis.
    gsap.ticker.lagSmoothing(0);

    // Web fonts change text metrics; recalculate trigger positions once loaded.
    let cancelled = false;
    void document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33); // GSAP defaults
    };
  }, []);

  return (
    <ReactLenis root options={LENIS_OPTIONS} ref={lenisRef}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
