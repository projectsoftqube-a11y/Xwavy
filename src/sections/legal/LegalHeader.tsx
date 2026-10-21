import { FileWarning } from "lucide-react";
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
};

/** Compact dark header for the legal pages, with the draft status always visible. */
export function LegalHeader({ id, eyebrow, title, accent, body, draftBadge }: LegalHeaderProps) {
  return (
    <section aria-labelledby={id} className="surface-abyss bg-grid panel relative mt-(--panel-inset)">
      <Image src="/images/site/lg-header-bg.webp" alt="" aria-hidden fill priority sizes="100vw" className="object-cover opacity-30" />
      <Container className="relative pt-[calc(var(--panel-inset)+6.5rem)] pb-section-sm lg:pt-[calc(var(--panel-inset)+7.5rem)]">
        <Reveal stagger className="flex max-w-3xl flex-col gap-5">
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
      </Container>
    </section>
  );
}
