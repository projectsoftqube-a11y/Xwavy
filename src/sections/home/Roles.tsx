import { ArrowRight, Check, Lightbulb, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";
import type imagesCopy from "@/i18n/pages/images";

import { cn } from "@/lib/cn";

type RolesProps = {
  t: Dictionary["home"]["roles"];
  alts: (typeof imagesCopy)["en"];
  innovatorHref: string;
  investorHref: string;
};

/** "Two sides": one compact card per role, photo beside what that side gets. */
export function Roles({ t, alts, innovatorHref, investorHref }: RolesProps) {
  const sides = [
    {
      key: "innovators",
      data: t.innovators,
      href: innovatorHref,
      Icon: Lightbulb,
      image: { src: "/images/site/home-roles-innovator.webp", alt: alts.homeRolesInnovator, position: "object-[60%_center]" },
      dark: false,
    },
    {
      key: "investors",
      data: t.investors,
      href: investorHref,
      Icon: TrendingUp,
      image: { src: "/images/people/investor-window.webp", alt: alts.homeRolesInvestor, position: "object-[35%_center]" },
      dark: true,
    },
  ] as const;

  return (
    <Section tone="surface" aria-labelledby="roles-title">
      <SectionHeading id="roles-title" eyebrow={t.eyebrow} title={t.titleLead} accent={t.titleAccent} />

      <Reveal stagger className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {sides.map(({ key, data, href, Icon, image, dark }) => (
          <article
            key={key}
            className={cn("grid grid-cols-1 overflow-hidden rounded-(--panel-radius) sm:grid-cols-[2fr_3fr]", dark ? "surface-abyss" : "bg-white")}
          >
            <Reveal variant="image" className="relative aspect-video overflow-hidden bg-navy sm:aspect-auto sm:min-h-full">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 100vw" className={cn("object-cover", image.position)} />
            </Reveal>
            <div className="flex flex-col p-6 sm:p-7">
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 font-mono text-eyebrow uppercase",
                  dark ? "bg-gold/15 text-gold" : "bg-cyan/10 text-cyan-ink",
                )}
              >
                <Icon aria-hidden className="size-3.5" />
                {data.label}
              </span>
              <h3 className={cn("mt-4 text-h4", dark ? "text-white" : "text-ink")}>{data.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {data.points.map((point) => (
                  <li key={point} className={cn("flex items-start gap-2.5 text-sm", dark ? "text-mist" : "text-body")}>
                    <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", dark ? "text-gold" : "text-cyan-ink")} />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className={cn(
                  "group mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-medium underline-offset-4 hover:underline",
                  dark ? "text-white" : "text-ink",
                )}
              >
                {data.cta}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
