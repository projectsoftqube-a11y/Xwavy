"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

/**
 * A hairline under the header that fills with cyan as the page is read.
 * Decorative: hidden from assistive tech, and absent with reduced motion.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MEDIA.motionOk, () => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 } },
      );
    });
  });

  return (
    <span
      ref={bar}
      aria-hidden
      className="z-header fixed inset-x-0 top-[calc(var(--spacing-header)-1px)] h-px origin-left scale-x-0 bg-cyan shadow-[0_0_10px_rgb(0_225_234/0.8)] motion-reduce:hidden rtl:origin-right"
    />
  );
}
