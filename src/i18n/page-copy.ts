import { getLocale } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

/**
 * Per-page copy. Each page keeps its English and Arabic text side by side in
 * src/i18n/pages/<page>.ts, typed so the Arabic must mirror the English shape:
 *
 *   const en = { ... };
 *   const ar: typeof en = { ... };
 *   export default { en, ar } satisfies PageCopy<typeof en>;
 *
 * The shared dictionaries (src/i18n/dictionaries) keep site-wide strings
 * (navigation, footer, home).
 */
export type PageCopy<T> = Record<Locale, T>;

/** Copy for the current request's locale. Server components only. */
export async function pageCopy<T>(copy: PageCopy<T>): Promise<T> {
  return copy[await getLocale()];
}
