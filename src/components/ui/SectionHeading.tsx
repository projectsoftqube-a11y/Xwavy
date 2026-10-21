import type { ReactNode } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Section number shown in the eyebrow, e.g. "02". */
  number?: string;
  /** Main part of the headline. */
  title: ReactNode;
  /** Accent words after the title, set apart by colour (house style). */
  accent?: string;
  description?: ReactNode;
  /** Semantic level. Visual size follows the level. */
  as?: HeadingLevel;
  align?: "start" | "center";
  /** `dark` for headings placed on abyss or navy sections. */
  tone?: "light" | "dark";
  /** Set on the heading so the section can use aria-labelledby. */
  id?: string;
  className?: string;
};

const titleSizes: Record<HeadingLevel, string> = {
  h1: "text-display",
  h2: "text-h2",
  h3: "text-h3",
};

const tones = {
  light: { title: "text-ink", accent: "text-cyan-ink", description: "text-muted" },
  dark: { title: "text-white", accent: "text-cyan", description: "text-mist" },
} as const;

export function SectionHeading({
  eyebrow,
  number,
  title,
  accent,
  description,
  as: Heading = "h2",
  align = "start",
  tone = "light",
  id,
  className,
}: SectionHeadingProps) {
  const colors = tones[tone];
  const centered = align === "center";

  return (
    <Reveal stagger className={cn("flex max-w-3xl flex-col gap-4", centered && "mx-auto items-center text-center", className)}>
      {eyebrow ? (
        <Eyebrow number={number} tone={tone}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading id={id} className={cn(titleSizes[Heading], colors.title)}>
        {title}
        {accent ? (
          <>
            {" "}
            <span className={cn("accent", colors.accent)}>{accent}</span>
          </>
        ) : null}
      </Heading>
      {description ? <p className={cn("max-w-prose text-lead", colors.description)}>{description}</p> : null}
    </Reveal>
  );
}
