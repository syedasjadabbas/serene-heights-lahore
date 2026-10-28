"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Scroll to the top of the page — smoothly via Lenis when it's running. */
export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate, duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
}

/** Inertial page scrolling (Lenis), driven by GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // A refresh always starts at the top, so the hero intro plays from the beginning.
    // Browsers otherwise restore the old position after load, so also reset on load and before unload.
    history.scrollRestoration = "manual";
    const toTop = () => { if (!location.hash) window.scrollTo(0, 0); };
    toTop();
    window.addEventListener("load", toTop);
    window.addEventListener("beforeunload", toTop);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, anchors: { offset: -70 } });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Freeze the page behind the open mobile menu.
    const mo = new MutationObserver(() =>
      document.body.classList.contains("menu-open") ? lenis?.stop() : lenis?.start()
    );
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("load", toTop);
      window.removeEventListener("beforeunload", toTop);
      mo.disconnect();
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // New page: jump to the top (or to the #section the link points at).
  useEffect(() => {
    const hash = location.hash;
    if (hash && document.querySelector(hash)) {
      requestAnimationFrame(() => lenis?.scrollTo(hash, { offset: -70, immediate: true }));
    } else {
      scrollToTop(true);
    }
  }, [pathname]);

  return null;
}
