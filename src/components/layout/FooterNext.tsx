"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

type FooterNextProps = {
  label: string;
  /** Localised links to the main pages. */
  items: readonly { href: string; title: string; line: string }[];
};

/**
 * The footer's top row: the main pages as numbered links, each under a rule.
 * No scroll animation, so the links are always visible. Hovering a link, or
 * being on its page, lights its rule cyan and turns the arrow.
 */
export function FooterNext({ label, items }: FooterNextProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <Eyebrow tone="dark">{label}</Eyebrow>
      <ol className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 lg:mt-10 lg:grid-cols-4 lg:gap-x-8">
        {items.map((item, i) => {
          const current = pathname === item.href;
          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={current ? "page" : undefined} className="group relative flex h-full flex-col pt-5">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-white/15 rtl:origin-right" />
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -top-px h-0.5 origin-left bg-cyan transition-transform duration-500 ease-brand rtl:origin-right",
                    current ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
                <span className="flex flex-col gap-2">
                  <span className="flex items-center justify-between gap-3">
                    <span dir="ltr" className={cn("font-mono text-xs transition-colors", current ? "text-cyan" : "text-mist group-hover:text-cyan")} data-numeric>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 text-mist transition-[color,rotate] duration-300 group-hover:rotate-45 group-hover:text-cyan rtl:-scale-x-100 rtl:group-hover:-rotate-45"
                    />
                  </span>
                  <span className="text-h4 text-white lg:text-h3">{item.title}</span>
                  <span className="text-sm text-mist">{item.line}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
