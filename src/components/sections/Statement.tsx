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
  tone?: "light" | "dark";
  /** Decorative photograph behind the statement, shown dimmed. */
  background?: string;
};

/**
 * One large statement. As it scrolls through the viewport its words light up
 * in reading order (opacity only, scrubbed), with an oversized quote mark and
 * a hairline that draws beside it. Reduced motion shows it fully lit.
 */
export function Statement({ eyebrow, parts, footnote, tone = "light", background }: StatementProps) {
  const root = useRef<HTMLElement>(null);
  const dark = tone === "dark";

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const split = SplitText.create(q("[data-statement]"), { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: q("[data-statement]")[0], start: "top 85%", end: "bottom 45%", scrub: true },
          },
        );
        gsap.from(q("[data-statement-rule]"), {
          scaleY: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 50%", scrub: true },
        });
        const foot = q("[data-statement-foot]")[0];
        if (foot) {
          gsap.from(foot, {
            y: 20,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: foot, start: "top 92%", once: true },
          });
        }
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={cn("panel relative py-section", dark ? "surface-abyss" : "bg-white")}>
      {background ? (
        <Image src={background} alt="" aria-hidden fill sizes="100vw" className={cn("object-cover", dark ? "opacity-25" : "opacity-20")} />
      ) : null}
      <Container className="relative">
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div className="flex items-start gap-5 lg:flex-col lg:items-center">
            <span aria-hidden className={cn("font-heading text-[6rem] leading-[0.7] font-bold", dark ? "text-cyan" : "text-cyan-ink")}>
              “
            </span>
            <span aria-hidden data-statement-rule className={cn("hidden w-px flex-1 origin-top lg:block", dark ? "bg-white/15" : "bg-line")} />
          </div>
          <div className="flex max-w-5xl flex-col gap-7">
            {eyebrow ? <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow> : null}
            <p data-statement className={cn("text-[clamp(1.625rem,1.05rem+2.4vw,3.25rem)] font-heading leading-[1.2] font-semibold tracking-[-0.025em] text-balance", dark ? "text-white" : "text-ink")}>
              {parts.map((part, i) =>
                part.accent ? (
                  <span key={i} className={cn("accent", dark ? "text-cyan" : "text-cyan-ink")}>
                    {part.text}
                  </span>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </p>
            {footnote ? (
              <p data-statement-foot className={cn("max-w-xl border-s-2 ps-4 text-lead", dark ? "border-cyan text-mist" : "border-cyan-ink text-muted")}>
                {footnote}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
