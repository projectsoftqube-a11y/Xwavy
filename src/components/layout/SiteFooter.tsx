import { LogIn, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { CookieSettings, ScrollTopButton } from "@/components/layout/FooterExtras";
import { FooterFinale } from "@/components/layout/FooterFinale";
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
 * Site footer, shared by every page. It opens with the finale (the promise,
 * both ways in and the main pages, over a photograph), then the Explore and
 * Legal links with contact details, and the legal bar with language and back
 * to top.
 */
export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const t = dict.footer;
  const { title, primaryCta, secondaryCta } = dict.home.hero;
  const contacts = [
    { href: `mailto:${siteConfig.email}`, label: siteConfig.email, Icon: Mail },
    { href: portalHref(locale, "signIn"), label: dict.common.signIn, Icon: LogIn },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-hair bg-night">
      <Container className="relative pt-section-sm pb-8">
        <FooterFinale
          statement={{ lead: `${title.line1} ${title.before}`, accent: title.after }}
          label={t.nextLabel}
          items={t.next.map((item) => ({ ...item, href: localeHref(locale, item.href) }))}
          actions={
            <>
              <Button href={portalHref(locale, "signUpInnovator")} variant="primary" size="lg" arrow>
                {primaryCta}
              </Button>
              <Button href={localeHref(locale, "/for-investors")} variant="outline-inverse" size="lg" className="backdrop-blur-md">
                {secondaryCta}
              </Button>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-hair pt-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand. */}
          <div className="flex flex-col items-start gap-5 lg:col-span-4">
            <Link href={localeHref(locale, "/")} className="w-fit rounded-md" aria-label={siteConfig.name}>
              <Image src={siteConfig.logo.src} width={siteConfig.logo.width} height={siteConfig.logo.height} alt={siteConfig.logo.alt} className="h-7 w-auto" />
            </Link>
            <p className="max-w-xs text-base text-haze">{t.disclaimer}</p>
          </div>

          {/* Links and contact. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
            {t.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-display text-base tracking-[0.2em] text-dim uppercase">{column.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={localeHref(locale, link.href)} className="group inline-flex text-base text-haze transition-colors hover:text-fog">
                        <span className={underline}>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-display text-base tracking-[0.2em] text-dim uppercase">{t.contactTitle}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {contacts.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <a href={href} className="group inline-flex items-center gap-3 text-base text-fog">
                      <span className="grid size-9 shrink-0 place-items-center rounded-(--radius-control) border border-hair-strong text-cyan transition-colors duration-300 group-hover:border-cyan">
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

        {/* Legal bar: copyright on the start side; the studio credit and language on the end side. */}
        <div className="mt-14 flex flex-col gap-4 border-t border-hair pt-6 text-base text-dim lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {YEAR} {siteConfig.name}. {t.rights} {t.poweredBy}.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p>
              {t.credit}{" "}
              <a
                href={siteConfig.credit.href}
                target="_blank"
                rel="noopener"
                dir="ltr"
                className="text-haze underline decoration-white/25 underline-offset-4 transition-colors hover:text-cyan hover:decoration-cyan"
              >
                {siteConfig.credit.name}
              </a>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <LanguageSwitcher current={locale} label={dict.common.language} className="border border-hair-strong" />
              {/* Only when analytics is on: otherwise there is no consent to change. */}
              {gaMeasurementId ? <CookieSettings label={dict.common.cookies.settings} /> : null}
            </div>
          </div>
        </div>
      </Container>

      {/* Fixed to the screen's end edge; rendered here so it exists once per page. */}
      <ScrollTopButton label={t.backToTop} />
    </footer>
  );
}
