"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type CardStageProps = {
  children: ReactNode;
  className?: string;
  /** Element to render, so lists keep valid markup. */
  as?: "div" | "ul" | "ol";
};

/**
 * Animates a group of cards rendered by a server component (so cards can
 * carry server-only props such as icon components):
 * - children marked [data-card] rise in one after another as the group
 *   scrolls in; any [data-card-media] inside opens upward and its image
 *   settles from a zoom;
 * - while the pointer is over a [data-card], its --x / --y custom properties
 *   follow the pointer, for a light drawn in CSS
 *   (bg-[radial-gradient(…_at_var(--x)_var(--y),…)]).
 * Reduced motion: no entrance; the light still follows (it is not motion).
 */
export function CardStage({ children, className, as: Tag = "div" }: CardStageProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;
      const q = gsap.utils.selector(element);

      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const once = { trigger: element, start: "top 82%", once: true };
        gsap.fromTo(q("[data-card]"), { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, ease: "expo.out", stagger: 0.09, clearProps: "transform", scrollTrigger: once });
        // Not every group has photographs; GSAP warns on an empty target.
        const media = q("[data-card-media]");
        if (!media.length) return;
        gsap.fromTo(media, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", stagger: 0.09, clearProps: "clipPath", scrollTrigger: once });
        gsap.fromTo(q("[data-card-media] img"), { scale: 1.3 }, { scale: 1.05, duration: 2, ease: "expo.out", stagger: 0.09, scrollTrigger: once });
      });

      const move = (event: PointerEvent) => {
        const card = (event.target as Element | null)?.closest<HTMLElement>("[data-card]");
        if (!card || !element.contains(card)) return;
        const box = card.getBoundingClientRect();
        card.style.setProperty("--x", `${event.clientX - box.left}px`);
        card.style.setProperty("--y", `${event.clientY - box.top}px`);
      };
      element.addEventListener("pointermove", move);
      return () => element.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- polymorphic ref across div/ul/ol
    <Tag ref={root as any} className={cn(className)}>
      {children}
    </Tag>
  );
}

/** The pointer light for a [data-card]: absolutely positioned, shown on hover. */
export const CARD_LIGHT =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,0%),rgb(0_225_234/0.13),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100";
