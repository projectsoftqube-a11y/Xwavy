"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, MEDIA, REVEAL } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /**
   * Animate direct children one after another instead of the wrapper as a
   * whole. Use for card grids and lists.
   */
  stagger?: boolean;
  /**
   * `up` fades and lifts content in. `image` is for a photo frame (an
   * overflow-hidden box holding an <img>): the frame opens with a soft wipe,
   * the photo settles from a slight zoom, then drifts gently while the frame
   * crosses the viewport.
   */
  variant?: "up" | "image";
  /** Element to render, so lists and tables keep valid markup (ul/ol > li, tbody > tr). */
  as?: "div" | "ul" | "ol" | "tbody";
  /** Seconds to wait before starting. */
  delay?: number;
};

/**
 * Scroll-triggered entrance, played once. Transform, opacity and clip only.
 *
 * Content is fully visible in the server HTML and without JavaScript; GSAP
 * only hides it after hydration. Hero content is animated by its own component
 * on load. Users who prefer reduced motion get static content: animations are
 * only created inside the `motionOk` media query.
 */
export function Reveal({ children, className, stagger = false, variant = "up", as: Tag = "div", delay = 0 }: RevealProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        if (variant === "image") {
          const photo = element.querySelector("img");
          gsap.from(element, {
            clipPath: "inset(10% 6% 10% 6%)",
            duration: 1.2,
            ease: "power3.out",
            delay,
            clearProps: "clipPath",
            scrollTrigger: { trigger: element, start: REVEAL.start, once: true },
          });
          if (photo) {
            // Settle from a slight zoom, then drift with scroll (scale stays
            // above 1 so the drift never shows an edge).
            gsap.fromTo(photo, { scale: 1.22 }, { scale: 1.1, duration: 1.4, ease: "power3.out", delay, scrollTrigger: { trigger: element, start: REVEAL.start, once: true } });
            gsap.fromTo(
              photo,
              { yPercent: -4 },
              { yPercent: 4, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true } },
            );
          }
          return;
        }

        const targets = stagger ? Array.from(element.children) : element;
        gsap.from(targets, {
          autoAlpha: 0,
          y: REVEAL.y,
          duration: DURATION.reveal,
          ease: EASE.gsapOut,
          delay,
          stagger: stagger ? REVEAL.stagger : 0,
          // Hand the element back to CSS afterwards, so hover transforms work.
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: element, start: REVEAL.start, once: true },
        });
      });
    },
    { scope: root, dependencies: [stagger, variant, delay] },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- polymorphic ref across div/ul/ol/tbody
    <Tag ref={root as any} className={className}>
      {children}
    </Tag>
  );
}
