"use client";

import { FileWarning, Mail } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type LegalHeaderProps = {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
  draftBadge: string;
  /** Figures for the card beside the title, e.g. sections and minutes to read. */
  facts: readonly { value: number; label: string }[];
  /** Contact line at the foot of the card. */
  note: string;
};

/**
 * Header for the legal pages, on night, with the draft status always
 * visible. Beside the title, a glass card gives the document's size at a
 * glance (counted from the text itself, and counting up on load) and who to
 * write to. The title rises letter by letter; the photograph behind settles
 * from a slight zoom.
 */
export function LegalHeader({ id, eyebrow, title, accent, body, draftBadge, facts, note }: LegalHeaderProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.reducedMotion, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      });
      mm.add(MEDIA.motionOk, () => {
        const arabic = document.documentElement.lang === "ar";
        const rtl = document.documentElement.dir === "rtl";
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(q("[data-hero-img]"), { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power3.out" }, 0)
          .from(q("[data-hero-rule]"), { scaleX: 0, duration: 1.1 }, 0.1)
          .from(q("[data-hero-eyebrow]"), { x: rtl ? 16 : -16, autoAlpha: 0, duration: 1 }, 0.15)
          .from(q("[data-hero-fade]"), { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.1 }, 0.55)
          .from(q("[data-facts]"), { y: 60, autoAlpha: 0, duration: 1.3 }, 0.4);

        q("[data-count]").forEach((element, i) => {
          const value = Number(element.textContent) || 0;
          gsap.fromTo(element, { textContent: 0 }, { textContent: value, duration: 1.6, ease: "power2.out", snap: { textContent: 1 }, delay: 0.7 + i * 0.12 });
        });

        const split = SplitText.create(q("[data-hero-title]"), {
          type: arabic ? "lines,words" : "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => gsap.from(arabic ? self.words : self.chars, { yPercent: 120, duration: 1.2, ease: "expo.out", stagger: arabic ? 0.07 : 0.02, delay: 0.2 }),
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby={id} className="relative isolate overflow-hidden bg-night">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <Image data-hero-img src="/images/site/lg-header-bg.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-45 will-change-transform" />
        <span className="absolute inset-0 bg-linear-to-r from-night via-night/80 to-night/30 rtl:bg-linear-to-l" />
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-night to-transparent" />
      </div>

      <Container className="grid grid-cols-1 gap-12 pt-[calc(var(--spacing-header)+4rem)] pb-section lg:grid-cols-12 lg:items-end lg:gap-14 lg:pt-[calc(var(--spacing-header)+6rem)]">
        <div data-intro className="flex flex-col gap-6 lg:col-span-7">
          <p data-hero-eyebrow className="flex items-center gap-3 font-display text-base tracking-[0.2em] text-cyan uppercase">
            <span aria-hidden data-hero-rule className="h-px w-10 shrink-0 origin-left bg-cyan rtl:origin-right" />
            {eyebrow}
          </p>
          <h1 id={id} data-hero-title className="text-display text-fog">
            {title}
            {accent ? (
              <>
                {" "}
                <span className="accent text-cyan">{accent}</span>
              </>
            ) : null}
          </h1>
          <p data-hero-fade className="max-w-2xl text-lead text-fog/80">
            {body}
          </p>
          <p data-hero-fade className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-base text-gold">
            <FileWarning aria-hidden className="size-4" />
            {draftBadge}
          </p>
        </div>

        <div data-intro data-facts className="rounded-3xl border border-white/12 bg-night/60 p-6 backdrop-blur-xl sm:p-7 lg:col-span-5">
          <dl className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="relative overflow-hidden rounded-2xl border border-hair bg-white/[0.03] p-5">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan/70 to-transparent" />
                <dt className="font-display text-base tracking-[0.14em] text-haze uppercase">{fact.label}</dt>
                <dd data-count className="mt-3 font-display text-stat leading-none font-bold text-fog" data-numeric>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 flex items-start gap-2.5 border-t border-hair pt-5 text-base text-haze">
            <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" />
            {note}
          </p>
        </div>
      </Container>
    </section>
  );
}
