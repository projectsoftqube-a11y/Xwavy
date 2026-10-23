"use client";

import { ArrowRight, Check, FileWarning } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type LegalArticleProps = {
  sections: readonly { title: string; body: readonly string[]; points?: readonly string[] }[];
  draftNote: string;
  tocLabel: string;
  otherLabel: string;
  others: readonly { title: string; href: string }[];
  contactNote: string;
};

/**
 * A policy as readable sections on night: a sticky "on this page" list
 * beside the text on desktop, which marks the section being read and fills a
 * cyan line with reading progress; numbered headings; and links to the other
 * policies at the end.
 */
export function LegalArticle({ sections, draftNote, tocLabel, otherLabel, others, contactNote }: LegalArticleProps) {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  // The section nearest the top of the screen is the one being read.
  useEffect(() => {
    const articles = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-legal-section]") ?? []);
    if (!articles.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setCurrent(articles.indexOf(visible.target as HTMLElement));
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    articles.forEach((article) => observer.observe(article));
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.fromTo(q("[data-read-progress]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: q("[data-legal-body]")[0], start: "top 30%", end: "bottom 70%", scrub: true } });
      });
      mm.add(MEDIA.reducedMotion, () => {
        gsap.set(q("[data-read-progress]"), { scaleY: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative border-t border-hair bg-night py-section">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <nav aria-label={tocLabel} className="lg:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--spacing-header)+2.5rem)]">
              <p className="font-display text-base tracking-[0.16em] text-dim uppercase">{tocLabel}</p>
              <div className="relative">
                <span aria-hidden className="absolute inset-y-0 start-0 w-px bg-hair-strong" />
                <span aria-hidden data-read-progress className="absolute inset-y-0 start-0 w-px origin-top scale-y-0 bg-cyan shadow-[0_0_10px_rgb(0_225_234/0.8)]" />
                <ol className="flex flex-col gap-0.5">
                  {sections.map((section, i) => {
                    const active = i === current;
                    return (
                      <li key={section.title}>
                        <a
                          href={`#section-${i + 1}`}
                          aria-current={active ? "location" : undefined}
                          className={cn("flex gap-3 py-2 ps-5 text-base transition-colors duration-300", active ? "text-fog" : "text-haze hover:text-fog")}
                        >
                          <span className={cn("font-display transition-colors duration-300", active ? "text-cyan" : "text-dim")} data-numeric>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {section.title}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </nav>

          <div data-legal-body className="flex min-w-0 flex-col gap-5 lg:col-span-8">
            <p className="flex items-start gap-3 rounded-2xl border border-gold/35 bg-gold/[0.06] p-5 text-base text-fog/90">
              <FileWarning aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
              {draftNote}
            </p>

            {sections.map((section, i) => (
              <Reveal key={section.title}>
                <article id={`section-${i + 1}`} data-legal-section className="relative scroll-mt-28 overflow-hidden rounded-3xl border border-hair bg-night-1 p-6 sm:p-9">
                  <span
                    aria-hidden
                    dir="ltr"
                    className="pointer-events-none absolute end-6 top-5 font-display text-[3.5rem] leading-none font-bold stroke-text-hair select-none sm:end-8 sm:top-7"
                    data-numeric
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="relative flex items-baseline gap-3 pe-16 font-display text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] leading-tight font-semibold text-fog uppercase">
                    <span className="text-cyan" data-numeric>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="relative mt-4 text-base leading-relaxed text-haze">
                      {paragraph}
                    </p>
                  ))}
                  {section.points?.length ? (
                    <ul className="relative mt-5 flex flex-col gap-3">
                      {section.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-base text-fog/90">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                            <Check aria-hidden strokeWidth={3} className="size-3" />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </Reveal>
            ))}

            <div className="flex flex-col gap-5 rounded-3xl border border-hair bg-night-1 p-6 sm:p-9">
              <p className="font-display text-base tracking-[0.16em] text-dim uppercase">{otherLabel}</p>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {others.map((doc) => (
                  <li key={doc.href}>
                    <Link
                      href={doc.href}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-hair-strong px-4 py-3.5 text-base text-fog transition-colors duration-300 hover:border-cyan hover:bg-cyan/[0.06]"
                    >
                      {doc.title}
                      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-hair-strong text-cyan transition-colors duration-300 group-hover:border-cyan group-hover:bg-cyan group-hover:text-night">
                        <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-base text-haze">{contactNote}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
