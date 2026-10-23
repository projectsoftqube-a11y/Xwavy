"use client";

import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type StatementProps = {
  eyebrow?: string;
  parts: readonly { text: string; accent?: boolean }[];
  footnote?: string;
  /** Kept for compatibility: the band sits on night either way. */
  tone?: "light" | "dark";
  /** Photograph behind the statement, dimmed. */
  background?: string;
};

/**
 * One statement as a full-width cinematic band: a photograph behind it,
 * dimmed and drifting slower than the page, a large quote mark, and the
 * statement whose words light up in reading order as it scrolls through
 * (opacity only, scrubbed). A footnote sits beside it as a glass card.
 * Reduced motion shows it fully lit and still.
 */
export function Statement({ eyebrow, parts, footnote, background }: StatementProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const statement = q("[data-statement]")[0];
        const split = SplitText.create(statement, {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.15 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: {
                  trigger: statement,
                  start: "top 85%",
                  end: "bottom 50%",
                  scrub: true,
                },
              },
            ),
        });
        gsap.fromTo(
          q("[data-statement-img]"),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        gsap.from(q("[data-statement-mark]"), {
          scale: 0.5,
          autoAlpha: 0,
          duration: 1.2,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            once: true,
          },
        });
        // Not every statement has a footnote; GSAP warns on an empty target.
        const foot = q("[data-statement-foot]")[0];
        if (foot) {
          gsap.from(foot, {
            y: 40,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: foot, start: "top 90%", once: true },
          });
        }
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden border-t border-hair bg-night py-[calc(var(--spacing-section)*1.4)]">
      {background ? (
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <Image data-statement-img src={background} alt="" fill sizes="100vw" className="scale-115 object-cover" />
          <span className="absolute inset-0 bg-night/75" />
          <span className="absolute inset-0 bg-linear-to-b from-night via-transparent to-night" />
          <span className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        </div>
      ) : (
        <span aria-hidden className="glow-cyan pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[56rem] -translate-1/2 opacity-40" />
      )}

      <Container className="relative">
        <div className={cn("grid grid-cols-1 gap-10 xl:gap-16", footnote && "xl:grid-cols-12 xl:items-end")}>
          <div className={cn("flex flex-col gap-8", footnote ? "xl:col-span-8" : "mx-auto max-w-5xl items-center text-center")}>
            <span aria-hidden data-statement-mark className="font-display text-[5rem] leading-[0.6] font-bold text-cyan">
              “
            </span>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <p data-statement className="font-display text-[clamp(1.875rem,1.2rem+2.6vw,3.5rem)] leading-[1.15] font-medium text-fog">
              {parts.map((part, i) =>
                part.accent ? (
                  <span key={i} className="text-cyan">
                    {part.text}
                  </span>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </p>
          </div>
          {footnote ? (
            <div data-statement-foot className="relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/15 bg-night/60 p-7 backdrop-blur-xl xl:col-span-4">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan to-transparent" />
              <Image src="/brand/xwavy-mark.png" alt="" aria-hidden width={44} height={44} className="size-11 rounded-xl ring-1 ring-white/15" />
              <p className="text-lead leading-relaxed text-fog/90">{footnote}</p>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
