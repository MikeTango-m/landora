"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

export function useSmoothScroll() {
  useEffect(() => {
    // Create smooth scroll effect
    const smoother = ScrollSmoother.create({
      smooth: 2,                    // Suavidade: 2 segundos de inércia
      effects: true,                // Ativa efeitos de scroll
      onUpdate: (self) => {
        // Callback para qualquer update necessário
      },
    });

    return () => {
      // Cleanup
      smoother.kill();
    };
  }, []);
}
