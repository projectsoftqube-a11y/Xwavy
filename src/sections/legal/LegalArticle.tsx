import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/cn";

type LegalArticleProps = {
  sections: readonly { title: string; body: readonly string[]; points?: readonly string[] }[];
  draftNote: string;
  tocLabel: string;
  otherLabel: string;
  others: readonly { title: string; href: string }[];
  contactNote: string;
};

/**
 * A policy as readable sections: a sticky "on this page" list beside the text
 * on desktop, numbered headings, and links to the other policies at the end.
 */
export function LegalArticle({ sections, draftNote, tocLabel, otherLabel, others, contactNote }: LegalArticleProps) {
  return (
    <Section tone="surface">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <nav aria-label={tocLabel} className="lg:col-span-4">
          <div className="flex flex-col gap-4 lg:sticky lg:top-[calc(var(--spacing-header)+2.5rem)]">
            <p className="font-mono text-eyebrow text-muted uppercase">{tocLabel}</p>
            <ol className="flex flex-col gap-1 border-s border-line">
              {sections.map((section, i) => (
                <li key={section.title}>
                  <a
                    href={`#section-${i + 1}`}
                    className="-ms-px flex gap-3 border-s-2 border-transparent py-1.5 ps-4 text-sm text-body transition-colors hover:border-cyan-ink hover:text-ink"
                  >
                    <span className="font-mono text-muted" data-numeric>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <p className="rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm text-ink">{draftNote}</p>

          {sections.map((section, i) => (
            <Reveal key={section.title}>
              <article id={`section-${i + 1}`} className="scroll-mt-28 rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h2 className="flex gap-3 text-h3 text-ink">
                  <span className="font-mono text-cyan-ink" data-numeric>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-body">
                    {paragraph}
                  </p>
                ))}
                {section.points?.length ? (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-body">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-cyan-ink" />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </Reveal>
          ))}

          <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 sm:p-8">
            <p className="font-mono text-eyebrow text-muted uppercase">{otherLabel}</p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {others.map((doc) => (
                <li key={doc.href}>
                  <Link href={doc.href} className="group flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-ink hover:border-cyan-ink">
                    {doc.title}
                    <ArrowRight aria-hidden className={cn("size-4 shrink-0 text-cyan-ink transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1")} />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">{contactNote}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
