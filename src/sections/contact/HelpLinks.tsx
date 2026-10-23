import { ArrowUpRight, BookOpen, CreditCard, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CardStage, CARD_LIGHT } from "@/components/animation/CardStage";
import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";
import type copy from "@/i18n/pages/contact";

type HelpLinksProps = { t: (typeof copy)["en"]["links"]; hrefs: readonly string[]; photo: { src: string; alt: string } };

const ICONS = [BookOpen, CreditCard, Scale] as const;

/**
 * "Before you write", on night: the heading and a photograph on one side,
 * self-serve answers as large link rows on the other. Rows rise in one after
 * another; on hover a light follows the pointer, the outlined number fills,
 * and the arrow turns.
 */
export function HelpLinks({ t, hrefs, photo }: HelpLinksProps) {
  return (
    <section aria-labelledby="ct-links" className="relative overflow-hidden border-t border-hair bg-night py-section">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-9 lg:col-span-5">
            <CinemaHeading id="ct-links" number="01" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} size="md" />
            <Reveal variant="image" className="relative aspect-16/10 overflow-hidden rounded-3xl border border-hair bg-night-1 lg:aspect-auto lg:min-h-56 lg:flex-1">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-night/60 to-transparent" />
            </Reveal>
          </div>

          <CardStage as="ul" className="flex flex-col gap-4 lg:col-span-7 lg:justify-center">
            {t.cards.map((card, i) => {
              const Icon = ICONS[i] ?? BookOpen;
              return (
                <li key={card.title} data-card>
                  <Link
                    href={hrefs[i] ?? "#"}
                    className="group/card relative flex items-center gap-4 overflow-hidden rounded-3xl border border-hair bg-night-1 p-5 transition-colors duration-500 hover:border-cyan/50 sm:gap-6 sm:p-8"
                  >
                    <span aria-hidden className={CARD_LIGHT} />
                    <span
                      aria-hidden
                      dir="ltr"
                      className="relative hidden font-display text-[2.5rem] leading-none font-bold stroke-text-hair-strong transition-colors duration-500 group-hover/card:text-cyan group-hover/card:[-webkit-text-stroke-color:transparent] sm:block"
                      data-numeric
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative hidden size-12 shrink-0 place-items-center rounded-full border border-cyan/40 text-cyan transition-colors duration-500 group-hover/card:bg-cyan group-hover/card:text-night min-[400px]:grid">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block font-display text-base tracking-[0.14em] text-dim uppercase transition-colors duration-500 group-hover/card:text-cyan">{card.link}</span>
                      <span className="mt-1 block font-display text-[1.5rem] leading-tight font-semibold text-fog uppercase">{card.title}</span>
                      <span className="mt-1.5 block text-base text-haze">{card.body}</span>
                    </span>
                    <span className="relative grid size-11 shrink-0 place-items-center rounded-full border border-hair-strong text-fog transition-all duration-500 group-hover/card:rotate-45 group-hover/card:border-cyan group-hover/card:bg-cyan group-hover/card:text-night rtl:-scale-x-100 rtl:group-hover/card:-rotate-45">
                      <ArrowUpRight aria-hidden className="size-5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </CardStage>
        </div>
      </Container>
    </section>
  );
}
