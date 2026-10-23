import { getLocale } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/href";
import { LostSignal } from "@/sections/not-found/LostSignal";

const copy = {
  en: { title: "Page not found", body: "This page doesn’t exist yet, or it has moved.", cta: "Back to home", contact: "Contact us" },
  ar: { title: "الصفحة غير موجودة", body: "هذه الصفحة غير موجودة حاليًا أو تم نقلها.", cta: "العودة إلى الرئيسية", contact: "تواصل معنا" },
} as const;

export default async function NotFound() {
  const locale = await getLocale();
  const t = copy[locale];

  return <LostSignal title={t.title} body={t.body} home={{ label: t.cta, href: `/${locale}` }} contact={{ label: t.contact, href: localeHref(locale, "/contact") }} />;
}
