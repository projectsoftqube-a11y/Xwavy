"use client";

import { Check, Handshake, Lightbulb, Lock, LockOpen, ShieldCheck, TrendingUp, X } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type ConsentProps = { t: Dictionary["home"]["consent"] };

/**
 * The double opt-in, told as one product-style panel beside the copy: the
 * investor's request, the innovator's decision, then both introduced, joined
 * by a single rail. As it scrolls in the steps arrive in order, Accept is
 * pressed, the lock opens and the contact details flip from sealed to
 * shared. The markup is the final state, so reduced motion shows the outcome.
 */
export function Consent({ t }: ConsentProps) {
  const root = useRef<HTMLElement>(null);
  const [asks, decides, introduced] = t.stages;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: q("[data-flow]")[0], start: "top 72%", once: true } })
          .from(q("[data-flow-rail]"), { scaleY: 0, duration: 1.6, ease: "power2.inOut" }, 0)
          .from(q("[data-flow-step]"), { y: 28, autoAlpha: 0, duration: 0.7, stagger: 0.55 }, 0.1)
          .fromTo(q("[data-accept]"), { scale: 1 }, { scale: 0.92, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" }, 1.05)
          .fromTo(q("[data-status-sealed]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, 1.55)
          .from(q("[data-status-open]"), { autoAlpha: 0, y: 6, duration: 0.3 }, 1.6)
          .fromTo(q("[data-field-sealed]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2, stagger: 0.1 }, 1.7)
          .from(q("[data-field-open]"), { autoAlpha: 0, y: 6, duration: 0.3, stagger: 0.1 }, 1.75);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="consent-title" className="surface-abyss bg-grid panel py-section">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* The promise and its rules. */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading id="consent-title" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.body} tone="dark" />
            <ul className="flex flex-col gap-3">
              {t.rules.map((rule) => (
                <li key={rule} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-[0.9375rem] text-mist">
                  <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-cyan" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* The handshake, as the product shows it. */}
          <div data-flow className="rounded-4xl border border-white/10 bg-navy p-4 shadow-elevated sm:p-6 lg:col-span-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-1 pb-4">
              <span className="flex items-center gap-2.5 font-mono text-eyebrow text-mist uppercase">
                <span className="relative grid size-8 place-items-center rounded-full bg-white/10">
                  <Lock aria-hidden data-status-sealed className="absolute size-4 text-mist opacity-0" />
                  <LockOpen aria-hidden data-status-open className="size-4 text-cyan" />
                </span>
                {t.lockLabel}
              </span>
              <span className="relative inline-flex">
                <span data-status-sealed className="absolute inset-0 inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1 text-xs text-mist opacity-0">
                  {t.sealed}
                </span>
                <span data-status-open className="inline-flex items-center gap-1.5 rounded-full bg-cyan px-3 py-1 text-xs font-semibold text-abyss">
                  <Check aria-hidden className="size-3.5" />
                  {t.revealed}
                </span>
              </span>
            </div>

            <div className="relative mt-5">
              <span aria-hidden data-flow-rail className="absolute top-6 bottom-6 inset-s-5 w-px origin-top bg-white/15 sm:inset-s-6" />
              <ol className="flex flex-col gap-4">

                {/* 1. The investor asks. */}
                <li data-flow-step className="relative flex gap-3 sm:gap-4">
                  <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-gold text-abyss ring-4 ring-navy sm:size-12">
                    <TrendingUp aria-hidden className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl border border-gold/25 bg-abyss p-4 sm:p-5">
                    <p className="font-mono text-eyebrow text-gold uppercase">{t.investorRole}</p>
                    <h3 className="mt-1.5 text-h4 text-white">{asks?.label}</h3>
                    <p className="mt-1 text-sm text-mist">{asks?.detail}</p>
                    <div aria-hidden className="mt-3 flex flex-col gap-1.5 rounded-xl bg-white/5 p-3">
                      <span className="h-2 w-11/12 rounded-full bg-white/15" />
                      <span className="h-2 w-2/3 rounded-full bg-white/15" />
                    </div>
                  </div>
                </li>

                {/* 2. The innovator decides. */}
                <li data-flow-step className="relative flex gap-3 sm:gap-4">
                  <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-cyan text-abyss ring-4 ring-navy sm:size-12">
                    <Lightbulb aria-hidden className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl border border-cyan/25 bg-abyss p-4 sm:p-5">
                    <p className="font-mono text-eyebrow text-cyan uppercase">{t.innovatorRole}</p>
                    <h3 className="mt-1.5 text-h4 text-white">{decides?.label}</h3>
                    <p className="mt-1 text-sm text-mist">{decides?.detail}</p>
                    <div aria-hidden className="mt-3 flex flex-wrap gap-2">
                      <span data-accept className="inline-flex items-center gap-1.5 rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-abyss">
                        <Check className="size-4" />
                        {t.accept}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-mist">
                        <X className="size-4" />
                        {t.decline}
                      </span>
                    </div>
                  </div>
                </li>

                {/* 3. Both introduced. */}
                <li data-flow-step className="relative flex gap-3 sm:gap-4">
                  <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-white text-abyss ring-4 ring-navy sm:size-12">
                    <Handshake aria-hidden className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl bg-white p-4 text-ink sm:p-5">
                    <h3 className="text-h4">{introduced?.label}</h3>
                    <p className="mt-1 text-sm text-body">{introduced?.detail}</p>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {t.fields.map((field) => (
                        <li key={field} className="rounded-xl border border-line px-3 py-2.5">
                          <p className="text-xs text-muted">{field}</p>
                          {/* Both states share one grid cell, so the row grows to fit whichever wraps. */}
                          <p className="mt-1 grid grid-cols-1 min-h-5 text-xs font-medium">
                            <span data-field-sealed className="col-start-1 row-start-1 flex items-center gap-1.5 text-muted opacity-0">
                              <Lock aria-hidden className="size-3.5 shrink-0" />
                              {t.sealed}
                            </span>
                            <span data-field-open className="col-start-1 row-start-1 flex items-center gap-1.5 text-cyan-ink">
                              <Check aria-hidden className="size-3.5 shrink-0" />
                              {t.revealed}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
