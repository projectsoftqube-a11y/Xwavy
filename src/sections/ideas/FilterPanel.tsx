import { Check, Lock, Search, SlidersHorizontal, Sparkles } from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type copy from "@/i18n/pages/ideas";

type FilterPanelProps = { t: (typeof copy)["en"]["filters"] };

/**
 * The directory's tools drawn as the toolbar they are: a search field, then
 * the free filters and the subscriber tools side by side, the latter locked.
 */
export function FilterPanel({ t }: FilterPanelProps) {
  const [free, paid] = t.cards;
  if (!free || !paid) return null;

  return (
    <Section tone="white" className="panel" aria-labelledby="id-filters">
      <SectionHeading id="id-filters" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} />

      <Reveal className="mt-10 rounded-[2rem] border border-line bg-surface p-3 sm:p-4">
        {/* Search field. */}
        <div className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-white px-4">
          <Search aria-hidden className="size-5 shrink-0 text-muted" />
          <span className="flex-1 truncate text-muted">{free.points[1]}</span>
          <span className="hidden rounded-full bg-surface px-3 py-1 text-xs text-body sm:inline">{free.points[2]}</span>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Free filters. */}
          <div className="rounded-2xl bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-cyan/10 text-cyan-ink">
                <SlidersHorizontal aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block font-mono text-eyebrow text-cyan-ink uppercase">{free.kicker}</span>
                <span className="block text-h4 text-ink">{free.title}</span>
              </span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {free.points.map((point) => (
                <li key={point} className="inline-flex items-center gap-1.5 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-2 text-sm text-ink">
                  <Check aria-hidden className="size-3.5 text-cyan-ink" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Subscriber tools. */}
          <div className="surface-abyss rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-gold text-abyss">
                <Sparkles aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block font-mono text-eyebrow text-gold uppercase">{paid.kicker}</span>
                <span className="block text-h4 text-white">{paid.title}</span>
              </span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {paid.points.map((point) => (
                <li key={point} className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold/50 px-3 py-2 text-sm text-mist">
                  <Lock aria-hidden className="size-3.5 text-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
