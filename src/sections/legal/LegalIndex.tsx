import { ArrowUpRight, FileWarning, Mail } from "lucide-react";
import Link from "next/link";

import { CardStage, CARD_LIGHT } from "@/components/animation/CardStage";
import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";

type LegalIndexProps = {
  id: string;
  title: string;
  draftNote: string;
  contactNote: string;
  readLabel: string;
  docs: readonly { title: string; summary: string; href: string }[];
};

/**
 * The legal hub as a document index on night: numbered rows (title and
 * summary) beside the draft notice. Rows rise in one after another; on hover
 * a light follows the pointer, the outlined number fills cyan, a rule draws
 * under the row and the arrow turns.
 */
export function LegalIndex({ id, title, draftNote, contactNote, readLabel, docs }: LegalIndexProps) {
  return (
    <section aria-labelledby={id} className="relative overflow-clip border-t border-hair bg-night py-section">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-7 lg:sticky lg:top-[calc(var(--spacing-header)+2.5rem)]">
              <CinemaHeading id={id} number="01" title={title} size="md" />
              <Reveal className="flex flex-col gap-4 rounded-3xl border border-gold/35 bg-gold/[0.06] p-6">
                <span className="grid size-11 place-items-center rounded-full border border-gold/40 text-gold">
                  <FileWarning aria-hidden className="size-5" />
                </span>
                <p className="text-base text-fog/90">{draftNote}</p>
              </Reveal>
              <p className="flex items-start gap-2.5 text-base text-haze">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" />
                {contactNote}
              </p>
            </div>
          </div>

          <CardStage as="ol" className="flex flex-col gap-3 lg:col-span-8">
            {docs.map((doc, i) => (
              <li key={doc.href} data-card>
                <Link
                  href={doc.href}
                  className="group/card relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 overflow-hidden rounded-3xl border border-hair bg-night-1 p-5 transition-colors duration-500 hover:border-cyan/45 sm:items-center sm:gap-x-7 sm:p-8"
                >
                  <span aria-hidden className={CARD_LIGHT} />
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan transition-transform duration-700 ease-brand group-hover/card:scale-x-100 rtl:origin-right" />
                  <span
                    dir="ltr"
                    className="relative font-display text-[2rem] leading-none font-bold stroke-text-hair-strong transition-colors duration-500 group-hover/card:text-cyan group-hover/card:[-webkit-text-stroke-color:transparent] sm:text-[2.75rem]"
                    data-numeric
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative min-w-0">
                    <span className="block font-display text-[clamp(1.375rem,1.2rem+0.6vw,1.875rem)] leading-tight font-semibold text-fog uppercase">{doc.title}</span>
                    <span className="mt-2 block max-w-2xl text-base text-haze">{doc.summary}</span>
                  </span>
                  <span className="relative flex items-center gap-3">
                    <span className="hidden font-display text-base tracking-[0.14em] text-dim uppercase transition-colors duration-300 group-hover/card:text-cyan md:inline">{readLabel}</span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-hair-strong text-fog transition-all duration-500 group-hover/card:rotate-45 group-hover/card:border-cyan group-hover/card:bg-cyan group-hover/card:text-night sm:size-12 rtl:-scale-x-100 rtl:group-hover/card:-rotate-45">
                      <ArrowUpRight aria-hidden className="size-5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </CardStage>
        </div>
      </Container>
    </section>
  );
}
