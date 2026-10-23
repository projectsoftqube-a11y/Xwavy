"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type FooterFinaleProps = {
  /** The closing line, its last words in the accent colour. */
  statement: { lead: string; accent: string };
  /** The two ways in (buttons), rendered by the server footer. */
  actions: ReactNode;
  /** Name of the "where to next" navigation. */
  label: string;
  /** Localised links to the main pages. */
  items: readonly { href: string; title: string; line: string }[];
};

/**
 * The close of every page, before the footer proper: one panel over the
 * city at night. The promise, lit word by word
 * as it scrolls in, both ways in beside it, and the main pages as glass
 * cards along the foot. The photograph settles from a zoom as the panel
 * arrives; the cards rise in one after another. Hovering a card lights its
 * edge and turns its arrow; the page you are on is marked.
 */
export function FooterFinale({ statement, actions, label, items }: FooterFinaleProps) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.fromTo(q("[data-finale-img]"), { scale: 1.25 }, { scale: 1.02, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } });
        gsap.from(q("[data-finale-card]"), { y: 50, autoAlpha: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: q("[data-finale-cards]")[0], start: "top 92%", once: true } });
        gsap.from(q("[data-finale-actions]"), { y: 30, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%", once: true } });
        const split = SplitText.create(q("[data-finale-statement]"), {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.15 },
              { opacity: 1, ease: "none", stagger: 0.15, scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 35%", scrub: true } },
            ),
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative isolate overflow-hidden rounded-(--panel-radius) border border-hair">
      {/* The photograph, dimmed for the type. Decorative. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image data-finale-img src="/images/site/pr-band-bg.webp" alt="" fill sizes="(min-width: 1600px) 90vw, 100vw" className="object-cover object-[50%_45%]" />
        <span className="absolute inset-0 bg-night/25" />
        <span className="absolute inset-0 bg-linear-to-t from-night/90 via-night/15 to-night/35" />
        <span className="grain absolute inset-0 opacity-[0.08] mix-blend-overlay" />
        <span className="glow-cyan absolute -top-48 start-[-10%] size-[44rem] opacity-40" />
      </div>

      <div className="px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <p data-finale-statement className="max-w-[14ch] text-display text-fog lg:col-span-7">
            {statement.lead} <span className="accent text-cyan">{statement.accent}</span>
          </p>
          <div data-finale-actions className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end xl:flex-row xl:justify-end">
            {actions}
          </div>
        </div>

        <nav aria-label={label} className="mt-16 lg:mt-24">
          <p className="flex items-center gap-3 font-display text-base tracking-[0.2em] text-cyan uppercase">
            <span aria-hidden className="h-px w-10 bg-cyan" />
            {label}
          </p>
          <ol data-finale-cards className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item, i) => {
              const current = pathname === item.href;
              return (
                <li key={item.href} data-finale-card>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border bg-night/45 p-5 backdrop-blur-md transition-[border-color,background-color,translate] duration-500 ease-brand hover:-translate-y-1 hover:border-cyan/60 hover:bg-night/65 sm:p-6",
                      current ? "border-cyan/60" : "border-white/12",
                    )}
                  >
                    <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-cyan transition-transform duration-700 ease-brand group-hover:scale-x-100 rtl:origin-right" />
                    <span className="flex items-center justify-between gap-3">
                      <span dir="ltr" className={cn("font-display text-base tracking-[0.2em]", current ? "text-cyan" : "text-haze group-hover:text-cyan")} data-numeric>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="grid size-9 place-items-center rounded-full border border-white/15 text-fog transition-[background-color,border-color,color,rotate] duration-500 group-hover:rotate-45 group-hover:border-cyan group-hover:bg-cyan group-hover:text-night rtl:-scale-x-100 rtl:group-hover:-rotate-45">
                        <ArrowUpRight aria-hidden className="size-4" />
                      </span>
                    </span>
                    <span className="mt-4 font-display text-[1.75rem] leading-none font-semibold text-fog uppercase">{item.title}</span>
                    <span className="text-base text-haze">{item.line}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
