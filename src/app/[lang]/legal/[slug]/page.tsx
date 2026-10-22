import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { locales } from "@/i18n/config";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy, { LEGAL_SLUGS, readingMinutes, type LegalSlug } from "@/i18n/pages/legal";
import { localeHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";
import { LegalArticle } from "@/sections/legal/LegalArticle";
import { LegalHeader } from "@/sections/legal/LegalHeader";

export function generateStaticParams() {
  return locales.flatMap((lang) => LEGAL_SLUGS.map((slug) => ({ lang, slug })));
}

const isSlug = (value: string): value is LegalSlug => (LEGAL_SLUGS as readonly string[]).includes(value);

export async function generateMetadata({ params }: PageProps<"/[lang]/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), `/legal/${slug}`, t.docs[slug].title, t.docs[slug].summary);
}

/** One policy (SOW §3.3), as a plain-language draft pending legal review. */
export default async function LegalDocPage({ params }: PageProps<"/[lang]/legal/[slug]">) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  const locale = await getLocale();
  const t = await pageCopy(copy);
  const doc = t.docs[slug];

  return (
    <>
      <LegalHeader id="lg-doc-title" eyebrow={t.hub.eyebrow} title={doc.title} body={doc.summary}
        draftBadge={t.draftBadge}
        facts={[
          { value: doc.sections.length, label: t.factLabels.sections },
          { value: readingMinutes(doc), label: t.factLabels.minutes },
        ]}
        note={t.contactNote}
      />
      <LegalArticle
        sections={doc.sections}
        draftNote={t.draftNote}
        tocLabel={t.tocLabel}
        otherLabel={t.otherLabel}
        others={LEGAL_SLUGS.filter((other) => other !== slug).map((other) => ({ title: t.docs[other].title, href: localeHref(locale, `/legal/${other}`) }))}
        contactNote={t.contactNote}
      />
    </>
  );
}
