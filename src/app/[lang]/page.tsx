import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import imagesCopy from "@/i18n/pages/images";
import { localeHref } from "@/lib/href";
import { Consent } from "@/sections/home/Consent";
import { Faq } from "@/sections/home/Faq";
import { Hero } from "@/sections/home/Hero";
import { Plans } from "@/sections/home/Plans";
import { Process } from "@/sections/home/Process";
import { PromiseTicker } from "@/sections/home/PromiseTicker";
import { Roles } from "@/sections/home/Roles";
import { Trust } from "@/sections/home/Trust";

/**
 * Home, told as one story through the same two people: meet both sides, follow
 * an idea from draft to introduction, see the double opt-in open, then the
 * conversation it leads to. Sections follow the Scope of Work (§3.3).
 *
 * Not yet included, by design: live counters and featured ideas. Both need
 * real platform data; the launch database starts empty (clarifications §6).
 */
export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const { home } = dict;
  const alt = await pageCopy(imagesCopy);
  const pricingHref = localeHref(locale, "/pricing");

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <PromiseTicker
        label={home.hero.eyebrow}
        items={[...home.pricing.facts, home.trust.items[0]?.title ?? "", home.trust.items[4]?.title ?? ""].filter(Boolean)}
      />
      <Roles
        t={home.roles}
        alts={alt}
        innovatorHref={localeHref(locale, "/for-innovators")}
        investorHref={localeHref(locale, "/for-investors")}
      />
      <Process t={home.process} alts={alt} />
      <Consent t={home.consent} />
      <Plans pricing={home.pricing} access={home.access} photoAlt={alt.homePlans} pricingHref={pricingHref} />
      <Trust t={home.trust} />
      <Faq locale={locale} dict={dict} />
    </>
  );
}
