"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  items: { label: string; href: string }[];
  locale: Locale;
  labels: {
    menu: string;
    open: string;
    close: string;
    signIn: string;
    postIdea: string;
    browseIdeas: string;
    language: string;
    contact: string;
  };
  signInHref: string;
  postIdeaHref: string;
  browseHref: string;
  email: string;
};

/** Below this width the inline navigation is hidden and this menu takes over. */
const DESKTOP_QUERY = "(min-width: 1280px)";
/** The menu's curtain easing: slow in, slow out. */
const CURTAIN = [0.76, 0, 0.24, 1] as const;

const subscribeNoop = () => () => {};

/**
 * Full-screen menu for screens narrower than xl. It opens as a circle that
 * grows from the toggle to cover the screen, then the links rise in one by
 * one. While open: the page can't scroll, focus stays inside (the toggle and
 * the menu), Escape or any link closes it, and focus returns to the toggle.
 * Reduced motion: it simply appears and disappears.
 */
export function MobileMenu({ items, locale, labels, signInHref, postIdeaHref, browseHref, email }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0, r: 0 });
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // Portals need the DOM, so render the overlay only after hydration.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  function toggle() {
    if (!open) {
      const rect = toggleRef.current?.getBoundingClientRect();
      if (rect) {
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        setOrigin({ x, y, r });
      }
    }
    setOpen((value) => !value);
  }

  const close = () => setOpen(false);

  // Close if the window grows to the desktop layout.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // While open: lock scrolling, move focus in, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current || !toggleRef.current) return;
      const focusable = [
        toggleRef.current,
        ...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [open, lenis]);

  const at = `${origin.x}px ${origin.y}px`;
  const curtain = { duration: reduce ? 0 : 0.75, ease: CURTAIN };
  const rise = (i: number) => ({ duration: reduce ? 0 : 0.55, ease: CURTAIN, delay: reduce ? 0 : 0.28 + i * 0.05 });

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={toggle}
        className={cn(
          "relative grid size-11 place-items-center rounded-(--radius-control) transition-colors duration-300",
          open ? "bg-cyan text-night" : "text-fog hover:bg-white/[0.06]",
        )}
      >
        {/* Two bars that cross into an X. */}
        <span aria-hidden className="relative block h-3.5 w-5">
          <span className={cn("absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition-transform duration-300 ease-brand", open && "translate-y-1.5 rotate-45")} />
          <span className={cn("absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-current transition-transform duration-300 ease-brand", open && "-translate-y-1.5 -rotate-45")} />
        </span>
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  ref={panelRef}
                  id={panelId}
                  role="dialog"
                  aria-modal="true"
                  aria-label={labels.menu}
                  initial={{ clipPath: `circle(0px at ${at})` }}
                  animate={{ clipPath: `circle(${origin.r + 40}px at ${at})` }}
                  exit={{ clipPath: `circle(0px at ${at})`, transition: { ...curtain, duration: reduce ? 0 : 0.55 } }}
                  transition={curtain}
                  style={{ zIndex: "calc(var(--z-header) - 1)" }}
                  className="surface-night fixed inset-0 overflow-x-hidden overflow-y-auto overscroll-contain"
                  data-lenis-prevent
                >
                  <div className="site-container flex min-h-full flex-col pt-[calc(var(--spacing-header)+2rem)] pb-[calc(var(--panel-inset)+1.5rem)]">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: rise(0) }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="flex items-center gap-3 font-display text-base tracking-[0.2em] text-haze uppercase"
                    >
                      <Image src="/brand/xwavy-mark.png" alt="" aria-hidden width={24} height={24} className="size-6 shrink-0 rounded-[0.4rem] ring-1 ring-white/15" />
                      {labels.menu}
                    </motion.p>

                    <nav aria-label={labels.menu} className="mt-6">
                      <ol className="flex flex-col">
                        {items.map((item, i) => {
                          const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
                          return (
                            <li key={item.href} className="overflow-hidden border-b border-white/10">
                              <motion.div
                                initial={{ y: "105%" }}
                                animate={{ y: 0, transition: rise(i) }}
                                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                              >
                                <Link
                                  ref={i === 0 ? firstLinkRef : undefined}
                                  href={item.href}
                                  onClick={close}
                                  aria-current={current ? "page" : undefined}
                                  className="group flex min-h-14 items-center gap-4 py-3 sm:min-h-16"
                                >
                                  <span className={cn("w-6 shrink-0 font-display text-base tracking-[0.08em]", current ? "text-cyan" : "text-haze")} data-numeric dir="ltr">
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                  <span
                                    className={cn(
                                      "min-w-0 flex-1 font-display text-[clamp(1.875rem,8vw,3rem)] leading-[1.05] transition-colors duration-300",
                                      current ? "text-cyan" : "text-fog group-hover:text-cyan",
                                    )}
                                  >
                                    {item.label}
                                  </span>
                                  <span
                                    aria-hidden
                                    className={cn(
                                      "grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45",
                                      current ? "border-cyan bg-cyan text-night" : "border-white/15 text-haze group-hover:border-cyan group-hover:text-cyan",
                                    )}
                                  >
                                    <ArrowUpRight className="size-4" />
                                  </span>
                                </Link>
                              </motion.div>
                            </li>
                          );
                        })}
                      </ol>
                    </nav>

                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0, transition: rise(items.length) }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="mt-auto flex flex-col gap-4 pt-10"
                    >
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button href={postIdeaHref} variant="primary" size="lg" arrow onClick={close} className="w-full justify-between">
                          {labels.postIdea}
                        </Button>
                        <Button href={browseHref} variant="accent" size="lg" arrow onClick={close} className="w-full justify-between">
                          {labels.browseIdeas}
                        </Button>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                        <a href={`mailto:${email}`} className="flex min-w-0 items-center gap-3 text-base text-haze transition-colors hover:text-fog">
                          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-cyan">
                            <Mail aria-hidden className="size-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-base">{labels.contact}</span>
                            <span className="block truncate text-fog">{email}</span>
                          </span>
                        </a>
                        <div className="flex items-center gap-1">
                          <Link href={signInHref} onClick={close} className="inline-flex min-h-10 items-center rounded-full px-4 text-base text-fog transition-colors hover:bg-white/10">
                            {labels.signIn}
                          </Link>
                          <LanguageSwitcher current={locale} label={labels.language} />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}
