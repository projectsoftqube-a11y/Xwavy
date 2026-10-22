import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  /** One card can be dark to mark the paid or private tier. */
  dark?: boolean;
  /** Decorative photograph behind a dark card, shown dimmed. */
  background?: string;
};

type CardGridProps = {
  id: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  description?: string;
  cards: readonly GridCard[];
  columns?: 2 | 3 | 4;
  /**
   * `bento` (four columns on desktop): the first card is a dark featured tile
   * and the first and last cards span two columns, so six cards fill two rows.
   */
  layout?: "grid" | "bento";
  /** Show a running number on each card. */
  numbered?: boolean;
  tone?: "white" | "surface";
  /** Photograph beside the heading. */
  image?: { src: string; alt: string; position?: string };
  /** Optional content under the grid: a note, a button. */
  children?: ReactNode;
};

const columnClasses = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Heading plus cards: the workhorse section. Cards rise in one after another;
 * on hover a card lifts, an accent line draws across its top and its icon
 * fills. `bento` turns it into a composed tile layout.
 */
export function CardGrid({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  description,
  cards,
  columns = 3,
  layout = "grid",
  numbered = true,
  tone = "white",
  image,
  children,
}: CardGridProps) {
  const bento = layout === "bento";

  // With a photograph: heading and photo stacked on one side, the cards on the
  // other. The photo stretches to the height of the cards, so neither column
  // leaves empty space beside the other.
  if (image) {
    const odd = cards.length % 2 === 1;
    return (
      <Section tone={tone} className={tone === "white" ? "panel" : undefined} aria-labelledby={id}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} />
            <Reveal variant="image" className="relative aspect-16/10 overflow-hidden rounded-3xl bg-navy lg:aspect-auto lg:min-h-64 lg:flex-1">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className={cn("object-cover", image.position)} />
            </Reveal>
          </div>
          <Reveal stagger className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
            {cards.map((card, i) => (
              <GridCardItem key={card.title} card={card} index={i} tone={tone} numbered={numbered} className={odd && i === cards.length - 1 ? "sm:col-span-2" : undefined} />
            ))}
          </Reveal>
        </div>
        {children ? <Reveal className="mt-10">{children}</Reveal> : null}
      </Section>
    );
  }

  return (
    <Section tone={tone} className={tone === "white" ? "panel" : undefined} aria-labelledby={id}>
      <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} />

      <Reveal stagger className={cn("mt-10 grid grid-cols-1 gap-4 lg:gap-5", bento ? "sm:grid-cols-2 lg:grid-cols-4" : columnClasses[columns])}>
        {cards.map((card, i) => (
          <GridCardItem
            key={card.title}
            card={card}
            index={i}
            tone={tone}
            numbered={numbered}
            featured={bento && i === 0}
            className={cn(bento && (i === 0 || i === cards.length - 1) && "lg:col-span-2", bento && i === 0 && "sm:col-span-2 lg:min-h-64 lg:justify-between")}
          />
        ))}
      </Reveal>

      {children ? <Reveal className="mt-10">{children}</Reveal> : null}
    </Section>
  );
}

type GridCardItemProps = {
  card: GridCard;
  index: number;
  tone: "white" | "surface";
  numbered: boolean;
  /** The large dark tile that opens a bento layout. */
  featured?: boolean;
  className?: string;
};

/** One card: icon and number, kicker, title, body, then points, steps or a link. */
function GridCardItem({ card, index, tone, numbered, featured = false, className }: GridCardItemProps) {
  const { kicker, title, body, points, steps, Icon, link, dark: darkCard, background } = card;
  const dark = darkCard ?? featured;
  return (
    <article
      className={cn(
        "group/card relative flex flex-col gap-4 overflow-hidden rounded-2xl p-7 [&>:not([data-bg])]:relative transition-[transform,box-shadow] duration-500 ease-brand hover:-translate-y-1 hover:shadow-card",
        dark ? "surface-abyss" : tone === "white" ? "bg-surface" : "border border-line bg-white",
        className,
      )}
    >
      {background ? (
        <span data-bg aria-hidden className="absolute inset-0">
          <Image src={background} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-35 transition-transform duration-700 ease-brand group-hover/card:scale-105" />
        </span>
      ) : null}
      <span
        data-bg
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-brand group-hover/card:scale-x-100 rtl:origin-right",
          dark ? "bg-cyan" : "bg-cyan-ink",
        )}
      />

      {Icon || numbered ? (
        <div className="flex items-start justify-between gap-4">
          {Icon ? (
            <span
              className={cn(
                "grid place-items-center rounded-full transition-colors duration-300",
                featured ? "size-14" : "size-11",
                dark ? "bg-cyan text-abyss" : "bg-cyan/10 text-cyan-ink group-hover/card:bg-cyan-ink group-hover/card:text-white",
              )}
            >
              <Icon aria-hidden className={featured ? "size-6" : "size-5"} />
            </span>
          ) : (
            <span />
          )}
          {numbered ? (
            <span aria-hidden className={cn("font-mono text-xs", dark ? "text-mist" : "text-muted")} data-numeric>
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        {kicker ? <p className={cn("font-mono text-eyebrow uppercase", dark ? "text-gold" : "text-cyan-ink")}>{kicker}</p> : null}
        <h3 className={cn(featured ? "text-h3" : "text-h4", dark ? "text-white" : "text-ink")}>{title}</h3>
        {body ? <p className={cn("text-[0.9375rem]", dark ? "text-mist" : "text-body", featured && "max-w-md")}>{body}</p> : null}
      </div>

      {points?.length ? (
        <ul className={cn("mt-1 flex flex-col gap-2.5 border-t pt-4", dark ? "border-white/10" : "border-line")}>
          {points.map((point) => (
            <li key={point} className={cn("flex items-start gap-2.5 text-sm", dark ? "text-mist" : "text-body")}>
              <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", dark ? "text-gold" : "text-cyan-ink")} />
              {point}
            </li>
          ))}
        </ul>
      ) : null}

      {steps?.length ? (
        <ol className={cn("relative mt-1 flex flex-col gap-5 border-t pt-5", dark ? "border-white/10" : "border-line")}>
          {steps.map((step, s) => (
            <li key={step.title} className="relative flex gap-4">
              {s < steps.length - 1 ? (
                <span aria-hidden className={cn("absolute top-9 -bottom-5 inset-s-4 w-px", dark ? "bg-white/15" : "bg-line")} />
              ) : null}
              <span
                className={cn("relative grid size-8 shrink-0 place-items-center rounded-full font-mono text-sm", dark ? "bg-gold text-abyss" : "bg-cyan text-abyss")}
                data-numeric
              >
                {s + 1}
              </span>
              <div>
                <p className={cn("font-medium", dark ? "text-white" : "text-ink")}>{step.title}</p>
                <p className={cn("mt-1 text-sm", dark ? "text-mist" : "text-body")}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {link ? (
        <Link
          href={link.href}
          className={cn(
            "group/link mt-auto inline-flex w-fit items-center gap-2 pt-2 text-sm font-medium underline-offset-4 after:absolute after:inset-0 hover:underline",
            dark ? "text-white" : "text-ink",
          )}
        >
          {link.label}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover/card:translate-x-1 rtl:-scale-x-100 rtl:group-hover/card:-translate-x-1" />
        </Link>
      ) : null}
    </article>
  );
}
