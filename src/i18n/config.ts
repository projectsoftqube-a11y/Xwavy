/**
 * Locale configuration. Safe to import anywhere (proxy, server, client).
 *
 * Requirements (Wavy Solutions clarifications, 16 Sep 2026): Arabic and
 * English with full RTL, separate indexable URLs (/ar, /en), and Arabic as
 * the default for visitors detected in Saudi Arabia.
 */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Visitors from these countries default to Arabic. */
export const arabicDefaultCountries = ["SA"] as const;

/** Remembers an explicit choice made with the language switcher. */
export const localeCookie = "XWAVY_LOCALE";

export const localeMeta: Record<Locale, { dir: "ltr" | "rtl"; label: string; ogLocale: string }> = {
  en: { dir: "ltr", label: "English", ogLocale: "en_US" },
  ar: { dir: "rtl", label: "العربية", ogLocale: "ar_SA" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "ar";
}

/** Swaps or adds the locale prefix of a pathname: ("/en/pricing", "ar") → "/ar/pricing". */
export function localizePath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  if (isLocale(segments[1])) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}
