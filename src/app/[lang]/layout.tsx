import type { Metadata, Viewport } from "next";
import { Alexandria, Geist_Mono, Google_Sans, IBM_Plex_Sans_Arabic, Sora } from "next/font/google";

import { MotionProvider } from "@/components/animation/MotionProvider";
import { SmoothScrollProvider } from "@/components/animation/SmoothScrollProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { localeMeta, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

import "../globals.css";

// Headings: a confident geometric display face (variable weight).
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

// Descriptions, body copy and UI text.
const googleSans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
  display: "swap",
  // Next has no metric overrides for this family yet; fall back to the system UI face.
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "Arial", "sans-serif"],
});

// Labels and figures only, so it is not preloaded.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

// Arabic faces. Only the Arabic subset, so they download only when Arabic
// glyphs render; not preloaded to keep English pages light.
const alexandria = Alexandria({
  subsets: ["arabic"],
  variable: "--font-alexandria",
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

const fontVariables = [sora, googleSans, geistMono, alexandria, plexArabic]
  .map((font) => font.variable)
  .join(" ");

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();
  const siteUrl = process.env.SITE_URL;

  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
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
    },
    twitter: { card: "summary", title: dict.meta.title, description: dict.meta.description },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050a17",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <html lang={locale} dir={localeMeta[locale].dir} className={`${fontVariables} js notranslate`} translate="no" suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="z-skip-link fixed inset-s-3 top-3 translate-y-[-200%] rounded-full bg-abyss px-5 py-3 text-sm font-semibold text-white focus-visible:translate-y-0"
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
      </body>
    </html>
  );
}
