"use client";

import { useRef, type ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type CinemaHeadingProps = {
  id: string;
  eyebrow?: string;
  number?: string;
  title: string;
  accent?: string;
  /** Colour of the accent words. */
  accentTone?: "cyan" | "gold";
  /** Beside the title on desktop (under it for `md`, and on phones). */
  description?: ReactNode;
  align?: "start" | "center";
  /** `md` for headings in a narrow column beside other content. */
  size?: "lg" | "md";
  className?: string;
};

/**
 * Section heading for the cinematic pages: tracked label, then a huge title
 * whose lines rise out of a mask as it scrolls in, the label's rule drawing
 * across first. Reduced motion shows it still.
 */
export function CinemaHeading({ id, eyebrow, number, title, accent, accentTone = "cyan", description, align = "start", size = "lg", className }: CinemaHeadingProps) {
  const root = useRef<HTMLDivElement>(null);
  const centered = align === "center";
  // A full-width heading puts its description beside the title; a narrow (md) one stacks it.
  const beside = !centered && size === "lg";

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const trigger = { trigger: root.current, start: "top 82%", once: true };
        // Eyebrow and description are optional; GSAP warns on an empty target.
        const rule = q("[data-eyebrow-rule]");
        const fades = q("[data-heading-fade]");
        if (rule.length) gsap.from(rule, { scaleX: 0, duration: 1, ease: "expo.out", scrollTrigger: trigger });
        if (fades.length) gsap.from(fades, { y: 24, autoAlpha: 0, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.25, scrollTrigger: trigger });
        const split = SplitText.create(q("[data-heading-title]"), {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, { yPercent: 115, duration: 1.3, ease: "expo.out", stagger: 0.09, delay: 0.1, scrollTrigger: trigger }),
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={cn("grid grid-cols-1", centered ? "mx-auto max-w-5xl justify-items-center gap-8 text-center" : beside ? "gap-8 lg:grid-cols-12 lg:items-end lg:gap-12" : "gap-6", className)}
    >
      <div className={cn("flex flex-col gap-6", centered ? "items-center" : beside && description ? "lg:col-span-8" : beside && "lg:col-span-12")}>
        {eyebrow ? (
          <div data-heading-fade>
            <Eyebrow number={number}>
              {eyebrow}
            </Eyebrow>
          </div>
        ) : null}
        <h2
          id={id}
          data-heading-title
          className={cn("text-fog", size === "md" ? "font-display text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] leading-[0.98] font-semibold uppercase" : "text-h2")}
        >
          {title}
          {accent ? (
            <>
              {" "}
              <span className={cn("accent", accentTone === "gold" ? "text-gold" : "text-cyan")}>{accent}</span>
            </>
          ) : null}
        </h2>
      </div>
      {description ? (
        <p data-heading-fade className={cn("max-w-xl text-lead text-haze", beside && "lg:col-span-4 lg:pb-2")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
