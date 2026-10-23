"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Mail, ShieldAlert } from "lucide-react";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type copy from "@/i18n/pages/contact";
import { cn } from "@/lib/cn";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, MEDIA } from "@/lib/motion";

type ContactHeroProps = { t: (typeof copy)["en"]; email: string };

const field = "w-full rounded-xl border px-4 py-3.5 text-fog transition-colors placeholder:text-dim focus:outline-2";
const fieldOk = "border-hair-strong bg-night hover:border-fog/40 focus:border-cyan focus:outline-cyan/30";
const fieldError = "border-danger bg-danger/[0.05] focus:border-danger focus:outline-danger/30";

type Field = "name" | "email" | "message";
const FIELDS: readonly Field[] = ["name", "email", "message"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN = 10;

/** The message for a field that needs fixing, or null when it is fine. */
function check(field: Field, value: string, errors: ContactHeroProps["t"]["form"]["errors"]): string | null {
  const text = value.trim();
  if (field === "name") return text ? null : errors.name;
  if (field === "email") return !text ? errors.emailMissing : EMAIL.test(text) ? null : errors.emailInvalid;
  return !text ? errors.message : text.length < MESSAGE_MIN ? errors.messageShort : null;
}

/** A red message under a field; announced politely when it appears. */
function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div aria-live="polite">
      <AnimatePresence initial={false}>
        {children ? (
          <motion.p
            id={id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.base, ease: EASE.brand }}
            className="overflow-hidden"
          >
            <span className="flex items-start gap-2 pt-2 text-base text-danger">
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
              {children}
            </span>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/**
 * Contact, form first, on night: the heading and direct email on the start
 * side, the message form as a glowing glass card on the end side. There is
 * one confirmed inbox, so the topic routes by subject line: submitting opens
 * the visitor's email app with everything filled in. Nothing is sent from the
 * website itself. Fields are checked as they are left and on submit; a field
 * that needs fixing turns red with its message underneath, and submitting
 * moves focus to the first one. On load the title rises letter by letter and the card
 * lifts in; the fields follow.
 */
export function ContactHero({ t, email }: ContactHeroProps) {
  const root = useRef<HTMLElement>(null);
  const id = useId();
  const [topic, setTopic] = useState(t.form.topics[0] ?? "");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const form = useRef<HTMLFormElement>(null);

  const valueOf = (name: Field) => {
    const element = form.current?.elements.namedItem(name);
    return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement ? element.value : "";
  };

  const validate = (name: Field) => {
    const message = check(name, valueOf(name), t.form.errors);
    setErrors((current) => ({ ...current, [name]: message ?? undefined }));
    return message;
  };

  /** Re-check while typing only once a field is showing an error, so it clears as soon as it is fixed. */
  const recheck = (name: Field) => {
    if (errors[name]) validate(name);
  };

  const describe = (name: Field) => (errors[name] ? `${id}-${name}-error` : undefined);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.reducedMotion, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      });
      mm.add(MEDIA.motionOk, () => {
        const arabic = document.documentElement.lang === "ar";
        const rtl = document.documentElement.dir === "rtl";
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(q("[data-hero-rule]"), { scaleX: 0, duration: 1.1 }, 0.1)
          .from(q("[data-hero-eyebrow]"), { x: rtl ? 16 : -16, autoAlpha: 0, duration: 1 }, 0.15)
          .from(q("[data-hero-fade]"), { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.1 }, 0.5)
          .from(q("[data-form-card]"), { y: 80, autoAlpha: 0, duration: 1.4 }, 0.3)
          .from(q("[data-form-row]"), { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.07 }, 0.6);

        const split = SplitText.create(q("[data-hero-title]"), {
          type: arabic ? "lines,words" : "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => gsap.from(arabic ? self.words : self.chars, { yPercent: 120, duration: 1.2, ease: "expo.out", stagger: arabic ? 0.07 : 0.02, delay: 0.2 }),
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = FIELDS.map((name) => [name, validate(name)] as const).filter(([, message]) => message);
    if (found.length) {
      const first = found[0]?.[0];
      const element = first ? form.current?.elements.namedItem(first) : null;
      if (element instanceof HTMLElement) element.focus();
      return;
    }
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `[${topic}] ${name}`.trim();
    const body = `${message}\n\n${name}${from ? ` <${from}>` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section ref={root} aria-labelledby="ct-title" className="relative isolate overflow-hidden bg-night">
      <span aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <span aria-hidden className="glow-cyan pointer-events-none absolute -top-60 start-[-14rem] -z-10 size-[52rem] opacity-50" />
      <span aria-hidden className="glow-gold pointer-events-none absolute -bottom-72 end-[-12rem] -z-10 size-[48rem] opacity-35" />

      <Container className="grid grid-cols-1 gap-12 pt-[calc(var(--spacing-header)+4rem)] pb-section lg:grid-cols-12 lg:gap-14 lg:pt-[calc(var(--spacing-header)+6rem)]">
        <div data-intro className="flex flex-col gap-7 lg:col-span-5 lg:justify-center">
          <p data-hero-eyebrow className="flex items-center gap-3 font-display text-base tracking-[0.2em] text-cyan uppercase">
            <span aria-hidden data-hero-rule className="h-px w-10 shrink-0 origin-left bg-cyan rtl:origin-right" />
            {t.hero.eyebrow}
          </p>
          <h1 id="ct-title" data-hero-title className="text-display text-fog">
            {t.hero.titleLead} <span className="accent text-cyan">{t.hero.titleAccent}</span>
          </h1>
          <p data-hero-fade className="text-lead text-fog/80">
            {t.hero.body}
          </p>

          <a
            data-hero-fade
            href={`mailto:${email}`}
            className="group relative mt-2 flex w-full max-w-md items-center gap-4 overflow-hidden rounded-2xl border border-hair-strong bg-night-1 p-4 pe-6 transition-colors duration-500 hover:border-cyan/60"
          >
            <span aria-hidden className="absolute inset-0 bg-linear-to-r from-cyan/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rtl:bg-linear-to-l" />
            <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-cyan text-night shadow-[0_0_30px_-4px_rgb(0_225_234/0.6)]">
              <Mail aria-hidden className="size-5" />
            </span>
            <span className="relative min-w-0">
              <span className="block text-base text-haze">{t.form.directLabel}</span>
              <span className="block truncate font-display text-[1.25rem] font-semibold text-fog">{email}</span>
            </span>
          </a>

          <p data-hero-fade className="flex items-start gap-2.5 text-base text-haze">
            <ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
            {t.form.privacyNote}
          </p>
        </div>

        {/* The form. */}
        <div data-intro data-form-card className="min-w-0 lg:col-span-7">
          <form
            ref={form}
            noValidate
            onSubmit={onSubmit}
            aria-labelledby={`${id}-form-title`}
            className="border-glow relative flex flex-col gap-6 rounded-3xl p-5 shadow-[0_60px_140px_-60px_rgb(0_0_0/0.9)] [--card-fill:rgb(14_16_20/0.92)] sm:p-9"
          >
            <div data-form-row>
              <h2 id={`${id}-form-title`} className="font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-none font-semibold text-fog uppercase">
                {t.form.titleLead} <span className="accent text-cyan">{t.form.titleAccent}</span>
              </h2>
              <p className="mt-3 text-base text-haze">{t.form.description}</p>
            </div>

            <fieldset data-form-row className="flex flex-col">
              <legend className="mb-3 font-display text-base tracking-[0.14em] text-dim uppercase">{t.form.topicLabel}</legend>
              <div className="flex flex-wrap gap-2">
                {t.form.topics.map((option) => (
                  <label
                    key={option}
                    className="group/topic inline-flex cursor-pointer items-center gap-2 rounded-full border border-hair-strong px-4 py-2 text-base text-haze transition-colors hover:border-fog/50 hover:text-fog has-checked:border-cyan has-checked:bg-cyan has-checked:text-night has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-cyan"
                  >
                    <input type="radio" name="topic" value={option} checked={topic === option} onChange={() => setTopic(option)} className="sr-only" />
                    <Check aria-hidden strokeWidth={3} className={cn("size-3.5 transition-[width,opacity] duration-300", topic === option ? "w-3.5 opacity-100" : "w-0 opacity-0")} />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <div data-form-row className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-name`} className="text-base font-medium text-fog">
                  {t.form.nameLabel}
                </label>
                <input
                  id={`${id}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describe("name")}
                  onBlur={() => validate("name")}
                  onChange={() => recheck("name")}
                  className={cn(field, errors.name ? fieldError : fieldOk)}
                />
                <FieldError id={`${id}-name-error`}>{errors.name}</FieldError>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-email`} className="text-base font-medium text-fog">
                  {t.form.emailLabel}
                </label>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  dir="ltr"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describe("email")}
                  onBlur={() => validate("email")}
                  onChange={() => recheck("email")}
                  className={cn(field, errors.email ? fieldError : fieldOk)}
                />
                <FieldError id={`${id}-email-error`}>{errors.email}</FieldError>
              </div>
            </div>

            <div data-form-row className="flex flex-col gap-2">
              <label htmlFor={`${id}-message`} className="text-base font-medium text-fog">
                {t.form.messageLabel}
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                rows={5}
                required
                placeholder={t.form.messagePlaceholder}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describe("message")}
                onBlur={() => validate("message")}
                onChange={() => recheck("message")}
                className={cn(field, errors.message ? fieldError : fieldOk, "min-h-36 resize-y")}
              />
              <FieldError id={`${id}-message-error`}>{errors.message}</FieldError>
            </div>

            <div data-form-row>
              <Button type="submit" variant="primary" size="lg" arrow className="w-full sm:w-fit">
                {t.form.submit}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
