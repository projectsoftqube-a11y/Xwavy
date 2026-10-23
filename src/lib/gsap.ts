import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Single entry point for GSAP. Import `gsap`, `ScrollTrigger`, `SplitText`,
 * `DrawSVGPlugin` and `useGSAP` from here rather than from the packages, so plugins are always
 * registered.
 *
 * Registration is guarded so importing this module during server rendering
 * is harmless; all animation code must still run inside `useGSAP()`, which
 * only executes in the browser.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);
}

/**
 * Recalculate ScrollTrigger positions after a layout change that ScrollTrigger
 * cannot observe itself (accordion expanded, images or fonts loaded late).
 * Viewport resizes are already handled by ScrollTrigger.
 */
export function refreshScrollTrigger(): void {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}

export { DrawSVGPlugin, gsap, ScrollTrigger, SplitText, useGSAP };
