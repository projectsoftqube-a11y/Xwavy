import { LogIn, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { BackToTop, CookieSettings } from "@/components/layout/FooterExtras";
import { FooterNext } from "@/components/layout/FooterNext";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { gaMeasurementId, siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localeHref, portalHref } from "@/lib/href";

type SiteFooterProps = { locale: Locale; dict: Dictionary };

/** Copyright year. Fixed at build time; the page is prerendered. */
const YEAR = 2026;

/** Link text with a cyan rule that draws in underneath on hover. */
const underline =
  "relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-cyan after:transition-transform after:duration-300 group-hover:after:scale-x-100 rtl:after:origin-right";

/**
 * Site footer, shared by every page, as an inset navy panel: the main pages
 * as numbered "where to next" links across the top, then the brand with the
 * main call to action, the Explore and Legal links and contact details, then
 * the legal bar with language and back to top.
 */
export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const t = dict.footer;
  const title = dict.home.hero.title;
  const contacts = [
    { href: `mailto:${siteConfig.email}`, label: siteConfig.email, Icon: Mail },
    { href: portalHref(locale, "signIn"), label: dict.common.signIn, Icon: LogIn },
  ];

  return (
    <footer className="surface-navy panel my-(--panel-inset)">
      <Container className="pt-14 pb-6 lg:pt-16">
        <FooterNext label={t.nextLabel} items={t.next.map((item) => ({ ...item, href: localeHref(locale, item.href) }))} />

        <div className="mt-14 grid grid-cols-1 gap-12 border-t border-white/10 pt-12 lg:mt-16 lg:grid-cols-12 lg:gap-10 lg:pt-14">
          {/* Brand. */}
          <div className="flex flex-col items-start gap-5 lg:col-span-4">
            <Link href={localeHref(locale, "/")} className="w-fit rounded-md" aria-label={siteConfig.name}>
              <Image src={siteConfig.logo.src} width={siteConfig.logo.width} height={siteConfig.logo.height} alt={siteConfig.logo.alt} className="h-9 w-auto" />
            </Link>
            <p className="max-w-sm text-h3 text-white">
              {title.line1} {title.before} <span className="accent text-cyan">{title.after}</span>
            </p>
            <Button href={portalHref(locale, "signUpInnovator")} variant="primary" size="sm" arrow className="mt-1">
              {dict.home.hero.primaryCta}
            </Button>
          </div>

          {/* Links and contact. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
            {t.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-mono text-eyebrow text-white/50 uppercase">{column.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={localeHref(locale, link.href)} className="group inline-flex text-[0.9375rem] text-mist transition-colors hover:text-white">
                        <span className={underline}>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-mono text-eyebrow text-white/50 uppercase">{t.contactTitle}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {contacts.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <a href={href} className="group inline-flex items-center gap-3 text-[0.9375rem] text-white">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/5 text-cyan ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-cyan group-hover:text-abyss">
                        <Icon aria-hidden className="size-4 rtl:-scale-x-100" />
                      </span>
                      <span className={underline}>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal bar. */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-mist lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1.5">
            <p>
              © {YEAR} {siteConfig.name}. {t.rights} {t.poweredBy}.
            </p>
            <p className="text-xs">{t.disclaimer}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher current={locale} label={dict.common.language} className="border border-white/12" />
            {/* Only when analytics is on: otherwise there is no consent to change. */}
            {gaMeasurementId ? <CookieSettings label={dict.common.cookies.settings} /> : null}
            <BackToTop label={t.backToTop} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
