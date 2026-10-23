import { Check, EyeOff, Info } from "lucide-react";
import Image from "next/image";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { CARD_LIGHT, CardStage } from "@/components/animation/CardStage";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type SplitList = {
  title: string;
  items: readonly string[];
  tone?: "positive" | "hidden";
};

type SplitFeatureProps = {
  /** Section number shown before the eyebrow, e.g. "02". */
  number?: string;
  id: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  body?: string;
  image: { src: string; alt: string; position?: string };
  /** Photo on the reading end (default) or start. */
  imageSide?: "end" | "start";
  /** Numbered stages, e.g. the three moves of the double opt-in. */
  stages?: readonly { label: string; detail: string }[];
  lists?: readonly SplitList[];
  note?: string;
  action?: { label: string; href: string; variant?: "primary" | "accent" };
  /** Kept for compatibility: the section sits on night. */
  tone?: "white" | "surface";
};

/**
 * A tall photograph beside a heading, short copy and lists, on night. The
 * photograph opens with a soft wipe and drifts as it scrolls; a note floats
 * on it as a glass card. Lists are two cards: what is shown (cyan ticks) and
 * what stays hidden (gold, eye-off), each lit by the pointer on hover.
 */
export function SplitFeature({ id, number, eyebrow, titleLead, titleAccent, body, image, imageSide = "end", stages, lists, note, action }: SplitFeatureProps) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden border-t border-hair bg-night py-section">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={cn("flex flex-col gap-10 lg:col-span-7", imageSide === "start" && "lg:order-2")}>
            <CinemaHeading id={id} number={number} eyebrow={eyebrow} title={titleLead} accent={titleAccent} size="md" />
            {body ? <p className="-mt-4 max-w-2xl text-lead text-haze">{body}</p> : null}

            {stages?.length ? (
              <Reveal as="ol" stagger className="flex flex-col">
                {stages.map((stage, i) => (
                  <li key={stage.label} className="relative flex gap-5 border-t border-hair py-5 last:border-b">
                    <span dir="ltr" className="font-display text-[2.5rem] leading-none font-bold stroke-text-cyan" data-numeric>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.375rem] leading-tight font-semibold text-fog uppercase">{stage.label}</h3>
                      <p className="mt-1.5 text-base text-haze">{stage.detail}</p>
                    </div>
                  </li>
                ))}
              </Reveal>
            ) : null}

            {lists?.length ? (
              <CardStage className={cn("grid grid-cols-1 gap-4", lists.length > 1 && "md:grid-cols-2")}>
                {lists.map((list) => {
                  const hidden = list.tone === "hidden";
                  return (
                    <div
                      key={list.title}
                      data-card
                      className={cn(
                        "group/card relative overflow-hidden rounded-3xl border p-6 transition-[border-color] duration-500 sm:p-7",
                        hidden ? "border-gold/25 bg-night-2 hover:border-gold/55" : "border-hair bg-night-1 hover:border-cyan/45",
                      )}
                    >
                      <span aria-hidden className={CARD_LIGHT} />
                      <h3 className={cn("relative flex items-center gap-3 font-display text-base tracking-[0.16em] uppercase", hidden ? "text-gold" : "text-cyan")}>
                        <span className={cn("grid size-9 place-items-center rounded-full border", hidden ? "border-gold/40" : "border-cyan/40")}>
                          {hidden ? <EyeOff aria-hidden className="size-4" /> : <Check aria-hidden className="size-4" />}
                        </span>
                        {list.title}
                      </h3>
                      <ul className="relative mt-5 flex flex-col">
                        {list.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 border-t border-hair py-3 text-base text-fog/85">
                            <span aria-hidden className={cn("mt-2.5 size-1.5 shrink-0 rounded-full", hidden ? "bg-gold" : "bg-cyan")} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </CardStage>
            ) : null}

            {action ? (
              <Button href={action.href} variant={action.variant ?? "primary"} arrow className="w-full sm:w-fit">
                {action.label}
              </Button>
            ) : null}
          </div>

          {/* The photograph, with the note floating on it. */}
          <div className={cn("relative lg:col-span-5", imageSide === "start" && "lg:order-1")}>
            <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-hair sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className={cn("object-cover", image.position)} />
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-night/80 via-night/10 to-transparent" />
            </Reveal>
            {note ? (
              <Reveal className="relative -mt-20 px-4 sm:absolute sm:inset-x-6 sm:bottom-6 sm:mt-0 sm:px-0">
                <p className="flex items-start gap-3 rounded-2xl border border-white/15 bg-night/75 p-5 text-base text-fog backdrop-blur-xl">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cyan text-night">
                    <Info aria-hidden className="size-4" />
                  </span>
                  {note}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
