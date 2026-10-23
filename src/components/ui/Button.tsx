import { ArrowRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "secondary" | "outline-inverse";
export type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow in a round chip; it slides through on hover. Mirrors automatically in RTL. */
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
  // Wave cyan with night text (13:1). The main call to action, any surface.
  primary: {
    button: "bg-cyan text-night hover:shadow-[0_0_0_4px_rgb(0_225_234/0.16),0_20px_50px_-18px_rgb(0_225_234/0.85)]",
    chip: "bg-night text-cyan",
  },
  // Capital gold with night text (12:1). Investor-facing actions.
  accent: {
    button: "bg-gold text-night hover:shadow-[0_0_0_4px_rgb(255_181_71/0.16),0_20px_50px_-18px_rgb(255_181_71/0.8)]",
    chip: "bg-night text-gold",
  },
  // Fog fill: a quiet light button on night surfaces.
  secondary: {
    button: "bg-fog text-night hover:shadow-[0_0_0_4px_rgb(255_255_255/0.12),0_20px_50px_-18px_rgb(255_255_255/0.5)]",
    chip: "bg-night text-fog",
  },
  // Glass with a hairline border, for night surfaces; the border lights cyan on hover.
  "outline-inverse": {
    button: "border border-white/20 bg-white/[0.04] text-fog backdrop-blur-md hover:border-cyan/70 hover:bg-white/[0.07] hover:shadow-[0_0_0_4px_rgb(0_225_234/0.08)]",
    chip: "bg-fog text-night",
  },
};

// Vertical padding only shows when a label wraps (phones); one line is held by min-h.
// With an arrow, the round chip sits 6px inside the end of the pill.
const sizes: Record<ButtonSize, { button: string; withArrow: string; chip: string }> = {
  sm: { button: "min-h-10 px-5 py-1.5", withArrow: "ps-5 pe-1.5", chip: "size-7" },
  md: { button: "min-h-12 px-6 py-1.5", withArrow: "ps-6 pe-1.5", chip: "size-9" },
  lg: { button: "min-h-14 px-8 py-1.5", withArrow: "ps-7 pe-1.5", chip: "size-11" },
};

function buttonClasses({ variant = "primary", size = "md", arrow, className }: Omit<SharedProps, "children">) {
  return cn(
    // One line from sm up; below it a label wider than a 320px screen wraps instead of overflowing.
    "group/button relative isolate inline-flex items-center justify-center gap-4 overflow-hidden rounded-full text-center text-base font-medium tracking-[-0.01em] whitespace-nowrap max-sm:whitespace-normal",
    // Nothing moves on hover: colour, border and glow only. A slight press on click.
    "transition-[background-color,border-color,color,box-shadow,scale] duration-500 ease-brand active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress",
    variants[variant].button,
    sizes[size].button,
    arrow && sizes[size].withArrow,
    className,
  );
}

function Content({ variant = "primary", size = "md", arrow, children }: Omit<SharedProps, "className">) {
  return (
    <>
      {/* A soft light that sweeps across on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/35 to-transparent opacity-0 transition-[translate,opacity] duration-700 ease-brand group-hover/button:translate-x-[320%] group-hover/button:opacity-100"
      />
      {/* The label rolls up and a copy rolls in from below. Never squeezed from sm up (it would clip);
          on phones it may shrink so it can wrap. Balance only where wrapping is allowed. */}
      <span className="relative block overflow-hidden leading-snug max-sm:text-balance sm:shrink-0">
        <span className="block transition-transform duration-500 ease-brand group-hover/button:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-x-0 top-full block transition-transform duration-500 ease-brand group-hover/button:-translate-y-full">
          {children}
        </span>
      </span>
      {arrow ? (
        <span aria-hidden className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full", variants[variant].chip, sizes[size].chip)}>
          {/* The arrow slides out and a twin slides in from behind, inside the chip. */}
          <ArrowRight className="size-4 transition-transform duration-500 ease-brand group-hover/button:translate-x-[220%] rtl:-scale-x-100 rtl:group-hover/button:-translate-x-[220%]" />
          <ArrowRight className="absolute size-4 -translate-x-[220%] transition-transform duration-500 ease-brand group-hover/button:translate-x-0 rtl:translate-x-[220%] rtl:-scale-x-100 rtl:group-hover/button:translate-x-0" />
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
 * are never nested. A pill, 40px (sm) to 56px (lg) tall for touch targets.
 * On hover it stays still: the label rolls, a light sweeps across, the arrow
 * slides through its chip and the button glows in its own colour.
 */
export function Button(props: ButtonProps) {
  return props.href !== undefined ? <LinkButton {...props} /> : <NativeButton {...props} />;
}
