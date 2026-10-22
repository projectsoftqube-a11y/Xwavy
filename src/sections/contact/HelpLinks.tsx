import { ArrowUpRight, BookOpen, CreditCard, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/contact";

type HelpLinksProps = { t: (typeof copy)["en"]["links"]; hrefs: readonly string[]; photo: { src: string; alt: string } };

const ICONS = [BookOpen, CreditCard, Scale] as const;

/**
 * "Before you write": the heading and a photograph on one side, self-serve
 * answers as large link rows on the other. On hover a row fills dark from its
 * edge and its arrow turns.
 */
export function HelpLinks({ t, hrefs, photo }: HelpLinksProps) {
  return (
    <Section tone="surface" aria-labelledby="ct-links">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-8 lg:col-span-4">
          <SectionHeading id="ct-links" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} />
          <Reveal variant="image" className="relative aspect-16/10 overflow-hidden rounded-3xl bg-navy lg:aspect-auto lg:min-h-48 lg:flex-1">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
          </Reveal>
        </div>

        <Reveal as="ul" stagger className="flex flex-col gap-3 lg:col-span-8">
          {t.cards.map((card, i) => {
            const Icon = ICONS[i] ?? BookOpen;
            return (
              <li key={card.title}>
                <Link
                  href={hrefs[i] ?? "#"}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-3xl border border-line bg-white p-5 transition-colors duration-500 hover:border-abyss sm:gap-5 sm:p-7"
                >
                  <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-abyss transition-transform duration-500 ease-brand group-hover:scale-x-100 rtl:origin-right" />
                  <span className="relative grid size-10 shrink-0 place-items-center rounded-2xl bg-cyan/10 text-cyan-ink transition-colors duration-500 group-hover:bg-cyan group-hover:text-abyss sm:size-12">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block font-mono text-eyebrow text-muted uppercase transition-colors duration-500 group-hover:text-cyan">{card.link}</span>
                    <span className="mt-1 block text-h4 text-ink transition-colors duration-500 group-hover:text-white">{card.title}</span>
                    <span className="mt-1 block text-sm text-body transition-colors duration-500 group-hover:text-mist">{card.body}</span>
                  </span>
                  <span className="relative grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-500 sm:size-11 group-hover:rotate-45 group-hover:border-cyan group-hover:bg-cyan group-hover:text-abyss rtl:-scale-x-100 rtl:group-hover:-rotate-45">
                    <ArrowUpRight aria-hidden className="size-5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
