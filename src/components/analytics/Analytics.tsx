"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/get-dictionary";

type Consent = "granted" | "denied";

/** Remembers the visitor's analytics choice for a year. */
const CONSENT_COOKIE = "XWAVY_CONSENT";
/** Fired when the choice changes, so every subscriber re-reads the cookie. */
const CONSENT_CHANGED = "xwavy:consent-changed";
/** Fired by the footer's "Cookie settings" link to bring the banner back. */
export const OPEN_COOKIE_SETTINGS = "xwavy:cookie-settings";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsent(): Consent | "unset" {
  const match = document.cookie.match(/(?:^|; )XWAVY_CONSENT=(granted|denied)/);
  return (match?.[1] as Consent | undefined) ?? "unset";
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGED, onChange);
  return () => window.removeEventListener(CONSENT_CHANGED, onChange);
}

/** Deletes Google Analytics cookies (_ga, _ga_<id>) when consent is withdrawn. */
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  const names = document.cookie
    .split("; ")
    .map((cookie) => cookie.split("=")[0] ?? "")
    .filter((name) => name.startsWith("_ga"));
  for (const name of names) {
    for (const domain of domains) document.cookie = `${name}=; path=/; max-age=0${domain ? `; domain=${domain}` : ""}`;
  }
}

type AnalyticsProps = {
  /** GA4 measurement ID (G-…). The component is only rendered when one is set. */
  measurementId: string;
  labels: Dictionary["common"]["cookies"];
  policyHref: string;
};

/**
 * Google Analytics behind a consent banner. Nothing loads and no analytics
 * cookie is set until the visitor accepts; declining (now or later, from the
 * footer's "Cookie settings") turns collection off and removes GA cookies.
 * The server renders nothing: the choice lives in a cookie read in the browser.
 */
export function Analytics({ measurementId, labels, policyHref }: AnalyticsProps) {
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  function choose(value: Consent) {
    document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    if (value === "denied") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
    }
    setReopened(false);
    window.dispatchEvent(new Event(CONSENT_CHANGED));
  }

  const showBanner = consent === "unset" || (consent !== null && reopened);

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config',${JSON.stringify(measurementId)});`}
          </Script>
        </>
      ) : null}

      {showBanner ? (
        <div className="pointer-events-none fixed inset-x-(--panel-inset) bottom-(--panel-inset) z-header flex justify-end">
          <section aria-label={labels.label} className="surface-navy pointer-events-auto w-full rounded-3xl border border-white/15 p-5 shadow-elevated sm:max-w-md">
            <p className="text-sm text-mist">
              {labels.message}{" "}
              <Link href={policyHref} className="text-white underline underline-offset-2 transition-colors hover:text-cyan">
                {labels.policy}
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => choose("granted")}>
                {labels.accept}
              </Button>
              <Button size="sm" variant="outline-inverse" onClick={() => choose("denied")}>
                {labels.decline}
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
