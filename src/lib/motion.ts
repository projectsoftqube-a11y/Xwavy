/**
 * Shared motion values for GSAP and Framer Motion so both libraries feel like
 * one system. CSS equivalents live in globals.css (`--duration-*`, `--ease-brand`).
 *
 * Ownership rule: GSAP owns scroll-driven choreography; Framer Motion owns local
 * UI state transitions (menus, toggles, form feedback). Never let both animate
 * the same property on the same element.
 */

export const MEDIA = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  motionOk: "(prefers-reduced-motion: no-preference)",
} as const;

/** Durations in seconds (GSAP and Framer Motion both use seconds). */
export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.45,
  reveal: 0.9,
} as const;

export const EASE = {
  /** GSAP ease name for entrances. */
  gsapOut: "power3.out",
  /** Matches `--ease-brand` in CSS; use with Framer Motion. */
  brand: [0.22, 1, 0.36, 1] as const,
} as const;

export const REVEAL = {
  y: 44,
  stagger: 0.1,
  /** ScrollTrigger start: element top reaches 88% of the viewport height. */
  start: "top 88%",
} as const;
