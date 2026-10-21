import { ArrowUpRight, FileWarning, Mail } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LegalIndexProps = {
  id: string;
  title: string;
  draftNote: string;
  contactNote: string;
  readLabel: string;
  docs: readonly { title: string; summary: string; href: string }[];
};

/**
 * The legal hub as a document index: numbered full-width rows (title and
 * summary) beside the draft notice. On hover a rule draws under the row, the
 * title shifts and the arrow fills.
 */
export function LegalIndex({ id, title, draftNote, contactNote, readLabel, docs }: LegalIndexProps) {
  return (
    <Section tone="surface" aria-labelledby={id}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--spacing-header)+2.5rem)]">
            <SectionHeading id={id} title={title} />
            <Reveal className="flex flex-col gap-3 rounded-3xl border border-gold/40 bg-gold/10 p-5 sm:p-6">
              <span className="grid size-10 place-items-center rounded-xl bg-gold/20 text-gold-ink">
                <FileWarning aria-hidden className="size-5" />
              </span>
              <p className="text-sm text-ink">{draftNote}</p>
            </Reveal>
            <p className="flex items-start gap-2.5 text-sm text-muted">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan-ink" />
              {contactNote}
            </p>
          </div>
        </div>

        <Reveal as="ol" stagger className="border-t border-line lg:col-span-8">
          {docs.map((doc, i) => (
            <li key={doc.href}>
              <Link href={doc.href} className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 border-b border-line py-6 sm:items-center sm:gap-x-8 sm:py-8">
                <span aria-hidden className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-abyss transition-transform duration-500 ease-brand group-hover:scale-x-100 rtl:origin-right" />
                <span className="pt-1.5 font-mono text-sm text-muted transition-colors duration-300 group-hover:text-cyan-ink sm:pt-0" data-numeric>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block text-h3 text-ink transition-transform duration-500 ease-brand group-hover:translate-x-2 rtl:group-hover:-translate-x-2">{doc.title}</span>
                  <span className="mt-2 block max-w-2xl text-body">{doc.summary}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="hidden font-mono text-eyebrow text-muted uppercase transition-colors duration-300 group-hover:text-ink sm:inline">{readLabel}</span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-abyss group-hover:bg-abyss group-hover:text-white sm:size-12 rtl:-scale-x-100 rtl:group-hover:-rotate-45">
                    <ArrowUpRight aria-hidden className="size-5" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
