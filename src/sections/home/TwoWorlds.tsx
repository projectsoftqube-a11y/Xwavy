"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type TwoWorldsProps = {
  t: Dictionary["home"]["roles"];
  alts: { homeRolesInnovator: string; homeRolesInvestor: string };
  innovatorHref: string;
  investorHref: string;
};

/**
 * The two sides as two tall photographic panels that meet at a seam, with
 * the Xwavy mark on it in a ring of both colours. Each panel carries its
 * side's name, promise, what it gets and the way in.
 *
 * Desktop: hovering or focusing a panel widens it and its photograph follows
 * the pointer. On scroll both panels open outward from the seam like doors,
 * the photographs settle from a zoom, then titles rise and the lists follow.
 * Phones and tablets: the panels stack and open upward. Reduced motion shows
 * everything still.
 */
export function TwoWorlds({ t, alts, innovatorHref, investorHref }: TwoWorldsProps) {
  const root = useRef<HTMLElement>(null);
  // The coin follows the seam: a widened panel takes 1.5 of 2.5 parts of the row.
  const [seam, setSeam] = useState("50%");
  const widen = (i: number) => {
    const startSide = i === 0;
    const rtl = document.documentElement.dir === "rtl";
    setSeam(startSide !== rtl ? "60%" : "40%");
  };
  const sides = [
    {
      data: t.innovators,
      href: innovatorHref,
      variant: "primary" as const,
      image: { src: "/images/site/home-roles-innovator.webp", alt: alts.homeRolesInnovator, position: "object-[60%_30%]" },
      text: "text-cyan",
      dot: "bg-cyan",
      border: "border-cyan/40",
      tint: "from-cyan/20",
    },
    {
      data: t.investors,
      href: investorHref,
      variant: "accent" as const,
      image: { src: "/images/people/investor-window.webp", alt: alts.homeRolesInvestor, position: "object-[35%_25%]" },
      text: "text-gold",
      dot: "bg-gold",
      border: "border-gold/40",
      tint: "from-gold/20",
    },
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ wide: `(min-width: 1024px) and ${MEDIA.motionOk}`, narrow: `(max-width: 1023.98px) and ${MEDIA.motionOk}` }, (context) => {
        const wide = Boolean(context.conditions?.wide);
        const rtl = document.documentElement.dir === "rtl";
        const group = q("[data-worlds]")[0];
        const splits: SplitText[] = [];
        const cleanups: (() => void)[] = [];

        gsap.utils.toArray<HTMLElement>("[data-world]", root.current).forEach((panel, i) => {
          const p = gsap.utils.selector(panel);
          // The first panel sits on the start side, so its seam is its end edge.
          const seamOnRight = (i === 0) !== rtl;
          const closed = !wide ? "inset(100% 0% 0% 0% round 1.5rem)" : seamOnRight ? "inset(0% 0% 0% 100% round 1.5rem)" : "inset(0% 100% 0% 0% round 1.5rem)";
          const trigger = { trigger: wide ? group : panel, start: "top 75%", once: true };

          gsap
            .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: trigger })
            .fromTo(panel, { clipPath: closed }, { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", duration: 1.6, ease: "expo.inOut", clearProps: "clipPath" }, 0)
            .fromTo(p("[data-world-img]"), { scale: 1.35 }, { scale: 1.05, duration: 2.2 }, 0)
            .from(p("[data-world-label]"), { y: -20, autoAlpha: 0, duration: 0.9 }, 0.8)
            .from(p("[data-world-index]"), { y: -20, autoAlpha: 0, duration: 0.9 }, 0.85)
            .from(p("[data-world-point]"), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 1.15)
            .from(p("[data-world-cta]"), { y: 24, autoAlpha: 0, duration: 0.8 }, 1.4);

          splits.push(
            SplitText.create(p("[data-world-title]"), {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) => gsap.from(self.lines, { yPercent: 115, duration: 1.3, ease: "expo.out", stagger: 0.1, delay: 0.85, scrollTrigger: trigger }),
            }),
          );

          // Desktop: the photograph follows the pointer.
          const img = p("[data-world-img]")[0];
          if (wide && img) {
            const xTo = gsap.quickTo(img, "xPercent", { duration: 1.2, ease: "power3.out" });
            const yTo = gsap.quickTo(img, "yPercent", { duration: 1.2, ease: "power3.out" });
            const move = (event: PointerEvent) => {
              const box = panel.getBoundingClientRect();
              xTo(((event.clientX - box.left) / box.width - 0.5) * -4);
              yTo(((event.clientY - box.top) / box.height - 0.5) * -4);
            };
            const leave = () => {
              xTo(0);
              yTo(0);
            };
            panel.addEventListener("pointermove", move);
            panel.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              panel.removeEventListener("pointermove", move);
              panel.removeEventListener("pointerleave", leave);
            });
          }
        });

        gsap.from(q("[data-world-coin]"), { scale: 0, rotate: -120, duration: 1.2, ease: "back.out(1.6)", delay: 1, scrollTrigger: { trigger: group, start: "top 75%", once: true } });
        return () => {
          splits.forEach((split) => split.revert());
          cleanups.forEach((cleanup) => cleanup());
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="worlds-title" className="relative overflow-hidden bg-night py-section">
      <Container>
        <CinemaHeading id="worlds-title" number="01" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} />

        <div data-worlds className="relative mt-14 flex flex-col gap-4 lg:mt-20 lg:h-[clamp(40rem,80svh,48rem)] lg:flex-row lg:gap-5">
          {sides.map(({ data, href, variant, image, text, dot, border, tint }, i) => (
            <article
              key={data.label}
              data-world
              onPointerEnter={() => widen(i)}
              onPointerLeave={() => setSeam("50%")}
              onFocus={() => widen(i)}
              onBlur={() => setSeam("50%")}
              className="group relative isolate flex flex-col overflow-hidden rounded-3xl border border-hair bg-night-1 lg:flex-1 lg:transition-[flex-grow] lg:duration-700 lg:ease-brand lg:hover:grow-[1.5] lg:focus-within:grow-[1.5]"
            >
              {/* Photograph, its shades and the side's colour rising from the foot. Phones and
                  tablets: a block on top, clear of the text. Desktop: the whole panel behind it. */}
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
                <Image
                  data-world-img
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={cn("scale-105 object-cover transition-[filter] duration-700 group-hover:brightness-110", image.position)}
                />
                <span aria-hidden className="absolute inset-0 bg-linear-to-t from-night-1 via-night-1/10 to-transparent lg:from-night lg:via-night/75 lg:to-night/5" />
                <span aria-hidden className={cn("absolute inset-x-0 bottom-0 hidden h-1/2 bg-linear-to-t to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100 lg:block", tint)} />
                <span aria-hidden className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
              </div>

              {/* Top: the side's name and number (over the photograph). */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 sm:p-8 lg:relative">
                <p
                  data-world-label
                  className={cn("inline-flex items-center gap-2.5 rounded-full border bg-night/70 px-4 py-2 font-display text-base tracking-[0.12em] whitespace-nowrap uppercase backdrop-blur-md sm:tracking-[0.16em]", border, text)}
                >
                  <span className={cn("size-2 rounded-full", dot)} />
                  {data.label}
                </p>
                <span aria-hidden data-world-index dir="ltr" className="stroke-text-fog hidden font-display text-[4rem] leading-none font-bold opacity-70 sm:block" data-numeric>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Foot: the promise, what this side gets, and the way in. */}
              <div className="flex flex-col gap-6 p-5 sm:p-8 lg:mt-auto lg:p-10">
                <h3 data-world-title className="max-w-[16ch] font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.75rem)] leading-[0.98] font-semibold text-fog uppercase">
                  {data.title}
                </h3>
                <ul className="grid grid-cols-1 gap-x-8 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {data.points.map((point) => (
                    <li key={point} data-world-point className="flex items-start gap-3 border-b border-white/10 py-3.5 text-base text-fog/85">
                      <Check aria-hidden className={cn("mt-1 size-4 shrink-0", text)} />
                      {point}
                    </li>
                  ))}
                </ul>
                <div data-world-cta>
                  <Button href={href} variant={variant} arrow className="w-full sm:w-auto">
                    {data.cta}
                  </Button>
                </div>
              </div>
            </article>
          ))}

          {/* Where the two sides meet: the Xwavy mark on the seam (desktop). */}
          <span
            data-world-coin
            aria-hidden
            style={{ left: seam }}
            className="pointer-events-none absolute top-1/2 z-10 hidden size-20 -translate-1/2 place-items-center transition-[left] duration-700 ease-brand lg:grid"
          >
            <span className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--color-cyan),transparent_35%,var(--color-gold)_50%,transparent_85%,var(--color-cyan))] p-0.5 [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]" />
            <span className="grid size-16 place-items-center rounded-full border border-hair-strong bg-night/90 backdrop-blur-md">
              <Image src="/brand/xwavy-mark.png" alt="" width={32} height={32} className="size-8" />
            </span>
          </span>
        </div>
      </Container>
    </section>
  );
}
