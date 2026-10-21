import { portalLinks } from "@/config/site";
import type { Locale } from "@/i18n/config";

/** Prefixes an in-app path with the locale: ("ar", "/pricing") → "/ar/pricing". */
export function localeHref(locale: Locale, path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Link into the portal (sign in, sign up, idea directory). Absolute portal
 * URLs are used as they are; a relative path is treated as part of this site.
 */
export function portalHref(locale: Locale, key: keyof typeof portalLinks): string {
  const target: string = portalLinks[key];
  return /^https?:\/\//.test(target) ? target : localeHref(locale, target);
}
