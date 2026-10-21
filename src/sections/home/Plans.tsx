import { Check, Lock, Minus } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";

type PlansProps = {
  pricing: Dictionary["home"]["pricing"];
  access: Dictionary["home"]["access"];
  /** Alt text for the founder photo in the innovator card. */
  photoAlt: string;
  pricingHref: string;
};

/**
 * Pricing and access in one section: innovators are free (with the facts that
 * make that true); investors browse free and subscribe for the substance,
 * shown as a small Free / Subscriber table. No plan prices: Wavy Solutions has
 * not fixed them yet.
 */
export function Plans({ pricing, access, photoAlt, pricingHref }: PlansProps) {
  const rows = [
    ...access.free.items.map((label) => ({ label, free: true })),
    ...access.paid.items.map((label) => ({ label, free: false })),
  ];

  return (
    <Section tone="surface" aria-labelledby="plans-title">
      <SectionHeading id="plans-title" eyebrow={pricing.eyebrow} title={pricing.headingLead} accent={pricing.headingAccent} description={access.body} />

      <Reveal stagger className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[2fr_3fr]">
        <article className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-5 sm:p-8">
          <p className="flex items-end gap-3">
            <span className="font-heading text-[clamp(3.5rem,7vw,5rem)] leading-[0.85] font-bold tracking-[-0.05em] text-cyan-ink" data-numeric>
              0
            </span>
            <span className="mb-1.5 max-w-[9rem] font-mono text-eyebrow leading-snug text-muted uppercase">{pricing.zeroLabel}</span>
          </p>
          <div>
            <h3 className="text-h3 text-ink">{pricing.title}</h3>
            <p className="mt-2 text-body">{pricing.body}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {pricing.facts.map((fact) => (
              <li key={fact} className="inline-flex items-center gap-1.5 rounded-full bg-cyan/10 px-3 py-1.5 text-sm text-cyan-ink">
                <Check aria-hidden className="size-3.5" />
                {fact}
              </li>
            ))}
          </ul>
          <Reveal variant="image" className="relative min-h-48 flex-1 overflow-hidden rounded-xl bg-navy">
            <Image src="/images/site/home-plans.webp" alt={photoAlt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
          </Reveal>
        </article>

        <article className="surface-abyss flex flex-col gap-5 rounded-2xl p-5 sm:p-8">
          <div>
            <h3 className="text-h3 text-white">{pricing.investorsTitle}</h3>
            <p className="mt-2 text-mist">{pricing.investorsBody}</p>
          </div>

          {/* Narrow tier columns on phones leave the feature labels room to read. */}
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-navy-line">
                <td />
                <th scope="col" className="w-12 pb-3 text-center font-mono text-[0.625rem] tracking-[0.06em] text-mist uppercase sm:w-28 sm:text-eyebrow sm:tracking-[0.14em]">
                  {access.free.label}
                </th>
                <th scope="col" className="w-16 pb-3 text-center font-mono text-[0.625rem] tracking-[0.06em] text-gold uppercase sm:w-28 sm:text-eyebrow sm:tracking-[0.14em]">
                  {access.paid.label}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-navy-line/60 last:border-0">
                  <th scope="row" className="py-2.5 pe-3 text-start font-normal text-mist">
                    {row.label}
                  </th>
                  <td className="py-2.5 text-center">
                    {row.free ? (
                      <Check aria-label={access.free.label} className="mx-auto size-4 text-cyan" />
                    ) : (
                      <Minus aria-hidden className="mx-auto size-4 text-white/25" />
                    )}
                  </td>
                  <td className="py-2.5 text-center">
                    {row.free ? (
                      <Check aria-label={access.paid.label} className="mx-auto size-4 text-gold" />
                    ) : (
                      <Lock aria-label={access.paid.label} className="mx-auto size-4 text-gold" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-auto flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-sm text-mist">{access.note}</p>
            <Button href={pricingHref} variant="accent" arrow className="shrink-0">
              {access.cta}
            </Button>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
