"use client";

import { Ban, Hourglass, ShieldX } from "lucide-react";
import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

/** One icon per rule, in the order of home.consent.rules: a decline, expiry, no re-requests. */
const ICONS = [Ban, Hourglass, ShieldX] as const;

/**
 * The three rules that keep the double opt-in fair, as three cards. Each
 * card's icon is drawn line by line as the cards rise in, inside a ring that
 * glows; a numbered tag sits on the card's edge. Hovering a card lifts it,
 * sends a light along its top edge and fills the icon's ring. Reduced motion
 * shows the cards still.
 */
export function ConsentRules({ rules }: { rules: readonly string[] }) {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: root.current, start: "top 82%", once: true } })
          .from(q("[data-rule]"), { y: 60, autoAlpha: 0, duration: 1.2, stagger: 0.14 }, 0)
          .from(q("[data-rule-ring]"), { scale: 0.5, autoAlpha: 0, duration: 1, stagger: 0.14, ease: "back.out(2)" }, 0.3)
          .from(q("[data-rule-icon] :is(path, line, circle, polyline, rect)"), { drawSVG: "0%", duration: 1.4, stagger: 0.06, ease: "power2.inOut" }, 0.45)
          .from(q("[data-rule-text]"), { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.14 }, 0.6);
      });
    },
    { scope: root },
  );

  return (
    <ul ref={root} className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
      {rules.map((rule, i) => {
        const Icon = ICONS[i] ?? ShieldX;
        return (
          <li
            key={rule}
            data-rule
            className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-hair bg-night-1 p-6 transition-[translate,border-color] duration-500 ease-brand hover:-translate-y-1.5 hover:border-cyan/40 sm:flex-row sm:items-center sm:gap-8 sm:p-8 lg:flex-col lg:items-stretch"
          >
            {/* A light running along the top edge on hover, and a soft glow under it. */}
            <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-transparent via-cyan to-transparent transition-transform duration-700 ease-brand group-hover:scale-x-100 rtl:origin-right" />
            <span aria-hidden className="glow-cyan pointer-events-none absolute -top-24 start-1/2 size-64 -translate-x-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-100 rtl:translate-x-1/2" />

            <div className="relative flex items-start justify-between gap-4 sm:contents lg:flex">
              <span
                data-rule-ring
                className="relative grid size-16 shrink-0 place-items-center rounded-full border border-cyan/40 text-cyan shadow-[0_0_30px_-6px_rgb(0_225_234/0.6)] transition-colors duration-500 group-hover:border-cyan group-hover:bg-cyan group-hover:text-night"
              >
                <Icon aria-hidden data-rule-icon className="size-7" strokeWidth={1.5} />
              </span>
              <span dir="ltr" className="rounded-full border border-hair-strong px-3 py-1 font-display text-base tracking-[0.16em] text-haze sm:order-last sm:self-start lg:order-none" data-numeric>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <p data-rule-text className="relative flex-1 font-display text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] leading-[1.15] font-medium text-fog uppercase">
              {rule}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
