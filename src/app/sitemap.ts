import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";
import { locales } from "@/i18n/config";
import { LEGAL_SLUGS } from "@/i18n/pages/legal";

/** Every page under src/app/[lang], without the locale. Add new pages here. */
const pages = [
  "",
  "/how-it-works",
  "/for-innovators",
  "/for-investors",
  "/pricing",
  "/ideas",
  "/about",
  "/contact",
  "/legal",
  ...LEGAL_SLUGS.map((slug) => `/legal/${slug}`),
];

/** Each page in both languages, each entry pointing at its other-language twin. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: string, path: string) => new URL(`/${locale}${path}`, siteUrl).href;

  return pages.flatMap((path) =>
    locales.map((locale) => ({
      url: url(locale, path),
      alternates: {
        languages: { en: url("en", path), ar: url("ar", path), "x-default": url("en", path) },
      },
    })),
  );
}
