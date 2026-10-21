"use client";

import { Check, Lightbulb, Send, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { EASE, MEDIA } from "@/lib/motion";

type HeroSplitProps = {
  t: Dictionary["home"]["hero"];
  /** Role labels ("For innovators" / "For investors") shown on the portraits. */
  roles: { innovator: string; investor: string };
  alts: { innovator: string; investor: string };
  innovatorHref: string;
  investorHref: string;
};

/**
 * Home hero: the promise on one side, the two sides of the marketplace on the
 * other. Two portraits, offset like two people approaching from opposite
 * sides, with the moment they meet ("Introduction requested" → "Connected")
 * floating between them.
 *
 * Load: headline lines rise, the portraits open from opposite sides, then the
 * cards pop in. Scroll: the portraits drift apart gently. Transforms, opacity
 * and clip only. Elements marked [data-intro] are hidden before hydration by
 * globals.css (no flash); reduced motion shows everything at once.
 */
export function HeroSplit({ t, roles, alts, innovatorHref, investorHref }: HeroSplitProps) {
  const root = useRef<HTMLElement>(null);
  const requested = t.story[1];
  const connected = t.story[3];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-intro]"), { autoAlpha: 1 });

      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const rtl = document.documentElement.dir === "rtl" ? -1 : 1;
        const split = SplitText.create(q("[data-hero-title]"), { type: "lines", mask: "lines", autoSplit: true });

        gsap
          .timeline({ defaults: { ease: EASE.gsapOut } })
          .from(q("[data-hero-eyebrow]"), { y: 16, autoAlpha: 0, duration: 0.7 }, 0.1)
          .from(split.lines, { yPercent: 110, duration: 1, stagger: 0.1 }, 0.15)
          .from(q("[data-hero-copy]"), { y: 28, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.45)
          .from(q("[data-portrait=innovator]"), { xPercent: -12 * rtl, autoAlpha: 0, duration: 1.1, ease: "power3.out" }, 0.25)
          .from(q("[data-portrait=investor]"), { xPercent: 12 * rtl, autoAlpha: 0, duration: 1.1, ease: "power3.out" }, 0.35)
          .fromTo(q("[data-portrait] img"), { scale: 1.25 }, { scale: 1.1, duration: 1.6, ease: "power3.out" }, 0.25)
          .from(q("[data-hero-card]"), { y: 24, scale: 0.94, autoAlpha: 0, duration: 0.7, stagger: 0.25, ease: "back.out(1.6)" }, 1);

        // As the hero scrolls away, the two portraits drift in opposite directions.
        const leave = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-portrait=innovator] img"), { yPercent: 5, ease: "none", scrollTrigger: leave });
        gsap.to(q("[data-portrait=investor] img"), { yPercent: -5, ease: "none", scrollTrigger: leave });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="surface-abyss bg-grid panel relative mt-(--panel-inset) overflow-hidden">
      <Container className="grid grid-cols-1 gap-12 pt-[calc(var(--panel-inset)+6.5rem)] pb-section-sm lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-[calc(var(--panel-inset)+7.5rem)] lg:pb-16">
        {/* The promise. */}
        <div data-intro className="flex flex-col gap-7 lg:col-span-6">
          <p
            data-hero-eyebrow
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/12 bg-white/5 py-1 ps-1 pe-4 font-mono text-eyebrow text-mist uppercase"
          >
            <Image src="/brand/xwavy-mark.png" alt="" aria-hidden width={24} height={24} className="size-6 shrink-0 rounded-[0.4rem] ring-1 ring-white/15" />
            {t.eyebrow}
          </p>

          <h1 id="hero-title" data-hero-title className="max-w-[14ch] text-hero text-white">
            {t.title.line1} {t.title.before} <span className="accent text-cyan">{t.title.after}</span>
          </h1>

          <p data-hero-copy className="max-w-xl text-lead text-mist">
            {t.body}
          </p>

          <div data-hero-copy className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={innovatorHref} size="lg" variant="primary" arrow>
              {t.primaryCta}
            </Button>
            <Button href={investorHref} size="lg" variant="accent" arrow>
              {t.secondaryCta}
            </Button>
          </div>

          <ul data-hero-copy className="flex flex-col gap-2.5 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {t.points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-mist">
                <Check aria-hidden className="size-4 shrink-0 text-cyan" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* The two sides, meeting. */}
        <div data-intro className="relative lg:col-span-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <figure data-portrait="innovator" className="relative mt-10 aspect-3/4 overflow-hidden rounded-3xl bg-navy sm:mt-16">
              <Image
                src="/images/site/home-hero-founder.webp"
                alt={alts.innovator}
                fill
                priority
                sizes="(min-width: 1024px) 24vw, 50vw"
                className="object-cover object-[50%_25%]"
              />
              {/* Top corner: the "Connected" card floats over the bottom of this portrait from sm up. */}
              <figcaption className="absolute inset-s-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-cyan px-2.5 py-1 font-mono text-[0.625rem] whitespace-nowrap text-abyss uppercase sm:inset-s-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[0.6875rem]">
                <Lightbulb aria-hidden className="hidden size-3.5 min-[400px]:block" />
                {roles.innovator}
              </figcaption>
            </figure>
            <figure data-portrait="investor" className="relative mb-10 aspect-3/4 overflow-hidden rounded-3xl bg-navy sm:mb-16">
              <Image
                src="/images/site/home-hero-investor.webp"
                alt={alts.investor}
                fill
                priority
                sizes="(min-width: 1024px) 24vw, 50vw"
                className="object-cover object-[50%_20%]"
              />
              <figcaption className="absolute inset-e-2 bottom-2 inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 font-mono text-[0.625rem] whitespace-nowrap text-abyss uppercase sm:inset-e-4 sm:bottom-4 sm:px-3 sm:py-1.5 sm:text-[0.6875rem]">
                <TrendingUp aria-hidden className="hidden size-3.5 min-[400px]:block" />
                {roles.investor}
              </figcaption>
            </figure>
          </div>

          {/* The moment they meet: illustrative, so hidden from assistive tech. */}
          {requested ? (
            <div
              data-hero-card
              aria-hidden
              className="absolute top-0 inset-e-8 hidden items-center gap-3 rounded-2xl bg-white p-3 pe-4 shadow-elevated sm:flex lg:top-2"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold text-abyss">
                <Send aria-hidden className="size-4 rtl:-scale-x-100" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{requested.title}</span>
                <span className="block text-xs text-muted">{requested.detail}</span>
              </span>
            </div>
          ) : null}
          {connected ? (
            <div aria-hidden className="mt-4 flex justify-center sm:absolute sm:inset-x-2 sm:bottom-0 sm:mt-0">
              <div data-hero-card className="flex items-center gap-3 rounded-2xl bg-white p-3 pe-4 shadow-elevated">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cyan text-abyss">
                  <Check aria-hidden className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{connected.title}</span>
                  <span className="block text-xs text-muted">{connected.detail}</span>
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
