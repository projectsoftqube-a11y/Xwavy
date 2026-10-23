"use client";

import { BadgeCheck, Check, Handshake, PenLine, Search, Send } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type HowHeroProps = {
  t: (typeof copy)["en"]["hero"];
  /** The five platform steps in order (post, review, discover, request, connect), each with its status. */
  steps: readonly { name: string; status: string }[];
  roles: { innovator: string; investor: string };
  /** Shown under the meeting point: what happens once both sides say yes. */
  revealed: string;
  /** Kept for compatibility: this hero has no photograph. */
  imageAlt?: string;
  primaryHref: string;
  secondaryHref: string;
};

type Side = "innovator" | "investor";

/** Each side's two steps: the outer one first, then the one beside the meeting point. */
const NODES: Record<Side, { step: number; Icon: typeof PenLine }[]> = {
  innovator: [
    { step: 0, Icon: PenLine },
    { step: 1, Icon: BadgeCheck },
  ],
  investor: [
    { step: 2, Icon: Search },
    { step: 3, Icon: Send },
  ],
};

const TONE = {
  innovator: {
    text: "text-cyan",
    dot: "bg-cyan",
    line: "bg-cyan/45",
    faint: "bg-cyan/15",
    ring: "border-cyan/50 text-cyan shadow-[0_0_36px_-8px_rgb(0_225_234/0.8)]",
    edge: "via-cyan/70",
    glow: "bg-[radial-gradient(circle_at_50%_0%,rgb(0_225_234/0.28),transparent_70%)] ring-1 ring-cyan/60",
    /** Light runs toward the meeting point: start → end for innovators. */
    flow: "origin-left bg-linear-to-r from-transparent to-cyan rtl:origin-right rtl:bg-linear-to-l",
    flowDown: "origin-top bg-linear-to-b from-transparent to-cyan",
    draw: "origin-left rtl:origin-right",
    rule: "bg-linear-to-r from-cyan/50 to-transparent rtl:bg-linear-to-l",
  },
  investor: {
    text: "text-gold",
    dot: "bg-gold",
    line: "bg-gold/45",
    faint: "bg-gold/15",
    ring: "border-gold/50 text-gold shadow-[0_0_36px_-8px_rgb(255_181_71/0.8)]",
    edge: "via-gold/70",
    glow: "bg-[radial-gradient(circle_at_50%_0%,rgb(255_181_71/0.28),transparent_70%)] ring-1 ring-gold/60",
    /** …and end → start for investors, who come in from the other side. */
    flow: "origin-right bg-linear-to-l from-transparent to-gold rtl:origin-left rtl:bg-linear-to-r",
    flowDown: "origin-top bg-linear-to-b from-transparent to-gold",
    draw: "origin-right rtl:origin-left",
    rule: "bg-linear-to-l from-gold/50 to-transparent rtl:bg-linear-to-r",
  },
} as const;

/** Seconds between one leg of the relay and the next. */
const LEG = 0.8;

/**
 * How it works hero, without a photograph: the promise set large and
 * centred, then the journey as a relay. Innovators come in from one side
 * (post, then review), investors from the other (discover, then request),
 * and both meet at Connect, a core of both colours, where both are
 * introduced. Each step is a glass card on the line, so no line ever crosses
 * its words.
 *
 * Motion: the headline rises letter by letter (word by word in Arabic) and
 * the copy follows; the relay's lines draw inward, the cards rise and the
 * core lands. Then, on a loop, light runs along each leg toward the middle,
 * each card flashes as the light reaches it, and the core sends out rings.
 * Phones and tablets: the two sides run down two columns that merge into the
 * core. Reduced motion shows the finished relay, still.
 */
export function HowHero({ t, steps, roles, revealed, primaryHref, secondaryHref }: HowHeroProps) {
  const root = useRef<HTMLElement>(null);
  const connect = steps[4];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.reducedMotion, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      });
      mm.add(MEDIA.motionOk, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
        const arabic = document.documentElement.lang === "ar";
        const split = SplitText.create(q("[data-hero-title]"), {
          type: arabic ? "lines,words" : "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => gsap.from(arabic ? self.words : self.chars, { yPercent: 120, duration: 1.2, ease: "expo.out", stagger: arabic ? 0.07 : 0.02, delay: 0.2 }),
        });

        // Entrance: the copy, then the relay builds inward from both edges.
        const intro = gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(q("[data-hero-rule]"), { scaleX: 0, duration: 1.1 }, 0.1)
          .from(q("[data-hero-eyebrow]"), { y: 14, autoAlpha: 0, duration: 0.9 }, 0.15)
          .from(q("[data-hero-copy]"), { y: 26, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.7)
          .from(q("[data-role]"), { y: -10, autoAlpha: 0, duration: 0.8 }, 1)
          .from(q("[data-role-rule]"), { scaleX: 0, duration: 1.2 }, 1.1);
        [1, 2, 3].forEach((leg, i) => {
          const at = 1.1 + i * 0.3;
          intro.from(q(`[data-line='${leg}']`), { scaleX: 0, duration: 0.8, ease: "power2.out" }, at).from(q(`[data-vline='${leg}']`), { scaleY: 0, duration: 0.8, ease: "power2.out" }, at);
          if (leg < 3) intro.from(q(`[data-node='${leg}']`), { y: 28, autoAlpha: 0, duration: 1 }, at + 0.15);
        });
        intro
          .from(q("[data-merge]"), { autoAlpha: 0, duration: 0.6 }, 1.9)
          .from(q("[data-core]"), { scale: 0.4, autoAlpha: 0, duration: 1.1, ease: "back.out(1.7)" }, 2)
          .from(q("[data-core-label]"), { y: 14, autoAlpha: 0, duration: 0.9 }, 2.3);

        // The relay, on a loop: light runs each leg toward the middle; cards flash as it arrives; the core rings out.
        const loop = gsap.timeline({ repeat: -1, repeatDelay: 1, delay: 3.3, defaults: { ease: "power2.in" } });
        [1, 2, 3].forEach((leg, i) => {
          const at = i * LEG;
          loop
            .fromTo(q(`[data-comet='${leg}']`), { scaleX: 0, autoAlpha: 1 }, { scaleX: 1, duration: LEG - 0.1 }, at)
            .fromTo(q(`[data-vcomet='${leg}']`), { scaleY: 0, autoAlpha: 1 }, { scaleY: 1, duration: LEG - 0.1 }, at);
          if (leg < 3) {
            loop
              .to(q(`[data-node='${leg}'] [data-node-glow]`), { autoAlpha: 1, duration: 0.25, ease: "power1.out" }, at + LEG - 0.12)
              .fromTo(q(`[data-node='${leg}'] [data-node-ring]`), { scale: 1 }, { scale: 1.14, duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out" }, at + LEG - 0.12);
          }
        });
        const meet = 3 * LEG - 0.1;
        loop
          .fromTo(q("[data-ripple]"), { scale: 1, autoAlpha: 0.8 }, { scale: 2, autoAlpha: 0, duration: 1.4, stagger: 0.3, ease: "power2.out" }, meet)
          .fromTo(q("[data-core-glow]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, yoyo: true, repeat: 1, repeatDelay: 0.4, ease: "power1.out" }, meet)
          .fromTo(q("[data-chip]"), { scale: 1 }, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }, meet + 0.1)
          .to(q("[data-comet], [data-vcomet]"), { autoAlpha: 0, duration: 0.6, ease: "power1.out" }, meet + 0.5)
          .to(q("[data-node-glow]"), { autoAlpha: 0, duration: 0.6, ease: "power1.out" }, meet + 0.5);

        return () => split.revert();
      });
    },
    { scope: root },
  );

  /** One step as a glass card on the relay. */
  const card = (side: Side, index: number, className?: string) => {
    const node = NODES[side][index];
    const item = node ? steps[node.step] : undefined;
    if (!node || !item) return null;
    const tone = TONE[side];
    return (
      <div data-node={index + 1} className={cn("relative", className)}>
        <div className="relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-night-1/80 px-3 pt-5 pb-4 text-center backdrop-blur-md">
          <span aria-hidden data-node-glow className={cn("pointer-events-none absolute inset-0 rounded-2xl opacity-0", tone.glow)} />
          <span aria-hidden className={cn("absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent", tone.edge)} />
          <span dir="ltr" className="absolute top-2.5 inset-s-3 font-display text-base tracking-[0.1em] text-dim" data-numeric>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span data-node-ring className={cn("relative grid size-14 place-items-center rounded-full border bg-night", tone.ring)}>
            <node.Icon aria-hidden className="size-6" strokeWidth={1.6} />
          </span>
          <span className="relative flex flex-col items-center gap-1">
            <span className="font-display text-[1.25rem] leading-none font-semibold text-fog uppercase xl:text-[1.375rem]">{item.name}</span>
            <span className={cn("text-base leading-snug", tone.text)}>{item.status}</span>
          </span>
        </div>
      </div>
    );
  };

  /** A leg of the relay between two points, with the light that runs it. The caller places it; the rail runs along its middle. */
  const leg = (side: Side, order: 1 | 2 | 3, className: string) => {
    const tone = TONE[side];
    return (
      <div aria-hidden className={cn("h-14", className)}>
        <span data-line={order} className={cn("absolute inset-x-0 top-[calc(50%-0.5px)] h-px", tone.line, tone.draw)} />
        <span data-comet={order} className={cn("absolute inset-x-0 top-[calc(50%-1.5px)] h-[3px] rounded-full opacity-0 shadow-[0_0_14px_currentColor]", tone.flow, tone.text)} />
      </div>
    );
  };

  /** A vertical leg, for the stacked layout on smaller screens. */
  const vleg = (side: Side, order: 1 | 2 | 3, className: string) => {
    const tone = TONE[side];
    return (
      <div aria-hidden className={cn("relative w-full shrink-0", className)}>
        <span data-vline={order} className={cn("absolute inset-y-0 left-[calc(50%-0.5px)] w-px origin-top", tone.line)} />
        <span data-vcomet={order} className={cn("absolute inset-y-0 left-[calc(50%-1.5px)] w-[3px] rounded-full opacity-0 shadow-[0_0_14px_currentColor]", tone.flowDown, tone.text)} />
      </div>
    );
  };

  /** The meeting point: a core of both colours, ringing out when both lights arrive. */
  const core = (size: "lg" | "sm") =>
    connect ? (
      <div data-core className={cn("relative grid shrink-0 place-items-center", size === "lg" ? "size-28 xl:size-32" : "size-24")}>
        <span aria-hidden data-core-glow className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgb(0_225_234/0.35),rgb(255_181_71/0.2)_45%,transparent_70%)] opacity-0" />
        <span aria-hidden data-ripple className="absolute inset-0 rounded-full border border-cyan/60 opacity-0" />
        <span aria-hidden data-ripple className="absolute inset-0 rounded-full border border-gold/60 opacity-0" />
        <span
          aria-hidden
          className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--color-cyan),transparent_35%,var(--color-gold)_50%,transparent_85%,var(--color-cyan))] p-0.5 [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        />
        <span className="absolute inset-2 rounded-full border border-white/10 bg-night shadow-[0_0_60px_-12px_rgb(0_225_234/0.7),0_0_60px_-12px_rgb(255_181_71/0.6)]" />
        <Handshake aria-hidden className={cn("relative text-fog", size === "lg" ? "size-9 xl:size-10" : "size-8")} strokeWidth={1.5} />
      </div>
    ) : null;

  const coreLabel = connect ? (
    <div data-core-label className="flex flex-col items-center gap-2.5 text-center">
      <span className="font-display text-[1.75rem] leading-none font-semibold text-fog uppercase">{connect.name}</span>
      <span data-chip className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-cyan to-gold px-4 py-1.5 text-base font-semibold whitespace-nowrap text-night rtl:bg-linear-to-l">
        <Check aria-hidden className="size-4" strokeWidth={3} />
        {revealed}
      </span>
    </div>
  ) : null;

  return (
    <section ref={root} aria-labelledby="hiw-hero" className="relative isolate overflow-hidden bg-night">
      {/* Fine grid fading down, and a light pool per side. Decorative. */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent)]" />
      <span aria-hidden className="glow-cyan pointer-events-none absolute top-1/3 -start-48 -z-10 size-[48rem] opacity-60" />
      <span aria-hidden className="glow-gold pointer-events-none absolute top-1/3 -end-48 -z-10 size-[48rem] opacity-60" />

      <Container className="pt-[calc(var(--spacing-header)+5rem)] pb-section lg:pt-[calc(var(--spacing-header)+6rem)]">
        <div data-intro className="mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
          <p data-hero-eyebrow className="flex items-center gap-3 font-display text-base tracking-[0.2em] text-cyan uppercase">
            <span aria-hidden data-hero-rule className="h-px w-10 origin-right bg-cyan rtl:origin-left" />
            {t.eyebrow}
            <span aria-hidden data-hero-rule className="h-px w-10 origin-left bg-cyan rtl:origin-right" />
          </p>
          <h1 id="hiw-hero" data-hero-title className="text-hero text-fog">
            {t.titleLead} <span className="accent text-cyan">{t.titleAccent}</span>
          </h1>
          <p data-hero-copy className="max-w-2xl text-lead text-fog/75">
            {t.body}
          </p>
          <div data-hero-copy className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={primaryHref} size="lg" variant="primary" arrow className="w-full sm:w-auto">
              {t.primary}
            </Button>
            <Button href={secondaryHref} size="lg" variant="accent" arrow className="w-full sm:w-auto">
              {t.secondary}
            </Button>
          </div>
        </div>

        {/* The journey, for screen readers: in order, per side. */}
        <div className="sr-only">
          {(["innovator", "investor"] as const).map((side) => (
            <div key={side}>
              <p>{roles[side]}</p>
              <ol>
                {NODES[side].map(({ step }) => {
                  const item = steps[step];
                  return item ? (
                    <li key={item.name}>
                      {item.name}: {item.status}
                    </li>
                  ) : null;
                })}
              </ol>
            </div>
          ))}
          {connect ? (
            <p>
              {connect.name}: {revealed}
            </p>
          ) : null}
        </div>

        {/* Desktop: the relay, both sides coming in to the core. */}
        <div data-intro aria-hidden className="relative mx-auto mt-20 hidden max-w-[80rem] lg:block">
          <span aria-hidden className="pointer-events-none absolute inset-x-[10%] top-[58%] h-48 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_255_255/0.05),transparent_70%)]" />

          {/* The two sides, named over their halves. */}
          <div className="mb-8 grid grid-cols-2 gap-28 xl:gap-32">
            {(["innovator", "investor"] as const).map((side) => {
              const tone = TONE[side];
              const label = (
                <span data-role className={cn("inline-flex shrink-0 items-center gap-2.5 font-display text-base tracking-[0.2em] uppercase", tone.text)}>
                  {side === "innovator" ? <span className={cn("size-2 rounded-full", tone.dot)} /> : null}
                  {roles[side]}
                  {side === "investor" ? <span className={cn("size-2 rounded-full", tone.dot)} /> : null}
                </span>
              );
              const rule = <span data-role-rule className={cn("h-px flex-1", tone.rule, tone.draw)} />;
              return (
                <div key={side} className="flex items-center gap-4">
                  {side === "innovator" ? (
                    <>
                      {label}
                      {rule}
                    </>
                  ) : (
                    <>
                      {rule}
                      {label}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* One row. Every rail runs 3rem below the row's top: through the centre of each card's icon (1.25rem padding + half the 3.5rem ring). */}
          <div className="relative flex items-start">
            {/* Innovators: in from the start edge. */}
            <div className="flex flex-1 items-start">
              <div className="relative mt-5 h-14 w-8 shrink-0 xl:w-12">
                <span aria-hidden className={cn("absolute top-[calc(50%-4px)] inset-s-0 size-2 rounded-full", TONE.innovator.dot)} />
                {leg("innovator", 1, "absolute inset-y-0 inset-s-3 inset-e-0")}
              </div>
              {card("innovator", 0, "w-38 shrink-0 xl:w-44")}
              {leg("innovator", 2, "relative mt-5 min-w-6 flex-1")}
              {card("innovator", 1, "w-38 shrink-0 xl:w-44")}
              {leg("innovator", 3, "relative mt-5 min-w-6 flex-1")}
            </div>

            {/* The meeting point, centred on the rails, with a stem down to its label. */}
            <div className="relative -mt-2 shrink-0 xl:-mt-4">
              {core("lg")}
              <span aria-hidden data-merge className="absolute top-full left-1/2 h-16 w-px -translate-x-1/2 bg-linear-to-b from-fog/50 to-transparent" />
            </div>

            {/* Investors: in from the end edge. */}
            <div className="flex flex-1 items-start">
              {leg("investor", 3, "relative mt-5 min-w-6 flex-1")}
              {card("investor", 1, "w-38 shrink-0 xl:w-44")}
              {leg("investor", 2, "relative mt-5 min-w-6 flex-1")}
              {card("investor", 0, "w-38 shrink-0 xl:w-44")}
              <div className="relative mt-5 h-14 w-8 shrink-0 xl:w-12">
                <span aria-hidden className={cn("absolute top-[calc(50%-4px)] inset-e-0 size-2 rounded-full", TONE.investor.dot)} />
                {leg("investor", 1, "absolute inset-y-0 inset-s-0 inset-e-3")}
              </div>
            </div>
          </div>

          {/* Connect, below the cards so it never meets them. */}
          <div className="mt-6 flex justify-center">{coreLabel}</div>
        </div>

        {/* Phones and tablets: two columns that merge into the core. */}
        <div data-intro aria-hidden className="mx-auto mt-16 max-w-xl lg:hidden">
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {(["innovator", "investor"] as const).map((side) => {
              const tone = TONE[side];
              return (
                <div key={side} className="flex flex-col items-center">
                  <span data-role className={cn("inline-flex items-center gap-2 font-display text-base tracking-[0.16em] uppercase", tone.text)}>
                    <span className={cn("size-2 rounded-full", tone.dot)} />
                    {roles[side]}
                  </span>
                  {vleg(side, 1, "h-6")}
                  {card(side, 0, "w-full max-w-48")}
                  {vleg(side, 2, "h-8")}
                  {card(side, 1, "w-full max-w-48")}
                  {vleg(side, 3, "h-8")}
                </div>
              );
            })}
          </div>
          {/* The two columns bend in and meet. */}
          <div data-merge aria-hidden className="relative h-14">
            <span className="absolute top-0 start-1/4 h-8 w-[calc(25%+1px)] rounded-es-3xl border-s border-b border-cyan/45" />
            <span className="absolute top-0 end-1/4 h-8 w-[calc(25%+1px)] rounded-ee-3xl border-e border-b border-gold/45" />
            <span className="absolute top-8 left-1/2 h-6 w-px -translate-x-1/2 bg-linear-to-b from-fog/50 to-fog/10" />
          </div>
          <div className="flex flex-col items-center gap-4">
            {core("sm")}
            {coreLabel}
          </div>
        </div>
      </Container>
    </section>
  );
}
