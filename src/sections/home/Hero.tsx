import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { pageCopy } from "@/i18n/page-copy";
import imagesCopy from "@/i18n/pages/images";
import { localeHref, portalHref } from "@/lib/href";
import { HeroSplit } from "@/sections/home/HeroSplit";

type HeroProps = { locale: Locale; dict: Dictionary };

/** Server wrapper: resolves links and labels, then hands the copy to the hero. */
export async function Hero({ locale, dict }: HeroProps) {
  const { hero, roles } = dict.home;
  const alt = await pageCopy(imagesCopy);
  return (
    <HeroSplit
      t={hero}
      roles={{ innovator: roles.innovators.label, investor: roles.investors.label }}
      alts={{ innovator: alt.homeHeroFounder, investor: alt.homeHeroInvestor }}
      innovatorHref={portalHref(locale, "signUpInnovator")}
      investorHref={localeHref(locale, "/for-investors")}
    />
  );
}
