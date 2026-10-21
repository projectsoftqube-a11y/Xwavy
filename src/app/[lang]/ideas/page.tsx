import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy from "@/i18n/pages/ideas";
import imagesCopy from "@/i18n/pages/images";
import { localeHref, portalHref } from "@/lib/href";
import { pageMetadata } from "@/lib/metadata";
import { FilterPanel } from "@/sections/ideas/FilterPanel";
import { IdeaAnatomy } from "@/sections/ideas/IdeaAnatomy";

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/ideas", t.meta.title, t.meta.description);
}

/**
 * Ideas (SOW §3.4): what the directory shows at each tier and how to search
 * it, linking to the live directory. No example listings: the launch
 * database starts empty (clarifications §6).
 */
export default async function IdeasPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);
  const alt = await pageCopy(imagesCopy);

  return (
    <>
      <PageHero
        id="id-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[
          { label: t.hero.primary, href: portalHref(locale, "browseIdeas"), variant: "accent" },
          { label: t.hero.secondary, href: localeHref(locale, "/how-it-works"), variant: "outline-inverse" },
        ]}
        points={t.hero.points}
        image={{ src: "/images/site/id-hero.webp", alt: alt.idHero }}
      />

      <IdeaAnatomy t={t.layers} />
      <FilterPanel t={t.filters} />

      <Statement eyebrow={t.review.eyebrow} parts={t.review.parts} footnote={t.review.footnote} background="/images/site/id-statement-bg.webp" />
    </>
  );
}
