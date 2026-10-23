"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Plus } from "lucide-react";
import { useId, useRef, useState } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { gsap, refreshScrollTrigger, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, MEDIA } from "@/lib/motion";

export type FaqItem = { q: string; a: string };

type FaqSectionProps = {
  /** Id of the section heading. */
  id: string;
  eyebrow: string;
  /** Section number shown in the eyebrow, e.g. "06". */
  number?: string;
  titleLead: string;
  titleAccent?: string;
  items: readonly FaqItem[];
  /** "Still have a question?" strip under the questions. */
  help?: {
    title: string;
    body: string;
    cta: string;
    href: string;
    email: string;
  };
  /** Kept for compatibility: the section sits on night. */
  tone?: "surface" | "white" | "night";
  className?: string;
};

/**
 * Questions as two columns of cards (one on phones), so opening a card never
 * moves the other column. Each card shows its number, the question and a
 * round toggle; the open card's border lights and its answer slides open.
 * One card is open at a time. A wide strip under the cards offers the way to
 * ask anything else. Cards rise in one after another on scroll.
 */
export function FaqSection({ id, eyebrow, number, titleLead, titleAccent, items, help, className }: FaqSectionProps) {
  const root = useRef<HTMLElement>(null);
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half).map((item, i) => ({ item, i })), items.slice(half).map((item, i) => ({ item, i: i + half }))];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.from(q("[data-faq-card]"), {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: q("[data-faq-grid]")[0],
            start: "top 82%",
            once: true,
          },
        });
        gsap.from(q("[data-faq-help]"), {
          y: 50,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: q("[data-faq-help]")[0],
            start: "top 90%",
            once: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby={id} className={cn("relative overflow-hidden border-t border-hair bg-night py-section", className)}>
      <span aria-hidden className="glow-cyan pointer-events-none absolute -top-40 left-1/2 size-[50rem] -translate-x-1/2 opacity-40" />
      <Container className="relative">
        <CinemaHeading id={id} number={number} eyebrow={eyebrow} title={titleLead} accent={titleAccent} align="center" />

        <div data-faq-grid className="mt-14 grid grid-cols-1 items-start gap-3 lg:mt-20 lg:grid-cols-2 lg:gap-4">
          {columns.map((column, c) => (
            <ul key={c} className="flex flex-col gap-3 lg:gap-4">
              {column.map(({ item, i }) => {
                const isOpen = open === i;
                const buttonId = `${baseId}-q${i}`;
                const panelId = `${baseId}-a${i}`;
                return (
                  <li
                    key={item.q}
                    data-faq-card
                    className={cn(
                      "relative overflow-hidden rounded-2xl border transition-[border-color,background-color] duration-500 ease-brand",
                      isOpen ? "border-cyan/40 bg-night-2" : "border-hair bg-night-1 hover:border-hair-strong",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-0 top-0 h-px origin-left bg-linear-to-r from-transparent via-cyan to-transparent transition-transform duration-700 ease-brand rtl:origin-right",
                        isOpen ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="group flex w-full items-start gap-4 p-5 text-start sm:gap-5 sm:p-6"
                      >
                        <span dir="ltr" className={cn("w-7 shrink-0 pt-0.5 font-display text-base tracking-[0.12em] transition-colors duration-500", isOpen ? "text-cyan" : "text-dim")} data-numeric>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "flex-1 font-display text-[1.25rem] leading-snug font-medium transition-colors duration-500 sm:text-[1.375rem]",
                            isOpen ? "text-fog" : "text-fog/85 group-hover:text-fog",
                          )}
                        >
                          {item.q}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "grid size-10 shrink-0 place-items-center rounded-full border transition-[rotate,background-color,border-color,color] duration-500 ease-brand",
                            isOpen ? "rotate-45 border-cyan bg-cyan text-night" : "border-hair-strong text-fog group-hover:border-cyan/60 group-hover:text-cyan",
                          )}
                        >
                          <Plus className="size-4" />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false} onExitComplete={refreshScrollTrigger}>
                      {isOpen ? (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: DURATION.slow,
                            ease: EASE.brand,
                          }}
                          onAnimationComplete={refreshScrollTrigger}
                          className="overflow-hidden"
                        >
                          <p className="ps-16 pe-5 pb-6 text-base leading-relaxed text-haze sm:ps-[4.5rem] sm:pe-20">{item.a}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>

        {/* Anything else: a wide strip with the way to ask. */}
        {help ? (
          <div data-faq-help className="relative mt-12 overflow-hidden rounded-3xl border border-hair bg-night-1 p-6 sm:p-8 lg:mt-16 lg:p-10">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan/70 to-transparent" />
            <span aria-hidden className="glow-cyan pointer-events-none absolute -top-32 start-[-6rem] size-[26rem] opacity-60" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
              <span className="grid size-16 shrink-0 place-items-center rounded-full border border-cyan/40 text-cyan shadow-[0_0_30px_-6px_rgb(0_225_234/0.6)]">
                <Mail aria-hidden className="size-6" strokeWidth={1.6} />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] leading-none font-semibold text-fog uppercase">{help.title}</h3>
                <p className="mt-2 max-w-xl text-base text-haze">{help.body}</p>
              </div>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button href={help.href} variant="primary" arrow>
                  {help.cta}
                </Button>
                <a href={`mailto:${help.email}`} dir="ltr" className="text-base text-haze underline decoration-white/25 underline-offset-4 transition-colors hover:text-cyan hover:decoration-cyan">
                  {help.email}
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
