import { ScrollProgress } from "@/components/animation/ScrollProgress";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import imagesCopy from "@/i18n/pages/images";
import pricingCopy from "@/i18n/pages/pricing";
import { localeHref, portalHref } from "@/lib/href";
import { CinemaHero } from "@/sections/home/CinemaHero";
import { Faq } from "@/sections/home/Faq";
import { HandshakeStory } from "@/sections/home/HandshakeStory";
import { PlanShowcase } from "@/sections/home/PlanShowcase";
import { PromiseBand } from "@/sections/home/PromiseBand";
import { StepsBento } from "@/sections/home/StepsBento";
import { TrustGrid } from "@/sections/home/TrustGrid";
import { TwoWorlds } from "@/sections/home/TwoWorlds";

/**
 * Home, cinematic: the promise over a full-bleed photograph, the promises to
 * innovators, the two sides, an idea's journey as five photographic cards, the double
 * opt-in as a handshake, the two plans, trust and safety, then questions.
 * The footer opens with the finale: the promise, both ways in and the main
 * pages. Sections follow the Scope of Work (§3.3).
 *
 * Not yet included, by design: live counters and featured ideas. Both need
 * real platform data; the launch database starts empty (clarifications §6).
 */
export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const { home } = dict;
  const alt = await pageCopy(imagesCopy);
  const { plans } = await pageCopy(pricingCopy);
  const innovatorHref = portalHref(locale, "signUpInnovator");

  return (
    <>
      <ScrollProgress />
      <CinemaHero t={home.hero} imageAlt={alt.hiwHero} innovatorHref={innovatorHref} investorHref={localeHref(locale, "/for-investors")} />
      <PromiseBand label={home.hero.eyebrow} promises={home.pricing.facts} />
      <TwoWorlds
        t={home.roles}
        alts={alt}
        innovatorHref={localeHref(locale, "/for-innovators")}
        investorHref={localeHref(locale, "/for-investors")}
      />
      <StepsBento t={home.process} alts={[alt.homeStep1, alt.homeStep2, alt.homeStep3, alt.homeStep4, alt.homeStep5]} />
      <HandshakeStory t={home.consent} />
      <PlanShowcase pricing={home.pricing} access={home.access} plans={plans} innovatorHref={innovatorHref} pricingHref={localeHref(locale, "/pricing")} controls={dict.common.autoplay} />
      <TrustGrid t={home.trust} />
      <Faq locale={locale} dict={dict} />
    </>
  );
}
