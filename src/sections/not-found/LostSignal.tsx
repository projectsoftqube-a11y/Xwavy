"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type LostSignalProps = {
  title: string;
  body: string;
  home: { label: string; href: string };
  contact: { label: string; href: string };
};

/** One flat line that breaks into a wave in the middle: the lost signal. */
const WAVE = "M 0 60 L 150 60 C 175 60 180 20 200 20 C 220 20 225 100 245 100 C 265 100 270 35 290 35 C 310 35 315 85 335 85 C 355 85 360 60 380 60 L 600 60";

/**
 * The 404 page on night: an outlined "404" with a signal line that draws
 * itself across, breaks into a wave and keeps pulsing, then the message and
 * the ways back. Reduced motion shows it drawn and still.
 */
export function LostSignal({ title, body, home, contact }: LostSignalProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.reducedMotion, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      });
      mm.add(MEDIA.motionOk, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(q("[data-code]"), { yPercent: 60, autoAlpha: 0, duration: 1.4 }, 0)
          .from(q("[data-wave]"), { drawSVG: 0, duration: 1.8, ease: "power2.inOut" }, 0.2)
          .from(q("[data-fade]"), { y: 26, autoAlpha: 0, duration: 1.1, stagger: 0.1 }, 0.6)
          .add(() => {
            gsap.fromTo(q("[data-pulse]"), { drawSVG: "0% 0%" }, { drawSVG: "100% 100%", duration: 2.4, ease: "power1.inOut", repeat: -1, repeatDelay: 0.4 });
          });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="nf-title" className="relative isolate overflow-hidden bg-night">
      <span aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <span aria-hidden className="glow-cyan pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[56rem] -translate-1/2 opacity-40" />

      <Container className="flex min-h-svh flex-col items-center justify-center gap-8 pt-[calc(var(--spacing-header)+3rem)] pb-section text-center">
        <div data-intro className="flex w-full flex-col items-center">
          <p data-code dir="ltr" className="font-display text-[5rem] leading-none font-bold tracking-[0.08em] stroke-text-fog">
            404
          </p>
          <svg aria-hidden viewBox="0 0 600 120" fill="none" className="mt-6 w-full max-w-xl overflow-visible">
            <path data-wave d={WAVE} stroke="var(--color-hair-strong)" strokeWidth="2" strokeLinecap="round" />
            <path data-pulse d={WAVE} stroke="var(--color-cyan)" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgb(0_225_234/0.9)]" />
          </svg>
        </div>

        <div data-intro className="flex max-w-xl flex-col items-center gap-5">
          <h1 id="nf-title" data-fade className="font-display text-h2 leading-none font-semibold text-fog uppercase">
            {title}
          </h1>
          <p data-fade className="text-lead text-haze">
            {body}
          </p>
          <div data-fade className="mt-3 flex flex-col items-center gap-3 sm:flex-row">
            <Button href={home.href} variant="primary" size="lg" arrow>
              {home.label}
            </Button>
            <Button href={contact.href} variant="outline-inverse" size="lg">
              {contact.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
