import { Check, EyeOff, Info } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type SplitList = { title: string; items: readonly string[]; tone?: "positive" | "hidden" };

type SplitFeatureProps = {
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
  tone?: "white" | "surface";
};

/**
 * A photograph beside a heading, short copy and simple lists. On desktop the
 * photo matches the copy's height, so the section is no taller than its text.
 */
export function SplitFeature({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  body,
  image,
  imageSide = "end",
  stages,
  lists,
  note,
  action,
  tone = "white",
}: SplitFeatureProps) {
  return (
    <Section tone={tone} className={tone === "white" ? "panel" : undefined} aria-labelledby={id}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div className={cn("flex flex-col justify-center gap-7", imageSide === "start" && "lg:order-2")}>
          <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={body} />

          {stages?.length ? (
            <Reveal as="ol" stagger className="flex flex-col gap-5">
              {stages.map((stage, i) => (
                <li key={stage.label} className="relative flex gap-4">
                  {i < stages.length - 1 ? <span aria-hidden className="absolute top-10 -bottom-4 inset-s-[1.125rem] w-px bg-line" /> : null}
                  <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-abyss font-mono text-sm text-white" data-numeric>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-h4 text-ink">{stage.label}</h3>
                    <p className="mt-1 text-[0.9375rem] text-body">{stage.detail}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          ) : null}

          {lists?.length ? (
            <Reveal stagger className={cn("grid grid-cols-1 gap-4", lists.length > 1 && "sm:grid-cols-2")}>
              {lists.map((list) => {
                const hidden = list.tone === "hidden";
                return (
                  <div
                    key={list.title}
                    className={cn(
                      "rounded-2xl p-6 transition-[transform,box-shadow] duration-500 ease-brand hover:-translate-y-1 hover:shadow-card",
                      hidden ? "surface-abyss" : tone === "white" ? "bg-surface" : "border border-line bg-white",
                    )}
                  >
                    <h3 className={cn("font-mono text-eyebrow uppercase", hidden ? "text-gold" : "text-cyan-ink")}>{list.title}</h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {list.items.map((item) => (
                        <li key={item} className={cn("flex items-start gap-2.5 text-[0.9375rem]", hidden ? "text-mist" : "text-body")}>
                          {hidden ? (
                            <EyeOff aria-hidden className="mt-1 size-4 shrink-0 text-gold" />
                          ) : (
                            <Check aria-hidden className="mt-1 size-4 shrink-0 text-cyan-ink" />
                          )}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </Reveal>
          ) : null}

          {action ? (
            <Button href={action.href} variant={action.variant ?? "primary"} arrow className="w-fit">
              {action.label}
            </Button>
          ) : null}
        </div>

        {/* Photo with an offset frame behind it and the note floating on it. */}
        <div className={cn("relative pb-6 ps-6 lg:min-h-[26rem]", imageSide === "start" && "lg:order-1")}>
          <span aria-hidden className={cn("absolute top-6 bottom-0 inset-s-0 inset-e-6 rounded-3xl border", tone === "white" ? "border-line" : "border-field/40")} />
          <Reveal variant="image" className="relative aspect-4/3 overflow-hidden rounded-3xl bg-navy lg:aspect-auto lg:h-full">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className={cn("object-cover", image.position)} />
          </Reveal>
          {note ? (
            <Reveal className="relative -mt-14 ms-4 me-4 sm:absolute sm:inset-e-4 sm:bottom-10 sm:m-0 sm:max-w-sm">
              <p className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm text-ink shadow-elevated">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cyan text-abyss">
                  <Info aria-hidden className="size-4" />
                </span>
                {note}
              </p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
