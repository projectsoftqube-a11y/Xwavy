import type { Metadata, Viewport } from "next";
import { Cairo, IBM_Plex_Sans_Arabic, Oswald, Poppins } from "next/font/google";

import { Analytics } from "@/components/analytics/Analytics";
import { MotionProvider } from "@/components/animation/MotionProvider";
import { SmoothScrollProvider } from "@/components/animation/SmoothScrollProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { gaMeasurementId, siteUrl } from "@/config/site";
import { localeMeta, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/href";
import { shareImage } from "@/lib/metadata";

import "../globals.css";
// The breakpoint ladder, after the base styles so its queries win.
import "../responsive.css";

// Titles: a tall condensed grotesk, set large and in capitals for display sizes.
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

// Interface and body copy.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Arabic faces. Only the Arabic subset, so they download only when Arabic
// glyphs render; not preloaded to keep English pages light. Cairo is the
// bold counterpart for titles; Plex Sans Arabic carries the text.
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

const fontVariables = [oswald, poppins, cairo, plexArabic]
  .map((font) => font.variable)
  .join(" ");

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();

  return {
    metadataBase: siteUrl,
    title: { default: dict.meta.title, template: dict.meta.titleTemplate },
    description: dict.meta.description,
    applicationName: "Xwavy",
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "Xwavy",
      locale: localeMeta[locale].ogLocale,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [shareImage(locale)],
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description, images: [shareImage(locale)] },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060709",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <html lang={locale} dir={localeMeta[locale].dir} className={`${fontVariables} js notranslate`} translate="no" suppressHydrationWarning>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before React
          hydrates; ignore those, as on <html>. Only this element's own attributes are exempt. */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="z-skip-link fixed inset-s-3 top-3 translate-y-[-200%] rounded-full bg-cyan px-5 py-3 text-base font-semibold text-night focus-visible:translate-y-0"
        >
          {dict.common.skipToContent}
        </a>
        <MotionProvider>
          <SmoothScrollProvider>
            <SiteHeader locale={locale} dict={dict} />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <SiteFooter locale={locale} dict={dict} />
          </SmoothScrollProvider>
        </MotionProvider>
        {gaMeasurementId ? (
          <Analytics measurementId={gaMeasurementId} labels={dict.common.cookies} policyHref={localeHref(locale, "/legal/cookies")} />
        ) : null}
      </body>
    </html>
  );
}
