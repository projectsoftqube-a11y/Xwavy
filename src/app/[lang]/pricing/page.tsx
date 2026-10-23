import { Archive, CreditCard, RefreshCw, Settings2 } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { CompareTable } from "@/components/sections/CompareTable";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { Statement } from "@/components/sections/Statement";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import accessCopy from "@/i18n/pages/access";
import copy from "@/i18n/pages/pricing";
import imagesCopy from "@/i18n/pages/images";
import { localeHref, portalHref } from "@/lib/href";
import { faqHelp } from "@/lib/faq-help";
import { pageMetadata } from "@/lib/metadata";
import { PlanCards } from "@/sections/pricing/PlanCards";

const BILLING_ICONS = [CreditCard, Settings2, RefreshCw, Archive] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/pricing", t.meta.title, t.meta.description);
}

/**
 * Pricing (SOW §3.3, §1.1, §2.4): the plans (prices announced at launch), the
 * feature comparison, how billing works, the "innovators are always free"
 * band and a billing FAQ.
 */
export default async function PricingPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = await pageCopy(copy);
  const access = await pageCopy(accessCopy);
  const alt = await pageCopy(imagesCopy);
  const signUp = portalHref(locale, "signUpInnovator");
  const browse = localeHref(locale, "/ideas");

  return (
    <>
      <PageHero
        id="pr-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[
          { label: t.hero.primary, href: signUp, variant: "primary" },
          { label: t.hero.secondary, href: browse, variant: "accent" },
        ]}
        points={t.hero.points}
        image={{ src: "/images/site/pr-hero.webp", alt: alt.prHero }}
      />

      <PlanCards t={t.plans} hrefs={{ innovator: signUp, investor: browse }} />

      <CompareTable
        id="pr-compare"
        number="02"
        eyebrow={t.compare.eyebrow}
        titleLead={t.compare.titleLead}
        titleAccent={t.compare.titleAccent}
        description={t.compare.description}
        labels={access}
        rows={access.rows}
        tone="white"
      />

      <CardGrid
        id="pr-billing"
        number="03"
        eyebrow={t.billing.eyebrow}
        titleLead={t.billing.titleLead}
        titleAccent={t.billing.titleAccent}
        columns={4}
        tone="surface"
        image={{ src: "/images/site/pr-billing.webp", alt: alt.prBilling }}
        cards={t.billing.cards.map((card, i) => ({
          ...card,
          Icon: BILLING_ICONS[i],
        }))}
      />

      <Statement eyebrow={t.band.eyebrow} parts={t.band.parts} tone="dark" background="/images/site/home-plans.webp" />

      <FaqSection id="pr-faq" number="04" eyebrow={t.faq.eyebrow} titleLead={t.faq.titleLead} titleAccent={t.faq.titleAccent} items={t.faq.items} help={faqHelp(locale, dict)} />
    </>
  );
}
