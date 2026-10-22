"use client";

import { BadgeCheck, Check, Handshake, PenLine, Search, Send } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { EASE, MEDIA } from "@/lib/motion";

type HowHeroProps = {
  t: (typeof copy)["en"]["hero"];
  /** The five platform steps in order (post, review, discover, request, connect), each with its status. */
  steps: readonly { name: string; status: string }[];
  roles: { innovator: string; investor: string };
  /** Shown under the meeting point: what happens once both sides say yes. */
  revealed: string;
  imageAlt: string;
  primaryHref: string;
  secondaryHref: string;
};

type Side = "innovator" | "investor" | "both";

/**
 * Where each step sits on the rail. Phones: a Y (two columns that merge into
 * Connect). Desktop: a pincer, innovator steps from the left, investor steps
 * from the right, meeting at Connect in the middle.
 */
const RAIL = [
  { side: "innovator", Icon: PenLine, place: "col-start-1 row-start-1 lg:col-start-1" },
  { side: "innovator", Icon: BadgeCheck, place: "col-start-1 row-start-2 lg:col-start-2 lg:row-start-1" },
  { side: "investor", Icon: Search, place: "col-start-2 row-start-1 lg:col-start-5" },
  { side: "investor", Icon: Send, place: "col-start-2 row-start-2 lg:col-start-4 lg:row-start-1" },
  { side: "both", Icon: Handshake, place: "col-span-2 row-start-3 lg:col-span-1 lg:col-start-3 lg:row-start-1" },
] as const satisfies readonly { side: Side; Icon: typeof PenLine; place: string }[];

/** Two currents sweeping in from the edges and meeting where the photo begins. */
const CURRENTS = {
  innovator: "M -40 40 C 460 40 300 690 800 700",
  investor: "M 1640 40 C 1140 40 1300 690 800 700",
} as const;

/**
 * How it works hero: two currents (cyan for innovators, gold for investors)
 * sweep in from the panel edges and meet under the headline, then the same
 * story plays on the photograph: each side's steps converge on Connect in
 * the middle, where the introduction happens.
 *
 * The rail and the photo chips are laid out physically (dir="ltr") because
 * they label the photograph, where the innovator sits left and the investor
 * right in both languages.
 */
export function HowHero({ t, steps, roles, revealed, imageAlt, primaryHref, secondaryHref }: HowHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        const split = SplitText.create(q("[data-hero-title]"), { type: "lines", mask: "lines", linesClass: "hero-line", autoSplit: true });
        gsap
          .timeline({ defaults: { ease: EASE.gsapOut } })
          .fromTo(q("[data-current]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }, 0)
          .from(q("[data-hero-eyebrow]"), { y: 16, autoAlpha: 0, duration: 0.6 }, 0.1)
          .from(split.lines, { yPercent: 110, duration: 1.05, stagger: 0.1 }, 0.15)
          .from(q("[data-hero-copy]"), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.5)
          .from(q("[data-hero-media]"), { clipPath: "inset(10% 6% 0% 6% round 1.5rem)", duration: 1.4, ease: "power3.out", clearProps: "clipPath" }, 0.45)
          .fromTo(q("[data-hero-media] img"), { scale: 1.18 }, { scale: 1.04, duration: 1.8, ease: "power3.out" }, 0.45)
          .from(q("[data-role-chip]"), { y: -12, autoAlpha: 0, duration: 0.6, stagger: 0.15 }, 1)
          .from(q("[data-rail-line]"), { scaleX: 0, duration: 1.1, ease: "power2.inOut" }, 1.05)
          .from(q("[data-rail-step]"), { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.12 }, 1.1)
          .from(q("[data-rail-meet]"), { scale: 0.5, autoAlpha: 0, duration: 0.7, ease: "back.out(2)" }, 1.75)
          .from(q("[data-revealed]"), { y: 6, autoAlpha: 0, duration: 0.5 }, 2.05);

        // The photo drifts as the hero scrolls away.
        gsap.to(q("[data-hero-media] img"), {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // Desktop: a spark travels each current and each half of the rail into the middle, on a loop.
      mm.add(`${MEDIA.motionOk} and (min-width: 1024px)`, () => {
        const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 2.6, defaults: { ease: "power1.inOut" } });
        loop
          .fromTo(q("[data-spark-current]"), { strokeDashoffset: 0.12 }, { strokeDashoffset: -1, duration: 2.4 }, 0)
          .fromTo(q("[data-spark='innovator']"), { left: "10%", autoAlpha: 0 }, { left: "50%", autoAlpha: 1, duration: 1.6, ease: "power2.in" }, 1.2)
          .fromTo(q("[data-spark='investor']"), { left: "90%", autoAlpha: 0 }, { left: "50%", autoAlpha: 1, duration: 1.6, ease: "power2.in" }, 1.2)
          .to(q("[data-spark]"), { autoAlpha: 0, duration: 0.2 }, 2.8)
          .fromTo(q("[data-meet-pulse]"), { scale: 1, autoAlpha: 0.7 }, { scale: 2.2, autoAlpha: 0, duration: 1.1, ease: "power2.out" }, 2.75);
      });
    },
    { scope: root },
  );

  const [post, review, discover, request, connect] = steps;
  const ordered = [post, review, discover, request, connect];

  return (
    <section ref={root} aria-labelledby="hiw-hero" className="surface-abyss bg-grid panel relative mt-(--panel-inset)">
      <Container className="pt-[calc(var(--panel-inset)+6.5rem)] pb-(--panel-inset) lg:pt-[calc(var(--panel-inset)+8rem)]">
        <div className="relative">
          {/* The two currents: full panel width, meeting at the top edge of the photo. Decorative. */}
          <svg
            aria-hidden
            data-intro
            viewBox="0 0 1600 700"
            preserveAspectRatio="xMidYMax slice"
            className="pointer-events-none absolute -top-48 -bottom-14 left-1/2 w-screen max-w-none -translate-x-1/2 lg:-top-56 lg:-bottom-20"
          >
            {(["innovator", "investor"] as const).map((side) => (
              <g key={side} className={side === "innovator" ? "text-cyan" : "text-gold"}>
                <path d={CURRENTS[side]} pathLength={1} data-current fill="none" stroke="currentColor" strokeOpacity={0.22} strokeWidth={1.25} strokeDasharray="1 1" />
                <path d={CURRENTS[side]} pathLength={1} data-current fill="none" stroke="currentColor" strokeOpacity={0.07} strokeWidth={14} strokeDasharray="1 1" />
                {/* A spark that travels the current; dash 0.12 with a gap longer than the path, so it hides at rest. */}
                <path
                  d={CURRENTS[side]}
                  pathLength={1}
                  data-spark-current
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="0.12 1"
                  strokeDashoffset={0.12}
                />
              </g>
            ))}
          </svg>

          <div data-intro className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 text-center lg:gap-7">
            <p
              data-hero-eyebrow
              className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-abyss/60 py-1 ps-1 pe-4 font-mono text-eyebrow text-mist uppercase backdrop-blur-sm"
            >
              <Image src="/brand/xwavy-mark.png" alt="" aria-hidden width={24} height={24} className="size-6 shrink-0 rounded-[0.4rem] ring-1 ring-white/15" />
              {t.eyebrow}
            </p>
            {/* The line masks clip, and tight tracking lets end glyphs overhang the line box ("becomes" lost its s):
                pad each mask, with a matching negative margin so the layout doesn't move. */}
            <h1
              id="hiw-hero"
              data-hero-title
              className="text-hero text-white [&_.hero-line-mask]:-mx-[0.12em] [&_.hero-line-mask]:-my-[0.08em] [&_.hero-line-mask]:px-[0.12em] [&_.hero-line-mask]:py-[0.08em]"
            >
              {t.titleLead}
              {/* Desktop keeps the accent on its own line: the lead, then the payoff. */}
              <br className="max-lg:hidden" /> <span className="accent text-cyan">{t.titleAccent}</span>
            </h1>
            <p data-hero-copy className="max-w-2xl text-lead text-mist">
              {t.body}
            </p>
            <div data-hero-copy className="flex flex-col gap-3 sm:flex-row">
              <Button href={primaryHref} size="lg" variant="primary" arrow>
                {t.primary}
              </Button>
              <Button href={secondaryHref} size="lg" variant="accent" arrow>
                {t.secondary}
              </Button>
            </div>
          </div>
        </div>

        {/* The photograph, with the journey converging along its foot. */}
        <div data-intro data-hero-media className="relative mt-14 overflow-hidden rounded-3xl bg-navy ring-1 ring-white/10 lg:mt-20">
          <div className="relative aspect-video lg:aspect-21/9">
            <Image src="/images/site/hiw-hero-wide.webp" alt={imageAlt} fill priority sizes="(min-width: 1600px) 90vw, 100vw" className="object-cover object-[50%_40%]" />
            {/* Scrim under the rail so labels stay readable on any part of the photo. */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-abyss/80 to-transparent max-lg:hidden" />

            {/* One chip over each person: the two sides that must both say yes. */}
            <div dir="ltr" aria-hidden className="absolute inset-x-3 top-3 flex justify-between gap-2 sm:inset-x-5 sm:top-5">
              <RoleChip side="innovator" label={roles.innovator} />
              <RoleChip side="investor" label={roles.investor} />
            </div>
          </div>

          <div className="relative bg-abyss px-4 pt-6 pb-5 sm:px-6 lg:absolute lg:inset-x-6 lg:bottom-6 lg:rounded-2xl lg:border lg:border-white/10 lg:bg-abyss/75 lg:px-8 lg:py-6 lg:backdrop-blur-xl">
            <div dir="ltr" className="relative">
              {/* Desktop: one half of the rail per side, each meeting the middle. */}
              <span aria-hidden data-rail-line className="absolute start-[10%] end-1/2 top-6 h-px origin-left bg-cyan/60 max-lg:hidden" />
              <span aria-hidden data-rail-line className="absolute start-1/2 end-[10%] top-6 h-px origin-right bg-gold/60 max-lg:hidden" />
              <span aria-hidden data-spark="innovator" className="absolute top-6 size-2 -translate-1/2 rounded-full bg-cyan opacity-0 shadow-[0_0_14px_3px_var(--color-cyan)] max-lg:hidden" />
              <span aria-hidden data-spark="investor" className="absolute top-6 size-2 -translate-1/2 rounded-full bg-gold opacity-0 shadow-[0_0_14px_3px_var(--color-gold)] max-lg:hidden" />

              <ol className="grid grid-cols-2 gap-x-3 lg:grid-cols-5 lg:gap-x-2">
                {RAIL.map(({ side, Icon, place }, i) => {
                  const step = ordered[i];
                  if (!step) return null;
                  const role = side === "innovator" ? roles.innovator : side === "investor" ? roles.investor : null;
                  return side === "both" ? (
                    <li key={step.name} className={cn("relative flex flex-col items-center pt-14 text-center lg:pt-0", place)}>
                      {/* Phones: the two columns bend into a Y and meet here. */}
                      <span aria-hidden className="absolute top-0 left-[calc(25%-3px)] h-7 w-[calc(25%+3px)] rounded-bl-2xl border-b border-l border-cyan/60 lg:hidden" />
                      <span aria-hidden className="absolute top-0 right-[calc(25%-3px)] h-7 w-[calc(25%+3px)] rounded-br-2xl border-r border-b border-gold/60 lg:hidden" />
                      <span aria-hidden className="absolute top-7 left-1/2 h-7 w-px -translate-x-1/2 bg-white/30 lg:hidden" />

                      <span data-rail-meet className="relative grid size-12 place-items-center">
                        <span aria-hidden data-meet-pulse className="absolute inset-0 rounded-full border border-white opacity-0" />
                        {/* Half cyan, half gold: both sides in one coin. */}
                        <span aria-hidden className="absolute inset-0 overflow-hidden rounded-full">
                          <span className="absolute inset-y-0 left-0 w-1/2 bg-cyan" />
                          <span className="absolute inset-y-0 right-0 w-1/2 bg-gold" />
                        </span>
                        <span className="relative grid size-9 place-items-center rounded-full bg-abyss text-white">
                          <Icon aria-hidden className="size-4" />
                        </span>
                      </span>
                      <span className="mt-2.5 text-sm font-medium text-white">{step.name}</span>
                      <span data-revealed className="mt-0.5 font-mono text-[0.625rem] text-cyan uppercase sm:text-[0.6875rem]">{revealed}</span>
                    </li>
                  ) : (
                    <li key={step.name} data-rail-step className={cn("relative flex flex-col items-center pb-6 text-center lg:pb-0", place)}>
                      {/* Phones: each side runs down its own column. */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-1/2 w-px -translate-x-1/2 lg:hidden",
                          i % 2 === 0 ? "top-6 bottom-0" : "inset-y-0",
                          side === "innovator" ? "bg-cyan/60" : "bg-gold/60",
                        )}
                      />
                      <span
                        className={cn(
                          "relative grid size-12 place-items-center rounded-full border bg-abyss",
                          side === "innovator" ? "border-cyan/50 text-cyan" : "border-gold/50 text-gold",
                        )}
                      >
                        <Icon aria-hidden className="size-4.5" />
                      </span>
                      <span className="relative mt-2 rounded-full bg-abyss px-2 text-sm font-medium text-white lg:bg-transparent">
                        <span className="sr-only">{role}: </span>
                        {step.name}
                      </span>
                      <span className="relative rounded-full bg-abyss px-2 font-mono text-[0.625rem] text-mist uppercase sm:text-[0.6875rem] lg:bg-transparent">
                        {step.status}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Glass tag over one person in the photo, with the tick that stands for their yes. */
function RoleChip({ side, label }: { side: "innovator" | "investor"; label: string }) {
  const innovator = side === "innovator";
  return (
    <span
      data-role-chip
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-abyss/70 py-1 ps-1 pe-3 text-xs font-medium text-white backdrop-blur-md sm:text-sm"
    >
      <span className={cn("grid size-6 place-items-center rounded-full text-abyss sm:size-7", innovator ? "bg-cyan" : "bg-gold")}>
        <Check className="size-3.5" strokeWidth={3} />
      </span>
      {label}
    </span>
  );
}
