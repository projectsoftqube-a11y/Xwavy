import { Check, Lock, Minus } from "lucide-react";
import Image from "next/image";

import { CinemaHeading } from "@/components/animation/CinemaHeading";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type CompareTableProps = {
  /** Section number shown before the eyebrow, e.g. "02". */
  number?: string;
  id: string;
  eyebrow?: string;
  titleLead: string;
  titleAccent?: string;
  description?: string;
  labels: {
    featureLabel: string;
    freeLabel: string;
    paidLabel: string;
    includedLabel: string;
    lockedLabel: string;
  };
  rows: readonly { label: string; free: boolean }[];
  action?: { label: string; href: string };
  /** Kept for compatibility: the section sits on night. */
  tone?: "white" | "surface";
  /** Decorative texture shown softly behind the counts. */
  texture?: string;
};

/**
 * Free against paid, on night. On the start side (pinned on desktop) the
 * heading, the count each tier includes (derived from the rows) and the call
 * to action; on the end side the table, its Subscriber column a gold-tinted
 * band, a gold rule where the paid-only rows begin. Rows rise in one after
 * another.
 */
export function CompareTable({ id, number, eyebrow, titleLead, titleAccent, description, labels, rows, action, texture }: CompareTableProps) {
  const freeCount = rows.filter((row) => row.free).length;

  return (
    <section aria-labelledby={id} className="relative overflow-clip border-t border-hair bg-night py-section">
      <span aria-hidden className="glow-gold pointer-events-none absolute -bottom-48 end-[-12rem] size-[46rem] opacity-40" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-12 xl:gap-14">
          <div className="flex flex-col gap-9 xl:sticky xl:top-32 xl:col-span-4 xl:self-start">
            <CinemaHeading id={id} number={number} eyebrow={eyebrow} title={titleLead} accent={titleAccent} size="md" />
            {description ? <p className="-mt-3 text-lead text-haze">{description}</p> : null}

            <Reveal className="relative overflow-hidden rounded-3xl border border-hair bg-night-1 p-6">
              {texture ? <Image src={texture} alt="" aria-hidden fill sizes="30vw" className="object-cover opacity-20" /> : null}
              <p className="relative font-display text-base tracking-[0.16em] text-haze uppercase">{labels.featureLabel}</p>
              <dl className="relative mt-5 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
                <div className="rounded-2xl border border-cyan/25 bg-night/70 p-4">
                  <dt className="font-display text-base tracking-[0.12em] text-cyan uppercase">{labels.freeLabel}</dt>
                  <dd className="mt-3 font-display text-[3.5rem] leading-none font-bold text-fog" data-numeric>
                    {freeCount}
                  </dd>
                </div>
                <div className="rounded-2xl border border-gold/35 bg-night/70 p-4">
                  <dt className="font-display text-base tracking-[0.12em] text-gold uppercase">{labels.paidLabel}</dt>
                  <dd className="mt-3 font-display text-[3.5rem] leading-none font-bold text-gold" data-numeric>
                    {rows.length}
                  </dd>
                </div>
              </dl>
            </Reveal>

            {action ? (
              <Button href={action.href} variant="accent" size="lg" arrow className="w-full sm:w-fit">
                {action.label}
              </Button>
            ) : null}
          </div>

          <div className="xl:col-span-8">
            <div className="relative overflow-hidden rounded-3xl border border-hair bg-night-1">
              {/* The Subscriber column as one gold band behind the table. */}
              <span aria-hidden className="absolute inset-y-0 end-0 w-[5.5rem] bg-gold/[0.08] sm:w-36" />
              <table className="relative w-full border-collapse text-start">
                <thead>
                  <tr className="border-b border-hair-strong">
                    <th scope="col" className="px-4 py-5 text-start font-display text-base tracking-[0.12em] text-haze uppercase sm:px-7">
                      {labels.featureLabel}
                    </th>
                    <th scope="col" className="w-16 px-1 py-5 text-center font-display text-base tracking-[0.08em] text-cyan uppercase sm:w-36 sm:tracking-[0.12em]">
                      {labels.freeLabel}
                    </th>
                    <th scope="col" className="w-[5.5rem] px-1 py-5 text-center font-display text-base tracking-[0.04em] text-gold uppercase sm:w-36 sm:tracking-[0.12em]">
                      {labels.paidLabel}
                    </th>
                  </tr>
                </thead>
                <Reveal as="tbody" stagger>
                  {rows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={cn("transition-colors duration-300 hover:bg-white/[0.03]", i === 0 ? undefined : i === freeCount ? "border-t-2 border-gold/50" : "border-t border-hair")}
                    >
                      <th scope="row" className="px-4 py-4 text-start text-base font-normal text-fog/85 sm:px-7">
                        {row.label}
                      </th>
                      <td className="px-1 py-4 text-center">
                        {row.free ? (
                          <Check role="img" aria-label={labels.includedLabel} className="mx-auto size-5 text-cyan" />
                        ) : (
                          <Minus role="img" aria-label={labels.lockedLabel} className="mx-auto size-5 text-white/20" />
                        )}
                      </td>
                      <td className="px-1 py-4 text-center">
                        {row.free ? (
                          <Check role="img" aria-label={labels.includedLabel} className="mx-auto size-5 text-gold" />
                        ) : (
                          <Lock role="img" aria-label={labels.includedLabel} className="mx-auto size-5 text-gold" />
                        )}
                      </td>
                    </tr>
                  ))}
                </Reveal>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
