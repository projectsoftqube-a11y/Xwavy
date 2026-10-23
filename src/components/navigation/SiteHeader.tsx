import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localeHref, portalHref } from "@/lib/href";

type SiteHeaderProps = { locale: Locale; dict: Dictionary };

export function navItems(locale: Locale, dict: Dictionary) {
  const nav = dict.common.nav;
  return [
    { label: nav.browseIdeas, href: localeHref(locale, "/ideas") },
    { label: nav.forInnovators, href: localeHref(locale, "/for-innovators") },
    { label: nav.forInvestors, href: localeHref(locale, "/for-investors") },
    { label: nav.howItWorks, href: localeHref(locale, "/how-it-works") },
    { label: nav.pricing, href: localeHref(locale, "/pricing") },
    { label: nav.about, href: localeHref(locale, "/about") },
    { label: nav.contact, href: localeHref(locale, "/contact") },
  ];
}

/**
 * Full-width night header: tinted glass over whatever scrolls beneath, a
 * hairline along its foot, logo, the main links and the two portal actions.
 * Fixed, so the cyan logo always sits on a dark ground.
 */
export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const items = navItems(locale, dict);

  return (
    <header className="z-header fixed inset-x-0 top-0 border-b border-white/[0.07] bg-night/72 backdrop-blur-xl backdrop-saturate-150">
      <Container>
        <div className="relative flex h-(--spacing-header) items-center justify-between gap-4">
          <Link href={localeHref(locale, "/")} className="shrink-0 rounded-md" aria-label={siteConfig.name}>
            <Image
              src={siteConfig.logo.src}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              alt={siteConfig.logo.alt}
              priority
              className="h-[1.375rem] w-auto sm:h-6"
            />
          </Link>

          <DesktopNav label={dict.common.nav.label} items={items} />

          <div className="flex items-center gap-2">
            {/* Visibility is set on wrappers: the components carry their own display class. */}
            <div className="hidden items-center gap-1.5 sm:flex">
              <LanguageSwitcher current={locale} label={dict.common.language} />
              <Link
                href={portalHref(locale, "signIn")}
                className="hidden min-h-10 items-center rounded-(--radius-control) px-2.5 text-base whitespace-nowrap text-fog transition-colors hover:bg-white/[0.05] lg:inline-flex"
              >
                {dict.common.signIn}
              </Link>
              <Button href={portalHref(locale, "signUpInnovator")} size="sm" arrow>
                {dict.common.postIdea}
              </Button>
            </div>
            <MobileMenu
              items={items}
              locale={locale}
              labels={{
                menu: dict.common.menu,
                open: dict.common.openMenu,
                close: dict.common.closeMenu,
                signIn: dict.common.signIn,
                postIdea: dict.common.postIdea,
                language: dict.common.language,
                browseIdeas: dict.common.nav.browseIdeas,
                contact: dict.footer.contactLabel,
              }}
              signInHref={portalHref(locale, "signIn")}
              postIdeaHref={portalHref(locale, "signUpInnovator")}
              browseHref={localeHref(locale, "/ideas")}
              email={siteConfig.email}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
