import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getLocale } from "@/i18n/get-dictionary";

const copy = {
  en: { title: "Page not found", body: "This page doesn’t exist yet, or it has moved.", cta: "Back to home" },
  ar: { title: "الصفحة غير موجودة", body: "هذه الصفحة غير موجودة حاليًا أو تم نقلها.", cta: "العودة إلى الرئيسية" },
} as const;

export default async function NotFound() {
  const locale = await getLocale();
  const t = copy[locale];

  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center gap-6 pt-28">
      <p className="font-mono text-eyebrow text-cyan-ink uppercase">404</p>
      <h1 className="text-h2">{t.title}</h1>
      <p className="text-lead text-muted">{t.body}</p>
      <Button href={`/${locale}`} variant="secondary">
        {t.cta}
      </Button>
    </Container>
  );
}
