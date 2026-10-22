import type { Metadata } from "next";

import { FaqSection } from "@/components/sections/FaqSection";
import { Statement } from "@/components/sections/Statement";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy from "@/i18n/pages/how-it-works";
import imagesCopy from "@/i18n/pages/images";
import { localeHref, portalHref } from "@/lib/href";
import { faqHelp } from "@/lib/faq-help";
import { pageMetadata } from "@/lib/metadata";
import { HowHero } from "@/sections/how-it-works/HowHero";
import { LayerViewer } from "@/sections/how-it-works/LayerViewer";
import { LifecycleFlow } from "@/sections/how-it-works/LifecycleFlow";
import { OutcomeSwitch } from "@/sections/how-it-works/OutcomeSwitch";
import { PathTimelines } from "@/sections/how-it-works/PathTimelines";

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/how-it-works", t.meta.title, t.meta.description);
}

/**
 * How it works (SOW §3.3): each side's path converging on an introduction,
 * the three ways a request can end, the idea lifecycle, who sees what, and
 * Xwavy's facilitator role.
 */
export default async function HowItWorksPage() {
  const locale = await getLocale();
  const t = await pageCopy(copy);
  const dict = await getDictionary();
  const { home } = dict;
  const alt = await pageCopy(imagesCopy);

  return (
    <>
      <HowHero
        t={t.hero}
        steps={home.process.steps.map((step, i) => ({ name: step.name, status: home.process.statuses[i] ?? "" }))}
        roles={{ innovator: home.consent.innovatorRole, investor: home.consent.investorRole }}
        revealed={home.consent.revealed}
        imageAlt={alt.hiwHero}
        primaryHref={portalHref(locale, "signUpInnovator")}
        secondaryHref={localeHref(locale, "/for-investors")}
      />

      <PathTimelines t={t.tracks} alts={{ innovator: alt.hiwPathInnovator, investor: alt.hiwPathInvestor }} />
      <OutcomeSwitch
        t={t.simulator}
        labels={{
          investor: home.consent.investorRole,
          innovator: home.consent.innovatorRole,
          contact: home.consent.lockLabel,
          sealed: home.consent.sealed,
          revealed: home.consent.revealed,
        }}
        photo={{ src: "/images/site/hiw-outcome-detail.webp", alt: alt.hiwOutcome }}
      />
      <LifecycleFlow t={t.lifecycle} />
      <LayerViewer t={t.layers} />

      <Statement eyebrow={t.facilitator.eyebrow} parts={t.facilitator.parts} footnote={t.facilitator.footnote} tone="dark" />

      <FaqSection id="hiw-faq" eyebrow={t.faq.eyebrow} titleLead={t.faq.titleLead} titleAccent={t.faq.titleAccent} items={t.faq.items} help={faqHelp(locale, dict)} />
    </>
  );
}
