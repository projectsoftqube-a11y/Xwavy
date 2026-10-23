"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type AutoCycleOptions = {
  /** How many tabs (or steps) take turns. */
  count: number;
  /** Seconds each one stays before the next. */
  seconds?: number;
  initial?: number;
  /** Share of the root that must be on screen for the cycle to run. */
  threshold?: number;
};

/**
 * Plays a set of tabs one after another, the shared engine for every tab set
 * on the site. Attach `root` to the element that holds the tabs and their
 * panel.
 *
 * - Runs only while the root is on screen, the page is visible, motion is
 *   allowed and nobody has paused it. Keyboard focus inside the root holds
 *   it (a mouse click does not), so keyboard users are never moved on.
 * - Choosing a tab jumps to it and the cycle carries on from there.
 * - The active tab's progress, 0 to 1, is written to the root as `--cycle`,
 *   for bars and rings drawn in CSS (scale or conic-gradient).
 * - Reduced motion: no autoplay; `--cycle` stays at 1 so the active tab
 *   reads as complete.
 *
 * Pair with <CycleToggle> for the pause control (WCAG 2.2.2), and turn the
 * panel's aria-live off while `running` (the carousel pattern), so screen
 * readers are not interrupted every few seconds.
 */
export function useAutoCycle<T extends HTMLElement = HTMLDivElement>({ count, seconds = 6, initial = 0, threshold = 0.35 }: AutoCycleOptions) {
  const root = useRef<T>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState(initial);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MEDIA.motionOk);
    const sync = () => setMotionOk(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setPageVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  // Keyboard focus holds the cycle; focus that arrives with a click does not.
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.matches(":focus-visible")) setHeld(true);
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!(event.relatedTarget instanceof Node) || !element.contains(event.relatedTarget)) setHeld(false);
    };
    element.addEventListener("focusin", onFocusIn);
    element.addEventListener("focusout", onFocusOut);
    return () => {
      element.removeEventListener("focusin", onFocusIn);
      element.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // One timer per active tab: it fills --cycle, then moves to the next tab.
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (!motionOk) {
      element.style.setProperty("--cycle", "1");
      return;
    }
    const state = { progress: 0 };
    element.style.setProperty("--cycle", "0");
    tween.current = gsap.to(state, {
      progress: 1,
      duration: seconds,
      ease: "none",
      paused: true,
      onUpdate: () => element.style.setProperty("--cycle", state.progress.toFixed(4)),
      onComplete: () => setActive((i) => (i + 1) % count),
    });
    return () => {
      tween.current?.kill();
      tween.current = null;
    };
  }, [active, motionOk, seconds, count]);

  const running = motionOk && playing && !held && inView && pageVisible;
  useEffect(() => {
    tween.current?.paused(!running);
  }, [running, active]);

  const select = useCallback((index: number) => setActive(((index % count) + count) % count), [count]);
  const toggle = useCallback(() => setPlaying((p) => !p), []);

  return { root, active, select, playing, toggle, running, autoplay: motionOk };
}
