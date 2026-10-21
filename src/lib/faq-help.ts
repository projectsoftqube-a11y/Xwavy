import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/href";

/** Props for the "Still have a question?" card shown beside every FAQ. */
export function faqHelp(locale: Locale, dict: Dictionary) {
  return { ...dict.common.faqHelp, href: localeHref(locale, "/contact"), email: siteConfig.email };
}
