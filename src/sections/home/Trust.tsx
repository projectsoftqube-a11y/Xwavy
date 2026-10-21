import { BadgeCheck, CreditCard, Handshake, Languages, LockKeyhole, ShieldCheck } from "lucide-react";

import { CardGrid } from "@/components/sections/CardGrid";
import type { Dictionary } from "@/i18n/get-dictionary";

type TrustProps = { t: Dictionary["home"]["trust"] };

/**
 * Trust and safety as a bento: human moderation leads as the featured tile.
 * Icons map to t.items by index: 0 moderation, 1 sealed contact, 2 investor
 * verification, 3 payments, 4 Arabic and English, 5 facilitator.
 */
const ICONS = [ShieldCheck, LockKeyhole, BadgeCheck, CreditCard, Languages, Handshake] as const;

export function Trust({ t }: TrustProps) {
  return (
    <CardGrid
      id="trust-title"
      eyebrow={t.eyebrow}
      titleLead={t.titleLead}
      titleAccent={t.titleAccent}
      layout="bento"
      cards={t.items.map((item, i) => ({ ...item, Icon: ICONS[i] }))}
    />
  );
}
