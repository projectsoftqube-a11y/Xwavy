import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

type ContainerElement = "div" | "section" | "header" | "footer" | "nav" | "main" | "article" | "aside";

type ContainerProps<T extends ContainerElement> = {
  as?: T;
  /**
   * `site` (default): the site container, 1620px wide on large screens down to 90% of the screen (responsive.css).
   * `prose`: the same, capped at a readable line length for long-form text such as legal pages.
   */
  width?: "site" | "prose";
} & ComponentPropsWithoutRef<T>;

const widths = {
  site: "",
  prose: "max-w-prose",
} as const;

/**
 * Centres content in the site container: a fixed width per breakpoint, no
 * padding (responsive.css). Section backgrounds go on the parent element so
 * they can span the viewport.
 */
export function Container<T extends ContainerElement = "div">({
  as,
  width = "site",
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={cn("site-container", widths[width], className)} {...props} />;
}
