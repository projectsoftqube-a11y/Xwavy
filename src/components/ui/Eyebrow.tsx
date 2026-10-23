import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  /** Optional section number, e.g. "01". */
  number?: string;
  className?: string;
};

/**
 * Small label above a heading, set in widely tracked title capitals: an
 * optional section number, a short rule, then the text, in the accent colour.
 */
export function Eyebrow({ children, number, className }: EyebrowProps) {
  return (
    <p className={cn("inline-flex w-fit items-center gap-3 font-display text-base tracking-[0.2em] text-cyan uppercase", className)}>
      {number ? (
        <span dir="ltr" className="text-fog" data-numeric>
          {number}
        </span>
      ) : null}
      <span aria-hidden data-eyebrow-rule className="h-px w-10 shrink-0 origin-left bg-current rtl:origin-right" />
      <span>{children}</span>
    </p>
  );
}
