import { Sparkle } from "lucide-react";

type PromiseTickerProps = {
  /** Short promises, e.g. "Free to post", "No commission". */
  items: readonly string[];
  label: string;
};

/**
 * A solid cyan band of Xwavy's promises gliding past, between the hero and
 * the first section. CSS-only (transform), pauses on hover, and stops for
 * reduced motion. The list is read once by assistive tech; the duplicate that
 * makes the loop seamless is hidden from it.
 */
export function PromiseTicker({ items, label }: PromiseTickerProps) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 pe-8 sm:gap-10 sm:pe-10">
          <span dir="auto" className="font-heading text-[clamp(1.25rem,1rem+1.2vw,2rem)] font-semibold tracking-tight whitespace-nowrap">
            {item}
          </span>
          <Sparkle aria-hidden className="size-5 shrink-0 fill-current" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={label} className="panel mt-(--panel-inset) overflow-hidden bg-cyan py-4 text-abyss sm:py-5">
      <div dir="ltr" className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ ["--marquee-duration" as string]: "38s" }}>
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
