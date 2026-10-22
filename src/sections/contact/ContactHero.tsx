"use client";

import { Mail, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { useId, useRef, useState, type FormEvent } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type copy from "@/i18n/pages/contact";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, MEDIA } from "@/lib/motion";

type ContactHeroProps = { t: (typeof copy)["en"]; email: string };

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink transition-colors placeholder:text-muted hover:border-field focus:border-cyan-ink focus:bg-white focus:outline-2 focus:outline-cyan/40";

/**
 * Contact, form first: the heading and direct email on a dark panel, with the
 * message form on a white card beside it. There is one confirmed inbox, so
 * the topic routes by subject line: submitting opens the visitor's email app
 * with everything filled in. Nothing is sent from the website itself.
 */
export function ContactHero({ t, email }: ContactHeroProps) {
  const root = useRef<HTMLElement>(null);
  const id = useId();
  const [topic, setTopic] = useState(t.form.topics[0] ?? "");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.from(q("[data-hero-fade]"), { y: 30, autoAlpha: 0, duration: 0.9, ease: EASE.gsapOut, stagger: 0.08, delay: 0.1 });
        gsap.from(q("[data-form-card]"), { y: 50, autoAlpha: 0, duration: 1.1, ease: "power3.out", delay: 0.25 });
      });
    },
    { scope: root },
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `[${topic}] ${name}`.trim();
    const body = `${message}\n\n${name}${from ? ` <${from}>` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section ref={root} aria-labelledby="ct-title" className="surface-abyss bg-grid panel mt-(--panel-inset)">
      <Container className="grid grid-cols-1 gap-10 pt-[calc(var(--panel-inset)+6.5rem)] pb-section-sm lg:grid-cols-12 lg:gap-14 lg:pt-[calc(var(--panel-inset)+7.5rem)]">
        <div data-intro className="flex flex-col gap-6 lg:col-span-5 lg:justify-center lg:py-6">
          <p data-hero-fade className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/12 bg-white/5 py-1 ps-1 pe-3.5 font-mono text-eyebrow text-mist uppercase">
            <Image src="/brand/xwavy-mark.png" alt="" aria-hidden width={24} height={24} className="size-6 shrink-0 rounded-[0.4rem] ring-1 ring-white/15" />
            {t.hero.eyebrow}
          </p>
          <h1 id="ct-title" data-hero-fade className="text-display text-white">
            {t.hero.titleLead} <span className="accent text-cyan">{t.hero.titleAccent}</span>
          </h1>
          <p data-hero-fade className="text-lead text-mist">
            {t.hero.body}
          </p>

          <a
            data-hero-fade
            href={`mailto:${email}`}
            className="group mt-2 flex w-fit items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 pe-6 transition-colors hover:border-cyan"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-cyan text-abyss transition-transform group-hover:scale-105">
              <Mail aria-hidden className="size-5" />
            </span>
            <span>
              <span className="block text-sm text-mist">{t.form.directLabel}</span>
              <span className="block text-h4 text-white">{email}</span>
            </span>
          </a>

          <p data-hero-fade className="flex items-start gap-2.5 text-sm text-mist">
            <ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
            {t.form.privacyNote}
          </p>
        </div>

        {/* The form. */}
        <div data-intro data-form-card className="lg:col-span-7">
          <form onSubmit={onSubmit} aria-labelledby={`${id}-form-title`} className="flex flex-col gap-5 rounded-3xl bg-white p-5 text-ink shadow-elevated sm:p-8">
            <div>
              <h2 id={`${id}-form-title`} className="text-h3">
                {t.form.titleLead} <span className="accent text-cyan-ink">{t.form.titleAccent}</span>
              </h2>
              <p className="mt-2 text-sm text-body">{t.form.description}</p>
            </div>

            <fieldset className="flex flex-col">
              <legend className="mb-3 text-sm font-medium">{t.form.topicLabel}</legend>
              <div className="flex flex-wrap gap-2">
                {t.form.topics.map((option) => (
                  <label
                    key={option}
                    className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm text-body transition-colors hover:border-ink has-checked:border-abyss has-checked:bg-abyss has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-cyan"
                  >
                    <input type="radio" name="topic" value={option} checked={topic === option} onChange={() => setTopic(option)} className="sr-only" />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-name`} className="text-sm font-medium">
                  {t.form.nameLabel}
                </label>
                <input id={`${id}-name`} name="name" type="text" autoComplete="name" required className={field} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-email`} className="text-sm font-medium">
                  {t.form.emailLabel}
                </label>
                <input id={`${id}-email`} name="email" type="email" autoComplete="email" required dir="ltr" className={field} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-message`} className="text-sm font-medium">
                {t.form.messageLabel}
              </label>
              <textarea id={`${id}-message`} name="message" rows={5} required placeholder={t.form.messagePlaceholder} className={cn(field, "min-h-36 resize-y")} />
            </div>

            <Button type="submit" variant="primary" size="lg" arrow className="w-fit">
              {t.form.submit}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
