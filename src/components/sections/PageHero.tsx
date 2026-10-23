"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

export type HeroAction = {
  label: string;
  href: string;
  /** primary = cyan (innovator), accent = gold (investor), outline-inverse = quiet. */
  variant?: "primary" | "accent" | "outline-inverse";
};

type PageHeroProps = {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent?: string;
  body: string;
  actions?: readonly HeroAction[];
  image: { src: string; alt: string; position?: string };
  /** Short facts under the body copy (e.g. "Free for innovators"). */
  points?: readonly string[];
};

/**
 * Inner-page hero, cinematic and split: the copy on night on the start side,
 * the photograph running the hero's full height to the end edge of the
 * screen and fading into the night. On phones and tablets the photograph
 * sits behind the copy, dimmed toward the foot.
 *
 * Load, once the photograph has decoded: a curtain draws back from it while
 * it settles from a slight zoom, the label's rule draws, the title rises
 * letter by letter (word by word in Arabic), then the rest. Transform and
 * opacity only. Scroll: the photograph sinks slower than the page and the
 * copy lifts away. The curtain and [data-intro] copy are set before hydration
 * by globals.css, so nothing flashes; reduced motion shows everything still.
 */
export function PageHero({ id, eyebrow, titleLead, titleAccent, body, actions = [], image, points }: PageHeroProps) {
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
        const rtl = document.documentElement.dir === "rtl";
        const img = q("[data-hero-img]")[0] as HTMLImageElement | undefined;
        gsap.set(q("[data-hero-img]"), { scale: 1.15, force3D: true });
        const decoded = img && !img.complete ? img.decode().catch(() => undefined) : Promise.resolve();
        const ready = Promise.race([decoded, new Promise((resolve) => setTimeout(resolve, 1500))]);

        let split: SplitText | undefined;
        void ready.then(
          contextSafe?.(() => {
            gsap.set(q("[data-intro]"), { autoAlpha: 1 });
            gsap
              .timeline({ defaults: { ease: "expo.out" } })
              // The curtain retracts toward the outer edge of the screen.
              .to(
                q("[data-letterbox='curtain']"),
                {
                  xPercent: rtl ? -100 : 100,
                  duration: 1.5,
                  ease: "expo.inOut",
                },
                0,
              )
              .to(q("[data-hero-img]"), { scale: 1, duration: 2.6, ease: "power3.out" }, 0)
              .from(q("[data-hero-rule]"), { scaleX: 0, duration: 1.1 }, 0.5)
              .from(q("[data-hero-eyebrow]"), { x: rtl ? 16 : -16, autoAlpha: 0, duration: 1 }, 0.55)
              .from(q("[data-hero-fade]"), { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.1 }, 0.9);

            split = SplitText.create(q("[data-hero-title]"), {
              type: arabic ? "lines,words" : "lines,chars",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(arabic ? self.words : self.chars, {
                  yPercent: 120,
                  duration: 1.2,
                  ease: "expo.out",
                  stagger: arabic ? 0.07 : 0.02,
                  delay: 0.6,
                }),
            });

            const leave = {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            };
            gsap.to(q("[data-hero-img]"), {
              yPercent: 12,
              ease: "none",
              scrollTrigger: leave,
            });
            gsap.fromTo(
              q("[data-hero-copy]"),
              { y: 0, autoAlpha: 1 },
              {
                y: -80,
                autoAlpha: 0.2,
                ease: "none",
                immediateRender: false,
                scrollTrigger: leave,
              },
            );
          }),
        );
        return () => split?.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby={id} className="relative isolate overflow-hidden bg-night">
      {/* The photograph: behind the copy on phones and tablets, the end half from lg. */}
      <div className="absolute inset-0 -z-10 overflow-hidden lg:inset-s-auto lg:w-[54%]">
        <Image
          data-hero-img
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 100vw"
          className={cn("object-cover will-change-transform", image.position ?? "object-center")}
        />
        <span aria-hidden className="absolute inset-0 bg-linear-to-t from-night via-night/75 to-night/40 lg:hidden" />
        <span aria-hidden className="absolute inset-0 hidden bg-linear-to-r from-night via-night/20 to-transparent lg:block rtl:bg-linear-to-l" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-linear-to-t from-night to-transparent lg:block" />
        <span aria-hidden className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-night/70 to-transparent" />
        {/* Curtain: draws back on load. Shown only before the intro (globals.css). */}
        <span aria-hidden data-letterbox="curtain" className="absolute inset-0 bg-night will-change-transform" />
      </div>

      <Container className="relative flex min-h-[92svh] flex-col justify-end pt-[calc(var(--spacing-header)+5rem)] pb-14 lg:min-h-[88svh] lg:justify-center lg:pb-20">
        <div data-intro data-hero-copy className="flex flex-col gap-7 lg:w-[50%] lg:pe-8">
          <p data-hero-eyebrow className="flex items-center gap-3 font-display text-base tracking-[0.2em] text-cyan uppercase">
            <span aria-hidden data-hero-rule className="h-px w-10 shrink-0 origin-left bg-cyan rtl:origin-right" />
            {eyebrow}
          </p>
          <h1 id={id} data-hero-title className="max-w-[16ch] text-display text-fog drop-shadow-[0_4px_30px_rgb(0_0_0/0.5)]">
            {titleLead}
            {titleAccent ? (
              <>
                {" "}
                <span className="accent text-cyan">{titleAccent}</span>
              </>
            ) : null}
          </h1>
          <p data-hero-fade className="max-w-xl text-lead text-fog/80">
            {body}
          </p>
          {points?.length ? (
            <ul data-hero-fade className="flex flex-col gap-2.5 border-t border-white/15 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-7">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-base text-fog/80">
                  <Check aria-hidden className="size-4 shrink-0 text-cyan" />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
          {actions.length ? (
            <div data-hero-fade className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {actions.map((action) => (
                <Button key={action.label} href={action.href} size="lg" variant={action.variant ?? "primary"} arrow className="w-full sm:w-auto">
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
