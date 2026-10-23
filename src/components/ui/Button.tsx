import { ArrowRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "secondary" | "outline" | "outline-inverse";
export type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow in a round chip (house style). Mirrors automatically in RTL. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type NativeButtonProps = SharedProps & {
  href?: never;
  /** Shows a spinner, disables the button and sets aria-busy. */
  loading?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, keyof SharedProps>;

type LinkButtonProps = SharedProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, keyof SharedProps | "href">;

export type ButtonProps = NativeButtonProps | LinkButtonProps;

const variants: Record<ButtonVariant, { button: string; chip: string }> = {
  // Wave cyan with abyss text (12.2:1). The main call to action, any surface.
  primary: { button: "bg-cyan text-abyss hover:shadow-[0_14px_32px_-14px_var(--color-cyan)]", chip: "bg-abyss text-cyan" },
  // Capital gold with abyss text (11.3:1). Investor-facing actions.
  accent: { button: "bg-gold text-abyss hover:shadow-[0_14px_32px_-14px_var(--color-gold)]", chip: "bg-abyss text-gold" },
  // Abyss fill for light surfaces.
  secondary: { button: "bg-abyss text-white hover:bg-navy-raised", chip: "bg-white text-abyss" },
  // Bordered, for light surfaces.
  outline: {
    button: "border border-field/40 bg-white text-ink hover:border-ink",
    chip: "bg-abyss text-white",
  },
  // Bordered, for dark surfaces.
  "outline-inverse": {
    button: "border border-white/20 text-white hover:border-white/60 hover:bg-white/5",
    chip: "bg-white text-abyss",
  },
};

// Vertical padding only shows when a label wraps (phones); one line is held by min-h.
const sizes: Record<ButtonSize, { button: string; withArrow: string; chip: string }> = {
  sm: { button: "min-h-10 px-5 py-1.5 text-sm", withArrow: "ps-5 pe-1.5", chip: "size-7" },
  md: { button: "min-h-12 px-6 py-2 text-[0.9375rem]", withArrow: "ps-6 pe-2", chip: "size-8" },
  lg: { button: "min-h-14 px-8 py-2 text-base", withArrow: "ps-7 pe-2", chip: "size-10" },
};

function buttonClasses({ variant = "primary", size = "md", arrow, className }: Omit<SharedProps, "children">) {
  return cn(
    // One line from sm up; below it a label wider than a 320px screen wraps instead of overflowing.
    "group/button inline-flex items-center justify-center gap-3 rounded-full text-center font-medium tracking-[-0.01em] whitespace-nowrap max-sm:whitespace-normal",
    "transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress",
    variants[variant].button,
    sizes[size].button,
    arrow && sizes[size].withArrow,
    className,
  );
}

function Content({ variant = "primary", size = "md", arrow, children }: Omit<SharedProps, "className">) {
  return (
    <>
      {/* Balance only where wrapping is allowed: `text-wrap: balance` would also re-enable wrapping from sm up. */}
      <span className="leading-snug max-sm:text-balance">{children}</span>
      {arrow ? (
        <span
          aria-hidden
          className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full", variants[variant].chip, sizes[size].chip)}
        >
          {/* The arrow slides out and a twin slides in from behind. */}
          <ArrowRight className="size-4 transition-transform duration-300 ease-brand group-hover/button:translate-x-[180%] rtl:-scale-x-100 rtl:group-hover/button:-translate-x-[180%]" />
          <ArrowRight className="absolute size-4 -translate-x-[180%] transition-transform duration-300 ease-brand group-hover/button:translate-x-0 rtl:translate-x-[180%] rtl:-scale-x-100 rtl:group-hover/button:translate-x-0" />
        </span>
      ) : null}
    </>
  );
}

/** External, mail and phone links render a plain <a>; in-app routes use <Link>. */
function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function LinkButton({ href, variant, size, arrow, className, children, ...rest }: LinkButtonProps) {
  const classes = buttonClasses({ variant, size, arrow, className });
  const content = (
    <Content variant={variant} size={size} arrow={arrow}>
      {children}
    </Content>
  );

  return isExternal(href) ? (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

function NativeButton({
  variant,
  size,
  arrow,
  className,
  children,
  loading = false,
  disabled,
  type = "button",
  ...rest
}: NativeButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, arrow, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : null}
      <Content variant={variant} size={size} arrow={arrow}>
        {children}
      </Content>
    </button>
  );
}

/**
 * Renders a <button>, or a link when `href` is given, so interactive elements
 * are never nested. Heights run from 40px (sm) to 56px (lg) for touch targets.
 */
export function Button(props: ButtonProps) {
  return props.href !== undefined ? <LinkButton {...props} /> : <NativeButton {...props} />;
}
