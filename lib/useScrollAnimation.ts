"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimationCards() {
  useEffect(() => {
    // Fade-in ao scroll
    gsap.utils.toArray<HTMLElement>("[data-scroll-fade-in]").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
    });

    // Scale + Rotate (Cover Flow style)
    gsap.utils.toArray<HTMLElement>("[data-scroll-scale]").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
        },
        opacity: 0,
        scale: 0.85,
        rotationY: -15,
        duration: 0.9,
        stagger: 0.1,
      });
    });

    // Parallax movimento suave
    gsap.utils.toArray<HTMLElement>("[data-parallax-scroll]").forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          scrub: 1,
          start: "top center",
          end: "bottom center",
        },
        y: 50,
        ease: "none",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
