"use client";

import { BadgeCheck, Handshake, PenLine, Search, Send } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type copy from "@/i18n/pages/how-it-works";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { EASE, MEDIA } from "@/lib/motion";

type HowHeroProps = {
  t: (typeof copy)["en"]["hero"];
  /** The five platform step names (post, review, discover, request, connect). */
  steps: readonly string[];
  imageAlt: string;
  primaryHref: string;
  secondaryHref: string;
};

const ICONS = [PenLine, BadgeCheck, Search, Send, Handshake] as const;

/**
 * How it works hero: a centred headline over a wide photograph, with the
 * whole journey (post → review → discover → request → connect) as a bar on
 * the photo. On load the headline rises, the photo opens, and the five steps
 * light up one after another along the line.
 */
export function HowHero({ t, steps, imageAlt, primaryHref, secondaryHref }: HowHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const split = SplitText.create(q("[data-hero-title]"), { type: "lines", mask: "lines", autoSplit: true });
        gsap
          .timeline({ defaults: { ease: EASE.gsapOut } })
          .from(q("[data-hero-eyebrow]"), { y: 16, autoAlpha: 0, duration: 0.6 }, 0.1)
          .from(split.lines, { yPercent: 110, duration: 1, stagger: 0.1 }, 0.15)
          .from(q("[data-hero-copy]"), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.45)
          .from(q("[data-hero-media]"), { clipPath: "inset(14% 10% 0% 10% round 1.5rem)", duration: 1.3, ease: "power3.out", clearProps: "clipPath" }, 0.4)
          .fromTo(q("[data-hero-media] img"), { scale: 1.2 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0.4)
          .from(q("[data-journey-line]"), { scaleX: 0, duration: 1.4, ease: "power2.inOut" }, 1)
          .from(q("[data-journey-step]"), { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.22 }, 1.05)
          .from(q("[data-journey-dot]"), { scale: 0.4, autoAlpha: 0.2, duration: 0.45, stagger: 0.22, ease: "back.out(2)" }, 1.15);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hiw-hero" className="surface-abyss bg-grid panel mt-(--panel-inset)">
      <Container className="pt-[calc(var(--panel-inset)+6.5rem)] pb-(--panel-inset) lg:pt-[calc(var(--panel-inset)+7.5rem)]">
        <div data-intro className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <p
            data-hero-eyebrow
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 py-1 ps-1 pe-4 font-mono text-eyebrow text-mist uppercase"
          >
            <Image src="/brand/xwavy-mark.png" alt="" aria-hidden width={24} height={24} className="size-6 shrink-0 rounded-[0.4rem] ring-1 ring-white/15" />
            {t.eyebrow}
          </p>
          <h1 id="hiw-hero" data-hero-title className="text-hero text-white">
            {t.titleLead} <span className="accent text-cyan">{t.titleAccent}</span>
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

        {/* The photograph with the journey along its foot. */}
        <div data-intro data-hero-media className="relative mt-12 overflow-hidden rounded-3xl bg-navy lg:mt-16">
          <div className="relative aspect-4/3 sm:aspect-video lg:aspect-[21/9]">
            <Image src="/images/site/hiw-hero-wide.webp" alt={imageAlt} fill priority sizes="100vw" className="object-cover object-[50%_40%]" />
          </div>

          <div className="relative bg-abyss px-3 py-4 sm:p-5 lg:absolute lg:inset-x-6 lg:bottom-6 lg:rounded-2xl lg:bg-abyss/85 lg:backdrop-blur-md">
            <div className="relative">
              <span aria-hidden data-journey-line className="absolute inset-x-[10%] top-5 h-px origin-left bg-white/20 rtl:origin-right" />
              <ol className="grid grid-cols-5 sm:gap-1">
                {steps.map((name, i) => {
                  const Icon = ICONS[i] ?? PenLine;
                  return (
                    <li key={name} data-journey-step className="relative flex flex-col items-center gap-2 text-center">
                      <span data-journey-dot className="grid size-10 place-items-center rounded-full bg-cyan text-abyss">
                        <Icon aria-hidden className="size-4" />
                      </span>
                      {/* Five labels share ~250px on a 320px screen, so the smallest phones get a smaller size. */}
                      <span className="font-mono text-[0.5625rem] text-mist uppercase min-[360px]:text-[0.625rem] sm:text-eyebrow">{name}</span>
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
