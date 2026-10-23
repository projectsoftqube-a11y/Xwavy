"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type CinemaHeroProps = {
  t: Dictionary["home"]["hero"];
  imageAlt: string;
  innovatorHref: string;
  investorHref: string;
};

/**
 * Home hero, full-bleed: the founder and the investor in a lounge at blue
 * hour, the promise set large across the photograph, and the details along
 * a rule at the foot.
 *
 * Load, once the photograph has decoded: two letterbox bars slide apart to
 * reveal it while it settles from a slight zoom, the label's rule draws, the
 * headline rises letter by letter (word by word in Arabic, whose letters
 * join), then the foot. Transform and opacity only, so it stays smooth.
 * Scroll: the photograph sinks slower than the page and the headline lifts
 * away and fades. Bars and [data-intro] content are set before hydration by
 * globals.css, so nothing flashes; reduced motion shows everything at once.
 */
export function CinemaHero({ t, imageAlt, innovatorHref, investorHref }: CinemaHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.reducedMotion, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      });
      mm.add(MEDIA.motionOk, () => {
        const arabic = document.documentElement.lang === "ar";
        const img = q("[data-hero-img]")[0] as HTMLImageElement | undefined;

        // Hold the opening frame until the photograph is decoded (at most 1.5s).
        gsap.set(q("[data-hero-img]"), { scale: 1.14, force3D: true });
        const decoded = img && !img.complete ? img.decode().catch(() => undefined) : Promise.resolve();
        const ready = Promise.race([decoded, new Promise((resolve) => setTimeout(resolve, 1500))]);

        // contextSafe: animations created after the await are still cleaned up on unmount.
        let split: SplitText | undefined;
        void ready.then(
          contextSafe?.(() => {
            gsap.set(q("[data-intro]"), { autoAlpha: 1 });
            gsap
              .timeline({ defaults: { ease: "expo.out" } })
              .to(q("[data-letterbox='top']"), { yPercent: -100, duration: 1.6, ease: "expo.inOut" }, 0)
              .to(q("[data-letterbox='bottom']"), { yPercent: 100, duration: 1.6, ease: "expo.inOut" }, 0)
              .to(q("[data-hero-img]"), { scale: 1, duration: 2.8, ease: "power3.out" }, 0)
              .from(q("[data-hero-rule]"), { scaleX: 0, duration: 1.2 }, 0.8)
              .from(q("[data-hero-eyebrow]"), { x: -16, autoAlpha: 0, duration: 1 }, 0.9)
              .from(q("[data-hero-line]"), { scaleX: 0, duration: 1.6 }, 1.2)
              .from(q("[data-hero-foot]"), { y: 28, autoAlpha: 0, duration: 1.2, stagger: 0.1 }, 1.3);

            // Leaving: layered parallax. The photo lags, the words lift, the foot fades.
            // Created here, after the intro has revealed the copy, with explicit start
            // values: scrolling back to the top always restores the headline.
            const leave = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
            gsap.to(q("[data-hero-media]"), { yPercent: 22, ease: "none", scrollTrigger: leave });
            gsap.fromTo(q("[data-hero-heading]"), { yPercent: 0, autoAlpha: 1 }, { yPercent: -35, autoAlpha: 0.15, ease: "none", immediateRender: false, scrollTrigger: leave });
            gsap.fromTo(q("[data-hero-bar]"), { y: 0, autoAlpha: 1 }, { y: -60, autoAlpha: 0, ease: "none", immediateRender: false, scrollTrigger: { ...leave, end: "60% top" } });

            // The headline: letters rise out of each line's mask as the bars part.
            split = SplitText.create(q("[data-hero-title]"), {
              type: arabic ? "lines,words" : "lines,chars",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(arabic ? self.words : self.chars, {
                  yPercent: 120,
                  duration: 1.3,
                  ease: "expo.out",
                  stagger: arabic ? 0.08 : 0.025,
                  delay: 0.75,
                }),
            });
          }),
        );

        return () => split?.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate min-h-[100svh] overflow-hidden bg-night">
      {/* The photograph and its shades. */}
      <div data-hero-media className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          data-hero-img
          src="/images/site/hiw-hero-wide.webp"
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[26%_center] will-change-transform lg:object-[50%_40%]"
        />
        <div aria-hidden className="absolute inset-0">
          <span className="absolute inset-0 bg-linear-to-b from-night/55 via-night/5 to-night/95" />
          <span className="absolute inset-0 bg-linear-to-r from-night/70 via-night/10 to-transparent max-lg:hidden rtl:bg-linear-to-l" />
        </div>
      </div>

      {/* Letterbox bars that part on load. Shown only before the intro (globals.css). */}
      <span aria-hidden data-letterbox="top" className="absolute inset-x-0 top-0 z-10 h-1/2 bg-night will-change-transform" />
      <span aria-hidden data-letterbox="bottom" className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-night will-change-transform" />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pt-[calc(var(--spacing-header)+3rem)] pb-10 lg:pb-14">
        <div data-intro data-hero-heading>
          <p data-hero-eyebrow className="flex items-center gap-3 font-display text-base tracking-[0.2em] text-cyan uppercase">
            <span aria-hidden data-hero-rule className="h-px w-10 shrink-0 origin-left bg-cyan rtl:origin-right" />
            {t.eyebrow}
          </p>
          <h1 id="hero-title" data-hero-title className="mt-6 max-w-[15ch] text-hero text-fog drop-shadow-[0_4px_40px_rgb(0_0_0/0.45)]">
            {t.title.line1} {t.title.before} <span className="accent text-cyan">{t.title.after}</span>
          </h1>
        </div>

        <div data-intro data-hero-bar className="relative mt-10 grid grid-cols-1 gap-8 pt-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <span aria-hidden data-hero-line className="absolute inset-x-0 top-0 h-px origin-left bg-white/20 rtl:origin-right" />
          <p data-hero-foot className="text-lead text-fog/85 lg:col-span-7 xl:col-span-5">
            {t.body}
          </p>
          <ul data-hero-foot className="flex flex-col gap-2.5 lg:col-span-5 xl:col-span-3">
            {t.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-base text-fog/80">
                <Check aria-hidden className="size-4 shrink-0 text-cyan" />
                {point}
              </li>
            ))}
          </ul>
          <div data-hero-foot className="flex flex-col gap-3 sm:flex-row lg:col-span-12 xl:col-span-4 xl:flex-col 2xl:flex-row 2xl:justify-end">
            <Button href={innovatorHref} size="lg" variant="primary" arrow className="w-full sm:w-auto">
              {t.primaryCta}
            </Button>
            <Button href={investorHref} size="lg" variant="outline-inverse" arrow className="w-full sm:w-auto">
              {t.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll cue: a light travelling down a hairline. Decorative. */}
      <span aria-hidden className="absolute end-[calc((100%-var(--site-container))/2)] top-[calc(var(--spacing-header)+3rem)] hidden h-24 w-px overflow-hidden bg-white/15 lg:block">
        <span className="absolute inset-x-0 top-0 h-1/3 animate-[scroll-cue_2.4s_var(--ease-brand)_infinite] bg-cyan" />
      </span>
    </section>
  );
}
