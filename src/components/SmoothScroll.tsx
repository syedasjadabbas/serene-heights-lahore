"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
const HEADER = 70; // fixed header height: sections land just below it

/** Scroll to the top of the page — smoothly via Lenis when it's running. */
export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate, duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
}

// The header gap comes from `scroll-margin-top` in CSS (so the browser's own #jumps respect it too);
// Lenis reads it as well, so no extra offset here.
function scrollToEl(el: HTMLElement, immediate: boolean) {
  if (lenis) lenis.scrollTo(el, { immediate, duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER, behavior: immediate ? "instant" : "smooth" });
}

/**
 * Arriving on a page at a #section: images and fonts above it are still settling, which pushes it
 * down after the first jump. Keep re-aligning while the page grows, until the visitor scrolls themself.
 */
function settleOn(el: HTMLElement) {
  let done = false, raf = 0;
  const stop = () => { done = true; cancelAnimationFrame(raf); removeEventListener("wheel", stop); removeEventListener("touchstart", stop); removeEventListener("keydown", stop); };
  const align = () => {
    if (done) return;
    if (Math.abs(el.getBoundingClientRect().top - HEADER) > 1) scrollToEl(el, true);
    raf = requestAnimationFrame(align);
  };
  align();
  addEventListener("wheel", stop, { passive: true });
  addEventListener("touchstart", stop, { passive: true });
  addEventListener("keydown", stop);
  setTimeout(stop, 1800);
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

    // A link to a #section of the page we're already on (e.g. "Office Floors" while on /project):
    // the route doesn't change, so glide there here.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      // preventDefault stops the router (Next's Link ignores prevented clicks); other click
      // handlers, like the mobile menu closing itself, still run.
      e.preventDefault();
      history.pushState(history.state, "", url.hash);
      a.blur(); // closes a hover/focus dropdown it sits in
      // Wait a frame if the mobile menu is closing, since scrolling is frozen while it's open.
      const go = () => document.body.classList.contains("menu-open") ? requestAnimationFrame(go) : scrollToEl(el, false);
      requestAnimationFrame(go);
    };
    document.addEventListener("click", onClick, true);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, anchors: true });
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
      document.removeEventListener("click", onClick);
      mo.disconnect();
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // New page: jump to the top (or to the #section the link points at).
  useEffect(() => {
    const el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) {
      requestAnimationFrame(() => settleOn(el));
    } else {
      scrollToTop(true);
    }
  }, [pathname]);

  return null;
}
