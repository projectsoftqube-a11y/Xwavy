"use client";

import { Check, Lightbulb, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/how-it-works";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type PathTimelinesProps = {
  t: (typeof copy)["en"]["tracks"];
  /** Alt text for the two portraits heading each track. */
  alts: { innovator: string; investor: string };
};

/**
 * Each side's three steps as two vertical timelines that converge on one
 * point, "Introduced". The rails draw as you scroll, the steps rise in, and
 * the two branches meet at the outcome card. Final state in the markup.
 */
export function PathTimelines({ t, alts }: PathTimelinesProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        q("[data-track]").forEach((track) => {
          const tq = gsap.utils.selector(track);
          gsap.from(tq("[data-rail]"), {
            scaleY: 0,
            ease: "none",
            scrollTrigger: { trigger: track, start: "top 75%", end: "bottom 60%", scrub: true },
          });
          gsap.from(tq("[data-step]"), {
            y: 30,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: { trigger: track, start: "top 75%", once: true },
          });
        });
        gsap.from(q("[data-merge]"), {
          scaleY: 0,
          autoAlpha: 0,
          transformOrigin: "50% 0%",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: q("[data-merge]")[0], start: "top 85%", once: true },
        });
        gsap.from(q("[data-meet]"), {
          scale: 0.92,
          autoAlpha: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: q("[data-meet]")[0], start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  const tracks = [
    {
      key: "innovator",
      data: t.innovator,
      Icon: Lightbulb,
      photo: { src: "/images/site/hiw-path-innovator.webp", alt: alts.innovator, position: "object-[50%_35%]" },
      card: "border border-line bg-white",
      title: "text-ink",
      text: "text-body",
      dot: "bg-cyan text-abyss ring-white",
      rail: "bg-cyan/50",
      chip: "bg-cyan text-abyss",
    },
    {
      key: "investor",
      data: t.investor,
      Icon: TrendingUp,
      photo: { src: "/images/site/hiw-path-investor.webp", alt: alts.investor, position: "object-[60%_40%]" },
      card: "surface-abyss",
      title: "text-white",
      text: "text-mist",
      dot: "bg-gold text-abyss ring-abyss",
      rail: "bg-gold/60",
      chip: "bg-gold text-abyss",
    },
  ] as const;

  return (
    <section ref={root} aria-labelledby="hiw-paths" className="bg-surface py-section">
      <Container>
      <SectionHeading id="hiw-paths" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} align="center" />

      <div className="mx-auto mt-12 max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {tracks.map(({ key, data, Icon, photo, card, title, text, dot, rail, chip }) => (
            <div key={key} data-track className={cn("overflow-hidden rounded-3xl", card)}>
              <div className="relative aspect-video">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className={cn("object-cover", photo.position)} />
                <p className={cn("absolute bottom-4 inset-s-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-eyebrow uppercase", chip)}>
                  <Icon aria-hidden className="size-3.5" />
                  {data.label}
                </p>
              </div>
              <div className="relative">
                <span aria-hidden data-rail className={cn("absolute top-10 bottom-10 inset-s-[2.6875rem] w-0.5 origin-top rounded-full sm:inset-s-[3.1875rem]", rail)} />
                <ol className="flex flex-col gap-8 p-6 sm:p-8">
                  {data.steps.map((step, i) => (
                    <li key={step.title} data-step className="relative flex gap-5">
                      <span className={cn("relative grid size-10 shrink-0 place-items-center rounded-full font-mono text-sm ring-4", dot)} data-numeric>
                        {i + 1}
                      </span>
                      <div className="pt-1.5">
                        <h3 className={cn("text-h4", title)}>{step.title}</h3>
                        <p className={cn("mt-1.5 text-[0.9375rem]", text)}>{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        {/* The two branches meet. */}
        <svg aria-hidden data-merge viewBox="0 0 100 20" preserveAspectRatio="none" className="hidden h-16 w-full md:block">
          <path d="M 25 0 C 25 12, 50 8, 50 20" fill="none" stroke="var(--color-cyan-ink)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M 75 0 C 75 12, 50 8, 50 20" fill="none" stroke="var(--color-gold-ink)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <span aria-hidden className="mx-auto block h-8 w-0.5 bg-line md:hidden" />

        <div data-meet className="surface-abyss mx-auto flex max-w-xl items-center gap-5 rounded-3xl p-6 sm:p-7">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-cyan text-abyss">
            <Check aria-hidden className="size-7" />
          </span>
          <div>
            <h3 className="text-h3 text-white">{t.meeting.title}</h3>
            <p className="mt-1 text-mist">{t.meeting.body}</p>
          </div>
        </div>
      </div>
      </Container>
    </section>
  );
}
