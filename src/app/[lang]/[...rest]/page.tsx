import { notFound } from "next/navigation";

/**
 * Any URL under /en or /ar that matches no page renders the localized 404
 * (../not-found.tsx, inside the site layout) instead of Next's plain one.
 * Unprefixed URLs reach here too: the proxy adds the locale first.
 */
export default function UnknownPage() {
  notFound();
}
