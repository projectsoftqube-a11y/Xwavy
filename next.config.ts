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
    // Short legal URLs resolve to the legal section; portal pages live on the portal.
    const legal = ["terms", "privacy", "cookies", "acceptable-use", "no-advice-disclaimer"].map((slug) => ({
      source: `/:lang(en|ar)/${slug}`,
      destination: `/:lang/legal/${slug}`,
      permanent: true,
    }));
    return [
      ...legal,
      {
        source: "/login",
        destination: "https://www.xwavy.com/login",
        permanent: false,
      },
      {
        source: "/signin",
        destination: "https://www.xwavy.com/login",
        permanent: false,
      },
      {
        source: "/signup",
        destination: "https://www.xwavy.com/login",
        permanent: false,
      },
      {
        source: "/signup/:path*",
        destination: "https://www.xwavy.com/login",
        permanent: false,
      },
      {
        source: "/:lang(en|ar)/login",
        destination: "https://www.xwavy.com/login",
        permanent: false,
      },
      {
        source: "/:lang(en|ar)/signin",
        destination: "https://www.xwavy.com/login",
        permanent: false,
      },
      {
        source: "/:lang(en|ar)/signup",
        destination: "https://www.xwavy.com/login",
        permanent: false,
      },
      {
        source: "/:lang(en|ar)/signup/:path*",
        destination: "https://www.xwavy.com/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;