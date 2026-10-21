import type { Metadata } from "next";

import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy, { LEGAL_SLUGS } from "@/i18n/pages/legal";
import { localeHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";
import { LegalHeader } from "@/sections/legal/LegalHeader";
import { LegalIndex } from "@/sections/legal/LegalIndex";

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/legal", t.hub.title, t.hub.description);
}

/** Legal hub (SOW §3.3): the five policies, each marked as a draft pending legal review. */
export default async function LegalHubPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);

  return (
    <>
      <LegalHeader id="lg-title" eyebrow={t.hub.eyebrow} title={t.hub.titleLead} accent={t.hub.titleAccent} body={t.hub.body} draftBadge={t.draftBadge} />

      <LegalIndex
        id="lg-docs"
        title={t.hub.listTitle}
        draftNote={t.draftNote}
        contactNote={t.contactNote}
        readLabel={t.readLabel}
        docs={LEGAL_SLUGS.map((slug) => ({ title: t.docs[slug].title, summary: t.docs[slug].summary, href: localeHref(locale, `/legal/${slug}`) }))}
      />
    </>
  );
}
