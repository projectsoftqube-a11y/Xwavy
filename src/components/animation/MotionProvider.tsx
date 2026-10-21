"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

import { DURATION, EASE } from "@/lib/motion";

/**
 * Global Framer Motion defaults. `reducedMotion="user"` disables transform and
 * layout animations for users who prefer reduced motion; opacity changes still
 * run, so state changes stay perceivable.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION.base, ease: EASE.brand }}
    >
      {children}
    </MotionConfig>
  );
}
