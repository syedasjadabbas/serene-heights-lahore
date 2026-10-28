"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page-wide scroll effects, re-wired on every route change:
 * text reveals, fade-ups, chevron row, steps and parallax images.
 */
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const units = el.querySelectorAll<HTMLElement>(".ch, .w");
        const start = Number(el.dataset.start ?? 0.9);
        const end = Number(el.dataset.end ?? 0.45);
        const paint = (self: ScrollTrigger) => {
          const n = Math.round(self.progress * units.length);
          units.forEach((u, i) => u.classList.toggle("on", i < n));
        };
        // Text already past its start (e.g. page titles) is painted straight away.
        paint(ScrollTrigger.create({
          trigger: el,
          start: `top ${start * 100}%`,
          end: () => `+=${window.innerHeight * (start - end) + el.offsetHeight * 0.5}`,
          onUpdate: paint,
          onRefresh: paint,
        }));
      });

      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => el.classList.add("in") });
      });

      gsap.utils.toArray<HTMLElement>(".arrows__row").forEach((row) => {
        const chevs = Array.from(row.children);
        ScrollTrigger.create({
          trigger: row,
          start: "top 85%",
          end: () => `+=${window.innerHeight * 0.55}`,
          onUpdate: ({ progress: p }) =>
            chevs.forEach((c, i) => c.classList.toggle("on", p > (i + 0.5) / chevs.length || (i === 0 && p > 0.05))),
        });
      });

      gsap.utils.toArray<HTMLElement>(".step").forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: "top 70%", toggleClass: "on" });
      });

      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const s = Number(el.dataset.speed) * 50;
        gsap.fromTo(el, { y: s }, {
          y: -s, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    // Images and fonts change layout after mount.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
