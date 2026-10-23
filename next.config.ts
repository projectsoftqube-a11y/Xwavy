import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Short legal URLs resolve to the legal section. Portal URLs (/login,
    // /signup, /submit-idea) are redirected in src/proxy.ts, which reads
    // PORTAL_URL and guards against redirecting to this site's own host.
    return ["terms", "privacy", "cookies", "acceptable-use", "no-advice-disclaimer"].map((slug) => ({
      source: `/:lang(en|ar)/${slug}`,
      destination: `/:lang/legal/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;