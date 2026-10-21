import { Eye, KeyRound, Lock } from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/ideas";
import { cn } from "@/lib/cn";

type IdeaAnatomyProps = { t: (typeof copy)["en"]["layers"] };

/** Skeleton widths, so the placeholder rows read like real content. */
const WIDTHS = ["w-4/5", "w-3/5", "w-2/3", "w-1/2"] as const;

/**
 * The anatomy of an idea: one listing drawn as a spec sheet, split into its
 * three layers (public summary, subscriber detail, sealed contact), with a
 * legend beside it. Placeholder bars stand in for content: no fake listing.
 */
export function IdeaAnatomy({ t }: IdeaAnatomyProps) {
  const [publicLayer, paidLayer, privateLayer] = t.cards;
  const legend = [
    { card: publicLayer, Icon: Eye, dot: "bg-cyan" },
    { card: paidLayer, Icon: Lock, dot: "bg-gold" },
    { card: privateLayer, Icon: KeyRound, dot: "bg-abyss" },
  ];

  return (
    <Section tone="surface" aria-labelledby="id-layers">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading id="id-layers" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} description={t.description} />
          <Reveal as="ol" stagger className="flex flex-col">
            {legend.map(({ card, Icon, dot }, i) =>
              card ? (
                <li key={card.title} className="flex items-center gap-4 border-t border-line py-4">
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-full text-white", dot, i < 2 && "text-abyss")}>
                    <Icon aria-hidden className="size-4" />
                  </span>
                  <span>
                    <span className="block font-mono text-eyebrow text-muted uppercase">{card.kicker}</span>
                    <span className="block text-h4 text-ink">{card.title}</span>
                  </span>
                </li>
              ) : null,
            )}
          </Reveal>
        </div>

        {/* The spec sheet. */}
        <Reveal stagger className="relative flex flex-col gap-3 rounded-[2rem] border border-line bg-white p-3 shadow-elevated sm:p-4 lg:col-span-7">
          {publicLayer ? (
            <div className="rounded-3xl p-5 sm:p-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3 py-1.5 font-mono text-eyebrow text-cyan-ink uppercase">
                <Eye aria-hidden className="size-3.5" />
                {publicLayer.kicker}
              </p>
              <span aria-hidden className="mt-5 block h-5 w-3/4 rounded-full bg-ink/80" />
              <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {publicLayer.points.map((point, i) => (
                  <li key={point}>
                    <p className="text-xs text-muted">{point}</p>
                    <span aria-hidden className={cn("mt-2 block h-2.5 rounded-full bg-line", WIDTHS[i % WIDTHS.length])} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {paidLayer ? (
            <div className="rounded-3xl border border-dashed border-gold/50 bg-gold/5 p-5 sm:p-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 font-mono text-eyebrow text-gold-ink uppercase">
                <Lock aria-hidden className="size-3.5" />
                {paidLayer.kicker}
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paidLayer.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 rounded-2xl bg-white p-3.5">
                    <Lock aria-hidden className="size-4 shrink-0 text-gold-ink" />
                    <span className="text-sm text-ink">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {privateLayer ? (
            <div className="surface-abyss rounded-3xl p-5 sm:p-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-mono text-eyebrow text-cyan uppercase">
                <KeyRound aria-hidden className="size-3.5" />
                {privateLayer.kicker}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {privateLayer.points.map((point, i) => (
                  <li key={point} className="flex items-center justify-between gap-4 text-sm">
                    <span className={i === 0 ? "text-white" : "text-mist"}>{point}</span>
                    {i === 0 ? (
                      <span aria-hidden className="font-mono tracking-[0.3em] text-mist">
                        ••••••
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Reveal>
      </div>
    </Section>
  );
}
