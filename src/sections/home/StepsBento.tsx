"use client";

import Image from "next/image";
import { useRef } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Container } from "@/components/layout/Container";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type StepsBentoProps = {
  t: Dictionary["home"]["process"];
  /** Alt text for the five step photographs, in order. */
  alts: readonly string[];
};

/** One photograph per step, in story order (public/images/site). */
const PHOTOS = [
  "/images/site/home-step-1-post.webp",
  "/images/site/home-step-2-review.webp",
  "/images/site/home-step-3-discover.webp",
  "/images/site/home-step-4-request.webp",
  "/images/site/home-step-5-connect.webp",
] as const;

/** Step 4 (the request) is the investor's move, so it reads gold; the rest are the idea's. */
const INVESTOR_STEP = 3;

/** Grid placement per step: on tablets one wide card then two pairs; on desktop two wide cards, then three. */
const SPANS = [
  "md:col-span-2 lg:col-span-7 lg:min-h-[34rem]",
  "lg:col-span-5 lg:min-h-[34rem]",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
] as const;

/**
 * From draft to introduction as a grid of five photographic cards: two wide
 * cards over three. Each card carries its step's photograph, a large outlined
 * number, the status the product shows at that step, its name, title and
 * what happens. Phones stack the cards with the photograph on top.
 *
 * On scroll the cards rise in one after another, each opening upward while
 * its photograph settles. On hover (precise pointers) a card tilts toward the
 * pointer, its photograph zooms gently and its number fills with colour.
 * Reduced motion shows the grid still.
 */
export function StepsBento({ t, alts }: StepsBentoProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-step-card]", root.current);
        cards.forEach((card, i) => {
          const c = gsap.utils.selector(card);
          const once = { trigger: card, start: "top 85%", once: true };
          gsap
            .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: once, delay: (i % 3) * 0.08 })
            .fromTo(card, { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, clearProps: "transform" }, 0)
            .fromTo(c("[data-step-media]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", clearProps: "clipPath" }, 0)
            .fromTo(c("[data-step-img]"), { scale: 1.3 }, { scale: 1.05, duration: 2 }, 0)
            .from(c("[data-step-copy]"), { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.07 }, 0.5);
        });
      });

      // Tilt toward the pointer, only where hover is real.
      mm.add(`${MEDIA.motionOk} and (hover: hover) and (pointer: fine)`, () => {
        const cleanups = gsap.utils.toArray<HTMLElement>("[data-step-card]", root.current).map((card) => {
          gsap.set(card, { transformPerspective: 1000 });
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
          const move = (event: PointerEvent) => {
            const box = card.getBoundingClientRect();
            ry(((event.clientX - box.left) / box.width - 0.5) * 7);
            rx(((event.clientY - box.top) / box.height - 0.5) * -7);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          return () => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          };
        });
        return () => cleanups.forEach((cleanup) => cleanup());
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="steps-title" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <Container>
        <CinemaHeading id="steps-title" number="02" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} />

        <ol className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          {t.steps.map((step, i) => {
            const investor = i === INVESTOR_STEP;
            const number = String(i + 1).padStart(2, "0");
            return (
              <li
                key={step.name}
                data-step-card
                className={cn(
                  "group relative isolate flex flex-col overflow-hidden rounded-3xl border border-hair bg-night-1 transition-[border-color] duration-500 md:min-h-[28rem]",
                  investor ? "hover:border-gold/50" : "hover:border-cyan/50",
                  SPANS[i],
                )}
              >
                {/* Photograph: a block on top on phones; behind the whole card from md. */}
                <div data-step-media className="relative aspect-[16/10] overflow-hidden md:absolute md:inset-0 md:-z-10 md:aspect-auto">
                  <Image
                    data-step-img
                    src={PHOTOS[i] ?? PHOTOS[0]}
                    alt={alts[i] ?? ""}
                    fill
                    sizes={i < 2 ? "(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                    className="scale-105 object-cover transition-transform duration-1000 ease-brand group-hover:scale-110"
                  />
                  <span aria-hidden className="absolute inset-0 bg-linear-to-t from-night-1 via-night-1/10 to-transparent md:from-night md:via-night/70 md:to-night/5" />
                </div>

                {/* Top: the number and the status. Over the photograph. */}
                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5 sm:p-7 md:relative">
                  <span aria-hidden dir="ltr" className="relative font-display text-[3.5rem] leading-none font-bold sm:text-[4.5rem]" data-numeric>
                    <span className="stroke-text-fog opacity-80">{number}</span>
                    <span
                      className={cn(
                        "absolute inset-0 [clip-path:inset(100%_0%_0%_0%)] transition-[clip-path] duration-700 ease-brand group-hover:[clip-path:inset(0%_0%_0%_0%)]",
                        investor ? "text-gold" : "text-cyan",
                      )}
                    >
                      {number}
                    </span>
                  </span>
                  <span
                    data-step-copy
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border bg-night/70 px-3 py-1 text-base whitespace-nowrap backdrop-blur-md",
                      investor ? "border-gold/40 text-gold" : "border-cyan/40 text-cyan",
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full", investor ? "bg-gold" : "bg-cyan")} />
                    {t.statuses[i]}
                  </span>
                </div>

                {/* Foot: name, title and what happens. */}
                <div className="flex flex-col gap-3 p-5 sm:p-7 md:mt-auto">
                  <p data-step-copy className={cn("font-display text-base tracking-[0.2em] uppercase", investor ? "text-gold" : "text-cyan")}>
                    <span className="sr-only">
                      {t.stepLabel} {i + 1} {t.of} {t.steps.length}:{" "}
                    </span>
                    {step.name}
                  </p>
                  <h3 data-step-copy className="max-w-md font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.02] font-semibold text-fog uppercase">
                    {step.title}
                  </h3>
                  <p data-step-copy className="max-w-lg text-base leading-relaxed text-fog/75">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
