import { BadgeCheck, Ban, FileText, LockOpen, RotateCcw, Search, Send, Ticket } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { CompareTable } from "@/components/sections/CompareTable";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { StepStory } from "@/components/sections/StepStory";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import accessCopy from "@/i18n/pages/access";
import copy from "@/i18n/pages/for-investors";
import imagesCopy from "@/i18n/pages/images";
import { localeHref, portalHref } from "@/lib/href";
import { faqHelp } from "@/lib/faq-help";
import { pageMetadata } from "@/lib/metadata";

const STEP_PHOTOS = ["/images/site/fv-step-browse.webp", "/images/site/fv-step-mandate.webp", "/images/site/fv-step-subscribe.webp", "/images/site/fv-step-request.webp"] as const;
const STEP_ICONS = [Search, FileText, LockOpen, Send] as const;
const RULE_ICONS = [Ticket, RotateCcw, Ban, BadgeCheck] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/for-investors", t.meta.title, t.meta.description);
}

/**
 * For investors (SOW §3.3, §2.3, §4.3, §4.4): browse free, the path to an
 * introduction, an honest free-against-paid comparison, the rules of asking,
 * and what cancelling keeps.
 */
export default async function ForInvestorsPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = await pageCopy(copy);
  const access = await pageCopy(accessCopy);
  const alt = await pageCopy(imagesCopy);
  const stepAlts = [alt.fvBrowse, alt.fvMandate, alt.fvSubscribe, alt.fvRequest];
  const browse = localeHref(locale, "/ideas");
  const pricing = localeHref(locale, "/pricing");

  return (
    <>
      <PageHero
        id="fv-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[
          { label: t.hero.primary, href: browse, variant: "accent" },
          {
            label: t.hero.secondary,
            href: pricing,
            variant: "outline-inverse",
          },
        ]}
        points={t.hero.points}
        image={{
          src: "/images/site/fv-hero.webp",
          alt: alt.fvHero,
          position: "object-[50%_30%]",
        }}
      />

      <StepStory
        id="fv-steps"
        number="01"
        eyebrow={t.steps.eyebrow}
        titleLead={t.steps.titleLead}
        titleAccent={t.steps.titleAccent}
        labels={{
          step: t.steps.stepLabel,
          of: t.steps.of,
          play: t.steps.play,
          pause: t.steps.pause,
        }}
        steps={t.steps.items.map((step, i) => ({
          ...step,
          image: {
            src: STEP_PHOTOS[i] ?? STEP_PHOTOS[0],
            alt: stepAlts[i] ?? "",
          },
          icon: (() => {
            const Icon = STEP_ICONS[i] ?? Search;
            return <Icon aria-hidden className="size-5" />;
          })(),
        }))}
      />

      <CompareTable
        id="fv-compare"
        number="02"
        eyebrow={t.compare.eyebrow}
        titleLead={t.compare.titleLead}
        titleAccent={t.compare.titleAccent}
        description={t.compare.description}
        labels={access}
        rows={access.rows}
        texture="/images/site/fv-compare-texture.webp"
        action={{ label: t.compare.cta, href: pricing }}
      />

      <CardGrid
        id="fv-rules"
        number="03"
        eyebrow={t.rules.eyebrow}
        titleLead={t.rules.titleLead}
        titleAccent={t.rules.titleAccent}
        columns={4}
        cards={t.rules.cards.map((card, i) => ({
          ...card,
          Icon: RULE_ICONS[i],
        }))}
      />

      <SplitFeature
        id="fv-cancel"
        number="04"
        eyebrow={t.cancel.eyebrow}
        titleLead={t.cancel.titleLead}
        titleAccent={t.cancel.titleAccent}
        body={t.cancel.body}
        tone="surface"
        imageSide="start"
        lists={[
          { title: t.cancel.keepTitle, items: t.cancel.keep },
          { title: t.cancel.lockTitle, items: t.cancel.lock, tone: "hidden" },
        ]}
        image={{ src: "/images/site/fv-cancel.webp", alt: alt.fvCancel }}
      />

      <FaqSection id="fv-faq" number="05" eyebrow={t.faq.eyebrow} titleLead={t.faq.titleLead} titleAccent={t.faq.titleAccent} items={t.faq.items} tone="white" help={faqHelp(locale, dict)} />
    </>
  );
}
