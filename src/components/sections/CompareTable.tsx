import { Check, Lock, Minus } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type CompareTableProps = {
  id: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  description?: string;
  labels: { featureLabel: string; freeLabel: string; paidLabel: string; includedLabel: string; lockedLabel: string };
  rows: readonly { label: string; free: boolean }[];
  action?: { label: string; href: string };
  tone?: "white" | "surface";
  /** Decorative texture shown softly in the summary card. */
  texture?: string;
};

/**
 * The free-against-paid comparison: on the left (pinned on desktop) the
 * heading, a count of what each tier includes (derived from the rows) and
 * the call to action; on the right the table itself, with the Subscriber
 * column highlighted. Rows rise in one after another.
 */
export function CompareTable({ id, eyebrow, titleLead, titleAccent, description, labels, rows, action, tone = "surface", texture }: CompareTableProps) {
  const freeCount = rows.filter((row) => row.free).length;

  return (
    <Section tone={tone} className={tone === "white" ? "panel" : undefined} aria-labelledby={id}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-7 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <SectionHeading id={id} eyebrow={eyebrow} title={titleLead} accent={titleAccent} description={description} />

          <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-white p-5 sm:p-6">
            {texture ? <Image src={texture} alt="" aria-hidden fill sizes="30vw" className="object-cover opacity-25" /> : null}
            <p className="relative font-mono text-eyebrow text-muted uppercase">{labels.featureLabel}</p>
            {/* Tighter boxes and tracking: at 320px, and in the narrow lg column at 1024px, each box is ~110px wide. */}
            <dl className="relative mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-surface p-3">
                <dt className="font-mono text-[0.6875rem] leading-snug tracking-[0.1em] text-cyan-ink uppercase">{labels.freeLabel}</dt>
                <dd className="mt-1 font-heading text-stat text-ink" data-numeric>
                  {freeCount}
                </dd>
              </div>
              <div className="rounded-2xl bg-abyss p-3">
                <dt className="font-mono text-[0.6875rem] leading-snug tracking-[0.1em] text-gold uppercase">{labels.paidLabel}</dt>
                <dd className="mt-1 font-heading text-stat text-white" data-numeric>
                  {rows.length}
                </dd>
              </div>
            </dl>
          </Reveal>

          {action ? (
            <Button href={action.href} variant="accent" size="lg" arrow className="w-fit">
              {action.label}
            </Button>
          ) : null}
        </div>

        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            <table className="w-full border-collapse text-start">
              <thead className="bg-abyss text-white">
                {/* Phones: smaller tier headings and narrow tier columns, so the feature labels get the width. */}
                <tr>
                  <th scope="col" className="px-3 py-4 text-start font-mono text-[0.625rem] tracking-[0.06em] uppercase sm:px-6 sm:text-eyebrow sm:tracking-[0.14em]">
                    {labels.featureLabel}
                  </th>
                  <th scope="col" className="w-12 px-1 py-4 text-center font-mono text-[0.625rem] tracking-[0.06em] text-mist uppercase sm:w-32 sm:px-2 sm:text-eyebrow sm:tracking-[0.14em]">
                    {labels.freeLabel}
                  </th>
                  <th scope="col" className="w-20 bg-gold px-1 py-4 text-center font-mono text-[0.625rem] tracking-[0.06em] text-abyss uppercase sm:w-32 sm:px-2 sm:text-eyebrow sm:tracking-[0.14em]">
                    {labels.paidLabel}
                  </th>
                </tr>
              </thead>
              <Reveal as="tbody" stagger>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "transition-colors hover:bg-surface",
                      // A gold rule marks where the subscriber-only features begin.
                      i === 0 ? undefined : i === freeCount ? "border-t-2 border-gold/50" : "border-t border-line",
                    )}
                  >
                    <th scope="row" className="px-3 py-3.5 text-start text-sm font-normal text-body sm:px-6 sm:text-[0.9375rem]">
                      {row.label}
                    </th>
                    <td className="px-2 py-3.5 text-center">
                      {row.free ? (
                        <Check role="img" aria-label={labels.includedLabel} className="mx-auto size-4 text-cyan-ink" />
                      ) : (
                        <Minus role="img" aria-label={labels.lockedLabel} className="mx-auto size-4 text-field" />
                      )}
                    </td>
                    <td className="bg-gold/10 px-2 py-3.5 text-center">
                      {row.free ? (
                        <Check role="img" aria-label={labels.includedLabel} className="mx-auto size-4 text-gold-ink" />
                      ) : (
                        <Lock role="img" aria-label={labels.includedLabel} className="mx-auto size-4 text-gold-ink" />
                      )}
                    </td>
                  </tr>
                ))}
              </Reveal>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
}
