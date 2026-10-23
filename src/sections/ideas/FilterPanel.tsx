"use client";

import { Check, Lock, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useRef } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Container } from "@/components/layout/Container";
import type copy from "@/i18n/pages/ideas";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type FilterPanelProps = { t: (typeof copy)["en"]["filters"] };

/**
 * The directory's tools drawn as the console they are, on night: a search
 * field, then the free filters and the subscriber tools side by side, the
 * latter locked behind a gold pane. As it scrolls in the search text types
 * itself out, the free filters switch on one after another, and a sheen
 * crosses the locked tools.
 */
export function FilterPanel({ t }: FilterPanelProps) {
  const root = useRef<HTMLElement>(null);
  const [free, paid] = t.cards;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const console = q("[data-console]")[0];
        if (!console) return;
        const rtl = getComputedStyle(console).direction === "rtl";
        const tl = gsap.timeline({ scrollTrigger: { trigger: console, start: "top 75%", once: true } });
        tl.from(console, { y: 60, autoAlpha: 0, duration: 1.1, ease: "expo.out" })
          .fromTo(
            q("[data-typed]"),
            { clipPath: rtl ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0%)", duration: 1.2, ease: "steps(22)" },
            0.5,
          )
          .from(q("[data-pane]"), { y: 30, autoAlpha: 0, duration: 0.9, ease: "expo.out", stagger: 0.15 }, 0.6)
          .from(q("[data-chip-on]"), { scale: 0.85, autoAlpha: 0, duration: 0.5, ease: "back.out(2)", stagger: 0.1 }, 1)
          .from(q("[data-chip-locked]"), { autoAlpha: 0, y: 8, duration: 0.5, ease: "power3.out", stagger: 0.08 }, 1.1)
          .fromTo(q("[data-sheen]"), { xPercent: -130 }, { xPercent: 130, duration: 1.6, ease: "power2.inOut" }, 1.4);
      });
    },
    { scope: root },
  );

  if (!free || !paid) return null;

  return (
    <section ref={root} aria-labelledby="id-filters" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-gold pointer-events-none absolute -bottom-52 end-[-10rem] size-[46rem] opacity-35" />
      <Container className="relative">
        <CinemaHeading id="id-filters" number="02" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} accentTone="gold" align="center" />

        <div data-console className="mx-auto mt-14 max-w-6xl rounded-[2rem] border border-hair bg-night-1 p-3 shadow-[0_60px_140px_-60px_rgb(0_0_0/0.9)] sm:p-4 lg:mt-20">
          {/* Search field. */}
          <div className="flex min-h-16 items-center gap-3 rounded-2xl border border-hair-strong bg-night px-4 sm:px-5">
            <Search aria-hidden className="size-5 shrink-0 text-cyan" />
            <span className="flex min-w-0 flex-1 items-center gap-1">
              <span data-typed className="truncate text-fog">
                {free.points[1]}
              </span>
              <span aria-hidden className="h-5 w-0.5 shrink-0 animate-pulse bg-cyan" />
            </span>
            <span className="hidden shrink-0 rounded-full border border-hair-strong px-3 py-1 text-base text-haze sm:inline">{free.points[2]}</span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* Free filters. */}
            <div data-pane className="relative overflow-hidden rounded-2xl border border-hair bg-night p-5 sm:p-7">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan to-transparent" />
              <div className="flex items-center gap-3.5">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-cyan/40 text-cyan">
                  <SlidersHorizontal aria-hidden className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base tracking-[0.16em] text-cyan uppercase">{free.kicker}</span>
                  <span className="block font-display text-[1.5rem] leading-tight font-semibold text-fog uppercase">{free.title}</span>
                </span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {free.points.map((point) => (
                  <li key={point} data-chip-on className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-3.5 py-2 text-base text-fog">
                    <span className="grid size-5 place-items-center rounded-full bg-cyan text-night">
                      <Check aria-hidden strokeWidth={3} className="size-3" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscriber tools. */}
            <div data-pane className="border-glow relative overflow-hidden rounded-2xl p-5 [--card-fill:var(--color-night-2)] sm:p-7">
              <span aria-hidden data-sheen className="pointer-events-none absolute inset-y-0 -inset-x-1/2 -translate-x-[130%] skew-x-[-18deg] bg-linear-to-r from-transparent via-gold/10 to-transparent" />
              <div className="relative flex items-center gap-3.5">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold text-night shadow-[0_0_30px_-4px_rgb(255_181_71/0.6)]">
                  <Sparkles aria-hidden className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base tracking-[0.16em] text-gold uppercase">{paid.kicker}</span>
                  <span className="block font-display text-[1.5rem] leading-tight font-semibold text-fog uppercase">{paid.title}</span>
                </span>
              </div>
              <ul className="relative mt-6 flex flex-wrap gap-2.5">
                {paid.points.map((point) => (
                  <li key={point} data-chip-locked className="inline-flex items-center gap-2 rounded-full border border-dashed border-gold/45 px-3.5 py-2 text-base text-haze">
                    <Lock aria-hidden className="size-3.5 text-gold" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
