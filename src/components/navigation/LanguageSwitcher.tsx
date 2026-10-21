"use client";

import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";

import { localeCookie, localeMeta, localizePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
  className?: string;
  /** `dark` (default) for dark surfaces, `light` for white ones. */
  tone?: "dark" | "light";
};

/**
 * Links to the same page in the other language and remembers the choice for a
 * year, so the proxy stops auto-detecting. A plain <a>: each locale has its
 * own root layout, so switching is a full page load either way.
 */
export function LanguageSwitcher({ current, label, className, tone = "dark" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const target: Locale = current === "en" ? "ar" : "en";

  return (
    <a
      href={localizePath(pathname, target)}
      hrefLang={target}
      lang={target}
      aria-label={`${label}: ${localeMeta[target].label}`}
      onClick={() => {
        document.cookie = `${localeCookie}=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm transition-colors",
        tone === "dark" ? "text-mist hover:bg-white/5 hover:text-white" : "text-body hover:bg-surface hover:text-ink",
        className,
      )}
    >
      <Globe aria-hidden className="size-4" />
      {localeMeta[target].label}
    </a>
  );
}
