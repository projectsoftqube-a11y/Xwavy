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
 * - The page you're on is a solid white pill, with a glowing cyan bar resting
 *   on the header's lower edge beneath it (also exposed as aria-current). Both
 *   slide to the new link when you navigate, because the header persists.
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
                  "relative inline-flex min-h-10 items-center rounded-full px-4 text-sm transition-colors duration-300",
                  current ? "font-semibold text-abyss" : "text-mist hover:text-white",
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
                      className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                    />
                  ) : null}
                </AnimatePresence>
                {current ? (
                  <motion.span
                    layoutId={`${id}-active`}
                    aria-hidden
                    transition={{ duration: DURATION.slow, ease: EASE.brand }}
                    className="absolute inset-0 rounded-full bg-white shadow-[0_6px_24px_-6px_rgb(0_225_234/0.55)]"
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
              {current ? (
                <motion.span
                  layoutId={`${id}-bar`}
                  aria-hidden
                  transition={{ duration: DURATION.slow, ease: EASE.brand }}
                  className="pointer-events-none absolute -bottom-3 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px_2px_rgb(0_225_234/0.7)]"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
