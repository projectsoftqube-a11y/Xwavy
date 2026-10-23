import { FaqSection } from "@/components/sections/FaqSection";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { faqHelp } from "@/lib/faq-help";

type FaqProps = { locale: Locale; dict: Dictionary };

export function Faq({ locale, dict }: FaqProps) {
  const t = dict.home.faq;
  return <FaqSection id="faq-title" number="06" eyebrow={t.eyebrow} titleLead={t.titleLead} titleAccent={t.titleAccent} items={t.items} help={faqHelp(locale, dict)} />;
}
