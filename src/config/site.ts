/**
 * Locale-independent constants. All visible copy lives in src/i18n.
 * Server-side only: the URLs below read environment variables at build time.
 */

/**
 * This website's public address. Canonical and hreflang URLs, the sitemap and
 * social images resolve against it. Override with SITE_URL (e.g. on staging).
 */
export const siteUrl = new URL(process.env.SITE_URL ?? "https://www.xwavy.com");

/**
 * The portal (sign in, sign up, idea directory) is a separate product. Set
 * PORTAL_URL to its address once it is live (e.g. https://app.xwavy.com);
 * until then it falls back to the current xwavy.com platform. If the new
 * portal names its pages differently, change the paths in `portalPaths`.
 */
export const portalUrl = new URL(process.env.PORTAL_URL ?? "https://www.xwavy.com");

const portalPaths = {
  signIn: "/login",
  signUpInnovator: "/submit-idea",
  browseIdeas: "/ideas",
} as const;

/** Where the website hands visitors over to the portal; every button on the site follows these. */
export const portalLinks = Object.fromEntries(
  Object.entries(portalPaths).map(([key, path]) => [key, new URL(path, portalUrl).href]),
) as Record<keyof typeof portalPaths, string>;

/**
 * True when the portal resolves to this website's own host, which is the case
 * until PORTAL_URL is set: portal links would then lead back to this site.
 * (The proxy also checks the live request host, so this can never loop.)
 */
const portalSharesSiteHost = portalUrl.host === siteUrl.host;

if (portalSharesSiteHost && process.env.NODE_ENV === "production") {
  console.warn(`[xwavy] PORTAL_URL (${portalUrl.origin}) is this website's own host. Set PORTAL_URL to the portal's address.`);
}

/** Google Analytics 4 measurement ID. Analytics and the cookie banner stay off until it is set. */
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export const siteConfig = {
  name: "Xwavy",
  /** Contact address published on the current xwavy.com. */
  email: "info@xwavy.com",
  logo: {
    /** Cyan wordmark on transparent background. Designed for dark surfaces. */
    src: "/brand/xwavy-logo.png",
    width: 993,
    height: 241,
    alt: "Xwavy",
  },
} as const;
