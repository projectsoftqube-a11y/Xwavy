"use client";

import { Ban, Lock, PenLine, Percent, Tag } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type PromiseBandProps = {
  /** Accessible name for the band. */
  label: string;
  /** The five promises to innovators, in the order of home.pricing.facts. */
  promises: readonly string[];
};

/** One icon per promise: free to post, no listing fees, no commission, decline freely, contact sealed. */
const ICONS = [PenLine, Tag, Percent, Ban, Lock] as const;

/**
 * The promises to innovators as one still glass panel: five cells divided by
 * hairlines, each with an icon, a number and the promise in title capitals.
 * On scroll a cyan line draws across the top of the panel and the cells rise
 * in after it, one by one; hovering a cell lights its icon. Nothing moves
 * sideways or loops.
 */
export function PromiseBand({ label, promises }: PromiseBandProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: root.current, start: "top 85%", once: true } })
          .from(q("[data-band]"), { y: 40, autoAlpha: 0, duration: 1.2 }, 0)
          .from(q("[data-band-line]"), { scaleX: 0, duration: 1.6, ease: "expo.inOut" }, 0.15)
          .from(q("[data-band-cell]"), { y: 30, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.45)
          .from(q("[data-band-icon]"), { scale: 0.4, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "back.out(2)" }, 0.55);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label={label} className="relative bg-night py-section">
      <Container>
        <div data-band className="panel-night relative overflow-hidden rounded-3xl">
          <span aria-hidden data-band-line className="absolute inset-x-0 top-0 h-px origin-left bg-linear-to-r from-transparent via-cyan to-transparent rtl:origin-right" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {promises.map((promise, i) => {
              const Icon = ICONS[i] ?? PenLine;
              return (
                <li
                  key={promise}
                  data-band-cell
                  className="group relative flex items-center gap-5 border-hair px-6 py-7 max-lg:border-b max-lg:last:border-b-0 sm:max-lg:odd:border-e sm:max-lg:last:col-span-2 lg:flex-col lg:items-start lg:gap-8 lg:border-e lg:px-7 lg:py-9 lg:last:border-e-0"
                >
                  <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgb(0_225_234/0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span
                    data-band-icon
                    className="relative grid size-12 shrink-0 place-items-center rounded-full border border-cyan/35 text-cyan transition-colors duration-500 group-hover:border-cyan group-hover:bg-cyan group-hover:text-night"
                  >
                    <Icon aria-hidden className="size-5" strokeWidth={1.7} />
                  </span>
                  <span className="relative flex flex-col gap-1.5">
                    <span aria-hidden dir="ltr" className="font-display text-base tracking-[0.2em] text-dim rtl:text-end" data-numeric>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.375rem] leading-tight font-medium tracking-wide text-fog uppercase lg:text-[1.5rem]">{promise}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
