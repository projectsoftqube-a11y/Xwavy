/**
 * Locale-independent constants. All visible copy lives in src/i18n.
 *
 * No canonical domain is configured yet: set SITE_URL once the production
 * domain is confirmed by Wavy Solutions (see README).
 */

/**
 * Where the website hands visitors over to the portal, a separate product.
 * These point at the current xwavy.com until the new portal's addresses are
 * confirmed; replace them here and every button on the site follows.
 */
export const portalLinks = {
  signIn: "https://www.xwavy.com/login",
  signUpInnovator: "https://www.xwavy.com/login",
  browseIdeas: "https://www.xwavy.com/ideas",
} as const;

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
