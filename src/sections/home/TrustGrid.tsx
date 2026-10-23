"use client";

import { BadgeCheck, CreditCard, Handshake, Languages, LockKeyhole, ShieldCheck } from "lucide-react";
import { useRef, type PointerEvent } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Container } from "@/components/layout/Container";
import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type TrustGridProps = { t: Dictionary["home"]["trust"] };

/** One icon per safeguard, in the order of t.items. */
const ICONS = [ShieldCheck, LockKeyhole, BadgeCheck, CreditCard, Languages, Handshake] as const;

/** Moves the cell's light to the pointer. */
function trackPointer(event: PointerEvent<HTMLLIElement>) {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - box.top}px`);
}

/**
 * Trust and safety as six cells on a hairline grid, each numbered in large
 * outline, set clear of the cell edges. A soft cyan light follows the pointer inside a cell and its rule
 * lights; on scroll the cells unfold upward one after another.
 */
export function TrustGrid({ t }: TrustGridProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const grid = q("[data-trust-grid]")[0];
        gsap.fromTo(
          q("[data-trust-cell]"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut", stagger: { each: 0.1, grid: "auto", from: "start" }, scrollTrigger: { trigger: grid, start: "top 78%", once: true } },
        );
        gsap.from(q("[data-trust-copy]"), { y: 24, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.06, delay: 0.5, scrollTrigger: { trigger: grid, start: "top 78%", once: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="trust-title" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <Container>
        <CinemaHeading id="trust-title" number="05" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} />

        <ul data-trust-grid className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hair bg-hair sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <li
                key={item.title}
                data-trust-cell
                onPointerMove={trackPointer}
                className="group relative flex min-h-80 flex-col gap-5 overflow-hidden bg-night p-7 sm:p-9"
              >
                {/* The light that follows the pointer. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,50%),rgb(0_225_234/0.14),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-cyan transition-transform duration-700 ease-brand group-hover:scale-x-100 rtl:origin-right" />
                <span aria-hidden dir="ltr" className="stroke-text-hair-strong absolute end-7 top-7 font-display text-[4.5rem] leading-none font-bold transition-[-webkit-text-stroke-color] duration-500 group-hover:[-webkit-text-stroke-color:rgb(0_225_234/0.6)] sm:end-9 sm:top-9" data-numeric>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span data-trust-copy className="relative grid size-12 place-items-center rounded-xl border border-hair-strong text-cyan transition-colors duration-500 group-hover:border-cyan group-hover:bg-cyan group-hover:text-night">
                  <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                </span>
                <h3 data-trust-copy className="relative mt-auto font-display text-[1.75rem] leading-none font-semibold text-fog uppercase">
                  {item.title}
                </h3>
                <p data-trust-copy className="relative text-base leading-relaxed text-haze">
                  {item.body}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
