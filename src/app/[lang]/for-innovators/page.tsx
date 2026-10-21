import { Activity, CircleCheck, CircleX, Inbox, LayoutDashboard, ListChecks, MessagesSquare, PencilLine, UsersRound } from "lucide-react";
import type { Metadata } from "next";

import { CardGrid } from "@/components/sections/CardGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import copy from "@/i18n/pages/for-innovators";
import imagesCopy from "@/i18n/pages/images";
import { localeHref, portalHref } from "@/lib/href";
import { faqHelp } from "@/lib/faq-help";
import { pageMetadata } from "@/lib/metadata";
import { ComposerSteps } from "@/sections/for-innovators/ComposerSteps";

const REVIEW_ICONS = [CircleCheck, PencilLine, CircleX] as const;
const DASHBOARD_ICONS = [LayoutDashboard, ListChecks, Activity, MessagesSquare, Inbox, UsersRound] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await pageCopy(copy);
  return pageMetadata(await getLocale(), "/for-innovators", t.meta.title, t.meta.description);
}

/**
 * For innovators (SOW §3.3, §2.2, §4.2): post free, what's public and what's
 * for subscribers, how review works, how a request reaches you, the dashboard.
 */
export default async function ForInnovatorsPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = await pageCopy(copy);
  const alt = await pageCopy(imagesCopy);
  const signUp = portalHref(locale, "signUpInnovator");
  const { composer, review, decision, dashboard } = t;

  return (
    <>
      <PageHero
        id="fi-hero"
        eyebrow={t.hero.eyebrow}
        titleLead={t.hero.titleLead}
        titleAccent={t.hero.titleAccent}
        body={t.hero.body}
        actions={[
          { label: t.hero.primary, href: signUp, variant: "primary" },
          { label: t.hero.secondary, href: localeHref(locale, "/how-it-works"), variant: "outline-inverse" },
        ]}
        points={t.hero.points}
        image={{ src: "/images/site/fi-hero.webp", alt: alt.fiHero, position: "object-[55%_center]" }}
      />

      <ComposerSteps t={composer} image={{ src: "/images/site/fi-composer.webp", alt: alt.fiComposer }} />

      <CardGrid
        id="fi-review"
        eyebrow={review.eyebrow}
        titleLead={review.titleLead}
        titleAccent={review.titleAccent}
        description={review.description}
        image={{ src: "/images/site/fi-review.webp", alt: alt.fiReview }}
        cards={review.cards.map((card, i) => ({ ...card, Icon: REVIEW_ICONS[i] }))}
      />

      <SplitFeature
        id="fi-decision"
        eyebrow={decision.eyebrow}
        titleLead={decision.titleLead}
        titleAccent={decision.titleAccent}
        body={decision.body}
        tone="surface"
        lists={[
          { title: decision.seeTitle, items: decision.see },
          { title: decision.hiddenTitle, items: decision.hidden, tone: "hidden" },
        ]}
        note={decision.promise}
        image={{ src: "/images/site/fi-decision.webp", alt: alt.fiDecision }}
      />

      <CardGrid
        id="fi-dashboard"
        eyebrow={dashboard.eyebrow}
        titleLead={dashboard.titleLead}
        titleAccent={dashboard.titleAccent}
        layout="bento"
        cards={dashboard.items.map((item, i) => ({ ...item, Icon: DASHBOARD_ICONS[i], background: i === 0 ? "/images/site/fi-dashboard.webp" : undefined }))}
      />

      <FaqSection id="fi-faq" eyebrow={t.faq.eyebrow} titleLead={t.faq.titleLead} titleAccent={t.faq.titleAccent} items={t.faq.items} help={faqHelp(locale, dict)} />

    </>
  );
}
