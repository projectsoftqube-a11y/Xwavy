"use client";

import { Eye, KeyRound, Lock } from "lucide-react";
import { useRef } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Container } from "@/components/layout/Container";
import type copy from "@/i18n/pages/ideas";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type IdeaAnatomyProps = { t: (typeof copy)["en"]["layers"] };

/** Skeleton widths, so the placeholder rows read like real content. */
const WIDTHS = ["w-4/5", "w-3/5", "w-2/3", "w-1/2"] as const;

/**
 * The anatomy of an idea: one listing drawn as a spec sheet on night, split
 * into its three layers (public summary, subscriber detail, sealed contact),
 * with a legend beside it. As the sheet scrolls in, a scan beam passes down
 * it and each layer, and its legend entry, lights up as the beam reaches it.
 * Placeholder bars stand in for content: no fake listing.
 */
export function IdeaAnatomy({ t }: IdeaAnatomyProps) {
  const root = useRef<HTMLElement>(null);
  const [publicLayer, paidLayer, privateLayer] = t.cards;
  const legend = [
    { card: publicLayer, Icon: Eye, ring: "border-cyan/50 text-cyan", glow: "bg-cyan" },
    { card: paidLayer, Icon: Lock, ring: "border-gold/50 text-gold", glow: "bg-gold" },
    { card: privateLayer, Icon: KeyRound, ring: "border-fog/40 text-fog", glow: "bg-fog" },
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        const layers = q("[data-layer]");
        const items = q("[data-legend]");
        const beam = q("[data-beam]")[0];
        const tl = gsap.timeline({ scrollTrigger: { trigger: q("[data-sheet]")[0], start: "top 72%", once: true } });
        tl.from(q("[data-sheet]"), { y: 60, autoAlpha: 0, duration: 1.1, ease: "expo.out" });
        if (beam) tl.fromTo(beam, { top: "0%", autoAlpha: 1 }, { top: "100%", duration: 1.8, ease: "power1.inOut" }, 0.4).to(beam, { autoAlpha: 0, duration: 0.3 });
        layers.forEach((layer, i) => {
          const at = 0.5 + i * 0.55;
          tl.from(layer, { autoAlpha: 0.15, filter: "blur(6px)", duration: 0.6, ease: "power2.out", clearProps: "filter" }, at);
          tl.from(gsap.utils.toArray<HTMLElement>("[data-layer-row]", layer), { x: -16, autoAlpha: 0, duration: 0.5, ease: "power3.out", stagger: 0.05 }, at + 0.1);
          if (items[i]) tl.from(items[i], { x: -24, autoAlpha: 0.2, duration: 0.6, ease: "power3.out" }, at);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="id-layers" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-cyan pointer-events-none absolute top-1/4 start-[-14rem] size-[44rem] opacity-30" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-9 lg:col-span-5 lg:self-center">
            <CinemaHeading id="id-layers" number="01" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.description} size="md" />
            <ol className="flex flex-col">
              {legend.map(({ card, Icon, ring, glow }, i) =>
                card ? (
                  <li key={card.title} data-legend className="relative flex items-center gap-4 border-t border-hair py-5 last:border-b">
                    <span aria-hidden className={cn("absolute top-[-1px] start-0 h-px w-16", glow)} />
                    <span className={cn("grid size-12 shrink-0 place-items-center rounded-full border bg-night-1", ring)}>
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base tracking-[0.14em] text-dim uppercase">{card.kicker}</span>
                      <span className="block font-display text-[1.5rem] leading-tight font-semibold text-fog uppercase">{card.title}</span>
                    </span>
                    <span dir="ltr" className="font-display text-[1.75rem] leading-none font-bold stroke-text-hair-strong" data-numeric>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ) : null,
              )}
            </ol>
          </div>

          {/* The spec sheet. */}
          <div data-sheet className="relative min-w-0 lg:col-span-7">
            <div className="relative flex flex-col gap-3 overflow-hidden rounded-[2rem] border border-hair bg-night-1 p-3 shadow-[0_60px_140px_-60px_rgb(0_0_0/0.9)] sm:p-4">
              <span
                aria-hidden
                data-beam
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 -translate-y-1/2 bg-linear-to-b from-transparent via-cyan/20 to-transparent opacity-0 after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-cyan after:shadow-[0_0_18px_rgb(0_225_234/0.9)]"
              />

              {publicLayer ? (
                <div data-layer className="rounded-3xl border border-cyan/25 bg-cyan/[0.04] p-5 sm:p-6">
                  <p className="inline-flex items-center gap-2 rounded-full border border-cyan/40 px-3 py-1 font-display text-base tracking-[0.12em] text-cyan uppercase">
                    <Eye aria-hidden className="size-3.5" />
                    {publicLayer.kicker}
                  </p>
                  <span aria-hidden data-layer-row className="mt-5 block h-5 w-3/4 rounded-full bg-fog/80" />
                  <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {publicLayer.points.map((point, i) => (
                      <li key={point} data-layer-row>
                        <p className="text-base text-haze">{point}</p>
                        <span aria-hidden className={cn("mt-2 block h-2.5 rounded-full bg-white/10", WIDTHS[i % WIDTHS.length])} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {paidLayer ? (
                <div data-layer className="rounded-3xl border border-dashed border-gold/40 bg-gold/[0.04] p-5 sm:p-6">
                  <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 font-display text-base tracking-[0.12em] text-gold uppercase">
                    <Lock aria-hidden className="size-3.5" />
                    {paidLayer.kicker}
                  </p>
                  <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {paidLayer.points.map((point) => (
                      <li key={point} data-layer-row className="flex items-center gap-3 rounded-2xl border border-hair bg-night p-3.5">
                        <Lock aria-hidden className="size-4 shrink-0 text-gold" />
                        <span className="text-base text-fog">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {privateLayer ? (
                <div data-layer className="relative overflow-hidden rounded-3xl border border-hair-strong bg-night p-5 sm:p-6">
                  <span aria-hidden className="bg-grid absolute inset-0 opacity-60" />
                  <p className="relative inline-flex items-center gap-2 rounded-full border border-fog/30 px-3 py-1 font-display text-base tracking-[0.12em] text-fog uppercase">
                    <KeyRound aria-hidden className="size-3.5" />
                    {privateLayer.kicker}
                  </p>
                  <ul className="relative mt-5 flex flex-col gap-2.5">
                    {privateLayer.points.map((point, i) => (
                      <li key={point} data-layer-row className="flex items-center justify-between gap-4 text-base">
                        <span className={i === 0 ? "text-fog" : "text-haze"}>{point}</span>
                        {i === 0 ? (
                          <span aria-hidden className="font-display tracking-[0.3em] text-dim">
                            ••••••
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
