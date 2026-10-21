import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  /** Optional section number, e.g. "01". */
  number?: string;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Small label above a heading: a pill that opens with the Xwavy mark (the
 * favicon tile), then an optional number and the text. Decorative mark, so
 * it has no alt text.
 */
export function Eyebrow({ children, number, tone = "light", className }: EyebrowProps) {
  const dark = tone === "dark";
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-2.5 rounded-full border py-1 ps-1 pe-3.5 font-mono text-eyebrow uppercase",
        dark ? "border-white/12 bg-white/5 text-mist" : "border-line bg-white text-body shadow-xs",
        className,
      )}
    >
      <Image
        src="/brand/xwavy-mark.png"
        alt=""
        aria-hidden
        width={24}
        height={24}
        className={cn("size-6 shrink-0 rounded-[0.4rem]", dark && "ring-1 ring-white/15")}
      />
      {number ? <span className={dark ? "text-cyan" : "text-cyan-ink"}>{number}</span> : null}
      <span>{children}</span>
    </p>
  );
}
