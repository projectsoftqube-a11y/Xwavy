import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { CARD_LIGHT, CardStage } from "@/components/animation/CardStage";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

export type GridCard = {
  kicker?: string;
  title: string;
  body?: string;
  points?: readonly string[];
  /** Numbered sub-steps, e.g. one side's path through the platform. */
  steps?: readonly { title: string; body: string }[];
  Icon?: LucideIcon;
  /** Optional link at the foot of the card. */
  link?: { label: string; href: string };
  /** One card can be gold-edged to mark the paid or private tier. */
  dark?: boolean;
  /** Photograph filling the card, under its copy. */
  background?: string;
};

type CardGridProps = {
  /** Section number shown before the eyebrow, e.g. "02". */
  number?: string;
  id: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  description?: string;
  cards: readonly GridCard[];
  columns?: 2 | 3 | 4;
  /**
   * `bento` (four columns on desktop): the first card is a large photographic
   * tile and the first and last cards span two columns, so six cards fill
   * two rows.
   */
  layout?: "grid" | "bento";
  /** Show a running number on each card. */
  numbered?: boolean;
  /** Kept for compatibility: every grid sits on night. */
  tone?: "white" | "surface";
  /** Photograph beside the heading. */
  image?: { src: string; alt: string; position?: string };
  /** Optional content under the grid: a note, a button. */
  children?: ReactNode;
};

const columnClasses = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 xl:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
} as const;

/**
 * Heading plus cards: the workhorse section, on night. Cards are numbered in
 * large outline, carry an icon in a ring, and on hover a cyan light follows
 * the pointer inside them while their top edge lights. They rise in one
 * after another as the grid scrolls in. `bento` composes them as tiles with a
 * photographic lead; `image` puts a tall photograph beside the heading.
 */
export function CardGrid({ id, number, eyebrow, titleLead, titleAccent, description, cards, columns = 3, layout = "grid", numbered = true, image, children }: CardGridProps) {
  const bento = layout === "bento";

  if (image) {
    const odd = cards.length % 2 === 1;
    return (
      <section aria-labelledby={id} className="relative overflow-hidden border-t border-hair bg-night py-section">
        <Container>
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-12 xl:gap-14">
            <div className="flex flex-col gap-10 xl:col-span-5">
              <CinemaHeading id={id} number={number} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} size="md" />
              <Reveal variant="image" className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-hair xl:aspect-auto xl:min-h-72 xl:flex-1">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 40vw, 100vw" className={cn("object-cover", image.position)} />
                <span aria-hidden className="absolute inset-0 bg-linear-to-t from-night/60 to-transparent" />
              </Reveal>
            </div>
            <CardStage className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2 xl:col-span-7 xl:gap-5">
              {cards.map((card, i) => (
                <GridCardItem key={card.title} card={card} index={i} numbered={numbered} className={odd && i === cards.length - 1 ? "sm:col-span-2" : undefined} />
              ))}
            </CardStage>
          </div>
          {children ? <Reveal className="mt-12">{children}</Reveal> : null}
        </Container>
      </section>
    );
  }

  return (
    <section aria-labelledby={id} className="relative overflow-hidden border-t border-hair bg-night py-section">
      <Container>
        <CinemaHeading id={id} number={number} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} />

        <CardStage className={cn("mt-14 grid grid-cols-1 gap-4 lg:mt-20 lg:gap-5", bento ? "md:grid-cols-2 xl:grid-cols-4" : columnClasses[columns])}>
          {cards.map((card, i) => (
            <GridCardItem
              key={card.title}
              card={card}
              index={i}
              numbered={numbered}
              featured={bento && i === 0}
              className={cn(bento && (i === 0 || i === cards.length - 1) && "xl:col-span-2", bento && i === 0 && "md:col-span-2 xl:row-span-2")}
            />
          ))}
        </CardStage>

        {children ? <Reveal className="mt-12">{children}</Reveal> : null}
      </Container>
    </section>
  );
}

type GridCardItemProps = {
  card: GridCard;
  index: number;
  numbered: boolean;
  /** The large photographic tile that opens a bento layout. */
  featured?: boolean;
  className?: string;
};

/** One card: icon and number, kicker, title, body, then points, steps or a link. */
function GridCardItem({ card, index, numbered, featured = false, className }: GridCardItemProps) {
  const { kicker, title, body, points, steps, Icon, link, dark, background } = card;
  const gold = Boolean(dark);
  return (
    <article
      data-card
      className={cn(
        "group/card relative isolate flex flex-col gap-6 overflow-hidden rounded-3xl border p-6 transition-[border-color,translate] duration-500 ease-brand hover:-translate-y-1 sm:p-8",
        gold ? "border-gold/30 bg-night-2 hover:border-gold/60" : "border-hair bg-night-1 hover:border-cyan/40",
        featured && "min-h-[26rem] justify-end xl:min-h-full",
        className,
      )}
    >
      {background ? (
        <div aria-hidden data-card-media className="absolute inset-0 -z-10 overflow-hidden">
          <Image src={background} alt="" fill sizes="(min-width: 1280px) 50vw, 100vw" className="object-cover transition-transform duration-1000 ease-brand group-hover/card:scale-110" />
          <span className="absolute inset-0 bg-linear-to-t from-night via-night/70 to-night/10" />
        </div>
      ) : null}
      <span aria-hidden className={CARD_LIGHT} />
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-transparent to-transparent transition-transform duration-700 ease-brand group-hover/card:scale-x-100 rtl:origin-right",
          gold ? "via-gold" : "via-cyan",
        )}
      />

      {Icon || numbered ? (
        <div className={cn("relative flex items-start justify-between gap-4", featured && "mb-auto")}>
          {Icon ? (
            <span
              className={cn(
                "grid shrink-0 place-items-center rounded-full border transition-colors duration-500",
                featured ? "size-16" : "size-14",
                gold
                  ? "border-gold/40 text-gold shadow-[0_0_30px_-8px_rgb(255_181_71/0.6)] group-hover/card:border-gold group-hover/card:bg-gold group-hover/card:text-night"
                  : "border-cyan/40 text-cyan shadow-[0_0_30px_-8px_rgb(0_225_234/0.6)] group-hover/card:border-cyan group-hover/card:bg-cyan group-hover/card:text-night",
              )}
            >
              <Icon aria-hidden className={featured ? "size-7" : "size-6"} strokeWidth={1.6} />
            </span>
          ) : (
            <span />
          )}
          {numbered ? (
            <span
              aria-hidden
              dir="ltr"
              className={cn(
                "font-display text-[3.5rem] leading-none font-bold transition-[-webkit-text-stroke-color,opacity] duration-500",
                gold ? "stroke-text-gold opacity-50 group-hover/card:opacity-100" : "stroke-text-hair-strong group-hover/card:[-webkit-text-stroke-color:rgb(0_225_234/0.7)]",
              )}
              data-numeric
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="relative flex flex-col gap-3">
        {kicker ? <p className={cn("font-display text-base tracking-[0.16em] uppercase", gold ? "text-gold" : "text-cyan")}>{kicker}</p> : null}
        <h3 className={cn("font-display leading-[1.05] font-semibold text-fog uppercase", featured ? "text-[clamp(2rem,1.5rem+2vw,3rem)]" : "text-[clamp(1.5rem,1.3rem+0.8vw,1.875rem)]")}>{title}</h3>
        {body ? <p className={cn("text-base leading-relaxed text-haze", featured && "max-w-lg text-fog/80")}>{body}</p> : null}
      </div>

      {points?.length ? (
        <ul className="relative flex flex-col border-t border-hair">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 border-b border-hair py-3 text-base text-fog/85 last:border-b-0">
              <Check aria-hidden className={cn("mt-1 size-4 shrink-0", gold ? "text-gold" : "text-cyan")} />
              {point}
            </li>
          ))}
        </ul>
      ) : null}

      {steps?.length ? (
        <ol className="relative flex flex-col gap-5 border-t border-hair pt-5">
          {steps.map((step, s) => (
            <li key={step.title} className="relative flex gap-4">
              {s < steps.length - 1 ? <span aria-hidden className="absolute top-10 -bottom-5 inset-s-[1.1875rem] w-px bg-hair-strong" /> : null}
              <span
                className={cn("relative grid size-10 shrink-0 place-items-center rounded-full border font-display text-base", gold ? "border-gold/50 text-gold" : "border-cyan/50 text-cyan")}
                data-numeric
              >
                {s + 1}
              </span>
              <div>
                <p className="font-display text-[1.25rem] leading-tight font-medium text-fog uppercase">{step.title}</p>
                <p className="mt-1 text-base text-haze">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {link ? (
        <Link
          href={link.href}
          className={cn("relative mt-auto inline-flex w-fit items-center gap-2 pt-2 font-display text-base tracking-[0.12em] uppercase after:absolute after:inset-0", gold ? "text-gold" : "text-cyan")}
        >
          {link.label}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover/card:translate-x-1.5 rtl:-scale-x-100 rtl:group-hover/card:-translate-x-1.5" />
        </Link>
      ) : null}
    </article>
  );
}
