import type { Metadata } from "next";

import { localeMeta, type Locale } from "@/i18n/config";

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
    openGraph: { title, description, locale: localeMeta[locale].ogLocale, type: "website", siteName: "Xwavy" },
    twitter: { card: "summary", title, description },
  };
}
