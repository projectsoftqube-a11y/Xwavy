import type { Metadata } from "next";

import { localeMeta, type Locale } from "@/i18n/config";

/**
 * Social share card (1200 × 630) for links posted to WhatsApp, LinkedIn, X
 * and the like. One per language, in public/og/.
 */
export function shareImage(locale: Locale) {
  return {
    url: `/og/xwavy-${locale}.jpg`,
    width: 1200,
    height: 630,
    alt: locale === "ar" ? "Xwavy: حيث تلتقي الأفكار بالاستثمار" : "Xwavy: where ideas meet investment",
  };
}

/**
 * Per-page metadata with correct hreflang alternates: each page points at its
 * own /en and /ar versions (not the home page). `path` is locale-free, e.g.
 * "/pricing"; "" for home.
 */
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, ar: `/ar${path}`, "x-default": `/en${path}` },
    },
    openGraph: { title, description, locale: localeMeta[locale].ogLocale, type: "website", siteName: "Xwavy", images: [shareImage(locale)] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage(locale)] },
  };
}
