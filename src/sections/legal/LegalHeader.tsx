import { FileWarning, Mail } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/layout/Container";

type LegalHeaderProps = {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
  draftBadge: string;
  /** Figures for the card beside the title, e.g. sections and minutes to read. */
  facts: readonly { value: number; label: string }[];
  /** Contact line at the foot of the card. */
  note: string;
};

/**
 * Compact dark header for the legal pages, with the draft status always
 * visible. Beside the title, a card gives the document's size at a glance
 * (counted from the text itself) and who to write to.
 */
export function LegalHeader({ id, eyebrow, title, accent, body, draftBadge, facts, note }: LegalHeaderProps) {
  return (
    <section aria-labelledby={id} className="surface-abyss bg-grid panel relative mt-(--panel-inset)">
      <Image src="/images/site/lg-header-bg.webp" alt="" aria-hidden fill priority sizes="100vw" className="object-cover opacity-30" />
      <Container className="relative grid grid-cols-1 gap-10 pt-[calc(var(--panel-inset)+6.5rem)] pb-section-sm lg:grid-cols-12 lg:items-end lg:gap-14 lg:pt-[calc(var(--panel-inset)+7.5rem)]">
        <Reveal stagger className="flex flex-col gap-5 lg:col-span-7">
          <p className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/12 bg-white/5 py-1 ps-1 pe-3.5 font-mono text-eyebrow text-mist uppercase">
            <Image src="/brand/xwavy-mark.png" alt="" aria-hidden width={24} height={24} className="size-6 shrink-0 rounded-[0.4rem] ring-1 ring-white/15" />
            {eyebrow}
          </p>
          <h1 id={id} className="text-display text-white">
            {title}
            {accent ? (
              <>
                {" "}
                <span className="accent text-cyan">{accent}</span>
              </>
            ) : null}
          </h1>
          <p className="max-w-2xl text-lead text-mist">{body}</p>
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-gold/15 px-3.5 py-1.5 text-sm text-gold">
            <FileWarning aria-hidden className="size-4" />
            {draftBadge}
          </p>
        </Reveal>

        <Reveal className="rounded-3xl border border-white/12 bg-abyss/70 p-6 backdrop-blur-md sm:p-7 lg:col-span-5">
          <dl className="grid grid-cols-2 gap-3">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl bg-white/5 p-4">
                <dt className="font-mono text-eyebrow text-mist uppercase">{fact.label}</dt>
                <dd className="mt-1 font-heading text-stat text-white" data-numeric>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 flex items-start gap-2.5 border-t border-white/10 pt-5 text-sm text-mist">
            <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" />
            {note}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
