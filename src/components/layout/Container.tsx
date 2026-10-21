import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

type ContainerElement = "div" | "section" | "header" | "footer" | "nav" | "main" | "article" | "aside";

type ContainerProps<T extends ContainerElement> = {
  as?: T;
  /**
   * `site` (default) caps content at 1520px, and at 90% of the width from 1600px. `prose` caps it at a readable
   * line length for long-form text such as legal pages.
   */
  width?: "site" | "prose";
} & ComponentPropsWithoutRef<T>;

const widths = {
  site: "max-w-site",
  prose: "max-w-prose",
} as const;

/**
 * Centers content with fluid side padding (16px at 320px, up to 64px).
 * Section backgrounds go on the parent element so they can span the viewport.
 */
export function Container<T extends ContainerElement = "div">({
  as,
  width = "site",
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={cn("mx-auto w-full px-gutter", widths[width], className)} {...props} />;
}
