"use client";

import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
