import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

export type SectionTone = "white" | "surface" | "navy" | "abyss";

type SectionProps = {
  tone?: SectionTone;
  spacing?: "default" | "compact" | "none";
  /** Constrain the inner container to reading width. */
  width?: "site" | "prose";
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"section">, "children">;

const tones: Record<SectionTone, string> = {
  white: "bg-white",
  surface: "bg-surface",
  navy: "surface-navy",
  abyss: "surface-abyss",
};

const spacings = {
  default: "py-section",
  compact: "py-section-sm",
  none: "",
} as const;

/**
 * Full-bleed section background with a centered, width-capped container.
 * Pass `aria-labelledby` pointing at the section heading's id.
 */
export function Section({
  tone = "white",
  spacing = "default",
  width = "site",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(tones[tone], spacings[spacing], className)} {...props}>
      <Container width={width}>{children}</Container>
    </section>
  );
}
