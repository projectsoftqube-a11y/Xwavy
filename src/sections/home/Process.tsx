import { BadgeCheck, Handshake, PenLine, Search, Send } from "lucide-react";

import { StepStory } from "@/components/sections/StepStory";
import type { Dictionary } from "@/i18n/get-dictionary";
import type imagesCopy from "@/i18n/pages/images";


type ProcessProps = { t: Dictionary["home"]["process"]; alts: (typeof imagesCopy)["en"] };

/** One photograph and icon per step, in story order (public/images/site). */
const STEPS = [
  { src: "/images/site/home-step-1-post.webp", alt: "homeStep1", Icon: PenLine },
  { src: "/images/site/home-step-2-review.webp", alt: "homeStep2", Icon: BadgeCheck },
  { src: "/images/site/home-step-3-discover.webp", alt: "homeStep3", Icon: Search },
  { src: "/images/site/home-step-4-request.webp", alt: "homeStep4", Icon: Send },
  { src: "/images/site/home-step-5-connect.webp", alt: "homeStep5", Icon: Handshake },
] as const;

/** "From first draft to first conversation": the five steps as a playing story. */
export function Process({ t, alts }: ProcessProps) {
  return (
    <StepStory
      id="process-title"
      sectionId="how-it-works"
      eyebrow={t.eyebrow}
      titleLead={t.titleLead}
      titleAccent={t.titleAccent}
      labels={{ step: t.stepLabel, of: t.of, play: t.play, pause: t.pause }}
      steps={t.steps.map((step, i) => {
        const media = STEPS[i] ?? STEPS[0];
        return {
          ...step,
          image: { src: media.src, alt: alts[media.alt] },
          icon: <media.Icon aria-hidden className="size-5" />,
          status: t.statuses[i] ?? step.name,
        };
      })}
    />
  );
}
