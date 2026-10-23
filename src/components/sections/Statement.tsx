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
          {/* The statement fills the row; a footnote sits beside it from xl (at lg its column is too narrow for an email address), so the right side is never left empty. */}
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-12">
            <div className={cn("flex flex-col justify-end gap-7", footnote ? "xl:col-span-8" : "xl:col-span-12")}>
              {eyebrow ? <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow> : null}
              <p data-statement className={cn("text-[clamp(1.625rem,1.05rem+2.4vw,3.25rem)] font-heading leading-[1.2] font-semibold tracking-tight text-pretty", dark ? "text-white" : "text-ink")}>
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
            </div>
            {footnote ? (
              <div
                data-statement-foot
                className={cn(
                  "flex flex-col gap-6 rounded-3xl border-t-2 p-6 xl:col-span-4 xl:self-end",
                  dark ? "border-cyan bg-white/5 backdrop-blur-sm" : "border-cyan-ink bg-surface",
                )}
              >
                <Image src="/brand/xwavy-mark.png" alt="" aria-hidden width={40} height={40} className={cn("size-10 rounded-xl", dark && "ring-1 ring-white/15")} />
                <p className={cn("font-heading text-[clamp(1.125rem,0.95rem+0.7vw,1.625rem)] leading-snug font-medium tracking-tight", dark ? "text-white" : "text-ink")}>{footnote}</p>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
