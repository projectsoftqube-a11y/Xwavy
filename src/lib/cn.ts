type ClassValue = string | false | null | undefined;

/**
 * Joins class names, skipping falsy values.
 *
 * This does not resolve Tailwind conflicts (e.g. `px-4` + `px-8`). Components
 * expose props for their variable styles instead of relying on overrides, so
 * pass `className` for additions such as margins or grid placement.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
