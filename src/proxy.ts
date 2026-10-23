import { NextResponse, type NextRequest } from "next/server";

import { portalLinks } from "@/config/site";
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

/** Sign-in and sign-up URLs (from the old xwavy.com) that belong to the portal. */
const portalRoutes: Record<string, keyof typeof portalLinks> = {
  login: "signIn",
  signin: "signIn",
  signup: "signUpInnovator",
  "submit-idea": "signUpInnovator",
};

/** Old xwavy.com pages whose content now lives on this site under another name. */
const movedPages: Record<string, string> = {
  investors: "/for-investors",
};

/** Old xwavy.com URLs go where they live now (the portal, or a renamed page here); everything else gets a locale. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const hasLocale = isLocale(segments[0]);
  const [page, ...subpath] = hasLocale ? segments.slice(1) : segments;

  // Portal pages leave for the portal, unless it is configured on this very
  // host (PORTAL_URL not set yet): redirecting there would loop. The Host
  // header is what the visitor requested; nextUrl.host can be the bind address.
  const portalKey = page ? portalRoutes[page] : undefined;
  if (portalKey && (subpath.length === 0 || page === "signup")) {
    const target = new URL(portalLinks[portalKey]);
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;
    if (target.host !== host) return NextResponse.redirect(target);
  }

  const moved = page && subpath.length === 0 ? movedPages[page] : undefined;
  if (moved) {
    const url = request.nextUrl.clone();
    url.pathname = `/${hasLocale ? segments[0] : detectLocale(request)}${moved}`;
    return NextResponse.redirect(url, 308);
  }

  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next.js internals, API routes and files with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
