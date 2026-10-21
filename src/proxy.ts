import { NextResponse, type NextRequest } from "next/server";

import { arabicDefaultCountries, defaultLocale, isLocale, localeCookie, type Locale } from "@/i18n/config";

/**
 * Sends visitors without a locale prefix to /en or /ar.
 *
 * Order of preference: an explicit choice (cookie), then Arabic for visitors
 * detected in Saudi Arabia, then the browser's Accept-Language, then English.
 * Country detection relies on the hosting platform's geo header; when the
 * header is absent (e.g. local development) Accept-Language decides.
 */
function detectLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookie)?.value;
  if (isLocale(saved)) return saved;

  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code");
  if (country && (arabicDefaultCountries as readonly string[]).includes(country.toUpperCase())) {
    return "ar";
  }

  const preferred = request.headers
    .get("accept-language")
    ?.split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find((entry) => isLocale(entry.lang));

  return isLocale(preferred?.lang) ? preferred.lang : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next.js internals, API routes and files with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
