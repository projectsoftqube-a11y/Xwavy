"use client";

import { Check, Handshake, Lightbulb, TrendingUp } from "lucide-react";
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
 * Grid placement. Desktop: the innovator lane, a spine of two rails, the
 * investor lane, each step in its own row so the two sides line up step for
 * step. Phones: one column, innovator lane first, then investor.
 */
const PLACE = {
  innovator: {
    photo: "order-1 lg:col-start-1 lg:row-start-1",
    steps: ["order-2 lg:col-start-1 lg:row-start-2", "order-3 lg:col-start-1 lg:row-start-3", "order-4 lg:col-start-1 lg:row-start-4"],
  },
  investor: {
    photo: "order-5 mt-8 lg:mt-0 lg:col-start-3 lg:row-start-1",
    steps: ["order-6 lg:col-start-3 lg:row-start-2", "order-7 lg:col-start-3 lg:row-start-3", "order-8 lg:col-start-3 lg:row-start-4"],
  },
} as const;

const SIDES = {
  innovator: {
    Icon: Lightbulb,
    photo: { src: "/images/site/hiw-path-innovator.webp", position: "object-[50%_35%]" },
    chip: "bg-cyan text-abyss",
    number: "text-cyan-ink",
    node: "bg-cyan ring-cyan/25",
    rail: "bg-cyan",
    /** Which edge of the card faces the spine: the end edge on the start-side lane. */
    toSpine: "lg:-inset-e-10",
    from: -36,
  },
  investor: {
    Icon: TrendingUp,
    photo: { src: "/images/site/hiw-path-investor.webp", position: "object-[60%_40%]" },
    chip: "bg-gold text-abyss",
    number: "text-gold-ink",
    node: "bg-gold ring-gold/30",
    rail: "bg-gold",
    toSpine: "lg:-inset-s-10",
    from: 36,
  },
} as const;

/**
 * Each side's three steps as two mirrored lanes with a spine of two rails
 * between them (cyan for innovators, gold for investors). Steps line up row
 * for row, the rails draw as you scroll, and at the foot the two rails bend
 * together into one point: the introduction. Final state is in the markup.
 */
export function PathTimelines({ t, alts }: PathTimelinesProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        const grid = q("[data-lanes]")[0];
        gsap.from(q("[data-rail]"), {
          scaleY: 0,
          ease: "none",
          scrollTrigger: { trigger: grid, start: "top 70%", end: "bottom 65%", scrub: true },
        });
        q("[data-lane-photo]").forEach((photo) => {
          gsap.from(photo, { y: 40, autoAlpha: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: photo, start: "top 85%", once: true } });
          gsap.fromTo(photo.querySelector("img"), { scale: 1.15 }, { scale: 1, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: photo, start: "top 85%", once: true } });
        });
        gsap.fromTo(q("[data-merge] path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", scrollTrigger: { trigger: q("[data-merge]")[0], start: "top 85%", once: true } });
        gsap.from(q("[data-meet]"), { y: 40, autoAlpha: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: q("[data-meet]")[0], start: "top 88%", once: true } });
        gsap.from(q("[data-meet-coin]"), { scale: 0.4, rotate: -90, duration: 0.9, ease: "back.out(1.8)", scrollTrigger: { trigger: q("[data-meet]")[0], start: "top 80%", once: true } });
      });

      // Steps slide in from their own side on desktop (mirrored in Arabic), rise on phones.
      mm.add({ wide: `${MEDIA.motionOk} and (min-width: 1024px)`, narrow: `${MEDIA.motionOk} and (max-width: 1023.98px)` }, (context) => {
        const rtl = document.documentElement.dir === "rtl" ? -1 : 1;
        q("[data-step]").forEach((step) => {
          const x = context.conditions?.wide ? Number(step.dataset.from) * rtl : 0;
          gsap.from(step, { x, y: x ? 0 : 28, autoAlpha: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: step, start: "top 88%", once: true } });
        });
      });
    },
    { scope: root },
  );

  const lanes = [
    { side: "innovator", data: t.innovator, alt: alts.innovator },
    { side: "investor", data: t.investor, alt: alts.investor },
  ] as const;

  return (
    <section ref={root} aria-labelledby="hiw-paths" className="bg-surface py-section">
      <Container>
        <SectionHeading id="hiw-paths" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} align="center" />

        <div className="mx-auto mt-12 max-w-6xl lg:mt-16">
          <div data-lanes className="relative grid grid-cols-1 gap-y-4 lg:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] lg:gap-y-5">
            {/* The spine: one rail per side, running beside the steps. */}
            <div aria-hidden className="relative hidden lg:col-start-2 lg:row-span-3 lg:row-start-2 lg:block">
              <span data-rail className="absolute inset-s-10 -top-5 bottom-0 w-0.5 origin-top rounded-full bg-cyan" />
              <span data-rail className="absolute inset-e-10 -top-5 bottom-0 w-0.5 origin-top rounded-full bg-gold" />
            </div>

            {lanes.map(({ side, data, alt }) => {
              const s = SIDES[side];
              return [
                <div key={`${side}-photo`} data-lane-photo className={cn("relative overflow-hidden rounded-3xl bg-navy", PLACE[side].photo)}>
                  <div className="relative aspect-16/10">
                    <Image src={s.photo.src} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className={cn("object-cover", s.photo.position)} />
                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-abyss/85 to-transparent" />
                  </div>
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-6">
                    <h3 className="flex items-center gap-3 text-h3 text-white">
                      <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", s.chip)}>
                        <s.Icon aria-hidden className="size-5" />
                      </span>
                      {data.label}
                    </h3>
                    <span aria-hidden dir="ltr" className="font-mono text-eyebrow text-white/70 uppercase" data-numeric>
                      01–0{data.steps.length}
                    </span>
                  </div>
                </div>,
                ...data.steps.map((step, i) => (
                  <div key={step.title} data-step data-from={s.from} className={cn("relative ps-10 lg:ps-0", PLACE[side].steps[i])}>
                    {/* Phones: the rail runs down the start edge, through each step's node. */}
                    <span aria-hidden className={cn("absolute inset-s-2.75 -top-4 bottom-0 w-0.5 rounded-full lg:hidden", s.rail, i === 0 && "top-9")} />
                    {/* The step's node on its rail, and the tick that ties the card to it. */}
                    <span aria-hidden className={cn("absolute top-10 hidden h-px w-10 lg:block", s.rail, s.toSpine)} />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-s-1.5 top-7.5 size-3 rounded-full ring-4 sm:top-8.5",
                        s.node,
                        side === "innovator" ? "lg:inset-s-auto lg:-inset-e-11.75" : "lg:-inset-s-11.75",
                      )}
                    />
                    <article className="group h-full rounded-2xl border border-line bg-white p-6 shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:shadow-elevated sm:p-7">
                      <div className="flex items-baseline gap-4">
                        <span className={cn("font-mono text-sm font-medium", s.number)} data-numeric>
                          0{i + 1}
                        </span>
                        <div>
                          <h4 className="text-h4 text-ink">{step.title}</h4>
                          <p className="mt-1.5 text-[0.9375rem] text-body">{step.body}</p>
                        </div>
                      </div>
                    </article>
                  </div>
                )),
              ];
            })}
          </div>

          {/* The two rails bend into one. Drawn for left-to-right; mirrored in Arabic so cyan stays on the innovator side. */}
          <svg aria-hidden data-merge viewBox="0 0 112 96" className="mx-auto hidden h-24 w-28 lg:block rtl:-scale-x-100">
            <path d="M 41 0 C 41 56 56 40 56 96" pathLength={1} strokeDasharray="1 1" fill="none" stroke="var(--color-cyan)" strokeWidth="2" />
            <path d="M 71 0 C 71 56 56 40 56 96" pathLength={1} strokeDasharray="1 1" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
          </svg>
          <span aria-hidden className="mx-auto mt-4 block h-12 w-0.5 bg-field/40 lg:hidden" />

          <div data-meet className="surface-abyss bg-grid relative mx-auto max-w-3xl overflow-hidden rounded-3xl px-6 py-10 text-center sm:px-12 sm:py-12">
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              <RoleTag label={t.innovator.label} tone="innovator" />
              <span aria-hidden className="hidden h-px w-10 bg-cyan/60 sm:block" />
              <span data-meet-coin aria-hidden className="relative grid size-16 shrink-0 place-items-center">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-y-0 inset-s-0 w-1/2 bg-cyan" />
                  <span className="absolute inset-y-0 inset-e-0 w-1/2 bg-gold" />
                </span>
                <span className="relative grid size-12 place-items-center rounded-full bg-abyss text-white">
                  <Handshake className="size-5" />
                </span>
              </span>
              <span aria-hidden className="hidden h-px w-10 bg-gold/60 sm:block" />
              <RoleTag label={t.investor.label} tone="investor" />
            </div>
            <h3 className="mt-8 text-h2 text-white">{t.meeting.title}</h3>
            <p className="mx-auto mt-3 max-w-md text-lead text-mist">{t.meeting.body}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** A side's name with the tick that stands for its yes. */
function RoleTag({ label, tone }: { label: string; tone: "innovator" | "investor" }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 py-1 ps-1 pe-3 text-sm font-medium text-white">
      <span className={cn("grid size-6 place-items-center rounded-full text-abyss", tone === "innovator" ? "bg-cyan" : "bg-gold")}>
        <Check aria-hidden className="size-3.5" strokeWidth={3} />
      </span>
      {label}
    </span>
  );
}
