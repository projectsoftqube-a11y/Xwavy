"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, MEDIA } from "@/lib/motion";

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
 * Inner-page hero: dark inset panel, copy on one side and a photograph on the
 * other. Copy rises in and the photo opens with a soft wipe on load; the
 * photo then drifts slightly as the hero scrolls away.
 *
 * Elements marked [data-intro] are hidden before hydration by globals.css (no
 * flash) and revealed here; reduced motion shows everything at once.
 */
export function PageHero({ id, eyebrow, titleLead, titleAccent, body, actions = [], image, points }: PageHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.from(q("[data-hero-fade]"), { y: 36, autoAlpha: 0, duration: 0.9, ease: EASE.gsapOut, stagger: 0.09, delay: 0.1 });
        gsap.from(q("[data-hero-media]"), { clipPath: "inset(12% 8% 12% 8%)", duration: 1.3, ease: "power3.out", delay: 0.15, clearProps: "clipPath" });
        gsap.fromTo(q("[data-hero-media] img"), { scale: 1.25 }, { scale: 1.12, duration: 1.6, ease: "power3.out", delay: 0.15 });
        // Gentle drift as the hero scrolls away.
        gsap.to(q("[data-hero-media] img"), {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby={id} className="surface-abyss bg-grid panel relative mt-(--panel-inset)">
      <Container className="grid grid-cols-1 gap-10 pt-[calc(var(--panel-inset)+6.5rem)] pb-section-sm lg:grid-cols-12 lg:gap-14 lg:pt-[calc(var(--panel-inset)+7.5rem)] lg:pb-14">
        <div data-intro className="flex flex-col justify-center gap-6 lg:col-span-7">
          <p data-hero-fade className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/12 bg-white/5 py-1 ps-1 pe-3.5 font-mono text-eyebrow text-mist uppercase">
            <Image src="/brand/xwavy-mark.png" alt="" aria-hidden width={24} height={24} className="size-6 shrink-0 rounded-[0.4rem] ring-1 ring-white/15" />
            {eyebrow}
          </p>
          <h1 id={id} data-hero-fade className="max-w-[18ch] text-display text-white">
            {titleLead}
            {titleAccent ? (
              <>
                {" "}
                <span className="accent text-cyan">{titleAccent}</span>
              </>
            ) : null}
          </h1>
          <p data-hero-fade className="max-w-xl text-lead text-mist">
            {body}
          </p>
          {points?.length ? (
            <ul data-hero-fade className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-mist">
                  <Check aria-hidden className="size-4 shrink-0 text-cyan" />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
          {actions.length ? (
            <div data-hero-fade className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {actions.map((action) => (
                <Button key={action.label} href={action.href} size="lg" variant={action.variant ?? "primary"} arrow={action.variant !== "outline-inverse"}>
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>

        <div data-intro data-hero-media className="relative aspect-4/3 overflow-hidden rounded-3xl bg-navy lg:col-span-5 lg:aspect-auto lg:min-h-[28rem]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className={cn("object-cover", image.position ?? "object-center")}
          />
        </div>
      </Container>
    </section>
  );
}
