"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";
import { DURATION, EASE } from "@/lib/motion";

type DesktopNavProps = {
  label: string;
  items: readonly { label: string; href: string }[];
};

const glide = { type: "spring", stiffness: 420, damping: 36 } as const;

/**
 * The header's main links.
 * - The page you're on reads in full white, with a fine glowing cyan line on
 *   the header's lower hairline beneath it (also exposed as aria-current). It
 *   slides to the new link when you navigate, because the header persists.
 * - A soft highlight follows the pointer from link to link.
 */
export function DesktopNav({ label, items }: DesktopNavProps) {
  const pathname = usePathname();
  const id = useId();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav aria-label={label} className="hidden xl:block">
      <ul className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
        {items.map((item) => {
          const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                onMouseEnter={() => setHovered(item.href)}
                onFocus={() => setHovered(item.href)}
                onBlur={() => setHovered(null)}
                className={cn(
                  // px-2 until 2xl: at 1280px the seven 16px links, language, sign-in and CTA only just fit the header.
                  "relative inline-flex min-h-10 items-center rounded-(--radius-control) px-2 text-base whitespace-nowrap transition-colors duration-300 2xl:px-3.5",
                  current ? "text-fog" : "text-haze hover:text-fog",
                )}
              >
                <AnimatePresence>
                  {hovered === item.href && !current ? (
                    <motion.span
                      layoutId={`${id}-hover`}
                      aria-hidden
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={glide}
                      className="absolute inset-0 rounded-(--radius-control) bg-white/[0.06]"
                    />
                  ) : null}
                </AnimatePresence>
                <span className="relative">{item.label}</span>
              </Link>
              {current ? (
                <motion.span
                  layoutId={`${id}-bar`}
                  aria-hidden
                  transition={{ duration: DURATION.slow, ease: EASE.brand }}
                  className="pointer-events-none absolute -bottom-[1rem] left-1/2 h-px w-10 -translate-x-1/2 bg-cyan shadow-[0_0_12px_1px_rgb(0_225_234/0.8)]"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
